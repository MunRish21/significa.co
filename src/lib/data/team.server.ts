import { getSupabaseAdmin } from '$lib/supabase.server';
import type { TeamMember } from './team';

/**
 * Maps a DB row (snake_case) to the TeamMember shape the existing components
 * expect (camelCase). Keeping the existing TS type stable means the rest of
 * the app keeps working without changes once the data source is swapped.
 */
function rowToMember(row: Record<string, unknown>): TeamMember {
  return {
    slug: row.slug as string,
    name: row.name as string,
    shortName: (row.short_name as string) ?? undefined,
    role: row.role as string,
    tagline: (row.tagline as string) ?? '',
    location: (row.location as string) ?? '',
    avatar: (row.avatar as string) ?? '',
    coverImage: (row.cover_image as string) ?? undefined,
    isActive: row.is_active as boolean,
    bio: (row.bio as string) ?? '',
    longBio: (row.long_bio as string) ?? undefined,
    yearsExperience: (row.years_experience as number) ?? 0,
    hourlyRate: (row.hourly_rate as string) ?? undefined,
    badges: (row.badges as string[]) ?? [],
    stats: (row.stats as TeamMember['stats']) ?? {},
    skills: (row.skills as string[]) ?? [],
    primaryServices: (row.primary_services as TeamMember['primaryServices']) ?? [],
    featuredProjectSlugs: (row.featured_project_slugs as string[]) ?? [],
    languages: (row.languages as TeamMember['languages']) ?? [],
    education: (row.education as TeamMember['education']) ?? [],
    employment: (row.employment as TeamMember['employment']) ?? [],
    links: (row.links as TeamMember['links']) ?? [],
    introVideo: (row.intro_video as TeamMember['introVideo']) ?? undefined,
    seo: (row.seo as TeamMember['seo']) ?? { title: '', description: '', keywords: [] }
  };
}

export async function fetchTeamMembersFromDb(tenantId: string): Promise<TeamMember[]> {
  const { data, error } = await getSupabaseAdmin()
    .from('team_members')
    .select('*')
    .eq('tenant_id', tenantId)
    .eq('is_active', true)
    .order('position');

  if (error) {
    console.error('[team_members] fetch failed', error);
    return [];
  }
  return (data ?? []).map(rowToMember);
}

export async function fetchTeamMemberBySlug(
  tenantId: string,
  slug: string
): Promise<TeamMember | null> {
  const { data, error } = await getSupabaseAdmin()
    .from('team_members')
    .select('*')
    .eq('tenant_id', tenantId)
    .eq('slug', slug)
    .maybeSingle();

  if (error) {
    console.error('[team_members] fetch by slug failed', error);
    return null;
  }
  return data ? rowToMember(data) : null;
}
