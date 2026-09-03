import { MetadataRoute } from 'next';
import { getSiteContent } from '@/lib/content';
import { SEO } from '@/lib/seo';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { site, layouts } = await getSiteContent();
  const baseUrl = site.siteUrl || SEO.siteUrl;
  const now = new Date();

  const layoutImages = layouts
    .filter((item) => item.visible && item.image)
    .map((item) => `${baseUrl}${item.image.startsWith('/') ? item.image : `/${item.image}`}`);

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
      images: [
        `${baseUrl}/images/bereke-hero-video-poster.webp`,
        `${baseUrl}/images/bereke-exterior-1.jpeg`,
        `${baseUrl}/logo-bereke.png`,
      ],
    },
    {
      url: `${baseUrl}/spaces`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
      images: layoutImages.slice(0, 10),
    },
    {
      url: `${baseUrl}/developer`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${baseUrl}/terms-of-use`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
  ];
}
