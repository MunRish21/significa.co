-- Whitelabel core schema: tenants, pages, page_sections.
-- Per-tenant content tables (projects, team, etc.) come in a later migration;
-- for now `page_sections.props` holds section content as jsonb.

set search_path = public;

-- updated_at helper

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- tenants

create table public.tenants (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  primary_domain text not null unique,
  alt_domains text[] not null default '{}',
  brand jsonb not null default '{}'::jsonb,
  social jsonb not null default '{}'::jsonb,
  contact jsonb not null default '{}'::jsonb,
  meta jsonb not null default '{}'::jsonb,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index tenants_alt_domains_idx on public.tenants using gin (alt_domains);

create trigger tenants_set_updated_at
  before update on public.tenants
  for each row execute function public.set_updated_at();

-- pages

create table public.pages (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  slug text not null,
  title text,
  description text,
  meta jsonb not null default '{}'::jsonb,
  is_published boolean not null default true,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tenant_id, slug)
);

create index pages_tenant_published_idx on public.pages (tenant_id, is_published);

create trigger pages_set_updated_at
  before update on public.pages
  for each row execute function public.set_updated_at();

-- page_sections

create table public.page_sections (
  id uuid primary key default gen_random_uuid(),
  page_id uuid not null references public.pages(id) on delete cascade,
  section_key text not null,
  section_type text not null,
  position int not null default 0,
  enabled boolean not null default true,
  props jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (page_id, section_key)
);

create index page_sections_page_position_idx on public.page_sections (page_id, position);

create trigger page_sections_set_updated_at
  before update on public.page_sections
  for each row execute function public.set_updated_at();

-- Domain resolver: maps a request hostname to a tenant id.

create or replace function public.get_tenant_by_domain(hostname text)
returns uuid
language sql
stable
security invoker
set search_path = public
as $$
  select id from public.tenants
  where is_active = true
    and (primary_domain = hostname or hostname = any(alt_domains))
  limit 1
$$;

-- RLS

alter table public.tenants enable row level security;
alter table public.pages enable row level security;
alter table public.page_sections enable row level security;

create policy "tenants_public_read"
  on public.tenants
  for select
  to anon, authenticated
  using (is_active = true);

create policy "pages_public_read"
  on public.pages
  for select
  to anon, authenticated
  using (is_published = true);

create policy "page_sections_public_read"
  on public.page_sections
  for select
  to anon, authenticated
  using (
    enabled = true
    and exists (
      select 1 from public.pages p
      where p.id = page_sections.page_id
        and p.is_published = true
    )
  );

-- service_role bypasses RLS; writes go through the backend with the secret key.
