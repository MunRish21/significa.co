import { getHandbookHierarchyConfig } from '$components/pages/handbook/common/data.js';

export const load = async ({ locals }) => {
  const version = locals.version;

  const config = await getHandbookHierarchyConfig(null, version, 'sidebar');

  return { hierarchy: config.content.hierarchy };
};
