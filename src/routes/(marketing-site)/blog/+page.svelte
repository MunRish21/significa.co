<script lang="ts">
  import { slide } from 'svelte/transition';
  import BlogEntry from '$components/blog-entry.svelte';
  import type { ISbStoryData } from '@storyblok/js';
  import type { BlogPostStoryblok, TeamMemberStoryblok } from '$types/bloks';
  import {
    BASE_URL,
    generateBreadcrumbSchema,
    generateBlogIndexSchema
  } from '$lib/utils/schema';

  type Post = ISbStoryData<
    Omit<BlogPostStoryblok, 'author'> & {
      author?: ISbStoryData<TeamMemberStoryblok>;
    }
  >;

  const posts: Post[] = [
    {
      id: 1,
      uuid: 'uuid-1',
      name: 'The Future of E-commerce.',
      slug: 'the-future-of-ecommerce',
      full_slug: 'blog/the-future-of-ecommerce',
      created_at: '2024-03-15T00:00:00.000Z',
      published_at: '2024-03-15T00:00:00.000Z',
      first_published_at: '2024-03-15T00:00:00.000Z',
      tag_list: ['E-commerce', 'Trends'],
      content: {
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
    },
    {
      id: 2,
      uuid: 'uuid-2',
      name: 'Designing for Accessibility.',
      slug: 'designing-for-accessibility',
      full_slug: 'blog/designing-for-accessibility',
      created_at: '2024-03-10T00:00:00.000Z',
      published_at: '2024-03-10T00:00:00.000Z',
      first_published_at: '2024-03-10T00:00:00.000Z',
      tag_list: ['Design', 'Accessibility'],
      content: {
        authors: [
          {
            id: 2,
            uuid: 'author-2',
            name: 'Michael Chen',
            slug: 'michael-chen',
            full_slug: 'team/michael-chen',
            content: {
              position: 'UX Designer',
              photo: {
                id: 2,
                alt: 'Michael Chen',
                name: 'michael',
                focus: '',
                title: 'Michael Chen',
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
        reading_time: 12
      }
    },
    {
      id: 3,
      uuid: 'uuid-3',
      name: 'Mobile-First Development Strategy.',
      slug: 'mobile-first-development',
      full_slug: 'blog/mobile-first-development',
      created_at: '2024-03-05T00:00:00.000Z',
      published_at: '2024-03-05T00:00:00.000Z',
      first_published_at: '2024-03-05T00:00:00.000Z',
      tag_list: ['Development', 'Mobile'],
      content: {
        authors: [
          {
            id: 3,
            uuid: 'author-3',
            name: 'Emma Williams',
            slug: 'emma-williams',
            full_slug: 'team/emma-williams',
            content: {
              position: 'Frontend Developer',
              photo: {
                id: 3,
                alt: 'Emma Williams',
                name: 'emma',
                focus: '',
                title: 'Emma Williams',
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
        reading_time: 10
      }
    },
    {
      id: 4,
      uuid: 'uuid-4',
      name: 'User Research Best Practices.',
      slug: 'user-research-best-practices',
      full_slug: 'blog/user-research-best-practices',
      created_at: '2024-02-28T00:00:00.000Z',
      published_at: '2024-02-28T00:00:00.000Z',
      first_published_at: '2024-02-28T00:00:00.000Z',
      tag_list: ['Research', 'UX'],
      content: {
        authors: [
          {
            id: 4,
            uuid: 'author-4',
            name: 'David Martinez',
            slug: 'david-martinez',
            full_slug: 'team/david-martinez',
            content: {
              position: 'Research Director',
              photo: {
                id: 4,
                alt: 'David Martinez',
                name: 'david',
                focus: '',
                title: 'David Martinez',
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
        reading_time: 15
      }
    },
    {
      id: 5,
      uuid: 'uuid-5',
      name: 'Scaling Your Product Successfully.',
      slug: 'scaling-your-product',
      full_slug: 'blog/scaling-your-product',
      created_at: '2024-02-20T00:00:00.000Z',
      published_at: '2024-02-20T00:00:00.000Z',
      first_published_at: '2024-02-20T00:00:00.000Z',
      tag_list: ['Product', 'Strategy'],
      content: {
        authors: [
          {
            id: 5,
            uuid: 'author-5',
            name: 'Jessica Lee',
            slug: 'jessica-lee',
            full_slug: 'team/jessica-lee',
            content: {
              position: 'Product Manager',
              photo: {
                id: 5,
                alt: 'Jessica Lee',
                name: 'jessica',
                focus: '',
                title: 'Jessica Lee',
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
        reading_time: 11
      }
    },
    {
      id: 6,
      uuid: 'uuid-6',
      name: 'Web Performance Optimization Tips.',
      slug: 'web-performance-optimization',
      full_slug: 'blog/web-performance-optimization',
      created_at: '2024-02-15T00:00:00.000Z',
      published_at: '2024-02-15T00:00:00.000Z',
      first_published_at: '2024-02-15T00:00:00.000Z',
      tag_list: ['Development', 'Performance'],
      content: {
        authors: [
          {
            id: 6,
            uuid: 'author-6',
            name: 'James Wilson',
            slug: 'james-wilson',
            full_slug: 'team/james-wilson',
            content: {
              position: 'DevOps Engineer',
              photo: {
                id: 6,
                alt: 'James Wilson',
                name: 'james',
                focus: '',
                title: 'James Wilson',
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
        reading_time: 9
      }
    }
  ];

  let showFilters = false;
  let selectedFilters: string[] = [];
  let visiblePosts = 3;

  const allTags = [...new Set(posts.flatMap((p) => p.tag_list))].sort();

  $: filteredPosts =
    selectedFilters.length === 0
      ? posts
      : posts.filter((p) => selectedFilters.some((f) => p.tag_list.includes(f)));

  $: displayedPosts = filteredPosts.slice(0, visiblePosts);

  function toggleFilter(filter: string) {
    if (selectedFilters.includes(filter)) {
      selectedFilters = selectedFilters.filter((f) => f !== filter);
    } else {
      selectedFilters = [...selectedFilters, filter];
    }
    visiblePosts = 3;
  }

  function clearFilters() {
    selectedFilters = [];
    visiblePosts = 3;
  }
</script>

<svelte:head>
  <title>Techyor Blog — Notes on Design, Development & Product</title>
  <meta
    name="description"
    content="Notes from the studio on web design, software engineering, AI, e-commerce, and how we ship digital products. Practical, opinionated, and short on fluff."
  />

  <meta property="og:type" content="website" />
  <meta property="og:title" content="Techyor Blog — Notes on Design, Development & Product" />
  <meta
    property="og:description"
    content="Notes from the studio on web design, engineering, AI, and how we ship digital products."
  />
  <meta property="og:image" content="{BASE_URL}/api/og/blog" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Techyor Blog — notes from the studio" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@TechyorDotCo" />
  <meta name="twitter:title" content="Techyor Blog — Notes on Design, Development & Product" />
  <meta
    name="twitter:description"
    content="Notes from the studio on design, engineering, AI, and digital products."
  />
  <meta name="twitter:image" content="{BASE_URL}/api/og/blog" />
  <meta name="twitter:image:alt" content="Techyor Blog — notes from the studio" />

  {@html `<${'script'} type="application/ld+json">${generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' }
  ])}</${'script'}>`}
  {@html `<${'script'} type="application/ld+json">${generateBlogIndexSchema({
    url: `${BASE_URL}/blog`,
    description: 'Articles on web design, development, AI, and digital innovation.',
    imagePath: '/api/og/blog',
    posts: posts.map((p) => ({
      title: p.name,
      url: `/blog/${p.slug}`,
      datePublished: p.first_published_at
    }))
  })}</${'script'}>`}
</svelte:head>

<main class="overflow-hidden">
  <!-- Header -->
  <div class="container mx-auto mt-10 px-container md:mt-14 lg:mt-20">
    <h1 class="text-5xl md:text-6xl lg:text-7xl">Blog.</h1>
    <p class="mt-4 text-lg text-foreground-secondary md:text-xl">
      Notes from the studio.
    </p>
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
      {#if selectedFilters.length > 0}
        <span
          class="inline-flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-xs font-medium text-background"
        >
          {selectedFilters.length}
        </span>
      {/if}
    </div>
    {#if selectedFilters.length > 0}
      <button
        class="text-sm font-medium transition-opacity hover:opacity-80"
        on:click={clearFilters}
      >
        Clear all
      </button>
    {/if}
  </div>

  <!-- Filter Panel -->
  {#if showFilters}
    <div transition:slide|global={{ duration: 300 }} class="border-b">
      <div class="container mx-auto px-container py-8">
        <p class="mb-4 text-xs uppercase tracking-wider text-foreground-secondary">Tags</p>
        <div class="flex flex-wrap gap-2">
          {#each allTags as tag}
            <button
              on:click={() => toggleFilter(tag)}
              class={`rounded px-3 py-1.5 text-sm transition-all ${
                selectedFilters.includes(tag)
                  ? 'bg-foreground text-background'
                  : 'border border-border hover:border-foreground'
              }`}
            >
              {tag}
            </button>
          {/each}
        </div>
      </div>
    </div>
  {/if}

  <!-- Blog Posts List -->
  <section>
    {#each displayedPosts as post (post.id)}
      <BlogEntry {post} />
    {/each}
  </section>

  {#if visiblePosts < filteredPosts.length}
    <div class="container mx-auto px-container py-12">
      <button
        on:click={() => (visiblePosts += 3)}
        class="text-md group relative inline-flex h-11 items-center justify-center gap-1.5 overflow-hidden whitespace-nowrap rounded-md border border-border px-5 font-medium leading-none text-foreground outline-none transition-all hover:border-border-active hover:ring-4 focus-visible:border-border-active focus-visible:ring-4 active:scale-[0.98] active:border-border-active active:ring-2 disabled:pointer-events-none disabled:opacity-60"
      >
        Load More
      </button>
    </div>
  {/if}

  {#if filteredPosts.length === 0}
    <div class="container mx-auto px-container py-20 text-center">
      <p class="text-lg text-foreground-secondary">No posts match your filters.</p>
      <button
        on:click={clearFilters}
        class="mt-4 text-sm font-medium text-foreground transition-colors hover:text-foreground-secondary"
      >
        Clear filters
      </button>
    </div>
  {/if}
</main>
