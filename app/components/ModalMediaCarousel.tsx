'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/ui/Icons';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import MediaFullscreen from './MediaFullscreen';

const CARD_GAP = 20;
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
  if (!card) return 160 + CARD_GAP;
  return card.getBoundingClientRect().width + CARD_GAP;
}

type ModalMediaCarouselProps = {
  items: readonly string[];
  kind: 'video' | 'photo';
  emptyCount?: number;
  itemLabel?: string;
  emptyLabel?: string;
};

export default function ModalMediaCarousel({
  items,
  kind,
  emptyCount = 5,
  itemLabel,
  emptyLabel,
}: ModalMediaCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const virtualIndexRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const isNormalizingRef = useRef(false);
  const isDraggingRef = useRef(false);
  const scrollEndTimerRef = useRef<number | null>(null);
  const prefersReducedMotionRef = useRef(false);
  const cardStepRef = useRef(180);
  const lastNavAtRef = useRef(0);
  const syncRafRef = useRef<number | null>(null);
  const pointerRef = useRef({
    startX: 0,
    startY: 0,
    moved: false,
    loopIndex: null as number | null,
  });

  const isVideo = kind === 'video';
  const kindLabel = itemLabel || (isVideo ? 'Видео' : 'Фото');
  const placeholderLabel =
    emptyLabel || (isVideo ? 'Видео будет тут' : 'Фото будет тут');
  const count = items.length > 0 ? items.length : emptyCount;
  const hasMedia = items.length > 0;
  const loopItems = Array.from({ length: count * 3 }, (_, i) => ({
    src: hasMedia ? items[modIndex(i, count)] : null,
    realIndex: modIndex(i, count),
    key: `${kind}-${i}`,
  }));

  const [activeIndex, setActiveIndex] = useState(0);
  const [centerLoopIndex, setCenterLoopIndex] = useState(count);
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

  const viewerItems = Array.from({ length: count }, (_, i) =>
    hasMedia ? items[i] ?? null : null,
  );

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
    if (!smooth || prefersReducedMotionRef.current) {
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
    if (index < count) index += count;
    else if (index >= count * 2) index -= count;

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

      measureCards();
      virtualIndexRef.current = index;
      setActiveIndex(modIndex(index, count));
      setCenterLoopIndex(index);

      const shouldAnimate = smooth && !rapid && !prefersReducedMotionRef.current;
      isAnimatingRef.current = shouldAnimate;
      setScrollPosition(index, shouldAnimate);

      if (shouldAnimate) scheduleScrollEnd();
      else normalizeLoop();
    },
    [count, measureCards, normalizeLoop, scheduleScrollEnd, setScrollPosition, stopSmoothScroll],
  );

  const navigateBy = useCallback(
    (delta: number) => navigateTo(virtualIndexRef.current + delta, true),
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

  const openViewer = useCallback((realIndex: number) => {
    setViewerIndex(realIndex);
  }, []);

  const closeViewer = useCallback(() => {
    setViewerIndex(null);
  }, []);

  const viewerPrev = useCallback(() => {
    setViewerIndex((current) => {
      if (current === null) return current;
      const next = modIndex(current - 1, count);
      goToSlide(next);
      return next;
    });
  }, [count, goToSlide]);

  const viewerNext = useCallback(() => {
    setViewerIndex((current) => {
      if (current === null) return current;
      const next = modIndex(current + 1, count);
      goToSlide(next);
      return next;
    });
  }, [count, goToSlide]);

  useEffect(() => {
    prefersReducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    measureCards();
    virtualIndexRef.current = count;
    setCenterLoopIndex(count);
    setActiveIndex(0);

    requestAnimationFrame(() => {
      measureCards();
      setScrollPosition(count, false);
      syncCenterFromDom();
      // Remeasure after reveal animations / layout settle
      window.setTimeout(() => {
        measureCards();
        setScrollPosition(virtualIndexRef.current, false);
        syncCenterFromDom();
      }, 500);
    });
  }, [count, measureCards, setScrollPosition, syncCenterFromDom]);

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
      if (isAnimatingRef.current) finishScroll();
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
        if (loopIndex !== virtualIndexRef.current) {
          navigateTo(loopIndex, true);
        } else {
          openViewer(modIndex(loopIndex, count));
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

    const onResize = () => measureCards();

    el.addEventListener('scroll', onScroll, { passive: true });
    el.addEventListener('scrollend', onScrollEnd);
    el.addEventListener('pointerdown', onPointerDown);
    el.addEventListener('pointermove', onPointerMove);
    el.addEventListener('pointerup', onPointerUp);
    el.addEventListener('pointercancel', onPointerUp);
    el.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('resize', onResize);

    const resizeObserver = new ResizeObserver(() => measureCards());
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
  }, [count, finishScroll, measureCards, navigateTo, openViewer, stopSmoothScroll, syncCenterFromDom]);

  return (
    <>
    <div className="modal-media-carousel relative">
      <div className="layouts-carousel-stage relative">
        <button
          type="button"
          onClick={goPrev}
          className="absolute left-0 top-1/2 z-30 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/12 bg-black/55 text-white shadow-[0_8px_24px_rgba(0,0,0,0.24)] backdrop-blur-md transition-all hover:border-[#C9A962] hover:bg-[#C9A962] hover:text-[#191f2b] sm:h-11 sm:w-11"
          aria-label="Назад"
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={goNext}
          className="absolute right-0 top-1/2 z-30 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/12 bg-black/55 text-white shadow-[0_8px_24px_rgba(0,0,0,0.24)] backdrop-blur-md transition-all hover:border-[#C9A962] hover:bg-[#C9A962] hover:text-[#191f2b] sm:h-11 sm:w-11"
          aria-label="Вперёд"
        >
          <ChevronRightIcon className="h-4 w-4" />
        </button>

        <div className="layouts-carousel-mask">
          <div ref={trackRef} className="layouts-carousel-track modal-media-track snap-x snap-proximity scrollbar-hide">
            <div className="layouts-carousel-track-inner modal-media-track-inner">
              {loopItems.map((item, index) => {
                const active = index === centerLoopIndex;
                const num = String(item.realIndex + 1).padStart(2, '0');
                return (
                  <div
                    key={item.key}
                    data-loop-index={index}
                    className={`layouts-carousel-card modal-media-card flex snap-center${
                      active ? ' layouts-carousel-card--active' : ''
                    }`}
                  >
                    <div
                      className={`modal-media-slide group/card relative flex h-full w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[18px] px-3 text-center ${
                        active ? 'modal-media-slide--active' : ''
                      }`}
                    >
                      {item.src ? (
                        <>
                          {isVideo ? (
                            <video
                              src={item.src}
                              muted
                              playsInline
                              className="absolute inset-0 h-full w-full object-cover"
                            />
                          ) : (
                            <OptimizedImage
                              src={item.src}
                              alt=""
                              fill
                              sizes="180px"
                              className="object-cover"
                            />
                          )}
                          <div className="absolute inset-0 bg-black/35" aria-hidden />
                        </>
                      ) : null}

                      <p
                        className={`relative z-[1] text-[11px] font-semibold uppercase leading-snug tracking-[0.14em] ${
                          active ? 'text-[#C9A962]' : 'text-white/45'
                        }`}
                      >
                        {item.src ? kindLabel : placeholderLabel}
                      </p>
                      <p
                        className={`relative z-[1] mt-5 text-[10px] tracking-[0.22em] ${
                          active ? 'text-[#C9A962]/80' : 'text-white/25'
                        }`}
                      >
                        {num}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-5 max-w-sm px-2">
        <div className="relative h-px overflow-hidden rounded-full bg-white/12">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#B8954F] to-[#C9A962]"
            style={{
              width: `${((activeIndex + 1) / count) * 100}%`,
              transition: 'width 0.25s linear',
            }}
          />
        </div>

        <div className="mt-4 flex h-6 items-center justify-center gap-1.5">
          {Array.from({ length: count }, (_, index) => {
            const active = index === activeIndex;
            return (
              <button
                key={index}
                type="button"
                onClick={() => goToSlide(index)}
                className="flex h-6 w-6 shrink-0 items-center justify-center"
                aria-label={`Слайд ${index + 1}`}
                aria-current={active ? 'true' : undefined}
              >
                <span
                  className={`block h-1.5 rounded-full transition-all ${
                    active ? 'w-5 bg-[#C9A962]' : 'w-1.5 bg-white/18 hover:bg-[#C9A962]/45'
                  }`}
                />
              </button>
            );
          })}
        </div>

        <p className="mt-2 flex h-4 items-center justify-center gap-2 text-center text-[10px] uppercase tracking-[0.28em] text-white/42">
          <span className="text-[#F2DDA8]">{kindLabel}</span>
          <span className="text-white/25" aria-hidden>
            ·
          </span>
          <span className="tabular-nums">
            {String(activeIndex + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
          </span>
        </p>
      </div>
    </div>

    <MediaFullscreen
      open={viewerIndex !== null}
      kind={kind}
      items={viewerItems}
      index={viewerIndex ?? 0}
      onClose={closeViewer}
      onPrev={viewerPrev}
      onNext={viewerNext}
    />
    </>
  );
}
