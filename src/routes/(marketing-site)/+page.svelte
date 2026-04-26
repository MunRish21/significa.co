<script lang="ts">
  import { onMount } from 'svelte';
  import SmallHighlights from '$components/pages/home/small-highlights.svelte';
  import Newton from '$components/blocks/newton.svelte';
  import TextWithMedia from '$components/blocks/text-with-media.svelte';
  import AboutGrid from '$components/blocks/about-grid.svelte';
  import BlogEntry from '$components/blog-entry.svelte';
  import ProjectEntry from '$components/project-entry.svelte';
  import type { HomePageStoryblok, NewtonStoryblok, TextWithMediaStoryblok, AboutGridStoryblok } from '$types/bloks';

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
        description: 'It\'s not just what we do. It\'s the why and the how we go about doing things. That\'s what matters.',
        link_label: 'Go to Mission',
        link: {
          cached_url: '/handbook/mission-and-values',
          linktype: 'story',
          story: undefined
        }
      },
      {
        title: 'Perks and benefits.',
        description: 'We love nice things. This is the good stuff. And it\'s getting bigger and bigger.',
        link_label: 'Go to P&B',
        link: {
          cached_url: '/handbook/money-matters/perks-and-benefits',
          linktype: 'story',
          story: undefined
        }
      },
      {
        title: 'Career plan.',
        description: 'Your goals, your career. We\'re here to help you grow. Together.',
        link_label: 'Go to Career Plan',
        link: {
          cached_url: '/handbook/career',
          linktype: 'story',
          story: undefined
        }
      }
    ]
  };

  const aboutBlock: TextWithMediaStoryblok = {
    component: 'text-with-media',
    eyebrow: 'About ourselves.',
    title: 'Perfectionism freaks.',
    description: 'We don\'t take ourselves too seriously, but we\'re definitely serious about what we do. Yes, we love our egg puns and go all in, in our random, quirky creativity. All that while striving to deliver excellence in everything we do.',
    cta: [
      {
        label: 'Go to about us',
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
    title2: 'Design-led digital products.',
    description: 'There is no room for shortcuts when building a great digital experience. Everything starts with thorough research and iterative experimentation. No stone is left unturned to make data-minded decisions. Then we build from scratch, designing and developing, tailored to what users need.',
    cta_label: 'Go to services',
    cta_link: {
      cached_url: '/services',
      linktype: 'story',
      story: undefined
    }
  };

  const smallHighlights: HomePageStoryblok['small_highlights'] = [
    {
      id: 1,
      uuid: 'uuid-1',
      name: 'Coffee King.',
      slug: 'coffee-king',
      full_slug: '/projects/coffee-king',
      content: {
        component: 'project',
        tagline: 'A unified e-commerce platform selling to consumers and businesses alike.',
        thumbnail: [
          {
            id: 1,
            alt: 'Coffee King',
            name: 'coffee-king',
            focus: '',
            title: 'Coffee King',
            filename: 'https://a.storyblok.com/f/198185/3200x2400/5e415e8ae5/ck_3.webp'
          }
        ],
        cover: undefined
      }
    },
    {
      id: 2,
      uuid: 'uuid-2',
      name: 'Mishmash.',
      slug: 'mishmash',
      full_slug: '/projects/mishmash',
      content: {
        component: 'project',
        tagline: 'Unique e-commerce design for the ultimate product experience.',
        thumbnail: [
          {
            id: 2,
            alt: 'Mishmash',
            name: 'mishmash',
            focus: '',
            title: 'Mishmash',
            filename: 'https://a.storyblok.com/f/198185/1600x1200/d6164a5867/mishmash3.jpg'
          }
        ],
        cover: undefined
      }
    },
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
          filename: 'https://a.storyblok.com/f/198185/1920x960/0043a9e166/allo_article_cover.png'
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
                filename: 'https://a.storyblok.com/f/198185/300x300/placeholder-author.jpg'
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
    },
    {
      id: 4,
      uuid: 'uuid-4',
      name: 'Dia.',
      slug: 'dia',
      full_slug: '/projects/dia',
      content: {
        component: 'project',
        tagline: 'A fertility journey app helping users track and understand their wellness.',
        thumbnail: [
          {
            id: 4,
            alt: 'Dia',
            name: 'dia',
            focus: '',
            title: 'Dia',
            filename: 'https://a.storyblok.com/f/198185/3200x2400/8028cc1a7f/diesta_thumbnail.webp'
          }
        ],
        cover: undefined
      }
    }
  ];
</script>

<svelte:head>
  <title>Home - Techyor</title>
  <meta name="description" content="Digital product design and development agency." />
</svelte:head>

<main class="overflow-hidden">
  <!-- Hero Section -->
  <div class="container mx-auto px-container">
    <h1 class="mt-10 text-7xl font-bold md:mt-14 lg:mt-20">
      <span bind:this={textElements[0]} class="mr-1 inline-block transition-all duration-500 ease-[cubic-bezier(0.34, 1.56, 0.64, 1)]" style="opacity: 0; transform: translateY(20px);">Think.</span>
      <span bind:this={textElements[1]} class="mr-1 inline-block transition-all duration-500 ease-[cubic-bezier(0.34, 1.56, 0.64, 1)]" style="opacity: 0; transform: translateY(20px);">Design.</span>
      <br />
      <span bind:this={textElements[2]} class="mr-1 inline-block transition-all duration-500 ease-[cubic-bezier(0.34, 1.56, 0.64, 1)]" style="opacity: 0; transform: translateY(20px);">Develop.</span>
      <span bind:this={textElements[3]} class="mr-1 inline-block transition-all duration-500 ease-[cubic-bezier(0.34, 1.56, 0.64, 1)]" style="opacity: 0; transform: translateY(20px);">Launch.</span>
      <br />
      <span bind:this={textElements[4]} class="mr-1 inline-block transition-all duration-500 ease-[cubic-bezier(0.34, 1.56, 0.64, 1)] text-foreground-secondary" style="opacity: 0; transform: translateY(20px);">Scale.</span>
    </h1>
  </div>

  <!-- Featured Content Section -->
  <div class="transition-all duration-700 ease-[cubic-bezier(0.34, 1.56, 0.64, 1)] opacity-100 translate-y-0">
    <div class="container mx-auto px-container">
      <!-- Featured Projects & Blog -->
      <section class="mb-8 mt-10 md:mt-14 lg:mt-20">
        <SmallHighlights highlights={smallHighlights} />
      </section>

      <!-- Showreel Video -->
      <section class="relative overflow-hidden rounded-lg">
        <div class="pointer-events-none absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-black/10"></div>
        <video poster="https://a.storyblok.com/f/198185/2688x1514/19ebaabf98/new-showreel-cover.jpg/m/0x0/" class="aspect-video h-auto w-full bg-background-offset [&[poster]]:h-full [&[poster]]:w-full [&[poster]]:bg-background [&[poster]]:object-cover" playsinline="">
          <source type="video/mp4" src="https://a.storyblok.com/f/198185/x/4e08a6ae0f/significareel.mp4" />
        </video>
      </section>
    </div>
  </div>

  <!-- Selected Work Section -->
  <section class="mt-10 md:mt-14 lg:mt-20">
    <div class="container mx-auto px-container">
      <h2 class="text-5xl">Selected work.</h2>
    </div>
    <div class="mt-4 md:mt-6 lg:mt-8">
      {#each smallHighlights.filter(h => h.content.component === 'project').slice(0, 3) as project}
        <ProjectEntry {project} variant="default" />
      {/each}
    </div>
  </section>

  <!-- Services Section with Newton -->
  <Newton block={newtonBlock} />

  <!-- About Section -->
  <TextWithMedia block={aboutBlock} />

  <!-- About Grid Section -->
  <AboutGrid block={aboutGridBlock} />

  <!-- Blog Section -->
  <section class="mt-10 md:mt-14 lg:mt-20">
    <div class="container mx-auto px-container">
      <h2 class="text-5xl text-foreground-secondary">Blog.</h2>
      <p class="text-5xl">Our very own meggazine.</p>
    </div>
    <div class="mt-4 md:mt-6 lg:mt-8">
      {#each smallHighlights.filter(h => h.content.component === 'blog-post').slice(0, 3) as post}
        <BlogEntry post={post} />
      {/each}
    </div>
  </section>
</main>
