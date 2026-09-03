'use client';

import { useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import {
  SECTION_META,
  type AdvantageItem,
  type ArchitectureImage,
  type ConstructionUpdateItem,
  type FloorPlanItem,
  type LayoutItem,
  type ProjectItem,
  type ResidentItem,
  type SectionKey,
  type SiteContentData,
  type StatItem,
  type ObjectSpecItem,
} from '@/lib/content-types';
import { Field, ImageField, MediaListField, SaveBar, Toggle } from '../../components/AdminFormBits';
import { newId, useAdminContent } from '../../hooks/useAdminContent';

const COPY_BY_SECTION: Record<SectionKey, (keyof SiteContentData['copy'])[]> = {
  hero: [
    'heroEyebrow',
    'heroLead',
    'heroLeadAccent',
    'heroCtaConsultation',
    'heroCtaBrochure',
    'heroScrollHint',
  ],
  bereke: [
    'berekeSectionLabel',
    'berekeCardBadge',
    'berekeCardEyebrow',
    'berekeCardText',
    'berekeCardCity',
    'berekeCardStreet',
    'projectCta',
    'prefaceLead',
    'prefaceBody',
  ],
  projects: ['projectsSectionLabel', 'projectCta'],
  advantages: [
    'advantagesSectionLabel',
    'advantagesTitle',
    'advantagesLocationEyebrow',
    'advantagesLocationTitle',
    'advantagesLocationText',
  ],
  architecture: [
    'architectureSectionLabel',
    'architectureTitle',
    'architectureP1',
    'architectureP2',
    'architectureP3',
    'architectureHint',
    'architectureCtaConsultation',
    'architectureCtaLayouts',
    'architecturePrevPhoto',
    'architectureNextPhoto',
    'architecturePhotoAria',
  ],
  layouts: [
    'layoutsSectionLabel',
    'layoutsTitle',
    'layoutsSubtitle',
    'layoutsFirstFloorBadge',
    'layoutsFirstFloorNote',
    'floorPlanNote',
    'floorPlanTypicalLabel',
    'floorPlanFullCta',
    'floorPlanTapHint',
    'imageZoomHint',
    'layoutsCarouselNote',
    'layoutsCta',
    'layoutsSpacesTitle',
    'layoutsBrand',
    'calcTitle',
    'calcStep1Title',
    'calcStep2Title',
    'calcStep3Title',
    'calcStep1Subtitle',
    'calcStep2Subtitle',
    'calcStep3Subtitle',
    'calcNoLots',
    'calcSelected',
    'calcOptional',
    'calcPaymentTerms',
    'calcGetExact',
    'calcSalesDept',
    'calcBack',
    'calcNext',
    'calcWhatsappIntro',
  ],
  contacts: [
    'supportSectionLabel',
    'supportTitle',
    'supportSubtitle',
    'supportCallbackCta',
    'supportEmailCta',
    'supportDirectContacts',
    'locationTitle',
    'locationBrandTitle',
    'locationMapAria',
    'callbackSuccess',
    'formNamePlaceholder',
    'formPhonePlaceholder',
    'formSubmit',
    'formCancel',
    'ctaTitle',
    'ctaSubtitle',
    'formConsent',
  ],
  construction: [
    'constructionSectionLabel',
    'constructionTitle',
    'constructionSubtitle',
    'constructionEmpty',
    'constructionInstagramCta',
    'constructionViewCta',
    'constructionOpenInstagram',
    'constructionStageLabel',
    'constructionWorksLabel',
    'constructionVideoLabel',
    'constructionPhotosLabel',
    'constructionMediaVideo',
    'constructionMediaPhoto',
    'constructionMediaVideoSoon',
    'constructionMediaPhotoSoon',
  ],
  developer: [
    'developerSectionLabel',
    'developerTitle',
    'developerPageTitle',
    'developerP1',
    'developerP2',
    'residentsTitle',
    'developerCta',
  ],
  footer: [
    'footerTagline',
    'footerDescription',
    'footerNavLabel',
    'footerContactsLabel',
    'footerMaterialsLabel',
    'footerAddressBcLabel',
    'footerSalesLabel',
    'footerBrochureCta',
    'footerContactsCta',
    'footerLocationLine',
    'footerPrivacyLink',
    'footerLegal',
  ],
};

const COPY_LABELS: Partial<Record<keyof SiteContentData['copy'], string>> = {
  heroEyebrow: 'Подпись над заголовком',
  heroLead: 'Основной текст',
  heroLeadAccent: 'Акцент',
  heroCtaConsultation: 'Кнопка консультации',
  heroCtaBrochure: 'Кнопка буклета',
  heroScrollHint: 'Подсказка скролла',
  prefaceLead: 'Лид (архив)',
  prefaceBody: 'Описание (архив)',
  berekeSectionLabel: 'Подпись секции',
  berekeCardBadge: 'Бейдж на фото',
  berekeCardEyebrow: 'Подпись карточки',
  berekeCardText: 'Текст карточки',
  berekeCardCity: 'Город',
  berekeCardStreet: 'Улица / адрес коротко',
  projectsSectionLabel: 'Заголовок секции проектов',
  projectCta: 'Кнопка «Смотреть объект»',
  advantagesSectionLabel: 'Подпись секции',
  advantagesTitle: 'Заголовок',
  advantagesLocationEyebrow: 'Подпись карточки локации',
  advantagesLocationTitle: 'Заголовок локации',
  advantagesLocationText: 'Текст локации',
  architectureSectionLabel: 'Подпись секции',
  architectureTitle: 'Заголовок',
  architectureP1: 'Абзац 1',
  architectureP2: 'Абзац 2',
  architectureP3: 'Абзац 3',
  architectureHint: 'Подсказка над кнопками',
  architectureCtaConsultation: 'Кнопка консультации',
  architectureCtaLayouts: 'Кнопка планировок',
  architecturePrevPhoto: 'Aria: предыдущее фото',
  architectureNextPhoto: 'Aria: следующее фото',
  architecturePhotoAria: 'Aria: фото N',
  layoutsSectionLabel: 'Подпись секции',
  layoutsTitle: 'Заголовок',
  layoutsSubtitle: 'Подзаголовок',
  layoutsFirstFloorBadge: 'Бейдж 1 этажа',
  layoutsFirstFloorNote: 'Заметка про 1 этаж',
  floorPlanNote: 'Заметка про план',
  floorPlanTypicalLabel: 'Подпись «Типовой этаж»',
  floorPlanFullCta: 'Ссылка «Полный план»',
  floorPlanTapHint: 'Подсказка на мобильном',
  imageZoomHint: 'Подсказка «Увеличить»',
  layoutsCarouselNote: 'Заметка карусели',
  layoutsCta: 'Кнопка CTA',
  layoutsSpacesTitle: 'Заголовок пространств',
  layoutsBrand: 'Бренд на карточке',
  calcTitle: 'Калькулятор: заголовок',
  calcStep1Title: 'Калькулятор: шаг 1',
  calcStep2Title: 'Калькулятор: шаг 2',
  calcStep3Title: 'Калькулятор: шаг 3',
  calcStep1Subtitle: 'Калькулятор: подпись шага 1',
  calcStep2Subtitle: 'Калькулятор: подпись шага 2',
  calcStep3Subtitle: 'Калькулятор: подпись шага 3',
  calcNoLots: 'Калькулятор: нет лотов',
  calcSelected: 'Калькулятор: выбрано',
  calcOptional: 'Калькулятор: выбор необязателен',
  calcPaymentTerms: 'Калькулятор: условия оплаты',
  calcGetExact: 'Калькулятор: кнопка WhatsApp',
  calcSalesDept: 'Калькулятор: отдел продаж',
  calcBack: 'Калькулятор: назад',
  calcNext: 'Калькулятор: далее',
  calcWhatsappIntro: 'Калькулятор: текст WhatsApp',
  supportSectionLabel: 'Подпись секции поддержки',
  supportTitle: 'Заголовок поддержки',
  supportSubtitle: 'Подзаголовок поддержки',
  supportCallbackCta: 'Кнопка «Перезвонить»',
  supportEmailCta: 'Кнопка «Написать на почту»',
  supportDirectContacts: 'Заголовок прямых контактов',
  locationTitle: 'Заголовок локации',
  locationBrandTitle: 'Название объекта',
  locationMapAria: 'Aria: карта',
  callbackSuccess: 'Успех формы обратного звонка',
  formNamePlaceholder: 'Плейсхолдер имени',
  formPhonePlaceholder: 'Плейсхолдер телефона',
  formSubmit: 'Кнопка отправить',
  formCancel: 'Кнопка отмена',
  ctaTitle: 'Заголовок заявки',
  ctaSubtitle: 'Подзаголовок заявки',
  formConsent: 'Согласие формы',
  constructionSectionLabel: 'Подпись секции',
  constructionTitle: 'Заголовок',
  constructionSubtitle: 'Подзаголовок',
  constructionEmpty: 'Пустое состояние',
  constructionInstagramCta: 'Кнопка Instagram',
  constructionViewCta: 'Кнопка «Смотреть» на карточке',
  constructionOpenInstagram: 'Кнопка «Открыть Instagram»',
  constructionStageLabel: 'Подпись «Описание этапа»',
  constructionWorksLabel: 'Подпись «Что сделано»',
  constructionVideoLabel: 'Подпись «Видео»',
  constructionPhotosLabel: 'Подпись «Фотографии»',
  constructionMediaVideo: 'Метка видео в карусели',
  constructionMediaPhoto: 'Метка фото в карусели',
  constructionMediaVideoSoon: 'Плейсхолдер видео',
  constructionMediaPhotoSoon: 'Плейсхолдер фото',
  developerSectionLabel: 'Подпись',
  developerTitle: 'Заголовок',
  developerPageTitle: 'Заголовок страницы',
  developerP1: 'Абзац 1',
  developerP2: 'Абзац 2',
  residentsTitle: 'Заголовок резидентов',
  developerCta: 'Кнопка',
  footerTagline: 'Слоган под логотипом',
  footerDescription: 'Описание компании',
  footerNavLabel: 'Колонка «Навигация»',
  footerContactsLabel: 'Колонка «Контакты»',
  footerMaterialsLabel: 'Колонка «Материалы»',
  footerAddressBcLabel: 'Подпись адреса БЦ',
  footerSalesLabel: 'Подпись отдела продаж',
  footerBrochureCta: 'Кнопка буклета',
  footerContactsCta: 'Кнопка контактов',
  footerLocationLine: 'Короткая строка адреса',
  footerPrivacyLink: 'Ссылка на согласие',
  footerLegal: 'Юридический текст',
};

export default function AdminSectionPage() {
  const params = useParams<{ section: string }>();
  const section = params.section as SectionKey;
  const meta = SECTION_META.find((item) => item.key === section);
  const { content, setContent, loading, saving, message, save } = useAdminContent();
  const [draft, setDraft] = useState<SiteContentData | null>(null);

  const data = draft ?? content;
  const copyKeys = useMemo(() => COPY_BY_SECTION[section] ?? [], [section]);

  if (!meta) {
    return <p>Блок не найден</p>;
  }

  if (loading || !data) {
    return <p className="text-[var(--admin-muted)]">Загрузка…</p>;
  }

  function patch(updater: (current: SiteContentData) => SiteContentData) {
    setDraft((prev) => updater(prev ?? data!));
    setContent((prev) => (prev ? updater(prev) : prev));
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[var(--admin-muted)]">
            Блок
          </p>
          <h2 className="mt-2 text-3xl md:text-4xl">{meta.title}</h2>
          <p className="mt-2 max-w-2xl text-[var(--admin-muted)]">{meta.description}</p>
        </div>
        <div className="w-full max-w-sm">
          <Toggle
            variant="panel"
            label="Показывать на сайте"
            checked={data.sections[section]}
            onChange={(visible) =>
              patch((current) => ({
                ...current,
                sections: { ...current.sections, [section]: visible },
              }))
            }
          />
        </div>
      </div>

      {copyKeys.length > 0 ? (
        <section className="admin-card space-y-4 p-6">
          <div>
            <h3 className="text-2xl">Тексты</h3>
            <p className="mt-1 text-sm text-[var(--admin-muted)]">
              Слева русский (RU), справа казахский (KZ). Пустой KZ на сайте покажет русский.
            </p>
          </div>
          <div className="grid gap-5">
            {copyKeys.map((key) => {
              const label = COPY_LABELS[key] || key;
              const ruValue = data.copy[key] ?? '';
              const kkValue = data.copyKk?.[key] ?? '';
              const multiline = Math.max(ruValue.length, kkValue.length) > 70;
              return (
                <div key={key} className="grid gap-3 md:grid-cols-2">
                  <Field
                    label={`${label} · RU`}
                    value={ruValue}
                    multiline={multiline}
                    onChange={(value) =>
                      patch((current) => ({
                        ...current,
                        copy: { ...current.copy, [key]: value },
                      }))
                    }
                  />
                  <Field
                    label={`${label} · KZ`}
                    value={kkValue}
                    multiline={multiline}
                    onChange={(value) =>
                      patch((current) => ({
                        ...current,
                        copyKk: { ...current.copyKk, [key]: value },
                      }))
                    }
                  />
                </div>
              );
            })}
          </div>
        </section>
      ) : null}

      {section === 'hero' ? (
        <section className="admin-card grid gap-4 p-5 md:grid-cols-2">
          <ImageField
            label="Постер hero"
            value={data.images.heroPoster}
            onChange={(value) =>
              patch((current) => ({
                ...current,
                images: { ...current.images, hero: value, heroPoster: value },
              }))
            }
          />
          <Field
            label="Видео (desktop)"
            value={data.videos.hero}
            onChange={(value) =>
              patch((current) => ({ ...current, videos: { ...current.videos, hero: value } }))
            }
          />
          <Field
            label="Видео (mobile)"
            value={data.videos.heroMobile}
            onChange={(value) =>
              patch((current) => ({
                ...current,
                videos: { ...current.videos, heroMobile: value },
              }))
            }
          />
        </section>
      ) : null}

      {section === 'bereke' ? (
        <>
          <CollectionEditor
            title="Характеристики (stats)"
            items={data.stats}
            onChange={(stats) => patch((current) => ({ ...current, stats }))}
            renderItem={(item, update) => (
              <div className="grid gap-3 md:grid-cols-2">
                <Field label="Значение · RU" value={item.value} onChange={(value) => update({ value })} />
                <Field
                  label="Значение · KZ"
                  value={item.valueKk || ''}
                  onChange={(valueKk) => update({ valueKk })}
                />
                <Field label="Подпись · RU" value={item.label} onChange={(label) => update({ label })} />
                <Field
                  label="Подпись · KZ"
                  value={item.labelKk || ''}
                  onChange={(labelKk) => update({ labelKk })}
                />
              </div>
            )}
            createItem={() => ({
              id: newId('stat'),
              value: 'Новое значение',
              valueKk: '',
              label: 'Подпись',
              labelKk: '',
              visible: true,
              order: data.stats.length,
            })}
          />
          <CollectionEditor
            title="Спецификации объекта"
            items={data.objectSpecs}
            onChange={(objectSpecs) => patch((current) => ({ ...current, objectSpecs }))}
            renderItem={(item, update) => (
              <div className="grid gap-3 md:grid-cols-2">
                <Field label="Метка · RU" value={item.label} onChange={(label) => update({ label })} />
                <Field
                  label="Метка · KZ"
                  value={item.labelKk || ''}
                  onChange={(labelKk) => update({ labelKk })}
                />
                <Field label="Значение · RU" value={item.value} onChange={(value) => update({ value })} />
                <Field
                  label="Значение · KZ"
                  value={item.valueKk || ''}
                  onChange={(valueKk) => update({ valueKk })}
                />
              </div>
            )}
            createItem={() => ({
              id: newId('spec'),
              label: 'Параметр',
              labelKk: '',
              value: 'Значение',
              valueKk: '',
              visible: true,
              order: data.objectSpecs.length,
            })}
          />
          <section className="admin-card p-5">
            <ImageField
              label="Фон секции BEREKE"
              value={data.images.architecture}
              onChange={(value) =>
                patch((current) => ({
                  ...current,
                  images: { ...current.images, architecture: value },
                }))
              }
            />
          </section>
        </>
      ) : null}

      {section === 'projects' ? (
        <CollectionEditor
          title="Проекты"
          items={data.projects}
          onChange={(projects) => patch((current) => ({ ...current, projects }))}
          renderItem={(item, update) => (
            <div className="grid gap-3">
              <div className="grid gap-3 md:grid-cols-2">
                <Field label="Название" value={item.name} onChange={(name) => update({ name })} />
                <Field label="Якорь" value={item.anchor} onChange={(anchor) => update({ anchor })} />
              </div>
              <Field
                label="Подзаголовок"
                value={item.subtitle}
                multiline
                onChange={(subtitle) => update({ subtitle })}
              />
              <ImageField label="Фото" value={item.image} onChange={(image) => update({ image })} />
            </div>
          )}
          createItem={() => ({
            id: newId('project'),
            name: 'Новый проект',
            subtitle: 'Описание проекта',
            anchor: '#architecture',
            image: data.images.architecture,
            visible: true,
            order: data.projects.length,
          })}
        />
      ) : null}

      {section === 'advantages' ? (
        <CollectionEditor
          title="Преимущества"
          items={data.advantages}
          onChange={(advantages) => patch((current) => ({ ...current, advantages }))}
          renderItem={(item, update) => (
            <div className="grid gap-3">
              <div className="grid gap-3 md:grid-cols-2">
                <Field
                  label="Заголовок · RU"
                  value={item.title}
                  onChange={(title) => update({ title })}
                />
                <Field
                  label="Заголовок · KZ"
                  value={item.titleKk || ''}
                  onChange={(titleKk) => update({ titleKk })}
                />
              </div>
              <Field
                label="Текст · RU"
                value={item.text}
                multiline
                onChange={(text) => update({ text })}
              />
              <Field
                label="Текст · KZ"
                value={item.textKk || ''}
                multiline
                onChange={(textKk) => update({ textKk })}
              />
              <Field label="Иконка (ключ)" value={item.icon} onChange={(icon) => update({ icon })} />
            </div>
          )}
          createItem={() => ({
            id: newId('advantage'),
            title: 'Новое преимущество',
            titleKk: '',
            text: 'Описание',
            textKk: '',
            icon: 'shield',
            visible: true,
            order: data.advantages.length,
          })}
        />
      ) : null}

      {section === 'architecture' ? (
        <CollectionEditor
          title="Галерея архитектуры"
          items={data.architectureGallery}
          onChange={(architectureGallery) =>
            patch((current) => ({ ...current, architectureGallery }))
          }
          renderItem={(item, update) => (
            <div className="grid gap-3">
              <Field label="Alt" value={item.alt} onChange={(alt) => update({ alt })} />
              <ImageField label="Фото" value={item.image} onChange={(image) => update({ image })} />
            </div>
          )}
          createItem={() => ({
            id: newId('arch'),
            alt: 'БЦ BEREKE',
            image: data.images.architecture,
            visible: true,
            order: data.architectureGallery.length,
          })}
        />
      ) : null}

      {section === 'layouts' ? (
        <>
          <CollectionEditor
            title="Доступные пространства"
            items={data.layouts}
            onChange={(layouts) => patch((current) => ({ ...current, layouts }))}
            renderItem={(item, update) => (
              <div className="grid gap-3">
                <div className="grid gap-3 md:grid-cols-3">
                  <Field label="Название" value={item.title} onChange={(title) => update({ title })} />
                  <Field
                    label="Площадь"
                    type="number"
                    value={String(item.area)}
                    onChange={(area) => update({ area: Number(area) || 0 })}
                  />
                  <Field
                    label="Этаж"
                    type="number"
                    value={String(item.floor)}
                    onChange={(floor) => update({ floor: Number(floor) || 0 })}
                  />
                </div>
                <Field label="Тип · RU" value={item.type} onChange={(type) => update({ type })} />
                <Field
                  label="Тип · KZ"
                  value={item.typeKk || ''}
                  onChange={(typeKk) => update({ typeKk })}
                />
                <ImageField label="Планировка" value={item.image} onChange={(image) => update({ image })} />
              </div>
            )}
            createItem={() => ({
              id: newId('layout'),
              area: 50,
              floor: 2,
              title: '50 м²',
              type: 'Open space',
              typeKk: '',
              image: '/images/layouts/layout-office-top.jpeg',
              visible: true,
              order: data.layouts.length,
            })}
          />
          <CollectionEditor
            title="Поэтажные планы"
            items={data.floorPlans}
            onChange={(floorPlans) => patch((current) => ({ ...current, floorPlans }))}
            renderItem={(item, update) => (
              <div className="grid gap-3 md:grid-cols-2">
                <Field label="Название · RU" value={item.title} onChange={(title) => update({ title })} />
                <Field
                  label="Название · KZ"
                  value={item.titleKk || ''}
                  onChange={(titleKk) => update({ titleKk })}
                />
                <ImageField label="Превью" value={item.image} onChange={(image) => update({ image })} />
                <Field label="PDF URL" value={item.pdf} onChange={(pdf) => update({ pdf })} />
              </div>
            )}
            createItem={() => ({
              id: newId('floor'),
              title: 'Новый план',
              titleKk: '',
              image: data.images.floorPlan,
              pdf: data.images.floorPlanPdf,
              visible: true,
              order: data.floorPlans.length,
            })}
          />
        </>
      ) : null}

      {section === 'construction' ? (
        <CollectionEditor
          title="Обновления стройки"
          items={data.constructionUpdates}
          onChange={(constructionUpdates) =>
            patch((current) => ({ ...current, constructionUpdates }))
          }
          renderItem={(item, update) => (
            <div className="grid gap-3">
              <div className="grid gap-3 md:grid-cols-2">
                <Field label="Дата" value={item.date} onChange={(date) => update({ date })} />
                <Field label="Дата KZ" value={item.dateKk || ''} onChange={(dateKk) => update({ dateKk })} />
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <Field label="Категория" value={item.category} onChange={(category) => update({ category })} />
                <Field
                  label="Категория KZ"
                  value={item.categoryKk || ''}
                  onChange={(categoryKk) => update({ categoryKk })}
                />
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <Field label="Заголовок" value={item.title} onChange={(title) => update({ title })} />
                <Field
                  label="Заголовок KZ"
                  value={item.titleKk || ''}
                  onChange={(titleKk) => update({ titleKk })}
                />
              </div>
              <Field
                label="Описание"
                value={item.description}
                multiline
                onChange={(description) => update({ description })}
              />
              <Field
                label="Описание KZ"
                value={item.descriptionKk || ''}
                multiline
                onChange={(descriptionKk) => update({ descriptionKk })}
              />
              <Field
                label="Работы (каждая с новой строки)"
                value={item.works.join('\n')}
                multiline
                onChange={(works) =>
                  update({
                    works: works
                      .split('\n')
                      .map((line) => line.trim())
                      .filter(Boolean),
                  })
                }
              />
              <Field
                label="Работы KZ (каждая с новой строки)"
                value={(item.worksKk || []).join('\n')}
                multiline
                onChange={(worksKk) =>
                  update({
                    worksKk: worksKk
                      .split('\n')
                      .map((line) => line.trim())
                      .filter(Boolean),
                  })
                }
              />
              <MediaListField
                label="Фото"
                kind="photo"
                accept="image/*"
                values={item.photos}
                onChange={(photos) => update({ photos })}
              />
              <MediaListField
                label="Видео"
                kind="video"
                accept="video/mp4,video/webm,video/quicktime,video/*"
                values={item.videos}
                onChange={(videos) => update({ videos })}
              />
              <Field
                label="Instagram URL"
                value={item.instagramUrl || ''}
                onChange={(instagramUrl) => update({ instagramUrl })}
              />
            </div>
          )}
          createItem={() => ({
            id: newId('build'),
            date: 'Новый месяц',
            dateKk: '',
            title: 'Новое обновление',
            titleKk: '',
            category: 'Работы',
            categoryKk: '',
            description: 'Описание этапа',
            descriptionKk: '',
            works: ['Пункт работ'],
            worksKk: [],
            photos: [],
            videos: [],
            visible: true,
            order: data.constructionUpdates.length,
          })}
        />
      ) : null}

      {section === 'developer' ? (
        <CollectionEditor
          title="Резиденты"
          items={data.residents}
          onChange={(residents) => patch((current) => ({ ...current, residents }))}
          renderItem={(item, update) => (
            <Field label="Название" value={item.name} onChange={(name) => update({ name })} />
          )}
          createItem={() => ({
            id: newId('resident'),
            name: 'Новый резидент',
            visible: true,
            order: data.residents.length,
          })}
        />
      ) : null}

      <SaveBar
        saving={saving}
        message={message}
        onSave={() => {
          const payload = draft ?? content;
          if (!payload) return;
          void save(payload).then(() => setDraft(null));
        }}
      />
    </div>
  );
}

type CollectionItem =
  | ProjectItem
  | AdvantageItem
  | StatItem
  | ObjectSpecItem
  | LayoutItem
  | FloorPlanItem
  | ArchitectureImage
  | ConstructionUpdateItem
  | ResidentItem;

function CollectionEditor<T extends CollectionItem>({
  title,
  items,
  onChange,
  renderItem,
  createItem,
}: {
  title: string;
  items: T[];
  onChange: (items: T[]) => void;
  renderItem: (item: T, update: (patch: Partial<T>) => void) => React.ReactNode;
  createItem: () => T;
}) {
  const sorted = [...items].sort((a, b) => a.order - b.order);

  function updateAt(id: string, patch: Partial<T>) {
    onChange(items.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  }

  function move(id: string, direction: -1 | 1) {
    const list = [...sorted];
    const index = list.findIndex((item) => item.id === id);
    const target = index + direction;
    if (index < 0 || target < 0 || target >= list.length) return;
    const swap = list[index];
    list[index] = list[target];
    list[target] = swap;
    onChange(list.map((item, order) => ({ ...item, order })));
  }

  return (
    <section className="admin-card space-y-5 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-2xl">{title}</h3>
        <button
          type="button"
          className="admin-btn admin-btn-gold"
          onClick={() => onChange([...items, createItem()])}
        >
          Добавить
        </button>
      </div>

      <div className="space-y-4">
        {sorted.map((item, index) => (
          <div key={item.id} className="admin-item-card">
            <div className="admin-item-toolbar">
              <span className="admin-badge admin-badge-off">#{index + 1}</span>
              <Toggle
                label="Виден"
                checked={item.visible}
                onChange={(visible) => updateAt(item.id, { visible } as Partial<T>)}
              />
              <div className="ml-auto flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  className="admin-btn admin-btn-ghost admin-btn-icon"
                  aria-label="Выше"
                  onClick={() => move(item.id, -1)}
                >
                  ↑
                </button>
                <button
                  type="button"
                  className="admin-btn admin-btn-ghost admin-btn-icon"
                  aria-label="Ниже"
                  onClick={() => move(item.id, 1)}
                >
                  ↓
                </button>
                <button
                  type="button"
                  className="admin-btn admin-btn-danger"
                  onClick={() => {
                    if (confirm('Удалить элемент?')) {
                      onChange(items.filter((entry) => entry.id !== item.id));
                    }
                  }}
                >
                  Удалить
                </button>
              </div>
            </div>
            {renderItem(item, (patch) => updateAt(item.id, patch))}
          </div>
        ))}
        {sorted.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-[var(--admin-line-strong)] px-4 py-8 text-center text-sm text-[var(--admin-muted)]">
            Пока пусто — добавьте первый элемент.
          </p>
        ) : null}
      </div>
    </section>
  );
}
