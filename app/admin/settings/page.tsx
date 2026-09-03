'use client';

import type { SiteContentData } from '@/lib/content-types';
import { Field, ImageField, SaveBar, Toggle } from '../components/AdminFormBits';
import { newId, useAdminContent } from '../hooks/useAdminContent';

export default function AdminSettingsPage() {
  const { content, setContent, loading, saving, message, save } = useAdminContent();

  if (loading || !content) {
    return <p className="text-[var(--admin-muted)]">Загрузка…</p>;
  }

  function patch(updater: (current: SiteContentData) => SiteContentData) {
    setContent((prev) => (prev ? updater(prev) : prev));
  }

  const site = content.site;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--admin-muted)]">Настройки</p>
        <h2 className="mt-2 text-3xl md:text-4xl">Контакты и меню</h2>
      </div>

      <section className="admin-card grid gap-4 p-5 md:grid-cols-2">
        <Field
          label="Название"
          value={site.name}
          onChange={(name) => patch((c) => ({ ...c, site: { ...c.site, name } }))}
        />
        <Field
          label="Email"
          value={site.email}
          onChange={(email) => patch((c) => ({ ...c, site: { ...c.site, email } }))}
        />
        <Field
          label="Телефон"
          value={site.phone}
          onChange={(phone) => patch((c) => ({ ...c, site: { ...c.site, phone } }))}
        />
        <Field
          label="Телефон href"
          value={site.phoneHref}
          onChange={(phoneHref) => patch((c) => ({ ...c, site: { ...c.site, phoneHref } }))}
        />
        <Field
          label="WhatsApp номер"
          value={site.whatsapp}
          onChange={(whatsapp) =>
            patch((c) => ({
              ...c,
              site: {
                ...c.site,
                whatsapp,
                whatsappHref: `https://wa.me/${whatsapp}`,
              },
            }))
          }
        />
        <Field
          label="Instagram URL"
          value={site.instagram}
          onChange={(instagram) => patch((c) => ({ ...c, site: { ...c.site, instagram } }))}
        />
        <Field
          label="Instagram handle"
          value={site.instagramHandle}
          onChange={(instagramHandle) =>
            patch((c) => ({ ...c, site: { ...c.site, instagramHandle } }))
          }
        />
        <Field
          label="URL сайта"
          value={site.siteUrl}
          onChange={(siteUrl) => patch((c) => ({ ...c, site: { ...c.site, siteUrl } }))}
        />
        <Field
          label="Адрес БЦ · RU"
          value={site.addressBC}
          multiline
          onChange={(addressBC) => patch((c) => ({ ...c, site: { ...c.site, addressBC } }))}
        />
        <Field
          label="Адрес БЦ · KZ"
          value={site.addressBCKk || ''}
          multiline
          onChange={(addressBCKk) => patch((c) => ({ ...c, site: { ...c.site, addressBCKk } }))}
        />
        <Field
          label="Адрес отдела продаж · RU"
          value={site.addressSales}
          multiline
          onChange={(addressSales) => patch((c) => ({ ...c, site: { ...c.site, addressSales } }))}
        />
        <Field
          label="Адрес отдела продаж · KZ"
          value={site.addressSalesKk || ''}
          multiline
          onChange={(addressSalesKk) => patch((c) => ({ ...c, site: { ...c.site, addressSalesKk } }))}
        />
        <Field
          label="Запрос карты"
          value={site.mapQuery}
          onChange={(mapQuery) => patch((c) => ({ ...c, site: { ...c.site, mapQuery } }))}
        />
        <Field
          label="Заметка карты · RU"
          value={site.mapNote}
          onChange={(mapNote) => patch((c) => ({ ...c, site: { ...c.site, mapNote } }))}
        />
        <Field
          label="Заметка карты · KZ"
          value={site.mapNoteKk || ''}
          onChange={(mapNoteKk) => patch((c) => ({ ...c, site: { ...c.site, mapNoteKk } }))}
        />
        <Field
          label="Брошюра URL"
          value={site.brochureUrl}
          onChange={(brochureUrl) => patch((c) => ({ ...c, site: { ...c.site, brochureUrl } }))}
        />
        <ImageField
          label="Логотип"
          value={site.logoUrl}
          onChange={(logoUrl) => patch((c) => ({ ...c, site: { ...c.site, logoUrl } }))}
        />
      </section>

      <section className="admin-card space-y-4 p-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-xl">Меню</h3>
          <button
            type="button"
            className="admin-btn admin-btn-gold"
            onClick={() =>
              patch((c) => ({
                ...c,
                nav: [
                  ...c.nav,
                  {
                    id: newId('nav'),
                    label: 'Новый пункт',
                    labelKk: '',
                    href: '#',
                    visible: true,
                    order: c.nav.length,
                  },
                ],
              }))
            }
          >
            Добавить
          </button>
        </div>
        {content.nav
          .slice()
          .sort((a, b) => a.order - b.order)
          .map((item) => (
            <div key={item.id} className="admin-item-card">
              <div className="admin-item-toolbar">
                <Toggle
                  label="Виден"
                  checked={item.visible}
                  onChange={(visible) =>
                    patch((c) => ({
                      ...c,
                      nav: c.nav.map((entry) =>
                        entry.id === item.id ? { ...entry, visible } : entry,
                      ),
                    }))
                  }
                />
                <button
                  type="button"
                  className="admin-btn admin-btn-danger ml-auto"
                  onClick={() => {
                    if (confirm('Удалить пункт меню?')) {
                      patch((c) => ({ ...c, nav: c.nav.filter((entry) => entry.id !== item.id) }));
                    }
                  }}
                >
                  Удалить
                </button>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                <Field
                  label="Текст · RU"
                  value={item.label}
                  onChange={(label) =>
                    patch((c) => ({
                      ...c,
                      nav: c.nav.map((entry) =>
                        entry.id === item.id ? { ...entry, label } : entry,
                      ),
                    }))
                  }
                />
                <Field
                  label="Текст · KZ"
                  value={item.labelKk || ''}
                  onChange={(labelKk) =>
                    patch((c) => ({
                      ...c,
                      nav: c.nav.map((entry) =>
                        entry.id === item.id ? { ...entry, labelKk } : entry,
                      ),
                    }))
                  }
                />
                <Field
                  label="Ссылка"
                  value={item.href}
                  onChange={(href) =>
                    patch((c) => ({
                      ...c,
                      nav: c.nav.map((entry) =>
                        entry.id === item.id ? { ...entry, href } : entry,
                      ),
                    }))
                  }
                />
              </div>
            </div>
          ))}
      </section>

      <SaveBar saving={saving} message={message} onSave={() => void save(content)} />
    </div>
  );
}
