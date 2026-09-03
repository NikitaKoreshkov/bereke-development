import type { Metadata } from 'next';
import { AnchorLink } from '@/components/ui/AnchorLink';
import { ArrowLeftIcon } from '@/components/ui/Icons';
import { getSiteContent } from '@/lib/content';
import { buildPageMetadata, getDeveloperJsonLdGraphs } from '@/lib/seo';
import Footer from '../components/Footer';
import JsonLd from '../components/JsonLd';
import ResidentsGrid from '../components/ResidentsGrid';

export async function generateMetadata(): Promise<Metadata> {
  const { copy } = await getSiteContent();
  return buildPageMetadata({
    title: 'О компании Bereke Development',
    description:
      copy.developerP1 ||
      'Bereke Development — девелопер коммерческой недвижимости в Алматы. Флагманский проект: бизнес-центр класса А BEREKE на ул. Щепкина 35/1.',
    path: '/developer',
    keywords: [
      'Bereke Development',
      'застройщик Алматы',
      'девелопер коммерческой недвижимости',
      'БЦ BEREKE застройщик',
    ],
  });
}

export default async function DeveloperPage() {
  const { copy } = await getSiteContent();

  return (
    <>
      <JsonLd data={getDeveloperJsonLdGraphs()} />
      <main data-header-surface="light" className="bg-[#faf9f7] pt-[max(7rem,env(safe-area-inset-top))] pb-16 sm:pt-28 sm:pb-20">
        <div
          className="pointer-events-none absolute inset-x-0 top-[max(7rem,env(safe-area-inset-top))] h-px bg-gradient-to-r from-transparent via-[#C9A962]/35 to-transparent sm:top-28"
          aria-hidden
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnchorLink
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#C9A962] transition-colors hover:text-[#A68439]"
          >
            <ArrowLeftIcon className="h-3.5 w-3.5" />
            На главную
          </AnchorLink>

          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.25em] text-[#B8954F]">{copy.developerSectionLabel}</p>
            <h1
              className="mt-4 text-2xl uppercase leading-tight tracking-[0.06em] text-[#1a1a1a] sm:text-3xl md:text-4xl"
              style={{ fontFamily: 'var(--font-playfair-display)' }}
            >
              {copy.developerPageTitle}
            </h1>
            <p className="mt-6 text-sm leading-relaxed text-[#5c5c5c] sm:text-[15px] sm:leading-[1.85]">
              {copy.developerP1}
            </p>
            <p className="mt-5 text-sm leading-relaxed text-[#5c5c5c] sm:text-[15px] sm:leading-[1.85]">
              {copy.developerP2}
            </p>
          </div>

          <div className="mt-12 sm:mt-14">
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#B8954F]/90">{copy.residentsTitle}</p>
            <ResidentsGrid />
          </div>

          <div className="mt-14 text-center sm:mt-16">
            <AnchorLink
              href="/#contacts"
              className="inline-flex rounded-full border border-[#C9A962] bg-gradient-to-r from-[#C9A962]/10 to-transparent px-8 py-3.5 text-xs uppercase tracking-[0.2em] text-[#A68439] transition-all hover:border-[#B8954F] hover:bg-[#C9A962] hover:text-[#1a1a1a]"
            >
              Получить консультацию
            </AnchorLink>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
