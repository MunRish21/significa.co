<script lang="ts">
  import OptimizedImage from '$components/optimized-image.svelte';
  import ContactForm from '$components/contact-form.svelte';
  import UpworkTestimonials from '$components/sections/upwork-testimonials.svelte';
  import TeamSection from '$components/sections/team-section.svelte';
  import FloatingHireCta from '$components/floating-hire-cta.svelte';
  import {
    BASE_URL,
    generateBreadcrumbSchema,
    generateWebsiteMaintenanceSchema,
    generateFAQSchema,
    generateHowToSchema
  } from '$lib/utils/schema';

  export let data;

  const PAGE_URL = `${BASE_URL}/website-maintenance-services`;

  const metaTitle = 'Website Maintenance Services — Support & Care Plans | Techyor';
  const metaDescription =
    'Website maintenance services for WordPress, Shopify, WooCommerce, and custom React sites. Security updates, backups, uptime monitoring, performance, and on-call support — affordable monthly care plans for US, UK, EU, and Australian teams.';

  /** Trust strip stats. */
  const trustStats = [
    { value: '99.9%', label: 'Uptime monitored' },
    { value: '< 24h', label: 'Support response' },
    { value: '8+ yrs', label: 'Sites in production' },
    { value: 'Weekly', label: 'Backups & updates' }
  ];

  /** What website maintenance services include — targets "…includes / …list". */
  const whatsIncluded: { title: string; items: string[] }[] = [
    {
      title: 'Security & updates',
      items: [
        'Core, plugin, theme & dependency updates',
        'Malware scanning and removal',
        'SSL certificate monitoring and renewal',
        'Firewall, hardening & vulnerability patching'
      ]
    },
    {
      title: 'Backups & uptime',
      items: [
        'Automated off-site backups (daily/weekly)',
        '24/7 uptime monitoring with alerts',
        'One-click restore points',
        'Staging environment for safe changes'
      ]
    },
    {
      title: 'Performance & health',
      items: [
        'Core Web Vitals and speed optimization',
        'Database cleanup and caching',
        'Broken-link and 404 monitoring',
        'Image and asset optimization'
      ]
    },
    {
      title: 'Content & support',
      items: [
        'Content edits, page updates & small fixes',
        'Bug fixes and emergency support',
        'Monthly health & analytics report',
        'Priority email and chat support'
      ]
    }
  ];

  /** Platforms — each targets a platform-specific maintenance keyword + links to the hire page. */
  const platforms = [
    { name: 'WordPress maintenance', href: '/hire/wordpress-developer' },
    { name: 'WooCommerce maintenance', href: '/hire/woocommerce-developer' },
    { name: 'Shopify maintenance', href: '/hire/shopify-developer' },
    { name: 'React & Next.js sites', href: '/hire/react-developer' },
    { name: 'Custom & headless builds', href: '/hire/web-developer' }
  ];

  /** Care-plan tiers. Prices are monthly USD. */
  const carePlans = [
    {
      title: 'Essential',
      price: 99,
      tagline: 'Brochure & marketing sites',
      description:
        'Security updates, weekly backups, uptime monitoring, and a small monthly block of content edits and fixes. For small business websites that need to stay safe, fast, and current.',
      features: [
        'Core + plugin updates',
        'Weekly backups',
        'Uptime monitoring',
        'Up to 1 hr edits / month',
        'Monthly report'
      ]
    },
    {
      title: 'Professional',
      price: 249,
      tagline: 'Growing & content-heavy sites',
      description:
        'Everything in Essential plus staging-tested updates, performance tuning, priority support, and a larger pool of monthly development time for ongoing improvements.',
      features: [
        'Daily backups',
        'Staging + safe deploys',
        'Performance optimization',
        'Up to 3 hrs work / month',
        'Priority support'
      ],
      featured: true
    },
    {
      title: 'E-commerce',
      price: 499,
      tagline: 'Shopify, WooCommerce & stores',
      description:
        'Store-grade care: checkout and payment monitoring, theme/app update testing, conversion-critical performance, and faster response windows because downtime costs you sales.',
      features: [
        'Store + checkout monitoring',
        'App / extension update testing',
        'Conversion performance tuning',
        'Up to 5 hrs work / month',
        'Same-day priority support'
      ]
    }
  ];

  /** Signs you need website maintenance — engagement + long-tail relevance. */
  const warningSigns = [
    'Your site loads slowly or fails Core Web Vitals',
    'Plugins, themes, or your CMS are out of date',
    'You have no recent, tested backup',
    'Security warnings, spam, or a past hack',
    'Broken links, forms, or 404 pages',
    "An expired or soon-to-expire SSL certificate",
    'Content and pages that are months out of date',
    'No one owns updates since your site launched'
  ];

  /** How onboarding works. */
  const process = [
    {
      step: 1,
      title: 'Free site audit',
      description:
        "We review your site's security, speed, backups, and update status, then tell you exactly what needs attention — no obligation."
    },
    {
      step: 2,
      title: 'Pick a care plan',
      description:
        'Choose the plan that fits your site and traffic. We handle onboarding, set up monitoring and backups, and bring everything current in week one.'
    },
    {
      step: 3,
      title: 'We keep it running',
      description:
        'Updates, backups, monitoring, and fixes happen quietly in the background. You get a monthly report and a direct line whenever you need a change.'
    }
  ];

  const whyUs = [
    {
      title: 'Engineers, not a ticket queue',
      description:
        'Your site is maintained by senior developers who can actually fix things — not a call-centre script. The same people who build production apps keep yours healthy.'
    },
    {
      title: 'Proactive, not reactive',
      description:
        "We catch issues before they become outages — expiring SSLs, slow queries, failing backups, vulnerable plugins. You hear about problems after we've solved them."
    },
    {
      title: 'No lock-in, transparent reports',
      description:
        'Month-to-month plans, your hosting and accounts stay yours, and every month you get a plain-English report of what we did and why.'
    }
  ];

  /** FAQ — targets definition / cost / includes / SLA / hosting / choose / retainer intents. */
  const faq = [
    {
      question: 'What is website maintenance?',
      answer:
        'Website maintenance is the ongoing work of keeping a live website secure, fast, current, and online after it launches. It covers software and security updates, backups, uptime monitoring, performance tuning, bug fixes, and content changes. Like servicing a car, regular maintenance prevents small issues from turning into outages, hacks, or expensive rebuilds.'
    },
    {
      question: 'Why is website maintenance important?',
      answer:
        'An unmaintained site decays: plugins fall behind, security holes open, backups silently fail, speed drops, and search rankings slip. Most serious problems — hacks, downtime, data loss — happen to sites nobody is watching. Maintenance protects the revenue, leads, and reputation your website is responsible for, and it is far cheaper than emergency recovery or a forced redesign.'
    },
    {
      question: 'How much do website maintenance services cost?',
      answer:
        'Our care plans start at $99/month for small business and brochure sites (Essential), $249/month for growing content sites (Professional), and $499/month for e-commerce stores. The right plan depends on your platform, traffic, and how much hands-on development time you need each month. Every plan is a flat monthly rate — no surprise hourly bills. For comparison, US agencies typically charge $100–$2,500/month.'
    },
    {
      question: 'What is included in website maintenance services?',
      answer:
        'Every plan covers the essentials of website support and maintenance: software and security updates, off-site backups, uptime monitoring, performance optimization, malware protection, SSL monitoring, and a block of time for content edits and bug fixes. Higher tiers add staging-tested deploys, faster response times, and more monthly development hours. You also get a monthly health and analytics report.'
    },
    {
      question: 'Do you maintain WordPress, Shopify, and WooCommerce sites?',
      answer:
        'Yes. We provide WordPress website maintenance, WooCommerce and Shopify store maintenance, and support for custom React, Next.js, and headless builds. Because the same team builds on these platforms, we can fix things at the code level, not just toggle plugins.'
    },
    {
      question: 'Do you offer website hosting and maintenance services together?',
      answer:
        'We can manage and monitor your existing hosting, or help you move to faster managed hosting as part of onboarding. We keep your hosting account in your name — you stay in control, we handle the upkeep, updates, and monitoring on top.'
    },
    {
      question: 'Is there a service level agreement (SLA) and response time?',
      answer:
        'Yes. Each plan has a defined support response window — within 24 hours on Essential, priority on Professional, and same-day on the E-commerce plan — plus an uptime monitoring SLA so issues are detected and acted on automatically, around the clock.'
    },
    {
      question: 'Do you work with small businesses and one-page sites?',
      answer:
        'Absolutely. Our Essential plan is built for small business websites that need affordable, reliable upkeep without paying for hours they will not use. You get the same security, backups, and monitoring as larger sites, scaled to your needs.'
    },
    {
      question: 'Can I cancel or change my plan?',
      answer:
        'Plans are month-to-month. You can upgrade, downgrade, or cancel with 30 days notice — no long contracts. Your site, hosting, backups, and accounts always remain yours.'
    },
    {
      question: 'What if my site is hacked or goes down?',
      answer:
        'Emergency support is part of every plan. If your site is compromised or offline, we restore from a clean backup, find and close the entry point, and harden the site so it does not happen again. Monitoring means we often start before you even notice.'
    },
    {
      question: 'How do I choose a website maintenance service?',
      answer:
        'Look for a provider that employs real developers (not just a ticket queue), tests updates on a staging copy before they touch your live site, takes off-site backups you can restore from, monitors uptime around the clock, and reports plainly on what they did each month. Avoid lock-in: your hosting, domain, and accounts should always stay in your name. We meet all of these as standard.'
    },
    {
      question: 'Is this a monthly retainer or pay-as-you-go?',
      answer:
        "It is a simple month-to-month retainer — a fixed monthly fee covering everything in your plan, including a set amount of development time. Larger one-off projects (a redesign, a new feature, a migration) are quoted separately so your maintenance fee stays predictable. There's no long contract; you can change or cancel anytime."
    },
    {
      question: 'When should I redesign my site instead of maintaining it?',
      answer:
        'Maintenance keeps a fundamentally sound site healthy. Consider a redesign instead when the technology is years out of date and insecure, the site no longer reflects your brand or converts, or upkeep costs more than a rebuild would. We will tell you honestly which path fits — and if a rebuild makes sense, our development team can handle it and then maintain the new site.'
    }
  ];

  const breadcrumbJsonLd = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Website Maintenance Services', url: '/website-maintenance-services' }
  ]);

  $: serviceJsonLd = generateWebsiteMaintenanceSchema({
    url: PAGE_URL,
    description: metaDescription,
    imagePath: '/api/og/services',
    carePlans: carePlans.map((p) => ({
      title: p.title,
      description: p.description,
      price: p.price
    })),
    ratings: data.ratings,
    reviews: data.reviewEntries
  });

  const faqJsonLd = generateFAQSchema(faq);
  const howToJsonLd = generateHowToSchema({
    name: 'How to start a website maintenance plan with Techyor',
    description:
      'A simple three-step process: get a free site audit, choose a care plan, and we keep your site secure, fast, and up to date.',
    totalTime: 'P7D',
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
  <meta property="og:image:alt" content="Website maintenance services — Techyor" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={metaTitle} />
  <meta name="twitter:description" content={metaDescription} />
  <meta name="twitter:image" content="{BASE_URL}/api/og/services" />
  <meta name="twitter:image:alt" content="Website maintenance services — Techyor" />

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
    <span class="text-foreground">Website Maintenance Services</span>
  </div>

  <!-- ─── HERO ─────────────────────────────────────────────────────────── -->
  <section class="container mx-auto mt-8 px-container md:mt-14 lg:mt-20">
    <div
      class="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background-offset/40 px-3 py-1.5 text-xs uppercase tracking-wider text-foreground-secondary"
    >
      <span class="inline-block h-1.5 w-1.5 rounded-full bg-green-500" aria-hidden="true"></span>
      Care plans available — free site audit
    </div>

    <h1 class="text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">
      Website maintenance services.
    </h1>
    <p class="mt-6 max-w-3xl text-xl leading-relaxed text-foreground-secondary md:text-2xl">
      Keep your website secure, fast, and up to date — without lifting a finger. Senior engineers
      handle updates, backups, monitoring, and fixes on a simple monthly care plan.
    </p>

    <div class="mt-10 flex flex-wrap gap-4">
      <a
        href="#contact-form"
        on:click={scrollToContact}
        class="inline-flex h-12 items-center justify-center gap-1.5 rounded-md border border-foreground bg-foreground px-7 font-medium text-background outline-none transition-all hover:ring-4 focus-visible:ring-4 active:scale-[0.98] active:ring-2"
      >
        <span>Get a free site audit</span>
        <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 3v9M11.5 8.5l-3.5 3.5-3.5-3.5" stroke="currentColor" stroke-width="1.2" />
        </svg>
      </a>
      <a
        href="#plans"
        class="inline-flex h-12 items-center justify-center gap-1.5 rounded-md border border-border px-7 font-medium outline-none transition-all hover:border-foreground hover:ring-4 focus-visible:border-foreground focus-visible:ring-4 active:scale-[0.98] active:ring-2"
      >
        See care plans
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

  <!-- ─── INTRO ────────────────────────────────────────────────────────── -->
  <section
    id="overview"
    aria-labelledby="overview-heading"
    class="container mx-auto mt-16 px-container md:mt-24"
  >
    <h2 id="overview-heading" class="sr-only">Overview</h2>
    <p data-speakable class="max-w-4xl text-lg leading-relaxed text-foreground-secondary md:text-xl">
      A website is never "done" — software ages, plugins break, security holes open, and pages slow
      down. Our website support and maintenance services keep your site healthy so small problems
      never become expensive emergencies. We maintain WordPress, WooCommerce, and Shopify stores
      alongside custom React and Next.js builds, with security updates, off-site backups, uptime
      monitoring, performance tuning, and on-call fixes — all handled by the same senior engineers
      who build production software. You get a fast, secure, current website and a single team to
      call, on an affordable monthly plan with no long contracts.
    </p>
  </section>

  <!-- ─── SIGNS YOU NEED MAINTENANCE ───────────────────────────────────── -->
  <section id="signs" aria-labelledby="signs-heading" class="border-t mt-16 md:mt-24">
    <div class="container mx-auto px-container py-12 md:py-20">
      <h2 id="signs-heading" class="text-5xl text-foreground-secondary md:text-6xl">
        Signs you need it.
      </h2>
      <p class="text-5xl md:text-6xl">Sound familiar?</p>

      <ul class="mt-12 grid gap-x-8 gap-y-4 md:mt-16 md:grid-cols-2">
        {#each warningSigns as sign (sign)}
          <li class="flex items-start gap-3 border-b border-border/50 pb-4">
            <svg
              class="mt-1 flex-shrink-0 text-amber-500"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M12 9v4m0 4h.01M10.3 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.7 3.86a2 2 0 0 0-3.4 0Z"
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span class="text-base leading-relaxed md:text-lg">{sign}</span>
          </li>
        {/each}
      </ul>
      <p class="mt-8 max-w-2xl text-lg text-foreground-secondary">
        If you ticked even one, your site is overdue for care. We'll start with a free audit and
        tell you exactly what needs fixing.
      </p>
    </div>
  </section>

  <!-- ─── WHAT'S INCLUDED ──────────────────────────────────────────────── -->
  <section id="included" aria-labelledby="included-heading" class="border-t mt-16 md:mt-24">
    <div class="container mx-auto px-container py-12 md:py-20">
      <h2 id="included-heading" class="text-5xl text-foreground-secondary md:text-6xl">
        What's included.
      </h2>
      <p class="text-5xl md:text-6xl">Everything your site needs.</p>

      <div class="mt-12 grid gap-10 md:mt-16 md:grid-cols-2 md:gap-12 lg:grid-cols-4">
        {#each whatsIncluded as group (group.title)}
          <div class="border-t border-border pt-6">
            <h3 class="text-xl font-semibold md:text-2xl">{group.title}</h3>
            <ul class="mt-5 grid gap-3">
              {#each group.items as item (item)}
                <li class="flex items-start gap-3">
                  <svg
                    class="mt-1 flex-shrink-0 text-foreground"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M5 12.5l4.5 4.5L19 7.5"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span class="text-base leading-relaxed text-foreground-secondary">{item}</span>
                </li>
              {/each}
            </ul>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- ─── PLATFORMS ────────────────────────────────────────────────────── -->
  <section
    id="platforms"
    aria-labelledby="platforms-heading"
    class="border-t bg-background-offset/30"
  >
    <div class="container mx-auto px-container py-12 md:py-20">
      <h2 id="platforms-heading" class="text-5xl text-foreground-secondary md:text-6xl">
        Platforms we maintain.
      </h2>
      <p class="text-5xl md:text-6xl">Wherever your site lives.</p>

      <div class="mt-12 flex flex-wrap gap-3 md:mt-16">
        {#each platforms as platform (platform.name)}
          <a
            href={platform.href}
            class="inline-flex items-center rounded-md border border-border bg-background px-4 py-2.5 text-base transition-all hover:border-foreground hover:ring-4"
          >
            {platform.name}
          </a>
        {/each}
      </div>
    </div>
  </section>

  <!-- ─── CARE PLANS ───────────────────────────────────────────────────── -->
  <section id="plans" aria-labelledby="plans-heading" class="border-t">
    <div class="container mx-auto px-container py-12 md:py-20">
      <h2 id="plans-heading" class="text-5xl text-foreground-secondary md:text-6xl">Care plans.</h2>
      <p class="text-5xl md:text-6xl">Pick what fits your site.</p>

      <div class="mt-12 grid gap-6 md:mt-16 md:grid-cols-3 md:gap-8">
        {#each carePlans as plan (plan.title)}
          <div
            class="group relative flex flex-col rounded-xl border bg-background p-6 transition-all hover:-translate-y-1 hover:shadow-lg md:p-8 {plan.featured
              ? 'border-foreground ring-1 ring-foreground'
              : 'border-border hover:border-foreground'}"
          >
            {#if plan.featured}
              <span
                class="absolute right-6 top-6 rounded-full bg-foreground px-2.5 py-0.5 text-xs font-medium text-background md:right-8 md:top-8"
                >Most popular</span
              >
            {/if}
            <h3 class="text-2xl font-semibold md:text-3xl">{plan.title}</h3>
            <p class="mt-1 text-sm text-foreground-secondary">{plan.tagline}</p>
            <p class="mt-4 flex items-baseline gap-1">
              <span class="text-4xl font-bold md:text-5xl">${plan.price}</span>
              <span class="text-base text-foreground-secondary">/ month</span>
            </p>
            <p class="mt-4 text-base leading-relaxed text-foreground-secondary">
              {plan.description}
            </p>
            <ul class="mt-6 grid flex-1 gap-3 border-t border-border pt-6">
              {#each plan.features as feature (feature)}
                <li class="flex items-start gap-3 text-base">
                  <svg
                    class="mt-1 flex-shrink-0 text-foreground"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M5 12.5l4.5 4.5L19 7.5"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span>{feature}</span>
                </li>
              {/each}
            </ul>
            <a
              href="#contact-form"
              on:click={scrollToContact}
              class="mt-8 inline-flex h-11 items-center justify-center rounded-md border border-foreground px-5 font-medium transition-all hover:bg-foreground hover:text-background {plan.featured
                ? 'bg-foreground text-background'
                : ''}"
            >
              Get this plan
            </a>
          </div>
        {/each}
      </div>
      <p class="mt-8 text-base text-foreground-secondary">
        Not sure which plan fits? <a
          href="#contact-form"
          on:click={scrollToContact}
          class="underline underline-offset-4 hover:text-foreground">Get a free audit</a
        > and we'll recommend one — with a fixed monthly price, no hourly surprises.
      </p>
    </div>
  </section>

  <!-- ─── WHY US ───────────────────────────────────────────────────────── -->
  <section id="why-us" aria-labelledby="why-us-heading" class="border-t bg-background-offset/30">
    <div class="container mx-auto px-container py-12 md:py-20">
      <h2 id="why-us-heading" class="text-5xl text-foreground-secondary md:text-6xl">Why Techyor.</h2>
      <p class="text-5xl md:text-6xl">Maintenance that's actually senior.</p>

      <div class="mt-12 grid gap-10 md:mt-16 md:grid-cols-3 md:gap-12">
        {#each whyUs as point, i (point.title)}
          <div class="relative">
            <div
              class="mb-5 flex h-10 w-10 items-center justify-center rounded-full border border-foreground bg-background text-base font-semibold"
            >
              {i + 1}
            </div>
            <h3 class="text-xl font-semibold md:text-2xl">{point.title}</h3>
            <p class="mt-3 text-base leading-relaxed text-foreground-secondary md:text-lg">
              {point.description}
            </p>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- ─── PROCESS ──────────────────────────────────────────────────────── -->
  <section id="process" aria-labelledby="process-heading" class="border-t">
    <div class="container mx-auto px-container py-12 md:py-20">
      <h2 id="process-heading" class="text-5xl text-foreground-secondary md:text-6xl">
        How it works.
      </h2>
      <p class="text-5xl md:text-6xl">Live in a week.</p>

      <ol class="mt-12 grid gap-10 md:mt-16 md:grid-cols-3 md:gap-12">
        {#each process as step (step.step)}
          <li class="relative">
            <div class="flex items-baseline gap-4">
              <span class="text-5xl font-bold text-foreground-secondary/30 md:text-6xl"
                >0{step.step}</span
              >
              <h3 class="text-xl font-semibold md:text-2xl">{step.title}</h3>
            </div>
            <p class="mt-4 text-base leading-relaxed text-foreground-secondary md:text-lg">
              {step.description}
            </p>
          </li>
        {/each}
      </ol>
    </div>
  </section>

  <!-- ─── PROJECTS WE MAINTAIN ─────────────────────────────────────────── -->
  {#if data.projects.length > 0}
    <section id="work" aria-labelledby="work-heading" class="border-t bg-background-offset/30">
      <div class="container mx-auto px-container py-12 md:py-20">
        <h2 id="work-heading" class="text-5xl text-foreground-secondary md:text-6xl">
          Sites we keep running.
        </h2>
        <p class="text-5xl md:text-6xl">Built and maintained by us.</p>
        <p class="mt-6 max-w-2xl text-lg text-foreground-secondary md:text-xl">
          Real e-commerce stores and websites we've shipped and continue to support — across
          Shopify, WooCommerce, WordPress, and custom React builds.
        </p>

        <div class="mt-12 grid gap-8 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {#each data.projects as project (project.slug)}
            <a
              href={`/projects/${project.slug}`}
              class="group block transition-opacity hover:opacity-95"
            >
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
      subtitle="Trusted to keep sites running."
      description="Verified Upwork reviews from teams we've shipped and supported."
    />
  {/if}

  <!-- ─── TEAM ─────────────────────────────────────────────────────────── -->
  <TeamSection
    title="The engineers behind your site."
    subtitle="Senior, not a ticket queue."
    showViewAll
  />

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
          <h2 class="text-5xl text-foreground-secondary md:text-6xl">Ready to relax?</h2>
          <p class="text-5xl md:text-6xl">Let's look at your site.</p>
          <p class="mt-6 max-w-xl text-lg leading-relaxed text-foreground-secondary md:text-xl">
            Tell us your URL and platform. We'll run a free audit of your security, speed, and
            backups, reply within 24 hours, and recommend the right care plan — no obligation.
          </p>
          <p class="mt-6 text-base text-foreground-secondary">
            Prefer email? <a
              class="underline underline-offset-4 hover:text-foreground"
              href="mailto:info@techyor.com">info@techyor.com</a
            >
          </p>
        </div>
        <div>
          <ContactForm />
        </div>
      </div>
    </div>
  </section>
</main>

<FloatingHireCta label="Get a care plan" />
