import { ImageResponse } from '@vercel/og';
import { error } from '@sveltejs/kit';
import { getTeamMember } from '$lib/data/team';
import { buildOgTree, OG_CACHE_HEADERS } from '$lib/utils/og-image';

export const config = { runtime: 'nodejs20.x' };

export const GET = async ({ params }) => {
  const member = getTeamMember(params.slug);
  if (!member) throw error(404, 'Team member not found');

  const tree = buildOgTree({
    eyebrow: member.role,
    title: member.name,
    subtitle: member.tagline,
    pills: (member.badges || []).slice(0, 5),
    url: `techyor.com/team/${member.slug}`
  });

  return new ImageResponse(tree as never, {
    width: 1200,
    height: 630,
    headers: OG_CACHE_HEADERS
  });
};
