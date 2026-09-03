'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/ui/Icons';
import { useSiteContent } from '@/lib/content-context';
import { useLocale } from '@/lib/i18n/locale-context';
import { localizedConstructionUpdate, localizedCopy } from '@/lib/i18n/localized';
import ConstructionCard from './ConstructionCard';

const CARD_GAP = 24;
const AUTOPLAY_MS = 4800;
const SCROLL_DURATION_MS = 320;
const RAPID_NAV_MS = 220;
const TAP_MOVE_THRESHOLD_PX = 10;

function modIndex(index: number, count: number) {
  return ((index % count) + count) % count;
}

function isDesktopNavOnly() {
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

function readCardStep(track: HTMLElement | null) {
  const card = track?.querySelector<HTMLElement>('.layouts-carousel-card');
  if (!card) return 280 + CARD_GAP;
  return card.getBoundingClientRect().width + CARD_GAP;
}

type ConstructionCarouselProps = {
  onOpen: (index: number) => void;
  paused?: boolean;
};

export default function ConstructionCarousel({ onOpen, paused = false }: ConstructionCarouselProps) {
  const { constructionUpdates: allUpdates, copy, copyKk } = useSiteContent();
  const { locale } = useLocale();
  const t = localizedCopy(copy, copyKk, locale);
  const updates = allUpdates.filter((i) => i.visible).sort((a, b) => a.order - b.order);
  const trackRef = useRef<HTMLDivElement>(null);
  const virtualIndexRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const isNormalizingRef = useRef(false);
  const isDraggingRef = useRef(false);
  const pausedRef = useRef(false);
  const scrollEndTimerRef = useRef<number | null>(null);
  const autoplayTimerRef = useRef<number | null>(null);
  const autoplayResumeTimerRef = useRef<number | null>(null);
  const prefersReducedMotionRef = useRef(false);
  const cardStepRef = useRef(304);
  const lastNavAtRef = useRef(0);
  const syncRafRef = useRef<number | null>(null);
  const pointerRef = useRef({
    startX: 0,
    startY: 0,
    moved: false,
    loopIndex: null as number | null,
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [centerLoopIndex, setCenterLoopIndex] = useState(0);
  const count = updates.length;
  const loopItems = [...updates, ...updates, ...updates];

  const measureCards = useCallback(() => {
    cardStepRef.current = readCardStep(trackRef.current);
  }, []);

  const syncCenterFromDom = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const trackRect = track.getBoundingClientRect();
    const trackCenter = trackRect.left + trackRect.width / 2;
    const cards = track.querySelectorAll<HTMLElement>('[data-loop-index]');

    let bestIndex = virtualIndexRef.current;
    let bestDistance = Infinity;

    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      if (rect.width < 1) return;
      const cardCenter = rect.left + rect.width / 2;
      const distance = Math.abs(cardCenter - trackCenter);
      if (distance < bestDistance) {
        bestDistance = distance;
        bestIndex = Number(card.dataset.loopIndex);
      }
    });

    virtualIndexRef.current = bestIndex;
    setCenterLoopIndex(bestIndex);
    setActiveIndex(modIndex(bestIndex, count));
  }, [count]);

  const stopSmoothScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const current = el.scrollLeft;
    el.style.scrollBehavior = 'auto';
    el.scrollLeft = current;
    el.style.scrollBehavior = '';
  }, []);

  const setScrollPosition = useCallback((index: number, smooth: boolean) => {
    const el = trackRef.current;
    if (!el) return;

    const left = index * cardStepRef.current;
    const behavior = smooth && !prefersReducedMotionRef.current ? 'smooth' : 'instant';

    if (behavior === 'instant') {
      el.style.scrollBehavior = 'auto';
      el.scrollLeft = left;
      el.style.scrollBehavior = '';
      return;
    }

    el.scrollTo({ left, behavior: 'smooth' });
  }, []);

  const normalizeLoop = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;

    let index = virtualIndexRef.current;

    if (index < count) {
      index += count;
    } else if (index >= count * 2) {
      index -= count;
    }

    if (index !== virtualIndexRef.current) {
      isNormalizingRef.current = true;
      virtualIndexRef.current = index;
      el.style.scrollBehavior = 'auto';
      el.scrollLeft = index * cardStepRef.current;
      el.style.scrollBehavior = '';
      requestAnimationFrame(() => {
        isNormalizingRef.current = false;
      });
    }

    setActiveIndex(modIndex(index, count));
    setCenterLoopIndex(index);
  }, [count]);

  const finishScroll = useCallback(() => {
    if (scrollEndTimerRef.current) {
      clearTimeout(scrollEndTimerRef.current);
      scrollEndTimerRef.current = null;
    }
    if (syncRafRef.current) {
      cancelAnimationFrame(syncRafRef.current);
      syncRafRef.current = null;
    }
    isAnimatingRef.current = false;
    normalizeLoop();
  }, [normalizeLoop]);

  const scheduleScrollEnd = useCallback(() => {
    if (scrollEndTimerRef.current) clearTimeout(scrollEndTimerRef.current);
    scrollEndTimerRef.current = window.setTimeout(finishScroll, SCROLL_DURATION_MS + 40);
  }, [finishScroll]);

  const navigateTo = useCallback(
    (index: number, smooth: boolean) => {
      const el = trackRef.current;
      if (!el) return;

      const now = performance.now();
      const rapid = now - lastNavAtRef.current < RAPID_NAV_MS;
      lastNavAtRef.current = now;

      if (isAnimatingRef.current) {
        if (scrollEndTimerRef.current) {
          clearTimeout(scrollEndTimerRef.current);
          scrollEndTimerRef.current = null;
        }
        if (syncRafRef.current) {
          cancelAnimationFrame(syncRafRef.current);
          syncRafRef.current = null;
        }
        stopSmoothScroll();
        isAnimatingRef.current = false;
      }

      virtualIndexRef.current = index;
      setActiveIndex(modIndex(index, count));
      setCenterLoopIndex(index);

      const shouldAnimate = smooth && !rapid && !prefersReducedMotionRef.current;
      isAnimatingRef.current = shouldAnimate;
      setScrollPosition(index, shouldAnimate);

      if (shouldAnimate) {
        scheduleScrollEnd();
      } else {
        normalizeLoop();
      }
    },
    [count, normalizeLoop, scheduleScrollEnd, setScrollPosition, stopSmoothScroll],
  );

  const navigateBy = useCallback(
    (delta: number) => {
      navigateTo(virtualIndexRef.current + delta, true);
    },
    [navigateTo],
  );

  const goToSlide = useCallback(
    (targetIndex: number, smooth = true) => {
      const base = Math.floor(virtualIndexRef.current / count) * count;
      navigateTo(base + targetIndex, smooth);
    },
    [count, navigateTo],
  );

  const goNext = useCallback(() => navigateBy(1), [navigateBy]);
  const goPrev = useCallback(() => navigateBy(-1), [navigateBy]);

  const clearAutoplayTimer = useCallback(() => {
    if (autoplayTimerRef.current) {
      clearTimeout(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
  }, []);

  const scheduleAutoplay = useCallback(
    (delay = AUTOPLAY_MS) => {
      clearAutoplayTimer();
      if (prefersReducedMotionRef.current) return;

      autoplayTimerRef.current = window.setTimeout(() => {
        if (pausedRef.current || isAnimatingRef.current || isDraggingRef.current) {
          scheduleAutoplay(250);
          return;
        }

        goNext();
        scheduleAutoplay(AUTOPLAY_MS);
      }, delay);
    },
    [clearAutoplayTimer, goNext],
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
    if (paused) {
      pausedRef.current = true;
      clearAutoplayTimer();
      return;
    }
    pausedRef.current = false;
    scheduleAutoplay(AUTOPLAY_MS);
  }, [clearAutoplayTimer, paused, scheduleAutoplay]);

  useEffect(() => {
    prefersReducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    measureCards();
    virtualIndexRef.current = count;
    setCenterLoopIndex(count);
    requestAnimationFrame(() => {
      measureCards();
      setScrollPosition(count, false);
      syncCenterFromDom();
    });
    scheduleAutoplay(AUTOPLAY_MS);

    return () => {
      clearAutoplayTimer();
      if (autoplayResumeTimerRef.current) {
        clearTimeout(autoplayResumeTimerRef.current);
      }
      if (syncRafRef.current) cancelAnimationFrame(syncRafRef.current);
    };
  }, [clearAutoplayTimer, count, measureCards, scheduleAutoplay, setScrollPosition, syncCenterFromDom]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const onScroll = () => {
      if (isNormalizingRef.current || isAnimatingRef.current) return;

      if (isDesktopNavOnly()) {
        el.style.scrollBehavior = 'auto';
        el.scrollLeft = virtualIndexRef.current * cardStepRef.current;
        el.style.scrollBehavior = '';
        return;
      }

      if (syncRafRef.current) return;
      syncRafRef.current = requestAnimationFrame(() => {
        syncRafRef.current = null;
        syncCenterFromDom();
      });
    };

    const onScrollEnd = () => {
      if (isNormalizingRef.current) return;
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        finishScroll();
        return;
      }
      if (isAnimatingRef.current) {
        finishScroll();
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return;

      const card = (event.target as Element).closest('[data-loop-index]');
      pointerRef.current = {
        startX: event.clientX,
        startY: event.clientY,
        moved: false,
        loopIndex: card ? Number((card as HTMLElement).dataset.loopIndex) : null,
      };
      isDraggingRef.current = true;
      if (isAnimatingRef.current) {
        stopSmoothScroll();
        isAnimatingRef.current = false;
      }
      pauseAutoplay();
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!isDraggingRef.current) return;
      const pointer = pointerRef.current;
      if (
        Math.hypot(event.clientX - pointer.startX, event.clientY - pointer.startY) >
        TAP_MOVE_THRESHOLD_PX
      ) {
        pointer.moved = true;
      }
    };

    const onPointerUp = (event: PointerEvent) => {
      const pointer = pointerRef.current;
      const loopIndex = pointer.loopIndex;
      const wasTap =
        isDraggingRef.current &&
        !pointer.moved &&
        loopIndex !== null &&
        Math.hypot(event.clientX - pointer.startX, event.clientY - pointer.startY) <=
          TAP_MOVE_THRESHOLD_PX;

      if (wasTap && loopIndex !== null) {
        resetAutoplay();
        if (loopIndex !== virtualIndexRef.current) {
          navigateTo(loopIndex, true);
        } else {
          onOpen(modIndex(loopIndex, count));
        }
      }

      isDraggingRef.current = false;
      pointerRef.current = { startX: 0, startY: 0, moved: false, loopIndex: null };
    };

    const onWheel = (event: WheelEvent) => {
      if (!isDesktopNavOnly()) return;
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
        event.preventDefault();
      }
    };

    const onResize = () => {
      measureCards();
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    el.addEventListener('scrollend', onScrollEnd);
    el.addEventListener('pointerdown', onPointerDown);
    el.addEventListener('pointermove', onPointerMove);
    el.addEventListener('pointerup', onPointerUp);
    el.addEventListener('pointercancel', onPointerUp);
    el.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('resize', onResize);

    const resizeObserver = new ResizeObserver(() => {
      measureCards();
    });
    resizeObserver.observe(el);

    return () => {
      el.removeEventListener('scroll', onScroll);
      el.removeEventListener('scrollend', onScrollEnd);
      el.removeEventListener('pointerdown', onPointerDown);
      el.removeEventListener('pointermove', onPointerMove);
      el.removeEventListener('pointerup', onPointerUp);
      el.removeEventListener('pointercancel', onPointerUp);
      el.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', onResize);
      resizeObserver.disconnect();
      if (scrollEndTimerRef.current) clearTimeout(scrollEndTimerRef.current);
      if (syncRafRef.current) cancelAnimationFrame(syncRafRef.current);
    };
  }, [
    count,
    finishScroll,
    measureCards,
    navigateTo,
    onOpen,
    pauseAutoplay,
    resetAutoplay,
    stopSmoothScroll,
    syncCenterFromDom,
  ]);

  if (count === 0) {
    return (
      <p className="py-12 text-center text-sm text-white/50">{t.constructionEmpty}</p>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        pausedRef.current = true;
        clearAutoplayTimer();
      }}
      onMouseLeave={() => {
        if (paused) return;
        pausedRef.current = false;
        resetAutoplay();
      }}
      onTouchStart={pauseAutoplay}
      onWheel={pauseAutoplay}
    >
      <div className="layouts-carousel-stage relative -mx-4 sm:-mx-6 lg:-mx-8">
        <button
          type="button"
          onClick={() => {
            resetAutoplay();
            goPrev();
          }}
          className="absolute left-2 top-1/2 z-30 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/12 bg-black/45 text-white shadow-[0_8px_24px_rgba(0,0,0,0.24)] backdrop-blur-md transition-all hover:border-[#C9A962] hover:bg-[#C9A962] hover:text-[#191f2b] sm:left-4 lg:left-6"
          aria-label="Предыдущий этап"
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => {
            resetAutoplay();
            goNext();
          }}
          className="absolute right-2 top-1/2 z-30 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/12 bg-black/45 text-white shadow-[0_8px_24px_rgba(0,0,0,0.24)] backdrop-blur-md transition-all hover:border-[#C9A962] hover:bg-[#C9A962] hover:text-[#191f2b] sm:right-4 lg:right-6"
          aria-label="Следующий этап"
        >
          <ChevronRightIcon className="h-4 w-4" />
        </button>

        <div className="layouts-carousel-mask">
          <div ref={trackRef} className="layouts-carousel-track snap-x snap-proximity scrollbar-hide">
            <div className="layouts-carousel-track-inner">
              {loopItems.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  data-loop-index={index}
                  className={`layouts-carousel-card flex snap-center${index === centerLoopIndex ? ' layouts-carousel-card--active' : ''}`}
                >
                  <ConstructionCard
                    item={item}
                    index={modIndex(index, count)}
                    instanceId={`${item.id}-${index}`}
                    isActive={index === centerLoopIndex}
                    className="h-full w-full cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-xl px-4">
        <div className="relative h-px overflow-hidden rounded-full bg-white/12">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#B8954F] to-[#C9A962]"
            style={{
              width: `${((activeIndex + 1) / count) * 100}%`,
              transition: 'width 0.25s linear',
            }}
          />
        </div>

        <div className="mt-5 flex h-6 items-center justify-center gap-1.5">
          {updates.map((item, index) => {
            const active = index === activeIndex;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  resetAutoplay();
                  goToSlide(index);
                }}
                className="flex h-6 w-6 shrink-0 items-center justify-center"
                aria-label={localizedConstructionUpdate(item, locale).title}
                aria-current={active ? 'true' : undefined}
              >
                <span
                  className={`block h-1.5 rounded-full ${
                    active ? 'w-5 bg-[#C9A962]' : 'w-1.5 bg-white/18 hover:bg-[#C9A962]/45'
                  }`}
                />
              </button>
            );
          })}
        </div>

        <p className="mt-3 flex h-4 items-center justify-center gap-2 text-center text-[10px] uppercase tracking-[0.28em] text-white/42">
          <span className="min-w-[7rem] truncate text-[#F2DDA8]">
            {updates[activeIndex]
              ? localizedConstructionUpdate(updates[activeIndex], locale).title
              : ''}
          </span>
          <span className="text-white/25" aria-hidden>
            ·
          </span>
          <span className="tabular-nums">
            {String(activeIndex + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
          </span>
        </p>
      </div>
    </div>
  );
}
