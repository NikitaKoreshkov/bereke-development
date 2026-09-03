'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { SECTION_META } from '@/lib/content-types';

const NAV = [
  { href: '/admin', label: 'Обзор', exact: true },
  ...SECTION_META.map((section) => ({
    href: `/admin/sections/${section.key}`,
    label: section.title,
    exact: false,
  })),
  { href: '/admin/calculator', label: 'Калькулятор', exact: false },
  { href: '/admin/media', label: 'Медиа', exact: false },
  { href: '/admin/settings', label: 'Контакты', exact: false },
];

export default function AdminChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLogin = pathname === '/admin/login';

  if (isLogin) {
    return <>{children}</>;
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <div className="admin-shell">
      <div className="mx-auto flex min-h-screen max-w-[1500px]">
        <aside className="sticky top-0 hidden h-screen w-[280px] shrink-0 flex-col border-r border-[var(--admin-line)] bg-[rgba(255,253,249,0.78)] px-4 py-7 backdrop-blur-xl md:flex">
          <div className="px-2 pb-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--admin-line-strong)] bg-white px-3 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--admin-gold)]" />
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--admin-muted)]">
                CMS
              </p>
            </div>
            <h1 className="mt-4 text-[1.85rem] tracking-[0.12em]">BEREKE</h1>
            <p className="mt-1 text-sm text-[var(--admin-muted)]">Управление сайтом</p>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto pb-4 pr-1">
            {NAV.map((item) => {
              const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`admin-nav-link ${active ? 'admin-nav-link-active' : ''}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="space-y-2 border-t border-[var(--admin-line)] pt-4">
            <a href="/" target="_blank" rel="noreferrer" className="admin-btn admin-btn-ghost w-full">
              Открыть сайт
            </a>
            <button type="button" onClick={logout} className="admin-btn admin-btn-ghost w-full">
              Выйти
            </button>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center justify-between gap-3 border-b border-[var(--admin-line)] bg-[rgba(255,253,249,0.72)] px-4 py-4 backdrop-blur-xl md:px-8">
            <div className="md:hidden">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--admin-muted)]">
                Admin
              </p>
              <p className="font-[family-name:var(--font-playfair-display)] text-xl tracking-[0.1em]">
                BEREKE
              </p>
            </div>
            <div className="hidden md:block">
              <p className="text-sm text-[var(--admin-muted)]">
                Правки сразу попадают в PostgreSQL и на сайт
              </p>
            </div>
            <div className="ml-auto flex flex-wrap items-center gap-2">
              <a href="/" target="_blank" rel="noreferrer" className="admin-btn admin-btn-ghost">
                Сайт
              </a>
              <button type="button" onClick={logout} className="admin-btn admin-btn-ghost md:hidden">
                Выйти
              </button>
            </div>
          </header>

          <div className="overflow-x-auto border-b border-[var(--admin-line)] bg-white/35 md:hidden">
            <div className="flex min-w-max gap-2 px-4 py-3">
              {NAV.map((item) => {
                const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.08em] ${
                      active
                        ? 'bg-[var(--admin-ink)] text-white'
                        : 'border border-[var(--admin-line-strong)] bg-white text-[var(--admin-ink)]'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          <main className="flex-1 px-4 py-6 md:px-8 md:py-9">{children}</main>
        </div>
      </div>
    </div>
  );
}
