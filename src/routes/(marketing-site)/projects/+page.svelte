<script lang="ts">
  import { slide } from 'svelte/transition';

  const projects = [
    {
      id: 1,
      slug: 'coffee-king',
      name: 'Coffee King.',
      tagline: 'A unified e-commerce platform selling to consumers and businesses alike.',
      image: 'https://a.storyblok.com/f/198185/3200x1800/409dac6deb/new-cover-coffee-king-website.png/m/2880x0/',
      services: ['E-commerce', 'Strategy'],
      deliverables: ['Website'],
      awards: []
    },
    {
      id: 2,
      slug: 'mishmash',
      name: 'Mishmash.',
      tagline: 'Unique e-commerce design for the ultimate product experience.',
      image: 'https://a.storyblok.com/f/198185/1600x1200/d6164a5867/mishmash3.jpg/m/1440x1080/',
      services: ['Design'],
      deliverables: ['Web App'],
      awards: [
        {
          name: 'Red Dot',
          label: 'Award',
          icon: 'https://a.storyblok.com/f/198185/168x132/696778595b/reddot.webp'
        },
        {
          name: 'European Design',
          label: 'Gold Award',
          icon: 'https://a.storyblok.com/f/198185/112x88/c5732814c2/european-design-nominee-gold.png'
        },
        {
          name: 'iF Design',
          label: 'Award',
          icon: 'https://a.storyblok.com/f/198185/168x132/9f64598050/ifdesign.webp'
        },
        {
          name: 'German Design',
          label: 'Gold Award',
          icon: 'https://a.storyblok.com/f/198185/168x132/3a615f33cf/gda-badge.png'
        },
        {
          name: 'Distinction',
          label: 'Awwwards',
          icon: 'https://a.storyblok.com/f/198185/122x88/84389cd1be/awwwardshm.png'
        }
      ]
    },
    {
      id: 3,
      slug: 'dia',
      name: 'Dia.',
      tagline: 'A fertility journey app helping users track and understand their wellness.',
      image: 'https://a.storyblok.com/f/198185/3200x2400/8028cc1a7f/diesta_thumbnail.webp/m/1440x1080/',
      services: ['Mobile Development'],
      deliverables: ['Mobile App'],
      awards: []
    },
    {
      id: 4,
      slug: 'hey-harper',
      name: 'Hey Harper.',
      tagline: 'E-commerce platform redesign for a luxury fashion brand.',
      image: 'https://a.storyblok.com/f/198185/3200x2400/65325739b7/heythumb2.jpg/m/1440x1080/',
      services: ['E-commerce', 'Design'],
      deliverables: ['Website'],
      awards: []
    },
    {
      id: 5,
      slug: 'zoko',
      name: 'Zoko.',
      tagline: 'A comprehensive productivity platform for teams and individuals.',
      image: 'https://a.storyblok.com/f/198185/1601x1201/540dfeb209/zokothumb-1.jpg/m/1440x1080/',
      services: ['Strategy', 'Development'],
      deliverables: ['Web App'],
      awards: []
    },
    {
      id: 6,
      slug: 'passaporte-natura-2000',
      name: 'Passaporte Natura 2000.',
      tagline: 'A gamified exploration app for discovering protected natural areas.',
      image: 'https://a.storyblok.com/f/198185/1344x1008/561f9ba005/pnthumb1.jpg/m/1440x1080/',
      services: ['Mobile Development'],
      deliverables: ['Mobile App'],
      awards: []
    },
    {
      id: 7,
      slug: 'allo',
      name: 'allO.',
      tagline: 'A marketplace platform connecting creators and customers.',
      image: 'https://a.storyblok.com/f/198185/2016x1512/c83505ff60/allo-thumbnail-01.png/m/1440x1080/',
      services: ['E-commerce'],
      deliverables: ['Web App'],
      awards: []
    },
    {
      id: 8,
      slug: 'significa',
      name: 'Significa.',
      tagline: 'Portfolio website showcasing our work and expertise.',
      image: 'https://a.storyblok.com/f/198185/1600x1200/e233f87cdf/thumbnail-significa.jpg/m/1440x1080/',
      services: ['Design', 'Development'],
      deliverables: ['Website'],
      awards: []
    },
    {
      id: 9,
      slug: 'curationist',
      name: 'Curationist.',
      tagline: 'A platform for curated content and collections.',
      image: 'https://a.storyblok.com/f/198185/3200x2400/2496eaed03/curationist-thumb-01.jpg/m/1440x1080/',
      services: ['Design', 'Development'],
      deliverables: ['Web App'],
      awards: []
    },
    {
      id: 10,
      slug: 'vertbase',
      name: 'Vertbase.',
      tagline: 'A cryptocurrency exchange platform.',
      image: 'https://a.storyblok.com/f/198185/800x600/b4f32de86f/vertabasethumb.png/m/1440x1080/',
      services: ['Development'],
      deliverables: ['Web App'],
      awards: []
    }
  ];

  let showFilters = false;
  let selectedFilters: string[] = [];

  const allServices = [...new Set(projects.flatMap(p => p.services))].sort();
  const allDeliverables = [...new Set(projects.flatMap(p => p.deliverables))].sort();

  $: filteredProjects = selectedFilters.length === 0
    ? projects
    : projects.filter(p =>
        selectedFilters.some(f =>
          p.services.includes(f) || p.deliverables.includes(f)
        )
      );

  function toggleFilter(filter: string) {
    if (selectedFilters.includes(filter)) {
      selectedFilters = selectedFilters.filter(f => f !== filter);
    } else {
      selectedFilters = [...selectedFilters, filter];
    }
  }

  function clearFilters() {
    selectedFilters = [];
  }
</script>

<svelte:head>
  <title>Projects - Techyor</title>
  <meta name="description" content="Explore our portfolio of digital product design and development projects." />
</svelte:head>

<main class="overflow-hidden">
  <!-- Header -->
  <div class="container mx-auto mt-10 px-container md:mt-14 lg:mt-20">
    <h1 class="text-5xl md:text-6xl lg:text-7xl">
      Projects.
    </h1>
  </div>

  <!-- Filters Button -->
  <div class="lg:mt-18 container mx-auto mb-3 mt-8 flex items-center justify-between px-container md:mt-12">
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
            <path d="m2 4.5 1.2-.1L4.6 4c.6 0 1 0 1.6.2l1.6.1 2 .2c.3 0 .7.3 1.1.3h1.6" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
            <path d="m5 1.9-.1 1.8-.3 1.5v1.5M2 11.3h1.5l.8.4 1.2.2h1.4l3.7-.2 1.6-.2h.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
            <path d="M10.2 8.8a7.3 7.3 0 0 1-.5 2.9l-.1.6c0 .4 0 1 .2 1.4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
          </svg>
        </i>
        <span>{showFilters ? 'Close' : 'Filters'}</span>
      </button>
      {#if selectedFilters.length > 0}
        <span class="inline-flex items-center justify-center h-6 w-6 rounded-full bg-foreground text-background text-xs font-medium">
          {selectedFilters.length}
        </span>
      {/if}
    </div>
    {#if selectedFilters.length > 0}
      <button
        class="text-sm font-medium hover:opacity-80 transition-opacity"
        on:click={clearFilters}
      >
        Clear all
      </button>
    {/if}
  </div>

  <!-- Filter Panel -->
  {#if showFilters}
    <div transition:slide|global={{ duration: 300 }} class="border-b">
      <div class="container mx-auto px-container py-8 md:flex md:gap-12">
        {#if allServices.length > 0}
          <div>
            <p class="text-xs uppercase tracking-wider text-foreground-secondary mb-4">Services</p>
            <div class="flex flex-wrap gap-2">
              {#each allServices as service}
                <button
                  on:click={() => toggleFilter(service)}
                  class={`px-3 py-1.5 text-sm rounded transition-all ${
                    selectedFilters.includes(service)
                      ? 'bg-foreground text-background'
                      : 'border border-border hover:border-foreground'
                  }`}
                >
                  {service}
                </button>
              {/each}
            </div>
          </div>
        {/if}
        {#if allDeliverables.length > 0}
          <div class="mt-6 md:mt-0">
            <p class="text-xs uppercase tracking-wider text-foreground-secondary mb-4">Deliverables</p>
            <div class="flex flex-wrap gap-2">
              {#each allDeliverables as deliverable}
                <button
                  on:click={() => toggleFilter(deliverable)}
                  class={`px-3 py-1.5 text-sm rounded transition-all ${
                    selectedFilters.includes(deliverable)
                      ? 'bg-foreground text-background'
                      : 'border border-border hover:border-foreground'
                  }`}
                >
                  {deliverable}
                </button>
              {/each}
            </div>
          </div>
        {/if}
      </div>
    </div>
  {/if}

  <!-- Projects List -->
  <section>
    {#each filteredProjects as project, index (project.id)}
      {#if index === 0}
        <!-- First Project - Simple Design -->
        <div class="group border-b py-12 transition-colors elevated-links @container first:border-t hover:bg-foreground-tertiary/10">
          <div class="container mx-auto px-container">
            <div class="items-end justify-between @5xl:flex">
              <div class="mr-6">
                <a class="elevated-link" href={`/projects/${project.slug}`}>
                  <h2 class="text-5xl text-foreground-secondary">
                    {project.name}
                  </h2>
                  <p class="text-5xl max-w-3xl">
                    {project.tagline}
                  </p>
                </a>
              </div>
              <a
                class="group relative inline-flex items-center justify-center gap-1.5 overflow-hidden whitespace-nowrap text-md font-medium leading-none outline-none transition-all hover:ring-4 focus-visible:ring-4 active:scale-[0.98] active:ring-2 disabled:pointer-events-none disabled:opacity-60 text-foreground border-border hover:border-border-active focus-visible:border-border-active active:border-border-active border h-11 rounded-md px-5 mt-6"
                href={`/projects/${project.slug}`}
              >
                <span>View project</span>
                <i data-icon="arrow-right" aria-hidden="true">
                  <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 8.5h9M8.5 4.5l3.5 4-3.5 4" stroke="currentColor" stroke-width="1.2" />
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
            <img
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
        <div class="group border-b py-12 transition-colors elevated-links @container first:border-t hover:bg-foreground-tertiary/10">
          <div class="container mx-auto px-container @5xl:flex">
            <div class="flex flex-1 flex-col items-start justify-between">
              <div class="mr-6">
                <a class="elevated-link" href={`/projects/${project.slug}`}>
                  <h2 class="text-5xl text-foreground-secondary">
                    {project.name}
                  </h2>
                  <p class="text-5xl max-w-lg">
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
                class="group relative inline-flex items-center justify-center gap-1.5 overflow-hidden whitespace-nowrap text-md font-medium leading-none outline-none transition-all hover:ring-4 focus-visible:ring-4 active:scale-[0.98] active:ring-2 disabled:pointer-events-none disabled:opacity-60 text-foreground border-border hover:border-border-active focus-visible:border-border-active active:border-border-active border h-11 rounded-md px-5 mt-6"
                href={`/projects/${project.slug}`}
              >
                <span>View project</span>
                <i data-icon="arrow-right" aria-hidden="true">
                  <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 8.5h9M8.5 4.5l3.5 4-3.5 4" stroke="currentColor" stroke-width="1.2" />
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
              <img
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
</main>
