-- The techyor seed pointed tenants.brand.logo at /logo.svg, which has never
-- existed in static/. Pre-whitelabel that didn't matter because the chrome
-- ignored the DB field. After the per-tenant logo work, both top-navigation
-- and footer read tenants.brand.logo first, so techyor was loading a 404.
-- Repoint to the real file that ships in static/.

set search_path = public;

update public.tenants
set brand = brand || jsonb_build_object('logo', '/techyor.png')
where slug = 'techyor';
