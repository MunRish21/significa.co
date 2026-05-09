import { ImageResponse } from '@vercel/og';
import { buildOgTree, OG_CACHE_HEADERS } from '$lib/utils/og-image';
import { projectsData } from '$lib/data/projects';

export const config = { runtime: 'nodejs20.x' };

export const GET = async () => {
  const tree = buildOgTree({
    eyebrow: 'Projects',
    title: `${projectsData.length}+ shipped products.`,
    subtitle:
      'Custom websites, apps, e-commerce, AI tools, and automation built for ambitious teams.',
    pills: projectsData.slice(0, 5).map((p) => p.name),
    url: 'techyor.com/projects'
  });

  return new ImageResponse(tree as never, {
    width: 1200,
    height: 630,
    headers: OG_CACHE_HEADERS
  });
};
