'use client';

import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ServicesPanelGlass } from '@/components/ui/ServicesPanelGlass';
import panelStyles from '@/components/ui/services-panel-glass.module.css';
import { useSiteContent } from '@/lib/content-context';
import { useLocale } from '@/lib/i18n/locale-context';
import { localizedAdvantage, localizedCopy } from '@/lib/i18n/localized';

const GLASS_CARD = `h-full [--panel-radius:20px] ${panelStyles.shellNeutralRim}`;
const ICON_WRAP = 'inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#1a1a1a]/12 bg-[#1a1a1a]/5';
const ICON_CLS = 'h-5 w-5 text-[#1a1a1a]';

function CornerNumber({ value }: { value: string }) {
  return (
    <span
      className="pointer-events-none absolute right-4 top-3 select-none text-3xl font-light leading-none text-[#C9A962]/45 sm:right-5 sm:top-4 sm:text-[2.5rem]"
      style={{ fontFamily: 'var(--font-playfair-display)' }}
      aria-hidden
    >
      {value}
    </span>
  );
}

function AdvantageCardContent({
  title,
  text,
  icon,
  number,
}: {
  title: string;
  text: string;
  icon: string;
  number: string;
}) {
  return (
    <div className="relative h-full p-6 sm:p-7">
      <CornerNumber value={number} />
      <div className={`mb-5 ${ICON_WRAP}`}>
        <AdvantageIcon type={icon} />
      </div>
      <h4 className="mb-2.5 text-[15px] font-semibold leading-snug tracking-wide text-[#1a1a1a]">
        {title}
      </h4>
      <p className="text-sm leading-relaxed text-[#5c5c5c]">{text}</p>
    </div>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="mb-4 text-xs uppercase tracking-[0.25em] text-[#7a5c28]">{children}</p>
  );
}

function AdvantageIcon({ type }: { type: string }) {
  const cls = ICON_CLS;
  const icons: Record<string, React.ReactNode> = {
    shield: (
      <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    building: (
      <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    engineering: (
      <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    elevator: (
      <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
      </svg>
    ),
    security: (
      <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    parking: (
      <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
      </svg>
    ),
    service: (
      <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    reception: (
      <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
  };
  return icons[type] ?? icons.building;
}

export default function AdvantagesSection() {
  const { advantages: allAdvantages, copy, copyKk } = useSiteContent();
  const { locale } = useLocale();
  const t = localizedCopy(copy, copyKk, locale);
  const advantages = allAdvantages
    .filter((i) => i.visible)
    .sort((a, b) => a.order - b.order)
    .map((item) => ({ id: item.id, icon: item.icon, ...localizedAdvantage(item, locale) }));

  return (
    <section key={locale} id="advantages" className="section-bg-limestone py-24 sm:py-32">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl text-center sm:text-left">
          <ScrollReveal variant="blur">
            <SectionLabel>{t.advantagesSectionLabel}</SectionLabel>
          </ScrollReveal>
          <ScrollReveal variant="up" delay={80}>
            <h2
              className="mb-10 text-2xl uppercase leading-tight tracking-[0.06em] text-[#191f2b] sm:text-3xl md:text-4xl lg:max-w-3xl"
              style={{ fontFamily: 'var(--font-playfair-display)' }}
            >
              {t.advantagesTitle}
            </h2>
          </ScrollReveal>
        </div>

        <div className="grid gap-5 px-1 py-2 sm:grid-cols-2 sm:gap-6 lg:gap-7">
          <ScrollReveal variant="up" delay={140} className="sm:col-span-2">
            <ServicesPanelGlass id="advantage-location" tone="light" className={GLASS_CARD}>
              <div className="relative p-6 sm:p-7 lg:p-8">
                <CornerNumber value="01" />
                <div className="relative flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:gap-5 sm:text-left">
                  <div className={`shrink-0 ${ICON_WRAP}`}>
                    <svg className={ICON_CLS} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.28em] text-[#1a1a1a]">
                      {t.advantagesLocationEyebrow}
                    </p>
                    <h3 className="text-[15px] font-semibold leading-snug tracking-wide text-[#1a1a1a] sm:text-base">
                      {t.advantagesLocationTitle}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#5c5c5c] sm:mt-4 sm:text-[15px] sm:leading-[1.8]">
                      {t.advantagesLocationText}
                    </p>
                  </div>
                </div>
              </div>
            </ServicesPanelGlass>
          </ScrollReveal>

          {advantages.map((item, i) => (
            <ScrollReveal key={item.id} variant="up" delay={i * 55} className="h-full">
              <ServicesPanelGlass
                id={`advantage-${item.icon}`}
                tone="light"
                className={GLASS_CARD}
              >
                <AdvantageCardContent
                  title={item.title}
                  text={item.text}
                  icon={item.icon}
                  number={String(i + 2).padStart(2, '0')}
                />
              </ServicesPanelGlass>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
