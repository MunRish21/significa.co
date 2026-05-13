import { getPageWithSections } from '$lib/tenant.server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.tenant) return { page: null, sections: {} };
  const result = await getPageWithSections(locals.tenant.id, 'projects');
  return result ?? { page: null, sections: {} };
};
