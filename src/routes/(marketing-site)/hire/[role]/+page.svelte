<script lang="ts">
  import OptimizedImage from '$components/optimized-image.svelte';
  import ContactForm from '$components/contact-form.svelte';
  import UpworkTestimonials from '$components/sections/upwork-testimonials.svelte';
  import {
    BASE_URL,
    generateBreadcrumbSchema,
    generateServiceSchema,
    generateFAQSchema
  } from '$lib/utils/schema';
  import { engagementModels, hiringProcess, sharedFaq, hireRoles } from '$lib/data/hire-roles';

  export let data;

  $: role = data.role;
  $: matchingProjects = data.matchingProjects;
  $: matchingTestimonials = data.matchingTestimonials;

  /** Combined unique FAQ — role-specific first, then shared. */
  $: combinedFaq = [...role.faq, ...sharedFaq];

  /** Cross-link related roles. */
  $: relatedRoles = (role.relatedRoles || [])
    .map((slug) => hireRoles.find((r) => r.slug === slug))
    .filter((r): r is typeof hireRoles[number] => Boolean(r));

  $: serviceJsonLd = generateServiceSchema(
    role.h1,
    role.metaDescription,
    '/og.png'
  );
  $: faqJsonLd = generateFAQSchema(combinedFaq);
  $: breadcrumbJsonLd = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Hire', url: '/hire' },
    { name: role.title, url: `/hire/${role.slug}` }
  ]);
</script>

<svelte:head>
  <title>{role.metaTitle}</title>
  <meta name="description" content={role.metaDescription} />

  <meta property="og:type" content="website" />
  <meta property="og:title" content={role.metaTitle} />
  <meta property="og:description" content={role.metaDescription} />
  <meta property="og:image" content="{BASE_URL}/og.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@TechyorDotCo" />
  <meta name="twitter:title" content={role.metaTitle} />
  <meta name="twitter:description" content={role.metaDescription} />
  <meta name="twitter:image" content="{BASE_URL}/og.png" />

  {@html `<${'script'} type="application/ld+json">${serviceJsonLd}</${'script'}>`}
  {@html `<${'script'} type="application/ld+json">${faqJsonLd}</${'script'}>`}
  {@html `<${'script'} type="application/ld+json">${breadcrumbJsonLd}</${'script'}>`}
</svelte:head>

<main class="overflow-hidden">
  <!-- Breadcrumbs -->
  <div class="container mx-auto px-container pt-8 text-sm text-foreground-secondary">
    <a href="/" class="transition-colors hover:text-foreground">Home</a>
    <span class="mx-2">/</span>
    <a href="/services" class="transition-colors hover:text-foreground">Hire</a>
    <span class="mx-2">/</span>
    <span class="text-foreground">{role.title}</span>
  </div>

  <!-- Hero -->
  <section class="container mx-auto mt-8 px-container md:mt-14 lg:mt-20">
    <h1 class="text-5xl md:text-6xl lg:text-7xl">{role.h1}.</h1>
    <p class="mt-6 max-w-3xl text-xl leading-relaxed text-foreground-secondary md:text-2xl">
      {role.subhead}
    </p>

    <div class="mt-10 flex flex-wrap gap-4">
      <a
        href="/get-a-quote"
        class="inline-flex h-12 items-center justify-center gap-1.5 rounded-md border border-foreground bg-foreground px-7 font-medium text-background outline-none transition-all hover:ring-4 focus-visible:ring-4 active:scale-[0.98] active:ring-2"
      >
        <span>Hire {role.title.toLowerCase()}s</span>
        <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 8.5h9M8.5 4.5l3.5 4-3.5 4" stroke="currentColor" stroke-width="1.2" />
        </svg>
      </a>
      <a
        href="#process"
        class="inline-flex h-12 items-center justify-center gap-1.5 rounded-md border border-border px-7 font-medium outline-none transition-all hover:border-foreground hover:ring-4 focus-visible:border-foreground focus-visible:ring-4 active:scale-[0.98] active:ring-2"
      >
        See how we hire
      </a>
    </div>
  </section>

  <!-- Intro paragraph -->
  <section class="container mx-auto mt-16 px-container md:mt-24">
    <p class="max-w-4xl text-lg leading-relaxed text-foreground-secondary md:text-xl">
      {role.intro}
    </p>
  </section>

  <!-- Why us -->
  <section class="border-t mt-16 md:mt-24">
    <div class="container mx-auto px-container py-12 md:py-20">
      <p class="text-xs uppercase tracking-wider text-foreground-secondary">Why Techyor</p>
      <h2 class="mt-3 text-4xl md:text-5xl">Senior. Specialist. Shipping.</h2>

      <div class="mt-12 grid gap-10 md:grid-cols-3">
        {#each role.whyUs as point (point.title)}
          <div>
            <h3 class="text-xl font-semibold">{point.title}</h3>
            <p class="mt-3 text-base leading-relaxed text-foreground-secondary">
              {point.description}
            </p>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Skills + Tech stack -->
  <section class="border-t">
    <div class="container mx-auto px-container py-12 md:py-20">
      <p class="text-xs uppercase tracking-wider text-foreground-secondary">What they cover</p>
      <h2 class="mt-3 text-4xl md:text-5xl">Skills and stack.</h2>

      <div class="mt-12 grid gap-12 lg:grid-cols-2">
        <div>
          <h3 class="text-sm uppercase tracking-wider text-foreground-secondary">Capabilities</h3>
          <ul class="mt-5 space-y-3">
            {#each role.skills as skill (skill)}
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
                <span class="text-base">{skill}</span>
              </li>
            {/each}
          </ul>
        </div>

        <div>
          <h3 class="text-sm uppercase tracking-wider text-foreground-secondary">Tech stack</h3>
          <div class="mt-5 flex flex-wrap gap-2">
            {#each role.techStack as tech (tech)}
              <span
                class="inline-flex items-center rounded-md border border-border bg-background-offset px-3 py-1.5 text-sm"
              >
                {tech}
              </span>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Sample work -->
  {#if matchingProjects.length > 0}
    <section class="border-t">
      <div class="container mx-auto px-container py-12 md:py-20">
        <p class="text-xs uppercase tracking-wider text-foreground-secondary">Selected work</p>
        <h2 class="mt-3 text-4xl md:text-5xl">{role.title}s in the wild.</h2>
        <p class="mt-4 max-w-2xl text-lg text-foreground-secondary">
          A small slice of {matchingProjects.length} project{matchingProjects.length !== 1 ? 's' : ''}
          {matchingProjects.length === 1 ? 'we shipped' : 'we shipped'} where this role led the work.
        </p>

        <div class="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {#each matchingProjects as project (project.slug)}
            <a
              href={`/projects/${project.slug}`}
              class="group block transition-opacity hover:opacity-95"
            >
              <div class="aspect-[4/3] overflow-hidden rounded-md bg-background-offset">
                <OptimizedImage
                  class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  src={project.image}
                  alt={project.name}
                  width="800"
                  height="600"
                />
              </div>
              <h3 class="mt-4 text-xl font-semibold">{project.name}</h3>
              <p class="mt-2 text-base text-foreground-secondary line-clamp-2">
                {project.tagline}
              </p>
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

  <!-- Engagement models -->
  <section class="border-t">
    <div class="container mx-auto px-container py-12 md:py-20">
      <p class="text-xs uppercase tracking-wider text-foreground-secondary">How you can hire</p>
      <h2 class="mt-3 text-4xl md:text-5xl">Three ways to engage.</h2>

      <div class="mt-12 grid gap-8 md:grid-cols-3">
        {#each engagementModels as model (model.title)}
          <div class="rounded-lg border border-border bg-background-offset/30 p-6">
            <h3 class="text-xl font-semibold">{model.title}</h3>
            <p class="mt-3 text-base leading-relaxed text-foreground-secondary">
              {model.description}
            </p>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Process -->
  <section id="process" class="border-t">
    <div class="container mx-auto px-container py-12 md:py-20">
      <p class="text-xs uppercase tracking-wider text-foreground-secondary">How it works</p>
      <h2 class="mt-3 text-4xl md:text-5xl">From intro call to onboarded.</h2>

      <ol class="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-5">
        {#each hiringProcess as step (step.step)}
          <li>
            <div
              class="flex h-10 w-10 items-center justify-center rounded-full border border-foreground bg-background text-base font-semibold"
            >
              {step.step}
            </div>
            <h3 class="mt-4 text-lg font-semibold">{step.title}</h3>
            <p class="mt-2 text-sm leading-relaxed text-foreground-secondary">
              {step.description}
            </p>
          </li>
        {/each}
      </ol>
    </div>
  </section>

  <!-- Testimonials -->
  {#if matchingTestimonials.length > 0}
    <UpworkTestimonials
      items={matchingTestimonials}
      title="What clients say."
      subtitle={`On ${role.title.toLowerCase()} work.`}
      description="Verified Upwork reviews from teams we've shipped for."
    />
  {/if}

  <!-- FAQ -->
  <section class="border-t">
    <div class="container mx-auto px-container py-12 md:py-20">
      <p class="text-xs uppercase tracking-wider text-foreground-secondary">FAQ</p>
      <h2 class="mt-3 text-4xl md:text-5xl">Common questions.</h2>

      <div class="mt-12 grid gap-8 lg:grid-cols-2">
        {#each combinedFaq as item (item.question)}
          <div>
            <h3 class="text-lg font-semibold">{item.question}</h3>
            <p class="mt-3 text-base leading-relaxed text-foreground-secondary">
              {item.answer}
            </p>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Related roles -->
  {#if relatedRoles.length > 0}
    <section class="border-t">
      <div class="container mx-auto px-container py-12 md:py-20">
        <p class="text-xs uppercase tracking-wider text-foreground-secondary">Related roles</p>
        <h2 class="mt-3 text-3xl md:text-4xl">Also worth a look.</h2>

        <div class="mt-8 flex flex-wrap gap-3">
          {#each relatedRoles as related (related.slug)}
            <a
              href={`/hire/${related.slug}`}
              class="rounded-md border border-border px-4 py-2 text-sm transition-all hover:border-foreground hover:bg-foreground-tertiary/5"
            >
              Hire {related.title}
            </a>
          {/each}
        </div>
      </div>
    </section>
  {/if}

  <!-- Final CTA -->
  <section class="border-t">
    <div class="container mx-auto px-container py-12 md:py-20">
      <div class="grid gap-12 lg:grid-cols-2">
        <div>
          <h2 class="text-4xl md:text-5xl">Ready to hire?</h2>
          <p class="mt-4 max-w-xl text-lg text-foreground-secondary">
            Tell us what you're building. We'll reply within 24 hours with a shortlist of senior
            {role.title.toLowerCase()}s, profiles, and availability.
          </p>
          <p class="mt-4 text-sm text-foreground-secondary">
            Or email <a class="underline" href="mailto:info@techyor.com">info@techyor.com</a>.
          </p>
        </div>
        <div>
          <ContactForm />
        </div>
      </div>
    </div>
  </section>
</main>
