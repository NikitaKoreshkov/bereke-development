import { NextResponse } from 'next/server';
import { getSiteContentFresh, saveSiteContent } from '@/lib/content';
import type { SiteContentData } from '@/lib/content-types';

export async function GET() {
  const data = await getSiteContentFresh();
  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'no-store',
    },
  });
}

export async function PUT(request: Request) {
  const body = (await request.json().catch(() => null)) as SiteContentData | null;
  if (!body?.site || !body?.copy || !body?.sections) {
    return NextResponse.json({ error: 'Invalid content payload' }, { status: 400 });
  }
  await saveSiteContent(body);
  return NextResponse.json(
    { ok: true },
    {
      headers: {
        'Cache-Control': 'no-store',
      },
    },
  );
}
