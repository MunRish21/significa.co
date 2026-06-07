import { fetchBlogPostBySlug } from '$lib/data/blog.server';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const post = await fetchBlogPostBySlug(params.slug);
  if (!post) throw error(404, 'Post not found');
  return { post };
};
