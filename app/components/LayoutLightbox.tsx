'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/ui/Icons';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { useSiteContent } from '@/lib/content-context';
import { useLocale } from '@/lib/i18n/locale-context';
import { localizedCopy, localizedLayoutType } from '@/lib/i18n/localized';
import { useScrollLock } from '@/lib/use-scroll-lock';

function CloseIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

type LayoutLightboxProps = {
  open: boolean;
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export default function LayoutLightbox({ open, index, onClose, onPrev, onNext }: LayoutLightboxProps) {
  const { layouts: allLayouts, copy, copyKk } = useSiteContent();
  const { locale } = useLocale();
  const t = localizedCopy(copy, copyKk, locale);
  const layouts = allLayouts.filter((i) => i.visible).sort((a, b) => a.order - b.order);
  const layout = layouts[index];
  const layoutType = layout ? localizedLayoutType(layout, locale) : '';
  const count = layouts.length;
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

  if (!open || !mounted || !layout) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex h-[100dvh] max-h-[100dvh] w-full flex-col overscroll-none bg-[#0a0a0a] text-white touch-none sm:bg-[#faf9f7] sm:text-[#1a1a1a]"
      role="dialog"
      aria-modal="true"
      aria-label={`${t.layoutsOpenAria} ${layout.title}`}
    >
      {/* Mobile: page chrome. Desktop: lightbox bar. */}
      <header className="relative z-10 flex shrink-0 items-start justify-between gap-3 border-b border-white/10 px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:items-center sm:border-[#1a1a1a]/8 sm:px-6 sm:py-4 sm:pt-[max(1rem,env(safe-area-inset-top))]">
        <div className="min-w-0">
          <p className="text-lg font-medium tabular-nums text-[#C9A962] sm:text-2xl sm:text-[#B8954F]">
            {layout.title}
          </p>
          <p className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-white/45 sm:mt-1 sm:text-[#1a1a1a]/45">
            {layoutType}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3 sm:gap-4">
          <p className="hidden text-[10px] tabular-nums uppercase tracking-[0.24em] text-[#1a1a1a]/35 sm:block">
            {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-white/40 hover:text-white sm:border-[#1a1a1a]/12 sm:bg-white sm:text-[#1a1a1a] sm:hover:border-[#B8954F]/50 sm:hover:text-[#B8954F]"
            aria-label={t.layoutsCloseAria}
          >
            <CloseIcon />
          </button>
        </div>
      </header>

      <div className="relative flex min-h-0 flex-1 items-center justify-center sm:px-8 sm:py-4">
        {count > 1 ? (
          <button
            type="button"
            onClick={onPrev}
            className="floor-plan-nav-btn absolute left-3 z-10 hidden sm:flex sm:left-6"
            aria-label={t.layoutsPrevAria}
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
        ) : null}

        {/* Mobile: edge-to-edge page. Desktop: inset card. */}
        <div className="relative h-full w-full overflow-hidden bg-black sm:max-h-[calc(100dvh-10rem)] sm:max-w-6xl sm:rounded-2xl sm:bg-white">
          <OptimizedImage
            src={layout.image}
            alt={`${t.layoutsOpenAria} ${layout.title}`}
            fill
            sizes="100vw"
            className="object-contain object-center"
            priority
          />
        </div>

        {count > 1 ? (
          <button
            type="button"
            onClick={onNext}
            className="floor-plan-nav-btn absolute right-3 z-10 hidden sm:flex sm:right-6"
            aria-label={t.layoutsNextAria}
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        ) : null}
      </div>

      {count > 1 ? (
        <div className="flex shrink-0 items-center justify-between gap-4 border-t border-white/10 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:hidden">
          <button
            type="button"
            onClick={onPrev}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/80"
            aria-label={t.layoutsPrevAria}
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <p className="text-[11px] tabular-nums uppercase tracking-[0.24em] text-white/45">
            {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
          </p>
          <button
            type="button"
            onClick={onNext}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/80"
            aria-label={t.layoutsNextAria}
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>
      ) : (
        <div className="pb-[env(safe-area-inset-bottom)] sm:hidden" aria-hidden />
      )}
    </div>,
    document.body,
  );
}
