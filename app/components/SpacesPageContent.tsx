'use client';

import { AnchorLink } from '@/components/ui/AnchorLink';
import { ArrowLeftIcon } from '@/components/ui/Icons';
import { useSiteContent } from '@/lib/content-context';
import { useLocale } from '@/lib/i18n/locale-context';
import { localizedCopy, localizedNavLabel } from '@/lib/i18n/localized';
import SpacesGrid from './SpacesGrid';

export default function SpacesPageContent() {
  const { copy, copyKk, nav } = useSiteContent();
  const { locale, messages } = useLocale();
  const t = localizedCopy(copy, copyKk, locale);
  const layoutsNav = nav.find((item) => item.href === '#layouts');
  const eyebrow = layoutsNav ? localizedNavLabel(layoutsNav, locale) : t.layoutsSectionLabel;

  return (
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <AnchorLink
        href="/#layouts"
        className="mb-8 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#C9A962] transition-colors hover:text-[#A68439]"
      >
        <ArrowLeftIcon className="h-3.5 w-3.5" />
        {messages.backHome}
      </AnchorLink>

      <div className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.25em] text-[#B8954F]">{eyebrow}</p>
        <h1
          className="mt-4 text-2xl uppercase leading-tight tracking-[0.06em] text-[#1a1a1a] sm:text-3xl md:text-4xl"
          style={{ fontFamily: 'var(--font-playfair-display)' }}
        >
          {locale === 'kk'
            ? 'Қолжетімді кеңістіктер — BEREKE БО кеңселері'
            : 'Доступные пространства — офисы БЦ BEREKE'}
        </h1>
        <p className="mt-6 text-sm leading-relaxed text-[#5c5c5c] sm:text-[15px] sm:leading-[1.85]">
          {t.layoutsSubtitle}
        </p>
      </div>

      <SpacesGrid />

      <div className="mt-14 text-center sm:mt-16">
        <AnchorLink
          href="/#contacts"
          className="inline-flex rounded-full border border-[#C9A962] bg-gradient-to-r from-[#C9A962]/10 to-transparent px-8 py-3.5 text-xs uppercase tracking-[0.2em] text-[#A68439] transition-all hover:border-[#B8954F] hover:bg-[#C9A962] hover:text-[#1a1a1a]"
        >
          {t.heroCtaConsultation}
        </AnchorLink>
      </div>
    </div>
  );
}
