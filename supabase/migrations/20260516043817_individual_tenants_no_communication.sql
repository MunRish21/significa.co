-- Individual-profile tenants (rishab, munish) are personal sites, not the
-- agency. They should NOT expose any communication surface: no /contact or
-- /get-a-quote page, no location, no Upwork/LinkedIn/GitHub links, no
-- agency-wide CTAs in chrome.
--
-- The agency tenant (techyor) keeps everything.
--
-- This migration is the source of truth for that distinction:
--   1. tenants.meta.isAgency boolean flag drives all conditional rendering
--      (footer columns, header CTA, profile CTAs, contact-cta block).
--   2. Drops the contact + get-a-quote page rows for non-agency tenants
--      (page_sections cascade via the FK).
--   3. Clears location + links + tenants.social / tenants.contact for the
--      non-agency tenants so any code that reads them gets empty values.

set search_path = public;

-- 1. isAgency flag

update public.tenants
set meta = meta || jsonb_build_object('isAgency', true)
where slug = 'techyor';

update public.tenants
set meta = meta || jsonb_build_object('isAgency', false)
where slug in ('rishab', 'munish');

-- 2. Drop contact + get-a-quote pages for non-agency tenants.
--    page_sections cascades on pages.id.

delete from public.pages
where slug in ('contact', 'get-a-quote')
  and tenant_id in (
    select id from public.tenants where slug in ('rishab', 'munish')
  );

-- 3. Strip communication surface from non-agency tenant rows.

update public.tenants
set social = '{}'::jsonb,
    contact = '{}'::jsonb
where slug in ('rishab', 'munish');

-- 4. Strip location + links from non-agency team_members.

update public.team_members
set location = null,
    links = '[]'::jsonb
where tenant_id in (
  select id from public.tenants where slug in ('rishab', 'munish')
);
