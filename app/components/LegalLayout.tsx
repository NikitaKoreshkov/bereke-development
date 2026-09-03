'use client';

import Link from 'next/link';
import { ArrowLeftIcon } from '@/components/ui/Icons';
import { useLocale } from '@/lib/i18n/locale-context';
import Footer from './Footer';

export default function LegalLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const { messages } = useLocale();

  return (
    <>
      <main className="section-bg-ink relative min-h-screen overflow-hidden pt-[max(7rem,env(safe-area-inset-top))] pb-16 text-white sm:pt-28 sm:pb-20">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(201,169,98,0.12),transparent_60%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-[max(7rem,env(safe-area-inset-top))] h-px bg-gradient-to-r from-transparent via-[#C9A962]/35 to-transparent sm:top-28"
          aria-hidden
        />

        <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#C9A962] transition-colors hover:text-[#E8D5A3]"
          >
            <ArrowLeftIcon className="h-3.5 w-3.5" />
            {messages.backHome}
          </Link>
          <h1
            className="mb-10 text-2xl uppercase tracking-[0.06em] text-[#F4EFE7] sm:text-3xl"
            style={{ fontFamily: 'var(--font-playfair-display)' }}
          >
            {title}
          </h1>
          <div className="prose-legal prose-legal--ink">{children}</div>
        </div>
      </main>
      <Footer />
    </>
  );
}
