import { getSupabaseAdmin } from '$lib/supabase.server';

export type ServiceDescriptionEntry = {
  kind: 'service' | 'deliverable';
  slug: string;
  name: string;
  description: string;
};

/**
 * Returns a map keyed by name (for the legacy lookup helper) and by slug
 * (for filter-page route resolution). Both views are derived from the same
 * row set so they stay in sync.
 */
export async function fetchServiceDescriptions(
  tenantId: string
): Promise<{
  byName: Record<string, string>;
  bySlug: Record<string, ServiceDescriptionEntry>;
  services: ServiceDescriptionEntry[];
  deliverables: ServiceDescriptionEntry[];
}> {
  const { data, error } = await getSupabaseAdmin()
    .from('service_descriptions')
    .select('kind, slug, name, description, position')
    .eq('tenant_id', tenantId)
    .eq('is_active', true)
    .order('kind')
    .order('position');

  const byName: Record<string, string> = {};
  const bySlug: Record<string, ServiceDescriptionEntry> = {};
  const services: ServiceDescriptionEntry[] = [];
  const deliverables: ServiceDescriptionEntry[] = [];

  if (error) {
    console.error('[service_descriptions] fetch failed', error);
    return { byName, bySlug, services, deliverables };
  }

  for (const row of data ?? []) {
    const entry: ServiceDescriptionEntry = {
      kind: row.kind as 'service' | 'deliverable',
      slug: row.slug,
      name: row.name,
      description: row.description
    };
    byName[row.name] = row.description;
    bySlug[row.slug] = entry;
    if (entry.kind === 'service') services.push(entry);
    else deliverables.push(entry);
  }

  return { byName, bySlug, services, deliverables };
}
