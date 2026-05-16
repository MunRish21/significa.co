import { getPageWithSections } from '$lib/tenant.server';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.tenant) throw error(404, 'Not found');
  const isAgency = (locals.tenant.meta as Record<string, unknown> | undefined)?.isAgency === true;
  if (!isAgency) throw error(404, 'Not found');
  const result = await getPageWithSections(locals.tenant.id, 'blog');
  if (!result) throw error(404, 'Not found');
  return result;
};
