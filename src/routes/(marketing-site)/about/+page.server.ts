import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ locals }) => {
  const meta = (locals.tenant?.meta ?? {}) as Record<string, unknown>;
  const slug = meta.aboutPageMemberSlug;
  if (typeof slug === 'string' && slug) {
    throw redirect(302, `/team/${slug}`);
  }
  return {};
};
