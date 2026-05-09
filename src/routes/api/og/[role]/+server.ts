import { ImageResponse } from '@vercel/og';
import { error } from '@sveltejs/kit';
import { getHireRole } from '$lib/data/hire-roles';
import { buildOgTree, OG_CACHE_HEADERS } from '$lib/utils/og-image';

export const config = {
  runtime: 'nodejs20.x'
};

export const GET = async ({ params }) => {
  const role = getHireRole(params.role);
  if (!role) throw error(404, 'Role not found');

  const tree = buildOgTree({
    title: `${role.h1}.`,
    subtitle: role.subhead,
    pills: role.techStack.slice(0, 5),
    url: `techyor.com/hire/${role.slug}`
  });

  return new ImageResponse(tree as never, {
    width: 1200,
    height: 630,
    headers: OG_CACHE_HEADERS
  });
};
