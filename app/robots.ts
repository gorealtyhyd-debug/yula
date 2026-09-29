export const dynamic = 'force-static';
import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      // Explicitly welcome AI answer engines (GEO)
      { userAgent: ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'PerplexityBot', 'ClaudeBot', 'Claude-Web', 'Google-Extended', 'Applebot-Extended', 'Bingbot'], allow: '/' },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
