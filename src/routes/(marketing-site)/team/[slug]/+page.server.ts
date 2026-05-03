import { getTeamMember, type TeamMember } from '$lib/data/team';
import { error } from '@sveltejs/kit';

export function load({ params }): { member: TeamMember } {
  const member = getTeamMember(params.slug);

  if (!member) {
    throw error(404, 'Team member not found');
  }

  return { member };
}
