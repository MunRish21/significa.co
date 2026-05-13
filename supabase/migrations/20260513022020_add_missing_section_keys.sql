-- Add section_key rows that the SvelteKit pages reference but the initial
-- seed did not include. Applied to every tenant so any tenant can toggle
-- any section.
--
-- Sections added per page:
--   about        : who-we-are
--   services     : deliverables
--   contact      : gallery
--   careers      : hero, culture, image-slider, benefits, gallery
--   get-a-quote  : steps, team, slideshow, faqs
--   projects     : header, team
--   blog         : header

do $$
declare
  v_tenant record;
  v_page_id uuid;

  -- (page_slug, section_key, section_type, position) tuples to upsert.
  v_sections constant text[][] := array[
    array['about',       'who-we-are',     'rich-text',         '15'],
    array['services',    'deliverables',   'list',              '25'],
    array['contact',     'gallery',        'gallery',           '20'],
    array['careers',     'hero',           'hero',              '5'],
    array['careers',     'culture',        'culture-section',   '15'],
    array['careers',     'image-slider',   'image-slider',      '20'],
    array['careers',     'benefits',       'benefits-section',  '25'],
    array['careers',     'gallery',        'gallery',           '30'],
    array['get-a-quote', 'steps',          'steps',             '20'],
    array['get-a-quote', 'team',           'team-section',      '30'],
    array['get-a-quote', 'slideshow',      'slideshow',         '40'],
    array['get-a-quote', 'faqs',           'faqs-list',         '50'],
    array['projects',    'header',         'page-header',       '5'],
    array['projects',    'team',           'team-section',      '20'],
    array['blog',        'header',         'page-header',       '5']
  ];

  v_row text[];
begin
  for v_tenant in select id from public.tenants loop
    foreach v_row slice 1 in array v_sections
    loop
      select id into v_page_id
      from public.pages
      where tenant_id = v_tenant.id and slug = v_row[1];

      if v_page_id is not null then
        insert into public.page_sections
          (page_id, section_key, section_type, position, enabled, props)
        values
          (v_page_id, v_row[2], v_row[3], v_row[4]::int, true, '{}'::jsonb)
        on conflict (page_id, section_key) do nothing;
      end if;
    end loop;
  end loop;
end $$;
