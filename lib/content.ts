import { revalidatePath, revalidateTag } from 'next/cache';
import { query } from '@/lib/db';
import { buildDefaultContent, normalizeSiteContent } from '@/lib/default-content';
import type { SiteContentData } from '@/lib/content-types';

export const CONTENT_CACHE_TAG = 'site-content';

function isSiteContentData(value: unknown): value is SiteContentData {
  if (!value || typeof value !== 'object') return false;
  const data = value as Partial<SiteContentData>;
  return Boolean(data.site && data.copy && data.projects && data.sections);
}

async function fetchContentFromDb(): Promise<SiteContentData> {
  try {
    const result = await query<{ data: SiteContentData }>(
      `SELECT data FROM site_content WHERE id = 'main' LIMIT 1`,
    );
    const row = result.rows[0];
    if (row?.data && isSiteContentData(row.data)) {
      return normalizeSiteContent(row.data);
    }
  } catch (error) {
    console.error('[content] DB read failed, using defaults', error);
  }
  return buildDefaultContent();
}

/** Always read fresh from DB — CMS edits must show up immediately. */
export async function getSiteContent(): Promise<SiteContentData> {
  return fetchContentFromDb();
}

/** Same as getSiteContent; kept for admin call sites. */
export async function getSiteContentFresh() {
  return fetchContentFromDb();
}

function purgeContentCaches() {
  // expire: 0 — drop tagged entries immediately (do NOT use 'max': it keeps stale HTML)
  revalidateTag(CONTENT_CACHE_TAG, { expire: 0 });
  revalidatePath('/', 'layout');
  revalidatePath('/spaces');
  revalidatePath('/developer');
  revalidatePath('/privacy-policy');
  revalidatePath('/terms-of-use');
  revalidatePath('/cookies');
}

export async function saveSiteContent(data: SiteContentData) {
  const normalized = normalizeSiteContent(data);
  await query(
    `INSERT INTO site_content (id, data, updated_at)
     VALUES ('main', $1::jsonb, NOW())
     ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW()`,
    [JSON.stringify(normalized)],
  );
  purgeContentCaches();
}

export async function updateSiteContent(
  updater: (current: SiteContentData) => SiteContentData,
) {
  const current = await fetchContentFromDb();
  const next = updater(current);
  await saveSiteContent(next);
  return next;
}

export function visibleSorted<T extends { visible: boolean; order: number }>(items: T[]) {
  return [...items].filter((item) => item.visible).sort((a, b) => a.order - b.order);
}

export function whatsappMessageHref(whatsapp: string, message: string) {
  return `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`;
}
