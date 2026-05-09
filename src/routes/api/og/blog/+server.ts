import { ImageResponse } from '@vercel/og';
import { buildOgTree, OG_CACHE_HEADERS } from '$lib/utils/og-image';

export const config = { runtime: 'nodejs20.x' };

export const GET = async () => {
  const tree = buildOgTree({
    eyebrow: 'Blog',
    title: 'Notes from the studio.',
    subtitle: 'On design, engineering, AI, and the craft of shipping digital products.',
    pills: ['Design', 'Engineering', 'AI', 'Product', 'Studio'],
    url: 'techyor.com/blog'
  });

  return new ImageResponse(tree as never, {
    width: 1200,
    height: 630,
    headers: OG_CACHE_HEADERS
  });
};
