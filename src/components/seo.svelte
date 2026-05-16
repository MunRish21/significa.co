<script lang="ts">
  import { page } from '$app/stores';
  import { VIDEO_EXTENSIONS } from '$lib/constants';
  import { t } from '$lib/i18n';
  import { getImageAttributes } from '$lib/utils/cms';
  import { BASE_URL } from '$lib/utils/schema';
  import { getFileExtension } from '$lib/utils/strings';
  import type { AssetStoryblok } from '$types/bloks';
  import { getContext } from 'svelte';

  export let title: undefined | string = undefined;
  export let description: undefined | string = undefined;
  export let image: undefined | AssetStoryblok | string = undefined;
  export let structureDataMarkup: string | undefined = undefined;
  export let twitterExtraFields: { key: string; value: string }[] = [];
  export let type: 'website' | 'article' | 'profile' = 'website';
  export let publishedTime: string | undefined = undefined;
  export let modifiedTime: string | undefined = undefined;
  export let author: string | undefined = undefined;
  export let tags: string[] = [];
  export let noindex: boolean = false;

  const inDrawer = getContext<boolean>('drawer');

  $: canonical =
    $page.data.page?.story?.content?.seo_canonical_url || `${BASE_URL}${$page.url.pathname}`;

  $: tenant = $page.data?.tenant as
    | { name?: string; meta?: Record<string, unknown> }
    | undefined;
  $: brandName = tenant?.name ?? 'Techyor';
  $: isAgency = (tenant?.meta?.isAgency as boolean | undefined) === true;
  $: twitterHandle = (tenant?.meta?.twitterHandle as string | undefined) ?? null;
</script>

<svelte:head>
  {#if !inDrawer}
    <link rel="canonical" href={canonical} />

    {#if noindex}
      <meta name="robots" content="noindex, nofollow" />
    {:else}
      <meta
        name="robots"
        content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      />
    {/if}

    <title>{title || $page.data.page?.story?.content?.seo_title || t('seo.title')}</title>
    <meta name="twitter:card" content="summary_large_image" />
    {#if isAgency}
      <meta name="twitter:site" content="@TechyorDotCo" />
      <meta name="twitter:creator" content="@TechyorDotCo" />
    {:else if twitterHandle}
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />
    {/if}

    {#if structureDataMarkup}
      <!-- eslint-disable-next-line svelte/no-at-html-tags -->
      {@html `<${'script'} type="application/ld+json"> ${structureDataMarkup} </${'script'}>`}
    {/if}

    <meta
      name="description"
      content={description ||
        $page.data.page?.story?.content?.seo_description ||
        t('seo.description')}
    />
    <meta
      property="og:title"
      content={title || $page.data.page?.story?.content?.seo_title || t('seo.title')}
    />
    <meta
      property="twitter:title"
      content={title || $page.data.page?.story?.content?.seo_title || t('seo.title')}
    />
    <meta
      property="og:description"
      content={description ||
        $page.data.page?.story?.content?.seo_description ||
        t('seo.description')}
    />
    <meta
      property="twitter:description"
      content={description ||
        $page.data.page?.story?.content?.seo_description ||
        t('seo.description')}
    />

    {#each twitterExtraFields as { key, value }, i}
      <meta name="twitter:label{i + 1}" content={key} />
      <meta name="twitter:data{i + 1}" content={value} />
    {/each}

    <meta property="og:url" content={canonical} />
    <meta property="og:site_name" content={brandName} />
    <meta property="og:locale" content="en_US" />
    <meta property="og:type" content={type} />
    {#if type === 'article'}
      {#if publishedTime}<meta property="article:published_time" content={publishedTime} />{/if}
      {#if modifiedTime}<meta property="article:modified_time" content={modifiedTime} />{/if}
      {#if author}<meta property="article:author" content={author} />{/if}
      {#each tags as tag}<meta property="article:tag" content={tag} />{/each}
    {/if}
    {#if typeof image !== 'string' && image?.filename && !VIDEO_EXTENSIONS.includes(getFileExtension(image.filename))}
      {@const { src } = getImageAttributes(image, { size: [1200, 630] })}
      <meta property="og:image" content={src} />
      <meta property="twitter:image" content={src} />
      <meta property="og:image:alt" content={title || image.alt || brandName} />
    {:else if $page.data.page?.story?.content?.seo_og_image?.filename}
      {@const { src } = getImageAttributes($page.data.page?.story?.content?.seo_og_image, {
        size: [1200, 630]
      })}
      <meta property="og:image" content={src} />
      <meta property="twitter:image" content={src} />
      <meta property="og:image:alt" content={title || brandName} />
    {:else if typeof image === 'string'}
      <meta
        property="og:image"
        content={image.startsWith('http') ? image : `${BASE_URL}${image}`}
      />
      <meta
        property="twitter:image"
        content={image.startsWith('http') ? image : `${BASE_URL}${image}`}
      />
      <meta property="og:image:alt" content={title || brandName} />
    {:else}
      <meta property="og:image" content="{BASE_URL}/og.png" />
      <meta property="twitter:image" content="{BASE_URL}/og.png" />
      <meta property="og:image:alt" content={title || brandName} />
    {/if}
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
  {/if}
</svelte:head>
