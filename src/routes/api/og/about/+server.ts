import { ImageResponse } from '@vercel/og';
import { buildOgTree, OG_CACHE_HEADERS } from '$lib/utils/og-image';

export const config = { runtime: 'nodejs20.x' };

export const GET = async () => {
  const tree = buildOgTree({
    eyebrow: 'About',
    title: 'A studio that ships.',
    subtitle:
      '8+ years, 80+ products shipped for ambitious teams across the US, UK, Switzerland, and Australia.',
    pills: ['Senior team', 'Product-first', 'Daily updates', 'Worldwide'],
    url: 'techyor.com/about'
  });

  return new ImageResponse(tree as never, {
    width: 1200,
    height: 630,
    headers: OG_CACHE_HEADERS
  });
};
