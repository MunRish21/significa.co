<script lang="ts">
  import { page } from '$app/stores';
  import BlogEntry from '$components/blog-entry.svelte';
  import Seo from '$components/seo.svelte';
  import { t } from '$lib/i18n';
  import { Badge, Button, Tag, TextButton } from '@techyor/svelte-ui';
  import clsx from 'clsx';
  import { writable } from 'svelte/store';
  import { slide } from 'svelte/transition';

  export let data: { data: { stories: any[] }; total: number };

  const isFetching = writable(false);
  const total = writable(data.total);
  const posts = writable<any[]>([]);

  let allTags: string[] = [];
  let filters: string[] = [];
  let filtersOpen: boolean;

  $: posts.set(data.data.stories);
  $: total.set(data.total);
  $: version = $page.data.version || 'published';

  const toggleFilter = (tag: string) => {
    if (filters.includes(tag)) {
      filters = filters.filter((t) => t !== tag);
    } else {
      filters = [...filters, tag];
    }
  };

  const toggleAllTags = () => {
    filters = filters.length === allTags.length ? [] : [...allTags];
  };

  $: filteredPosts = $posts.filter((post) => {
    if (filters.length === 0) return true;
    return filters.some((filter) => post.tag_list?.includes(filter));
  });
</script>

<Seo title={t('BlogIndex')} />

<div class="container mx-auto px-container pb-20 pt-10 md:pb-40 md:pt-20">
  <header class="mx-auto mb-8 max-w-4xl md:mb-12">
    <h1 class="mb-2 text-5xl font-bold md:text-6xl">{t('blog')}</h1>
    <p class="text-lg text-foreground-secondary md:text-xl">
      {t('BlogSubtitle')}
    </p>
  </header>

  <div class="mx-auto max-w-4xl">
    {#if allTags.length > 0}
      <div class="mb-8 flex flex-col gap-4">
        <div class="flex items-center justify-between">
          <TextButton on:click={toggleAllTags}>
            {filters.length === allTags.length ? 'Clear all' : 'Select all'}
          </TextButton>
        </div>
        <div class="flex flex-wrap gap-2">
          {#each allTags as tag}
            <Tag
              selected={filters.includes(tag)}
              on:click={() => toggleFilter(tag)}
            >
              {tag}
            </Tag>
          {/each}
        </div>
      </div>
    {/if}

    {#if filteredPosts.length > 0}
      <div class="flex flex-col gap-4">
        {#each filteredPosts as post (post.id)}
          <BlogEntry {post} />
        {/each}
      </div>
    {:else}
      <p class="text-center text-foreground-secondary">{t('NoPostsFound')}</p>
    {/if}

    {#if $isFetching}
      <div class="mt-8 text-center">
        <p class="text-sm text-foreground-secondary">{t('Loading')}</p>
      </div>
    {/if}
  </div>
</div>
