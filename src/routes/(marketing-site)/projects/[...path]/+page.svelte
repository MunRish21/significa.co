<script lang="ts">
  import { page } from '$app/stores';
  import { projectsData } from '$lib/data/projects';
  import OptimizedImage from '$components/optimized-image.svelte';

  let projectsToShow = 8;
  const PROJECTS_PER_LOAD = 8;

  $: {
    projectsToShow = 8;
  }

  // Get service from URL path
  $: servicePath = $page.params.path;
  $: serviceFilter = servicePath
    ? servicePath.split('/')[0].replace(/-/g, ' ').toUpperCase()
    : '';

  // Convert kebab-case back to proper service name
  $: properServiceName = (() => {
    const mapping: Record<string, string> = {
      'AI & MACHINE LEARNING': 'AI & Machine Learning',
      'BACKEND ENGINEERING': 'Backend Engineering',
      'BUSINESS SERVICES': 'Business Services',
      'DESIGN & CREATIVE': 'Design & Creative',
      'EDUCATION & TRAINING': 'Education & Training',
      'E-COMMERCE': 'E-commerce',
      'FINANCIAL SERVICES': 'Financial Services',
      'FOOD & BEVERAGE': 'Food & Beverage',
      'HEALTH & WELLNESS': 'Health & Wellness',
      'MOBILE APP DEVELOPMENT': 'Mobile App Development',
      'PYTHON BACKEND ENGINEERING': 'Python Backend Engineering',
      'REACT & NEXT.JS DEVELOPMENT': 'React & Next.js Development',
      'REAL ESTATE & PROPERTY': 'Real Estate & Property',
      'SAAS PLATFORMS': 'SaaS Platforms',
      'VOICE AI ENGINEERING': 'Voice AI Engineering',
      'WEB DEVELOPMENT & DESIGN': 'Web Development & Design',
      'UX & UI DESIGN': 'UX & UI Design'
    };
    return mapping[serviceFilter] || serviceFilter;
  })();

  // Filter projects by service
  $: filteredProjects = projectsData.filter((project) =>
    project.services.some((service) =>
      service.toLowerCase() === properServiceName.toLowerCase()
    )
  );

  $: visibleProjects = filteredProjects.slice(0, projectsToShow).map((p) => ({
    ...p,
    category: p.deliverables?.[0] || 'Project'
  }));

  $: hasMore = filteredProjects.length > projectsToShow;
  $: totalProjects = filteredProjects.length;

  function loadMore() {
    projectsToShow += PROJECTS_PER_LOAD;
  }

  function getFilterUrl(filter: string): string {
    return `/projects/${filter.toLowerCase().replace(/\s+/g, '-')}`;
  }
</script>

<svelte:head>
  <title>{properServiceName} Projects — Techyor Portfolio</title>
  <meta
    name="description"
    content="Browse Techyor's {properServiceName} projects. {totalProjects}+ shipped {properServiceName} products including custom solutions for teams worldwide."
  />

  <meta property="og:type" content="website" />
  <meta property="og:title" content="{properServiceName} Projects — Techyor" />
  <meta
    property="og:description"
    content="{totalProjects}+ {properServiceName} projects: websites, apps, custom solutions built for leading brands."
  />
  <meta property="og:image" content="https://www.techyor.com/og.png" />
</svelte:head>

<main class="overflow-hidden">
  <!-- Header -->
  <div class="container mx-auto mt-10 px-container md:mt-14 lg:mt-20">
    <h1 class="text-5xl md:text-6xl lg:text-7xl">{properServiceName}.</h1>
    <p class="mt-6 max-w-2xl text-xl text-foreground-secondary">
      {totalProjects} project{totalProjects !== 1 ? 's' : ''} delivered
    </p>
  </div>

  <!-- Back to Projects Link -->
  <div class="container mx-auto mb-8 mt-8 px-container md:mt-12">
    <a href="/projects" class="text-sm text-foreground-secondary transition-colors hover:text-foreground">
      ← Back to all projects
    </a>
  </div>

  {#if visibleProjects.length > 0}
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
  {:else}
    <!-- No Projects Found -->
    <div class="container mx-auto flex flex-col items-center justify-center px-container py-20 text-center">
      <h2 class="text-2xl font-semibold text-foreground-secondary">
        No projects found for {properServiceName}
      </h2>
      <p class="mt-4 text-foreground-secondary">
        <a href="/projects" class="text-foreground transition-colors hover:text-foreground-secondary">
          View all projects →
        </a>
      </p>
    </div>
  {/if}
</main>
