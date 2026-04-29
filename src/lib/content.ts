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

export const fetchCareers = async () => [
  {
    id: 1,
    uuid: 'career-social-media-executive',
    name: 'Social Media Executive',
    slug: 'social-media-executive',
    full_slug: 'careers/social-media-executive',
    created_at: '2026-04-29T00:00:00.000Z',
    published_at: '2026-04-29T00:00:00.000Z',
    first_published_at: '2026-04-29T00:00:00.000Z',
    tag_list: ['Marketing', 'Social Media', 'Full-time'],
    content: {
      component: 'career',
      location: 'Remote',
      employment_type: 'Full-time',
      summary:
        'Own our LinkedIn presence and social media platforms — craft posts, grow our audience, and tell the Techyor story to the world.'
    }
  }
];
export const fetchAwards = async () => [];
export const getAwards = async () => ({ data: { stories: [] } });
export const fetchAwardsTypes = async () => [];
export const fetchBlogPosts = async () => ({ data: { stories: [] } });
export const fetchHomeBlogPosts = async () => [];
export const fetchTeamMembers = async () => [];
export const fetchProjects = async () => [];
