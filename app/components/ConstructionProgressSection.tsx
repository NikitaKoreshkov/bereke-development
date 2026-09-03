'use client';

import { useCallback, useState } from 'react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useSiteContent } from '@/lib/content-context';
import { useLocale } from '@/lib/i18n/locale-context';
import { localizedCopy } from '@/lib/i18n/localized';
import ConstructionCarousel from './ConstructionCarousel';
import ConstructionModal from './ConstructionModal';

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="mb-4 text-xs uppercase tracking-[0.25em] text-[#B8954F]">{children}</p>
  );
}

export default function ConstructionProgressSection() {
  const { copy, copyKk } = useSiteContent();
  const { locale } = useLocale();
  const t = localizedCopy(copy, copyKk, locale);
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  const openModal = useCallback((index: number) => {
    setModalIndex(index);
  }, []);

  const closeModal = useCallback(() => {
    setModalIndex(null);
  }, []);

  return (
    <section key={locale} id="construction" className="section-bg-black bg-black py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center sm:text-left">
          <ScrollReveal variant="blur">
            <SectionLabel>{t.constructionSectionLabel}</SectionLabel>
          </ScrollReveal>

          <ScrollReveal variant="up" delay={80}>
            <h2
              className="mx-auto mb-4 max-w-3xl text-2xl uppercase leading-tight tracking-[0.06em] text-[#F4EFE7] sm:mx-0 sm:mb-5 sm:text-3xl md:text-4xl"
              style={{ fontFamily: 'var(--font-playfair-display)' }}
            >
              {t.constructionTitle}
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-sm leading-relaxed text-white/58 sm:mx-0 sm:mb-12 sm:text-base">
              {t.constructionSubtitle}
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal variant="up" delay={140} className="overflow-visible">
          <ConstructionCarousel onOpen={openModal} paused={modalIndex !== null} />
        </ScrollReveal>
      </div>

      <ConstructionModal
        open={modalIndex !== null}
        index={modalIndex ?? 0}
        onClose={closeModal}
      />
    </section>
  );
}
