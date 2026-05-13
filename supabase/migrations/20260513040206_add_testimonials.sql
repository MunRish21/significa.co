-- Per-tenant testimonials. member_slug is a soft FK to team_members.slug
-- within the same tenant — kept as text so a member rename does not require
-- cascading updates here.

create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  external_id text not null,
  quote text not null,
  author text not null,
  author_role text,
  author_avatar text,
  rating int check (rating between 1 and 5),
  source text not null check (source in ('Upwork','LinkedIn','Direct','Email')),
  source_url text,
  member_slug text,
  project_slug text,
  project_title text,
  services text[] not null default '{}',
  occurred_at text,
  tags text[] not null default '{}',
  featured boolean not null default false,
  position int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tenant_id, external_id)
);

create index testimonials_tenant_featured_idx on public.testimonials (tenant_id, featured);
create index testimonials_member_idx on public.testimonials (tenant_id, member_slug);
create index testimonials_services_idx on public.testimonials using gin (services);

create trigger testimonials_set_updated_at
  before update on public.testimonials
  for each row execute function public.set_updated_at();

alter table public.testimonials enable row level security;

create policy "testimonials_public_read"
  on public.testimonials
  for select
  to anon, authenticated
  using (true);

-- Seed
do $$
declare
  v_techyor uuid;
  v_rishab  uuid;
  v_munish  uuid;
  v_rishab_tests jsonb;
  v_munish_tests jsonb;
  v_all_tests jsonb;
  t jsonb;
begin
  select id into v_techyor from public.tenants where slug = 'techyor';
  select id into v_rishab  from public.tenants where slug = 'rishab';
  select id into v_munish  from public.tenants where slug = 'munish';

  v_rishab_tests := jsonb_build_array(
    jsonb_build_object(
      'external_id','rishab-llm-2025-04',
      'quote','Great freelancer — proactive, thinks outside the box, and responds quickly. I hired them for the second time and will definitely hire again for future projects. Thanks!!',
      'author','Repeat Client',
      'source','Upwork','rating',5,
      'member_slug','rishab-singla',
      'project_title','LLM Setup for Content Creators on Google Colab',
      'occurred_at','April 2025',
      'services', jsonb_build_array('AI & Machine Learning','Python Backend Engineering'),
      'tags', jsonb_build_array('Reliable','Clear Communicator','Solution Oriented'),
      'featured', true
    ),
    jsonb_build_object(
      'external_id','rishab-nodejs-2024-08',
      'quote','Great member of a team. Very honest, great communicator, and provides great work. Highly recommend working with Rishab!',
      'author','Verified Client',
      'source','Upwork','rating',5,
      'member_slug','rishab-singla',
      'project_title','Node.JS Developer — Google Chrome Extensions, Firebase, GitHub',
      'occurred_at','August 2024',
      'services', jsonb_build_array('Backend Engineering','React & Next.js Development'),
      'tags', jsonb_build_array('Collaborative','Clear Communicator','Committed to Quality'),
      'featured', true
    ),
    jsonb_build_object(
      'external_id','rishab-wp-2024-07',
      'quote','Great work by Rishab, delivered on time and exceeded expectations.',
      'author','Verified Client',
      'source','Upwork','rating',5,
      'member_slug','rishab-singla',
      'project_title','WordPress Theme Redesign Specialist',
      'occurred_at','July 2024',
      'services', jsonb_build_array('Web Development & Design'),
      'tags', jsonb_build_array('Reliable','Committed to Quality'),
      'featured', false
    )
  );

  v_munish_tests := jsonb_build_array(
    jsonb_build_object(
      'external_id','munish-shopify-vue-2023-10',
      'quote',E'I\'m thrilled to share my strong recommendation for Munish. He\'s an outstanding freelancer who handled my Shopify, WordPress, and Vue JS projects with expertise. Munish\'s adaptability, problem-solving skills, and exceptional communication were evident throughout our collaboration. Munish consistently delivered high-quality work, always meeting deadlines and maintaining error-free results. In summary, Munish is a top-tier choice for web development projects. His technical skills, adaptability, and dedication to quality make him an invaluable partner.',
      'author','Riche D.',
      'source','Upwork','rating',5,
      'member_slug','munish-k',
      'project_title','Long-term Shopify, WordPress & Vue.js engagement',
      'occurred_at','October 2023',
      'services', jsonb_build_array('E-commerce','Web Development & Design','React & Next.js Development'),
      'tags', jsonb_build_array('Committed to Quality','Reliable','Clear Communicator'),
      'featured', true
    ),
    jsonb_build_object(
      'external_id','munish-react-ecom-2025-05',
      'quote','Munish is a great React developer. He did an excellent job on our e-commerce website. He understands the work very well, writes clean code, and always looks for the best solution.',
      'author','Verified Client',
      'source','Upwork','rating',5,
      'member_slug','munish-k',
      'project_title','React E-commerce Development',
      'occurred_at','May 2025',
      'services', jsonb_build_array('React & Next.js Development','E-commerce'),
      'tags', jsonb_build_array('Clear Communicator','Committed to Quality','Detail Oriented','Professional','Reliable','Solution Oriented'),
      'featured', true
    ),
    jsonb_build_object(
      'external_id','munish-perfex-2025-05',
      'quote',E'Munish is an asset to anybody needing high-quality and correctly coded development. He’s a pleasure to work with and he’s always available and communication is very high. Thank you!',
      'author','Verified Client',
      'source','Upwork','rating',5,
      'member_slug','munish-k',
      'project_title','Perfex CRM Server Setup and Installation',
      'occurred_at','May 2025',
      'services', jsonb_build_array('Backend Engineering','Web Development & Design'),
      'tags', jsonb_build_array('Committed to Quality','Collaborative','Clear Communicator','Reliable'),
      'featured', false
    ),
    jsonb_build_object(
      'external_id','munish-shopify-rebate-2025-05',
      'quote','Munish was exceptional with the work. He straight away understood the project and completed before time. He also went a bit extra and helped me rectify the system.',
      'author','Verified Client',
      'source','Upwork','rating',5,
      'member_slug','munish-k',
      'project_title','Shopify Rebate Forms Implementation & Cart Processing',
      'occurred_at','May 2025',
      'services', jsonb_build_array('E-commerce'),
      'tags', jsonb_build_array('Committed to Quality','Clear Communicator','Reliable','Solution Oriented'),
      'featured', false
    ),
    jsonb_build_object(
      'external_id','munish-booking-app-2025-04',
      'quote','Extremely skilled and amazingly talented! He put our workflow together in just a few hours that would have taken someone else days. I would HIGHLY recommend him to anyone.',
      'author','Verified Client',
      'source','Upwork','rating',5,
      'member_slug','munish-k',
      'project_title','Booking App Developer',
      'occurred_at','April 2025',
      'services', jsonb_build_array('Web Development & Design','React & Next.js Development'),
      'tags', jsonb_build_array('Committed to Quality'),
      'featured', true
    ),
    jsonb_build_object(
      'external_id','munish-react-ecom-storefront-2024-03',
      'quote',E'Munish\'s job performance in creating our React e-commerce storefront was impressive. Taking our designs and working under a challenging deadline, Munish demonstrated exceptional skill and dedication. Not only did he deliver on time, the codebase was clean and easy to extend.',
      'author','Verified Client',
      'source','Upwork','rating',5,
      'member_slug','munish-k',
      'project_title','React E-commerce Website Front-End Development',
      'occurred_at','March 2024',
      'services', jsonb_build_array('React & Next.js Development','E-commerce'),
      'tags', jsonb_build_array('Committed to Quality','Reliable'),
      'featured', false
    ),
    jsonb_build_object(
      'external_id','munish-shopify-storefront-2024-02',
      'quote','Munish did an outstanding job turning our designs into a Shopify storefront. His speed and responsiveness were impressive throughout the entire process. Munish was able to bring our vision to life.',
      'author','Verified Client',
      'source','Upwork','rating',5,
      'member_slug','munish-k',
      'project_title','Shopify Storefront Developer',
      'occurred_at','February 2024',
      'services', jsonb_build_array('E-commerce','UX & UI Design'),
      'tags', jsonb_build_array('Committed to Quality','Reliable'),
      'featured', true
    )
  );

  v_all_tests := v_rishab_tests || v_munish_tests;

  -- techyor gets all
  for t in select * from jsonb_array_elements(v_all_tests) loop
    insert into public.testimonials (
      tenant_id, external_id, quote, author, source, rating,
      member_slug, project_title, occurred_at, services, tags, featured
    ) values (
      v_techyor,
      t->>'external_id',
      t->>'quote',
      t->>'author',
      t->>'source',
      (t->>'rating')::int,
      t->>'member_slug',
      t->>'project_title',
      t->>'occurred_at',
      array(select jsonb_array_elements_text(t->'services')),
      array(select jsonb_array_elements_text(t->'tags')),
      coalesce((t->>'featured')::boolean, false)
    )
    on conflict (tenant_id, external_id) do nothing;
  end loop;

  -- rishab gets only rishab's testimonials
  for t in select * from jsonb_array_elements(v_rishab_tests) loop
    insert into public.testimonials (
      tenant_id, external_id, quote, author, source, rating,
      member_slug, project_title, occurred_at, services, tags, featured
    ) values (
      v_rishab,
      t->>'external_id',
      t->>'quote',
      t->>'author',
      t->>'source',
      (t->>'rating')::int,
      t->>'member_slug',
      t->>'project_title',
      t->>'occurred_at',
      array(select jsonb_array_elements_text(t->'services')),
      array(select jsonb_array_elements_text(t->'tags')),
      coalesce((t->>'featured')::boolean, false)
    )
    on conflict (tenant_id, external_id) do nothing;
  end loop;

  -- munish gets only munish's testimonials
  for t in select * from jsonb_array_elements(v_munish_tests) loop
    insert into public.testimonials (
      tenant_id, external_id, quote, author, source, rating,
      member_slug, project_title, occurred_at, services, tags, featured
    ) values (
      v_munish,
      t->>'external_id',
      t->>'quote',
      t->>'author',
      t->>'source',
      (t->>'rating')::int,
      t->>'member_slug',
      t->>'project_title',
      t->>'occurred_at',
      array(select jsonb_array_elements_text(t->'services')),
      array(select jsonb_array_elements_text(t->'tags')),
      coalesce((t->>'featured')::boolean, false)
    )
    on conflict (tenant_id, external_id) do nothing;
  end loop;
end $$;
