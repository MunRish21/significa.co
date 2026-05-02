<script lang="ts">
  import '$styles/index.css';

  import DraftMode from '$components/draft-mode.svelte';
  import ImageGallery from '$components/image-gallery.svelte';
  import PageDrawer from '$components/page-drawer.svelte';
  import { toast, Toaster, ToastNotification } from '@techyor/svelte-ui';
  import { afterNavigate, beforeNavigate } from '$app/navigation';
  import { browser } from '$app/environment';

  import {
    PUBLIC_POSTHOG_PROJECT_TOKEN,
    PUBLIC_POSTHOG_POSTHOG_API_HOST
  } from '$env/static/public';

  import posthog from 'posthog-js';

  import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';

  if (browser) {
    posthog.init(PUBLIC_POSTHOG_PROJECT_TOKEN, {
      api_host: PUBLIC_POSTHOG_POSTHOG_API_HOST || 'https://eu.posthog.com',
      persistence: 'localStorage',
      person_profiles: 'always'
    });
  }

  beforeNavigate(() => {
    toast.clearAll();
  });

  afterNavigate(({ to }) => {
    if (!browser || !to) return;
    const w = window as unknown as { gtag?: (...args: unknown[]) => void };
    w.gtag?.('event', 'page_view', {
      page_path: to.url.pathname + to.url.search,
      page_location: to.url.href,
      page_title: document.title
    });
  });

  const queryClient = new QueryClient();
</script>

<QueryClientProvider client={queryClient}>
  <Toaster component={ToastNotification} />
  <DraftMode />

  <PageDrawer />
  <ImageGallery />
  <slot />
</QueryClientProvider>
