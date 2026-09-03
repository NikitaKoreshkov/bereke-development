'use client';

import { useEffect, useRef, useState } from 'react';
import { HeroVideo } from '@/components/ui/HeroVideo';
import { useSiteContent } from '@/lib/content-context';
import { useLocale } from '@/lib/i18n/locale-context';
import { localizedCopy } from '@/lib/i18n/localized';

type HeroSectionProps = {
  onConsultation: () => void;
};

const PARALLAX_FACTOR = 0.42;

export default function HeroSection({ onConsultation }: HeroSectionProps) {
  const { copy, copyKk, site } = useSiteContent();
  const { locale } = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const [parallaxY, setParallaxY] = useState(0);
  const t = localizedCopy(copy, copyKk, locale);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let ticking = false;

    const updateParallax = () => {
      const section = sectionRef.current;
      if (!section) {
        ticking = false;
        return;
      }

      const { top, height } = section.getBoundingClientRect();
      const scrolled = Math.min(Math.max(-top, 0), height);
      setParallaxY(scrolled * PARALLAX_FACTOR);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateParallax);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    updateParallax();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section id="hero" ref={sectionRef} className="hero-section relative min-h-[100svh] overflow-hidden">
      {/* Фон: zoom + parallax при скролле */}
      <div
        className="hero-parallax-layer absolute inset-0 will-change-transform"
        style={{ transform: `translate3d(0, ${parallaxY}px, 0)` }}
        aria-hidden
      >
        <div className="hero-bg absolute -inset-[12%] scale-105" aria-hidden>
          <HeroVideo />
        </div>
      </div>

      {/* Многослойный оверлей */}
      <div className="absolute inset-0 bg-[#0a0c10]/55" aria-hidden />
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,transparent_0%,rgba(0,0,0,0.35)_70%)]"
        aria-hidden
      />

      {/* Контент */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-7xl flex-col justify-end px-4 pb-20 pt-32 sm:px-6 sm:pb-24 lg:justify-center lg:pb-28 lg:pt-36">
        <div className="hero-content max-w-4xl">
          <div className="mb-6 flex items-center gap-4 sm:mb-8">
            <span className="h-px w-12 bg-[#C9A962] sm:w-16" aria-hidden />
            <p className="text-[10px] uppercase tracking-[0.35em] text-white/70 sm:text-xs">
              {t.heroEyebrow}
            </p>
          </div>

          <h1
            key={locale}
            className="max-w-3xl text-[1.35rem] font-normal leading-[1.45] tracking-[0.01em] text-white sm:text-2xl sm:leading-[1.5] md:text-[1.75rem] lg:text-[2rem] lg:leading-[1.55]"
            style={{ fontFamily: 'var(--font-playfair-display)' }}
          >
            <span className="block text-[1.65rem] uppercase tracking-[0.14em] text-white sm:text-3xl md:text-[2.35rem] lg:text-[2.75rem]">
              БЦ BEREKE
            </span>
            <span className="mt-2 block text-[10px] uppercase tracking-[0.28em] text-white/55 sm:mt-3 sm:text-xs">
              {locale === 'kk'
                ? 'А класындағы бизнес-орталық · Алматы'
                : 'Бизнес-центр класса А · Алматы'}
            </span>
            <span className="mt-5 block sm:mt-6">{t.heroLead}</span>
            <span className="mt-3 block text-[#C9A962] sm:mt-4">{t.heroLeadAccent}</span>
          </h1>

          <div className="hero-actions mt-10 flex flex-col gap-3 sm:mt-12 sm:flex-row sm:items-center sm:gap-4">
            <button
              type="button"
              onClick={onConsultation}
              className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full bg-[#C9A962] px-8 py-4 text-xs uppercase tracking-[0.12em] whitespace-nowrap text-[#1a1a1a] transition-all duration-300 hover:bg-[#d4b56e] hover:shadow-[0_8px_32px_rgba(201,169,98,0.35)] sm:w-auto sm:px-10 sm:tracking-[0.2em]"
            >
              <span className="relative z-10">{t.heroCtaConsultation}</span>
            </button>
            <a
              href={site.brochureUrl}
              className="hero-glass-btn inline-flex w-full items-center justify-center rounded-full border border-white/40 px-8 py-4 text-xs uppercase tracking-[0.12em] whitespace-nowrap text-white transition-all duration-300 hover:border-[#C9A962] hover:text-[#C9A962] sm:w-auto sm:px-10 sm:tracking-[0.2em]"
            >
              {t.heroCtaBrochure}
            </a>
          </div>
        </div>

        {/* Скролл-индикатор */}
        <div className="hero-scroll absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex">
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">
            {t.heroScrollHint}
          </span>
          <span className="block h-10 w-px bg-gradient-to-b from-white/50 to-transparent" />
        </div>
      </div>
    </section>
  );
}
