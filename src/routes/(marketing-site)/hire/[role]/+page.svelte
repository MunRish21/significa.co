<script lang="ts">
  import OptimizedImage from '$components/optimized-image.svelte';
  import ContactForm from '$components/contact-form.svelte';
  import UpworkTestimonials from '$components/sections/upwork-testimonials.svelte';
  import TeamSection from '$components/sections/team-section.svelte';
  import FloatingHireCta from '$components/floating-hire-cta.svelte';
  import {
    BASE_URL,
    generateBreadcrumbSchema,
    generateHireRoleSchema,
    generateFAQSchema,
    generateHowToSchema,
    generateTeamMembersSchema
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

  $: serviceJsonLd = generateHireRoleSchema({
    roleTitle: role.title,
    h1: role.h1,
    description: role.metaDescription,
    url: `${BASE_URL}/hire/${role.slug}`,
    serviceType: `${role.title} hiring and staff augmentation`,
    techStack: role.techStack,
    engagementModels,
    ratings: data.ratings,
    reviews: data.reviewEntries,
    imagePath: `/api/og/${role.slug}`
  });
  $: faqJsonLd = generateFAQSchema(combinedFaq);
  $: breadcrumbJsonLd = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Hire', url: '/hire' },
    { name: role.title, url: `/hire/${role.slug}` }
  ]);
  $: howToJsonLd = generateHowToSchema({
    name: `How to hire a ${role.title} from Techyor`,
    description:
      'A simple three-step process: book a quick intro call, hear our experience and approach, and start work that week.',
    totalTime: 'P10D',
    steps: hiringProcess.map((s) => ({ name: s.title, text: s.description }))
  });
  $: teamJsonLd = generateTeamMembersSchema(data.teamSchemaMembers);

  /** Smooth-scroll to contact form. */
  function scrollToContact(event: MouseEvent) {
    event.preventDefault();
    const target = document.getElementById('contact-form');
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
</script>

<svelte:head>
  <title>{role.metaTitle}</title>
  <meta name="description" content={role.metaDescription} />

  <meta property="og:type" content="website" />
  <meta property="og:title" content={role.metaTitle} />
  <meta property="og:description" content={role.metaDescription} />
  <meta property="og:image" content="{BASE_URL}/api/og/{role.slug}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Hire senior {role.title}s — Techyor" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@TechyorDotCo" />
  <meta name="twitter:title" content={role.metaTitle} />
  <meta name="twitter:description" content={role.metaDescription} />
  <meta name="twitter:image" content="{BASE_URL}/api/og/{role.slug}" />
  <meta name="twitter:image:alt" content="Hire senior {role.title}s — Techyor" />

  {@html `<${'script'} type="application/ld+json">${serviceJsonLd}</${'script'}>`}
  {@html `<${'script'} type="application/ld+json">${faqJsonLd}</${'script'}>`}
  {@html `<${'script'} type="application/ld+json">${breadcrumbJsonLd}</${'script'}>`}
  {@html `<${'script'} type="application/ld+json">${howToJsonLd}</${'script'}>`}
  {@html `<${'script'} type="application/ld+json">${teamJsonLd}</${'script'}>`}
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

  <!-- ─── HERO ─────────────────────────────────────────────────────────── -->
  <section class="container mx-auto mt-8 px-container md:mt-14 lg:mt-20">
    <div
      class="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background-offset/40 px-3 py-1.5 text-xs uppercase tracking-wider text-foreground-secondary"
    >
      <span class="inline-block h-1.5 w-1.5 rounded-full bg-green-500" aria-hidden="true"></span>
      Available — replies within 24 hours
    </div>

    <h1 class="text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">{role.h1}.</h1>
    <p class="mt-6 max-w-3xl text-xl leading-relaxed text-foreground-secondary md:text-2xl">
      {role.subhead}
    </p>

    <div class="mt-10 flex flex-wrap gap-4">
      <a
        href="#contact-form"
        on:click={scrollToContact}
        class="inline-flex h-12 items-center justify-center gap-1.5 rounded-md border border-foreground bg-foreground px-7 font-medium text-background outline-none transition-all hover:ring-4 focus-visible:ring-4 active:scale-[0.98] active:ring-2"
      >
        <span>Hire {role.title.toLowerCase()}s</span>
        <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 3v9M11.5 8.5l-3.5 3.5-3.5-3.5" stroke="currentColor" stroke-width="1.2" />
        </svg>
      </a>
      <a
        href="#process"
        class="inline-flex h-12 items-center justify-center gap-1.5 rounded-md border border-border px-7 font-medium outline-none transition-all hover:border-foreground hover:ring-4 focus-visible:border-foreground focus-visible:ring-4 active:scale-[0.98] active:ring-2"
      >
        See how it works
      </a>
    </div>

    <!-- Trust strip -->
    <div class="mt-14 grid grid-cols-2 gap-6 border-y py-8 md:grid-cols-4 md:gap-8 md:py-10">
      <div class="flex flex-col">
        <p class="text-3xl font-bold md:text-4xl">80+</p>
        <p class="mt-1 text-sm text-foreground-secondary md:text-base">Products shipped</p>
      </div>
      <div class="flex flex-col">
        <p class="text-3xl font-bold md:text-4xl">8+ yrs</p>
        <p class="mt-1 text-sm text-foreground-secondary md:text-base">In production</p>
      </div>
      <div class="flex flex-col">
        <p class="text-3xl font-bold md:text-4xl">5–10 days</p>
        <p class="mt-1 text-sm text-foreground-secondary md:text-base">Time to start</p>
      </div>
      <div class="flex flex-col">
        <p class="text-3xl font-bold md:text-4xl">24h</p>
        <p class="mt-1 text-sm text-foreground-secondary md:text-base">Reply time</p>
      </div>
    </div>
  </section>

  <!-- ─── INTRO ────────────────────────────────────────────────────────── -->
  <section
    id="overview"
    aria-labelledby="overview-heading"
    class="container mx-auto mt-16 px-container md:mt-24"
  >
    <h2 id="overview-heading" class="sr-only">Overview</h2>
    <p
      data-speakable
      class="max-w-4xl text-lg leading-relaxed text-foreground-secondary md:text-xl"
    >
      {role.intro}
    </p>
  </section>

  <!-- ─── WHY TECHYOR — slogan-style eyebrow ───────────────────────────── -->
  <section id="why-us" aria-labelledby="why-us-heading" class="border-t mt-16 md:mt-24">
    <div class="container mx-auto px-container py-12 md:py-20">
      <h2 id="why-us-heading" class="text-5xl text-foreground-secondary md:text-6xl">
        Why Techyor.
      </h2>
      <p class="text-5xl md:text-6xl">Senior. Specialist. Shipping.</p>

      <div class="mt-12 grid gap-10 md:mt-16 md:grid-cols-3 md:gap-12">
        {#each role.whyUs as point, i (point.title)}
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

  <!-- ─── SKILLS + STACK — service-content style ───────────────────────── -->
  <section
    id="skills"
    aria-labelledby="skills-heading"
    class="border-t bg-background-offset/30"
  >
    <div class="container mx-auto px-container py-12 md:py-20">
      <h2 id="skills-heading" class="text-5xl text-foreground-secondary md:text-6xl">
        What they cover.
      </h2>
      <p class="text-5xl md:text-6xl">Skills and stack.</p>

      <div class="mt-12 grid gap-12 md:mt-16 lg:grid-cols-[2fr_1fr] lg:gap-20">
        <!-- Capabilities checklist -->
        <div class="border-t border-border pt-8">
          <p class="mb-6 text-sm uppercase tracking-wider text-foreground-secondary">
            Capabilities
          </p>
          <ul class="grid gap-x-8 gap-y-4 md:grid-cols-2">
            {#each role.skills as skill (skill)}
              <li class="flex items-start gap-3 border-b border-border/50 pb-4">
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
                <span class="text-base leading-relaxed">{skill}</span>
              </li>
            {/each}
          </ul>
        </div>

        <!-- Tech stack chips -->
        <div class="border-t border-border pt-8">
          <p class="mb-6 text-sm uppercase tracking-wider text-foreground-secondary">Tech stack</p>
          <div class="flex flex-wrap gap-2">
            {#each role.techStack as tech (tech)}
              <span
                class="inline-flex items-center rounded-md border border-border bg-background px-3 py-1.5 text-sm transition-colors hover:border-foreground"
              >
                {tech}
              </span>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ─── TEAM ─────────────────────────────────────────────────────────── -->
  <TeamSection
    title="The people behind the work."
    subtitle="Hire them directly."
    showViewAll
  />

  <!-- ─── SAMPLE WORK ──────────────────────────────────────────────────── -->
  {#if matchingProjects.length > 0}
    <section id="work" aria-labelledby="work-heading" class="border-t">
      <div class="container mx-auto px-container py-12 md:py-20">
        {#if data.projectsAreFallback}
          <h2 id="work-heading" class="text-5xl text-foreground-secondary md:text-6xl">
            Recent work.
          </h2>
          <p class="text-5xl md:text-6xl">A taste of what we ship.</p>
          <p class="mt-6 max-w-2xl text-lg text-foreground-secondary md:text-xl">
            A small slice of recent projects across stacks. Browse the full portfolio for more.
          </p>
        {:else}
          <h2 id="work-heading" class="text-5xl text-foreground-secondary md:text-6xl">
            Selected work.
          </h2>
          <p class="text-5xl md:text-6xl">{role.title}s in the wild.</p>
          <p class="mt-6 max-w-2xl text-lg text-foreground-secondary md:text-xl">
            A small slice of {matchingProjects.length} project{matchingProjects.length !== 1
              ? 's'
              : ''} where this role led the work.
          </p>
        {/if}

        <div class="mt-12 grid gap-8 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {#each matchingProjects as project (project.slug)}
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
              <p class="mt-2 text-base text-foreground-secondary line-clamp-2">
                {project.tagline}
              </p>
            </a>
          {/each}
        </div>

        <div class="mt-12">
          <a
            href={data.viewAllUrl}
            class="inline-flex h-11 items-center gap-1.5 rounded-md border border-border px-5 font-medium transition-all hover:border-foreground hover:ring-4 focus-visible:border-foreground focus-visible:ring-4"
          >
            {data.viewAllLabel}
            <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 8.5h9M8.5 4.5l3.5 4-3.5 4" stroke="currentColor" stroke-width="1.2" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  {/if}

  <!-- ─── ENGAGEMENT MODELS ────────────────────────────────────────────── -->
  <section
    id="engagement"
    aria-labelledby="engagement-heading"
    class="border-t bg-background-offset/30"
  >
    <div class="container mx-auto px-container py-12 md:py-20">
      <h2 id="engagement-heading" class="text-5xl text-foreground-secondary md:text-6xl">
        How you can hire.
      </h2>
      <p class="text-5xl md:text-6xl">Three ways to engage.</p>

      <div class="mt-12 grid gap-6 md:mt-16 md:grid-cols-3 md:gap-8">
        {#each engagementModels as model, i (model.title)}
          <div
            class="group relative rounded-xl border border-border bg-background p-6 transition-all hover:-translate-y-1 hover:border-foreground hover:shadow-lg md:p-8"
          >
            <span
              class="absolute right-6 top-6 text-sm text-foreground-secondary md:right-8 md:top-8"
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

  <!-- ─── PROCESS ──────────────────────────────────────────────────────── -->
  <section id="process" aria-labelledby="process-heading" class="border-t">
    <div class="container mx-auto px-container py-12 md:py-20">
      <h2 id="process-heading" class="text-5xl text-foreground-secondary md:text-6xl">
        How it works.
      </h2>
      <p class="text-5xl md:text-6xl">Simple. No theatre.</p>

      <ol class="mt-12 grid gap-10 md:mt-16 md:grid-cols-3 md:gap-12">
        {#each hiringProcess as step (step.step)}
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

      <div class="mt-12">
        <a
          href="#contact-form"
          on:click={scrollToContact}
          class="inline-flex h-12 items-center justify-center gap-1.5 rounded-md border border-foreground bg-foreground px-7 font-medium text-background transition-all hover:ring-4 focus-visible:ring-4 active:scale-[0.98]"
        >
          Book the intro call
          <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 8.5h9M8.5 4.5l3.5 4-3.5 4" stroke="currentColor" stroke-width="1.2" />
          </svg>
        </a>
      </div>
    </div>
  </section>

  <!-- ─── TESTIMONIALS ─────────────────────────────────────────────────── -->
  {#if matchingTestimonials.length > 0}
    <UpworkTestimonials
      items={matchingTestimonials}
      title="What clients say."
      subtitle={`On ${role.title.toLowerCase()} work.`}
      description="Verified Upwork reviews from teams we've shipped for."
    />
  {/if}

  <!-- ─── FAQ ──────────────────────────────────────────────────────────── -->
  <section id="faq" aria-labelledby="faq-heading" class="border-t">
    <div class="container mx-auto px-container py-12 md:py-20">
      <h2 id="faq-heading" class="text-5xl text-foreground-secondary md:text-6xl">FAQ.</h2>
      <p class="text-5xl md:text-6xl">Common questions.</p>

      <div class="mt-12 grid gap-x-12 gap-y-8 md:mt-16 lg:grid-cols-2">
        {#each combinedFaq as item (item.question)}
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

  <!-- ─── RELATED ROLES ────────────────────────────────────────────────── -->
  {#if relatedRoles.length > 0}
    <section class="border-t bg-background-offset/30">
      <div class="container mx-auto px-container py-12 md:py-20">
        <h2 class="text-3xl text-foreground-secondary md:text-4xl">Related roles.</h2>
        <p class="text-3xl md:text-4xl">Also worth a look.</p>

        <div class="mt-8 flex flex-wrap gap-3">
          {#each relatedRoles as related (related.slug)}
            <a
              href={`/hire/${related.slug}`}
              class="rounded-md border border-border bg-background px-4 py-2.5 text-sm transition-all hover:border-foreground hover:bg-foreground hover:text-background"
            >
              Hire {related.title} →
            </a>
          {/each}
        </div>
      </div>
    </section>
  {/if}

  <!-- ─── CONTACT FORM ─────────────────────────────────────────────────── -->
  <section id="contact-form" class="border-t scroll-mt-20">
    <div class="container mx-auto px-container py-12 md:py-20">
      <div class="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2 class="text-5xl text-foreground-secondary md:text-6xl">Ready to start?</h2>
          <p class="text-5xl md:text-6xl">Let's chat.</p>
          <p class="mt-6 max-w-xl text-lg leading-relaxed text-foreground-secondary md:text-xl">
            Tell us what you're building. We will reply within 24 hours, hop on a quick intro call,
            walk you through relevant work we have shipped, and take it from there.
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

<FloatingHireCta label="Hire {role.title}s" />

