'use client';

import { ServicesPanelGlass } from '@/components/ui/ServicesPanelGlass';
import type { ConstructionUpdateItem } from '@/lib/content-types';
import { useSiteContent } from '@/lib/content-context';
import { useLocale } from '@/lib/i18n/locale-context';
import { localizedConstructionUpdate, localizedCopy } from '@/lib/i18n/localized';

const GLASS_CARD = '[--panel-radius:20px]';

type ConstructionCardProps = {
  item: ConstructionUpdateItem;
  index: number;
  instanceId: string;
  isActive?: boolean;
  className?: string;
};

export default function ConstructionCard({
  item,
  index,
  instanceId,
  isActive = false,
  className = '',
}: ConstructionCardProps) {
  const { copy, copyKk } = useSiteContent();
  const { locale } = useLocale();
  const t = localizedCopy(copy, copyKk, locale);
  const { title, category } = localizedConstructionUpdate(item, locale);
  const num = String(index + 1).padStart(2, '0');

  return (
    <ServicesPanelGlass
      id={`construction-card-${instanceId}`}
      tone="dark"
      lite
      interactive={false}
      className={`layout-card-glass layout-card-glass--ghost construction-card group/card flex h-full min-h-[22rem] flex-col overflow-hidden ${isActive ? 'layout-card-glass--active' : ''} ${GLASS_CARD} ${className}`.trim()}
    >
      <div className="relative flex h-full min-h-0 flex-col px-5 pb-5 pt-5 sm:px-6 sm:pb-6 sm:pt-6">
        <span
          className={`construction-card-index text-[11px] font-semibold tracking-[0.2em] ${
            isActive ? 'text-[#191f2b]/55' : 'text-white/35'
          }`}
        >
          {num}
        </span>

        <h3
          className="layout-card-title mt-8 text-[1.35rem] font-semibold uppercase leading-[1.15] tracking-[0.04em] text-[#F2DDA8] sm:mt-10 sm:text-[1.55rem]"
          style={{ fontFamily: 'var(--font-playfair-display)' }}
        >
          {title}
        </h3>

        <div className="mt-auto pt-8">
          <div className={`h-px w-full ${isActive ? 'bg-[#191f2b]/25' : 'bg-white/15'}`} aria-hidden />
          <p className="layout-card-type mt-3 text-[10px] font-semibold uppercase leading-snug tracking-[0.18em] text-white/72 sm:text-[11px]">
            {category}
          </p>
          <p className="layout-card-brand mt-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/88">
            {t.constructionViewCta}
          </p>
        </div>

        <span
          className={`pointer-events-none absolute bottom-3 right-3 select-none text-[4.5rem] font-light leading-none sm:text-[5.5rem] ${
            isActive ? 'text-[#191f2b]/10' : 'text-white/[0.06]'
          }`}
          style={{ fontFamily: 'var(--font-playfair-display)' }}
          aria-hidden
        >
          {num}
        </span>
      </div>
    </ServicesPanelGlass>
  );
}
