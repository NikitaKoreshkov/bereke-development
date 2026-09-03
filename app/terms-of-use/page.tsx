import type { Metadata } from 'next';
import LegalLayout from '../components/LegalLayout';
import JsonLd from '../components/JsonLd';
import { getSiteContent } from '@/lib/content';
import { buildPageMetadata, getLegalJsonLdGraphs } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Условия использования',
  description:
    'Условия использования сайта БЦ BEREKE / Bereke Development: правила, ответственность и контакты.',
  path: '/terms-of-use',
});

export default async function TermsOfUsePage() {
  const { site } = await getSiteContent();

  return (
    <>
      <JsonLd data={getLegalJsonLdGraphs('Условия использования', '/terms-of-use')} />
      <LegalLayout title="Условия использования">
        <p>
          Настоящие Условия регулируют использование сайта <strong>{site.name}</strong> (далее «Сайт»).
          Используя Сайт, вы соглашаетесь с настоящими Условиями.
        </p>

        <h2>1. Общие положения</h2>
        <p>
          Сайт предоставляет информацию о проектах застройщика Bereke Development, в том числе о бизнес-центре BEREKE.
          Информация на Сайте не является публичной офертой, если иное не указано явно.
        </p>

        <h2>2. Информация на Сайте</h2>
        <p>
          Планировки, цены, сроки сдачи и иные параметры объектов могут изменяться. Актуальные условия уточняйте у менеджера отдела продаж.
        </p>

        <h2>3. Заявки и обратная связь</h2>
        <p>
          Отправляя заявку через формы Сайта или мессенджеры, вы подтверждаете достоверность указанных данных и согласие на обработку персональных данных.
        </p>

        <h2>4. Интеллектуальная собственность</h2>
        <p>
          Все материалы Сайта (тексты, изображения, логотипы, рендеры) являются собственностью Bereke Development или используются на законных основаниях. Копирование без согласия запрещено.
        </p>

        <h2>5. Ограничение ответственности</h2>
        <p>
          Bereke Development не несёт ответственности за временную недоступность Сайта и возможные технические сбои, а также за решения, принятые пользователем solely на основе информации с Сайта без консультации с менеджером.
        </p>

        <h2>6. Контакты</h2>
        <p>
          Email: <a href={`mailto:${site.email}`} className="text-[#C9A962] underline">{site.email}</a><br />
          Телефон: <a href={site.phoneHref} className="text-[#C9A962] underline">{site.phone}</a>
        </p>
      </LegalLayout>
    </>
  );
}
