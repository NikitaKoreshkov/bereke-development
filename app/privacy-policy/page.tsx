import type { Metadata } from 'next';
import PrivacyPolicyContent from '../components/PrivacyPolicyContent';
import JsonLd from '../components/JsonLd';
import { buildPageMetadata, getLegalJsonLdGraphs } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Политика конфиденциальности',
  description:
    'Политика конфиденциальности и обработки персональных данных сайта БЦ BEREKE / Bereke Development.',
  path: '/privacy-policy',
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd data={getLegalJsonLdGraphs('Политика конфиденциальности', '/privacy-policy')} />
      <PrivacyPolicyContent />
    </>
  );
}
