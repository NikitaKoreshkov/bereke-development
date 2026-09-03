import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeftIcon } from '@/components/ui/Icons';
import { getSiteContent } from '@/lib/content';
import Footer from './components/Footer';

export const metadata: Metadata = {
  title: 'Страница не найдена',
  robots: { index: false, follow: true },
};

export default async function NotFound() {
  const { site } = await getSiteContent();

  return (
    <>
      <main
        id="hero"
        className="section-bg-graphite relative flex min-h-[100svh] flex-col overflow-hidden pt-[max(7rem,env(safe-area-inset-top))] sm:pt-28"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(201,169,98,0.12),transparent_70%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(201,169,98,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,98,0.8) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-24 top-1/3 h-72 w-72 rounded-full bg-[#C9A962]/8 blur-3xl sm:h-96 sm:w-96"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-16 bottom-1/4 h-56 w-56 rounded-full bg-[#C9A962]/5 blur-3xl sm:h-72 sm:w-72"
          aria-hidden
        />

        <div className="relative mx-auto flex flex-1 flex-col items-center justify-center px-4 pb-20 text-center sm:px-6">
          <p className="text-xs uppercase tracking-[0.35em] text-[#C9A962]/80">Ошибка 404</p>

          <div
            className="mt-6 select-none bg-gradient-to-b from-[#E8D5A3] via-[#C9A962] to-[#8B6B2E] bg-clip-text text-[clamp(6rem,22vw,11rem)] font-medium leading-none tracking-tight text-transparent"
            style={{ fontFamily: 'var(--font-playfair-display)' }}
            aria-hidden
          >
            404
          </div>

          <h1
            className="mt-4 max-w-xl text-2xl uppercase leading-tight tracking-[0.08em] text-white sm:text-3xl md:text-4xl"
            style={{ fontFamily: 'var(--font-playfair-display)' }}
          >
            Страница не найдена
          </h1>

          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/55 sm:text-[15px] sm:leading-[1.85]">
            Такой страницы на сайте нет — возможно, ссылка устарела или адрес введён с ошибкой.
            Вернитесь на главную или выберите один из разделов ниже.
          </p>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/"
              className="micro-hover-cta inline-flex min-w-[220px] items-center justify-center gap-2 rounded-full border border-[#C9A962] bg-[#C9A962] px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#1a1a1a] transition-all hover:bg-[#D4B56E] hover:border-[#D4B56E]"
            >
              <ArrowLeftIcon className="h-3.5 w-3.5" />
              На главную
            </Link>
            <Link
              href="/spaces"
              className="micro-hover inline-flex min-w-[220px] items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-xs uppercase tracking-[0.2em] text-white/85 backdrop-blur-sm transition-all hover:border-[#C9A962]/50 hover:bg-[#C9A962]/10 hover:text-[#E8D5A3]"
            >
              Планировки
            </Link>
          </div>

          <p className="mt-12 text-xs text-white/35">
            Нужна помощь?{' '}
            <a
              href={site.phoneHref}
              className="micro-hover-gold text-[#C9A962]/90 transition-colors hover:text-[#E8D5A3]"
            >
              {site.phone}
            </a>
          </p>
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#C9A962]/25 to-transparent"
          aria-hidden
        />
      </main>
      <Footer />
    </>
  );
}
