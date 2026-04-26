<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import SmallHighlights from '$components/pages/home/small-highlights.svelte';
  import Newton from '$components/blocks/newton.svelte';
  import TextWithMedia from '$components/blocks/text-with-media.svelte';
  import AboutGrid from '$components/blocks/about-grid.svelte';
  import CareersListBlock from '$components/blocks/careers-list.svelte';
  import FaqsListBlock from '$components/blocks/faqs-list.svelte';
  import BlogEntry from '$components/blog-entry.svelte';
  import ProjectEntry from '$components/project-entry.svelte';
  import type { HomePageStoryblok, NewtonStoryblok, TextWithMediaStoryblok, AboutGridStoryblok, CareersListStoryblok, FaqsStoryblok } from '$types/bloks';

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
        description: 'It\'s not just what we do. It\'s the why and the how we go about doing things. That\'s what matters.'
      },
      {
        title: 'Perks and benefits.',
        description: 'We love nice things. This is the good stuff. And it\'s getting bigger and bigger.'
      },
      {
        title: 'Career plan.',
        description: 'Your goals, your career. We\'re here to help you grow. Together.'
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
    handbook_description: 'We know time is scarce and life is hectic, so the bottom line is – we think, design, develop, and launch digital products.\n\nStill, if you\'re not pressed for time and are looking for an interesting read while you savour your morning coffee, here\'s our Handbook.',
    handbook_cta_text: 'Read Handbook',
    handbook_cta_link: {
      cached_url: '/handbook',
      linktype: 'story',
      story: undefined
    },
    handbook_image: undefined
  };

  const clients = [
    {
      name: 'FCP',
      lightLogo: 'https://a.storyblok.com/f/198185/326x84/fafe7547ba/light-fcp-final.png/m/0x0/',
      darkLogo: 'https://a.storyblok.com/f/198185/326x84/3a6318eff4/dark-fcp-final.png/m/0x0/',
      width: 326,
      height: 84
    },
    {
      name: 'Emma',
      lightLogo: 'https://a.storyblok.com/f/198185/1662x520/a25d1bd00c/emma-light.png/m/0x0/',
      darkLogo: 'https://a.storyblok.com/f/198185/1662x434/236b3b709a/emma-dark.png/m/0x0/',
      width: 1662,
      height: 520
    },
    {
      name: 'TFP',
      lightLogo: 'https://a.storyblok.com/f/198185/1528x520/94195c7875/tfp-light.png/m/0x0/',
      darkLogo: 'https://a.storyblok.com/f/198185/1528x520/0b12947dc8/tfp-dark.png/m/0x0/',
      width: 1528,
      height: 520
    },
    {
      name: 'Hey Harper',
      lightLogo: 'https://a.storyblok.com/f/198185/1980x520/c27ec6fd0d/heyharper-light.png/m/0x0/',
      darkLogo: 'https://a.storyblok.com/f/198185/1980x520/eadca83872/heyharper-dark.png/m/0x0/',
      width: 1980,
      height: 520
    },
    {
      name: 'allO',
      lightLogo: 'https://a.storyblok.com/f/198185/928x520/efbbe25cf4/allo-light.png/m/0x0/',
      darkLogo: 'https://a.storyblok.com/f/198185/928x520/a63160331b/allo-dark.png/m/0x0/',
      width: 928,
      height: 520
    },
    {
      name: 'Mishmash',
      lightLogo: 'https://a.storyblok.com/f/198185/1055x282/e097310607/mishmash_lightmode.png/m/0x0/',
      darkLogo: 'https://a.storyblok.com/f/198185/1054x281/44144e3c56/mishmash_darkmode.png/m/0x0/',
      width: 1055,
      height: 282
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

  const faqBlock: FaqsStoryblok = {
    component: 'faqs',
    title: 'Frequently Asked Questions',
    questions: [
      {
        component: 'faq',
        question: 'Why should I work with Significa?',
        body: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'We combine strategic thinking with creative excellence to deliver design-led digital products that truly matter. Our approach is thorough, collaborative, and focused on achieving your goals.' }] }] }
      },
      {
        component: 'faq',
        question: 'What is it like to collaborate with Significa?',
        body: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'We believe in transparent communication and partnership. You\'ll be involved throughout the process, with regular updates and opportunities to provide feedback at every stage.' }] }] }
      },
      {
        component: 'faq',
        question: 'How long does a project take from start until launch?',
        body: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Project timelines vary depending on scope and complexity. A typical project can range from 3-6 months, but we\'ll provide a clear timeline during our initial conversation.' }] }] }
      },
      {
        component: 'faq',
        question: 'Which projects do you usually take on?',
        body: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'We work on design-led digital products across various industries. From e-commerce platforms to mobile apps, we focus on projects where design and strategy are critical to success.' }] }] }
      },
      {
        component: 'faq',
        question: 'Why do I need a design and development agency if I have AI?',
        body: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'AI is a powerful tool, but it requires human expertise, creativity, and strategic thinking to deliver results that truly resonate with your users. We use AI alongside our skills to create better solutions faster.' }] }] }
      },
      {
        component: 'faq',
        question: 'What if I don\'t like the final results?',
        body: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'We have revision rounds built into every project. We won\'t consider the project complete until you\'re satisfied with the results. Your feedback is essential to our process.' }] }] }
      }
    ]
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
      <span bind:this={textElements[0]} class="mr-1 inline-block transition-all duration-500 ease-[cubic-bezier(0.34, 1.56, 0.64, 1)]" style="opacity: 1; transform: translateY(0);">Think.</span>
      <span bind:this={textElements[1]} class="mr-1 inline-block transition-all duration-500 ease-[cubic-bezier(0.34, 1.56, 0.64, 1)]" style="opacity: 1; transform: translateY(0);">Design.</span>
      <br />
      <span bind:this={textElements[2]} class="mr-1 inline-block transition-all duration-500 ease-[cubic-bezier(0.34, 1.56, 0.64, 1)]" style="opacity: 1; transform: translateY(0);">Develop.</span>
      <span bind:this={textElements[3]} class="mr-1 inline-block transition-all duration-500 ease-[cubic-bezier(0.34, 1.56, 0.64, 1)]" style="opacity: 1; transform: translateY(0);">Launch.</span>
      <br />
      <span bind:this={textElements[4]} class="mr-1 inline-block transition-all duration-500 ease-[cubic-bezier(0.34, 1.56, 0.64, 1)] text-foreground-secondary" style="opacity: 1; transform: translateY(0);">Scale.</span>
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
          <track kind="captions" srclang="en" label="English" />
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

  <!-- Careers Section -->
  <CareersListBlock block={careersBlock} />

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

  <!-- Clients Section -->
  <section class="container mx-auto mb-16 mt-20 px-container lg:my-20">
    <h3 class="text-center text-lg text-foreground-secondary">Proud to have worked with</h3>
    <div class="flex flex-wrap justify-center gap-12 p-6">
      {#each clients as client}
        <img src={client.lightLogo} alt={client.name} width={client.width} height={client.height} class="h-auto max-h-9 w-auto object-contain dark:hidden" />
        <img src={client.darkLogo} alt={client.name} width={client.width} height={client.height} class="hidden h-auto max-h-9 w-auto object-contain dark:block" />
      {/each}
    </div>
  </section>

  <!-- FAQ Section -->
  <FaqsListBlock block={faqBlock} />
</main>
