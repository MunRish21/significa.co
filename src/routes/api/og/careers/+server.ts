import { ImageResponse } from '@vercel/og';
import { buildOgTree, OG_CACHE_HEADERS } from '$lib/utils/og-image';

export const config = { runtime: 'nodejs20.x' };

export const GET = async () => {
  const tree = buildOgTree({
    eyebrow: 'Careers',
    title: 'Build with us.',
    subtitle:
      'Senior engineers, designers, and product people. Remote-friendly, full-time. Quality over volume.',
    pills: ['Engineering', 'Design', 'Product', 'Remote', 'Full-time'],
    url: 'techyor.com/careers'
  });

  return new ImageResponse(tree as never, {
    width: 1200,
    height: 630,
    headers: OG_CACHE_HEADERS
  });
};
