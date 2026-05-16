-- Set per-tenant brand.logo paths for the individual-profile tenants.
-- Files are committed under static/assets/tenants/ so SvelteKit serves them
-- at the rooted paths below.

set search_path = public;

update public.tenants
set brand = brand || jsonb_build_object('logo', '/assets/tenants/rishab-logo.png')
where slug = 'rishab';

update public.tenants
set brand = brand || jsonb_build_object('logo', '/assets/tenants/munish-logo.png')
where slug = 'munish';
