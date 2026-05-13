-- Per-tenant taxonomy of services + deliverables. Drives /projects/<slug>
-- filter pages and is referenced by team_members.primary_services and
-- projects.services / projects.deliverables (text arrays).

create table public.service_descriptions (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  kind text not null check (kind in ('service','deliverable')),
  slug text not null,
  name text not null,
  description text not null,
  position int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tenant_id, kind, slug)
);

create index service_descriptions_tenant_kind_idx on public.service_descriptions (tenant_id, kind, position);

create trigger service_descriptions_set_updated_at
  before update on public.service_descriptions
  for each row execute function public.set_updated_at();

alter table public.service_descriptions enable row level security;

create policy "service_descriptions_public_read"
  on public.service_descriptions
  for select
  to anon, authenticated
  using (is_active = true);

-- Slugify helper mirrors the JS version in /projects/[slug]/+page.server.ts.
create or replace function public.slugify_service(name text)
returns text
language sql
immutable
as $$
  select regexp_replace(
           regexp_replace(
             regexp_replace(lower(name), '&', '', 'g'),
             '\s+', '-', 'g'
           ),
           '[^a-z0-9-]', '', 'g'
         )
$$;

-- Seed: same taxonomy for all tenants. The slug is derived from the name so
-- it stays in sync with the route filter logic.
do $$
declare
  v_tenant record;
  v_items constant jsonb := jsonb_build_array(
    jsonb_build_object('kind','service','name','AI & Machine Learning','description','We build AI systems. Chatbots, voice agents, RAG pipelines, fine-tuned models for specific domains. If you have data and a problem, we can build a model for it. Predictive analytics, document processing, computer vision — we have done it all.'),
    jsonb_build_object('kind','service','name','Backend Engineering','description','Fast, reliable backend systems. APIs that do not break when traffic spikes. Databases that scale. We build systems you can trust. REST, GraphQL, real-time, async workers — whatever your product needs.'),
    jsonb_build_object('kind','service','name','Business Services','description','We solve business problems with software. Streamline your ops, improve your workflows, build new revenue streams. Technology is a means to an end, not the end itself. We start by understanding your actual problem.'),
    jsonb_build_object('kind','service','name','Design & Creative','description','Design that works. Interfaces people can use without frustration. Brands that people remember. We research, iterate, test with users. Accessible by default. Beautiful as a side effect.'),
    jsonb_build_object('kind','service','name','Education & Training','description','Learning platforms and tools that actually teach. LMS software, interactive courses, skill tracking. We know what works for retention: testing, spacing, feedback. Built for real learning, not just checking boxes.'),
    jsonb_build_object('kind','service','name','E-commerce','description','Online stores that convert. Shopify, custom builds, whatever fits your scale. Multi-currency, international shipping, subscription handling. We have shipped stores that actually make money.'),
    jsonb_build_object('kind','service','name','Financial Services','description','Fintech built right. Payment systems, trading platforms, banking software. Compliance is non-negotiable. PCI, SOC 2, regulatory audits — we know the constraints.'),
    jsonb_build_object('kind','service','name','Food & Beverage','description','Systems for restaurants, delivery, specialty food brands. Inventory management, kitchen screens, ordering. We understand F&B logistics and margins.'),
    jsonb_build_object('kind','service','name','Health & Wellness','description','Healthcare software that respects privacy. Telemedicine, patient portals, health records. HIPAA built in from day one. Patient data stays secure.'),
    jsonb_build_object('kind','service','name','Mobile App Development','description','iOS and Android apps. Native when it matters, cross-platform when it makes sense. App Store launches, over-the-air updates, real device testing. Built to ship.'),
    jsonb_build_object('kind','service','name','Python Backend Engineering','description','Fast backends with Python. Django, FastAPI, async workers. Data pipelines, APIs, real-time systems. Python gets us to production quickly without sacrificing performance.'),
    jsonb_build_object('kind','service','name','React & Next.js Development','description','React interfaces and Next.js apps. Performance, accessibility, fast page loads. Core Web Vitals that matter. From dashboards to marketing sites with ecommerce.'),
    jsonb_build_object('kind','service','name','Real Estate & Property','description','Property listing sites, landlord portals, rental management. Virtual tours, analytics, tenant communication. Built for the people who use it.'),
    jsonb_build_object('kind','service','name','SaaS Platforms','description','Multi-tenant SaaS products. Built to grow. Subscription billing, usage metering, API access. Product-first approach — we build things people want to use.'),
    jsonb_build_object('kind','service','name','Voice AI Engineering','description','Voice systems that actually work. Chatbots, IVR replacement, hands-free interfaces. Understanding context, handling interruptions, sounding human.'),
    jsonb_build_object('kind','service','name','Web Development & Design','description','Full-stack web work. Strategy, design, frontend, backend, DevOps. From landing pages to complex web apps. Performance and conversion are the metrics that matter.'),
    jsonb_build_object('kind','service','name','UX & UI Design','description','User research, interaction design, visual design. Interfaces people can actually use. Accessibility from day one. Iterative testing with real users.'),
    jsonb_build_object('kind','deliverable','name','Website','description','Websites that work. Fast, mobile-friendly, accessible. Built to your brand, optimized to convert. From simple marketing sites to complex interactive experiences.'),
    jsonb_build_object('kind','deliverable','name','E-Commerce Platforms','description','Online stores built to sell. Inventory, pricing, payment processing, shipping. Multi-currency and international support if you need it. Grows with your business.'),
    jsonb_build_object('kind','deliverable','name','Web Applications','description','Complex web apps. Dashboards, project tools, collaboration software. Real-time data, external integrations, performance at scale.'),
    jsonb_build_object('kind','deliverable','name','Mobile Applications','description','iOS and Android apps. Built natively for the platform. App Store ready. Users actually download and use them.'),
    jsonb_build_object('kind','deliverable','name','Subscription Platforms','description','SaaS products with subscription billing. Infrastructure, payment handling, retention analytics. But really, a good product that users keep paying for.'),
    jsonb_build_object('kind','deliverable','name','APIs & Backend Services','description','APIs that developers like using. Good documentation, clean design, stable. REST, GraphQL, websockets. Powers your apps and integrations.'),
    jsonb_build_object('kind','deliverable','name','Design & Branding','description','Brand identity and design systems. Logo, color, typography, guidelines. Consistency across products and touchpoints. Brands that stick.'),
    jsonb_build_object('kind','deliverable','name','Content Management Systems','description','CMS software. Write and publish without code. Fits your workflow. WordPress, custom builds, or headless CMS — whatever makes sense.'),
    jsonb_build_object('kind','deliverable','name','Business Management Platforms','description','Software tailored to how your business actually works. Not off-the-shelf bloatware. Your workflows, automated. Reporting and visibility that matters.')
  );
  v_item jsonb;
  v_pos int;
begin
  for v_tenant in select id from public.tenants loop
    v_pos := 10;
    for v_item in select * from jsonb_array_elements(v_items) loop
      insert into public.service_descriptions (tenant_id, kind, slug, name, description, position)
      values (
        v_tenant.id,
        v_item->>'kind',
        public.slugify_service(v_item->>'name'),
        v_item->>'name',
        v_item->>'description',
        v_pos
      )
      on conflict (tenant_id, kind, slug) do update
        set name = excluded.name,
            description = excluded.description,
            position = excluded.position;
      v_pos := v_pos + 10;
    end loop;
  end loop;
end $$;
