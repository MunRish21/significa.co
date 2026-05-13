-- Add Rishab and Munish tenants. Both are dev/preview deployments so
-- robotsIndex is false (the marketing-site layout reads this and emits
-- `<meta name="robots" content="noindex,nofollow">`).
--
-- The /about route for each of these tenants resolves to that tenant's
-- team member profile via tenant.meta.aboutPageMemberSlug (handled in
-- the /about server load, not in this migration).
--
-- Pages + sections mirror techyor exactly, EXCEPT the about page which
-- is intentionally minimal — the SvelteKit route redirects before
-- rendering sections.

insert into public.tenants (slug, name, primary_domain, alt_domains, brand, social, contact, meta)
values
  (
    'rishab',
    'Rishab Singla',
    'rishab-ten.vercel.app',
    array['www.rishab-ten.vercel.app'],
    jsonb_build_object(
      'logo', null,
      'tagline', 'Independent product engineer'
    ),
    jsonb_build_object(),
    jsonb_build_object('email', null),
    jsonb_build_object(
      'robotsIndex', false,
      'aboutPageMemberSlug', 'rishab-singla',
      'defaultOgImage', '/api/og/home'
    )
  ),
  (
    'munish',
    'Munish K.',
    'munish-gamma.vercel.app',
    array['www.munish-gamma.vercel.app'],
    jsonb_build_object(
      'logo', null,
      'tagline', 'Independent product engineer'
    ),
    jsonb_build_object(),
    jsonb_build_object('email', null),
    jsonb_build_object(
      'robotsIndex', false,
      'aboutPageMemberSlug', 'munish-k',
      'defaultOgImage', '/api/og/home'
    )
  )
on conflict (slug) do update
  set name = excluded.name,
      primary_domain = excluded.primary_domain,
      alt_domains = excluded.alt_domains,
      brand = excluded.brand,
      meta = excluded.meta;

-- Helper: copy techyor's pages + sections to a target tenant, excluding
-- the about page (which is route-level redirected for these tenants).
do $$
declare
  v_techyor_id uuid;
  v_target_slug text;
  v_target_id uuid;
begin
  select id into v_techyor_id from public.tenants where slug = 'techyor';

  foreach v_target_slug in array array['rishab', 'munish']
  loop
    select id into v_target_id from public.tenants where slug = v_target_slug;

    -- Copy pages (skip about — the route handles substitution).
    insert into public.pages (tenant_id, slug, title, description, meta, is_published, published_at)
    select v_target_id,
           p.slug,
           p.title,
           p.description,
           p.meta,
           p.is_published,
           p.published_at
    from public.pages p
    where p.tenant_id = v_techyor_id
      and p.slug <> 'about'
    on conflict (tenant_id, slug) do nothing;

    -- Always insert a stub about page so it exists in the page index.
    -- The route redirects before any sections are read.
    insert into public.pages (tenant_id, slug, title, description, meta, is_published, published_at)
    values (
      v_target_id,
      'about',
      'About — ' || (select name from public.tenants where id = v_target_id),
      'About page redirects to the personal profile.',
      jsonb_build_object('redirectsToProfile', true),
      true,
      now()
    )
    on conflict (tenant_id, slug) do update
      set title = excluded.title,
          description = excluded.description,
          meta = excluded.meta;

    -- Copy page_sections for every page that exists in BOTH tenants
    -- and is not the about page.
    insert into public.page_sections (page_id, section_key, section_type, position, enabled, props)
    select tp.id,
           ps.section_key,
           ps.section_type,
           ps.position,
           ps.enabled,
           ps.props
    from public.page_sections ps
    join public.pages sp on sp.id = ps.page_id and sp.tenant_id = v_techyor_id
    join public.pages tp on tp.tenant_id = v_target_id and tp.slug = sp.slug
    where sp.slug <> 'about'
    on conflict (page_id, section_key) do nothing;
  end loop;
end $$;
