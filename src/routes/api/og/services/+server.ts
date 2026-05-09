import { ImageResponse } from '@vercel/og';
import { buildOgTree, OG_CACHE_HEADERS } from '$lib/utils/og-image';

export const config = {
  runtime: 'nodejs20.x'
};

/**
 * Static OG image for the /services overview page.
 * Highlights the three top-level service categories so search/social
 * cards pre-frame what visitors will find on the page.
 */
export const GET = async () => {
  const tree = buildOgTree({
    eyebrow: 'Services',
    title: 'Strategy. Design. Development.',
    subtitle:
      'A digital product studio shipping websites, web apps, mobile, AI, and automation for ambitious teams.',
    pills: ['Strategy', 'UX & UI', 'Web', 'Mobile', 'AI', 'Automation'],
    url: 'techyor.com/services'
  });

  return new ImageResponse(tree as never, {
    width: 1200,
    height: 630,
    headers: OG_CACHE_HEADERS
  });
};
