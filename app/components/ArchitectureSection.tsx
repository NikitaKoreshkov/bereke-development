'use client';

import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/ui/Icons';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { ServicesPanelGlass } from '@/components/ui/ServicesPanelGlass';
import { TypewriterParagraphs } from '@/components/ui/TypewriterParagraphs';
import panelStyles from '@/components/ui/services-panel-glass.module.css';
import { useSiteContent } from '@/lib/content-context';
import { useLocale } from '@/lib/i18n/locale-context';
import { localizedCopy, localizedObjectSpec } from '@/lib/i18n/localized';

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="mb-4 text-xs uppercase tracking-[0.25em] text-[#B8954F]">{children}</p>
  );
}

function SpecCell({
  label,
  value,
  showDivider,
  layout = 'desktop',
}: {
  label: string;
  value: string;
  showDivider?: boolean;
  layout?: 'desktop' | 'mobile';
}) {
  if (layout === 'mobile') {
    return (
      <div className="flex min-h-[4.75rem] flex-col items-center justify-center px-4 py-3.5 text-center sm:min-h-[5rem] sm:px-5 sm:py-4">
        <p className="mb-1.5 text-[10px] uppercase leading-[1.35] tracking-[0.12em] text-white/42">
          {label}
        </p>
        <p className="text-[13px] font-semibold leading-[1.45] text-[#F2DDA8] sm:text-[14px]">
          {value}
        </p>
      </div>
    );
  }

  return (
    <div
      className={`flex min-w-0 flex-col justify-start self-stretch px-3 py-4 sm:px-4 ${
        showDivider ? 'border-r border-white/[0.07]' : ''
      }`}
    >
      <p className="mb-2 flex min-h-[2.35rem] shrink-0 items-start text-[9px] uppercase leading-[1.35] tracking-[0.14em] text-white/38 sm:text-[10px]">
        {label}
      </p>
      <p className="text-[12px] font-semibold tabular-nums leading-[1.35] text-[#F2DDA8] sm:text-[13px]">
        {value}
      </p>
    </div>
  );
}

interface ArchitectureSectionProps {
  onScrollTo: (id: string) => void;
}

export default function ArchitectureSection({ onScrollTo }: ArchitectureSectionProps) {
  const { architectureGallery, copy, copyKk, objectSpecs: allSpecs } = useSiteContent();
  const { locale } = useLocale();
  const t = localizedCopy(copy, copyKk, locale);
  const gallery = architectureGallery.filter((i) => i.visible).sort((a, b) => a.order - b.order);
  const objectSpecs = allSpecs
    .filter((i) => i.visible)
    .sort((a, b) => a.order - b.order)
    .map((row) => ({ id: row.id, ...localizedObjectSpec(row, locale) }));
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = gallery[activeIndex] ?? gallery[0];

  const showPrev = () => {
    setActiveIndex((i) => (i === 0 ? gallery.length - 1 : i - 1));
  };

  const showNext = () => {
    setActiveIndex((i) => (i === gallery.length - 1 ? 0 : i + 1));
  };

  return (
    <section
      key={locale}
      id="architecture"
      className="section-bg-graphite section-divider-accent py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center sm:text-left">
          <ScrollReveal variant="blur">
            <SectionLabel>{t.architectureSectionLabel}</SectionLabel>
          </ScrollReveal>
          <ScrollReveal variant="up" delay={80}>
            <h2
              className="mb-10 text-2xl uppercase leading-tight tracking-[0.06em] text-[#F4EFE7] sm:mb-12 sm:text-3xl md:text-4xl"
              style={{ fontFamily: 'var(--font-playfair-display)' }}
            >
              {t.architectureTitle}
            </h2>
          </ScrollReveal>
        </div>

        <div className="space-y-6 px-1 py-2">
          <ScrollReveal variant="scale" delay={120}>
            <ServicesPanelGlass id="architecture-specs" tone="dark" className={`${panelStyles.shellNeutralRim} [--panel-radius:24px]`}>
              <div className="border-b border-white/10">
                <div className="hidden lg:grid lg:grid-cols-9 lg:items-stretch">
                  {objectSpecs.map((row, i) => (
                    <SpecCell
                      key={row.id}
                      label={row.label}
                      value={row.value}
                      showDivider={i < objectSpecs.length - 1}
                    />
                  ))}
                </div>

                <div className="mobile-metric-grid grid grid-cols-2 sm:grid-cols-3 lg:hidden">
                  {objectSpecs.map((row) => (
                    <SpecCell key={row.id} label={row.label} value={row.value} layout="mobile" />
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4 px-4 py-5 text-center sm:flex-row sm:items-center sm:justify-between sm:px-7 sm:text-left">
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/42 sm:tracking-[0.24em]">
                  {t.architectureHint}
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => onScrollTo('contacts')}
                    className="inline-flex items-center justify-center rounded-full border border-white/22 px-5 py-2.5 text-xs uppercase tracking-[0.12em] text-white transition-colors hover:border-[#C9A962] hover:text-[#F2DDA8] sm:tracking-widest"
                  >
                    {t.architectureCtaConsultation}
                  </button>
                  <button
                    type="button"
                    onClick={() => onScrollTo('layouts')}
                    className="rounded-full border border-[#C9A962]/65 px-5 py-2.5 text-xs uppercase tracking-widest text-[#F2DDA8] transition-colors hover:bg-[#C9A962] hover:text-[#191f2b]"
                  >
                    {t.architectureCtaLayouts}
                  </button>
                </div>
              </div>
            </ServicesPanelGlass>
          </ScrollReveal>

          <ScrollReveal variant="up" delay={180}>
            <ServicesPanelGlass id="architecture-details" tone="light" className={`${panelStyles.shellNeutralRim} [--panel-radius:24px]`}>
              <div className="lg:grid lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch">
                <div className="relative p-4 sm:p-5 lg:p-6 lg:pr-3">
                  <div className="relative aspect-[16/10] max-h-[min(56vw,320px)] overflow-hidden rounded-[16px] sm:max-h-[360px] lg:aspect-auto lg:max-h-none lg:min-h-[320px] lg:h-full">
                    {activeSlide ? (
                      <OptimizedImage
                        key={activeSlide.id}
                        src={activeSlide.image}
                        alt={activeSlide.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 42vw"
                        className="object-cover transition-opacity duration-500"
                      />
                    ) : null}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-black/20 lg:hidden"
                    />
                    {gallery.length > 1 ? (
                      <>
                        <button
                          type="button"
                          onClick={showPrev}
                          className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/25 text-white backdrop-blur-sm transition-colors hover:bg-black/45 sm:h-10 sm:w-10"
                          aria-label={t.architecturePrevPhoto}
                        >
                          <ChevronLeftIcon className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={showNext}
                          className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/25 text-white backdrop-blur-sm transition-colors hover:bg-black/45 sm:h-10 sm:w-10"
                          aria-label={t.architectureNextPhoto}
                        >
                          <ChevronRightIcon className="h-4 w-4" />
                        </button>
                        <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2 sm:bottom-4">
                          {gallery.map((slide, index) => (
                            <button
                              key={slide.id}
                              type="button"
                              onClick={() => setActiveIndex(index)}
                              className={`h-1.5 rounded-full transition-all ${
                                index === activeIndex ? 'w-6 bg-[#C9A962]' : 'w-1.5 bg-white/50'
                              }`}
                              aria-label={`${t.architecturePhotoAria} ${index + 1}`}
                            />
                          ))}
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>

                <TypewriterParagraphs
                  key={locale}
                  paragraphs={[t.architectureP1, t.architectureP2, t.architectureP3]}
                  className="space-y-4 border-t border-[#1a1a1a]/8 px-6 py-6 text-sm leading-relaxed text-[#5c5c5c] sm:px-7 sm:py-7 sm:text-[15px] sm:leading-[1.8] lg:border-t-0 lg:border-l lg:px-8 lg:py-8"
                />
              </div>
            </ServicesPanelGlass>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
