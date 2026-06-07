import { getPageWithSections } from '$lib/tenant.server';
import { fetchPublishedBlogPostSummaries } from '$lib/data/blog.server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  // Blog is visible to everyone. Page sections are optional — when no tenant or
  // no DB row exists, sections default to enabled (isSectionEnabled treats
  // missing keys as visible).
  const sectionResult = locals.tenant
    ? await getPageWithSections(locals.tenant.id, 'blog')
    : null;

  const posts = await fetchPublishedBlogPostSummaries();

  return {
    page: sectionResult?.page ?? null,
    sections: sectionResult?.sections ?? {},
    posts
  };
};
