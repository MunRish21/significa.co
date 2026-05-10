import { ImageResponse } from '@vercel/og';
import { error } from '@sveltejs/kit';
import { getLocation } from '$lib/data/locations';
import { buildOgTree, OG_CACHE_HEADERS } from '$lib/utils/og-image';

export const config = { runtime: 'nodejs20.x' };

export const GET = async ({ params }) => {
  const location = getLocation(params.location);
  if (!location || !location.ready) throw error(404, 'Location not found');

  const tree = buildOgTree({
    eyebrow: `For ${location.shortName} companies`,
    title: location.h1.replace('Hire Senior Developers from India for ', '').replace(/Companies$/, '').trim() || location.countryName,
    subtitle: location.subhead,
    pills: location.industries.map((i) => i.name).slice(0, 3),
    url: `techyor.com/hire-developers/${location.slug}`
  });

  return new ImageResponse(tree as never, {
    width: 1200,
    height: 630,
    headers: OG_CACHE_HEADERS
  });
};
