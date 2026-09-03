'use client';

import { ContentProvider } from '@/lib/content-context';
import type { SiteContentData } from '@/lib/content-types';
import { LocaleProvider } from '@/lib/i18n/locale-context';
import Header from './Header';
import ScrollManager from './ScrollManager';

export default function SiteProviders({
  content,
  children,
}: {
  content: SiteContentData;
  children: React.ReactNode;
}) {
  return (
    <ContentProvider value={content}>
      <LocaleProvider>
        <ScrollManager />
        {children}
        <Header />
      </LocaleProvider>
    </ContentProvider>
  );
}
