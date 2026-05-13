-- Per-tenant clients table for the "Clients we've worked with" logo strip.

create table public.clients (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  slug text not null,
  name text not null,
  light_logo text,
  dark_logo text,
  width int,
  height int,
  url text,
  position int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tenant_id, slug)
);

create index clients_tenant_active_idx on public.clients (tenant_id, is_active, position);

create trigger clients_set_updated_at
  before update on public.clients
  for each row execute function public.set_updated_at();

alter table public.clients enable row level security;

create policy "clients_public_read"
  on public.clients
  for select
  to anon, authenticated
  using (is_active = true);

-- Seed techyor clients. rishab/munish start empty; the ClientsSection
-- component skips render when the list is empty.
do $$
declare
  v_techyor uuid;
begin
  select id into v_techyor from public.tenants where slug = 'techyor';

  insert into public.clients (tenant_id, slug, name, light_logo, dark_logo, width, height, url, position)
  values
    (v_techyor, 'monsterfairings',    'MF',                '/assets/storyblok/mf-light.png',                  '/assets/storyblok/mf-dark.png',                  326,  84,  'https://monsterfairings.com',     10),
    (v_techyor, 'inspired-evolution', 'Inspired Evolution','/assets/storyblok/inspired-evolution-light.png',  '/assets/storyblok/inspired-evolution-dark.png',  1662, 520, 'https://inspiredevolution.co.za/',20),
    (v_techyor, 'codewiz',            'CodeWiz',           '/assets/storyblok/codewiz-light.png',             '/assets/storyblok/codewiz-dark.png',             1528, 520, 'https://codewiz.com',             30),
    (v_techyor, 'simpletalk',         'SimpleTalk',        '/assets/storyblok/simpletalk-light.png',          '/assets/storyblok/simpletalk-dark.png',          1980, 520, 'https://www.simpletalk.ai/',      40),
    (v_techyor, 'woolfi',             'Woolfi',            '/assets/storyblok/woolfi-light.png',              '/assets/storyblok/woolfi-dark.png',              928,  520, 'https://woolf.university/',       50),
    (v_techyor, 'oona',               'OONA',              '/assets/storyblok/oona-light.png',                '/assets/storyblok/oona-dark.png',                1055, 282, 'https://oona-home.ch/',           60)
  on conflict (tenant_id, slug) do update
    set name = excluded.name,
        light_logo = excluded.light_logo,
        dark_logo = excluded.dark_logo,
        width = excluded.width,
        height = excluded.height,
        url = excluded.url,
        position = excluded.position;
end $$;
