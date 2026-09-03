'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/ui/Icons';
import { ImageZoomHint } from '@/components/ui/ImageZoomHint';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { ServicesPanelGlass } from '@/components/ui/ServicesPanelGlass';
import panelStyles from '@/components/ui/services-panel-glass.module.css';
import { useSiteContent } from '@/lib/content-context';
import type { FloorPlanItem } from '@/lib/content-types';
import { useLocale } from '@/lib/i18n/locale-context';
import { localizedCopy, localizedFloorPlanTitle } from '@/lib/i18n/localized';
import { useScrollLock } from '@/lib/use-scroll-lock';

const FADE_MS = 480;
const AUTOPLAY_MS = 4800;

function CloseIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

type FloorPlanLightboxProps = {
  open: boolean;
  index: number;
  plans: FloorPlanItem[];
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

function FloorPlanLightbox({ open, index, plans, onClose, onPrev, onNext }: FloorPlanLightboxProps) {
  const { copy, copyKk } = useSiteContent();
  const { locale } = useLocale();
  const t = localizedCopy(copy, copyKk, locale);
  const plan = plans[index];
  const planTitle = plan ? localizedFloorPlanTitle(plan, locale) : '';
  const count = plans.length;
  const [mounted, setMounted] = useState(false);

  useScrollLock(open);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose, onNext, onPrev]);

  if (!open || !mounted || !plan) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex flex-col overscroll-none bg-[var(--color-surface-graphite)] text-white touch-none"
      role="dialog"
      aria-modal="true"
      aria-label={`${t.floorPlanDialogAria} ${index + 1} / ${count}`}
    >
      <div className="relative z-10 flex items-center justify-between gap-4 border-b border-white/10 px-4 py-4 pt-[max(1rem,env(safe-area-inset-top))] sm:px-6">
        <p className="text-[10px] uppercase tracking-[0.28em] text-white/45">
          {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="floor-plan-nav-btn"
          aria-label={t.floorPlanCloseAria}
        >
          <CloseIcon />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-3 py-4 sm:px-8">
        {count > 1 ? (
          <button
            type="button"
            onClick={onPrev}
            className="floor-plan-nav-btn absolute left-3 z-10 hidden sm:flex sm:left-6"
            aria-label={t.floorPlanPrevAria}
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
        ) : null}

        <div className="relative h-full w-full max-h-[calc(100dvh-9rem)] max-w-6xl">
          <OptimizedImage
            src={plan.image}
            alt={`${t.floorPlanDialogAria} — ${planTitle}`}
            fill
            sizes="100vw"
            className="floor-plan-lightbox-image object-contain object-center"
            priority
          />
        </div>

        {count > 1 ? (
          <button
            type="button"
            onClick={onNext}
            className="floor-plan-nav-btn absolute right-3 z-10 hidden sm:flex sm:right-6"
            aria-label={t.floorPlanNextAria}
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        ) : null}
      </div>

      {count > 1 ? (
        <div className="flex items-center justify-center gap-5 border-t border-[#1a1a1a]/8 px-4 py-4 sm:hidden">
          <button type="button" onClick={onPrev} className="floor-plan-nav-btn" aria-label={t.floorPlanPrevAria}>
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <button type="button" onClick={onNext} className="floor-plan-nav-btn" aria-label={t.floorPlanNextAria}>
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>
      ) : null}
    </div>,
    document.body,
  );
}

export default function FloorPlanGallery() {
  const { copy, copyKk, floorPlans: allPlans, images } = useSiteContent();
  const { locale } = useLocale();
  const t = localizedCopy(copy, copyKk, locale);
  const floorPlans = allPlans.filter((i) => i.visible).sort((a, b) => a.order - b.order);
  const [activeIndex, setActiveIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const busyRef = useRef(false);
  const fadeTimerRef = useRef<number | null>(null);
  const autoplayTimerRef = useRef<number | null>(null);
  const autoplayResumeTimerRef = useRef<number | null>(null);
  const pausedRef = useRef(false);
  const prefersReducedMotionRef = useRef(false);
  const lightboxOpenRef = useRef(lightboxOpen);
  const activeIndexRef = useRef(activeIndex);

  const count = floorPlans.length;
  const activePlan = floorPlans[activeIndex] ?? floorPlans[0];
  const activePlanTitle = activePlan ? localizedFloorPlanTitle(activePlan, locale) : '';

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    lightboxOpenRef.current = lightboxOpen;
  }, [lightboxOpen]);

  useEffect(() => {
    return () => {
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
      if (autoplayTimerRef.current) clearTimeout(autoplayTimerRef.current);
      if (autoplayResumeTimerRef.current) clearTimeout(autoplayResumeTimerRef.current);
    };
  }, []);

  const goTo = useCallback((index: number) => {
    if (index === activeIndexRef.current || busyRef.current) return;

    busyRef.current = true;
    setFadeIn(false);

    if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    fadeTimerRef.current = window.setTimeout(() => {
      setActiveIndex(index);
      activeIndexRef.current = index;
      requestAnimationFrame(() => {
        setFadeIn(true);
        busyRef.current = false;
        fadeTimerRef.current = null;
      });
    }, FADE_MS);
  }, []);

  const goToInstant = useCallback((index: number) => {
    if (index === activeIndexRef.current) return;
    if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    busyRef.current = false;
    fadeTimerRef.current = null;
    setActiveIndex(index);
    activeIndexRef.current = index;
    setFadeIn(true);
  }, []);

  const clearAutoplayTimer = useCallback(() => {
    if (autoplayTimerRef.current) {
      clearTimeout(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
  }, []);

  const scheduleAutoplay = useCallback(
    (delay = AUTOPLAY_MS) => {
      clearAutoplayTimer();
      if (prefersReducedMotionRef.current || count <= 1) return;

      autoplayTimerRef.current = window.setTimeout(() => {
        if (
          pausedRef.current ||
          busyRef.current ||
          lightboxOpenRef.current
        ) {
          scheduleAutoplay(250);
          return;
        }

        const i = activeIndexRef.current;
        goTo(i === count - 1 ? 0 : i + 1);
        scheduleAutoplay(AUTOPLAY_MS);
      }, delay);
    },
    [clearAutoplayTimer, count, goTo],
  );

  const resetAutoplay = useCallback(() => {
    clearAutoplayTimer();
    scheduleAutoplay(AUTOPLAY_MS);
  }, [clearAutoplayTimer, scheduleAutoplay]);

  const pauseAutoplay = useCallback(() => {
    clearAutoplayTimer();
    if (autoplayResumeTimerRef.current) {
      clearTimeout(autoplayResumeTimerRef.current);
    }

    pausedRef.current = true;
    autoplayResumeTimerRef.current = window.setTimeout(() => {
      pausedRef.current = false;
      autoplayResumeTimerRef.current = null;
      scheduleAutoplay(AUTOPLAY_MS);
    }, AUTOPLAY_MS * 2);
  }, [clearAutoplayTimer, scheduleAutoplay]);

  useEffect(() => {
    prefersReducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    scheduleAutoplay(AUTOPLAY_MS);

    return () => {
      clearAutoplayTimer();
      if (autoplayResumeTimerRef.current) {
        clearTimeout(autoplayResumeTimerRef.current);
      }
    };
  }, [clearAutoplayTimer, scheduleAutoplay]);

  useEffect(() => {
    if (lightboxOpen) {
      clearAutoplayTimer();
      return;
    }

    resetAutoplay();
  }, [clearAutoplayTimer, lightboxOpen, resetAutoplay]);

  const showPrev = useCallback(() => {
    resetAutoplay();
    const i = activeIndexRef.current;
    goTo(i === 0 ? count - 1 : i - 1);
  }, [count, goTo, resetAutoplay]);

  const showNext = useCallback(() => {
    resetAutoplay();
    const i = activeIndexRef.current;
    goTo(i === count - 1 ? 0 : i + 1);
  }, [count, goTo, resetAutoplay]);

  const goToWithReset = useCallback(
    (index: number) => {
      resetAutoplay();
      goTo(index);
    },
    [goTo, resetAutoplay],
  );

  const lightboxPrev = useCallback(() => {
    const i = activeIndexRef.current;
    goToInstant(i === 0 ? count - 1 : i - 1);
  }, [count, goToInstant]);

  const lightboxNext = useCallback(() => {
    const i = activeIndexRef.current;
    goToInstant(i === count - 1 ? 0 : i + 1);
  }, [count, goToInstant]);

  useEffect(() => {
    if (lightboxOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxOpen, showNext, showPrev]);

  if (!activePlan) {
    return null;
  }

  return (
    <>
      <ServicesPanelGlass
        id="layouts-floor-plan"
        tone="dark"
        className={`${panelStyles.shellNeutralRim} layouts-twin-panel h-full flex-1 [--panel-radius:24px]`}
      >
        <div
          className="flex h-full min-h-0 flex-1 flex-col"
          onMouseEnter={() => {
            pausedRef.current = true;
            clearAutoplayTimer();
          }}
          onMouseLeave={() => {
            pausedRef.current = false;
            if (!lightboxOpenRef.current) resetAutoplay();
          }}
          onTouchStart={pauseAutoplay}
        >
            <div className="flex shrink-0 items-center justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-8 sm:py-5 xl:px-6 xl:py-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#D8C08A]">
                {t.floorPlanTypicalLabel}
              </p>
              <p className="text-[10px] tabular-nums uppercase tracking-[0.24em] text-white/45">
                {String(activeIndex + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
              </p>
            </div>

            <div className="group/plan relative flex min-h-0 flex-1 flex-col py-5 sm:px-6 sm:py-6 xl:px-4 xl:py-5">
              <div className="mx-auto flex min-h-0 w-full max-w-5xl flex-1 flex-col">
                <div className="hidden min-h-0 flex-1 items-center gap-3 sm:flex">
              {count > 1 ? (
                <button
                  type="button"
                  onClick={showPrev}
                  className="floor-plan-nav-btn shrink-0"
                  aria-label={t.floorPlanPrevAria}
                >
                  <ChevronLeftIcon className="h-5 w-5" />
                </button>
              ) : null}

              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                className="group/zoom relative flex min-h-0 min-w-0 flex-1 cursor-pointer self-stretch overflow-hidden rounded-2xl bg-[#f3eee5] text-left"
                aria-label={`${activePlanTitle} / ${t.imageZoomHint}`}
              >
                <div className="relative h-full min-h-[240px] w-full sm:min-h-[260px] xl:min-h-[280px]">
                  <OptimizedImage
                    src={activePlan.image}
                    alt={`${t.floorPlanTypicalLabel} — ${activePlanTitle}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 56vw"
                    className={`floor-plan-image object-contain object-center ${fadeIn ? 'is-visible' : ''}`}
                    priority={activeIndex === 0}
                  />
                  <ImageZoomHint label={t.imageZoomHint} />
                </div>
              </button>

              {count > 1 ? (
                <button
                  type="button"
                  onClick={showNext}
                  className="floor-plan-nav-btn shrink-0"
                  aria-label={t.floorPlanNextAria}
                >
                  <ChevronRightIcon className="h-5 w-5" />
                </button>
              ) : null}
                </div>

                <div className="sm:hidden">
                  <button
                    type="button"
                    onClick={() => setLightboxOpen(true)}
                    className="group/zoom block w-full cursor-pointer overflow-hidden rounded-none bg-[#f3eee5] text-left"
                    aria-label={`${activePlanTitle} / ${t.imageZoomHint}`}
                  >
                    <div className="relative h-[min(56vw,240px)] w-full sm:h-[300px]">
                      <OptimizedImage
                        src={activePlan.image}
                        alt={`${t.floorPlanTypicalLabel} — ${activePlanTitle}`}
                        fill
                        sizes="100vw"
                        className={`floor-plan-image floor-plan-image-mobile object-contain object-center ${fadeIn ? 'is-visible' : ''}`}
                        priority={activeIndex === 0}
                      />
                      <ImageZoomHint label={t.imageZoomHint} />
                    </div>
                  </button>

                  {count > 1 ? (
                    <div className="mt-4 flex items-center justify-center gap-4 px-5">
                      <button
                        type="button"
                        onClick={showPrev}
                        className="floor-plan-nav-btn"
                        aria-label={t.floorPlanPrevAria}
                      >
                        <ChevronLeftIcon className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        onClick={showNext}
                        className="floor-plan-nav-btn"
                        aria-label={t.floorPlanNextAria}
                      >
                        <ChevronRightIcon className="h-5 w-5" />
                      </button>
                    </div>
                  ) : null}

                  <p className="mt-3 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55">
                    {t.floorPlanTapHint}
                  </p>
                </div>

                {count > 1 ? (
                  <div className="mt-5 flex shrink-0 items-center justify-center gap-3 sm:mt-6">
                    {floorPlans.map((plan, index) => (
                      <button
                        key={plan.id}
                        type="button"
                        onClick={() => goToWithReset(index)}
                        className={`floor-plan-dot h-px rounded-full ${
                          index === activeIndex
                            ? 'w-8 bg-[#C9A962]'
                            : 'w-1.5 bg-white/18 hover:bg-white/35'
                        }`}
                        aria-label={localizedFloorPlanTitle(plan, locale)}
                        aria-current={index === activeIndex ? 'true' : undefined}
                      />
                    ))}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="mt-auto flex shrink-0 flex-col items-center justify-between gap-4 border-t border-white/10 px-5 py-5 sm:flex-row sm:px-8 sm:py-6 xl:px-5 xl:py-4">
              <p className="text-center text-[11px] font-medium leading-relaxed tracking-[0.02em] text-white/58 sm:text-left">
                {t.floorPlanNote}
              </p>
              <div className="flex items-center gap-6 text-[10px] uppercase tracking-[0.22em]">
                <a
                  href={activePlan.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="micro-hover-link font-semibold text-[#F2DDA8] hover:text-[#FFE7B0]"
                >
                  PDF
                </a>
                <span className="h-3 w-px bg-white/14" aria-hidden />
                <a
                  href={images.floorPlanPdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="micro-hover-link font-semibold text-white/50 hover:text-white/78"
                >
                  {t.floorPlanFullCta}
                </a>
              </div>
            </div>
        </div>
      </ServicesPanelGlass>

      <FloorPlanLightbox
        open={lightboxOpen}
        index={activeIndex}
        plans={floorPlans}
        onClose={() => setLightboxOpen(false)}
        onPrev={lightboxPrev}
        onNext={lightboxNext}
      />
    </>
  );
}
