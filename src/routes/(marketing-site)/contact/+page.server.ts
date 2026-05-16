import { getPageWithSections } from '$lib/tenant.server';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.tenant) throw error(404, 'Not found');
  const result = await getPageWithSections(locals.tenant.id, 'contact');
  if (!result) throw error(404, 'Not found');
  return result;
};
