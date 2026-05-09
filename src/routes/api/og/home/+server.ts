import { ImageResponse } from '@vercel/og';
import { buildOgTree, OG_CACHE_HEADERS } from '$lib/utils/og-image';

export const config = { runtime: 'nodejs20.x' };

export const GET = async () => {
  const tree = buildOgTree({
    title: 'Think. Design. Develop.',
    subtitle:
      'A digital product studio building custom websites, apps, AI tools, and automation for ambitious teams across the US, UK, Switzerland, and Australia.',
    pills: ['React', 'Next.js', 'Mobile', 'AI', 'E-commerce', 'SaaS'],
    url: 'techyor.com'
  });

  return new ImageResponse(tree as never, {
    width: 1200,
    height: 630,
    headers: OG_CACHE_HEADERS
  });
};
