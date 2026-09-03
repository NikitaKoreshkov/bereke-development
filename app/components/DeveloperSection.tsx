'use client';

import { AnchorLink } from '@/components/ui/AnchorLink';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ResidentsMobileCarousel } from '@/components/ui/ResidentsMobileCarousel';
import styles from '@/components/ui/residents-marquee.module.css';
import { useSiteContent } from '@/lib/content-context';

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="mb-4 text-xs uppercase tracking-[0.25em] text-[#B8954F]">{children}</p>
  );
}

function ResidentsMarquee({
  items,
  reverse = false,
}: {
  items: readonly string[];
  reverse?: boolean;
}) {
  const track = [...items, ...items, ...items];

  return (
    <div className={styles.root}>
      <div className={styles.fadeLeft} aria-hidden />
      <div className={styles.fadeRight} aria-hidden />

      <div className={`${styles.track} ${reverse ? styles.trackReverse : ''}`}>
        {track.map((name, index) => (
          <div key={`${name}-${index}`} className={styles.card}>
            {name}
          </div>
        ))}
      </div>
    </div>
  );
}

function ResidentsMarquees({ items }: { items: readonly string[] }) {
  return (
    <>
      <div className="-mx-4 sm:hidden">
        <ResidentsMobileCarousel items={items} />
      </div>

      <div className="hidden sm:block">
        <ResidentsMarquee items={items} />
      </div>
    </>
  );
}

export default function DeveloperSection() {
  const { copy, residents: allResidents } = useSiteContent();
  const residents = allResidents
    .filter((i) => i.visible)
    .sort((a, b) => a.order - b.order)
    .map((i) => i.name);

  return (
    <section id="developer" className="relative overflow-hidden bg-[#faf9f7] py-20 sm:py-28">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A962]/35 to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <ScrollReveal variant="blur">
            <SectionLabel>{copy.developerSectionLabel}</SectionLabel>
          </ScrollReveal>
          <ScrollReveal variant="up" delay={80}>
            <h2 className="text-2xl uppercase tracking-[0.06em] text-[#1a1a1a] sm:text-3xl md:text-4xl">
              {copy.developerTitle}
            </h2>
          </ScrollReveal>
        </div>

        <ScrollReveal variant="up" delay={140}>
          <div className="mx-auto mt-10 max-w-3xl space-y-5 text-center">
            <p className="text-sm leading-relaxed text-gray-600 sm:text-[15px] sm:leading-[1.85]">
              {copy.developerP1}
            </p>
            <p className="text-sm leading-relaxed text-gray-600 sm:text-[15px] sm:leading-[1.85]">
              {copy.developerP2}
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-14 sm:mt-16">
          <p className="mb-6 text-center text-[10px] uppercase tracking-[0.28em] text-[#B8954F]/90">
            {copy.residentsTitle}
          </p>

          <ResidentsMarquees items={residents} />
        </div>

        <ScrollReveal variant="up" delay={300}>
          <div className="mt-12 text-center">
            <AnchorLink
              href="/developer"
              className="inline-flex rounded-full border border-[#C9A962] bg-gradient-to-r from-[#C9A962]/10 to-transparent px-8 py-3.5 text-xs uppercase tracking-[0.2em] text-[#A68439] transition-all hover:border-[#B8954F] hover:bg-[#C9A962] hover:text-[#1a1a1a]"
            >
              {copy.developerCta}
            </AnchorLink>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
