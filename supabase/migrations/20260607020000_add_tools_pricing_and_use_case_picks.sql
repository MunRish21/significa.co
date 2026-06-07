-- Add per-tool pricing to public.tools, and a use-case matrix to
-- public.comparison_posts (for the "best for X use case" picks section).

alter table public.tools add column if not exists pricing text;

alter table public.comparison_posts
  add column if not exists use_case_picks jsonb not null default '[]'::jsonb;
