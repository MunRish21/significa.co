import { getSupabaseAdmin } from '$lib/supabase.server';

export type ClientLogo = {
  slug: string;
  name: string;
  lightLogo: string;
  darkLogo: string;
  width: number;
  height: number;
  url: string;
};

export async function fetchClients(tenantId: string): Promise<ClientLogo[]> {
  const { data, error } = await getSupabaseAdmin()
    .from('clients')
    .select('slug, name, light_logo, dark_logo, width, height, url, position')
    .eq('tenant_id', tenantId)
    .eq('is_active', true)
    .order('position');

  if (error) {
    console.error('[clients] fetch failed', error);
    return [];
  }

  return (data ?? []).map((row) => ({
    slug: row.slug,
    name: row.name,
    lightLogo: row.light_logo ?? '',
    darkLogo: row.dark_logo ?? '',
    width: row.width ?? 0,
    height: row.height ?? 0,
    url: row.url ?? '#'
  }));
}
