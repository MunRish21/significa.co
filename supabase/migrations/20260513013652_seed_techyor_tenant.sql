-- Seed the techyor.com tenant with pages + section layout.
-- Idempotent via ON CONFLICT, so re-running is safe.

insert into public.tenants (slug, name, primary_domain, alt_domains, brand, social, contact, meta)
values (
  'techyor',
  'Techyor',
  'techyor.com',
  array['www.techyor.com', 'techyor.dev', 'localhost'],
  jsonb_build_object(
    'logo', '/logo.svg',
    'twitterHandle', '@TechyorDotCo',
    'tagline', 'Digital product studio'
  ),
  jsonb_build_object(
    'twitter', 'https://twitter.com/TechyorDotCo',
    'linkedin', 'https://www.linkedin.com/company/techyor',
    'github', 'https://github.com/techyor'
  ),
  jsonb_build_object(
    'email', 'hello@techyor.com',
    'addresses', jsonb_build_array()
  ),
  jsonb_build_object(
    'defaultOgImage', '/api/og/home',
    'organizationDescription',
      'A digital product studio building custom websites, web apps, mobile apps, e-commerce stores, AI tools, and automation for teams in the US, UK, Switzerland, and Australia.'
  )
)
on conflict (slug) do update
  set name = excluded.name,
      primary_domain = excluded.primary_domain,
      alt_domains = excluded.alt_domains,
      brand = excluded.brand,
      social = excluded.social,
      contact = excluded.contact,
      meta = excluded.meta;

do $$
declare
  v_tenant_id uuid;
  v_home_id uuid;
  v_about_id uuid;
  v_services_id uuid;
  v_projects_id uuid;
  v_team_id uuid;
  v_blog_id uuid;
  v_contact_id uuid;
  v_careers_id uuid;
  v_quote_id uuid;
begin
  select id into v_tenant_id from public.tenants where slug = 'techyor';

  insert into public.pages (tenant_id, slug, title, description, meta, is_published, published_at) values
    (v_tenant_id, 'home',
     'Techyor — Web, App & AI Product Development Studio',
     'Techyor is a digital product studio building custom websites, web apps, mobile apps, e-commerce stores, AI tools, and automation for teams in the US, UK, Switzerland, and Australia. Strategy, design, development — under one roof.',
     jsonb_build_object(
       'keywords', 'digital product agency, web development, custom software development, mobile app development, AI development agency, e-commerce development, website design, automation',
       'ogTitle', 'Techyor — Web, App & AI Product Development Studio',
       'ogDescription', 'Strategy, design, and development under one roof. 8+ years. 80+ products shipped for teams across the US, UK, Switzerland, and Australia.',
       'ogImage', '/api/og/home',
       'twitterCard', 'summary_large_image'
     ),
     true, now()),
    (v_tenant_id, 'about',
     'About — Techyor',
     'Eight years building digital products for teams in the US, UK, Switzerland, and Australia. Meet the studio behind 80+ shipped projects.',
     '{}'::jsonb, true, now()),
    (v_tenant_id, 'services',
     'Services — Techyor',
     'Strategy, design, and development services. Websites, apps, e-commerce, AI tools, and automation — one team, no handoffs.',
     '{}'::jsonb, true, now()),
    (v_tenant_id, 'projects',
     'Projects — Techyor',
     'Selected case studies from 80+ products shipped over eight years.',
     '{}'::jsonb, true, now()),
    (v_tenant_id, 'team',
     'Team — Techyor',
     'Meet the people building products at Techyor. Hire a specialist directly.',
     '{}'::jsonb, true, now()),
    (v_tenant_id, 'blog',
     'Blog — Techyor',
     'Notes from the studio: how we build websites, apps, and AI tools.',
     '{}'::jsonb, true, now()),
    (v_tenant_id, 'contact',
     'Contact — Techyor',
     'Get in touch with the Techyor team.',
     '{}'::jsonb, true, now()),
    (v_tenant_id, 'careers',
     'Careers — Techyor',
     'Open roles at Techyor. Remote, flexible, and built around the work.',
     '{}'::jsonb, true, now()),
    (v_tenant_id, 'get-a-quote',
     'Get a Quote — Techyor',
     'Tell us what you want to build. We will get back to you with a price.',
     '{}'::jsonb, true, now())
  on conflict (tenant_id, slug) do update
    set title = excluded.title,
        description = excluded.description,
        meta = excluded.meta,
        is_published = excluded.is_published;

  select id into v_home_id     from public.pages where tenant_id = v_tenant_id and slug = 'home';
  select id into v_about_id    from public.pages where tenant_id = v_tenant_id and slug = 'about';
  select id into v_services_id from public.pages where tenant_id = v_tenant_id and slug = 'services';
  select id into v_projects_id from public.pages where tenant_id = v_tenant_id and slug = 'projects';
  select id into v_team_id     from public.pages where tenant_id = v_tenant_id and slug = 'team';
  select id into v_blog_id     from public.pages where tenant_id = v_tenant_id and slug = 'blog';
  select id into v_contact_id  from public.pages where tenant_id = v_tenant_id and slug = 'contact';
  select id into v_careers_id  from public.pages where tenant_id = v_tenant_id and slug = 'careers';
  select id into v_quote_id    from public.pages where tenant_id = v_tenant_id and slug = 'get-a-quote';

  insert into public.page_sections (page_id, section_key, section_type, position, enabled, props) values
    (v_home_id, 'hero', 'hero', 10, true, jsonb_build_object(
      'lines', jsonb_build_array('Think.', 'Design.', 'Build.', 'Then keep shipping.'),
      'mutedIndex', 3,
      'tagline', 'Techyor is a product studio. For eight years we have built websites, apps, and AI tools for teams in the US, UK, Switzerland, and Australia.'
    )),
    (v_home_id, 'stats', 'stats-strip', 20, true, jsonb_build_object(
      'items', jsonb_build_array(
        jsonb_build_object('value', '8+', 'label', 'Years in'),
        jsonb_build_object('value', '80+', 'label', 'Shipped'),
        jsonb_build_object('value', '4', 'label', 'Time zones'),
        jsonb_build_object('value', '100%', 'label', 'One team')
      )
    )),
    (v_home_id, 'capabilities', 'capabilities-strip', 30, true, jsonb_build_object(
      'eyebrow', 'What we do.',
      'title', 'Strategy. Design. Development.',
      'items', jsonb_build_array(
        jsonb_build_object('title', 'Strategy.', 'description', 'We start with research. User interviews, market analysis, product definition. Get the strategy right before you build.'),
        jsonb_build_object('title', 'Design.', 'description', 'UI and UX that works on screen and in the browser. We sweat the details so your users do not have to.'),
        jsonb_build_object('title', 'Development.', 'description', 'Front-end, back-end, mobile, AI integrations. Code that performs, scales, and does not break when load spikes hit.')
      )
    )),
    (v_home_id, 'featured-highlights', 'small-highlights', 40, true, jsonb_build_object(
      'source', 'projects+blog',
      'limit', 12
    )),
    (v_home_id, 'showreel', 'video', 50, true, jsonb_build_object(
      'poster', '/_optimized/assets/storyblok/new-showreel-cover-w768.jpg',
      'src', '/assets/storyblok/significareel.mp4',
      'type', 'video/mp4'
    )),
    (v_home_id, 'selected-work', 'project-list', 60, true, jsonb_build_object(
      'eyebrow', 'Selected work.',
      'title', 'Products we are proud of.',
      'limit', 4,
      'cta', jsonb_build_object('label', 'View all projects', 'href', '/projects')
    )),
    (v_home_id, 'services-newton', 'newton', 70, true, jsonb_build_object(
      'title1', 'Our services.',
      'title2', 'One team. No handoffs.',
      'description', 'Websites, apps, e-commerce, AI tools, automation. We build it all in-house. Strategy and research upfront, design, code, launch. Same team the whole way, so ideas do not get lost between departments.',
      'cta', jsonb_build_object('label', 'Explore services', 'href', '/services')
    )),
    (v_home_id, 'about-text-media', 'text-with-media', 80, true, jsonb_build_object(
      'eyebrow', 'About Techyor.',
      'title', 'We ship products, not promises.',
      'description', 'Eight years in, 80+ projects shipped for teams in the US, UK, Switzerland, and Australia. We handle strategy, design, and code. We move fast. We ship on time.',
      'cta', jsonb_build_object('label', 'About us', 'href', '/about'),
      'revertOrientation', false
    )),
    (v_home_id, 'about-grid', 'about-grid', 90, true, jsonb_build_object(
      'items', jsonb_build_array(
        jsonb_build_object('title', 'Mission and values.', 'description', 'We build products that actually work. Not features for features sake. Products that solve real problems for the people using them.'),
        jsonb_build_object('title', 'Perks and benefits.', 'description', 'Flexible hours, remote work, health cover, learning budget, and an annual retreat. We try to get the basics right so you can focus on the work.'),
        jsonb_build_object('title', 'Career plan.', 'description', 'You grow. We pair you with mentors, give you honest feedback, and fund your learning. Set the pace.')
      )
    )),
    (v_home_id, 'team', 'team-section', 100, true, jsonb_build_object(
      'title', 'Meet the people building it.',
      'subtitle', 'Hire a specialist directly.',
      'showViewAll', true
    )),
    (v_home_id, 'blog-insights', 'blog-list', 110, true, jsonb_build_object(
      'eyebrow', 'Insights.',
      'title', 'Notes from the studio.',
      'limit', 12
    )),
    (v_home_id, 'clients', 'clients-section', 120, true, jsonb_build_object(
      'title', 'Trusted by teams in the US, UK, Switzerland, and Australia.'
    )),
    (v_home_id, 'faqs', 'faqs-list', 130, true, jsonb_build_object('source', 'common'))
  on conflict (page_id, section_key) do update
    set section_type = excluded.section_type,
        position = excluded.position,
        enabled = excluded.enabled,
        props = excluded.props;

  insert into public.page_sections (page_id, section_key, section_type, position, enabled, props) values
    (v_about_id, 'hero-physics', 'physics', 10, true, jsonb_build_object(
      'variant', 'hero',
      'title', 'About us.',
      'blocks', jsonb_build_array(
        jsonb_build_object('component', 'physics-balloon-card', 'theme', 'yellow', 'text', 'Top Rated on Upwork ⭐'),
        jsonb_build_object('component', 'physics-sticker', 'photo', jsonb_build_object('filename', '/assets/storyblok/upwork-certified.webp', 'alt', 'Top Rated on Upwork')),
        jsonb_build_object('component', 'physics-sticker', 'photo', jsonb_build_object('filename', '/assets/storyblok/experience-badge.webp', 'alt', '8 Years of Experience')),
        jsonb_build_object('component', 'physics-sticker', 'photo', jsonb_build_object('filename', '/assets/storyblok/design-services.webp', 'alt', 'Design Services')),
        jsonb_build_object('component', 'physics-input', 'placeholder', 'Type something...'),
        jsonb_build_object('component', 'physics-rectangle-card', 'theme', 'dark', 'text', '8 Years of Experience'),
        jsonb_build_object('component', 'physics-sticker', 'photo', jsonb_build_object('filename', '/assets/storyblok/development-services.webp', 'alt', 'Development Services')),
        jsonb_build_object('component', 'physics-balloon-card', 'theme', 'yellow', 'text', '95% International Clients'),
        jsonb_build_object('component', 'physics-sticker', 'photo', jsonb_build_object('filename', '/assets/storyblok/growth-milestone.webp', 'alt', 'Growth & Milestone'))
      )
    )),
    (v_about_id, 'core-values', 'core-values', 20, true, jsonb_build_object(
      'title1', 'Our Values.',
      'title2', 'How we work.',
      'description', '',
      'values', jsonb_build_array(
        jsonb_build_object('title', 'Ownership.', 'description', 'We treat every project like it is ours. Because until you are happy, it is.'),
        jsonb_build_object('title', 'Speed with substance.', 'description', 'We move fast — but never at the cost of quality. Every decision is intentional.'),
        jsonb_build_object('title', 'Radical honesty.', 'description', 'No sugarcoating. No vanishing acts. You will always know where things stand.'),
        jsonb_build_object('title', 'Builder''s mindset.', 'description', 'We think like founders. We sweat the details. We ship.')
      )
    )),
    (v_about_id, 'team', 'team-section', 30, true, jsonb_build_object(
      'title', 'The team.',
      'subtitle', 'Specialists, not generalists.',
      'showViewAll', true
    )),
    (v_about_id, 'office-cards', 'office-cards', 40, true, '{}'::jsonb),
    (v_about_id, 'clients', 'clients-section', 50, true, jsonb_build_object(
      'title', 'Trusted by teams in the US, UK, Switzerland, and Australia.'
    )),
    (v_about_id, 'faqs', 'faqs-list', 60, true, jsonb_build_object('source', 'common'))
  on conflict (page_id, section_key) do update
    set section_type = excluded.section_type,
        position = excluded.position,
        enabled = excluded.enabled,
        props = excluded.props;

  insert into public.page_sections (page_id, section_key, section_type, position, enabled, props) values
    (v_services_id, 'timeline-services', 'timeline-services', 10, true, '{}'::jsonb),
    (v_services_id, 'services-list', 'services', 20, true, jsonb_build_object(
      'title', 'Our services.',
      'subtitle', 'The full list.',
      'description', 'We work in three phases: strategy first, then design, then code. The combination of all three is what makes products people actually want to use.'
    )),
    (v_services_id, 'clients', 'clients-section', 30, true, '{}'::jsonb),
    (v_services_id, 'team', 'team-section', 40, true, jsonb_build_object('showViewAll', true)),
    (v_services_id, 'testimonials', 'upwork-testimonials', 50, true, '{}'::jsonb),
    (v_services_id, 'contact', 'contact-form', 60, true, '{}'::jsonb),
    (v_services_id, 'faqs', 'faqs-list', 70, true, jsonb_build_object('source', 'common'))
  on conflict (page_id, section_key) do update
    set section_type = excluded.section_type,
        position = excluded.position,
        enabled = excluded.enabled,
        props = excluded.props;

  insert into public.page_sections (page_id, section_key, section_type, position, enabled, props) values
    (v_projects_id, 'projects-grid', 'projects', 10, true, '{}'::jsonb),
    (v_team_id, 'team-grid', 'team-section', 10, true, jsonb_build_object('showAll', true)),
    (v_blog_id, 'blog-list', 'blog-list', 10, true, '{}'::jsonb),
    (v_contact_id, 'contact-form', 'contact-form', 10, true, '{}'::jsonb),
    (v_careers_id, 'open-positions', 'open-positions', 10, true, '{}'::jsonb),
    (v_quote_id, 'quote-form', 'quote-form', 10, true, '{}'::jsonb)
  on conflict (page_id, section_key) do update
    set section_type = excluded.section_type,
        position = excluded.position,
        enabled = excluded.enabled,
        props = excluded.props;
end $$;
