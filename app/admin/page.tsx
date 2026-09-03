'use client';

import Link from 'next/link';
import { SECTION_META } from '@/lib/content-types';
import { useAdminContent } from './hooks/useAdminContent';

export default function AdminDashboardPage() {
  const { content, loading } = useAdminContent();

  if (loading || !content) {
    return (
      <div className="admin-card p-8 text-sm text-[var(--admin-muted)]">Загрузка контента…</div>
    );
  }

  const visibleCount = SECTION_META.filter((section) => content.sections[section.key]).length;

  return (
    <div className="space-y-8">
      <div className="admin-card overflow-hidden p-0">
        <div className="grid gap-0 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="p-7 md:p-9">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[var(--admin-muted)]">
              Dashboard
            </p>
            <h2 className="mt-3 text-3xl md:text-4xl">Контент сайта</h2>
            <p className="mt-3 max-w-xl text-[var(--admin-muted)]">
              Зайдите в блок и меняйте тексты, фото, видимость и списки. Сохранение пишет сразу в
              PostgreSQL.
            </p>
          </div>
          <div className="border-t border-[var(--admin-line)] bg-[linear-gradient(160deg,#1a1e25,#2a2418)] p-7 text-white md:p-9 lg:border-l lg:border-t-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/55">Статус</p>
            <p className="mt-3 font-[family-name:var(--font-playfair-display)] text-4xl">
              {visibleCount}/{SECTION_META.length}
            </p>
            <p className="mt-2 text-sm text-white/70">блоков видно на сайте</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {SECTION_META.map((section) => {
          const visible = content.sections[section.key];
          return (
            <Link
              key={section.key}
              href={`/admin/sections/${section.key}`}
              className="admin-card group p-6 transition-transform duration-200 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-2xl">{section.title}</h3>
                <span className={`admin-badge ${visible ? 'admin-badge-on' : 'admin-badge-off'}`}>
                  {visible ? 'Виден' : 'Скрыт'}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[var(--admin-muted)]">
                {section.description}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#7a6128]">
                Открыть
                <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </span>
            </Link>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { href: '/admin/calculator', title: 'Калькулятор', text: 'Цены, лоты, диапазоны площади' },
          { href: '/admin/media', title: 'Медиа', text: 'Загрузка и очистка файлов' },
          { href: '/admin/settings', title: 'Контакты', text: 'Телефон, WhatsApp, адреса, меню' },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="admin-card p-6 transition-transform duration-200 hover:-translate-y-1"
          >
            <h3 className="text-2xl">{item.title}</h3>
            <p className="mt-2 text-sm text-[var(--admin-muted)]">{item.text}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
