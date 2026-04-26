import { mockHandbookConfiguration } from '$lib/handbook-mock-data';

export const load = async ({ locals }) => {
  const version = locals.version;

  return {
    configuration: mockHandbookConfiguration,
    careers: [],
    version
  };
};
