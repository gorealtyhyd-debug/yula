export const dynamic = 'force-static';
import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: 'Yula',
    description: SITE.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#F3EFE8',
    theme_color: '#1F2A2E',
  };
}
