'use client';

import { ServicesPanelGlass } from '@/components/ui/ServicesPanelGlass';
import panelStyles from '@/components/ui/services-panel-glass.module.css';
import { useSiteContent } from '@/lib/content-context';
import { useLocale } from '@/lib/i18n/locale-context';
import { localizedStat } from '@/lib/i18n/localized';

interface BerekeStatsPanelProps {
  className?: string;
}

function StatCell({
  value,
  label,
  showDivider,
  layout = 'desktop',
}: {
  value: string;
  label: string;
  showDivider?: boolean;
  layout?: 'desktop' | 'mobile';
}) {
  const hasLabel = Boolean(label);

  if (layout === 'mobile') {
    return (
      <div className="flex min-h-[5rem] flex-col items-center justify-center px-4 py-4 text-center sm:min-h-[5.5rem] sm:px-5 sm:py-5">
        <span
          className={`font-light leading-snug text-[#F0DCA8] ${
            hasLabel ? 'text-lg sm:text-xl' : 'text-base leading-[1.35] sm:text-lg'
          }`}
          style={{
            fontFamily: 'var(--font-playfair-display)',
            textShadow: '0 0 32px rgba(201, 169, 98, 0.12)',
          }}
        >
          {value}
        </span>

        {hasLabel ? (
          <span className="mt-2 max-w-[14rem] text-[9px] uppercase leading-[1.55] tracking-[0.16em] text-white/42 sm:max-w-[16rem] sm:text-[10px]">
            {label}
          </span>
        ) : null}
      </div>
    );
  }

  return (
    <div
      className={`group relative flex min-h-[84px] min-w-0 grow shrink basis-auto flex-col justify-center px-4 py-6 text-center sm:px-5 sm:py-7 lg:px-5 lg:py-7 ${
        showDivider ? 'border-r border-white/[0.07]' : ''
      }`}
    >
      <span
        className={`font-light leading-snug text-[#F0DCA8] ${
          hasLabel
            ? 'text-lg sm:text-xl lg:text-[1.2rem]'
            : 'text-base leading-[1.35] sm:text-lg lg:text-[1.05rem]'
        }`}
        style={{
          fontFamily: 'var(--font-playfair-display)',
          textShadow: '0 0 32px rgba(201, 169, 98, 0.12)',
        }}
      >
        {value}
      </span>

      {hasLabel ? (
        <span className="mx-auto mt-2 max-w-[14rem] text-[9px] uppercase leading-[1.55] tracking-[0.16em] text-white/42 sm:text-[10px] lg:mt-2.5 lg:max-w-none">
          {label}
        </span>
      ) : null}
    </div>
  );
}

export function BerekeStatsPanel({ className = '' }: BerekeStatsPanelProps) {
  const { stats: allStats } = useSiteContent();
  const { locale } = useLocale();
  const stats = allStats
    .filter((i) => i.visible)
    .sort((a, b) => a.order - b.order)
    .map((item) => ({ id: item.id, ...localizedStat(item, locale) }));

  return (
    <div className={`relative w-full ${className}`}>
      <ServicesPanelGlass
        id="bereke-stats"
        tone="dark"
        className={`${panelStyles.shellNeutralRim} shadow-[0_24px_90px_rgba(0,0,0,0.48)] [--panel-radius:20px] sm:[--panel-radius:24px] lg:[--panel-radius:28px]`}
      >
        <div className="hidden lg:flex lg:w-full lg:items-stretch">
          {stats.map((stat, i) => (
            <StatCell
              key={stat.id}
              value={stat.value}
              label={stat.label}
              showDivider={i < stats.length - 1}
            />
          ))}
        </div>

        <div className="mobile-metric-grid grid grid-cols-2 sm:grid-cols-3 lg:hidden">
          {stats.map((stat) => (
            <StatCell key={stat.id} value={stat.value} label={stat.label} layout="mobile" />
          ))}
        </div>
      </ServicesPanelGlass>
    </div>
  );
}
