import type { MetadataRoute } from 'next';
import { SEO } from '@/lib/seo';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'БЦ BEREKE — бизнес-центр класса А в Алматы | Bereke Development',
    short_name: 'БЦ BEREKE',
    description: SEO.shortDescription,
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#1a1a1a',
    lang: 'ru',
    dir: 'ltr',
    categories: ['business', 'real estate'],
    icons: [
      {
        src: '/icon-mark.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}
