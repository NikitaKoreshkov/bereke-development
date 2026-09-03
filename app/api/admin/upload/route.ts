import { randomUUID } from 'crypto';
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { deleteUploadByUrl, isManagedUploadUrl } from '@/lib/media';
import { isImageMime, isVideoMime, mimeToExt, optimizeUpload } from '@/lib/optimize-upload';

export const runtime = 'nodejs';
/** No practical size cap — optimize instead of reject. */
export const maxDuration = 300;

const ALLOWED = (mime: string) =>
  isImageMime(mime) ||
  isVideoMime(mime) ||
  mime === 'application/pdf' ||
  mime === 'application/octet-stream';

export async function POST(request: Request) {
  const form = await request.formData();
  const file = form.get('file');
  const replaceUrl = String(form.get('replaceUrl') || '');

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'Файл не передан' }, { status: 400 });
  }

  const incomingMime = file.type || 'application/octet-stream';
  if (!ALLOWED(incomingMime) && !file.name.match(/\.(jpe?g|png|webp|gif|avif|mp4|webm|mov|m4v|pdf)$/i)) {
    return NextResponse.json({ error: 'Тип файла не поддерживается' }, { status: 400 });
  }

  const optimized = await optimizeUpload(file);
  const id = randomUUID();
  const ext = optimized.ext || mimeToExt(optimized.mimeType) || path.extname(file.name) || '.bin';
  const filename = `${Date.now()}-${id.slice(0, 8)}${ext}`;
  const dir = path.join(process.cwd(), 'public', 'uploads');
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, filename), optimized.buffer);

  const url = `/uploads/${filename}`;
  await query(
    `INSERT INTO media_assets (id, url, filename, mime_type, size)
     VALUES ($1, $2, $3, $4, $5)
     ON CONFLICT (url) DO NOTHING`,
    [id, url, file.name, optimized.mimeType, optimized.buffer.length],
  );

  if (isManagedUploadUrl(replaceUrl) && replaceUrl !== url) {
    await deleteUploadByUrl(replaceUrl);
  }

  return NextResponse.json({
    url,
    filename: file.name,
    mimeType: optimized.mimeType,
    size: optimized.buffer.length,
    originalSize: file.size,
    optimized: optimized.optimized,
    id,
    replaced: isManagedUploadUrl(replaceUrl) ? replaceUrl : null,
  });
}
