export const dynamic = 'force-static';
import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';
import { VILLAS, CLUB_SLIDES } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const images = [
    '/assets/images/master-plan.jpg',
    ...VILLAS.flatMap((v) => [v.E?.render, v.W?.render].filter(Boolean) as string[]),
    ...CLUB_SLIDES.map((c) => c.src),
  ].map((p) => new URL(p, SITE.url).toString());
  return [{ url: SITE.url, lastModified: new Date(), changeFrequency: 'weekly', priority: 1, images }];
}
