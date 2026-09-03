import type { Metadata } from 'next';
import LegalLayout from '../components/LegalLayout';
import JsonLd from '../components/JsonLd';
import { getSiteContent } from '@/lib/content';
import { buildPageMetadata, getLegalJsonLdGraphs } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Политика Cookie',
  description:
    'Политика использования cookie на сайте БЦ BEREKE / Bereke Development: какие файлы применяются и как ими управлять.',
  path: '/cookies',
});

export default async function CookiesPage() {
  const { site } = await getSiteContent();

  return (
    <>
      <JsonLd data={getLegalJsonLdGraphs('Политика Cookie', '/cookies')} />
      <LegalLayout title="Политика использования Cookie">
        <p>
          Сайт <strong>{site.name}</strong> использует файлы cookie для обеспечения корректной работы и улучшения пользовательского опыта.
        </p>

        <h2>Что такое cookie</h2>
        <p>
          Cookie: небольшие текстовые файлы, сохраняемые в браузере при посещении сайта.
        </p>

        <h2>Какие cookie мы используем</h2>
        <ul>
          <li><strong>Необходимые</strong> для работы навигации и форм</li>
          <li><strong>Аналитические</strong> для понимания, как пользователи взаимодействуют с Сайтом (при подключении аналитики)</li>
        </ul>

        <h2>Управление cookie</h2>
        <p>
          Вы можете отключить cookie в настройках браузера. Это может повлиять на корректность работы отдельных функций Сайта.
        </p>

        <h2>Контакты</h2>
        <p>
          По вопросам: <a href={`mailto:${site.email}`} className="text-[#C9A962] underline">{site.email}</a>
        </p>
      </LegalLayout>
    </>
  );
}
