import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { SUPABASE_SECRET_KEY } from '$env/static/private';
import WebSocket from 'ws';

type TenantRow = {
  id: string;
  slug: string;
  name: string;
  primary_domain: string;
  alt_domains: string[];
  brand: Record<string, unknown>;
  social: Record<string, unknown>;
  contact: Record<string, unknown>;
  meta: Record<string, unknown>;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

type PageRow = {
  id: string;
  tenant_id: string;
  slug: string;
  title: string | null;
  description: string | null;
  meta: Record<string, unknown>;
  is_published: boolean;
  published_at: string | null;
};

type PageSectionRow = {
  id: string;
  page_id: string;
  section_key: string;
  section_type: string;
  position: number;
  enabled: boolean;
  props: Record<string, unknown>;
};

type ClientRow = {
  id: string;
  tenant_id: string;
  slug: string;
  name: string;
  light_logo: string | null;
  dark_logo: string | null;
  width: number | null;
  height: number | null;
  url: string | null;
  position: number;
  is_active: boolean;
};

export type Database = {
  public: {
    Tables: {
      tenants: { Row: TenantRow; Insert: Partial<TenantRow>; Update: Partial<TenantRow>; Relationships: [] };
      pages: { Row: PageRow; Insert: Partial<PageRow>; Update: Partial<PageRow>; Relationships: [] };
      page_sections: { Row: PageSectionRow; Insert: Partial<PageSectionRow>; Update: Partial<PageSectionRow>; Relationships: [] };
      clients: { Row: ClientRow; Insert: Partial<ClientRow>; Update: Partial<ClientRow>; Relationships: [] };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

let cached: SupabaseClient<Database> | null = null;

export function getSupabaseAdmin(): SupabaseClient<Database> {
  if (cached) return cached;
  cached = createClient<Database>(PUBLIC_SUPABASE_URL, SUPABASE_SECRET_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
    realtime: { transport: WebSocket as unknown as never }
  });
  return cached;
}
