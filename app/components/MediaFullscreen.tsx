'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/ui/Icons';
import { OptimizedImage } from '@/components/ui/OptimizedImage';

function CloseIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

type MediaFullscreenProps = {
  open: boolean;
  kind: 'video' | 'photo';
  items: readonly (string | null)[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export default function MediaFullscreen({
  open,
  kind,
  items,
  index,
  onClose,
  onPrev,
  onNext,
}: MediaFullscreenProps) {
  const [mounted, setMounted] = useState(false);
  const count = items.length;
  const src = items[index] ?? null;
  const isVideo = kind === 'video';
  const label = isVideo ? 'Видео' : 'Фото';
  const placeholder = isVideo ? 'Видео будет тут' : 'Фото будет тут';

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopImmediatePropagation();
        onClose();
      }
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', onKeyDown, true);
    return () => window.removeEventListener('keydown', onKeyDown, true);
  }, [open, onClose, onNext, onPrev]);

  if (!open || !mounted || count < 1) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[120] overscroll-none bg-black touch-none"
      role="dialog"
      aria-modal="true"
      aria-label={`${label} ${index + 1}`}
      onClick={onClose}
    >
      {/* Media fills the whole screen */}
      <div className="absolute inset-0 flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
        {src ? (
          isVideo ? (
            <video
              key={src}
              src={src}
              controls
              autoPlay
              playsInline
              className="h-full w-full object-contain"
            />
          ) : (
            <OptimizedImage
              src={src}
              alt={`${label} ${index + 1}`}
              fill
              sizes="100vw"
              className="object-contain object-center"
              priority
            />
          )
        ) : (
          <div className="flex flex-col items-center justify-center px-6 text-center">
            <p className="text-base font-semibold uppercase tracking-[0.2em] text-[#C9A962] sm:text-lg">
              {placeholder}
            </p>
            <p className="mt-5 text-[11px] tracking-[0.28em] text-white/30">
              {String(index + 1).padStart(2, '0')}
            </p>
          </div>
        )}
      </div>

      {/* Floating chrome */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-4 px-4 py-4 pt-[max(1rem,env(safe-area-inset-top))] sm:px-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pointer-events-none min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C9A962]">{label}</p>
          <p className="mt-1 text-[10px] tabular-nums uppercase tracking-[0.24em] text-white/40">
            {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white/80 backdrop-blur-sm transition-colors hover:border-white/40 hover:text-white"
          aria-label="Закрыть"
        >
          <CloseIcon />
        </button>
      </div>

      {count > 1 ? (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="absolute left-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur-sm transition-colors hover:border-[#C9A962] hover:text-[#C9A962] sm:left-6"
            aria-label="Назад"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur-sm transition-colors hover:border-[#C9A962] hover:text-[#C9A962] sm:right-6"
            aria-label="Вперёд"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </>
      ) : null}
    </div>,
    document.body,
  );
}
