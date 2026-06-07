<script lang="ts">
  import { formatDate } from '$lib/utils/dates';
  import type { BlogPostSummary } from '$lib/data/blog';
  import { BASE_URL, generateBreadcrumbSchema, generateBlogIndexSchema } from '$lib/utils/schema';
  import { isSectionEnabled, type SectionsMap } from '$lib/tenant';

  export let data: {
    page: { title: string | null; description: string | null; meta: Record<string, unknown> } | null;
    sections: SectionsMap;
    posts: BlogPostSummary[];
  };

  $: dbPage = data?.page ?? null;
  $: sections = (data?.sections ?? {}) as SectionsMap;
  $: on = (key: string) => isSectionEnabled(sections, key);
  $: posts = data?.posts ?? [];
  $: pageTitle = dbPage?.title ?? 'Techyor Blog — Notes on Design, Development & Product';
  $: pageDescription =
    dbPage?.description ??
    'Notes from the studio on web design, software engineering, AI, e-commerce, and how we ship digital products. Practical, opinionated, and short on fluff.';
</script>

<svelte:head>
  <title>{pageTitle}</title>
  <meta name="description" content={pageDescription} />

  <meta property="og:type" content="website" />
  <meta property="og:title" content={pageTitle} />
  <meta property="og:description" content={pageDescription} />
  <meta property="og:image" content="{BASE_URL}/api/og/blog" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Techyor Blog — notes from the studio" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@TechyorDotCo" />
  <meta name="twitter:title" content={pageTitle} />
  <meta name="twitter:description" content={pageDescription} />
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
      title: p.title,
      url: `/blog/${p.slug}`,
      datePublished: p.date
    }))
  })}</${'script'}>`}
</svelte:head>

<main class="overflow-hidden">
  {#if on('header')}
    <div class="container mx-auto mt-10 px-container md:mt-14 lg:mt-20">
      <h1 class="text-5xl md:text-6xl lg:text-7xl">Blog.</h1>
      <p class="mt-4 text-lg text-foreground-secondary md:text-xl">Notes from the studio.</p>
    </div>
  {/if}

  {#if on('blog-list')}
    {#if posts.length > 0}
      <section class="mt-8 md:mt-12">
        {#each posts as post (post.slug)}
          <a
            href={`/blog/${post.slug}`}
            class="block border-b transition-colors first:border-t hover:bg-foreground-tertiary/10"
          >
            <div class="container mx-auto flex flex-col gap-6 px-container py-8 md:flex-row md:items-center">
              {#if post.heroImageUrl}
                <img
                  src={post.heroImageUrl}
                  alt={post.title}
                  width="320"
                  height="180"
                  loading="lazy"
                  class="aspect-[16/9] w-full shrink-0 rounded-lg border object-cover md:w-72"
                />
              {/if}
              <div class="min-w-0">
                <div class="flex flex-wrap items-center gap-2 text-base text-foreground-secondary">
                  <span>{formatDate(new Date(post.date))}</span>
                  {#if post.topic}
                    <span class="text-foreground-secondary/60">•</span>
                    <span class="capitalize">{post.topic}</span>
                  {/if}
                </div>
                <h2 class="mt-2 max-w-3xl text-3xl md:text-4xl">{post.title}</h2>
                {#if post.excerpt}
                  <p class="mt-3 max-w-2xl text-foreground-secondary">{post.excerpt}</p>
                {/if}
              </div>
            </div>
          </a>
        {/each}
      </section>
    {:else}
      <div class="container mx-auto px-container py-20 text-center">
        <p class="text-lg text-foreground-secondary">New posts coming soon.</p>
      </div>
    {/if}
  {/if}
</main>
