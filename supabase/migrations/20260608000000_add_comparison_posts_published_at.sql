-- Add published_at column to track the explicit publication date
-- separate from created_at (when the row was created)

alter table public.comparison_posts add column published_at date;
