-- Non-agency tenants (rishab, munish) were seeded by copying Techyor's
-- pages rows verbatim, which baked Techyor's title/description/meta into
-- their DB rows. The Svelte pages read `dbPage?.title ?? fallback`, so
-- the DB value wins and the per-tenant fallback (home-content.ts +
-- brandName-driven page meta) never renders.
--
-- Null out title and description and strip ogTitle/ogDescription/
-- ogImage/keywords from page.meta for every page row owned by a
-- non-agency tenant. The Svelte components then use their per-tenant
-- defaults.

set search_path = public;

update public.pages
set title = null,
    description = null,
    meta = (meta - 'ogTitle' - 'ogDescription' - 'ogImage' - 'keywords')
where tenant_id in (
  select id from public.tenants where slug in ('rishab', 'munish')
);
