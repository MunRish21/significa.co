<script lang="ts">
  import { afterNavigate } from '$app/navigation';
  import { page } from '$app/stores';
  import { escapeKey, clickOutside, bodyLock } from '@techyor/svelte-ui/actions';
  import { getAnchorFromCmsLink } from '$lib/utils/cms';
  import { sanitizeSlug } from '$lib/utils/paths';
  import type { ConfigurationStoryblok } from '$types/bloks';
  import { Badge, Button, Link, Logo } from '@techyor/svelte-ui';
  import clsx from 'clsx';
  import { fade, fly } from 'svelte/transition';
  import { createTopNavScrollStatus } from '$lib/stores/topnav-scroll-status';

  export let configuration: ConfigurationStoryblok;

  let panel = false;

  afterNavigate(() => {
    panel = false;
  });

  const scrollStatus = createTopNavScrollStatus();

  $: isNavHidden = $page.data?.page?.story?.content?.keep_top_bar_hidden;
  $: tenant = $page.data?.tenant as
    | { name?: string; brand?: Record<string, unknown>; meta?: Record<string, unknown> }
    | undefined;
  $: tenantLogo = (tenant?.brand?.logo as string | undefined) ?? null;
  $: brandName = tenant?.name ?? 'Techyor';
  $: isAgency = (tenant?.meta?.isAgency as boolean | undefined) === true;
</script>

<div class="mb-px h-[--topnav-height]">
  <header
    class={clsx(
      'ease-[cubic-bezier(0.90, 0, 0.05, 1)] fixed z-30 w-full border-b bg-background/95 backdrop-blur-md transition-[transform,border-color] duration-300',
      !$scrollStatus.isPastZero ? 'border-b-transparent' : 'border-b-border',
      !$scrollStatus.isPastThreshold
        ? 'translate-y-0'
        : $scrollStatus.direction === 'down' || isNavHidden
          ? '-translate-y-full'
          : 'translate-y-0'
    )}
  >
    <div class="container mx-auto flex items-center justify-between px-container py-4">
      <div class="flex items-center gap-2">
        <a aria-label="Go to homepage" href="/">
          <img src={tenantLogo ?? '/techyor.png'} alt={brandName} class="h-6" />
        </a>
      </div>

      <div class="flex items-center gap-8">
        <div class="hidden items-center gap-6 text-base font-medium leading-relaxed md:flex">
          {#each configuration.primary_navigation || [] as nav}
            <Link
              active={$page.url.pathname === sanitizeSlug(nav.full_slug)}
              href={sanitizeSlug(nav.full_slug)}>{nav.name}</Link
            >
          {/each}
        </div>
        <div class="flex items-center gap-4">
          {#if configuration.call_to_action?.length}
            {@const { href } = getAnchorFromCmsLink(configuration.call_to_action[0].link)}
            <div class="hidden [@media(min-width:400px)]:block">
              <Button as="a" {href}>{configuration.call_to_action[0].label}</Button>
            </div>
          {/if}
          <Button
            aria-label="Open menu"
            variant="secondary"
            icon="3dots"
            on:click={() => {
              panel = true;
            }}
          />
        </div>
      </div>
    </div>
  </header>

  {#if panel}
    <div
      use:bodyLock
      use:escapeKey={{ id: 'top-navigation', callback: () => (panel = false) }}
      role="button"
      tabindex="0"
      on:keydown={onkeydown}
      transition:fade={{ duration: 200 }}
      class="fixed inset-0 z-50 bg-black/50"
      on:click={() => (panel = false)}
    />
    <div
      transition:fly={{ x: 1000, duration: 300 }}
      use:clickOutside={() => (panel = false)}
      class={clsx(
        'px-container pl-6',
        'fixed bottom-0 right-0 top-0 z-50 flex w-full max-w-sm flex-col items-start overflow-y-auto bg-background py-4'
      )}
    >
      <div class="flex w-full items-center justify-between">
        {#if tenantLogo}
          <img src={tenantLogo} alt={brandName} class="h-7" />
        {:else}
          <Logo variant="symbol" />
        {/if}
        <div class="flex gap-4">
          {#if configuration.call_to_action?.length}
            {@const { href } = getAnchorFromCmsLink(configuration.call_to_action[0].link)}
            <Button class="flex-shrink-0" as="a" {href}
              >{configuration.call_to_action[0].label}</Button
            >
          {/if}
          <Button
            aria-label="Close menu"
            size="md"
            variant="secondary"
            icon="close"
            on:click={() => (panel = false)}
          />
        </div>
      </div>

      <div class="flex-1">
        <div class="mt-8">
          <p class="mb-4 text-xs font-medium uppercase tracking-wider text-foreground-secondary">
            Navigation
          </p>
          <ul class="text-lg font-medium">
            <li class="mb-3">
              <Link class="inline-block" href="/">Home</Link>
            </li>
            <li class="mb-3">
              <Link class="inline-block" href="/projects">Projects</Link>
            </li>
            <li class="mb-3">
              <Link class="inline-block" href="/services">Services</Link>
            </li>
            <li class="mb-3">
              <Link class="inline-block" href="/about">About</Link>
            </li>
            {#if isAgency}
              <li class="mb-3">
                <Link class="inline-block" href="/blog">Blog</Link>
              </li>
              <li class="mb-3">
                <Link class="inline-block" href="/careers">Careers</Link>
              </li>
              <li class="mb-3">
                <Link class="inline-block" href="/get-a-quote">Get a quote</Link>
              </li>
              <li class="mb-3">
                <Link class="inline-block" href="/contact">Contact us</Link>
              </li>
            {/if}
          </ul>
        </div>

        {#if isAgency}
          <div class="mt-10">
            <p class="mb-4 text-xs font-medium uppercase tracking-wider text-foreground-secondary">
              Follow us
            </p>
            <ul class="text-lg font-medium">
              <li class="mb-3">
                <Link class="inline-block" href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</Link>
              </li>
              <li class="mb-3">
                <Link class="inline-block" href="https://github.com" target="_blank" rel="noopener noreferrer">Github</Link>
              </li>
            </ul>
          </div>
        {/if}
      </div>
    </div>
  {/if}
</div>
