-- Dedicated table for "comparison" article posts (e.g. "The Best X in 2026").
-- Named for this specific post type so future article formats (roundups,
-- how-tos, etc.) get their own dedicated tables rather than a shared
-- jsonb-everything "posts" table.
--
-- Global (non-tenant) content, written by an external automation via the
-- service_role key (same model as public.tools). The site only reads
-- published rows. The comparison "table" itself is just an ordered list of
-- public.tools IDs — the frontend joins to public.tools at render time so
-- tool data (name, best_for, logo, link) is never duplicated here.

create table public.comparison_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique,        -- page URL, derived from topic/title
  title text,              -- "The Best [Topic] in 2026"
  topic text,

  -- one column per AI-written section:
  introduction text,       -- write_introduction
  ranking_criteria text,   -- (next)
  verdict text,            -- (next)
  faq jsonb not null default '[]',  -- [{question, answer}]

  -- comparison table = ordered tool IDs; frontend joins to public.tools
  comparison_tool_ids jsonb not null default '[]',

  -- SEO head
  meta_title text,
  meta_description text,

  status text not null default 'draft',  -- 'draft' | 'published'
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index comparison_posts_status_idx on public.comparison_posts (status);

create trigger comparison_posts_set_updated_at
  before update on public.comparison_posts
  for each row execute function public.set_updated_at();

alter table public.comparison_posts enable row level security;

create policy "public read published comparison_posts"
  on public.comparison_posts for select to anon
  using (status = 'published');
