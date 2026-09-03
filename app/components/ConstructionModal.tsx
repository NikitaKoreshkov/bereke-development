'use client';

import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { InstagramIcon } from '@/components/ui/Icons';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { useScrollLock } from '@/lib/use-scroll-lock';
import { useSiteContent } from '@/lib/content-context';
import type { ConstructionUpdateItem } from '@/lib/content-types';
import { useLocale } from '@/lib/i18n/locale-context';
import { localizedConstructionUpdate, localizedCopy } from '@/lib/i18n/localized';
import ModalMediaCarousel from './ModalMediaCarousel';

function CloseIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function Reveal({
  children,
  delay,
  className = '',
  from = 'up',
}: {
  children: ReactNode;
  delay: number;
  className?: string;
  from?: 'up' | 'left';
}) {
  return (
    <div
      className={`construction-modal-reveal ${from === 'left' ? 'construction-modal-reveal--left' : ''} ${className}`.trim()}
      style={{ '--modal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}

function SectionLabel({ index, children }: { index: string; children: string }) {
  return (
    <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40">
      <span className="text-[#C9A962]">{index}</span>
      <span className="ml-2.5">{children}</span>
    </p>
  );
}

type ConstructionModalProps = {
  open: boolean;
  index: number;
  onClose: () => void;
};

export default function ConstructionModal({ open, index, onClose }: ConstructionModalProps) {
  const { constructionUpdates: allUpdates, site, copy, copyKk } = useSiteContent();
  const { locale } = useLocale();
  const t = localizedCopy(copy, copyKk, locale);
  const updates = allUpdates.filter((i) => i.visible).sort((a, b) => a.order - b.order);
  const item: ConstructionUpdateItem | undefined = updates[index];
  const localized = item ? localizedConstructionUpdate(item, locale) : null;
  const [mounted, setMounted] = useState(false);
  /** Panel/backdrop visible */
  const [visible, setVisible] = useState(false);
  /** Content stagger starts only after panel is on screen */
  const [ready, setReady] = useState(false);
  const photos = item?.photos ?? [];
  const videos = item?.videos ?? [];
  const instagramHref = item?.instagramUrl || site.instagram;

  useScrollLock(open);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) {
      setVisible(false);
      setReady(false);
      return;
    }

    setVisible(false);
    setReady(false);

    let cancelled = false;
    let readyTimer = 0;

    const enterTimer = window.setTimeout(() => {
      if (cancelled) return;
      setVisible(true);
      // Start content cascade after the panel has mostly appeared
      readyTimer = window.setTimeout(() => {
        if (!cancelled) setReady(true);
      }, 380);
    }, 30);

    return () => {
      cancelled = true;
      window.clearTimeout(enterTimer);
      window.clearTimeout(readyTimer);
    };
  }, [open, index]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open || !mounted || !item) return null;

  return createPortal(
    <div
      key={`construction-modal-${index}`}
      className={`construction-modal-root fixed inset-0 z-[100] flex h-[100dvh] max-h-[100dvh] items-stretch justify-center p-0 sm:items-center sm:p-6 ${
        visible ? 'is-visible' : ''
      }`}
      role="dialog"
      aria-modal="true"
      aria-label={localized?.title || item.title}
      onClick={onClose}
    >
      {/* Blur/veil only on desktop — mobile is a full page */}
      <div className="construction-modal-blur hidden sm:block" aria-hidden />
      <div
        className={`construction-modal-veil absolute inset-0 hidden bg-black/55 sm:block ${visible ? 'is-visible' : ''}`}
        aria-hidden
      />

      <div
        className={`construction-modal-panel relative z-10 flex h-full max-h-[100dvh] w-full max-w-none flex-col overflow-hidden rounded-none border-0 bg-[#0a0a0a] sm:h-auto sm:max-h-[min(94vh,920px)] sm:max-w-4xl sm:rounded-[32px] sm:border sm:border-white/[0.08] sm:shadow-[0_40px_100px_rgba(0,0,0,0.6)] ${
          visible ? 'is-visible' : ''
        } ${ready ? 'is-ready' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-white/[0.06] px-5 py-5 pt-[max(1.25rem,env(safe-area-inset-top))] sm:px-8 sm:py-7">
          <div className="min-w-0">
            <Reveal delay={0}>
              <h2 className="text-[1.35rem] font-semibold uppercase leading-none tracking-[0.04em] text-white sm:text-[1.75rem]">
                {localized?.title}
              </h2>
            </Reveal>
            <Reveal delay={90}>
              <p className="mt-2.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C9A962] sm:text-[11px]">
                {localized?.category}
              </p>
            </Reveal>
          </div>
          <Reveal delay={60} className="shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/75 transition-colors hover:border-white/40 hover:text-white"
              aria-label={t.layoutsCloseAria}
            >
              <CloseIcon />
            </button>
          </Reveal>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-8 sm:py-8 sm:pb-8">
          <section className="mb-10 border-b border-white/[0.06] pb-10">
            <Reveal delay={160}>
              <SectionLabel index="01">{t.constructionStageLabel}</SectionLabel>
            </Reveal>
            <Reveal delay={260}>
              <p className="max-w-3xl text-[1.05rem] font-medium uppercase leading-[1.45] tracking-[0.02em] text-white sm:text-[1.25rem] sm:leading-[1.4]">
                {localized?.description}
              </p>
            </Reveal>
            <Reveal delay={360}>
              <p className="mt-4 text-[10px] uppercase tracking-[0.2em] text-white/35">{localized?.date}</p>
            </Reveal>

            {instagramHref ? (
              <Reveal delay={460}>
                <a
                  href={instagramHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 flex items-center gap-4 overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-r from-[#1a1218] via-[#141414] to-[#121018] px-4 py-3.5 transition-colors hover:border-[#C9A962]/35 sm:px-5"
                >
                  <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-2 ring-[#C9A962]/35">
                    <OptimizedImage src={site.logoUrl} alt="" fill sizes="44px" className="object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-white">{site.instagramHandle}</p>
                    <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#C9A962]">
                      {t.constructionOpenInstagram}
                    </p>
                  </div>
                  <InstagramIcon className="h-5 w-5 shrink-0 text-white/55" />
                </a>
              </Reveal>
            ) : null}
          </section>

          <section className="mb-10">
            <Reveal delay={560}>
              <SectionLabel index="02">{t.constructionWorksLabel}</SectionLabel>
            </Reveal>
            <ul className="border-y border-white/[0.06]">
              {(localized?.works ?? item.works).map((work, i) => (
                <li
                  key={`${work}-${i}`}
                  className="construction-modal-reveal construction-modal-reveal--left flex items-stretch gap-4 border-b border-white/[0.06] py-4 last:border-b-0 sm:gap-5"
                  style={{ '--modal-delay': `${660 + i * 110}ms` } as CSSProperties}
                >
                  <span className="w-7 shrink-0 self-center text-[11px] font-medium tracking-[0.14em] text-white/30">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="w-px shrink-0 self-stretch bg-[#C9A962]/70" aria-hidden />
                  <span className="self-center text-sm leading-relaxed text-white/85 sm:text-[15px]">{work}</span>
                </li>
              ))}
            </ul>
          </section>

          <Reveal delay={660 + (localized?.works.length ?? item.works.length) * 110 + 80} className="mb-10">
            <SectionLabel index="03">{t.constructionVideoLabel}</SectionLabel>
            <ModalMediaCarousel
              items={videos}
              kind="video"
              emptyCount={5}
              itemLabel={t.constructionMediaVideo}
              emptyLabel={t.constructionMediaVideoSoon}
            />
          </Reveal>

          <Reveal delay={660 + (localized?.works.length ?? item.works.length) * 110 + 200} className="mb-2">
            <SectionLabel index="04">{t.constructionPhotosLabel}</SectionLabel>
            <ModalMediaCarousel
              items={photos}
              kind="photo"
              emptyCount={5}
              itemLabel={t.constructionMediaPhoto}
              emptyLabel={t.constructionMediaPhotoSoon}
            />
          </Reveal>
        </div>
      </div>
    </div>,
    document.body,
  );
}
