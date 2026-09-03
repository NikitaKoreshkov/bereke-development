import type { NextConfig } from "next";

const STATIC_CACHE = 'public, max-age=31536000, immutable';

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2gb',
    },
    proxyClientMaxBodySize: '2gb',
  },
  async headers() {
    return [
      {
        source: '/videos/:path*',
        headers: [{ key: 'Cache-Control', value: STATIC_CACHE }],
      },
      {
        source: '/images/:path*',
        headers: [{ key: 'Cache-Control', value: STATIC_CACHE }],
      },
      {
        source: '/documents/:path*',
        headers: [{ key: 'Cache-Control', value: STATIC_CACHE }],
      },
      {
        source: '/uploads/:path*',
        headers: [{ key: 'Cache-Control', value: STATIC_CACHE }],
      },
      {
        source: '/logo-bereke.webp',
        headers: [{ key: 'Cache-Control', value: STATIC_CACHE }],
      },
      {
        source: '/logo-bereke.png',
        headers: [{ key: 'Cache-Control', value: STATIC_CACHE }],
      },
      {
        source: '/icon-mark.svg',
        headers: [{ key: 'Cache-Control', value: STATIC_CACHE }],
      },
      {
        source: '/favicon.ico',
        headers: [{ key: 'Cache-Control', value: STATIC_CACHE }],
      },
      {
        source: '/favicon-:size.png',
        headers: [{ key: 'Cache-Control', value: STATIC_CACHE }],
      },
      {
        source: '/apple-touch-icon.png',
        headers: [{ key: 'Cache-Control', value: STATIC_CACHE }],
      },
      {
        source: '/icon-:size.png',
        headers: [{ key: 'Cache-Control', value: STATIC_CACHE }],
      },
      {
        source: '/og-logo.jpg',
        headers: [{ key: 'Cache-Control', value: STATIC_CACHE }],
      },
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
    ];
  },
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
