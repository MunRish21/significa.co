import { error } from '@sveltejs/kit';

import { getHandbookHierarchyConfig } from '$components/pages/handbook/common/data.js';

export const load = async ({ locals }) => {
  const version = locals.version;

  try {
    const config = await getHandbookHierarchyConfig(null, version);

    return {
      hierarchy: config.content.hierarchy
    };
  } catch (err) {
    console.error('Failed to get Handbook content for the index page', err);
    throw error(404, 'Not found');
  }
};
