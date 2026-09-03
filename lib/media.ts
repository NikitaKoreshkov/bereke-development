import { unlink } from 'fs/promises';
import path from 'path';
import { query } from '@/lib/db';

/** Only managed uploads under /uploads/ can be deleted */
export function isManagedUploadUrl(url: string | null | undefined): url is string {
  return Boolean(url && url.startsWith('/uploads/') && !url.includes('..'));
}

export async function deleteUploadByUrl(url: string) {
  if (!isManagedUploadUrl(url)) return false;

  const filePath = path.join(process.cwd(), 'public', url);
  try {
    await unlink(filePath);
  } catch {
    // file may already be gone
  }

  await query(`DELETE FROM media_assets WHERE url = $1`, [url]);
  return true;
}
