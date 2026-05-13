<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { projectsData } from '$lib/data/projects';
  import SmallHighlights from '$components/pages/home/small-highlights.svelte';
  import Newton from '$components/blocks/newton.svelte';
  import TextWithMedia from '$components/blocks/text-with-media.svelte';
  import AboutGrid from '$components/blocks/about-grid.svelte';
  import FaqsListBlock from '$components/blocks/faqs-list.svelte';
  import ClientsSection from '$components/sections/clients-section.svelte';
  import TeamSection from '$components/sections/team-section.svelte';
  import BlogEntry from '$components/blog-entry.svelte';
  import ProjectEntry from '$components/project-entry.svelte';
  import { commonFaqsBlock, getCommonFaqsForSchema } from '$lib/data/faqs';
  import type {
    HomePageStoryblok,
    NewtonStoryblok,
    TextWithMediaStoryblok,
    AboutGridStoryblok
  } from '$types/bloks';
  import { getImageAttributes } from '$lib/utils/cms';
  import {
    BASE_URL,
    generateOrganizationSchema,
    generateFAQSchema,
    generateProfessionalServiceSchema,
    generateTeamMembersSchema
  } from '$lib/utils/schema';
  import { getFeaturedTestimonials } from '$lib/data/testimonials';
  import { getActiveTeamMembers, type TeamMember } from '$lib/data/team';
  import { isSectionEnabled, type SectionsMap } from '$lib/tenant';

  export let data: {
    page: { title: string | null; description: string | null; meta: Record<string, unknown> } | null;
    sections: SectionsMap;
  };

  $: dbPage = data?.page ?? null;
  $: sections = (data?.sections ?? {}) as SectionsMap;
  $: on = (key: string) => isSectionEnabled(sections, key);
  $: pageTitle = dbPage?.title ?? 'Techyor — Web, App & AI Product Development Studio';
  $: pageDescription =
    dbPage?.description ??
    'Techyor is a digital product studio building custom websites, web apps, mobile apps, e-commerce stores, AI tools, and automation for teams in the US, UK, Switzerland, and Australia. Strategy, design, development — under one roof.';
  $: pageMeta = (dbPage?.meta ?? {}) as Record<string, string>;

  const homeFeaturedTestimonials = getFeaturedTestimonials();
  const homeRatings = homeFeaturedTestimonials
    .map((t) => t.rating)
    .filter((r): r is number => typeof r === 'number');
  const homeReviews = homeFeaturedTestimonials
    .filter((t) => typeof t.rating === 'number')
    .slice(0, 10)
    .map((t) => ({
      rating: t.rating as number,
      body: t.quote,
      author: t.author,
      date: t.date
    }));
  $: tenantMembers = (data?.dbTeamMembers ?? []) as TeamMember[];
  $: schemaMembers = tenantMembers.length > 0 ? tenantMembers : getActiveTeamMembers();
  $: homeTeamSchema = schemaMembers.map((m) => ({
    name: m.name,
    jobTitle: m.role,
    description: m.tagline,
    image: m.avatar,
    url: `/team/${m.slug}`,
    sameAs: m.links.map((l) => l.url)
  }));

  let textElements: HTMLElement[] = [];

  onMount(() => {
    textElements.forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  });

  const aboutGridBlock: AboutGridStoryblok = {
    component: 'about-grid',
    about_links: [
      {
        title: 'Mission and values.',
        description:
          "We build products that actually work. Not features for features' sake. Products that solve real problems for the people using them."
      },
      {
        title: 'Perks and benefits.',
        description:
          "Flexible hours, remote work, health cover, learning budget, and an annual retreat. We try to get the basics right so you can focus on the work."
      },
      {
        title: 'Career plan.',
        description:
          "You grow. We pair you with mentors, give you honest feedback, and fund your learning. Set the pace."
      }
    ]
  };

  const aboutBlock: TextWithMediaStoryblok = {
    component: 'text-with-media',
    eyebrow: 'About Techyor.',
    title: 'We ship products, not promises.',
    description:
      "Eight years in, 80+ projects shipped for teams in the US, UK, Switzerland, and Australia. We handle strategy, design, and code. We move fast. We ship on time.",
    cta: [
      {
        label: 'About us',
        link: {
          cached_url: '/about',
          linktype: 'story',
          story: undefined
        }
      }
    ],
    media: undefined,
    revert_orientation: false
  };

  const newtonBlock: NewtonStoryblok = {
    component: 'newton',
    title1: 'Our services.',
    title2: 'One team. No handoffs.',
    description:
      "Websites, apps, e-commerce, AI tools, automation. We build it all in-house. Strategy and research upfront, design, code, launch. Same team the whole way, so ideas don't get lost between departments.",
    cta_label: 'Explore services',
    cta_link: {
      cached_url: '/services',
      linktype: 'story',
      story: undefined
    }
  };

  const stats = [
    { value: '8+', label: 'Years in' },
    { value: '80+', label: 'Shipped' },
    { value: '4', label: 'Time zones' },
    { value: '100%', label: 'One team' }
  ];

  const capabilities = [
    {
      title: 'Strategy.',
      description:
        "We start with research. User interviews, market analysis, product definition. Get the strategy right before you build."
    },
    {
      title: 'Design.',
      description:
        "UI and UX that works on screen and in the browser. We sweat the details so your users don't have to."
    },
    {
      title: 'Development.',
      description:
        "Front-end, back-end, mobile, AI integrations. Code that performs, scales, and doesn't break when load spikes hit."
    }
  ];

  const sampleCareers = [
    {
      id: 1,
      uuid: 'career-1',
      name: 'Product Designer',
      slug: 'product-designer',
      full_slug: '/careers/product-designer',
      created_at: '2024-01-01T00:00:00.000Z',
      published_at: '2024-01-01T00:00:00.000Z',
      first_published_at: '2024-01-01T00:00:00.000Z',
      tag_list: [],
      content: {}
    },
    {
      id: 2,
      uuid: 'career-2',
      name: 'Senior Front-end Developer',
      slug: 'frontend-developer',
      full_slug: '/careers/frontend-developer',
      created_at: '2024-01-01T00:00:00.000Z',
      published_at: '2024-01-01T00:00:00.000Z',
      first_published_at: '2024-01-01T00:00:00.000Z',
      tag_list: [],
      content: {}
    }
  ];

  const smallHighlights: HomePageStoryblok['small_highlights'] = [
    ...projectsData.map((project) => ({
      id: project.id,
      uuid: `uuid-${project.id}`,
      name: project.name,
      slug: project.slug,
      full_slug: `/projects/${project.slug}`,
      content: {
        component: 'project',
        tagline: project.tagline,
        thumbnail: [
          {
            id: project.id,
            alt: project.name,
            name: project.slug,
            focus: '',
            title: project.name,
            filename: project.image
          }
        ],
        cover: undefined
      }
    })),
    {
      id: 3,
      uuid: 'uuid-3',
      name: 'The Future of E-commerce.',
      slug: 'the-future-of-ecommerce',
      full_slug: '/blog/the-future-of-ecommerce',
      created_at: '2024-03-15T00:00:00.000Z',
      published_at: '2024-03-15T00:00:00.000Z',
      first_published_at: '2024-03-15T00:00:00.000Z',
      tag_list: ['E-commerce', 'Trends'],
      content: {
        component: 'blog-post',
        tagline: undefined,
        thumbnail: undefined,
        cover: {
          id: 3,
          alt: 'Blog',
          name: 'blog',
          focus: '',
          title: 'Blog',
          filename: '/assets/storyblok/allo_article_cover.png'
        },
        authors: [
          {
            id: 1,
            uuid: 'author-1',
            name: 'Sarah Johnson',
            slug: 'sarah-johnson',
            full_slug: 'team/sarah-johnson',
            content: {
              position: 'Design Lead',
              photo: {
                id: 1,
                alt: 'Sarah Johnson',
                name: 'sarah',
                focus: '',
                title: 'Sarah Johnson',
                filename: '/assets/storyblok/placeholder-author.jpg'
              },
              is_active: true
            },
            created_at: '',
            published_at: '',
            first_published_at: null,
            tag_list: []
          }
        ],
        external_authors: [],
        reading_time: 8
      }
    }
  ];
</script>

<svelte:head>
  <title>{pageTitle}</title>
  <meta name="description" content={pageDescription} />
  {#if pageMeta.keywords}
    <meta name="keywords" content={pageMeta.keywords} />
  {/if}

  <meta property="og:type" content="website" />
  <meta property="og:title" content={pageMeta.ogTitle ?? pageTitle} />
  <meta property="og:description" content={pageMeta.ogDescription ?? pageDescription} />
  <meta property="og:image" content="{BASE_URL}{pageMeta.ogImage ?? '/api/og/home'}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Techyor — digital product studio" />

  <meta name="twitter:card" content={pageMeta.twitterCard ?? 'summary_large_image'} />
  <meta name="twitter:site" content="@TechyorDotCo" />
  <meta name="twitter:creator" content="@TechyorDotCo" />
  <meta name="twitter:title" content={pageMeta.ogTitle ?? pageTitle} />
  <meta name="twitter:description" content={pageMeta.ogDescription ?? pageDescription} />
  <meta name="twitter:image" content="{BASE_URL}{pageMeta.ogImage ?? '/api/og/home'}" />
  <meta name="twitter:image:alt" content="Techyor — digital product studio" />

  {@html `<${'script'} type="application/ld+json">${generateOrganizationSchema()}</${'script'}>`}
  {@html `<${'script'} type="application/ld+json">${generateProfessionalServiceSchema({
    description:
      'A digital product studio building custom websites, web apps, mobile apps, e-commerce stores, AI tools, and automation for teams in the US, UK, Switzerland, and Australia.',
    url: BASE_URL,
    imagePath: '/api/og/home',
    ratings: homeRatings,
    reviews: homeReviews
  })}</${'script'}>`}
  {@html `<${'script'} type="application/ld+json">${generateFAQSchema(getCommonFaqsForSchema())}</${'script'}>`}
  {@html `<${'script'} type="application/ld+json">${generateTeamMembersSchema(homeTeamSchema)}</${'script'}>`}
</svelte:head>

<main class="overflow-hidden">
  {#if on('hero')}
    <div class="container mx-auto px-container">
      <h1 class="mt-10 text-7xl font-bold md:mt-14 lg:mt-20">
        <span
          bind:this={textElements[0]}
          class="ease-[cubic-bezier(0.34, 1.56, 0.64, 1)] mr-1 inline-block transition-all duration-500"
          style="opacity: 1; transform: translateY(0);">Think.</span
        >
        <span
          bind:this={textElements[1]}
          class="ease-[cubic-bezier(0.34, 1.56, 0.64, 1)] mr-1 inline-block transition-all duration-500"
          style="opacity: 1; transform: translateY(0);">Design.</span
        >
        <br />
        <span
          bind:this={textElements[2]}
          class="ease-[cubic-bezier(0.34, 1.56, 0.64, 1)] mr-1 inline-block transition-all duration-500"
          style="opacity: 1; transform: translateY(0);">Build.</span
        >
        <br />
        <span
          bind:this={textElements[3]}
          class="ease-[cubic-bezier(0.34, 1.56, 0.64, 1)] mr-1 inline-block text-foreground-secondary transition-all duration-500"
          style="opacity: 1; transform: translateY(0);">Then keep shipping.</span
        >
      </h1>
      <p
        data-speakable
        class="mt-6 max-w-3xl text-2xl text-foreground-secondary md:mt-8 lg:mt-10 lg:text-3xl"
      >
        Techyor is a product studio. For eight years we've built websites, apps, and AI tools for
        teams in the US, UK, Switzerland, and Australia.
      </p>
    </div>
  {/if}

  {#if on('stats')}
    <section class="mt-10 md:mt-14 lg:mt-20">
      <div class="container mx-auto px-container">
        <div class="grid grid-cols-2 gap-6 border-y py-10 md:grid-cols-4 md:gap-8 md:py-14">
          {#each stats as stat}
            <div class="flex flex-col">
              <p class="text-5xl font-bold lg:text-6xl">{stat.value}</p>
              <p class="mt-2 text-base text-foreground-secondary md:text-lg">{stat.label}</p>
            </div>
          {/each}
        </div>
      </div>
    </section>
  {/if}

  {#if on('capabilities')}
    <section class="mt-10 md:mt-14 lg:mt-20">
      <div class="container mx-auto px-container">
        <h2 class="text-5xl text-foreground-secondary">What we do.</h2>
        <p class="text-5xl">Strategy. Design. Development.</p>
        <div class="mt-8 grid grid-cols-1 gap-8 md:mt-12 md:grid-cols-3 md:gap-10">
          {#each capabilities as cap}
            <div class="flex flex-col">
              <h3 class="text-3xl font-semibold">{cap.title}</h3>
              <p class="mt-3 text-xl text-foreground-secondary">{cap.description}</p>
            </div>
          {/each}
        </div>
      </div>
    </section>
  {/if}

  <div
    class="ease-[cubic-bezier(0.34, 1.56, 0.64, 1)] translate-y-0 opacity-100 transition-all duration-700"
  >
    <div class="container mx-auto px-container">
      {#if on('featured-highlights')}
        <section class="mb-8 mt-10 md:mt-14 lg:mt-20">
          <SmallHighlights highlights={smallHighlights.slice(0, 12)} />
        </section>
      {/if}

      {#if on('showreel')}
        <section class="relative overflow-hidden rounded-lg">
          <div
            class="pointer-events-none absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-black/10"
          ></div>
          <video
            poster="/_optimized/assets/storyblok/new-showreel-cover-w768.jpg"
            class="aspect-video h-auto w-full bg-background-offset [&[poster]]:h-full [&[poster]]:w-full [&[poster]]:bg-background [&[poster]]:object-cover"
            playsinline=""
          >
            <source type="video/mp4" src="/assets/storyblok/significareel.mp4" />
            <track kind="captions" srclang="en" label="English" />
          </video>
        </section>
      {/if}
    </div>
  </div>

  {#if on('selected-work')}
    <section class="mb-12 mt-10 md:mb-16 md:mt-14 lg:mb-20 lg:mt-20">
      <div class="container mx-auto px-container">
        <h2 class="text-5xl text-foreground-secondary">Selected work.</h2>
        <p class="text-5xl">Products we're proud of.</p>
      </div>
      <div class="mt-4 md:mt-6 lg:mt-8">
        {#each smallHighlights
          .filter((h) => h.content.component === 'project')
          .slice(0, 4) as project}
          {@const projectData = projectsData.find((p) => p.slug === project.slug)}
          <ProjectEntry
            project={{ ...project, category: projectData?.deliverables?.[0] }}
            variant="default"
          />
        {/each}
      </div>
      <div class="mt-8 flex justify-center md:mt-10 lg:mt-12">
        <a
          href="/projects"
          class="text-md group relative inline-flex h-11 items-center justify-center gap-1.5 overflow-hidden whitespace-nowrap rounded-md bg-foreground px-5 font-medium leading-none text-background outline-none transition-all hover:ring-4 focus-visible:ring-4 active:scale-[0.98] active:ring-2 disabled:pointer-events-none disabled:opacity-60"
        >
          View all projects
        </a>
      </div>
    </section>
  {/if}

  {#if on('services-newton')}
    <Newton block={newtonBlock} />
  {/if}

  {#if on('about-text-media')}
    <TextWithMedia block={aboutBlock} />
  {/if}

  {#if on('about-grid')}
    <AboutGrid block={aboutGridBlock} />
  {/if}

  {#if on('team')}
    <TeamSection
      title="Meet the people building it."
      subtitle="Hire a specialist directly."
      showViewAll
    />
  {/if}

  {#if on('blog-insights')}
    <section class="mt-10 md:mt-14 lg:mt-20">
      <div class="container mx-auto px-container">
        <h2 class="text-5xl text-foreground-secondary">Insights.</h2>
        <p class="text-5xl">Notes from the studio.</p>
      </div>
      <div class="mt-4 md:mt-6 lg:mt-8">
        {#each smallHighlights
          .filter((h) => h.content.component === 'blog-post')
          .slice(0, 12) as post}
          <BlogEntry {post} />
        {/each}
      </div>
    </section>
  {/if}

  {#if on('clients')}
    <ClientsSection title="Trusted by teams in the US, UK, Switzerland, and Australia." />
  {/if}

  {#if on('faqs')}
    <FaqsListBlock block={commonFaqsBlock} />
  {/if}
</main>
