import { getSupabaseAdmin, type Database } from './supabase.server';
import { PUBLIC_TENANT_SLUG } from '$env/static/public';
import type { SectionsMap } from './tenant';

export type Tenant = Database['public']['Tables']['tenants']['Row'];
export type Page = Database['public']['Tables']['pages']['Row'];
export type PageSection = Database['public']['Tables']['page_sections']['Row'];

/**
 * Resolve the tenant for the current request. Hostname match first, then a
 * configured fallback slug for environments where the hostname is not
 * registered (local dev, preview deploys).
 */
export async function resolveTenant(hostname: string): Promise<Tenant | null> {
  const supabase = getSupabaseAdmin();
  const normalized = hostname.toLowerCase().split(':')[0];

  const { data: byDomain } = await supabase
    .from('tenants')
    .select('*')
    .eq('is_active', true)
    .or(`primary_domain.eq.${normalized},alt_domains.cs.{${normalized}}`)
    .limit(1)
    .maybeSingle();

  if (byDomain) return byDomain;

  if (PUBLIC_TENANT_SLUG) {
    const { data: bySlug } = await supabase
      .from('tenants')
      .select('*')
      .eq('slug', PUBLIC_TENANT_SLUG)
      .maybeSingle();
    return bySlug;
  }

  return null;
}

/**
 * Load a page and its enabled sections (ordered by position) for a tenant.
 * Returns null if the page is unpublished or missing.
 */
export async function getPageWithSections(
  tenantId: string,
  pageSlug: string
): Promise<{ page: Page; sections: SectionsMap } | null> {
  const supabase = getSupabaseAdmin();

  const { data: page } = await supabase
    .from('pages')
    .select('*')
    .eq('tenant_id', tenantId)
    .eq('slug', pageSlug)
    .eq('is_published', true)
    .maybeSingle();

  if (!page) return null;

  const { data: rows } = await supabase
    .from('page_sections')
    .select('section_key, section_type, position, enabled, props')
    .eq('page_id', page.id)
    .order('position');

  const sections: SectionsMap = {};
  for (const r of rows ?? []) {
    sections[r.section_key] = {
      enabled: r.enabled,
      position: r.position,
      section_type: r.section_type,
      props: r.props
    };
  }

  return { page, sections };
}

export { isSectionEnabled } from './tenant';
export type { SectionsMap } from './tenant';
