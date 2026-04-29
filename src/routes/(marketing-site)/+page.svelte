<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { projectsData } from '$lib/data/projects';
  import SmallHighlights from '$components/pages/home/small-highlights.svelte';
  import Newton from '$components/blocks/newton.svelte';
  import TextWithMedia from '$components/blocks/text-with-media.svelte';
  import AboutGrid from '$components/blocks/about-grid.svelte';
  import CareersListBlock from '$components/blocks/careers-list.svelte';
  import FaqsListBlock from '$components/blocks/faqs-list.svelte';
  import ClientsSection from '$components/sections/clients-section.svelte';
  import BlogEntry from '$components/blog-entry.svelte';
  import ProjectEntry from '$components/project-entry.svelte';
  import { commonFaqsBlock } from '$lib/data/faqs';
  import type { HomePageStoryblok, NewtonStoryblok, TextWithMediaStoryblok, AboutGridStoryblok, CareersListStoryblok } from '$types/bloks';
  import { getImageAttributes } from '$lib/utils/cms';

  let textElements: HTMLElement[] = [];

  onMount(() => {
    textElements.forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  });

  const aboutGridBlock: AboutGridStoryblok = {
    component: 'about-grid',
    about_links: [
      {
        title: 'Mission and values.',
        description: 'Building digital products that solve real problems for real people. It\'s the why behind every line of code and every pixel we ship.'
      },
      {
        title: 'Perks and benefits.',
        description: 'Flexible hours, remote-friendly, unlimited learning stipend, health cover, and an annual team retreat. The good stuff, and growing.'
      },
      {
        title: 'Career plan.',
        description: 'Your goals shape your path. We pair you with mentors, OKRs, and the room to grow at your own pace.'
      }
    ]
  };

  const aboutBlock: TextWithMediaStoryblok = {
    component: 'text-with-media',
    eyebrow: 'About Techyor.',
    title: 'A digital product studio that ships.',
    description: 'For 8+ years, we\'ve been building websites, web apps, and mobile products for ambitious teams across the US, UK, Switzerland, and Australia. Strategy-led, design-driven, engineered to last — we partner with founders and product teams who care about the craft as much as we do.',
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
    title2: 'End-to-end digital product development.',
    description: 'Custom websites, web and mobile apps, e-commerce stores, AI-powered tools, automation workflows, and robotics interfaces — all built from scratch by a single team. We take products from research and strategy through design and into production code, so nothing gets lost in handoff.',
    cta_label: 'Explore services',
    cta_link: {
      cached_url: '/services',
      linktype: 'story',
      story: undefined
    }
  };

  const careersBlock: CareersListStoryblok = {
    component: 'careers-list',
    title: 'Careers.',
    cta_label: 'See all positions',
    cta_link: {
      cached_url: '/careers',
      linktype: 'story',
      story: undefined
    },
    handbook_title: 'Making it happen, with(out) chaos.',
    handbook_description: 'We think, design, develop, and launch digital products — that\'s the bottom line.\n\nIf you\'d like to know how we actually work day to day, our Handbook is the long read. Make a coffee first.',
    handbook_cta_text: 'Read Handbook',
    handbook_cta_link: {
      cached_url: '/handbook',
      linktype: 'story',
      story: undefined
    },
    handbook_image: undefined
  };

  const stats = [
    { value: '8+', label: 'Years building digital products' },
    { value: '80+', label: 'Websites and apps shipped' },
    { value: '4', label: 'Continents served' },
    { value: '100%', label: 'Built in-house, end to end' }
  ];

  const capabilities = [
    {
      title: 'Strategy.',
      description: 'Discovery, product definition, user research, and growth planning — the groundwork that turns ideas into products people use.'
    },
    {
      title: 'Design.',
      description: 'UX and UI design, brand identity, design systems, and motion. Interfaces that look the part and feel right at every step.'
    },
    {
      title: 'Development.',
      description: 'Modern front-end, scalable back-end, mobile, AI integrations, and automation. Engineered to be fast, secure, and built to last.'
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
    ...projectsData.map(project => ({
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
  <title>Techyor — Custom Web, App & AI Product Development Agency</title>
  <meta name="description" content="Techyor is a digital product agency in Chandigarh, India, building custom websites, web apps, mobile apps, e-commerce, AI tools, and automation for clients across the US, UK, Switzerland, and Australia. 8+ years. 80+ products shipped." />
  <meta name="keywords" content="digital product agency, web development Chandigarh, custom software development India, mobile app development, AI development agency, e-commerce development, website design India, automation development" />
  <meta property="og:title" content="Techyor — Custom Digital Product Development" />
  <meta property="og:description" content="Strategy-led, design-driven digital products. 8+ years. 80+ shipped. Trusted by global teams." />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<main class="overflow-hidden">
  <!-- Hero Section -->
  <div class="container mx-auto px-container">
    <h1 class="mt-10 text-7xl font-bold md:mt-14 lg:mt-20">
      <span bind:this={textElements[0]} class="mr-1 inline-block transition-all duration-500 ease-[cubic-bezier(0.34, 1.56, 0.64, 1)]" style="opacity: 1; transform: translateY(0);">Think.</span>
      <span bind:this={textElements[1]} class="mr-1 inline-block transition-all duration-500 ease-[cubic-bezier(0.34, 1.56, 0.64, 1)]" style="opacity: 1; transform: translateY(0);">Design.</span>
      <br />
      <span bind:this={textElements[2]} class="mr-1 inline-block transition-all duration-500 ease-[cubic-bezier(0.34, 1.56, 0.64, 1)]" style="opacity: 1; transform: translateY(0);">Develop.</span>
      <span bind:this={textElements[3]} class="mr-1 inline-block transition-all duration-500 ease-[cubic-bezier(0.34, 1.56, 0.64, 1)]" style="opacity: 1; transform: translateY(0);">Launch.</span>
      <br />
      <span bind:this={textElements[4]} class="mr-1 inline-block transition-all duration-500 ease-[cubic-bezier(0.34, 1.56, 0.64, 1)] text-foreground-secondary" style="opacity: 1; transform: translateY(0);">Scale.</span>
    </h1>
    <p class="mt-6 max-w-3xl text-2xl text-foreground-secondary md:mt-8 lg:mt-10 lg:text-3xl">
      Techyor is a digital product studio building custom websites, apps, AI tools, and automation for ambitious teams across the US, UK, Switzerland, and Australia.
    </p>
  </div>

  <!-- Stats Strip -->
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

  <!-- Why Us / Capabilities Strip -->
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

  <!-- Featured Content Section -->
  <div class="transition-all duration-700 ease-[cubic-bezier(0.34, 1.56, 0.64, 1)] opacity-100 translate-y-0">
    <div class="container mx-auto px-container">
      <!-- Featured Projects & Blog -->
      <section class="mb-8 mt-10 md:mt-14 lg:mt-20">
        <SmallHighlights highlights={smallHighlights.slice(0, 12)} />
        </section>

      <!-- Showreel Video -->
      <section class="relative overflow-hidden rounded-lg">
        <div class="pointer-events-none absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-black/10"></div>
        <video poster="/assets/storyblok/new-showreel-cover.jpg" class="aspect-video h-auto w-full bg-background-offset [&[poster]]:h-full [&[poster]]:w-full [&[poster]]:bg-background [&[poster]]:object-cover" playsinline="">
          <source type="video/mp4" src="/assets/storyblok/significareel.mp4" />
          <track kind="captions" srclang="en" label="English" />
        </video>
      </section>
    </div>
  </div>

  <!-- Selected Work Section -->
  <section class="mt-10 md:mt-14 lg:mt-20 mb-12 md:mb-16 lg:mb-20">
    <div class="container mx-auto px-container">
      <h2 class="text-5xl text-foreground-secondary">Selected work.</h2>
      <p class="text-5xl">Products we're proud of.</p>
    </div>
    <div class="mt-4 md:mt-6 lg:mt-8">
      {#each smallHighlights.filter(h => h.content.component === 'project').slice(0, 4) as project}
        {@const projectData = projectsData.find(p => p.slug === project.slug)}
        <ProjectEntry project={{...project, category: projectData?.deliverables?.[0]}} variant="default" />
      {/each}
    </div>
    <div class="mt-8 flex justify-center md:mt-10 lg:mt-12">
      <a href="/projects" class="group relative inline-flex items-center justify-center gap-1.5 overflow-hidden whitespace-nowrap text-md font-medium leading-none outline-none transition-all hover:ring-4 focus-visible:ring-4 active:scale-[0.98] active:ring-2 disabled:pointer-events-none disabled:opacity-60 h-11 rounded-md px-5 bg-foreground text-background">
        View all projects
      </a>
    </div>
  </section>

  <!-- Services Section with Newton -->
  <Newton block={newtonBlock} />

  <!-- About Section -->
  <TextWithMedia block={aboutBlock} />

  <!-- About Grid Section -->
  <AboutGrid block={aboutGridBlock} />

  <!-- Careers Section -->
  <CareersListBlock block={careersBlock} />

  <!-- Blog Section -->
  <section class="mt-10 md:mt-14 lg:mt-20">
    <div class="container mx-auto px-container">
      <h2 class="text-5xl text-foreground-secondary">Insights.</h2>
      <p class="text-5xl">Notes from the studio.</p>
    </div>
    <div class="mt-4 md:mt-6 lg:mt-8">
      {#each smallHighlights.filter(h => h.content.component === 'blog-post').slice(0, 12) as post}
        <BlogEntry post={post} />
      {/each}
    </div>
  </section>

  <!-- Clients Section -->
  <ClientsSection title="Trusted by teams in the US, UK, Switzerland, and Australia." />

  <!-- FAQ Section -->
  <FaqsListBlock block={commonFaqsBlock} />
</main>
