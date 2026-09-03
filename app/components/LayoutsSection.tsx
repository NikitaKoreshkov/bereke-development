'use client';

import { useEffect, useRef } from 'react';
import { AnchorLink } from '@/components/ui/AnchorLink';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ServicesPanelGlass } from '@/components/ui/ServicesPanelGlass';
import FloorPlanGallery from './FloorPlanGallery';
import LayoutsCarousel from './LayoutsCarousel';
import PriceCalculator from './PriceCalculator';
import { useSiteContent } from '@/lib/content-context';
import { useLocale } from '@/lib/i18n/locale-context';
import { localizedCopy } from '@/lib/i18n/localized';

const GLASS_CARD = '[--panel-radius:20px]';

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="mb-4 text-xs uppercase tracking-[0.25em] text-[#B8954F]">{children}</p>
  );
}

export default function LayoutsSection() {
  const { copy, copyKk, layouts: allLayouts } = useSiteContent();
  const { locale } = useLocale();
  const t = localizedCopy(copy, copyKk, locale);
  const layouts = allLayouts.filter((i) => i.visible).sort((a, b) => a.order - b.order);
  const twinGridRef = useRef<HTMLDivElement>(null);
  const twinLeftRef = useRef<HTMLDivElement>(null);
  const lockedHeightRef = useRef(0);

  useEffect(() => {
    const grid = twinGridRef.current;
    const left = twinLeftRef.current;
    if (!grid || !left) return;

    const mq = window.matchMedia('(min-width: 1280px)');

    const measureAndLock = () => {
      if (!mq.matches) {
        grid.style.removeProperty('--layouts-twin-locked-height');
        lockedHeightRef.current = 0;
        return;
      }

      const panel = left.querySelector('.layouts-twin-panel') as HTMLElement | null;
      if (!panel) return;

      grid.style.removeProperty('--layouts-twin-locked-height');
      const prevAlign = grid.style.alignItems;
      grid.style.alignItems = 'start';
      void grid.offsetHeight;
      const height = Math.ceil(panel.getBoundingClientRect().height);
      grid.style.alignItems = prevAlign;

      if (height > lockedHeightRef.current) {
        lockedHeightRef.current = height;
      }

      if (lockedHeightRef.current > 0) {
        grid.style.setProperty('--layouts-twin-locked-height', `${lockedHeightRef.current}px`);
      }
    };

    measureAndLock();

    const ro = new ResizeObserver(measureAndLock);
    ro.observe(left);

    mq.addEventListener('change', measureAndLock);
    window.addEventListener('load', measureAndLock);

    return () => {
      ro.disconnect();
      mq.removeEventListener('change', measureAndLock);
      window.removeEventListener('load', measureAndLock);
    };
  }, []);

  return (
    <section key={locale} id="layouts" className="section-bg-stone section-divider-accent py-20 sm:py-28">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl text-center sm:text-left">
          <ScrollReveal variant="blur">
            <SectionLabel>{t.layoutsSectionLabel}</SectionLabel>
          </ScrollReveal>
          <ScrollReveal variant="up" delay={80}>
            <h2
              className="text-2xl uppercase leading-tight tracking-[0.06em] text-[#F4EFE7] sm:text-3xl md:text-4xl lg:max-w-3xl"
              style={{ fontFamily: 'var(--font-playfair-display)' }}
            >
              {t.layoutsTitle}
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="up" delay={140}>
            <div className="mt-6 flex flex-col items-center gap-4 sm:mt-8 sm:flex-row sm:items-start">
              <span className="mt-2 hidden h-px w-10 shrink-0 bg-[#C9A962]/50 sm:block" aria-hidden />
              <p className="max-w-2xl text-sm leading-relaxed text-white/58 sm:text-[15px] sm:leading-[1.85]">
                {t.layoutsSubtitle}
              </p>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal variant="scale" delay={180} className="overflow-visible">
          <div
            ref={twinGridRef}
            className="layouts-twin-grid mt-6 grid gap-5 p-2 sm:mt-8 sm:gap-6 sm:p-4 xl:grid-cols-[3fr_2fr] xl:gap-8"
          >
            <div className="xl:col-span-2">
              <div className="layouts-twin-panel-bleed">
                <div className="relative overflow-hidden rounded-2xl border border-[#E8B84A]/55 bg-gradient-to-br from-[#F6D978] via-[#E8B84A] to-[#D4A017] px-4 py-4 shadow-[0_12px_40px_rgba(212,160,23,0.35)] sm:px-6 sm:py-5">
                  <div
                    className="pointer-events-none absolute inset-y-0 left-0 w-1.5 bg-[#1a1a1a]/80"
                    aria-hidden
                  />
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#1a1a1a]/75">
                    {t.layoutsFirstFloorBadge}
                  </p>
                  <p className="mt-2 max-w-4xl text-sm font-medium leading-relaxed text-[#1a1a1a] sm:text-[15px] sm:leading-[1.7]">
                    {t.layoutsFirstFloorNote}
                  </p>
                </div>
              </div>
            </div>

            <div ref={twinLeftRef} className="layouts-twin-cell">
              <div className="layouts-twin-panel-bleed">
                <FloorPlanGallery />
              </div>
            </div>
            <div className="layouts-twin-cell">
              <div className="layouts-twin-panel-bleed">
                <PriceCalculator />
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="up" delay={300} className="overflow-visible">
          <div className="mt-8 overflow-visible sm:mt-10">
            {layouts.length > 0 ? (
              <LayoutsCarousel />
            ) : (
              <div className="px-1 py-2">
                <ServicesPanelGlass id="layouts-placeholder" tone="light" className={GLASS_CARD}>
                  <p className="px-6 py-12 text-center text-sm leading-relaxed text-gray-500">
                    {t.layoutsCarouselNote}
                  </p>
                </ServicesPanelGlass>
              </div>
            )}
          </div>
        </ScrollReveal>

        <ScrollReveal variant="up" delay={360}>
          <div className="mt-12 text-center sm:mt-14">
            <AnchorLink
              href="/spaces"
              className="micro-hover micro-hover-pill inline-flex rounded-full border border-[#C9A962]/70 bg-[#C9A962]/10 px-8 py-3.5 text-xs uppercase tracking-[0.2em] text-[#F2DDA8] hover:border-[#C9A962] hover:bg-[#C9A962] hover:text-[#191f2b]"
            >
              {t.layoutsCta}
            </AnchorLink>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
