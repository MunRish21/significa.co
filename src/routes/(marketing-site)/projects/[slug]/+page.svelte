<script lang="ts">
  import { page } from '$app/stores';
  import { slide } from 'svelte/transition';
  import { projectsData, getProjectBySlug } from '$lib/data/projects';
  import { getServiceDescription } from '$lib/data/service-descriptions';
  import ComparisonSlider from '$components/blocks/project-blocks/comparison-slider.svelte';
  import Testimonial from '$components/blocks/project-blocks/testimonial.svelte';
  import VideoSection from '$components/blocks/project-blocks/video-section.svelte';
  import ImageSection from '$components/blocks/project-blocks/image-section.svelte';
  import TeamSection from '$components/blocks/project-blocks/team-section.svelte';
  import MetricsSection from '$components/blocks/project-blocks/metrics-section.svelte';
  import ContactCtaSection from '$components/blocks/project-blocks/contact-cta-section.svelte';
  import OptimizedImage from '$components/optimized-image.svelte';
  import ContactForm from '$components/contact-form.svelte';
  import { generateBreadcrumbSchema, generateProjectSchema, BASE_URL } from '$lib/utils/schema';

  export let data;

  const projectsMap: Record<string, any> = {
    'monster-fairings': {
      id: 11,
      slug: 'monster-fairings',
      name: 'Monster Fairings.',
      tagline:
        'A comprehensive e-commerce platform for custom motorcycle fairings with advanced AI integration and complex payment structures.',
      coverImage: '/assets/projects/monster-fairings/cover.jpg',
      publishedYear: 2021,
      services: [
        'Web Design',
        'User Experience Design',
        'User Interface Design',
        'Front-end Development',
        'Back-end Development',
        'E-commerce Strategy',
        'Project Management',
        'AI Integration',
        'Payment Systems'
      ],
      deliverables: [
        'Website',
        'E-commerce Platform',
        'AI Visualization System',
        'Payment Gateway'
      ],
      links: [{ label: 'Website', url: 'https://monsterfairings.com/' }],
      team: [],
      metrics: [
        { label: 'Products', value: '5000+', tooltip: 'Product Catalog', isPositive: true },
        { label: 'Countries', value: '7+', tooltip: 'Shipping Destinations', isPositive: true }
      ],
      intro:
        'Monster Fairings is a premier e-commerce platform specializing in custom motorcycle fairings for riders worldwide. We engineered a sophisticated platform managing 5000+ products with a complex payment structure supporting multiple business models. The system features an advanced filtering architecture, AI-powered fairings visualization kit allowing riders to see products on their bikes, comprehensive email management capabilities, and robust speed and security infrastructure. The platform seamlessly handles inventory management, customization options, international shipping, and delivers a superior shopping experience across multiple markets.'
    }
  };

  let projectsToShow = 8;
  const PROJECTS_PER_LOAD = 8;
  let showFilters = true;

  $: project = data.isProject
    ? getProjectBySlug($page.params.slug) || projectsMap[$page.params.slug]
    : null;

  $: filteredProjects = data.isFilter ? data.filteredProjects : [];

  $: visibleProjects = filteredProjects.slice(0, projectsToShow).map((p) => ({
    ...p,
    category: p.deliverables?.[0] || 'Project'
  }));

  $: hasMore = filteredProjects.length > projectsToShow;

  function getFilterUrl(filter: string): string {
    const slug = filter
      .toLowerCase()
      .replace(/&/g, '')  // Remove ampersand
      .replace(/\s+/g, '-')  // Replace spaces with dashes
      .replace(/[^\w-]/g, '');  // Remove special characters
    return `/projects/${slug}`;
  }

  function loadMore() {
    projectsToShow += PROJECTS_PER_LOAD;
  }

  function isActiveFilter(filter: string): boolean {
    return data.filterName === filter;
  }

  $: if (data.isFilter) {
    // Count services and sort by frequency (descending)
    const serviceCount = new Map<string, number>();
    projectsData.forEach((p) => {
      p.services.forEach((s) => {
        serviceCount.set(s, (serviceCount.get(s) || 0) + 1);
      });
    });
    filterServices = Array.from(serviceCount.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([service]) => service);

    // Count deliverables and sort by frequency (descending)
    const deliverableCount = new Map<string, number>();
    projectsData.forEach((p) => {
      p.deliverables.forEach((d) => {
        deliverableCount.set(d, (deliverableCount.get(d) || 0) + 1);
      });
    });
    filterDeliverables = Array.from(deliverableCount.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([deliverable]) => deliverable);
  }

  let filterServices: string[] = [];
  let filterDeliverables: string[] = [];
</script>

<svelte:head>
  {#if project}
    {@const projectImage = project.coverImage || project.image || '/og.png'}
    {@const absoluteImage = projectImage.startsWith('http')
      ? projectImage
      : `${BASE_URL}${projectImage}`}
    <title>{project.name} — {project.deliverables?.[0] || 'Case Study'} | Techyor</title>
    <meta name="description" content={project.tagline} />

    <meta property="og:type" content="article" />
    <meta
      property="og:title"
      content="{project.name} — {project.deliverables?.[0] || 'Case Study'} | Techyor"
    />
    <meta property="og:description" content={project.tagline} />
    <meta property="og:image" content={absoluteImage} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content={project.name} />
    <meta property="article:published_time" content="{project.publishedYear}-01-01" />
    <meta property="article:author" content="Techyor" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@TechyorDotCo" />
    <meta name="twitter:title" content="{project.name} — Techyor" />
    <meta name="twitter:description" content={project.tagline} />
    <meta name="twitter:image" content={absoluteImage} />

    <script type="application/ld+json">
{generateBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Projects', url: '/projects' },
      { name: project.name, url: `/projects/${project.slug}` }
    ])}
    </script>
    <script type="application/ld+json">
{generateProjectSchema(
      project.name,
      project.tagline,
      project.coverImage || project.image,
      `/projects/${project.slug}`,
      project.publishedYear
    )}
    </script>
  {:else if data.isFilter}
    <title>{data.filterName} Projects — Techyor Portfolio</title>
    <meta
      name="description"
      content="Browse Techyor projects in {data.filterName}. Custom websites, web apps, mobile apps, e-commerce, AI tools, and automation built for ambitious teams."
    />

    <meta property="og:type" content="website" />
    <meta property="og:title" content="{data.filterName} Projects — Techyor" />
    <meta property="og:description" content="Browse Techyor projects in {data.filterName}." />
    <meta property="og:image" content="https://www.techyor.com/og.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@TechyorDotCo" />
    <meta name="twitter:title" content="{data.filterName} Projects — Techyor" />
    <meta name="twitter:description" content="Browse Techyor projects in {data.filterName}." />
    <meta name="twitter:image" content="https://www.techyor.com/og.png" />

    <script type="application/ld+json">
{generateBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Projects', url: '/projects' },
      { name: data.filterName, url: `/projects/${data.filterName.toLowerCase().replace(/\s+/g, '-')}` }
    ])}
    </script>
  {:else}
    <title>Project Not Found — Techyor</title>
    <meta name="robots" content="noindex, nofollow" />
  {/if}
</svelte:head>

{#if data.isFilter}
  <main class="overflow-hidden">
    <!-- Hero Section -->
    <div class="container mx-auto mt-10 px-container md:mt-14 lg:mt-20">
      <div class="mb-6 flex items-center gap-3">
        <a
          href="/projects"
          class="text-foreground-secondary transition-colors hover:text-foreground">Projects</a
        >
        <span class="text-foreground-secondary">/</span>
        <h1 class="text-5xl capitalize md:text-6xl lg:text-7xl">{data.filterName}</h1>
      </div>

      <!-- Intro Paragraph -->
      <p class="max-w-3xl text-base leading-relaxed text-foreground-secondary md:text-lg">
        {getServiceDescription(data.filterName)}
      </p>

      <!-- Action Buttons -->
      <div class="mt-8 flex flex-wrap gap-4">
        <a
          href="#projects-section"
          class="inline-flex items-center justify-center gap-2 rounded-md border border-border px-6 py-3 font-medium text-foreground transition-all hover:border-border-active hover:ring-4 focus-visible:border-border-active focus-visible:ring-4"
        >
          <span>View Our Work</span>
          <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 3v10M3.5 8.5l4.5 4.5 4.5-4.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </a>

        <a
          href="#testimonials-section"
          class="inline-flex items-center justify-center gap-2 rounded-md border border-border px-6 py-3 font-medium text-foreground-secondary transition-all hover:text-foreground hover:border-border-active focus-visible:border-border-active focus-visible:ring-4"
        >
          <span>See What Clients Say</span>
          <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 4h12M2 8h12M2 12h8" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
          </svg>
        </a>
      </div>
    </div>

    <!-- Filters Button -->
    <div
      class="lg:mt-18 container mx-auto mb-3 mt-8 flex items-center justify-between px-container md:mt-12"
    >
      <div class="flex items-center gap-2">
        <button
          class="inline-flex items-center gap-2 rounded-xs outline-none transition-opacity hover:opacity-80 focus-visible:ring-4 active:opacity-70"
          on:click={() => (showFilters = !showFilters)}
        >
          <i data-icon="configuration" aria-hidden="true">
            <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M4.4 5.1v2h1.2V5H13V4H5.6V2H4.4v2H2V5h2.4Zm5 5.6v-2h1.2v2H13V12h-2.4v2H9.4v-2H2v-1.2h7.4Z"
                fill="currentColor"
              />
              <path
                d="m2 4.5 1.2-.1L4.6 4c.6 0 1 0 1.6.2l1.6.1 2 .2c.3 0 .7.3 1.1.3h1.6"
                stroke="currentColor"
                stroke-width="1.2"
                stroke-linecap="round"
              />
              <path
                d="m5 1.9-.1 1.8-.3 1.5v1.5M2 11.3h1.5l.8.4 1.2.2h1.4l3.7-.2 1.6-.2h.5"
                stroke="currentColor"
                stroke-width="1.2"
                stroke-linecap="round"
              />
              <path
                d="M10.2 8.8a7.3 7.3 0 0 1-.5 2.9l-.1.6c0 .4 0 1 .2 1.4"
                stroke="currentColor"
                stroke-width="1.2"
                stroke-linecap="round"
              />
            </svg>
          </i>
          <span>{showFilters ? 'Close' : 'Filters'}</span>
        </button>
      </div>
    </div>

    <!-- Filter Panel -->
    {#if showFilters}
      <div transition:slide|global={{ duration: 300 }} class="border-b">
        <div class="container mx-auto px-container py-8 md:flex md:gap-12">
          {#if filterServices.length > 0}
            <div>
              <p class="mb-4 text-xs uppercase tracking-wider text-foreground-secondary">
                Services
              </p>
              <div class="flex flex-wrap gap-2">
                {#each filterServices as service}
                  <a
                    href={getFilterUrl(service)}
                    class="rounded border px-3 py-1.5 text-sm transition-all {isActiveFilter(service)
                      ? 'border-foreground bg-foreground text-background'
                      : 'border-border hover:border-foreground hover:bg-foreground-tertiary/5'}"
                  >
                    {service}
                  </a>
                {/each}
              </div>
            </div>
          {/if}
          {#if filterDeliverables.length > 0}
            <div class="mt-6 md:mt-0">
              <p class="mb-4 text-xs uppercase tracking-wider text-foreground-secondary">
                Deliverables
              </p>
              <div class="flex flex-wrap gap-2">
                {#each filterDeliverables as deliverable}
                  <a
                    href={getFilterUrl(deliverable)}
                    class="rounded border px-3 py-1.5 text-sm transition-all {isActiveFilter(deliverable)
                      ? 'border-foreground bg-foreground text-background'
                      : 'border-border hover:border-foreground hover:bg-foreground-tertiary/5'}"
                  >
                    {deliverable}
                  </a>
                {/each}
              </div>
            </div>
          {/if}
        </div>
      </div>
    {/if}

    <!-- Projects List -->
    <section id="projects-section" class="mt-12">
      {#each visibleProjects as project, index (project.id)}
        {#if index === 0}
          <!-- First Project - Simple Design -->
          <div
            class="group border-b py-12 transition-colors elevated-links @container first:border-t hover:bg-foreground-tertiary/10"
          >
            <div class="container mx-auto px-container">
              <div class="items-end justify-between @5xl:flex">
                <div class="mr-6">
                  <a class="elevated-link" href={`/projects/${project.slug}`}>
                    <h2 class="text-5xl text-foreground-secondary">
                      {project.name}
                    </h2>
                    <p class="max-w-3xl text-5xl">
                      {project.tagline}
                    </p>
                  </a>
                </div>
                <a
                  class="text-md group relative mt-6 inline-flex h-11 items-center justify-center gap-1.5 overflow-hidden whitespace-nowrap rounded-md border border-border px-5 font-medium leading-none text-foreground outline-none transition-all hover:border-border-active hover:ring-4 focus-visible:border-border-active focus-visible:ring-4 active:scale-[0.98] active:border-border-active active:ring-2 disabled:pointer-events-none disabled:opacity-60"
                  href={`/projects/${project.slug}`}
                >
                  <span>View project</span>
                  <i data-icon="arrow-right" aria-hidden="true">
                    <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M3 8.5h9M8.5 4.5l3.5 4-3.5 4"
                        stroke="currentColor"
                        stroke-width="1.2"
                      />
                      <path
                        d="m2.8 8.1 1.9.1 2 .2h5.2M12 8.4c0-.6-.6-.9-1-1.2l-.6-.3-.3-.3-.4-.2-.6-.6-.4-.6-.3-.8M12 8.4c0 .7-.6 1.2-1 1.7l-1.2 1.4-.9.6-.5.5"
                        stroke="currentColor"
                        stroke-width="1.2"
                        stroke-linecap="round"
                      />
                    </svg>
                  </i>
                </a>
              </div>
              <OptimizedImage
                class="mt-8 h-auto w-full rounded-md bg-background-offset"
                src={project.image}
                alt={project.name}
                width="3200"
                height="1800"
              />
            </div>
          </div>
        {:else}
          <!-- Other Projects - Design with Awards -->
          <div
            class="group border-b py-12 transition-colors elevated-links @container first:border-t hover:bg-foreground-tertiary/10"
          >
            <div class="container mx-auto px-container @5xl:flex">
              <div class="flex flex-1 flex-col items-start justify-between">
                <div class="mr-6">
                  <a class="elevated-link" href={`/projects/${project.slug}`}>
                    <h2 class="text-5xl text-foreground-secondary">
                      {project.name}
                    </h2>
                    <p class="max-w-lg text-5xl">
                      {project.tagline}
                    </p>
                  </a>
                  {#if project.awards && project.awards.length > 0}
                    <div class="mt-6 grid grid-flow-col grid-cols-2 grid-rows-3 gap-4">
                      {#each project.awards as award}
                        <div class="col-span-1 flex items-center">
                          <img
                            class="mr-2 h-auto w-14 rounded-md bg-background-offset"
                            src={award.icon}
                            alt={award.name}
                            width="168"
                            height="132"
                          />
                          <div>
                            <h3 class="text-xs uppercase tracking-wider text-foreground-secondary">
                              {award.label}
                            </h3>
                            <p class="text-sm font-medium">
                              {award.name}
                            </p>
                          </div>
                        </div>
                      {/each}
                    </div>
                  {/if}
                </div>
                <a
                  class="text-md group relative mt-6 inline-flex h-11 items-center justify-center gap-1.5 overflow-hidden whitespace-nowrap rounded-md border border-border px-5 font-medium leading-none text-foreground outline-none transition-all hover:border-border-active hover:ring-4 focus-visible:border-border-active focus-visible:ring-4 active:scale-[0.98] active:border-border-active active:ring-2 disabled:pointer-events-none disabled:opacity-60"
                  href={`/projects/${project.slug}`}
                >
                  <span>View project</span>
                  <i data-icon="arrow-right" aria-hidden="true">
                    <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M3 8.5h9M8.5 4.5l3.5 4-3.5 4"
                        stroke="currentColor"
                        stroke-width="1.2"
                      />
                      <path
                        d="m2.8 8.1 1.9.1 2 .2h5.2M12 8.4c0-.6-.6-.9-1-1.2l-.6-.3-.3-.3-.4-.2-.6-.6-.4-.6-.3-.8M12 8.4c0 .7-.6 1.2-1 1.7l-1.2 1.4-.9.6-.5.5"
                        stroke="currentColor"
                        stroke-width="1.2"
                        stroke-linecap="round"
                      />
                    </svg>
                  </i>
                </a>
              </div>
              <div class="pointer-events-none relative mt-8 aspect-[4/3] flex-1 @5xl:mt-0">
                <OptimizedImage
                  class="h-full w-full rounded-md bg-background-offset object-cover"
                  src={project.image}
                  alt={project.name}
                  width="1600"
                  height="1200"
                />
              </div>
            </div>
          </div>
        {/if}
      {/each}
    </section>

    <!-- Load More Button -->
    {#if hasMore}
      <div class="container mx-auto flex justify-center px-container py-12 md:py-16 lg:py-20">
        <button
          on:click={loadMore}
          class="text-md group relative inline-flex h-11 items-center justify-center gap-1.5 overflow-hidden whitespace-nowrap rounded-md border border-border px-8 font-medium leading-none text-foreground outline-none transition-all hover:border-border-active hover:ring-4 focus-visible:border-border-active focus-visible:ring-4 active:scale-[0.98] active:border-border-active active:ring-2 disabled:pointer-events-none disabled:opacity-60"
        >
          <span>Load more</span>
        </button>
      </div>
    {/if}

    <!-- Client Testimonials Section -->
    <section id="testimonials-section" class="container mx-auto px-container py-12 md:py-16 lg:py-20">
      <h2 class="text-4xl font-semibold md:text-5xl">What Our Clients Say</h2>
      <p class="mt-4 max-w-2xl text-lg text-foreground-secondary">
        Real feedback from teams who've built {data.filterName.toLowerCase()} with us
      </p>

      <div class="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <!-- Placeholder Testimonials -->
        {#each [1, 2, 3] as i}
          <div class="rounded-lg border border-border bg-background-offset p-8">
            <div class="flex gap-1">
              {#each [1, 2, 3, 4, 5] as _}
                <svg width="16" height="16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="text-yellow-500">
                  <path d="M8 1l2.5 5h5.5l-4.5 3.5 1.5 5-5.5-4-5.5 4 1.5-5-4.5-3.5h5.5z" />
                </svg>
              {/each}
            </div>
            <p class="mt-4 text-foreground">
              "Working with this team transformed how we think about our digital product. The quality and attention to detail exceeded our expectations."
            </p>
            <div class="mt-6 flex items-center gap-3">
              <div class="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600"></div>
              <div>
                <p class="font-medium">Client Name</p>
                <p class="text-sm text-foreground-secondary">Company Title</p>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </section>

    <!-- Footer CTA Section -->
    <section class="border-t">
      <div class="container mx-auto px-container py-12 md:py-16 lg:py-20">
        <div class="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 class="text-4xl font-semibold md:text-5xl">Ready to Get Started?</h2>
            <p class="mt-4 text-lg text-foreground-secondary">
              Let's discuss how we can build the perfect {data.filterName.toLowerCase()} for your business.
            </p>
          </div>

          <div>
            <ContactForm variant="quote" />
          </div>
        </div>
      </div>
    </section>
  </main>
{:else if project}
  <main>
    <!-- Cover Image -->
    <section class="relative overflow-hidden">
      <div class="container mx-auto px-container">
        <OptimizedImage
          src={project.coverImage}
          alt={project.name}
          class="h-auto w-full rounded-md bg-background-offset"
          width="3200"
          height="1800"
          loading="eager"
        />
      </div>
    </section>

    <div class="container mx-auto px-container">
      <!-- Header -->
      <header>
        <div class="mx-auto mt-8 max-w-2xl border-b pb-12 md:mt-14 lg:mt-20">
          <h1 class="text-5xl text-foreground-secondary">{project.name}</h1>
          <h2 class="text-5xl">{project.tagline}</h2>
          <p class="mt-4 text-base font-medium text-foreground-secondary">
            Published in {project.publishedYear}
          </p>
        </div>
      </header>

      <!-- Project Metadata -->
      <div
        class="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-6 border-b pb-6 xs:grid-cols-2 md:grid-cols-3"
      >
        <!-- Services -->
        {#if project.services.length}
          <ul class="col-span-1">
            <h4 class="mb-2 text-xs uppercase tracking-wider text-foreground-secondary">
              Services
            </h4>
            {#each project.services as service}
              <li>
                <p class="mb-2 text-base">{service}</p>
              </li>
            {/each}
          </ul>
        {/if}

        <!-- Deliverables -->
        {#if project.deliverables.length}
          <ul class="col-span-1">
            <h4 class="mb-2 text-xs uppercase tracking-wider text-foreground-secondary">
              Deliverables
            </h4>
            {#each project.deliverables as deliverable}
              <li>
                <p class="mb-2 text-base">{deliverable}</p>
              </li>
            {/each}
          </ul>
        {/if}

        <!-- Links -->
        {#if project.links.length}
          <ul class="col-span-1">
            <h4 class="mb-2 text-xs uppercase tracking-wider text-foreground-secondary">Links</h4>
            {#each project.links as link}
              <li class="mb-2 flex items-center gap-1">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="underline hover:no-underline"
                >
                  {link.label}
                </a>
                <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="m4 12 7-7M5 5h6v6" stroke="currentColor" stroke-width="1.2"></path>
                </svg>
              </li>
            {/each}
          </ul>
        {/if}
      </div>

      <!-- Team Section -->
      {#if project.team.length > 0}
        <TeamSection team={project.team} />
      {/if}

      <!-- Metrics Section -->
      <MetricsSection metrics={project.metrics} />

      <!-- Intro -->
      <p class="mx-auto my-10 max-w-2xl text-3xl font-medium md:my-14 lg:my-20">
        {project.intro}
      </p>

      <!-- Rich Content Sections -->
      <div class="group rich-text my-20 @container">
        {#if project.slug === 'monster-fairings'}
          <!-- Monster Fairings Content -->
          <h2 class="mx-auto max-w-2xl"><b>The challenge.</b></h2>
          <p class="mx-auto max-w-2xl">
            Monster Fairings entered the e-commerce space with an ambitious vision: to become the
            go-to destination for custom motorcycle fairings globally. However, they faced
            significant challenges. Their initial platform lacked the sophistication needed to
            handle a rapidly growing catalog, manage complex product customization options, and
            support international operations across multiple currencies and shipping destinations.
            The user experience was cumbersome, search functionality was limited, and the platform
            couldn't scale with their growth.
          </p>

          <!-- Building the Solution -->
          <h2 class="mx-auto max-w-2xl"><b>Building a scalable e-commerce platform.</b></h2>
          <p class="mx-auto max-w-2xl">
            We designed and developed a comprehensive e-commerce platform purpose-built for the
            motorcycle aftermarket industry. The platform features an intuitive catalog organization
            system that allows customers to browse fairings by motorcycle brand, model, and year. We
            implemented advanced filtering capabilities, real-time inventory management, and a
            sophisticated search engine that understands motorcycle specifications and user intent.
          </p>

          <p class="mx-auto max-w-2xl">
            The product detail pages showcase extensive customization options, allowing riders to
            preview their bikes with different fairing designs, colors, and finishes. High-quality
            product imagery, detailed specifications, and user reviews build confidence in the
            purchasing decision.
          </p>

          <ImageSection
            src="/assets/projects/monster-fairings/product-listings.png"
            alt="Product listing and catalog browsing"
            width="3200"
            height="2400"
          />

          <!-- AI-Powered Customization -->
          <h2 class="mx-auto max-w-2xl"><b>AI-powered customization experience.</b></h2>
          <p class="mx-auto max-w-2xl">
            One of the platform's standout features is the AI-driven customization kit that lets
            riders visualize fairings on their specific motorcycle models. Customers can select from
            an extensive color palette and finish options—matte, glossy, metallic, pearl—and see
            real-time previews of how the fairing will look on their bike. This visualization engine
            dramatically increases customer confidence and reduces return rates, as riders know
            exactly what they're purchasing before checkout.
          </p>

          <p class="mx-auto max-w-2xl">
            The AI system understands motorcycle model variations and applies accurate proportions
            and lighting to every visualization, creating a photorealistic preview that matches the
            actual product when it arrives.
          </p>

          <ImageSection
            src="/assets/projects/monster-fairings/ai-customization.png"
            alt="AI customization interface with color and finish picker"
            width="3200"
            height="2400"
          />

          <!-- International Commerce -->
          <h2 class="mx-auto max-w-2xl"><b>Global commerce at scale.</b></h2>
          <p class="mx-auto max-w-2xl">
            Monster Fairings operates in multiple countries, requiring a platform that handles
            currency conversion, localized content, and international shipping seamlessly. We
            implemented multi-currency support, international payment processing, and
            region-specific shipping calculators that provide accurate delivery estimates and costs
            in real time.
          </p>

          <p class="mx-auto max-w-2xl">
            The platform supports content localization, allowing Monster Fairings to tailor product
            descriptions, categories, and messaging for different markets while maintaining a
            cohesive global brand identity.
          </p>

          <ImageSection
            src="/assets/projects/monster-fairings/product-detail.png"
            alt="Product detail page with pricing and specifications"
            width="3200"
            height="2400"
          />

          <!-- Customer Experience -->
          <h2 class="mx-auto max-w-2xl"><b>Streamlined customer experience.</b></h2>
          <p class="mx-auto max-w-2xl">
            From discovery to purchase, every touchpoint was designed with the motorcycle enthusiast
            in mind. The search and filtering system helps users quickly find fairings for their
            specific bike. Product recommendations suggest complementary items and accessories. The
            checkout process is optimized for speed and clarity, with transparent pricing, shipping
            costs, and multiple payment options.
          </p>

          <p class="mx-auto max-w-2xl">
            Customer accounts store order history, saved favorites, and preferences, creating a
            personalized experience for repeat visitors. Live chat support and detailed FAQs provide
            immediate assistance, critical for an e-commerce business serving a passionate but
            demanding customer base.
          </p>

          <!-- Social Proof and Community -->
          <h2 class="mx-auto max-w-2xl"><b>Building community through social proof.</b></h2>
          <p class="mx-auto max-w-2xl">
            The platform prominently features customer photos and reviews from real riders who've
            purchased Monster Fairings. This user-generated content showcases the products in
            action, on actual motorcycles from around the world. These authentic testimonials build
            trust with potential customers and create a sense of community among Monster Fairings
            enthusiasts.
          </p>

          <p class="mx-auto max-w-2xl">
            The customer showcase section displays high-quality photos submitted by the community,
            complete with reviews and ratings. This not only provides valuable social proof but also
            celebrates the riders who trust Monster Fairings with their prized possessions.
          </p>

          <ImageSection
            src="/assets/projects/monster-fairings/customer-testimonials.png"
            alt="Customer reviews and community showcase"
            width="3200"
            height="2400"
          />

          <!-- Ongoing Excellence -->
          <h2 class="mx-auto max-w-2xl"><b>Five years of partnership and growth.</b></h2>
          <p class="mx-auto max-w-2xl">
            Since launch in 2021, Monster Fairings has grown to become a leading player in the
            global motorcycle fairings market. The relationship didn't end at launch. We've provided
            ongoing maintenance, feature development, and optimizations as the business evolved. New
            product categories were added, international markets were entered, and the platform was
            continuously refined based on customer feedback and performance data.
          </p>

          <p class="mx-auto max-w-2xl">
            The platform now serves thousands of motorcycle enthusiasts across multiple continents,
            with over 500 SKUs representing fairings for dozens of motorcycle brands and models. The
            long-term partnership demonstrates the value of building systems designed for growth and
            maintaining them with care and expertise.
          </p>

          <!-- Testimonial -->
          <Testimonial
            quote="From the initial vision to five years of continuous support, the team understood what we were trying to build and helped us scale without compromising on quality or performance."
            author="Henry"
            title="Owner at Monster Fairings"
            image="/assets/storyblok/placeholder.jpeg"
          />

          <!-- Results -->
          <h2 class="mx-auto max-w-2xl"><b>Results and impact.</b></h2>
          <p class="mx-auto max-w-2xl">
            The platform now manages over 5000 SKUs across its catalog, handles thousands of monthly
            transactions, and manages dynamic inventory across international warehouses. The AI
            visualization system has become a key differentiator, reducing product return rates
            significantly as customers have full confidence in their purchase before checkout. The
            platform delivers a seamless experience to customers in over seven countries with
            multi-currency support and localized content.
          </p>

          <p class="mx-auto max-w-2xl">
            Behind the scenes, the architecture supports complex payment structures, advanced
            filtering and search capabilities, integrated email management systems, and
            comprehensive speed and security optimizations. The combination of thoughtful design,
            robust technology, sophisticated AI integration, and dedicated ongoing support has made
            Monster Fairings the destination for motorcycle enthusiasts worldwide seeking quality
            fairings and a superior shopping experience.
          </p>
        {/if}

        <!-- Navjot Kaur PLLC Content -->
        {#if project.slug === 'navjot-kaur-pllc'}
          <h2 class="mx-auto max-w-2xl"><b>The challenge.</b></h2>
          <p class="mx-auto max-w-2xl">
            Navjot Kaur, a dual-licensed attorney in New York and India, was launching an
            independent law practice in one of the most saturated legal markets in the United
            States. New York City alone is home to tens of thousands of attorneys, and the estate
            planning and immigration spaces are dominated by long-established firms with decades of
            name recognition. To stand out, the practice needed more than a generic law-firm
            website. It needed a complete brand—one that reflected Navjot's distinct value
            proposition: a culturally aware, multilingual, cross-jurisdictionally licensed attorney
            serving multicultural families, blended households, and Non-Resident Indian (NRI)
            clients with clear, compassionate guidance instead of intimidating legalese.
          </p>

          <p class="mx-auto max-w-2xl">
            The existing options on the market either felt cold and corporate or visually outdated,
            and none communicated the warmth, accessibility, and dual-system expertise that defined
            her client relationships. The task was to build a brand and digital presence from zero
            that would establish trust instantly, simplify complex legal services for a
            non-specialist audience, and rank for highly competitive New York legal search terms.
          </p>

          <h2 class="mx-auto max-w-2xl">
            <b>Building a complete brand identity from the ground up.</b>
          </h2>
          <p class="mx-auto max-w-2xl">
            We took a fully design-led approach, treating Navjot Kaur PLLC as a brand-building
            project rather than a website assignment. We started with discovery: positioning,
            audience archetypes, tone-of-voice exploration, and competitive analysis of leading
            estate planning and immigration firms across the New York City and South Asian diaspora
            markets. From there we designed a custom logo, a refined typography system pairing a
            serif for authority with a clean sans-serif for accessibility, and a calm, trust-forward
            color palette that intentionally departs from the heavy navy-and-gold conventions of
            traditional law firm branding.
          </p>

          <p class="mx-auto max-w-2xl">
            The voice of the brand was equally deliberate. Every line of copy was written to
            translate technical legal concepts—revocable trusts, special needs planning,
            humanitarian visas, cross-border inheritance—into language that an immigrant parent, a
            young professional starting a family, or a survivor seeking protection could read in
            under a minute and understand. The result is a brand system that feels modern,
            multicultural, and genuinely human while still signalling the professional credibility
            expected of a New York attorney.
          </p>

          <h2 class="mx-auto max-w-2xl">
            <b>Architecting six specialized practice areas with clarity.</b>
          </h2>
          <p class="mx-auto max-w-2xl">
            One of the largest information design challenges was the breadth of services offered.
            Navjot Kaur PLLC covers six distinct, technically complex practice areas, each with its
            own audience and search intent. We built a dedicated Practice Areas page anchored by a
            marble-column hero ("WHAT WE ARE EXPERT AT / Legal Practice Areas") and a clean
            three-column icon grid that lets visitors find the right service in two clicks or
            less—whether they arrive looking for a will, a green card, or guardianship for a special
            needs child.
          </p>

          <p class="mx-auto max-w-2xl">
            Estate Planning helps clients secure their legacy and protect their family's future
            through personalized plans and legal directives. Wills & Trusts covers revocable and
            irrevocable trust structures along with tax-efficient strategies for everyday
            families—not only the ultra-wealthy. Immigration Law guides clients from green cards
            through naturalization. Guardianship & Special Needs Planning protects minors and
            individuals with disabilities through legally sound structures. International Estate
            Planning addresses cross-border inheritance, NRI succession, and dual-jurisdiction asset
            planning between the U.S. and India. Humanitarian Relief & Survivor Support delivers
            trauma-informed representation for VAWA self-petitions, Special Immigrant Juvenile
            Status (SIJS), and T and U visas for survivors of abuse, trafficking, and serious crime.
            Each practice area is presented in its own dedicated section with plain-language
            explanations, the categories of clients it serves, and a direct path to consultation
            booking.
          </p>

          <ImageSection
            src="/assets/projects/navjot-kaur-pllc/practice-areas.png"
            alt="Navjot Kaur PLLC Practice Areas page with marble-column hero, top navigation, and three-column icon grid showing Estate Planning, Immigration Law, and Wills and Trusts"
            width={2880}
            height={1800}
          />

          <h2 class="mx-auto max-w-2xl"><b>Bridging two legal systems and three languages.</b></h2>
          <p class="mx-auto max-w-2xl">
            Navjot's most distinctive credential is her dual licensure in both New York and India—a
            combination that very few attorneys in the United States hold. We made this the
            structural backbone of the entire site rather than a footnote on her bio page. The About
            Us page pairs a warm, professional portrait with a long-form bio that leads with the
            cross-border story: "licensed to practice law in both New York and India," "experience
            in both U.S. and Indian legal systems," and a clear statement of why that combination
            matters for multicultural families navigating immigration, inheritance, and family
            protection across two jurisdictions.
          </p>

          <p class="mx-auto max-w-2xl">
            We also surfaced multilingual access in English, Hindi, and Punjabi prominently across
            the homepage, About page, and contact flows, alongside a clear "free initial
            consultations" promise. For South Asian families navigating sensitive conversations
            about inheritance, immigration status, or family protection, being able to consult with
            an attorney in their first language is often the deciding factor in choosing
            representation. Treating language and dual-system fluency as first-class brand
            elements—not footnotes—turned credentials into a real competitive advantage.
          </p>

          <ImageSection
            src="/assets/projects/navjot-kaur-pllc/about-attorney.png"
            alt="About Us page featuring a portrait of Navjot Kaur alongside a bio highlighting dual licensing in New York and India, fluency in English, Hindi, and Punjabi, and free initial consultations"
            width={2880}
            height={1398}
          />

          <h2 class="mx-auto max-w-2xl"><b>Reducing the barrier to legal help.</b></h2>
          <p class="mx-auto max-w-2xl">
            Many people who need an estate plan, an immigration filing, or survivor relief never
            make the call—because legal services feel inaccessible, expensive, or intimidating. We
            engineered the entire conversion path to lower that barrier. Every page funnels toward a
            free 30-minute consultation booked directly through an integrated Calendly flow or a
            simple Get In Touch form ("Law is a complicated matter. It can cause you a big problem
            if you ignore it. Let us help you!") with only four fields—name, email, subject,
            message—and a clear orange Submit Now CTA. No phone tag, no gatekeeping, no obligation.
          </p>

          <p class="mx-auto max-w-2xl">
            The site is fully responsive across desktop, tablet, and mobile, with
            performance-optimized custom HTML and CSS layered on top of a WordPress CMS so that
            Navjot can update content, blog posts, and practice details without developer
            involvement. Every contact entry point was tested to ensure that a client landing on a
            practice area page on their phone is at most one tap away from a real human
            conversation.
          </p>

          <ImageSection
            src="/assets/projects/navjot-kaur-pllc/contact-form.png"
            alt="Get In Touch contact form with Full Name, Email, Subject, and Message fields and a prominent orange Submit Now button, set against a marble-column background"
            width={2880}
            height={1398}
          />

          <h2 class="mx-auto max-w-2xl">
            <b>Establishing professional credibility at first glance.</b>
          </h2>
          <p class="mx-auto max-w-2xl">
            For a new independent practice competing with century-old firms, social proof and
            credentialing are everything. We highlighted Navjot's affiliations with four major bar
            associations—the NYC Bar Association, the New York State Bar Association, the Sikh
            National Bar Association, and the South Asian Bar Association—directly on the homepage
            and attorney bio, signalling both her professional standing and her active engagement in
            the multicultural legal community she serves. Her dual New York and India licensure,
            multilingual capabilities, and specialized practice focus are surfaced in the first
            viewport, so a visitor can validate her expertise within seconds of landing.
          </p>

          <p class="mx-auto max-w-2xl">
            We carried that credibility through to every page closing. The site footer pairs a
            persistent "Are You Looking For Someone To Help? Let us help you! Call Now:
            (+1)646-453-4550" CTA banner with a comprehensive footer that lists every practice area,
            the Midtown Manhattan office address (43 West 43rd Street, Suite 230, New York, NY
            10036), all contact channels, and social links—so even a visitor scrolling to the bottom
            of the page leaves with the firm's full professional footprint visible at a glance.
          </p>

          <ImageSection
            src="/assets/projects/navjot-kaur-pllc/footer-contact.png"
            alt="Site-wide CTA banner and footer listing all practice areas, the Midtown Manhattan office address, phone, email, and social channels"
            width={2880}
            height={1800}
          />

          <h2 class="mx-auto max-w-2xl"><b>Educating clients through thought leadership.</b></h2>
          <p class="mx-auto max-w-2xl">
            The integrated legal blog serves a dual purpose: client education and organic search
            visibility. Articles cover the questions her ideal clients are actually typing into
            Google—why trusts make sense for non-wealthy families, why young families should write a
            will before it feels urgent, and how probate works for blended families in New York.
            Each post is written in the same plain-language voice as the rest of the site, building
            topical authority around estate planning, immigration, and NRI legal services while
            giving Navjot a content asset she can share with prospective clients during
            consultations.
          </p>

          <h2 class="mx-auto max-w-2xl"><b>Results and impact.</b></h2>
          <p class="mx-auto max-w-2xl">
            The launch established Navjot Kaur PLLC as a modern, client-focused practice in one of
            the most competitive legal markets in the world. The brand system, content architecture,
            and SEO foundation have positioned the firm to capture an underserved intersection of
            estate planning, immigration, and cross-border NRI services that larger generalist firms
            do not specialize in. Six practice areas are clearly mapped, four bar association
            affiliations are surfaced for credibility, three languages are supported across client
            journeys, and a single seamless Calendly flow converts visitors into booked
            consultations.
          </p>

          <p class="mx-auto max-w-2xl">
            More importantly, the website successfully translates Navjot's real-world value—warmth,
            cultural fluency, dual-jurisdiction expertise, and a refusal to hide behind legal
            jargon—into a digital experience that feels exactly like working with her in person. The
            professional online presence has become the central hub for client inquiries, service
            discovery, and trust-building, differentiating the practice from traditional law firm
            websites while remaining unmistakably approachable to the multicultural families and
            individuals who need her expertise most.
          </p>
        {/if}

        <!-- Karen Lazar Design Content -->
        {#if project.slug === 'karen-lazar-design'}
          <h2 class="mx-auto max-w-2xl"><b>The challenge.</b></h2>
          <p class="mx-auto max-w-2xl">
            Karen Lazar Design had built a cult following around its 14k gold-filled signature
            pieces — anti-tarnish, layerable, and editorial enough to land in InStyle, Town &amp;
            Country, and Elle. But the catalogue had outgrown its storefront. Dozens of variants per
            piece, ten size options, a growing gemstone and diamond range, curated stacks, gift
            cards across multiple price tiers, an active showroom in Brentwood, and a steadily
            growing international audience were all competing for the same attention on the
            homepage. The brief was clear: design and build a Shopify storefront from scratch that
            could carry an editorial fashion-brand aesthetic while quietly handling the operational
            complexity of a multi-collection, multi-currency jewelry business.
          </p>

          <p class="mx-auto max-w-2xl">
            The hardest part was content choreography. The product range crosses Signature,
            Gemstone, Diamond, Fine, and Kids, with overlapping use cases — birthstone gifts, bridal
            stacks, everyday layering, statement pieces — and a customer who often arrives looking
            for a feeling ("a delicate stack for spring") rather than a specific SKU. The site had
            to make that journey feel intuitive without burying the brand's quiet, refined visual
            tone under filters and merchandising widgets.
          </p>

          <h2 class="mx-auto max-w-2xl"><b>Designing the storefront from scratch.</b></h2>
          <p class="mx-auto max-w-2xl">
            We started in design, not in code. Over the first phase of the four-month engagement we
            mapped the full information architecture, drafted the page system, and designed every
            key template against the brand's existing photography and tone of voice — soft neutrals,
            generous whitespace, restrained typography, and product imagery that reads more like an
            editorial spread than a typical e-commerce grid. The hero sequence centers a single
            emotional cue ("Find Your Spring Stack") above a large lifestyle image, with navigation
            pared down to four entry points: Shop, New, Special Promotions, and Style Guide.
            Everything else — filters, badges, promotional ribbons — is hidden until it earns its
            place on the screen.
          </p>

          <ImageSection
            src="/assets/projects/karen-lazar-design/homepage-hero.png"
            alt="Karen Lazar Design homepage hero featuring layered gold necklaces and a pared-back four-link primary navigation"
            width={2880}
            height={1800}
          />

          <h2 class="mx-auto max-w-2xl">
            <b>Engineering a Shopify build that disappears behind the brand.</b>
          </h2>
          <p class="mx-auto max-w-2xl">
            With the design system locked, we built the storefront on Shopify from the ground up —
            custom theme, custom templates, custom merchandising logic. The goal was for the
            platform to be invisible: no off-the-shelf theme tropes, no app-stitched UI, no jarring
            shifts between marketing pages and product pages. Every collection, product, and content
            template shares the same restrained type system, the same rhythm of imagery and
            whitespace, and the same interaction patterns, so a customer moving from a press feature
            to a Style Guide to a product variant page never feels handed off between systems.
          </p>

          <p class="mx-auto max-w-2xl">
            Behind the scenes, the build was structured around the operational realities of the
            brand: a fast-growing catalogue, frequent collection drops, recurring promotional
            moments (gift guides, seasonal stacks, holiday capsules), and a need to merchandise the
            same products across multiple narratives without duplicating content. The CMS structure
            makes it easy for the team to spin up a new edit — a "Spring Stack," a press wall
            update, a featured collection — without touching code.
          </p>

          <h2 class="mx-auto max-w-2xl">
            <b>A custom filtration system built around how customers actually shop.</b>
          </h2>
          <p class="mx-auto max-w-2xl">
            The Signature collection alone runs to nearly fifty products, and the wider catalogue
            multiplies that across gemstones, diamonds, fine pieces, and kids. We built a custom
            filtration system that lets shoppers slice the catalogue the way they actually think
            about jewelry — by color (yellow gold, rose, silver, mixed), by category (Signature,
            Gemstone, Diamond, Fine, New In, Special Promotions, Kids), by price, and by sale state
            — with sticky filter chips, a clear active-state for the current selection, and a
            "Price, low to high" sort that reorders the grid instantly. Filter combinations resolve
            fast, persist across navigation, and feed cleanly into the analytics layer so the brand
            can see which entry points are converting on which collections.
          </p>

          <ImageSection
            src="/assets/projects/karen-lazar-design/product-listing.png"
            alt="Signature collection listing page showing 47 products, color and category filters in the left rail, sale badges, and a low-to-high price sort"
            width={2880}
            height={1800}
          />

          <h2 class="mx-auto max-w-2xl">
            <b>Variant logic that survives ten sizes and three styles.</b>
          </h2>
          <p class="mx-auto max-w-2xl">
            Most pieces in the catalogue ship in up to ten ring sizes and three style finishes
            (Yellow Gold, Rose, Silver), which on a default Shopify setup would explode into a
            confusing variant matrix. We rebuilt the product page around a clean, two-step variant
            picker: size as a row of compact, tappable chips, style as color swatches, with
            availability, pricing, and the gallery thumbnails updating in real time as the customer
            moves between options. Trust cues — 14k Gold Filled, Non-Tarnishable, Free Shipping On
            All Orders Over $100 — sit immediately under the buy box, where they can do the work of
            converting a hesitant first-time buyer without dominating the page.
          </p>

          <ImageSection
            src="/assets/projects/karen-lazar-design/product-detail.png"
            alt="2MM Signature Ring product detail page with ten size options, three style swatches, Add to Cart and Buy It Now buttons, and trust cues for 14k gold filled, non-tarnishable, and free shipping"
            width={2880}
            height={1800}
          />

          <h2 class="mx-auto max-w-2xl">
            <b>Stack-based shopping and a Style Guide that doubles as discovery.</b>
          </h2>
          <p class="mx-auto max-w-2xl">
            Karen Lazar customers rarely buy a single piece — they buy stacks. We built a dedicated
            Style Guide experience ("Shop According to Your Personal Style") that organizes the
            catalogue around aesthetic intent rather than SKU: The Pearl Collection, Timeless, and
            Statements, each anchored by a full-bleed lifestyle image and a curated edit underneath.
            The same surface is reusable for seasonal stories — Spring Stack, Birthstone Stack, the
            Karen Stack — so the brand can launch a new merchandising narrative in hours, not weeks,
            and customers always have a clear path from "I want a look" to a buyable bundle.
          </p>

          <ImageSection
            src="/assets/projects/karen-lazar-design/style-guide.png"
            alt="KLD Style Guide page with three lifestyle tiles labeled The Pearl Collection, Timeless, and Statements"
            width={2880}
            height={1800}
          />

          <h2 class="mx-auto max-w-2xl"><b>A multi-tier gift card flow.</b></h2>
          <p class="mx-auto max-w-2xl">
            Gift cards are a meaningful share of the brand's revenue, especially around the
            holidays, so we treated them as a first-class product rather than a checkout
            afterthought. The gift card page mirrors the design language of the rest of the
            catalogue — same buy box, same trust cues, same typography — but exposes nine fixed
            denominations from $50 to $500 in a single tap-to-select grid, with quantity, Add to
            Cart, and Buy It Now flowing through the standard checkout. The result is a gift
            purchase that feels considered and on-brand, not transactional.
          </p>

          <ImageSection
            src="/assets/projects/karen-lazar-design/gift-card.png"
            alt="Gift Card product page with nine selectable denominations from $50 to $500 and the same buy box pattern as the main product pages"
            width={2880}
            height={1800}
          />

          <h2 class="mx-auto max-w-2xl"><b>Custom shipping and international scale.</b></h2>
          <p class="mx-auto max-w-2xl">
            The brand ships internationally and runs a free-shipping threshold ($100+) that's
            prominently featured in the announcement bar at the top of every page. We configured
            custom shipping rates that reflect real-world fulfillment economics — different bands
            for different destinations, a clean interaction with the free-shipping promotion, and
            accurate, predictable totals at checkout. Combined with multi-currency support across
            USD, EUR, GBP, and other key markets, the storefront handles a meaningful share of
            international orders without surprising customers at the final step.
          </p>

          <h2 class="mx-auto max-w-2xl"><b>Press, social proof, and community.</b></h2>
          <p class="mx-auto max-w-2xl">
            Below the fold on the homepage, we built a tightly merchandised social-proof block that
            does a lot of the brand-trust work in a single screen: an Instagram-tagged UGC strip
            pulling real customers wearing the pieces, a press wall surfacing InStyle, Town &amp;
            Country, and Elle, and a returning entry point to best sellers. The block was built to
            be editable from the CMS so the team can rotate UGC, swap press logos, and refresh the
            featured edit without engineering involvement.
          </p>

          <ImageSection
            src="/assets/projects/karen-lazar-design/instagram-press.png"
            alt="Homepage section showing a four-tile Instagram UGC strip under the hashtag karenlazardesign and a press logo wall featuring InStyle, Town and Country, and Elle"
            width={2880}
            height={1800}
          />

          <Testimonial
            quote="The team understood the brand from the first conversation. They built the entire Shopify store from scratch around how our customers actually shop — stacks, style guides, gift cards, sizes — and the storefront has carried us through a steady jump in traffic without us having to rethink the foundation."
            author="Sydney"
            title="Client at Karen Lazar Design"
            image="/assets/storyblok/placeholder.jpeg"
          />

          <h2 class="mx-auto max-w-2xl"><b>Results &amp; impact.</b></h2>
          <p class="mx-auto max-w-2xl">
            The storefront went live as a fully custom Shopify build inside the four-month window.
            The signature catalogue now scales cleanly across collections, color and category
            filters resolve in a single interaction, ten-size variant logic and three-style finishes
            work without UI clutter, the multi-tier gift card flow handles the brand's seasonal
            gifting volume, and custom shipping rates support international orders alongside the
            free-shipping threshold. The Style Guide and Spring Stack surfaces let the brand
            merchandise the catalogue around feeling and occasion, not SKU lists, while the press
            wall and Instagram UGC strip do the trust-building work below the fold.
          </p>

          <p class="mx-auto max-w-2xl">
            The site has carried steady, growing traffic since launch and continues to be the
            central commerce surface for the brand — alongside the Brentwood showroom and the
            brand's editorial press footprint. More importantly, the platform was built so the team
            can keep merchandising, dropping new collections, and running seasonal stories without
            the storefront becoming a bottleneck. That was the real brief: a Shopify build
            sophisticated enough to disappear behind the brand, and structured enough to carry it as
            it grows.
          </p>
        {/if}

        <!-- Shades of Gray Indigenous Pet Treats Content -->
        {#if project.slug === 'indigenous-treats'}
          <h2 class="mx-auto max-w-2xl"><b>The challenge.</b></h2>
          <p class="mx-auto max-w-2xl">
            Shades of Gray is a family-owned, Indigenous-founded premium pet treats brand built on a
            single, uncompromising idea: dogs and cats deserve the same single-ingredient, ethically
            sourced proteins their wild ancestors thrived on. The catalogue is anchored by five
            proteins almost no other pet brand carries — rabbit, beaver, bison, elk, and venison —
            sourced ethically and finished into rolls, strips, ears, feet, tenderloins, and meal
            toppers, all gluten-, antibiotic-, and preservative-free. The brand had earned real
            traction (a CBC feature, a finalist run on Bears\' Lair, write-ups in Pet Food Industry,
            Canadian Dogs, and Animal Wellness), but the legacy storefront couldn\'t carry that
            story or the operational reality of the business: a fast-growing direct-to-consumer
            subscription audience, a meaningful retail wholesale channel, an Indigenous heritage
            narrative that needed real space, and a steady drumbeat of new product launches across
            two species and five proteins.
          </p>

          <p class="mx-auto max-w-2xl">
            The brief was a full replatform: take everything that made the brand resonate — the
            founder\'s story, the editorial outdoor photography, the clarity of single-protein
            nutrition, the press credibility — and rebuild the storefront from scratch on Shopify in
            a window that left no time for off-the-shelf compromises. The hard part was that the
            rebuild had to do three different jobs at once: convert a first-time pet owner who
            landed via a CBC link, retain a returning subscriber who just wanted to refill rabbit
            rolls in two clicks, and onboard a wholesale buyer who needed access to bulk pricing
            behind a separate login.
          </p>

          <h2 class="mx-auto max-w-2xl"><b>Replatforming to Shopify in two months.</b></h2>
          <p class="mx-auto max-w-2xl">
            We built the entire storefront from scratch on Shopify across an eight-week engagement —
            custom theme, custom templates, full content migration from the legacy site, and a
            redesigned visual system anchored on the brand\'s warm, earthy palette and outdoor
            lifestyle photography. The home page was rebuilt around two emotional cues that mattered
            most to the customer: the protein, and the promise of never running out of it. The
            before-and-after below tells the story in a single drag — the legacy hero stacked a
            paragraph of copy, two competing CTA buttons, and a press wall above the fold; the new
            homepage reduces that to five hand-drawn animal silhouettes (Rabbit, Beaver, Bison, Elk,
            Venison) acting as a single-tap gateway into protein-specific collections, with a
            Subscribe &amp; Save block carrying the lifetime-value side of the business with a clear
            value exchange (10% off every month, free shipping at $50+ for subscribers vs $100+
            regular, never run out).
          </p>

          <ComparisonSlider
            beforeImage="/assets/projects/indigenous-treats/cover.png"
            afterImage="/assets/projects/indigenous-treats/before-homepage.png"
            beforeLabel="Redesigned homepage"
            afterLabel="Legacy homepage"
          />

          <h2 class="mx-auto max-w-2xl"><b>An icon-led single-protein navigation system.</b></h2>
          <p class="mx-auto max-w-2xl">
            Most pet brands force customers to filter by species first, then sift through a generic
            catalogue. Shades of Gray inverts that: the protein is the brand, so the protein is the
            navigation. We built a custom homepage navigation strip and matching collection-template
            pattern where each animal silhouette deep-links into a curated protein collection (every
            rabbit format across dogs and cats; every elk SKU side-by-side; bundles and meal toppers
            grouped by protein). On the catalogue page, the same logic resurfaces as a Protein
            Options filter alongside Availability and Price, with a sticky filter rail, an in-stock
            count, and a clean four-up product grid that reads more like an editorial than a typical
            Shopify collection. Drag the slider below to compare the legacy All Products page (28
            SKUs, two-up grid, generic Shopify chrome) against the redesigned catalogue (40 SKUs,
            four-up editorial grid, custom filter rail, four-tile collection header).
          </p>

          <ComparisonSlider
            beforeImage="/assets/projects/indigenous-treats/product-listing.png"
            afterImage="/assets/projects/indigenous-treats/before-product-listing.png"
            beforeLabel="Redesigned All Products page"
            afterLabel="Legacy All Products page"
          />

          <h2 class="mx-auto max-w-2xl"><b>A custom B2B wholesale portal.</b></h2>
          <p class="mx-auto max-w-2xl">
            The largest piece of custom engineering on the project was the wholesale channel.
            Retailers need an entirely different storefront experience from end consumers: tiered
            bulk pricing, minimum order quantities, account-locked catalogues, and a registration
            flow that includes business verification before any pricing is exposed. We built a fully
            custom B2B portal sitting alongside the consumer storefront — its own login surface, its
            own product catalogue, and its own approval-based registration flow — so wholesale
            buyers see prices and SKUs the retail visitor never does, while the brand can manage
            both audiences from a single Shopify backend. The wholesale entry sits in the primary
            navigation as a first-class destination, signalling to retailers that the channel is
            real and supported, not a back-door form.
          </p>

          <ImageSection
            src="/assets/projects/indigenous-treats/wholesale-login.png"
            alt="Wholesale Login page with email and password fields, a Sign Up Here link for new wholesale accounts, and a forgot password link"
            width={2880}
            height={1800}
          />

          <h2 class="mx-auto max-w-2xl">
            <b>A Subscribe &amp; Save engine built into the buying flow.</b>
          </h2>
          <p class="mx-auto max-w-2xl">
            Pet treats are the perfect subscription category — predictable consumption, strong brand
            affinity, and a real cost to running out — so we treated subscriptions as a first-class
            buying mode, not an upsell tab. Shoppers can choose a one-time purchase or a recurring
            delivery on every product page; subscribers unlock a 10% recurring discount, the lower
            $50 free-shipping threshold, and customizable order frequencies tied to how fast their
            pet actually goes through a bag. The subscriber promise — "Never Run Out of Your Pet\'s
            Favourite Single-Protein Treats" — runs through the homepage, the product page, and the
            post-purchase flow, with the operational engine handling scheduling, payment retries,
            and frequency changes from the customer account area.
          </p>

          <h2 class="mx-auto max-w-2xl"><b>Dual customer login with Shop integration.</b></h2>
          <p class="mx-auto max-w-2xl">
            The retail customer login was rebuilt to support two parallel paths: a standard
            email-and-password sign-in for direct customers managing subscriptions, and a one-tap
            "Sign in with Shop" flow for the meaningful share of buyers already logged into Shop Pay
            across the wider Shopify ecosystem. The design borrows the same restrained type system
            as the rest of the site, surfaces a "Get Early Access to Subscriber-Only Promotions
            &amp; Exclusive Releases" hook below the fold to convert account creation into list
            growth, and is intentionally clean — no upsells, no discounts banners, no dark-pattern
            frequency traps.
          </p>

          <ImageSection
            src="/assets/projects/indigenous-treats/customer-login.png"
            alt="Customer Login page with a Sign in with Shop button, an email and password sign-in fallback, and a subscriber-only promotions promise below the fold"
            width={2880}
            height={1800}
          />

          <h2 class="mx-auto max-w-2xl"><b>The founder\'s story, given real space.</b></h2>
          <p class="mx-auto max-w-2xl">
            Shades of Gray is a family-owned business, founded by an Indigenous woman, with a
            manufacturing footprint in Roseneath, Ontario. The brand exists because of that story,
            not in spite of it — and the legacy site never had room to tell it well. We rebuilt the
            About surface around a full-bleed lifestyle hero (founder and dog in a snow-blanketed
            Ontario forest), an "Organic Canadian Goodness — Our Story" long-form section, and a
            dedicated content cluster across About Us, Indigenous Heritage, Healthy Treats &amp;
            Proteins, and Natural Pet Diets. The result is a brand site that earns the press
            attention it has already received, and gives a CBC reader landing on the homepage the
            depth they came looking for.
          </p>

          <ImageSection
            src="/assets/projects/indigenous-treats/about-us.png"
            alt="About Us page hero with a full-bleed lifestyle photo of the founder walking a dog through a snow-blanketed forest, with the headline About Us and a subhead about being a family-owned Canadian business making high-quality all-natural pet treats"
            width={2880}
            height={1800}
          />

          <h2 class="mx-auto max-w-2xl"><b>Reviews as a first-class trust layer.</b></h2>
          <p class="mx-auto max-w-2xl">
            With 186-plus verified product reviews and a 4.81-out-of-5 aggregate rating, social
            proof was already one of the brand\'s strongest assets — it just wasn\'t doing any work
            on the legacy site. We built a dedicated Reviews page that surfaces a five-star
            distribution chart, the verified-buyer badge on every review, named reviewers attached
            to specific products (Rabbit Pet Treats, Freeze Dried Rabbit, Pearl), and a one-tap
            "Write a Store Review" CTA. Review snippets also resurface across product pages and the
            homepage, so a first-time visitor sees real customers vouching for the same SKU they\'re
            considering, and an SEO crawler sees structured social proof on every commerce surface.
          </p>

          <ImageSection
            src="/assets/projects/indigenous-treats/reviews.png"
            alt="Reviews page showing three verified five-star customer reviews with named reviewers and product attributions, an aggregate score of 4.81 out of 5 based on 186 reviews, and a Write a Store Review call to action"
            width={2880}
            height={1800}
          />

          <Testimonial
            quote="The team rebuilt the entire storefront from scratch on Shopify in two months and gave us something the legacy site never could — a real home for our heritage story, a wholesale channel that actually works for our retailers, and a subscription experience that keeps customers coming back. The site finally matches the quality of the product."
            author="Founder"
            title="Shades of Gray Indigenous Pet Treats"
            image="/assets/storyblok/placeholder.jpeg"
          />

          <h2 class="mx-auto max-w-2xl"><b>Results &amp; impact.</b></h2>
          <p class="mx-auto max-w-2xl">
            The replatform shipped inside the two-month window as a fully custom Shopify build. Five
            single-protein collections are now navigable in a single tap from the homepage, the
            catalogue surfaces 40 active SKUs across dogs, cats, bundles, and gift cards with sticky
            protein and price filters, the Subscribe &amp; Save engine handles the brand's recurring
            revenue with frequency control and a 10% subscriber discount, and the custom B2B
            wholesale portal supports the retail channel with its own login, registration, and
            pricing — all from a single Shopify backend. The storefront carries 186-plus verified
            reviews at a 4.81-star average, surfaces the brand's CBC, Bears' Lair, and trade-press
            coverage as trust signals, and gives the founder's Indigenous heritage story the
            editorial space it deserves.
          </p>

          <p class="mx-auto max-w-2xl">
            More importantly, the platform was built so the team can keep launching new proteins,
            new bundles, new educational content, and new retail relationships without the
            storefront becoming the bottleneck. That was the real brief: take a brand whose product,
            story, and press were already strong, and build it a digital home that finally matches.
          </p>
        {/if}

        <!-- SimpleTalk AI Content -->
        {#if project.slug === 'simpletalk-ai'}
          <h2 class="mx-auto max-w-2xl"><b>The challenge.</b></h2>
          <p class="mx-auto max-w-2xl">
            Sales teams lose roughly $1,200 every time a call goes unanswered and tens of thousands
            of dollars a year to slow lead follow-up, yet the off-the-shelf alternatives—generic
            chatbots, IVR menus, outsourced receptionists—either sound robotic, can't qualify leads,
            or can't actually close the loop by booking an appointment on the rep's calendar.
            SimpleTalk needed a true voice AI sales system: human-sounding, available 24/7, capable
            of handling objections, scaling to thousands of simultaneous conversations, and plugged
            directly into the CRMs and calendars sales teams already run on. Not another chatbot
            bolted onto a website—a full replacement for missed calls, slow follow-up, and a
            $30K-a-year receptionist.
          </p>

          <h2 class="mx-auto max-w-2xl"><b>Engineering the AI voice engine.</b></h2>
          <p class="mx-auto max-w-2xl">
            We built the core voice system on a Python backend, trained on millions of real sales
            call transcripts so the AI handles qualifying questions, objections, and natural
            conversational pacing the way a senior closer would. The engine handles both inbound and
            outbound calling, recovers gracefully from interruptions, switches between 12 languages
            mid-conversation, and routes hot leads to a live human via round-robin transfer when
            intent crosses a confidence threshold. Every call is recorded, transcribed, and rolled
            up into a single command center where operators can see exactly how the platform is
            performing in real time.
          </p>

          <ImageSection
            src="/assets/projects/simpletalk-ai/overview-dashboard.png"
            alt="SimpleTalk AI overview dashboard with KPI tiles for total calls, minutes used, inbound and outbound volume, and per-minute pricing"
            width={2880}
            height={1398}
          />

          <h2 class="mx-auto max-w-2xl"><b>A multi-agent dashboard for every channel.</b></h2>
          <p class="mx-auto max-w-2xl">
            We designed and built the full React dashboard that lets clients spin up Voice, Text,
            Email, and Chatbot agents from a single workspace. Agents are organized into folders
            (Production, Follow-Up, internal test agents) so teams can ship, iterate, and roleplay
            safely without breaking live traffic. Each agent card surfaces its phone number, type
            (inbound or outbound), and the most common operator actions—edit, test, training mode,
            assign number, make a call—so launching a new persona or tuning an existing one takes
            seconds, not engineering tickets.
          </p>

          <ImageSection
            src="/assets/projects/simpletalk-ai/agent-library.png"
            alt="Saved Agents library showing voice and text agents organized into Production and Follow-Up folders, each with edit, test, training, and call actions"
            width={2880}
            height={1800}
          />

          <h2 class="mx-auto max-w-2xl"><b>Configuring agents without writing code.</b></h2>
          <p class="mx-auto max-w-2xl">
            Each agent type has its own configuration surface designed for non-technical operators.
            The Text Agent builder lets clients define an initial message, a webhook for downstream
            automation, an AI Creativity slider for tuning response variability, calendar-booking
            toggles, advanced behavior options, and a long-form prompt with pre-built templates for
            common verticals like real estate qualifying. A shared AI Prompt Generator helps users
            write effective agent instructions in minutes instead of hours, and Training Mode lets
            them roleplay against the agent before pushing it to production traffic.
          </p>

          <ImageSection
            src="/assets/projects/simpletalk-ai/text-agent-builder.png"
            alt="Text Agent builder showing initial message, webhook URL, AI Creativity slider, calendar booking, advanced options, and a long-form prompt with pre-made templates"
            width={2880}
            height={1800}
          />

          <h2 class="mx-auto max-w-2xl"><b>White-label and multi-tenant architecture.</b></h2>
          <p class="mx-auto max-w-2xl">
            A first-class Sub Clients system lets agencies and resellers run their own branded
            SimpleTalk instance with isolated phone numbers, agents, billing, and analytics. The
            architecture supports unlimited tenants beneath a parent client, with per-tenant minute
            pools, configurable inbound and outbound pricing (currently $0.2/min), and full call
            recordings and transcripts surfaced at every level of the hierarchy—turning the platform
            from a single-tenant SaaS into an infrastructure layer that other AI agencies can resell
            under their own brand.
          </p>

          <h2 class="mx-auto max-w-2xl"><b>CRM, calendar, and telephony integrations.</b></h2>
          <p class="mx-auto max-w-2xl">
            We built native integrations for the CRMs sales teams actually run on—Salesforce,
            Pipedrive, Zoho, HighLevel, and Close.io—so qualified leads, transcripts, and
            appointment data sync automatically with no manual export. Calendar booking flows write
            directly into Google, Outlook, and Apple Calendar without double-booking, and the
            in-dashboard phone-number provisioning module lets clients buy, port, and assign numbers
            to specific agents and campaigns without leaving the platform.
          </p>

          <h2 class="mx-auto max-w-2xl"><b>Campaigns, analytics, and live operations.</b></h2>
          <p class="mx-auto max-w-2xl">
            The Campaigns module powers outbound dialing with pacing controls and retry logic,
            alongside a daily analytics view that tracks spend, minutes used, total calls, answers,
            no-answers, did-not-connect, transfers, and appointments booked—everything sales ops
            teams need to evaluate ROI without piping data into a separate BI tool. Operators can
            switch between Total, Percentage, and Cost views, drill into individual days, and toggle
            between CRM and Dashboard tabs to compare campaign performance side by side.
          </p>

          <ImageSection
            src="/assets/projects/simpletalk-ai/campaigns-analytics.png"
            alt="Campaigns analytics view with daily breakdown of spend, minutes used, calls, answers, no-answers, transfers, and appointments booked across multiple campaigns"
            width={2880}
            height={1800}
          />

          <p class="mx-auto max-w-2xl">
            For individual call review, the Call Logs &amp; Recordings view exposes every
            interaction the platform has ever placed: filterable by client ID, contact name, agent,
            outcome, direction, duration, and campaign, with playback for the audio recording, a
            one-click transcript, and copy-to-clipboard for the agent ID and the exact prompt that
            was running when the call happened. That last detail matters—it lets operators tune
            prompts based on real outcomes instead of guessing.
          </p>

          <ImageSection
            src="/assets/projects/simpletalk-ai/call-logs.png"
            alt="Call Logs and Recordings view with filterable table of inbound and outbound calls, outcome, duration, recording playback, and transcript access for every conversation"
            width={2880}
            height={1800}
          />

          <h2 class="mx-auto max-w-2xl"><b>Pulse Demo: experience the AI before signing up.</b></h2>
          <p class="mx-auto max-w-2xl">
            The biggest objection to AI voice is "it can't possibly sound human." We solved that
            with Pulse Demo—a built-in, customer-facing experience prospects can launch directly
            from the platform. They pick a voice (Zuri or Chris), choose a language from a list of
            12 including English, Spanish, and French, and start a real, live conversation with the
            AI in seconds. Pulse Demo became the single most effective conversion tool in the
            funnel: instead of explaining what the platform does, prospects experience it firsthand.
          </p>

          <ImageSection
            src="/assets/projects/simpletalk-ai/pulse-demo.png"
            alt="Pulse Demo customer-facing experience with voice picker, language selector, and Start Conversation button to talk live with the AI"
            width={2880}
            height={1800}
          />

          <h2 class="mx-auto max-w-2xl"><b>Built for scale across industries.</b></h2>
          <p class="mx-auto max-w-2xl">
            The platform is tuned for vertical-specific use cases—Real Estate, Solar, Health
            Insurance, Tech Support, Credit Repair, and AI agencies—with industry-tailored audio
            demos and prompt templates clients can spin up before launching their first agent. Under
            the hood, the system scales to up to 1,800 simultaneous conversations, handling spikes
            in inbound volume and concurrent outbound campaigns without degradation, and supports 12
            languages for businesses serving multilingual markets.
          </p>

          <h2 class="mx-auto max-w-2xl"><b>Results and impact.</b></h2>
          <p class="mx-auto max-w-2xl">
            Since launch, the platform has handled over 147,000 total calls and 127,000 minutes of
            live conversation, split across 133K+ outbound and 13K+ inbound calls, with hundreds of
            thousands of minutes still active in client minute pools. The combination of a
            human-sounding voice engine, four agent channels, a no-code agent builder, white-label
            tenancy, deep CRM and calendar integration, full call analytics, and a Pulse Demo that
            converts skeptics into paying customers has positioned SimpleTalk AI as a complete
            sales-system replacement—not a chatbot—for businesses tired of losing $1,200 every time
            a call goes unanswered and $90,000 a year to slow follow-up.
          </p>
        {/if}

        <!-- ConvertBankStatement Content -->
        {#if project.slug === 'convertbankstatement'}
          <h2 class="mx-auto max-w-2xl"><b>The challenge.</b></h2>
          <p class="mx-auto max-w-2xl">
            Anyone who has ever tried to import a bank statement PDF into a spreadsheet knows the
            pain: the layout looks fine on screen, but the moment you copy-paste, the columns
            collapse, dates fragment across rows, and multi-currency totals end up in the wrong
            place. Accountants, bookkeepers, and finance teams routinely lose hours every week
            re-keying transactions by hand because off-the-shelf PDF converters were designed for
            generic documents, not the dense, multi-column, often-scanned reality of bank
            statements. The few tools that did exist either supported a handful of major U.S. banks
            and broke on anything else, mishandled foreign-currency entries, or charged enterprise
            prices for what should be a self-serve utility.
          </p>

          <p class="mx-auto max-w-2xl">
            ConvertBankStatement set out to solve that specific problem—statement-shaped documents,
            end to end—rather than competing with general-purpose PDF tools. The platform needed to
            ingest both digitally generated and scanned PDFs from hundreds of banks across dozens of
            countries, recognize transaction tables regardless of layout quirks, normalize dates and
            currencies, and emit a clean Excel or CSV file the user could drop straight into
            QuickBooks, Xero, or their own reconciliation workflow. It also had to feel like a
            consumer product: sign in, upload, download—no IT department required.
          </p>

          <h2 class="mx-auto max-w-2xl">
            <b>Engineering a custom OCR and parsing engine in Python.</b>
          </h2>
          <p class="mx-auto max-w-2xl">
            We built the conversion engine from the ground up in Python. We started from a
            well-regarded open-source OCR foundation, then adapted and extended it heavily for the
            unique structure of bank statements—learning page layouts, identifying transaction
            blocks, separating header and footer noise from real entries, and reconstructing tabular
            data even when the source PDF had no embedded table at all. On top of OCR, we layered a
            parsing pipeline that recognizes date formats from every major locale, distinguishes
            debits from credits across institutions that format them differently, normalizes
            currency symbols and codes, and validates running balances row by row to catch
            extraction errors before the file ever reaches the user.
          </p>

          <p class="mx-auto max-w-2xl">
            The engine handles three categories of input that most converters can't tell apart:
            digitally generated PDFs with embedded text, image-only scans, and hybrid documents
            where some pages are text and others are images. A pre-flight stage detects which type a
            document is and routes it through the most appropriate extraction path, falling back to
            OCR only when the embedded text is unreliable. This is what lets the platform deliver
            more than 99% accuracy across a catalog of 250+ supported bank formats spanning 30+
            currencies—not by guessing, but by knowing exactly what kind of document it's looking
            at.
          </p>

          <h2 class="mx-auto max-w-2xl">
            <b>A React and Next.js front end designed for a 30-second job.</b>
          </h2>
          <p class="mx-auto max-w-2xl">
            The product surface is intentionally minimal: drop a PDF, watch it convert, download the
            Excel or CSV. We built the front end on React and Next.js, with a single-purpose
            homepage that gets users into the conversion flow within a few seconds of landing.
            Nothing competes with the upload action—not pricing, not testimonials, not feature copy.
            Everything else on the marketing site sits below the fold to support the decision after
            the first conversion has succeeded, which is exactly when most users decide whether to
            upgrade.
          </p>

          <p class="mx-auto max-w-2xl">
            Below the conversion area, the homepage builds trust where it matters. A "Trusted by
            Finance Professionals" section surfaces five-star testimonials from working accountants
            and finance consultants ("ConvertBankStatement saved me hours every month. I used to
            manually copy transactions into Excel, now it's done in seconds."), followed by a clear,
            side-by-side "Why Choose ConvertBankStatement?" comparison against generic PDF
            converters—accuracy, multi-currency handling, scanned-PDF support, and
            statement-specific layout recognition versus the typical "frequent errors, broken
            tables" reality of generic tools. The page is built to convert curious visitors into
            paying customers without ever feeling like a sales pitch.
          </p>

          <ImageSection
            src="/assets/projects/convertbankstatement/trust-comparison.png"
            alt="ConvertBankStatement homepage social proof section with five-star testimonials from finance professionals and a feature comparison table against generic PDF converters covering accuracy and complex layouts"
            width={2880}
            height={1800}
          />

          <h2 class="mx-auto max-w-2xl">
            <b>Authentication, dashboards, and a frictionless first conversion.</b>
          </h2>
          <p class="mx-auto max-w-2xl">
            We built a streamlined sign-in experience around two paths most finance users already
            trust: Sign in with Google or a traditional email-and-password flow with a
            forgotten-password recovery loop. Account creation is one click for Google users and a
            single short form for the rest—no phone verification, no role-based onboarding wizard,
            nothing that gets between a new user and their first successful conversion. Once signed
            in, every account lands on a personal dashboard that tracks remaining page credits,
            conversion history, downloadable past results, and current subscription tier.
          </p>

          <ImageSection
            src="/assets/projects/convertbankstatement/sign-in.png"
            alt="ConvertBankStatement sign-in screen with Sign in with Google button, email and password fields, forgot password link, and Sign Up call to action for new users"
            width={2880}
            height={1800}
          />

          <h2 class="mx-auto max-w-2xl">
            <b>A four-tier subscription model priced for the real market.</b>
          </h2>
          <p class="mx-auto max-w-2xl">
            Bank-statement conversion is a usage-driven product, so we built a four-tier
            subscription system priced on pages-per-month rather than seats or features that nobody
            asks for. Lite ($7.50/mo) covers occasional users with 100 pages a month and 17% annual
            savings. Basic ($15/mo) suits small bookkeepers at 500 pages a month with 40% off
            annual. Pro ($29.90/mo, our most popular tier) unlocks 1,500 pages, API access, and
            priority support for active firms. Business ($49.90/mo) scales to 4,000 pages, full API
            access, and priority support for accounting practices and finance teams running
            conversions at scale. Every tier ships with monthly and yearly billing toggles,
            transparent annual savings, and a single Get Started CTA—no enterprise sales call
            required.
          </p>

          <p class="mx-auto max-w-2xl">
            Behind the pricing page, we engineered the full subscription, metering, and billing
            stack: per-tier page quotas enforced atomically at conversion time, automatic plan
            upgrades and downgrades, prorated changes, failed-payment recovery flows, and clean
            surfacing of remaining credits inside the user dashboard so customers always know how
            close they are to their monthly cap before it impacts a deadline.
          </p>

          <ImageSection
            src="/assets/projects/convertbankstatement/pricing.png"
            alt="ConvertBankStatement pricing page with monthly and yearly toggle and four tiers - Lite at 7.50 dollars, Basic at 15 dollars, Pro at 29.90 dollars marked Most Popular, and Business at 49.90 dollars - each listing page allowance, API access, and priority support inclusions"
            width={2880}
            height={1800}
          />

          <h2 class="mx-auto max-w-2xl">
            <b>A public REST API for Pro and Business customers.</b>
          </h2>
          <p class="mx-auto max-w-2xl">
            Power users—accounting firms processing dozens of statements a day, fintech startups
            feeding cleaned transaction data into their own products, and consultants automating
            month-end close—needed programmatic access. We designed and shipped a clean REST API
            exposing the full conversion pipeline through a small set of well-named endpoints:
            Upload Bank Statement, Convert Bank Statement, Check Conversion Status, Get CSV
            Transactions, and Get Remaining Credits. Authentication is a single API token issued
            from the dashboard and passed via an x-token header, keeping integration time for a new
            customer down to a few minutes.
          </p>

          <p class="mx-auto max-w-2xl">
            Alongside the API itself we built a developer documentation portal at /docs covering the
            base URL, authentication pattern, every endpoint's request and response shape, and a
            complete table of response status codes—so a new integrator can read the docs, generate
            a token, and post their first PDF in a single sitting. API access is gated to Pro and
            Business subscribers, turning the API from a free utility into a margin-positive feature
            that pulls power users up the pricing tiers.
          </p>

          <ImageSection
            src="/assets/projects/convertbankstatement/api-documentation.png"
            alt="ConvertBankStatement API documentation page with sidebar navigation listing Base URL, Authentication, and endpoints for Upload Bank Statement, Convert Bank Statement, Check Conversion Status, Get CSV Transactions, Get Remaining Credits, and Response Status Codes, plus an x-token authentication example"
            width={2880}
            height={1800}
          />

          <h2 class="mx-auto max-w-2xl">
            <b>Multi-currency, multi-format, multi-locale by default.</b>
          </h2>
          <p class="mx-auto max-w-2xl">
            Most converters assume a single bank, a single currency, and a single date format.
            ConvertBankStatement does the opposite. The parsing layer recognizes 30+ currencies
            natively, including USD, EUR, GBP, CAD, AUD, INR, AED, SGD, and major Asian and Latin
            American currencies—handling both prefix and suffix symbols, comma- and period-decimal
            conventions, and statements that mix currencies on a single page (common for
            international cards and travel accounts). Transaction dates are parsed across U.S.,
            European, ISO, and Asian formats, and the engine normalizes everything to a consistent
            output schema so the user's downstream spreadsheet, accounting tool, or ERP doesn't care
            which bank the file came from.
          </p>

          <h2 class="mx-auto max-w-2xl"><b>Built for trust in a sensitive category.</b></h2>
          <p class="mx-auto max-w-2xl">
            Bank statements are some of the most sensitive documents a person uploads to the
            internet, so we treated security and trust as a first-class product feature, not a
            compliance afterthought. Files are processed in isolated worker containers, encrypted in
            transit and at rest, and removed from storage after conversion completes. The platform
            never asks for banking credentials, never connects to a user's bank account, and never
            trains models on customer documents. That guarantee, combined with transparent pricing,
            a multilingual interface, and a support layer accessible directly from every page, is
            what has earned the trust of accountants and finance professionals around the world.
          </p>

          <h2 class="mx-auto max-w-2xl"><b>Results and impact.</b></h2>
          <p class="mx-auto max-w-2xl">
            ConvertBankStatement now serves more than 12,000 active finance professionals,
            accountants, bookkeepers, and small finance teams. The platform supports 250+ bank
            statement formats spanning 30+ currencies, has converted more than 3 million pages of
            statements to date, and consistently delivers over 99% transaction-extraction accuracy
            on real-world inputs. The combination of a custom-engineered Python OCR and parsing
            engine, a deliberately minimal React and Next.js front end, a four-tier subscription
            model that maps cleanly onto how customers actually use the product, and a clean REST
            API for power users has positioned the product as the specialized statement-conversion
            tool generic PDF converters can't match—and a category leader in a niche that, until
            recently, mostly didn't exist.
          </p>
        {/if}
      </div>

      <!-- Contact CTA Section -->
      <ContactCtaSection returnTo={`/projects/${project.slug}`} />
    </div>
  </main>
{:else}
  <main class="container mx-auto px-container py-20">
    <h1 class="text-5xl">Project not found</h1>
    <p class="mt-4 text-xl text-foreground-secondary">
      <a href="/projects" class="underline hover:no-underline">Back to projects</a>
    </p>
  </main>
{/if}
