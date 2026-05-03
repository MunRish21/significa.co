<script lang="ts">
  import { slide } from 'svelte/transition';
  import { page } from '$app/stores';
  import { projectsData } from '$lib/data/projects';
  import { generateBreadcrumbSchema, generateProjectSchema } from '$lib/utils/schema';
  import OptimizedImage from '$components/optimized-image.svelte';
  import TeamSection from '$components/sections/team-section.svelte';

  const projects = projectsData;

  let showFilters = true;
  let projectsToShow = 8;
  const PROJECTS_PER_LOAD = 8;

  // Count services and sort by frequency (descending)
  const serviceCount = new Map<string, number>();
  projects.forEach((p) => {
    p.services.forEach((service) => {
      serviceCount.set(service, (serviceCount.get(service) || 0) + 1);
    });
  });
  const allServices = Array.from(serviceCount.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([service]) => service);

  // Count deliverables and sort by frequency (descending)
  const deliverableCount = new Map<string, number>();
  projects.forEach((p) => {
    p.deliverables.forEach((deliverable) => {
      deliverableCount.set(deliverable, (deliverableCount.get(deliverable) || 0) + 1);
    });
  });
  const allDeliverables = Array.from(deliverableCount.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([deliverable]) => deliverable);

  $: visibleProjects = projects.slice(0, projectsToShow).map((p) => ({
    ...p,
    category: p.deliverables?.[0] || 'Project'
  }));
  $: hasMore = projects.length > projectsToShow;

  function getFilterUrl(filter: string): string {
    const slug = filter
      .toLowerCase()
      .replace(/&/g, '')  // Remove ampersand
      .replace(/\s+/g, '-')  // Replace spaces with dashes
      .replace(/[^\w-]/g, '');  // Remove special characters
    return `/projects/${slug}`;
  }

  function isActiveFilter(filter: string): boolean {
    const filterUrl = getFilterUrl(filter);
    const isActive = $page.url.pathname === filterUrl;
    if (isActive) {
      console.log('Active filter found:', {
        filter,
        filterUrl,
        currentPath: $page.url.pathname,
        isActive
      });
    }
    return isActive;
  }

  function loadMore() {
    projectsToShow += PROJECTS_PER_LOAD;
  }
</script>

<svelte:head>
  <title>Projects — Web, App, AI & E-commerce Portfolio | Techyor</title>
  <meta
    name="description"
    content="Browse Techyor's portfolio of 80+ shipped products: custom websites, web apps, mobile apps, e-commerce stores, AI tools, and automation built for teams worldwide."
  />

  <meta property="og:type" content="website" />
  <meta property="og:title" content="Projects — Techyor Portfolio" />
  <meta
    property="og:description"
    content="80+ shipped products: websites, web/mobile apps, e-commerce, AI tools, and automation."
  />
  <meta property="og:image" content="https://www.techyor.com/og.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Techyor projects" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@TechyorDotCo" />
  <meta name="twitter:title" content="Projects — Techyor Portfolio" />
  <meta
    name="twitter:description"
    content="80+ shipped products: websites, apps, e-commerce, AI, and automation."
  />
  <meta name="twitter:image" content="https://www.techyor.com/og.png" />

  <script type="application/ld+json">
{generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Projects', url: '/projects' }
  ])}
  </script>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Techyor Projects',
      description: 'Portfolio of digital products including websites, apps, and custom solutions',
      url: 'https://www.techyor.com/projects',
      mainEntity: projectsData.slice(0, 5).map(project => ({
        '@type': 'CreativeWork',
        name: project.name,
        description: project.tagline,
        image: 'https://www.techyor.com' + project.image,
        url: 'https://www.techyor.com/projects/' + project.slug
      }))
    })}
  </script>
</svelte:head>

<main class="overflow-hidden">
  <!-- Header -->
  <div class="container mx-auto mt-10 px-container md:mt-14 lg:mt-20">
    <h1 class="text-5xl md:text-6xl lg:text-7xl">Projects.</h1>
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
        {#if allServices.length > 0}
          <div>
            <p class="mb-4 text-xs uppercase tracking-wider text-foreground-secondary">Services</p>
            <div class="flex flex-wrap gap-2">
              {#each allServices as service}
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
        {#if allDeliverables.length > 0}
          <div class="mt-6 md:mt-0">
            <p class="mb-4 text-xs uppercase tracking-wider text-foreground-secondary">
              Deliverables
            </p>
            <div class="flex flex-wrap gap-2">
              {#each allDeliverables as deliverable}
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
  <section>
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

  <!-- Team Section -->
  <TeamSection
    title="The team behind these projects."
    subtitle="Hire a specialist for your next one."
    showViewAll
  />
</main>
