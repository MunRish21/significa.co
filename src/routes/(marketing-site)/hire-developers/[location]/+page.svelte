<script lang="ts">
  import OptimizedImage from '$components/optimized-image.svelte';
  import ContactForm from '$components/contact-form.svelte';
  import UpworkTestimonials from '$components/sections/upwork-testimonials.svelte';
  import TeamSection from '$components/sections/team-section.svelte';
  import FloatingHireCta from '$components/floating-hire-cta.svelte';
  import {
    BASE_URL,
    generateBreadcrumbSchema,
    generateLocationServiceSchema,
    generateContactPageSchema,
    generateFAQSchema,
    generateTeamMembersSchema
  } from '$lib/utils/schema';

  export let data;

  $: location = data.location;
  $: caseStudies = data.caseStudies;
  $: featuredTestimonials = data.featuredTestimonials;
  $: roleGroups = data.roleGroups;

  $: pageUrl = `${BASE_URL}/hire-developers/${location.slug}`;
  $: ogPath = `/api/og/locations/${location.slug}`;

  $: serviceJsonLd = generateLocationServiceSchema({
    countryName: location.countryName,
    countryCode: location.countryCode,
    h1: location.h1,
    description: location.metaDescription,
    url: pageUrl,
    imagePath: ogPath,
    pricingBands: location.pricing.bands,
    industries: location.industries,
    ratings: data.ratings,
    reviews: data.reviewEntries
  });
  $: faqJsonLd = generateFAQSchema(location.faq);
  $: breadcrumbJsonLd = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Hire Developers', url: '/hire-developers/united-states' },
    { name: location.countryName, url: `/hire-developers/${location.slug}` }
  ]);
  $: contactJsonLd = generateContactPageSchema({
    url: pageUrl,
    description: `Contact Techyor to hire senior developers for ${location.shortName} companies.`,
    imagePath: ogPath
  });
  $: teamJsonLd = generateTeamMembersSchema(data.teamSchemaMembers);

  function scrollToContact(event: MouseEvent) {
    event.preventDefault();
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
</script>

<svelte:head>
  <title>{location.metaTitle}</title>
  <meta name="description" content={location.metaDescription} />
  <link rel="canonical" href={pageUrl} />

  <meta property="og:type" content="website" />
  <meta property="og:title" content={location.metaTitle} />
  <meta property="og:description" content={location.metaDescription} />
  <meta property="og:image" content="{BASE_URL}{ogPath}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Hire senior developers for {location.shortName} companies — Techyor" />
  <meta property="og:url" content={pageUrl} />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@TechyorDotCo" />
  <meta name="twitter:title" content={location.metaTitle} />
  <meta name="twitter:description" content={location.metaDescription} />
  <meta name="twitter:image" content="{BASE_URL}{ogPath}" />
  <meta name="twitter:image:alt" content="Hire senior developers for {location.shortName} companies — Techyor" />

  {@html `<${'script'} type="application/ld+json">${serviceJsonLd}</${'script'}>`}
  {@html `<${'script'} type="application/ld+json">${faqJsonLd}</${'script'}>`}
  {@html `<${'script'} type="application/ld+json">${breadcrumbJsonLd}</${'script'}>`}
  {@html `<${'script'} type="application/ld+json">${contactJsonLd}</${'script'}>`}
  {@html `<${'script'} type="application/ld+json">${teamJsonLd}</${'script'}>`}
</svelte:head>

<main class="overflow-hidden">
  <!-- Breadcrumbs -->
  <div class="container mx-auto px-container pt-8 text-sm text-foreground-secondary">
    <a href="/" class="transition-colors hover:text-foreground">Home</a>
    <span class="mx-2">/</span>
    <a href="/services" class="transition-colors hover:text-foreground">Hire Developers</a>
    <span class="mx-2">/</span>
    <span class="text-foreground">{location.countryName}</span>
  </div>

  <!-- ─── HERO ─────────────────────────────────────────────────────────── -->
  <section class="container mx-auto mt-8 px-container md:mt-14 lg:mt-20">
    <div
      class="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background-offset/40 px-3 py-1.5 text-xs uppercase tracking-wider text-foreground-secondary"
    >
      <span class="inline-block h-1.5 w-1.5 rounded-full bg-green-500" aria-hidden="true"></span>
      Available — replies within 24 hours
    </div>

    <h1 class="text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">{location.h1}.</h1>
    <p class="mt-6 max-w-3xl text-xl leading-relaxed text-foreground-secondary md:text-2xl">
      {location.subhead}
    </p>

    <div class="mt-10 flex flex-wrap gap-4">
      <a
        href="#contact-form"
        on:click={scrollToContact}
        class="inline-flex h-12 items-center justify-center gap-1.5 rounded-md border border-foreground bg-foreground px-7 font-medium text-background outline-none transition-all hover:ring-4 focus-visible:ring-4 active:scale-[0.98] active:ring-2"
      >
        Hire from {location.shortName}
        <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 3v9M11.5 8.5l-3.5 3.5-3.5-3.5" stroke="currentColor" stroke-width="1.2" />
        </svg>
      </a>
      <a
        href="#how-we-work"
        class="inline-flex h-12 items-center justify-center gap-1.5 rounded-md border border-border px-7 font-medium outline-none transition-all hover:border-foreground hover:ring-4 focus-visible:border-foreground focus-visible:ring-4 active:scale-[0.98] active:ring-2"
      >
        How we work with {location.shortName} teams
      </a>
    </div>

    <!-- Trust strip -->
    <div class="mt-14 grid grid-cols-2 gap-6 border-y py-8 md:grid-cols-4 md:gap-8 md:py-10">
      {#each location.stats as stat (stat.label)}
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
      {location.intro}
    </p>
  </section>

  <!-- ─── WHY US ───────────────────────────────────────────────────────── -->
  <section id="why-us" aria-labelledby="why-us-heading" class="border-t mt-16 md:mt-24">
    <div class="container mx-auto px-container py-12 md:py-20">
      <h2 id="why-us-heading" class="text-5xl text-foreground-secondary md:text-6xl">
        Why Techyor.
      </h2>
      <p class="text-5xl md:text-6xl">For {location.shortName} teams.</p>

      <div class="mt-12 grid gap-10 md:mt-16 md:grid-cols-3 md:gap-12">
        {#each location.whyUs as point, i (point.title)}
          <div class="relative">
            <div
              class="mb-5 flex h-10 w-10 items-center justify-center rounded-full border border-foreground bg-background-offset/40 text-base font-semibold"
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

  <!-- ─── HOW WE WORK ──────────────────────────────────────────────────── -->
  <section id="how-we-work" aria-labelledby="how-heading" class="border-t bg-background-offset/30">
    <div class="container mx-auto px-container py-12 md:py-20">
      <h2 id="how-heading" class="text-5xl text-foreground-secondary md:text-6xl">How we work.</h2>
      <p class="text-5xl md:text-6xl">Time zones, comms, cadence.</p>

      <div class="mt-12 grid gap-12 md:mt-16 lg:grid-cols-2 lg:gap-20">
        <div>
          <p class="text-sm uppercase tracking-wider text-foreground-secondary">Daily overlap</p>
          <h3 class="mt-3 text-2xl md:text-3xl">{location.overlap.summary}</h3>
          <ul class="mt-6 space-y-3 border-t border-border pt-6">
            {#each location.overlap.details as detail (detail)}
              <li class="flex items-start gap-3">
                <svg
                  class="mt-1 flex-shrink-0 text-foreground"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
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
                <span class="text-base leading-relaxed">{detail}</span>
              </li>
            {/each}
          </ul>
        </div>

        <div>
          <p class="text-sm uppercase tracking-wider text-foreground-secondary">Communication</p>
          <h3 class="mt-3 text-2xl md:text-3xl">{location.comms.summary}</h3>
          <div class="mt-6 space-y-5 border-t border-border pt-6">
            {#each location.comms.items as item (item.title)}
              <div>
                <h4 class="text-lg font-semibold">{item.title}</h4>
                <p class="mt-2 text-base leading-relaxed text-foreground-secondary">
                  {item.description}
                </p>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ─── LEGAL & PAYMENT ──────────────────────────────────────────────── -->
  <section id="legal" aria-labelledby="legal-heading" class="border-t">
    <div class="container mx-auto px-container py-12 md:py-20">
      <h2 id="legal-heading" class="text-5xl text-foreground-secondary md:text-6xl">
        Legal & payment.
      </h2>
      <p class="text-5xl md:text-6xl">No surprises for your CFO.</p>

      <div class="mt-12 grid gap-6 md:mt-16 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        {#each location.legalAndPayment.items as item (item.title)}
          <div class="rounded-xl border border-border bg-background p-6">
            <h3 class="text-xl font-semibold">{item.title}</h3>
            <p class="mt-3 text-base leading-relaxed text-foreground-secondary">
              {item.description}
            </p>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- ─── PRICING ──────────────────────────────────────────────────────── -->
  <section id="pricing" aria-labelledby="pricing-heading" class="border-t bg-background-offset/30">
    <div class="container mx-auto px-container py-12 md:py-20">
      <h2 id="pricing-heading" class="text-5xl text-foreground-secondary md:text-6xl">Pricing.</h2>
      <p class="text-5xl md:text-6xl">Transparent ranges in USD.</p>
      <p class="mt-6 max-w-3xl text-lg leading-relaxed text-foreground-secondary md:text-xl">
        {location.pricing.summary}
      </p>

      <div class="mt-12 grid gap-6 md:mt-16 md:grid-cols-3 md:gap-8">
        {#each location.pricing.bands as band (band.label)}
          <div
            class="group relative rounded-xl border border-border bg-background p-6 transition-all hover:-translate-y-1 hover:border-foreground hover:shadow-lg md:p-8"
          >
            <h3 class="text-xl font-semibold md:text-2xl">{band.label}</h3>
            <p class="mt-2 text-3xl font-bold">{band.range}</p>
            <p class="mt-4 text-base leading-relaxed text-foreground-secondary">
              {band.description}
            </p>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- ─── INDUSTRIES ───────────────────────────────────────────────────── -->
  <section id="industries" aria-labelledby="industries-heading" class="border-t">
    <div class="container mx-auto px-container py-12 md:py-20">
      <h2 id="industries-heading" class="text-5xl text-foreground-secondary md:text-6xl">
        Industries we serve.
      </h2>
      <p class="text-5xl md:text-6xl">Across {location.shortName} teams.</p>

      <div class="mt-12 grid gap-10 md:mt-16 md:grid-cols-3 md:gap-12">
        {#each location.industries as industry (industry.name)}
          <div>
            <h3 class="text-xl font-semibold md:text-2xl">{industry.name}</h3>
            <p class="mt-3 text-base leading-relaxed text-foreground-secondary md:text-lg">
              {industry.description}
            </p>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- ─── ROLES GRID ───────────────────────────────────────────────────── -->
  <section id="roles" aria-labelledby="roles-heading" class="border-t bg-background-offset/30">
    <div class="container mx-auto px-container py-12 md:py-20">
      <h2 id="roles-heading" class="text-5xl text-foreground-secondary md:text-6xl">
        Roles you can hire.
      </h2>
      <p class="text-5xl md:text-6xl">25 senior specialists, available now.</p>

      <div class="mt-12 grid gap-10 md:mt-16 lg:grid-cols-2 lg:gap-12">
        {#each roleGroups as group (group.title)}
          <div>
            <p class="mb-4 text-sm uppercase tracking-wider text-foreground-secondary">
              {group.title}
            </p>
            <ul class="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {#each group.roles as role (role.slug)}
                <li>
                  <a
                    href={`/hire/${role.slug}`}
                    class="block rounded-md border border-border bg-background px-4 py-2.5 text-sm transition-all hover:border-foreground hover:bg-foreground hover:text-background"
                  >
                    Hire {role.title} →
                  </a>
                </li>
              {/each}
            </ul>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- ─── CASE STUDIES ─────────────────────────────────────────────────── -->
  {#if caseStudies.length > 0}
    <section id="work" aria-labelledby="work-heading" class="border-t">
      <div class="container mx-auto px-container py-12 md:py-20">
        <h2 id="work-heading" class="text-5xl text-foreground-secondary md:text-6xl">
          Selected work.
        </h2>
        <p class="text-5xl md:text-6xl">For {location.shortName}-based teams.</p>

        <div class="mt-12 grid gap-8 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {#each caseStudies as { project, angle } (project.slug)}
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
              <p class="mt-2 text-base text-foreground-secondary line-clamp-2">{angle}</p>
            </a>
          {/each}
        </div>
      </div>
    </section>
  {/if}

  <!-- ─── TESTIMONIALS ─────────────────────────────────────────────────── -->
  {#if featuredTestimonials.length > 0}
    <UpworkTestimonials
      items={featuredTestimonials.slice(0, 3)}
      title="What clients say."
      subtitle="From teams we've shipped for."
      description="Verified Upwork reviews from {location.shortName} and global clients across 8+ years of work."
    />
  {/if}

  <!-- ─── TEAM ─────────────────────────────────────────────────────────── -->
  <TeamSection
    title="The people behind the work."
    subtitle="Hire them directly."
    showViewAll
  />

  <!-- ─── FAQ ──────────────────────────────────────────────────────────── -->
  <section id="faq" aria-labelledby="faq-heading" class="border-t">
    <div class="container mx-auto px-container py-12 md:py-20">
      <h2 id="faq-heading" class="text-5xl text-foreground-secondary md:text-6xl">FAQ.</h2>
      <p class="text-5xl md:text-6xl">{location.shortName}-specific questions.</p>

      <div class="mt-12 grid gap-x-12 gap-y-8 md:mt-16 lg:grid-cols-2">
        {#each location.faq as item (item.question)}
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
                aria-hidden="true"
              >
                <path
                  d="M10 4v12M4 10h12"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
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
          <h2 class="text-5xl text-foreground-secondary md:text-6xl">Ready to start?</h2>
          <p class="text-5xl md:text-6xl">Let's chat.</p>
          <p class="mt-6 max-w-xl text-lg leading-relaxed text-foreground-secondary md:text-xl">
            Tell us what you're building. We reply within 24 hours, hop on a quick intro call,
            walk you through relevant {location.shortName} client work, and take it from there.
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

<FloatingHireCta label="Hire from {location.shortName}" />
