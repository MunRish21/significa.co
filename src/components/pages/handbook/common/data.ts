import { mockHandbookHierarchy } from '$lib/handbook-mock-data';

export const getHandbookHierarchyConfig = async (
  _storyblok: any,
  _version: 'draft' | 'published' | undefined,
  _context: 'index' | 'sidebar' = 'index'
) => {
  return {
    content: {
      hierarchy: mockHandbookHierarchy
    }
  };
};
