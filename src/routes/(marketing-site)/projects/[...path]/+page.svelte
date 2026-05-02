<script lang="ts">
  import { page } from '$app/stores';
  import { projectsData } from '$lib/data/projects';
  import { getServiceDescription } from '$lib/data/service-descriptions';
  import OptimizedImage from '$components/optimized-image.svelte';
  import ContactForm from '$components/contact-form.svelte';

  console.log('🚀 Service page component loaded!');

  let projectsToShow = 8;
  const PROJECTS_PER_LOAD = 8;

  $: {
    projectsToShow = 8;
  }

  // Get service from URL path
  $: servicePath = $page.params.path;
  console.log('📍 servicePath changed:', servicePath);

  // Convert kebab-case slug back to proper service/deliverable name
  $: properServiceName = (() => {
    const slug = servicePath ? servicePath.split('/')[0] : '';

    // Mapping of URL slugs to proper names
    const mapping: Record<string, string> = {
      'ai-machine-learning': 'AI & Machine Learning',
      'backend-engineering': 'Backend Engineering',
      'business-services': 'Business Services',
      'design-creative': 'Design & Creative',
      'education-training': 'Education & Training',
      'e-commerce': 'E-commerce',
      'financial-services': 'Financial Services',
      'food-beverage': 'Food & Beverage',
      'health-wellness': 'Health & Wellness',
      'mobile-app-development': 'Mobile App Development',
      'python-backend-engineering': 'Python Backend Engineering',
      'react-nextjs-development': 'React & Next.js Development',
      'real-estate-property': 'Real Estate & Property',
      'saas-platforms': 'SaaS Platforms',
      'subscription-platforms': 'Subscription Platforms',
      'voice-ai-engineering': 'Voice AI Engineering',
      'web-development-design': 'Web Development & Design',
      'ux-ui-design': 'UX & UI Design',
      'website': 'Website',
      'e-commerce-platforms': 'E-Commerce Platforms',
      'web-applications': 'Web Applications',
      'mobile-applications': 'Mobile Applications',
      'apis-backend-services': 'APIs & Backend Services',
      'design-branding': 'Design & Branding',
      'content-management-systems': 'Content Management Systems',
      'business-management-platforms': 'Business Management Platforms',
      'single-protein-navigation-system': 'Single-Protein Navigation System',
      'reviews-press-surfaces': 'Reviews & Press Surfaces'
    };

    const result = mapping[slug] || slug.replace(/-/g, ' ');
    console.log('properServiceName computed:', { slug, result });
    return result;
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
    const slug = filter
      .toLowerCase()
      .replace(/&/g, '')  // Remove ampersand
      .replace(/\s+/g, '-')  // Replace spaces with dashes
      .replace(/[^\w-]/g, '');  // Remove special characters
    return `/projects/${slug}`;
  }

  function isActiveService(service: string): boolean {
    const isActive = service.toLowerCase() === properServiceName.toLowerCase();
    console.log('isActiveService:', {
      service,
      properServiceName,
      serviceLower: service.toLowerCase(),
      properNameLower: properServiceName.toLowerCase(),
      isActive
    });
    return isActive;
  }

  // Extract unique services from all projects
  $: uniqueServices = (() => {
    const serviceCount = new Map<string, number>();
    projectsData.forEach((p) => {
      p.services.forEach((s) => {
        serviceCount.set(s, (serviceCount.get(s) || 0) + 1);
      });
    });
    return Array.from(serviceCount.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([service]) => service);
  })();

  // Debug logging
  $: console.log('Service page loaded:', {
    servicePath,
    serviceFilter,
    properServiceName,
    totalProjects: filteredProjects.length
  });
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

  <!-- Hero Section with SEO Description -->
  <div class="container mx-auto px-container py-8 md:py-12 lg:py-16">
    <p class="max-w-3xl text-base leading-relaxed text-foreground-secondary md:text-lg">
      {getServiceDescription(properServiceName)}
    </p>
    <!-- Action Buttons -->
    <div class="mt-8 flex flex-wrap gap-4">
      <a href="#projects-section" class="inline-flex h-11 items-center justify-center gap-1.5 rounded-md border border-foreground bg-foreground px-6 font-medium text-background outline-none transition-all hover:ring-4 focus-visible:ring-4 active:scale-[0.98] active:ring-2">
        <span>View Our Work</span>
        <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 3v9M11.5 8.5l-3.5 3.5-3.5-3.5" stroke="currentColor" stroke-width="1.2" />
        </svg>
      </a>
      <a href="#testimonials-section" class="inline-flex h-11 items-center justify-center gap-1.5 rounded-md border border-border px-6 font-medium outline-none transition-all hover:border-foreground hover:ring-4 focus-visible:border-foreground focus-visible:ring-4 active:scale-[0.98] active:ring-2">
        <span>See What Clients Say</span>
        <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 4h12M2 8h12M2 12h8" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
        </svg>
      </a>
    </div>
  </div>

  <!-- Service Filter Panel -->
  <div class="border-b">
    <div class="container mx-auto px-container py-8">
      <p class="mb-4 text-xs uppercase tracking-wider text-foreground-secondary">Other Services</p>
      <div class="flex flex-wrap gap-2">
        {#each uniqueServices as service}
          <a
            href={getFilterUrl(service)}
            class="rounded border px-3 py-1.5 text-sm transition-all {isActiveService(service)
              ? 'border-foreground bg-foreground text-background'
              : 'border-border hover:border-foreground hover:bg-foreground-tertiary/5'}"
          >
            {service}
          </a>
        {/each}
      </div>
    </div>
  </div>

  {#if visibleProjects.length > 0}
    <!-- Projects List -->
    <section id="projects-section">
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

  <!-- Testimonials Section -->
  <section id="testimonials-section" class="border-t">
    <div class="container mx-auto px-container py-12 md:py-16 lg:py-20">
      <h2 class="text-4xl font-semibold md:text-5xl">What Our Clients Say</h2>
      <p class="mt-4 max-w-2xl text-lg text-foreground-secondary">
        Real feedback from teams who've built {properServiceName.toLowerCase()} with us
      </p>
      <div class="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div class="rounded-lg border border-border bg-background-offset p-8">
          <div class="mb-4 flex gap-1">
            {#each [1, 2, 3, 4, 5] as _}
              <svg width="16" height="16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 1l2.39 4.83h5.34l-4.32 3.14 1.65 5.07L8 10.66l-4.32 3.14 1.65-5.07-4.32-3.14h5.34z" />
              </svg>
            {/each}
          </div>
          <p class="text-foreground-secondary">
            "Techyor delivered exactly what we needed. Their expertise in {properServiceName.toLowerCase()} was instrumental in our success."
          </p>
          <div class="mt-6 flex items-center gap-3">
            <div class="h-10 w-10 rounded-full bg-foreground-tertiary/20" />
            <div>
              <p class="text-sm font-medium text-foreground">Client Name</p>
              <p class="text-xs text-foreground-secondary">Founder & CEO</p>
            </div>
          </div>
        </div>

        <div class="rounded-lg border border-border bg-background-offset p-8">
          <div class="mb-4 flex gap-1">
            {#each [1, 2, 3, 4, 5] as _}
              <svg width="16" height="16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 1l2.39 4.83h5.34l-4.32 3.14 1.65 5.07L8 10.66l-4.32 3.14 1.65-5.07-4.32-3.14h5.34z" />
              </svg>
            {/each}
          </div>
          <p class="text-foreground-secondary">
            "Working with Techyor was seamless. They understood our vision and brought it to life with exceptional quality."
          </p>
          <div class="mt-6 flex items-center gap-3">
            <div class="h-10 w-10 rounded-full bg-foreground-tertiary/20" />
            <div>
              <p class="text-sm font-medium text-foreground">Another Client</p>
              <p class="text-xs text-foreground-secondary">Product Manager</p>
            </div>
          </div>
        </div>

        <div class="rounded-lg border border-border bg-background-offset p-8">
          <div class="mb-4 flex gap-1">
            {#each [1, 2, 3, 4, 5] as _}
              <svg width="16" height="16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 1l2.39 4.83h5.34l-4.32 3.14 1.65 5.07L8 10.66l-4.32 3.14 1.65-5.07-4.32-3.14h5.34z" />
              </svg>
            {/each}
          </div>
          <p class="text-foreground-secondary">
            "Outstanding results. Techyor's team went above and beyond to ensure our {properServiceName.toLowerCase()} project exceeded expectations."
          </p>
          <div class="mt-6 flex items-center gap-3">
            <div class="h-10 w-10 rounded-full bg-foreground-tertiary/20" />
            <div>
              <p class="text-sm font-medium text-foreground">Happy Founder</p>
              <p class="text-xs text-foreground-secondary">CEO</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer CTA Section -->
  <section class="border-t">
    <div class="container mx-auto px-container py-12 md:py-16 lg:py-20">
      <div class="grid gap-12 lg:grid-cols-2">
        <div>
          <h2 class="text-4xl font-semibold md:text-5xl">Ready to Get Started?</h2>
          <p class="mt-4 text-lg text-foreground-secondary">
            Let's discuss how we can build the perfect {properServiceName.toLowerCase()} for your business.
          </p>
        </div>
        <div>
          <ContactForm />
        </div>
      </div>
    </div>
  </section>
</main>
