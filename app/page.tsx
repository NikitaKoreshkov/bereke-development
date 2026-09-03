import JsonLd from './components/JsonLd';
import HomePageContent from './components/HomePageContent';
import { getHomeJsonLdGraphs } from '@/lib/seo';

export default function Home() {
  return (
    <>
      <JsonLd data={getHomeJsonLdGraphs()} />
      <HomePageContent />
    </>
  );
}
