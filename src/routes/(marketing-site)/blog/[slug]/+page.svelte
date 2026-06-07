<script lang="ts">
  import ComparisonPost from '$components/blog/comparison-post.svelte';
  import type { BlogPost } from '$lib/data/blog';
  import {
    BASE_URL,
    generateArticleSchema,
    generateBreadcrumbSchema,
    generateFAQSchema
  } from '$lib/utils/schema';

  export let data: { post: BlogPost };

  $: post = data.post;
  $: pageUrl = `/blog/${post.slug}`;
  $: title = post.metaTitle || post.title;
  $: description = post.metaDescription;
  $: ogImage = post.heroImageUrl || `${BASE_URL}/api/og/blog`;
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={`${BASE_URL}${pageUrl}`} />

  <meta property="og:type" content="article" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={`${BASE_URL}${pageUrl}`} />
  <meta property="og:image" content={ogImage} />
  <meta property="og:image:alt" content={post.title} />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={ogImage} />
  <meta name="twitter:image:alt" content={post.title} />

  {@html `<${'script'} type="application/ld+json">${generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: post.title, url: pageUrl }
  ])}</${'script'}>`}
  {@html `<${'script'} type="application/ld+json">${generateArticleSchema({
    title: post.title,
    description,
    url: pageUrl,
    image: post.heroImageUrl || undefined,
    datePublished: post.date,
    dateModified: post.updatedAt
  })}</${'script'}>`}
  {#if post.faq.length}
    {@html `<${'script'} type="application/ld+json">${generateFAQSchema(post.faq)}</${'script'}>`}
  {/if}
</svelte:head>

<main class="overflow-hidden">
  {#if post.type === 'comparison'}
    <ComparisonPost {post} />
  {/if}
</main>
