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
    generatePersonSchema,
    generateProfessionalServiceSchema,
    generateTeamMembersSchema
  } from '$lib/utils/schema';
  import {
    filterFeaturedTestimonials,
    getFeaturedTestimonials,
    type Testimonial
  } from '$lib/data/testimonials';
  import { getActiveTeamMembers, type TeamMember } from '$lib/data/team';
  import { isSectionEnabled, type SectionsMap } from '$lib/tenant';
  import { getHomeContent } from '$lib/data/home-content';

  export let data: {
    page: { title: string | null; description: string | null; meta: Record<string, unknown> } | null;
    sections: SectionsMap;
  };

  $: dbPage = data?.page ?? null;
  $: sections = (data?.sections ?? {}) as SectionsMap;
  $: tenantSlug = ($page.data?.tenant?.slug as string | undefined) ?? null;
  $: home = getHomeContent(tenantSlug);
  $: isAgency =
    (($page.data?.tenant?.meta as Record<string, unknown> | undefined)?.isAgency as
      | boolean
      | undefined) === true;
  // A section renders when BOTH the per-tenant content config AND the
  // Supabase page_sections row say it is enabled. The content config wins
  // when it explicitly disables a section for a tenant.
  $: on = (key: string, contentEnabled: boolean) =>
    contentEnabled && isSectionEnabled(sections, key);
  $: pageTitle = dbPage?.title ?? home.meta.title;
  $: pageDescription = dbPage?.description ?? home.meta.description;
  $: pageMeta = (dbPage?.meta ?? {}) as Record<string, string>;

  $: dbTestimonials = (data?.dbTestimonials ?? []) as Testimonial[];
  $: homeFeaturedTestimonials =
    dbTestimonials.length > 0
      ? filterFeaturedTestimonials(dbTestimonials)
      : getFeaturedTestimonials();
  $: homeRatings = homeFeaturedTestimonials
    .map((t) => t.rating)
    .filter((r): r is number => typeof r === 'number');
  $: homeReviews = homeFeaturedTestimonials
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
  $: primaryMember = tenantMembers[0];
  $: tenantPersonSchema =
    !isAgency && primaryMember
      ? generatePersonSchema({
          name: primaryMember.name,
          jobTitle: primaryMember.role,
          description: primaryMember.bio,
          image: primaryMember.avatar,
          url: `/team/${primaryMember.slug}`,
          sameAs: primaryMember.links.map((l) => l.url),
          knowsAbout: primaryMember.skills,
          alumniOf: primaryMember.education[0]?.school,
          addressLocality: primaryMember.location?.split(',')[0]?.trim() || undefined,
          addressCountry:
            primaryMember.location?.toLowerCase().includes('india') ? 'IN' : undefined
        })
      : null;
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

  $: aboutGridBlock = {
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
          'Flexible hours, remote work, health cover, learning budget, and an annual retreat. We try to get the basics right so you can focus on the work.'
      },
      {
        title: 'Career plan.',
        description:
          'You grow. We pair you with mentors, give you honest feedback, and fund your learning. Set the pace.'
      }
    ]
  } as AboutGridStoryblok;

  $: aboutBlock = {
    component: 'text-with-media',
    eyebrow: home.about.eyebrow,
    title: home.about.title,
    description: home.about.description,
    cta: [
      {
        label: home.about.ctaLabel,
        link: {
          cached_url: home.about.ctaUrl,
          linktype: 'story',
          story: undefined
        }
      }
    ],
    media: undefined,
    revert_orientation: false
  } as unknown as TextWithMediaStoryblok;

  $: newtonBlock = {
    component: 'newton',
    title1: home.newton.title1,
    title2: home.newton.title2,
    description: home.newton.description,
    cta_label: home.newton.ctaLabel,
    cta_link: {
      cached_url: home.newton.ctaUrl,
      linktype: 'story',
      story: undefined
    }
  } as unknown as NewtonStoryblok;

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

  $: filteredProjectsData = home.selectedWork.projectSlugs
    ? projectsData.filter((p) => home.selectedWork.projectSlugs!.includes(p.slug))
    : projectsData;

  $: smallHighlights = [
    ...filteredProjectsData.map((project) => ({
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
    }))
  ];
</script>

<svelte:head>
  <title>{pageTitle}</title>
  <meta name="description" content={pageDescription} />
  {#if pageMeta.keywords ?? home.meta.keywords}
    <meta name="keywords" content={pageMeta.keywords ?? home.meta.keywords} />
  {/if}

  <meta property="og:type" content="website" />
  <meta property="og:title" content={pageMeta.ogTitle ?? home.meta.ogTitle ?? pageTitle} />
  <meta
    property="og:description"
    content={pageMeta.ogDescription ?? home.meta.ogDescription ?? pageDescription}
  />
  <meta property="og:image" content="{BASE_URL}{pageMeta.ogImage ?? home.meta.ogImage}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content={home.meta.ogImageAlt} />

  <meta name="twitter:card" content={pageMeta.twitterCard ?? 'summary_large_image'} />
  {#if home.meta.twitterSite}
    <meta name="twitter:site" content={home.meta.twitterSite} />
  {/if}
  {#if home.meta.twitterCreator}
    <meta name="twitter:creator" content={home.meta.twitterCreator} />
  {/if}
  <meta name="twitter:title" content={pageMeta.ogTitle ?? home.meta.ogTitle ?? pageTitle} />
  <meta
    name="twitter:description"
    content={pageMeta.ogDescription ?? home.meta.ogDescription ?? pageDescription}
  />
  <meta name="twitter:image" content="{BASE_URL}{pageMeta.ogImage ?? home.meta.ogImage}" />
  <meta name="twitter:image:alt" content={home.meta.ogImageAlt} />

  {#if isAgency}
    {@html `<${'script'} type="application/ld+json">${generateOrganizationSchema()}</${'script'}>`}
    {@html `<${'script'} type="application/ld+json">${generateProfessionalServiceSchema({
      description: home.meta.description,
      url: BASE_URL,
      imagePath: home.meta.ogImage,
      ratings: homeRatings,
      reviews: homeReviews
    })}</${'script'}>`}
  {:else if tenantPersonSchema}
    {@html `<${'script'} type="application/ld+json">${tenantPersonSchema}</${'script'}>`}
  {/if}
  {#if home.faqs.enabled}
    {@html `<${'script'} type="application/ld+json">${generateFAQSchema(getCommonFaqsForSchema())}</${'script'}>`}
  {/if}
  {#if home.team.enabled}
    {@html `<${'script'} type="application/ld+json">${generateTeamMembersSchema(homeTeamSchema)}</${'script'}>`}
  {/if}
</svelte:head>

<main class="overflow-hidden">
  {#if on('hero', home.hero.enabled)}
    <div class="container mx-auto px-container">
      <h1 class="mt-10 text-7xl font-bold md:mt-14 lg:mt-20">
        {#each home.hero.headlineLines as line, i}
          <span
            bind:this={textElements[i]}
            class="ease-[cubic-bezier(0.34, 1.56, 0.64, 1)] mr-1 inline-block transition-all duration-500 {line.secondary
              ? 'text-foreground-secondary'
              : ''}"
            style="opacity: 1; transform: translateY(0);">{line.text}</span
          >
          {#if i === 1 || i === 2}
            <br />
          {/if}
        {/each}
      </h1>
      <p
        data-speakable
        class="mt-6 max-w-3xl text-2xl text-foreground-secondary md:mt-8 lg:mt-10 lg:text-3xl"
      >
        {home.hero.subtitle}
      </p>
    </div>
  {/if}

  {#if on('stats', home.stats.enabled)}
    <section class="mt-10 md:mt-14 lg:mt-20">
      <div class="container mx-auto px-container">
        <div class="grid grid-cols-2 gap-6 border-y py-10 md:grid-cols-4 md:gap-8 md:py-14">
          {#each home.stats.items as stat}
            <div class="flex flex-col">
              <p class="text-5xl font-bold lg:text-6xl">{stat.value}</p>
              <p class="mt-2 text-base text-foreground-secondary md:text-lg">{stat.label}</p>
            </div>
          {/each}
        </div>
      </div>
    </section>
  {/if}

  {#if on('capabilities', home.capabilities.enabled)}
    <section class="mt-10 md:mt-14 lg:mt-20">
      <div class="container mx-auto px-container">
        <h2 class="text-5xl text-foreground-secondary">{home.capabilities.eyebrow}</h2>
        <p class="text-5xl">{home.capabilities.title}</p>
        <div class="mt-8 grid grid-cols-1 gap-8 md:mt-12 md:grid-cols-3 md:gap-10">
          {#each home.capabilities.items as cap}
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
      {#if on('featured-highlights', home.featuredHighlights.enabled)}
        <section class="mb-8 mt-10 md:mt-14 lg:mt-20">
          <SmallHighlights highlights={smallHighlights.slice(0, 12)} />
        </section>
      {/if}

      {#if on('showreel', home.showreel.enabled)}
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

  {#if on('selected-work', home.selectedWork.enabled)}
    <section class="mb-12 mt-10 md:mb-16 md:mt-14 lg:mb-20 lg:mt-20">
      <div class="container mx-auto px-container">
        <h2 class="text-5xl text-foreground-secondary">{home.selectedWork.eyebrow}</h2>
        <p class="text-5xl">{home.selectedWork.title}</p>
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
          {home.selectedWork.viewAllLabel}
        </a>
      </div>
    </section>
  {/if}

  {#if on('services-newton', home.newton.enabled)}
    <Newton block={newtonBlock} />
  {/if}

  {#if on('about-text-media', home.about.enabled)}
    <TextWithMedia block={aboutBlock} />
  {/if}

  {#if on('about-grid', home.aboutGrid.enabled)}
    <AboutGrid block={aboutGridBlock} />
  {/if}

  {#if on('team', home.team.enabled)}
    <TeamSection
      title={home.team.title ?? 'Meet the people building it.'}
      subtitle={home.team.subtitle ?? 'Hire a specialist directly.'}
      showViewAll
    />
  {/if}

  {#if on('blog-insights', home.blogInsights.enabled)}
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

  {#if on('clients', home.clients.enabled)}
    <ClientsSection title={home.clients.title} />
  {/if}

  {#if on('faqs', home.faqs.enabled)}
    <FaqsListBlock block={commonFaqsBlock} />
  {/if}
</main>
