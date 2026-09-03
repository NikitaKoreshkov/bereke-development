import type { Metadata } from 'next';
import { getSiteContent } from '@/lib/content';
import { buildPageMetadata, getSpacesJsonLdGraphs } from '@/lib/seo';
import Footer from '../components/Footer';
import JsonLd from '../components/JsonLd';
import SpacesPageContent from '../components/SpacesPageContent';

export async function generateMetadata(): Promise<Metadata> {
  const { copy } = await getSiteContent();
  return buildPageMetadata({
    title: 'Доступные пространства и планировки офисов',
    description:
      copy.layoutsSubtitle ||
      'Планировки офисов в БЦ BEREKE Алматы: от 44 до 500 м², свободная планировка, прямая продажа от застройщика. Смотрите доступные пространства.',
    path: '/spaces',
    keywords: [
      'планировки офисов Алматы',
      'купить офис БЦ BEREKE',
      'офисы от 44 м² Алматы',
      'доступные пространства бизнес-центр',
      'open space Алматы купить',
    ],
  });
}

export default async function SpacesPage() {
  const { layouts } = await getSiteContent();
  const visibleLayouts = layouts
    .filter((item) => item.visible)
    .sort((a, b) => a.order - b.order)
    .map((item) => ({
      title: item.title,
      type: item.type,
      area: item.area,
      floor: item.floor,
      image: item.image,
    }));

  return (
    <>
      <JsonLd data={getSpacesJsonLdGraphs(visibleLayouts)} />
      <main
        data-header-surface="light"
        className="bg-[#faf9f7] pt-[max(7rem,env(safe-area-inset-top))] pb-16 sm:pt-28 sm:pb-20"
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-[max(7rem,env(safe-area-inset-top))] h-px bg-gradient-to-r from-transparent via-[#C9A962]/35 to-transparent sm:top-28"
          aria-hidden
        />
        <SpacesPageContent />
      </main>
      <Footer />
    </>
  );
}
