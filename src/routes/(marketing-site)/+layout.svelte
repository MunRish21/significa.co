<script lang="ts">
  import '$styles/index.css';

  import { page } from '$app/stores';
  import TopNavigation from '$components/top-navigation.svelte';
  import Footer from '$components/footer.svelte';
  import { BASE_URL, generateWebsiteSchema } from '$lib/utils/schema';

  export let data;

  $: canonical = `${BASE_URL}${$page.url.pathname}`;
</script>

<svelte:head>
  <link rel="canonical" href={canonical} />
  <meta
    name="robots"
    content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
  />
  <meta property="og:site_name" content="Techyor" />
  <meta property="og:locale" content="en_US" />
  <meta property="og:url" content={canonical} />
  {@html `<${'script'} type="application/ld+json">${generateWebsiteSchema()}</${'script'}>`}
</svelte:head>

<TopNavigation configuration={data.configuration.content} />
<slot />
{#if !$page.error}
  <Footer configuration={data.configuration.content} />
{/if}
