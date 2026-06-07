-- Global "tools" library. UNLIKE other content types this table is NOT
-- tenant-scoped: rows are researched + written by an external automation
-- (n8n) via the service_role key. The website only READS published rows.
-- Field names are a fixed contract with the automation; do not rename them.

create table public.tools (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  -- dedup / upsert key: lowercased name, non-alphanumerics collapsed to "-",
  -- leading/trailing dashes trimmed. STORED generated column + UNIQUE.
  slug text generated always as (
    trim(both '-' from regexp_replace(lower(name), '[^a-z0-9]+', '-', 'g'))
  ) stored,
  website_url text,
  logo_url text,
  best_for text,
  summary text,        -- short one-liner (filled now)
  description text,    -- longer paragraph (filled later)
  pros jsonb not null default '[]',
  cons jsonb not null default '[]',
  category text,           -- research topic / category slug
  research_topic text,     -- exact topic that surfaced the tool
  tags text[] not null default '{}',
  source text not null default 'deep_research',
  status text not null default 'draft',   -- 'draft' | 'published'
  metadata jsonb not null default '{}',   -- catch-all for future fields
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint tools_slug_unique unique (slug)
);

create index tools_status_idx on public.tools (status);
create index tools_category_idx on public.tools (category);

create trigger tools_set_updated_at
  before update on public.tools
  for each row execute function public.set_updated_at();

-- RLS: public (anon) may read ONLY published rows. No insert/update/delete
-- policies — all writes come from the automation using the service_role key,
-- which bypasses RLS.
alter table public.tools enable row level security;

create policy "tools_public_read_published"
  on public.tools
  for select
  to anon
  using (status = 'published');
