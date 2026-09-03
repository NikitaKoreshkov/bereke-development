'use client';

import { useLayoutEffect } from 'react';

/** Locks page scroll while overlays (lightbox, modal, menu) are open. */
export function useScrollLock(active: boolean) {
  useLayoutEffect(() => {
    if (!active) return;

    const scrollY = window.scrollY;
    const { style: htmlStyle } = document.documentElement;
    const { style: bodyStyle } = document.body;

    const prev = {
      htmlOverflow: htmlStyle.overflow,
      bodyOverflow: bodyStyle.overflow,
      bodyPosition: bodyStyle.position,
      bodyTop: bodyStyle.top,
      bodyWidth: bodyStyle.width,
      bodyPaddingRight: bodyStyle.paddingRight,
    };

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    htmlStyle.overflow = 'hidden';
    bodyStyle.overflow = 'hidden';
    bodyStyle.position = 'fixed';
    bodyStyle.top = `-${scrollY}px`;
    bodyStyle.width = '100%';

    if (scrollbarWidth > 0) {
      bodyStyle.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      htmlStyle.overflow = prev.htmlOverflow;
      bodyStyle.overflow = prev.bodyOverflow;
      bodyStyle.position = prev.bodyPosition;
      bodyStyle.top = prev.bodyTop;
      bodyStyle.width = prev.bodyWidth;
      bodyStyle.paddingRight = prev.bodyPaddingRight;
      window.scrollTo(0, scrollY);
    };
  }, [active]);
}
