import { spawn } from 'child_process';
import { randomUUID } from 'crypto';
import { mkdir, readFile, unlink, writeFile } from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']);
const VIDEO_TYPES = new Set(['video/mp4', 'video/webm', 'video/quicktime', 'video/x-m4v']);

export function isImageMime(mime: string) {
  return IMAGE_TYPES.has(mime) || mime.startsWith('image/');
}

export function isVideoMime(mime: string) {
  return VIDEO_TYPES.has(mime) || mime.startsWith('video/');
}

export type OptimizedUpload = {
  buffer: Buffer;
  mimeType: string;
  ext: string;
  optimized: boolean;
};

/** Images → WebP (max edge 2560). Videos → H.264/AAC mp4 via ffmpeg when available. */
export async function optimizeUpload(file: File): Promise<OptimizedUpload> {
  const input = Buffer.from(await file.arrayBuffer());
  const mime = file.type || 'application/octet-stream';

  if (isImageMime(mime) && mime !== 'image/gif') {
    const out = await sharp(input)
      .rotate()
      .resize({
        width: 2560,
        height: 2560,
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({ quality: 82, effort: 4 })
      .toBuffer();

    return {
      buffer: out,
      mimeType: 'image/webp',
      ext: '.webp',
      optimized: true,
    };
  }

  if (isVideoMime(mime)) {
    try {
      const out = await transcodeVideo(input, mime);
      return {
        buffer: out,
        mimeType: 'video/mp4',
        ext: '.mp4',
        optimized: true,
      };
    } catch {
      // ffmpeg missing/failed — keep original bytes
    }
  }

  return {
    buffer: input,
    mimeType: mime,
    ext: path.extname(file.name) || mimeToExt(mime),
    optimized: false,
  };
}

async function transcodeVideo(input: Buffer, mime: string): Promise<Buffer> {
  const tmpDir = path.join(process.cwd(), '.tmp-uploads');
  await mkdir(tmpDir, { recursive: true });
  const id = randomUUID().slice(0, 8);
  const inExt = mime === 'video/webm' ? '.webm' : mime === 'video/quicktime' ? '.mov' : '.mp4';
  const inPath = path.join(tmpDir, `in-${id}${inExt}`);
  const outPath = path.join(tmpDir, `out-${id}.mp4`);

  await writeFile(inPath, input);

  try {
    await runFfmpeg([
      '-y',
      '-i',
      inPath,
      '-c:v',
      'libx264',
      '-preset',
      'veryfast',
      '-crf',
      '28',
      '-vf',
      "scale='min(1920,iw)':'min(1080,ih)':force_original_aspect_ratio=decrease",
      '-c:a',
      'aac',
      '-b:a',
      '128k',
      '-movflags',
      '+faststart',
      outPath,
    ]);
    return await readFile(outPath);
  } finally {
    await unlink(inPath).catch(() => undefined);
    await unlink(outPath).catch(() => undefined);
  }
}

function runFfmpeg(args: string[]) {
  return new Promise<void>((resolve, reject) => {
    const child = spawn('ffmpeg', args, { stdio: ['ignore', 'ignore', 'pipe'] });
    let stderr = '';
    child.stderr.on('data', (chunk: Buffer) => {
      stderr += chunk.toString();
    });
    child.on('error', reject);
    child.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(stderr.slice(-400) || `ffmpeg exited ${code}`));
    });
  });
}

export function mimeToExt(mime: string) {
  switch (mime) {
    case 'image/jpeg':
      return '.jpg';
    case 'image/png':
      return '.png';
    case 'image/webp':
      return '.webp';
    case 'image/gif':
      return '.gif';
    case 'image/avif':
      return '.avif';
    case 'video/mp4':
      return '.mp4';
    case 'video/webm':
      return '.webm';
    case 'video/quicktime':
      return '.mov';
    case 'application/pdf':
      return '.pdf';
    default:
      return '';
  }
}
