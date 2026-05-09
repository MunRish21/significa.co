import { ImageResponse } from '@vercel/og';
import { error } from '@sveltejs/kit';
import { projectsData } from '$lib/data/projects';
import { buildOgTree, OG_CACHE_HEADERS } from '$lib/utils/og-image';

export const config = {
  runtime: 'nodejs20.x'
};

/** Slug → "Filter Name" lookup. Mirrors the slug derivation in sitemap.xml. */
function unslugifyFilterName(slug: string): string | undefined {
  const candidates = new Set<string>();
  projectsData.forEach((p) => {
    p.services.forEach((s) => candidates.add(s));
    p.deliverables.forEach((d) => candidates.add(d));
  });
  for (const name of candidates) {
    const candidate = name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/&/g, 'and')
      .replace(/[^\w-]/g, '');
    if (candidate === slug) return name;
  }
  return undefined;
}

export const GET = async ({ params }) => {
  const filterName = unslugifyFilterName(params.slug);
  if (!filterName) throw error(404, 'Filter not found');

  const matching = projectsData.filter(
    (p) =>
      p.services.some((s) => s.toLowerCase() === filterName.toLowerCase()) ||
      p.deliverables.some((d) => d.toLowerCase() === filterName.toLowerCase())
  );

  const tree = buildOgTree({
    eyebrow: 'Projects',
    title: `${filterName}.`,
    subtitle: `${matching.length}+ ${filterName.toLowerCase()} project${
      matching.length !== 1 ? 's' : ''
    } shipped for teams across the US, UK, AU, and Europe.`,
    pills: matching.slice(0, 5).map((p) => p.name),
    url: `techyor.com/projects/${params.slug}`
  });

  return new ImageResponse(tree as never, {
    width: 1200,
    height: 630,
    headers: OG_CACHE_HEADERS
  });
};
