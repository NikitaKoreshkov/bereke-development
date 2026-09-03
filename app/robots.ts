import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site-data';

export default function robots(): MetadataRoute.Robots {
  const host = SITE.siteUrl;

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/', '/api/', '/api/admin', '/api/admin/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin', '/admin/', '/api/', '/api/admin', '/api/admin/'],
      },
      {
        userAgent: 'Yandex',
        allow: '/',
        disallow: ['/admin', '/admin/', '/api/', '/api/admin', '/api/admin/'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/admin', '/admin/', '/api/', '/api/admin', '/api/admin/'],
      },
    ],
    sitemap: `${host}/sitemap.xml`,
    host,
  };
}
