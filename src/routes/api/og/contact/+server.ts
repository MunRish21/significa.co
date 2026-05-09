import { ImageResponse } from '@vercel/og';
import { buildOgTree, OG_CACHE_HEADERS } from '$lib/utils/og-image';

export const config = { runtime: 'nodejs20.x' };

export const GET = async () => {
  const tree = buildOgTree({
    eyebrow: 'Contact',
    title: 'Tell us what you’re building.',
    subtitle: 'We reply within 24 hours. No deck required, no obligation.',
    pills: ['24h reply', 'Email', 'Form', 'Call'],
    url: 'techyor.com/contact'
  });

  return new ImageResponse(tree as never, {
    width: 1200,
    height: 630,
    headers: OG_CACHE_HEADERS
  });
};
