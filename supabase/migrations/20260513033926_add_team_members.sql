-- Per-tenant team_members table.
--   techyor: both rishab-singla and munish-k
--   rishab : only rishab-singla
--   munish : only munish-k
-- (Each individual's site shows only their own profile.)

create table public.team_members (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  slug text not null,
  name text not null,
  short_name text,
  role text not null,
  tagline text,
  location text,
  avatar text,
  cover_image text,
  is_active boolean not null default true,
  bio text,
  long_bio text,
  years_experience int,
  hourly_rate text,
  badges text[] not null default '{}',
  skills text[] not null default '{}',
  primary_services text[] not null default '{}',
  featured_project_slugs text[] not null default '{}',
  stats jsonb not null default '{}'::jsonb,
  languages jsonb not null default '[]'::jsonb,
  education jsonb not null default '[]'::jsonb,
  employment jsonb not null default '[]'::jsonb,
  links jsonb not null default '[]'::jsonb,
  intro_video jsonb,
  seo jsonb not null default '{}'::jsonb,
  position int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tenant_id, slug)
);

create index team_members_tenant_active_idx on public.team_members (tenant_id, is_active, position);
create index team_members_primary_services_idx on public.team_members using gin (primary_services);

create trigger team_members_set_updated_at
  before update on public.team_members
  for each row execute function public.set_updated_at();

alter table public.team_members enable row level security;

create policy "team_members_public_read"
  on public.team_members
  for select
  to anon, authenticated
  using (is_active = true);

-- Seed
do $$
declare
  v_techyor uuid;
  v_rishab  uuid;
  v_munish  uuid;
  v_rishab_data jsonb;
  v_munish_data jsonb;
  v_tenant_id uuid;
  v_slug text;
begin
  select id into v_techyor from public.tenants where slug = 'techyor';
  select id into v_rishab  from public.tenants where slug = 'rishab';
  select id into v_munish  from public.tenants where slug = 'munish';

  v_rishab_data := jsonb_build_object(
    'slug', 'rishab-singla',
    'name', 'Rishab Singla',
    'short_name', 'Rishab S.',
    'role', 'Shopify & WooCommerce Developer',
    'tagline', 'Custom Apps, API Integrations & Full Stack Development',
    'location', 'Chandigarh, India',
    'avatar', '/assets/team/rishab-singla.jpg',
    'bio', 'I build and fix Shopify and WooCommerce stores. Slow stores, broken integrations, missing features — I handle all of it. PHP, Node.js, React, Next.js, Python. Whatever the problem is, I can ship the solution.',
    'long_bio', E'8 years building eCommerce. Shopify, WooCommerce, PrestaShop. I\'ve worked on stores with thousands of SKUs, multi-currency setups, headless storefronts, and AI product visualizations. I also build SaaS platforms, AI integrations, and Chrome extensions.\n\nStacks: PHP, Laravel, Node.js, React, Next.js, Python. Payment gateways, APIs, migrations, custom apps — I build it all end-to-end. Top Rated on Upwork, 100% job success.',
    'years_experience', 8,
    'hourly_rate', '$16/hr',
    'badges', jsonb_build_array('Top Rated on Upwork', '100% Job Success', 'ID Verified'),
    'skills', jsonb_build_array('Shopify','WooCommerce','PrestaShop','PHP','Laravel','CodeIgniter','Node.js','Next.js','React','Python','WordPress','JavaScript','TypeScript','Web Design','CMS Development','Website & CMS Bug Fix','UI/UX Prototyping','Visual Communication','Webflow','Framer','Artificial Intelligence','LLM Prompt Engineering','Google Chrome Extensions','Firebase','API Integrations'),
    'primary_services', jsonb_build_array('E-commerce','Web Development & Design','React & Next.js Development','Python Backend Engineering','AI & Machine Learning','SaaS Platforms','Backend Engineering','Voice AI Engineering'),
    'featured_project_slugs', jsonb_build_array('monster-fairings','b2-hookah','karen-lazar-design','indigenous-treats','simpletalk-ai','convertbankstatement','firmable','gisteo','navjot-kaur-pllc','allbirds'),
    'stats', jsonb_build_object('jobSuccess','100%','totalEarnings','$7K+','totalJobs',9,'totalHours',353),
    'languages', jsonb_build_array(jsonb_build_object('name','English','level','Fluent')),
    'education', jsonb_build_array(jsonb_build_object(
      'school','Giani Zail Singh Campus College of Engineering & Technology',
      'degree','Bachelor of Technology (BTech)',
      'field','Computer Science',
      'years','2014 – 2018'
    )),
    'employment', jsonb_build_array(jsonb_build_object(
      'title','Full Stack Developer',
      'company','Freelancer',
      'period','January 2017 – Present',
      'description','Shopify, WooCommerce, and custom full-stack builds for clients across the UK, Australia, and Europe. Specializing in eCommerce, APIs, and SaaS platforms. PHP, Node.js, React, Python.'
    )),
    'links', jsonb_build_array(
      jsonb_build_object('label','Upwork','url','https://www.upwork.com/freelancers/~0147df006e8175ba30','icon','upwork'),
      jsonb_build_object('label','LinkedIn','url','https://www.linkedin.com/in/rishab-singla03/','icon','linkedin'),
      jsonb_build_object('label','GitHub','url','https://github.com/MunRish21','icon','github')
    ),
    'seo', jsonb_build_object(
      'title','Rishab Singla — Shopify & WooCommerce Developer | Top Rated on Upwork',
      'description','Hire Rishab Singla — Top Rated Shopify & WooCommerce developer with 8+ years of full stack experience in PHP, React, Next.js, Python, and AI integrations. 100% Job Success on Upwork.',
      'keywords', jsonb_build_array('hire Shopify developer','hire WooCommerce developer','hire React developer','hire Next.js developer','full stack developer India','eCommerce developer Chandigarh','Top Rated Upwork developer')
    )
  );

  v_munish_data := jsonb_build_object(
    'slug', 'munish-k',
    'name', 'Munish K.',
    'short_name', 'Munish K.',
    'role', 'Senior Web Developer',
    'tagline', 'WordPress, Shopify, Webflow, React & API Integration',
    'location', 'Mohali, India',
    'avatar', '/assets/team/munish-k.jpg',
    'bio', 'I build WordPress, WooCommerce, and Shopify sites. Also React, Next.js, Webflow, Framer. Whatever the platform, I can take it from design to production and keep it fast.',
    'long_bio', E'8 years building web applications and stores. WordPress, WooCommerce, Shopify, Webflow, Framer, React, Next.js, Vue.js. Custom themes, headless storefronts, Figma-to-code builds, React e-commerce frontends.\n\nI handle the whole stack: design hand-off to production, payment gateways, API integrations, CMS migrations. High-traffic sites stay fast and reliable. Top Rated on Upwork, 100% job success, $50K+ earned across 87+ projects.',
    'years_experience', 8,
    'hourly_rate', '$16/hr',
    'badges', jsonb_build_array('Top Rated on Upwork','100% Job Success','ID Verified','Military Veteran'),
    'skills', jsonb_build_array('WordPress','WooCommerce','Shopify','Webflow','Framer','Figma','GitHub','Next.js','Node.js','React','React Native','Vue.js','NodeJS Framework','MongoDB','Wix','Squarespace','CSS','HTML','JavaScript','Payment Gateway Integration','Web Design','Web Development'),
    'primary_services', jsonb_build_array('Web Development & Design','E-commerce','React & Next.js Development','UX & UI Design','Backend Engineering','SaaS Platforms','Design & Creative'),
    'featured_project_slugs', jsonb_build_array('karen-lazar-design','oona-home','taste-hub','salty-donut','lynn-milo-pilates','mirai-homes','christmas-loft','beauty-products-framer','rayna-site','evolve-clothing-gallery'),
    'stats', jsonb_build_object('jobSuccess','100%','totalEarnings','$50K+','totalJobs',87,'totalHours',1854),
    'languages', jsonb_build_array(jsonb_build_object('name','English','level','Fluent')),
    'education', jsonb_build_array(jsonb_build_object(
      'school','Panjab University',
      'degree','Master of Computer Applications (MCA)',
      'field','Computer Applications',
      'years','2013 – 2016'
    )),
    'employment', jsonb_build_array(
      jsonb_build_object(
        'title','PHP Web Developer',
        'company','Self-employed',
        'period','January 2017 – Present',
        'description','WordPress, Shopify, Webflow, Framer, React projects. Custom themes, headless storefronts, payment integrations, Figma-to-code builds. Clients across the US, UK, EU, and Australia.'
      ),
      jsonb_build_object(
        'title','Web Developer',
        'period','2015 – 2017',
        'description','Maintained content sites. Transitioned to full-time freelancing in 2017.'
      )
    ),
    'links', jsonb_build_array(
      jsonb_build_object('label','Upwork','url','https://www.upwork.com/freelancers/~0122a9e10b8fd61548','icon','upwork')
    ),
    'intro_video', jsonb_build_object(
      'url','https://www.youtube-nocookie.com/embed/g3lDsAXxZG8?enablejsapi=1&fs=1',
      'title','Why Choose Me — Munish K.'
    ),
    'seo', jsonb_build_object(
      'title','Munish K. — Senior WordPress, Shopify & Webflow Developer | Top Rated on Upwork',
      'description','Hire Munish K. — Top Rated senior web developer with 8+ years building WordPress, Shopify, Webflow, Framer, React, and Next.js projects. $50K+ earned, 87+ jobs, 100% Job Success on Upwork.',
      'keywords', jsonb_build_array('hire WordPress developer','hire Shopify developer','hire Webflow developer','hire Framer developer','hire React developer','hire Next.js developer','Figma to Webflow developer','Figma to Framer developer','senior web developer India','Top Rated Upwork developer')
    )
  );

  -- techyor gets both members at positions 10 and 20
  insert into public.team_members (
    tenant_id, slug, name, short_name, role, tagline, location, avatar,
    bio, long_bio, years_experience, hourly_rate, badges, skills,
    primary_services, featured_project_slugs, stats, languages, education,
    employment, links, intro_video, seo, position
  )
  select v_techyor,
         d->>'slug', d->>'name', d->>'short_name', d->>'role', d->>'tagline',
         d->>'location', d->>'avatar',
         d->>'bio', d->>'long_bio',
         (d->>'years_experience')::int, d->>'hourly_rate',
         array(select jsonb_array_elements_text(d->'badges')),
         array(select jsonb_array_elements_text(d->'skills')),
         array(select jsonb_array_elements_text(d->'primary_services')),
         array(select jsonb_array_elements_text(d->'featured_project_slugs')),
         d->'stats', d->'languages', d->'education',
         d->'employment', d->'links', d->'intro_video', d->'seo',
         pos
  from (values (v_rishab_data, 10), (v_munish_data, 20)) as t(d, pos)
  on conflict (tenant_id, slug) do nothing;

  -- rishab tenant gets only rishab profile
  insert into public.team_members (
    tenant_id, slug, name, short_name, role, tagline, location, avatar,
    bio, long_bio, years_experience, hourly_rate, badges, skills,
    primary_services, featured_project_slugs, stats, languages, education,
    employment, links, intro_video, seo, position
  )
  select v_rishab,
         v_rishab_data->>'slug', v_rishab_data->>'name', v_rishab_data->>'short_name',
         v_rishab_data->>'role', v_rishab_data->>'tagline',
         v_rishab_data->>'location', v_rishab_data->>'avatar',
         v_rishab_data->>'bio', v_rishab_data->>'long_bio',
         (v_rishab_data->>'years_experience')::int, v_rishab_data->>'hourly_rate',
         array(select jsonb_array_elements_text(v_rishab_data->'badges')),
         array(select jsonb_array_elements_text(v_rishab_data->'skills')),
         array(select jsonb_array_elements_text(v_rishab_data->'primary_services')),
         array(select jsonb_array_elements_text(v_rishab_data->'featured_project_slugs')),
         v_rishab_data->'stats', v_rishab_data->'languages', v_rishab_data->'education',
         v_rishab_data->'employment', v_rishab_data->'links',
         v_rishab_data->'intro_video', v_rishab_data->'seo',
         10
  on conflict (tenant_id, slug) do nothing;

  -- munish tenant gets only munish profile
  insert into public.team_members (
    tenant_id, slug, name, short_name, role, tagline, location, avatar,
    bio, long_bio, years_experience, hourly_rate, badges, skills,
    primary_services, featured_project_slugs, stats, languages, education,
    employment, links, intro_video, seo, position
  )
  select v_munish,
         v_munish_data->>'slug', v_munish_data->>'name', v_munish_data->>'short_name',
         v_munish_data->>'role', v_munish_data->>'tagline',
         v_munish_data->>'location', v_munish_data->>'avatar',
         v_munish_data->>'bio', v_munish_data->>'long_bio',
         (v_munish_data->>'years_experience')::int, v_munish_data->>'hourly_rate',
         array(select jsonb_array_elements_text(v_munish_data->'badges')),
         array(select jsonb_array_elements_text(v_munish_data->'skills')),
         array(select jsonb_array_elements_text(v_munish_data->'primary_services')),
         array(select jsonb_array_elements_text(v_munish_data->'featured_project_slugs')),
         v_munish_data->'stats', v_munish_data->'languages', v_munish_data->'education',
         v_munish_data->'employment', v_munish_data->'links',
         v_munish_data->'intro_video', v_munish_data->'seo',
         10
  on conflict (tenant_id, slug) do nothing;
end $$;
