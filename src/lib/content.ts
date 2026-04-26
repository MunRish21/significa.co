import { error } from '@sveltejs/kit';

export type PageResult = {
  story: Record<string, unknown>;
  homePosts?: Record<string, unknown>[];
  blogIndex?: Record<string, unknown>;
  projectsIndex?: Record<string, unknown>[];
  relatedPosts?: Record<string, unknown>[];
  relatedProjects?: Record<string, unknown>[];
  authorPosts?: Record<string, unknown>[];
  authorProjects?: Record<string, unknown>[];
  teamMembers?: Record<string, unknown>[];
};

export async function fetchPage(options: {
  slug: string;
  version?: 'draft' | 'published';
  fetch?: typeof fetch;
  url?: URL;
}): Promise<PageResult> {
  const slug = options.slug.replace(/^\/+/, '');

  if (!slug) throw error(404, 'Page not found');

  return {
    story: {
      id: 0,
      uuid: '',
      name: slug,
      slug: slug,
      content: {
        component: 'page'
      }
    }
  };
}

export async function fetchEntries<T>(): Promise<T[]> {
  return [];
}

export const fetchCareers = async () => [];
export const fetchAwards = async () => [];
export const getAwards = async () => ({ data: { stories: [] } });
export const fetchAwardsTypes = async () => [];
export const fetchBlogPosts = async () => ({ data: { stories: [] } });
export const fetchHomeBlogPosts = async () => [];
export const fetchTeamMembers = async () => [];
export const fetchProjects = async () => [];
