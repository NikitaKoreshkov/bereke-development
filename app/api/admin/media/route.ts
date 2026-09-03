import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { deleteUploadByUrl, isManagedUploadUrl } from '@/lib/media';

export async function GET() {
  const result = await query<{
    id: string;
    url: string;
    filename: string;
    mime_type: string;
    size: number;
    created_at: string;
  }>(`SELECT id, url, filename, mime_type, size, created_at FROM media_assets ORDER BY created_at DESC`);

  return NextResponse.json(
    result.rows.map((row) => ({
      id: row.id,
      url: row.url,
      filename: row.filename,
      mimeType: row.mime_type,
      size: row.size,
      createdAt: row.created_at,
    })),
  );
}

export async function DELETE(request: Request) {
  const body = (await request.json().catch(() => null)) as { url?: string } | null;
  const url = body?.url;
  if (!isManagedUploadUrl(url)) {
    return NextResponse.json({ error: 'Некорректный url' }, { status: 400 });
  }

  await deleteUploadByUrl(url);
  return NextResponse.json({ ok: true });
}
