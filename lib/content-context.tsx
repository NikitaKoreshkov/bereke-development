'use client';

import { createContext, useContext } from 'react';
import type { SiteContentData } from '@/lib/content-types';
import { buildDefaultContent } from '@/lib/default-content';

const ContentContext = createContext<SiteContentData>(buildDefaultContent());

export function ContentProvider({
  value,
  children,
}: {
  value: SiteContentData;
  children: React.ReactNode;
}) {
  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useSiteContent() {
  return useContext(ContentContext);
}
