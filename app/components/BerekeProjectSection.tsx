'use client';

import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ServicesPanelGlass } from '@/components/ui/ServicesPanelGlass';
import { useSiteContent } from '@/lib/content-context';
import { useLocale } from '@/lib/i18n/locale-context';
import { localizedAddressBC, localizedCopy } from '@/lib/i18n/localized';
import { BerekeStatsPanel } from './BerekeStatsPanel';

interface BerekeProjectSectionProps {
  onScrollTo: (id: string) => void;
}

export default function BerekeProjectSection({ onScrollTo }: BerekeProjectSectionProps) {
  const { copy, copyKk, images, projects, site } = useSiteContent();
  const { locale } = useLocale();
  const t = localizedCopy(copy, copyKk ?? copy, locale);
  const visibleProjects = projects.filter((i) => i.visible).sort((a, b) => a.order - b.order);
  const project = visibleProjects[0];

  if (!project) return null;

  return (
    <section
      key={locale}
      id="bereke"
      className="section-bg-ink relative isolate border-b border-[#C9A962]/10 py-[4.5rem] sm:py-20 md:py-24 lg:py-28"
    >
      <div
        className="absolute inset-0 scale-105 bg-cover bg-center opacity-[0.12] saturate-[0.7]"
        style={{ backgroundImage: `url('${images.architecture}')` }}
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,18,24,0.96)_0%,rgba(25,31,43,0.9)_42%,rgba(14,18,24,0.98)_100%),linear-gradient(115deg,rgba(206,183,142,0.1)_0%,transparent_34%,rgba(255,255,255,0.035)_58%,transparent_100%)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black to-transparent" aria-hidden />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="blur">
          <div className="mb-9 flex items-center justify-center gap-4 sm:mb-12">
            <span className="h-px w-14 bg-gradient-to-r from-transparent to-[#C9A962]/50 sm:w-24" aria-hidden />
            <p className="text-[10px] uppercase tracking-[0.42em] text-[#D8C08A] sm:text-[11px]">
              {t.berekeSectionLabel}
            </p>
            <span className="h-px w-14 bg-gradient-to-l from-transparent to-[#C9A962]/50 sm:w-24" aria-hidden />
          </div>
        </ScrollReveal>

        <div className="relative mx-auto max-w-6xl">
          <div
            className="pointer-events-none absolute inset-x-8 top-1/2 h-px bg-gradient-to-r from-transparent via-[#C9A962]/18 to-transparent"
            aria-hidden
          />

          <ScrollReveal variant="scale" delay={80}>
            <div className="relative flex justify-center">
              <ServicesPanelGlass
                id={`project-${project.id}`}
                tone="light"
                className="relative z-[1] w-full max-w-5xl shadow-[0_34px_120px_rgba(0,0,0,0.58),0_0_0_1px_rgba(201,169,98,0.12)] [--panel-radius:26px] sm:[--panel-radius:32px] lg:[--panel-radius:36px]"
              >
                <button
                  type="button"
                  onClick={() => onScrollTo(project.anchor.replace('#', ''))}
                  className="group grid w-full text-left lg:min-h-[31rem] lg:grid-cols-[1.18fr_0.82fr]"
                >
                  <div className="relative min-h-[17rem] overflow-hidden bg-[#111] sm:min-h-[24rem] lg:min-h-full">
                    <OptimizedImage
                      src={project.image}
                      alt={`БЦ ${project.name} — бизнес-центр класса А, Алматы, ул. Щепкина 35/1`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 660px"
                      className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.035]"
                    />
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-black/8 lg:to-black/34"
                      aria-hidden
                    />
                    <div
                      className="pointer-events-none absolute inset-0 ring-1 ring-white/10 ring-inset"
                      aria-hidden
                    />
                    <span className="absolute bottom-6 left-6 hidden rounded-full border border-white/18 bg-black/24 px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-white/72 backdrop-blur-md sm:inline-flex">
                      {t.berekeCardBadge}
                    </span>
                  </div>

                  <div className="relative flex min-h-full flex-col justify-between border-t border-[#C9A962]/18 bg-[linear-gradient(145deg,#fffdf8_0%,#f5efe3_58%,#e8dcc8_100%)] px-6 py-7 sm:px-8 sm:py-9 lg:border-t-0 lg:border-l lg:px-10 lg:py-11">
                    <div
                      className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A962]/45 to-transparent lg:inset-x-auto lg:inset-y-8 lg:left-0 lg:h-auto lg:w-px lg:bg-gradient-to-b"
                      aria-hidden
                    />

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.36em] text-[#A68439]">
                        {t.berekeCardEyebrow}
                      </p>
                      <h3
                        className="mt-4 text-[2.25rem] font-medium leading-none tracking-[0.09em] text-[#111] sm:text-[3.2rem] lg:text-[4.1rem]"
                        style={{ fontFamily: 'var(--font-playfair-display)' }}
                      >
                        {project.name}
                      </h3>
                      <p className="mt-5 max-w-sm text-sm leading-[1.85] text-[#4b453a] sm:text-[15px]">
                        {t.berekeCardText}
                      </p>
                    </div>

                    <div className="mt-8 space-y-6">
                      <div className="grid grid-cols-2 gap-3 border-y border-[#C9A962]/22 py-5 text-[11px] uppercase tracking-[0.2em] text-[#6b604e]">
                        <span>{t.berekeCardCity}</span>
                        <span className="text-right">{t.berekeCardStreet}</span>
                      </div>

                      <span className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-[#8B651E] transition-colors duration-300 group-hover:text-[#5F4212]">
                        {t.projectCta}
                        <span
                          aria-hidden
                          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#C9A962]/55 bg-[#C9A962]/12 text-[#9A7428] transition-all duration-300 group-hover:translate-x-1 group-hover:border-[#C9A962] group-hover:bg-[#C9A962]/22"
                        >
                          <svg width="12" height="12" viewBox="0 0 10 10" fill="none" className="block" aria-hidden>
                            <path
                              d="M3.5 2.5L6.5 5L3.5 7.5"
                              stroke="currentColor"
                              strokeWidth="1.25"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </span>
                    </div>
                  </div>
                </button>
              </ServicesPanelGlass>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="scale" delay={140}>
            <BerekeStatsPanel className="relative z-[2] mx-auto mt-7 max-w-5xl sm:mt-8 lg:mt-10" />
          </ScrollReveal>
        </div>

        <p className="mx-auto mt-12 max-w-xl text-center text-[11px] uppercase leading-loose tracking-[0.24em] text-white/36">
          {localizedAddressBC(site, locale)}
        </p>
      </div>
    </section>
  );
}
