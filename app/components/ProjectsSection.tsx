'use client';

import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ServicesPanelGlass } from '@/components/ui/ServicesPanelGlass';
import { useSiteContent } from '@/lib/content-context';

interface ProjectsSectionProps {
  onScrollTo: (id: string) => void;
}

export default function ProjectsSection({ onScrollTo }: ProjectsSectionProps) {
  const { copy, projects: allProjects } = useSiteContent();
  const projects = allProjects.filter((i) => i.visible).sort((a, b) => a.order - b.order);
  const isCarousel = projects.length > 1;

  return (
    <section className="border-b border-gray-100 bg-[#faf9f7] py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="blur" delay={0}>
          <div className="mb-8 flex items-center justify-center gap-3 sm:mb-10">
            <span className="h-px w-8 bg-[#C9A962]/60" aria-hidden />
            <p className="text-[10px] uppercase tracking-[0.35em] text-gray-400">{copy.projectsSectionLabel}</p>
            <span className="h-px w-8 bg-[#C9A962]/60" aria-hidden />
          </div>
        </ScrollReveal>

        <ScrollReveal variant="scale" delay={120}>
          <div
            className={`flex gap-4 py-6 sm:justify-center sm:gap-6 sm:px-2 ${
              isCarousel
                ? 'snap-scroll-x -mx-4 justify-start overflow-x-auto px-4 sm:mx-0'
                : 'justify-center'
            }`}
          >
            {projects.map((project) => (
              <ServicesPanelGlass
                key={project.id}
                id={`project-${project.id}`}
                tone="light"
                className={`w-[min(88vw,300px)] [--panel-radius:24px] sm:w-[360px] ${
                  isCarousel ? 'flex-shrink-0 snap-center' : ''
                }`}
              >
                <button
                  type="button"
                  onClick={() => onScrollTo(project.anchor.replace('#', ''))}
                  className="group w-full text-left"
                >
                  <div className="relative h-44 overflow-hidden bg-[#1a1a1a] sm:h-52">
                    <OptimizedImage
                      src={project.image}
                      alt={project.name}
                      fill
                      sizes="(max-width: 640px) 88vw, 360px"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    />
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/35 via-transparent to-transparent"
                      aria-hidden
                    />
                  </div>
                  <div className="border-t border-[#C9A962]/15 bg-gradient-to-b from-white to-[#faf9f7]/80 px-5 py-5 sm:px-7 sm:py-7">
                    <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#B8954F]">
                      Бизнес-центр
                    </p>
                    <h3
                      className="mt-2 text-lg tracking-[0.14em] text-[#1a1a1a] sm:text-2xl"
                      style={{ fontFamily: 'var(--font-playfair-display)' }}
                    >
                      {project.name}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#5c5c5c]">{project.subtitle}</p>
                    <span className="mt-5 inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em] text-[#A68439] transition-colors duration-300 group-hover:text-[#8B6F2E]">
                      {copy.projectCta}
                      <span
                        aria-hidden
                        className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#C9A962]/55 text-[#B8954F] transition-all duration-300 group-hover:border-[#C9A962] group-hover:bg-[#C9A962]/12"
                      >
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="block" aria-hidden>
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
                </button>
              </ServicesPanelGlass>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
