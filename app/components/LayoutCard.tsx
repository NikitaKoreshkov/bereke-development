'use client';

import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { ImageZoomHint } from '@/components/ui/ImageZoomHint';
import { ServicesPanelGlass } from '@/components/ui/ServicesPanelGlass';
import type { LayoutItem } from '@/lib/content-types';
import { useSiteContent } from '@/lib/content-context';
import { useLocale } from '@/lib/i18n/locale-context';
import { localizedCopy, localizedLayoutType } from '@/lib/i18n/localized';

const GLASS_CARD = '[--panel-radius:20px]';

export type { LayoutItem };

type LayoutCardProps = {
  layout: LayoutItem;
  instanceId: string;
  className?: string;
  variant?: 'default' | 'ghost';
  isActive?: boolean;
  onImageClick?: () => void;
};

export default function LayoutCard({
  layout,
  instanceId,
  className = '',
  variant = 'default',
  isActive = false,
  onImageClick,
}: LayoutCardProps) {
  const { copy, copyKk } = useSiteContent();
  const { locale } = useLocale();
  const t = localizedCopy(copy, copyKk, locale);
  const type = localizedLayoutType(layout, locale);
  const isGhost = variant === 'ghost';

  const imageBlock = (
    <div
      className={`relative mx-3 mt-3 aspect-[4/3] shrink-0 overflow-hidden rounded-2xl bg-[#151a24] sm:mx-4 sm:mt-4 ${
        isGhost ? '' : 'transition-transform duration-500 ease-out group-hover/card:scale-[1.02]'
      }`}
    >
      <OptimizedImage
        src={layout.image}
        alt={`${t.layoutsOpenAria} ${layout.title}`}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className={`object-cover object-center ${
          isGhost
            ? ''
            : 'transition-transform duration-500 ease-out group-hover/card:scale-105 group-hover/zoom:scale-105'
        }`}
      />
      {onImageClick ? <ImageZoomHint label={t.imageZoomHint} /> : null}
    </div>
  );

  return (
    <ServicesPanelGlass
      id={`layout-${instanceId}`}
      tone="dark"
      lite
      interactive={false}
      className={`layout-card-glass ${isGhost ? 'layout-card-glass--ghost' : ''} ${isActive ? 'layout-card-glass--active' : ''} group/card flex h-full flex-col overflow-hidden ${GLASS_CARD} ${className}`.trim()}
    >
      {onImageClick ? (
        <button
          type="button"
          onClick={onImageClick}
          className="group/zoom block w-full shrink-0 cursor-pointer text-left"
          aria-label={`${layout.title} / ${t.imageZoomHint}`}
        >
          {imageBlock}
        </button>
      ) : (
        imageBlock
      )}
      <div className="flex flex-1 flex-col px-5 pb-4 pt-3 sm:px-6 sm:pb-5">
        <p
          className={`layout-card-title text-2xl font-semibold leading-none tabular-nums sm:text-[1.85rem] ${
            isGhost ? 'text-[#F2DDA8]' : 'text-[#B8954F]'
          }`}
        >
          {layout.title}
        </p>
        <p
          className={`layout-card-type mt-2 min-h-[2.625rem] line-clamp-2 text-[11px] font-semibold uppercase leading-snug tracking-[0.14em] sm:min-h-[2.75rem] sm:text-xs ${
            isGhost ? 'text-white/72' : 'text-[#1a1a1a]'
          }`}
        >
          {type}
        </p>
        <p
          className={`layout-card-brand mt-auto pt-3 text-sm font-semibold uppercase tracking-[0.12em] ${
            isGhost ? 'text-white/88' : 'text-[#1a1a1a]'
          }`}
        >
          {t.layoutsBrand}
        </p>
      </div>
    </ServicesPanelGlass>
  );
}
