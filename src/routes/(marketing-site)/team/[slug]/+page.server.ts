import { getTeamMember, type TeamMember } from '$lib/data/team';
import { fetchTeamMemberBySlug } from '$lib/data/team.server';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }): Promise<{ member: TeamMember }> => {
  let member: TeamMember | null = null;

  if (locals.tenant) {
    member = await fetchTeamMemberBySlug(locals.tenant.id, params.slug);
  } else {
    // No tenant resolved (e.g. unrecognized host with no fallback) —
    // fall back to the hardcoded list so /team/[slug] still resolves.
    member = getTeamMember(params.slug) ?? null;
  }
  if (!member) {
    throw error(404, 'Team member not found');
  }
  return { member };
};
