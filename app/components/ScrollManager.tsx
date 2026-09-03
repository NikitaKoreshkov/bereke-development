'use client';

import { useEffect, useLayoutEffect } from 'react';
import { usePathname } from 'next/navigation';

function scrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

function scrollToHash(id: string) {
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({ behavior: 'auto', block: 'start' });
  return true;
}

export default function ScrollManager() {
  const pathname = usePathname();

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  useLayoutEffect(() => {
    const hash = window.location.hash.slice(1);

    if (!hash) {
      scrollToTop();
      return;
    }

    if (scrollToHash(hash)) return;

    const observer = new MutationObserver(() => {
      if (scrollToHash(hash)) observer.disconnect();
    });

    observer.observe(document.body, { childList: true, subtree: true });
    const timeout = window.setTimeout(() => observer.disconnect(), 3000);

    return () => {
      observer.disconnect();
      window.clearTimeout(timeout);
    };
  }, [pathname]);

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) scrollToHash(hash);
    };

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return null;
}
