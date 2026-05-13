import { redirect } from '@sveltejs/kit';
import { getPageWithSections } from '$lib/tenant.server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  const meta = (locals.tenant?.meta ?? {}) as Record<string, unknown>;
  const slug = meta.aboutPageMemberSlug;
  if (typeof slug === 'string' && slug) {
    throw redirect(302, `/team/${slug}`);
  }
  if (!locals.tenant) {
    return { page: null, sections: {} };
  }
  const result = await getPageWithSections(locals.tenant.id, 'about');
  return result ?? { page: null, sections: {} };
};
