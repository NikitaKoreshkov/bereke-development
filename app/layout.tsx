import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Open_Sans } from 'next/font/google';
import { headers } from 'next/headers';
import './globals.css';
import { getSiteContent } from '@/lib/content';
import { getGlobalJsonLdGraphs, getRootMetadata } from '@/lib/seo';
import SiteProviders from './components/SiteProviders';
import JsonLd from './components/JsonLd';
import GoogleTagManager from './components/GoogleTagManager';
import YandexMetrika from './components/YandexMetrika';

const playfairDisplay = Playfair_Display({
  variable: '--font-playfair-display',
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '700'],
  display: 'swap',
  preload: true,
});

const openSans = Open_Sans({
  variable: '--font-open-sans',
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '600'],
  display: 'swap',
  preload: true,
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#1a1a1a' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  colorScheme: 'dark light',
};

/** CMS-driven site: never serve a statically frozen layout shell. */
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = getRootMetadata();

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerList = await headers();
  const pathname = headerList.get('x-pathname') || '';
  const isAdmin = pathname.startsWith('/admin');
  const content = await getSiteContent();

  if (isAdmin) {
    return (
      <html lang="ru">
        <body className={`${playfairDisplay.variable} ${openSans.variable} antialiased`}>{children}</body>
      </html>
    );
  }

  return (
    <html lang="ru">
      <head>
        <link
          rel="preload"
          as="image"
          href="/images/bereke-hero-video-poster.webp"
          type="image/webp"
          fetchPriority="high"
        />
        <JsonLd data={getGlobalJsonLdGraphs()} />
      </head>
      <body className={`${playfairDisplay.variable} ${openSans.variable} antialiased`}>
        <GoogleTagManager />
        <YandexMetrika />
        <SiteProviders content={content}>{children}</SiteProviders>
      </body>
    </html>
  );
}
