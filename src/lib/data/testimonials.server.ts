import { getSupabaseAdmin } from '$lib/supabase.server';
import type { Testimonial } from './testimonials';

function rowToTestimonial(row: Record<string, unknown>): Testimonial {
  return {
    id: row.external_id as string,
    quote: row.quote as string,
    author: row.author as string,
    authorRole: (row.author_role as string) ?? undefined,
    authorAvatar: (row.author_avatar as string) ?? undefined,
    rating: (row.rating as number) ?? undefined,
    source: row.source as Testimonial['source'],
    sourceUrl: (row.source_url as string) ?? undefined,
    memberSlug: (row.member_slug as string) ?? undefined,
    projectSlug: (row.project_slug as string) ?? undefined,
    services: (row.services as Testimonial['services']) ?? undefined,
    projectTitle: (row.project_title as string) ?? undefined,
    date: (row.occurred_at as string) ?? undefined,
    tags: (row.tags as string[]) ?? undefined,
    featured: (row.featured as boolean) ?? false
  };
}

export async function fetchTestimonialsFromDb(tenantId: string): Promise<Testimonial[]> {
  const { data, error } = await getSupabaseAdmin()
    .from('testimonials')
    .select('*')
    .eq('tenant_id', tenantId)
    .order('featured', { ascending: false })
    .order('position');

  if (error) {
    console.error('[testimonials] fetch failed', error);
    return [];
  }
  return (data ?? []).map(rowToTestimonial);
}
