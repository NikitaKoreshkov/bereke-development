'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/ui/Icons';
import styles from './residents-carousel.module.css';

const SLIDE_WIDTH = 240;
const SLIDE_GAP = 16;
const SLIDE_STEP = SLIDE_WIDTH + SLIDE_GAP;

function modIndex(index: number, count: number) {
  return ((index % count) + count) % count;
}

interface ResidentsMobileCarouselProps {
  items: readonly string[];
}

export function ResidentsMobileCarousel({ items }: ResidentsMobileCarouselProps) {
  const count = items.length;
  const loopItems = count > 0 ? [...items, ...items, ...items] : [];

  const offsetRef = useRef(count);
  const isMovingRef = useRef(false);
  const [offset, setOffset] = useState(count);
  const [activeIndex, setActiveIndex] = useState(0);
  const [animate, setAnimate] = useState(false);

  const syncOffset = useCallback(
    (nextOffset: number, withAnimation: boolean) => {
      offsetRef.current = nextOffset;
      setAnimate(withAnimation);
      setOffset(nextOffset);
      setActiveIndex(modIndex(nextOffset, count));
    },
    [count],
  );

  const normalizeOffset = useCallback(() => {
    let next = offsetRef.current;

    if (next < count) {
      next += count;
    } else if (next >= count * 2) {
      next -= count;
    }

    if (next !== offsetRef.current) {
      syncOffset(next, false);
    }
  }, [count, syncOffset]);

  const goTo = useCallback(
    (nextOffset: number) => {
      if (count <= 1 || isMovingRef.current) return;
      isMovingRef.current = true;
      syncOffset(nextOffset, true);
    },
    [count, syncOffset],
  );

  const goPrev = useCallback(() => {
    goTo(offsetRef.current - 1);
  }, [goTo]);

  const goNext = useCallback(() => {
    goTo(offsetRef.current + 1);
  }, [goTo]);

  const goToSlide = useCallback(
    (targetIndex: number) => {
      const base = Math.floor(offsetRef.current / count) * count;
      goTo(base + targetIndex);
    },
    [count, goTo],
  );

  useEffect(() => {
    syncOffset(count, false);
  }, [count, syncOffset]);

  if (count === 0) return null;

  return (
    <div className={styles.root}>
      <div className={styles.viewport}>
        {count > 1 ? (
          <button
            type="button"
            onClick={goPrev}
            className={styles.navBtn}
            aria-label="Предыдущий резидент"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </button>
        ) : null}

        <div
          className={styles.track}
          style={
            {
              '--slide-width': `${SLIDE_WIDTH}px`,
              '--slide-gap': `${SLIDE_GAP}px`,
            } as React.CSSProperties
          }
        >
          <div
            className={`${styles.trackInner} ${animate ? styles.trackInnerAnimated : ''}`}
            style={{ transform: `translate3d(${-offset * SLIDE_STEP}px, 0, 0)` }}
            onTransitionEnd={(event) => {
              if (event.propertyName !== 'transform') return;
              normalizeOffset();
              isMovingRef.current = false;
            }}
          >
            {loopItems.map((name, index) => (
              <div
                key={`${name}-${index}`}
                className={`${styles.slide} ${index === offset ? styles.slideActive : ''}`}
                aria-hidden={index !== offset}
              >
                <div className={styles.card}>{name}</div>
              </div>
            ))}
          </div>
        </div>

        {count > 1 ? (
          <button
            type="button"
            onClick={goNext}
            className={`${styles.navBtn} ${styles.navBtnNext}`}
            aria-label="Следующий резидент"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        ) : null}
      </div>

      {count > 1 ? (
        <div className={styles.dots} role="tablist" aria-label="Резиденты">
          {items.map((name, index) => (
            <button
              key={name}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={name}
              className={`${styles.dot} ${index === activeIndex ? styles.dotActive : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
