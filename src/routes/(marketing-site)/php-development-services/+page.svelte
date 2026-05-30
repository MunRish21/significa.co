<script lang="ts">
  import OptimizedImage from '$components/optimized-image.svelte';
  import ContactForm from '$components/contact-form.svelte';
  import UpworkTestimonials from '$components/sections/upwork-testimonials.svelte';
  import TeamSection from '$components/sections/team-section.svelte';
  import FloatingHireCta from '$components/floating-hire-cta.svelte';
  import { engagementModels } from '$lib/data/hire-roles';
  import {
    BASE_URL,
    generateBreadcrumbSchema,
    generatePhpServicesSchema,
    generateFAQSchema,
    generateHowToSchema
  } from '$lib/utils/schema';

  export let data;

  const PAGE_URL = `${BASE_URL}/php-development-services`;

  const metaTitle = 'PHP Development Services — Custom Web Apps & CMS | Techyor';
  const metaDescription =
    'Custom PHP development services for web apps, websites, CMS, e-commerce, and APIs. Senior Core PHP, CodeIgniter, WordPress & WooCommerce engineers — 40–60% less than US agencies, for teams in the US, UK, EU, and Australia.';

  const trustStats = [
    { value: '80+', label: 'Products shipped' },
    { value: '8+ yrs', label: 'In production' },
    { value: '40–60%', label: 'Below US rates' },
    { value: '5–10 days', label: 'Time to start' }
  ];

  /** PHP services grid — each card targets a sub-keyword. */
  const services = [
    {
      title: 'Custom PHP web application development',
      description:
        'Bespoke web applications, dashboards, portals, and internal tools built in PHP — architected to scale and maintainable for years, not just shipped and abandoned.'
    },
    {
      title: 'PHP website development',
      description:
        'Fast, secure, SEO-ready websites and web portals in PHP — corporate sites, B2B/B2C platforms, and content-driven sites with a CMS your team can actually use.'
    },
    {
      title: 'WordPress development',
      description:
        'Custom themes and plugins, headless WordPress, and performance-tuned builds — not page-builder soup. Editors get a CMS they can run without filing tickets.'
    },
    {
      title: 'WooCommerce & e-commerce',
      description:
        'Custom WooCommerce stores, checkout and payment flows, subscriptions, and B2B catalogs — conversion-focused and tuned for speed under real traffic.'
    },
    {
      title: 'PHP API development & integrations',
      description:
        'REST APIs and third-party integrations — payment gateways, CRMs, shipping, and internal services — documented, secured, and load-tested.'
    },
    {
      title: 'PHP migration & version upgrades',
      description:
        'Modernize legacy PHP — upgrade PHP 5/7 to PHP 8, untangle slow code, and migrate incrementally without a risky big-bang rewrite.'
    },
    {
      title: 'Custom CRM, ERP & portals',
      description:
        'Tailored business systems and admin portals — including CodeIgniter apps like Perfex CRM — built around the way your team actually works.'
    },
    {
      title: 'PHP support & maintenance',
      description:
        'Ongoing updates, security patches, backups, and fixes on a monthly care plan so your PHP site stays fast, secure, and current.'
    }
  ];

  /** Honest framework/tech list — confirmed capabilities only. */
  const techStack = [
    'Core PHP',
    'CodeIgniter',
    'WordPress',
    'WooCommerce',
    'MySQL',
    'MariaDB',
    'PostgreSQL',
    'REST APIs',
    'Docker'
  ];

  /** Build process — 5 steps (every ranking competitor has this). */
  const process = [
    { step: 1, title: 'Connect', description: 'A 30-minute intro call. Tell us what you are building and the stack you are on. No deck, no obligation.' },
    { step: 2, title: 'Analysis & estimate', description: 'We scope the work, flag risks and trade-offs, and give you a clear, predictable quote up front.' },
    { step: 3, title: 'Proposal & plan', description: 'A mutual NDA, clean IP assignment, milestones, and a start date — usually within 5–10 days.' },
    { step: 4, title: 'Build & QA', description: 'We ship in sprints with daily updates, code review, and testing throughout. You see progress weekly.' },
    { step: 5, title: 'Launch & support', description: 'Deployment, handover, and optional ongoing support and maintenance once you are live.' }
  ];

  const industries = ['E-commerce', 'Healthcare', 'Finance', 'Education', 'Real estate', 'Professional services', 'SaaS', 'Hospitality'];

  /** In-house vs Techyor comparison (shared messaging). */
  const comparison = [
    { label: 'Time to start', inHouse: '2–4 months to source and onboard', techyor: '5–10 days from intro call to shipping' },
    { label: 'Cost', inHouse: 'Full salary, benefits, and recruiter fees', techyor: '40–60% less — senior talent, no overhead' },
    { label: 'Seniority', inHouse: 'You vet skill yourself and hope it holds', techyor: 'Pre-vetted senior PHP engineers' },
    { label: 'Commitment', inHouse: 'A permanent hire that is hard to reverse', techyor: 'Month-to-month, two-week no-risk trial' }
  ];

  const faq = [
    {
      question: 'What is PHP used for, and why choose it for my project?',
      answer:
        'PHP powers roughly three-quarters of the web — including WordPress and WooCommerce. It is a fast, open-source, battle-tested choice for content-driven websites, e-commerce, CMS builds, web portals, and custom business apps. It ships quickly, runs on almost any host, and has a huge ecosystem, which keeps build and hosting costs low.'
    },
    {
      question: 'How much do PHP development services cost?',
      answer:
        'PHP projects are quoted per scope, not by an hourly meter you have to police. Because our senior engineers are India-based, you pay roughly 40–60% less than an equivalent US or UK agency with no drop in quality. Tell us your scope on a quick call and we will give you a clear, fixed quote up front — fixed-price for defined work, or a predictable monthly rate for ongoing development.'
    },
    {
      question: 'How long does a PHP project take?',
      answer:
        'A simple WordPress or brochure site can ship in 1–3 weeks; a custom PHP web app or WooCommerce build typically runs 4–12 weeks depending on scope. We start within 5–10 days of the intro call and give you a milestone timeline with your quote.'
    },
    {
      question: 'Can you work with my existing PHP codebase?',
      answer:
        'Yes. Much of our PHP work is picking up existing projects — adding features, fixing bugs, improving performance, or stabilizing a build a previous developer left behind. We start by reviewing the codebase, then propose the safest path forward.'
    },
    {
      question: 'Which PHP frameworks and platforms do you work with?',
      answer:
        'Core PHP, CodeIgniter, WordPress, and WooCommerce, backed by MySQL, MariaDB, or PostgreSQL and REST APIs. We are honest about scope — if your project genuinely needs a framework we do not specialize in, we will tell you rather than pretend.'
    },
    {
      question: 'Can you upgrade or migrate a legacy PHP application?',
      answer:
        'Yes. We upgrade legacy PHP 5/7 apps to PHP 8, modernize old code incrementally, and migrate sites between hosts or platforms — without a risky big-bang rewrite that takes the site offline.'
    },
    {
      question: 'Do you provide ongoing PHP support and maintenance?',
      answer:
        'Yes — we offer monthly care plans covering updates, security patches, backups, monitoring, and fixes. See our website maintenance services for the details, or we bundle support into a longer engagement.'
    },
    {
      question: 'Do you sign NDAs, and who owns the IP?',
      answer:
        'Every engagement starts with a mutual NDA and a clean IP assignment clause. All work product, code, and accounts are your property the moment it is written.'
    },
    {
      question: 'Is PHP still a good choice in 2026 versus Node.js or Python?',
      answer:
        'For content sites, CMS, WordPress/WooCommerce, and many business web apps, PHP is still an excellent, cost-effective choice with modern PHP 8 being fast and well-tooled. For real-time systems, heavy data/AI work, or certain APIs, Node.js or Python may fit better — and because we build in all three, we will recommend the right tool honestly rather than sell you PHP by default.'
    }
  ];

  const breadcrumbJsonLd = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'PHP Development Services', url: '/php-development-services' }
  ]);

  $: serviceJsonLd = generatePhpServicesSchema({
    url: PAGE_URL,
    description: metaDescription,
    imagePath: '/api/og/services',
    services: services.map((s) => ({ title: s.title, description: s.description })),
    ratings: data.ratings,
    reviews: data.reviewEntries
  });

  const faqJsonLd = generateFAQSchema(faq);
  const howToJsonLd = generateHowToSchema({
    name: 'How to start a PHP development project with Techyor',
    description:
      'Connect on a quick call, get a fixed quote, then we plan, build, and support your PHP project.',
    totalTime: 'P10D',
    steps: process.map((s) => ({ name: s.title, text: s.description }))
  });

  function scrollToContact(event: MouseEvent) {
    event.preventDefault();
    const target = document.getElementById('contact-form');
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
</script>

<svelte:head>
  <title>{metaTitle}</title>
  <meta name="description" content={metaDescription} />
  <link rel="canonical" href={PAGE_URL} />

  <meta property="og:type" content="website" />
  <meta property="og:title" content={metaTitle} />
  <meta property="og:description" content={metaDescription} />
  <meta property="og:image" content="{BASE_URL}/api/og/services" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="PHP development services — Techyor" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@TechyorDotCo" />
  <meta name="twitter:title" content={metaTitle} />
  <meta name="twitter:description" content={metaDescription} />
  <meta name="twitter:image" content="{BASE_URL}/api/og/services" />
  <meta name="twitter:image:alt" content="PHP development services — Techyor" />

  {@html `<${'script'} type="application/ld+json">${serviceJsonLd}</${'script'}>`}
  {@html `<${'script'} type="application/ld+json">${breadcrumbJsonLd}</${'script'}>`}
  {@html `<${'script'} type="application/ld+json">${faqJsonLd}</${'script'}>`}
  {@html `<${'script'} type="application/ld+json">${howToJsonLd}</${'script'}>`}
</svelte:head>

<main class="overflow-hidden">
  <!-- Breadcrumbs -->
  <div class="container mx-auto px-container pt-8 text-sm text-foreground-secondary">
    <a href="/" class="transition-colors hover:text-foreground">Home</a>
    <span class="mx-2">/</span>
    <span class="text-foreground">PHP Development Services</span>
  </div>

  <!-- ─── HERO ─────────────────────────────────────────────────────────── -->
  <section class="container mx-auto mt-8 px-container md:mt-14 lg:mt-20">
    <div
      class="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background-offset/40 px-3 py-1.5 text-xs uppercase tracking-wider text-foreground-secondary"
    >
      <span class="inline-block h-1.5 w-1.5 rounded-full bg-green-500" aria-hidden="true"></span>
      Free quote — replies within 24 hours
    </div>

    <h1 class="text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">PHP development services.</h1>
    <p class="mt-6 max-w-3xl text-xl leading-relaxed text-foreground-secondary md:text-2xl">
      Custom PHP web apps, websites, CMS, and e-commerce — built by senior engineers in Core PHP,
      CodeIgniter, WordPress, and WooCommerce. Production-grade, and 40–60% less than US agencies.
    </p>

    <div class="mt-10 flex flex-wrap gap-4">
      <a
        href="#contact-form"
        on:click={scrollToContact}
        class="inline-flex h-12 items-center justify-center gap-1.5 rounded-md border border-foreground bg-foreground px-7 font-medium text-background outline-none transition-all hover:ring-4 focus-visible:ring-4 active:scale-[0.98] active:ring-2"
      >
        <span>Get a free quote</span>
        <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 3v9M11.5 8.5l-3.5 3.5-3.5-3.5" stroke="currentColor" stroke-width="1.2" />
        </svg>
      </a>
      <a
        href="#services"
        class="inline-flex h-12 items-center justify-center gap-1.5 rounded-md border border-border px-7 font-medium outline-none transition-all hover:border-foreground hover:ring-4 focus-visible:border-foreground focus-visible:ring-4 active:scale-[0.98] active:ring-2"
      >
        See what we build
      </a>
    </div>

    <!-- Trust strip -->
    <div class="mt-14 grid grid-cols-2 gap-6 border-y py-8 md:grid-cols-4 md:gap-8 md:py-10">
      {#each trustStats as stat (stat.label)}
        <div class="flex flex-col">
          <p class="text-3xl font-bold md:text-4xl">{stat.value}</p>
          <p class="mt-1 text-sm text-foreground-secondary md:text-base">{stat.label}</p>
        </div>
      {/each}
    </div>
  </section>

  <!-- ─── WHY PHP ──────────────────────────────────────────────────────── -->
  <section
    id="overview"
    aria-labelledby="overview-heading"
    class="container mx-auto mt-16 px-container md:mt-24"
  >
    <h2 id="overview-heading" class="sr-only">Overview</h2>
    <p data-speakable class="max-w-4xl text-lg leading-relaxed text-foreground-secondary md:text-xl">
      PHP quietly powers most of the web — including WordPress and WooCommerce, the platforms behind
      a huge share of the world's online stores and content sites. It is fast, open-source, and
      battle-tested, which makes it a cost-effective choice for websites, CMS builds, e-commerce,
      web portals, and custom business applications. Our PHP development services pair senior
      engineers with modern PHP 8 practices — clean architecture, security, and performance — so you
      get software that ships quickly and stays maintainable for years. We build honestly in Core
      PHP, CodeIgniter, WordPress, and WooCommerce, and we will tell you when PHP is the right tool
      and when it is not.
    </p>
  </section>

  <!-- ─── SERVICES GRID ────────────────────────────────────────────────── -->
  <section id="services" aria-labelledby="services-heading" class="border-t mt-16 md:mt-24">
    <div class="container mx-auto px-container py-12 md:py-20">
      <h2 id="services-heading" class="text-5xl text-foreground-secondary md:text-6xl">
        What we build with PHP.
      </h2>
      <p class="text-5xl md:text-6xl">End to end.</p>

      <div class="mt-12 grid gap-8 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
        {#each services as service (service.title)}
          <div class="border-t border-border pt-6">
            <h3 class="text-xl font-semibold md:text-2xl">{service.title}</h3>
            <p class="mt-3 text-base leading-relaxed text-foreground-secondary md:text-lg">
              {service.description}
            </p>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- ─── TECH STACK ───────────────────────────────────────────────────── -->
  <section id="stack" aria-labelledby="stack-heading" class="border-t bg-background-offset/30">
    <div class="container mx-auto px-container py-12 md:py-20">
      <h2 id="stack-heading" class="text-5xl text-foreground-secondary md:text-6xl">Our PHP stack.</h2>
      <p class="text-5xl md:text-6xl">What we work in.</p>

      <div class="mt-12 flex flex-wrap gap-2 md:mt-16">
        {#each techStack as tech (tech)}
          <span
            class="inline-flex items-center rounded-md border border-border bg-background px-3 py-1.5 text-base transition-colors hover:border-foreground"
          >
            {tech}
          </span>
        {/each}
      </div>
    </div>
  </section>

  <!-- ─── ENGAGEMENT MODELS (quote-based) ──────────────────────────────── -->
  <section id="engagement" aria-labelledby="engagement-heading" class="border-t">
    <div class="container mx-auto px-container py-12 md:py-20">
      <h2 id="engagement-heading" class="text-5xl text-foreground-secondary md:text-6xl">
        How you can engage.
      </h2>
      <p class="text-5xl md:text-6xl">Priced to your scope.</p>
      <p class="mt-6 max-w-2xl text-lg text-foreground-secondary md:text-xl">
        Every project is quoted up front — fixed-price for defined work, or a predictable monthly
        rate for ongoing development. Senior PHP talent at 40–60% below US agency rates.
      </p>

      <div class="mt-12 grid gap-6 md:mt-16 md:grid-cols-3 md:gap-8">
        {#each engagementModels as model, i (model.title)}
          <div
            class="group relative rounded-xl border border-border bg-background p-6 transition-all hover:-translate-y-1 hover:border-foreground hover:shadow-lg md:p-8"
          >
            <span class="absolute right-6 top-6 text-sm text-foreground-secondary md:right-8 md:top-8"
              >0{i + 1}</span
            >
            <h3 class="text-2xl font-semibold md:text-3xl">{model.title}</h3>
            <p class="mt-4 text-base leading-relaxed text-foreground-secondary md:text-lg">
              {model.description}
            </p>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- ─── GUARANTEE ────────────────────────────────────────────────────── -->
  <section aria-labelledby="guarantee-heading" class="border-t">
    <div class="container mx-auto px-container py-12 md:py-16">
      <div
        class="flex flex-col gap-6 rounded-xl border border-foreground bg-background-offset/40 p-8 md:flex-row md:items-center md:justify-between md:p-10"
      >
        <div class="max-w-2xl">
          <h2 id="guarantee-heading" class="text-2xl font-semibold md:text-3xl">
            A two-week, no-risk trial.
          </h2>
          <p class="mt-3 text-base leading-relaxed text-foreground-secondary md:text-lg">
            Start your PHP project and work with us for two weeks. If it is not the right fit, you
            walk away owing only for work delivered — no long contracts, and your code, accounts, and
            IP are always yours.
          </p>
        </div>
        <a
          href="#contact-form"
          on:click={scrollToContact}
          class="inline-flex h-12 flex-shrink-0 items-center justify-center gap-1.5 rounded-md border border-foreground bg-foreground px-7 font-medium text-background transition-all hover:ring-4 focus-visible:ring-4 active:scale-[0.98]"
        >
          Get a free quote
        </a>
      </div>
    </div>
  </section>

  <!-- ─── IN-HOUSE VS TECHYOR ──────────────────────────────────────────── -->
  <section id="compare" aria-labelledby="compare-heading" class="border-t bg-background-offset/30">
    <div class="container mx-auto px-container py-12 md:py-20">
      <h2 id="compare-heading" class="text-5xl text-foreground-secondary md:text-6xl">
        In-house vs Techyor.
      </h2>
      <p class="text-5xl md:text-6xl">A faster, leaner path.</p>

      <div class="mt-12 overflow-hidden rounded-xl border border-border md:mt-16">
        <div class="grid grid-cols-1 md:grid-cols-[1fr_1.2fr_1.2fr]">
          <div class="hidden border-b border-border bg-background px-6 py-4 md:block"></div>
          <div class="hidden border-b border-l border-border bg-background px-6 py-4 md:block">
            <span class="text-sm font-medium uppercase tracking-wider text-foreground-secondary"
              >Hiring in-house</span
            >
          </div>
          <div class="hidden border-b border-l border-border bg-foreground px-6 py-4 md:block">
            <span class="text-sm font-medium uppercase tracking-wider text-background"
              >Working with Techyor</span
            >
          </div>

          {#each comparison as row (row.label)}
            <div class="border-b border-border bg-background px-6 py-5 font-medium">{row.label}</div>
            <div class="border-b border-border px-6 pb-5 pt-1 text-foreground-secondary md:border-l md:pt-5">
              <span class="mb-1 block text-xs uppercase tracking-wider text-foreground-secondary md:hidden"
                >In-house</span
              >
              {row.inHouse}
            </div>
            <div class="border-b border-l border-border bg-background-offset/40 px-6 pb-6 pt-1 md:pt-5">
              <span class="mb-1 block text-xs uppercase tracking-wider text-foreground-secondary md:hidden"
                >Techyor</span
              >
              {row.techyor}
            </div>
          {/each}
        </div>
      </div>
    </div>
  </section>

  <!-- ─── PROCESS ──────────────────────────────────────────────────────── -->
  <section id="process" aria-labelledby="process-heading" class="border-t">
    <div class="container mx-auto px-container py-12 md:py-20">
      <h2 id="process-heading" class="text-5xl text-foreground-secondary md:text-6xl">How it works.</h2>
      <p class="text-5xl md:text-6xl">Simple. No theatre.</p>

      <ol class="mt-12 grid gap-10 md:mt-16 md:grid-cols-3 lg:grid-cols-5 md:gap-8">
        {#each process as step (step.step)}
          <li class="relative">
            <span class="text-4xl font-bold text-foreground-secondary/30 md:text-5xl">0{step.step}</span>
            <h3 class="mt-2 text-lg font-semibold md:text-xl">{step.title}</h3>
            <p class="mt-2 text-base leading-relaxed text-foreground-secondary">{step.description}</p>
          </li>
        {/each}
      </ol>
    </div>
  </section>

  <!-- ─── INDUSTRIES ───────────────────────────────────────────────────── -->
  <section id="industries" aria-labelledby="industries-heading" class="border-t bg-background-offset/30">
    <div class="container mx-auto px-container py-12 md:py-20">
      <h2 id="industries-heading" class="text-5xl text-foreground-secondary md:text-6xl">
        Industries we serve.
      </h2>
      <p class="text-5xl md:text-6xl">Wherever PHP fits.</p>
      <div class="mt-12 flex flex-wrap gap-3 md:mt-16">
        {#each industries as industry (industry)}
          <span class="inline-flex items-center rounded-full border border-border bg-background px-4 py-2 text-base">
            {industry}
          </span>
        {/each}
      </div>
    </div>
  </section>

  <!-- ─── PROJECTS ─────────────────────────────────────────────────────── -->
  {#if data.projects.length > 0}
    <section id="work" aria-labelledby="work-heading" class="border-t">
      <div class="container mx-auto px-container py-12 md:py-20">
        <h2 id="work-heading" class="text-5xl text-foreground-secondary md:text-6xl">Selected work.</h2>
        <p class="text-5xl md:text-6xl">PHP & WordPress builds.</p>
        <p class="mt-6 max-w-2xl text-lg text-foreground-secondary md:text-xl">
          A slice of the WordPress and PHP sites we've shipped — from law and healthcare to real
          estate and education.
        </p>

        <div class="mt-12 grid gap-8 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {#each data.projects as project (project.slug)}
            <a href={`/projects/${project.slug}`} class="group block transition-opacity hover:opacity-95">
              <div class="aspect-[4/3] overflow-hidden rounded-md bg-background-offset">
                <OptimizedImage
                  class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  src={project.image}
                  alt={project.name}
                  width="800"
                  height="600"
                />
              </div>
              <h3 class="mt-4 text-xl font-semibold md:text-2xl">{project.name}</h3>
              <p class="mt-2 text-base text-foreground-secondary line-clamp-2">{project.tagline}</p>
            </a>
          {/each}
        </div>

        <div class="mt-12">
          <a
            href="/projects"
            class="inline-flex h-11 items-center gap-1.5 rounded-md border border-border px-5 font-medium transition-all hover:border-foreground hover:ring-4 focus-visible:border-foreground focus-visible:ring-4"
          >
            View all projects
            <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 8.5h9M8.5 4.5l3.5 4-3.5 4" stroke="currentColor" stroke-width="1.2" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  {/if}

  <!-- ─── TESTIMONIALS ─────────────────────────────────────────────────── -->
  {#if data.testimonials.length > 0}
    <UpworkTestimonials
      items={data.testimonials}
      title="What clients say."
      subtitle="Including our WordPress & CRM work."
      description="Verified Upwork reviews from teams we've shipped for."
    />
  {/if}

  <!-- ─── TEAM ─────────────────────────────────────────────────────────── -->
  <TeamSection title="The engineers behind the work." subtitle="Hire them directly." showViewAll />

  <!-- ─── FAQ ──────────────────────────────────────────────────────────── -->
  <section id="faq" aria-labelledby="faq-heading" class="border-t bg-background-offset/30">
    <div class="container mx-auto px-container py-12 md:py-20">
      <h2 id="faq-heading" class="text-5xl text-foreground-secondary md:text-6xl">FAQ.</h2>
      <p class="text-5xl md:text-6xl">Common questions.</p>

      <div class="mt-12 grid gap-x-12 gap-y-8 md:mt-16 lg:grid-cols-2">
        {#each faq as item (item.question)}
          <details class="group border-b border-border pb-6">
            <summary
              class="flex cursor-pointer list-none items-start justify-between gap-4 text-lg font-semibold transition-colors hover:text-foreground-secondary md:text-xl"
            >
              <span>{item.question}</span>
              <svg
                class="mt-1 flex-shrink-0 transition-transform duration-200 group-open:rotate-45"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M10 4v12M4 10h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
              </svg>
            </summary>
            <p class="mt-4 text-base leading-relaxed text-foreground-secondary md:text-lg">
              {item.answer}
            </p>
          </details>
        {/each}
      </div>
    </div>
  </section>

  <!-- ─── CONTACT FORM ─────────────────────────────────────────────────── -->
  <section id="contact-form" class="border-t scroll-mt-20">
    <div class="container mx-auto px-container py-12 md:py-20">
      <div class="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2 class="text-5xl text-foreground-secondary md:text-6xl">Got a PHP project?</h2>
          <p class="text-5xl md:text-6xl">Let's scope it.</p>
          <p class="mt-6 max-w-xl text-lg leading-relaxed text-foreground-secondary md:text-xl">
            Tell us what you're building or what needs fixing. We'll reply within 24 hours, hop on a
            quick call, and send a clear, fixed quote — no obligation.
          </p>
          <p class="mt-6 text-base text-foreground-secondary">
            Prefer email? <a class="underline underline-offset-4 hover:text-foreground" href="mailto:info@techyor.com">info@techyor.com</a>
          </p>
        </div>
        <div>
          <ContactForm />
        </div>
      </div>
    </div>
  </section>
</main>

<FloatingHireCta label="Get a free quote" />
