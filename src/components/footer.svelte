<script lang="ts">
  import { page } from '$app/stores';
  import { getAnchorFromCmsLink, getImageAttributes } from '$lib/utils/cms';
  import { sanitizeSlug } from '$lib/utils/paths';
  import type { ConfigurationStoryblok } from '$types/bloks';
  import { Badge, Link, Logo } from '@techyor/svelte-ui';
  import Slogan from './slogan.svelte';
  import { intersectionObserver } from '@techyor/svelte-ui/actions';
  import clsx from 'clsx';

  export let configuration: ConfigurationStoryblok;
  let animate = false;
</script>

<footer>
  <div class="container mx-auto grid grid-cols-8 gap-8 px-container py-20">
    <div class="col-span-8 flex flex-col justify-between md:col-span-3 lg:col-span-4">
      <Logo variant="symbol" class="md:origin-top-left md:scale-125" />
      <span
        use:intersectionObserver={{
          callback: ([e]) => {
            if (e.isIntersecting) {
              animate = true;
            }
          },
          options: { threshold: [1] }
        }}
      >
        <Slogan {animate} class="mt-8 mb-4 hidden font-bold md:block" />
      </span>

      {#if !!configuration.footer_partners?.length}
        <div class="-ml-2 hidden h-20 items-center gap-3 md:flex lg:gap-7 ">
          {#each configuration.footer_partners as partner, i}
            {#if partner.light_mode?.filename}
              {@const { src, alt, width, height } = getImageAttributes(partner.light_mode, {
                size: [0, 720]
              })}
              <img
                {src}
                {alt}
                {width}
                {height}
                class={clsx(
                  i === 0 && 'mt-[7px] h-auto max-h-[60px] w-auto object-contain dark:hidden',
                  i === 1 && 'h-auto max-h-[60px] w-auto object-contain dark:hidden',
                  i === 2 && 'mb-1 h-auto max-h-[60px] w-auto object-contain dark:hidden'
                )}
              />
            {/if}
            {#if partner.dark_mode?.filename}
              {@const { src, alt, width, height } = getImageAttributes(partner.dark_mode, {
                size: [0, 720]
              })}
              <img
                {src}
                {alt}
                {width}
                {height}
                class={clsx(
                  i === 0 && 'mt-[7px] hidden h-auto  w-auto object-contain dark:block',
                  i === 1 && 'hidden h-auto  w-auto object-contain dark:block',
                  i === 2 && 'mb-1 hidden h-auto  w-auto object-contain dark:block'
                )}
              />
            {/if}
          {/each}
        </div>
      {/if}
    </div>

    <div class="col-span-8 flex flex-col gap-8 xs:flex-row md:col-span-5 lg:col-span-4">
      <!-- Menu 1: Navigation -->
      <div class="flex-1">
        <p class="mb-4 text-xs font-medium uppercase tracking-wider text-foreground-secondary">
          Techyor
        </p>
        <ul class="text-lg leading-normal">
          <li class="mb-2"><Link href="/">Home</Link></li>
          <li class="mb-2"><Link href="/about">About</Link></li>
          <li class="mb-2"><Link href="/projects">Projects</Link></li>
          <li class="mb-2"><Link href="/services">Services</Link></li>
          <li class="mb-2"><Link href="/blog">Blog</Link></li>
        </ul>
      </div>

      <!-- Menu 2: Company -->
      <div class="flex-1">
        <p class="mb-4 text-xs font-medium uppercase tracking-wider text-foreground-secondary">
          Company
        </p>
        <ul class="text-lg leading-normal">
          <li class="mb-2"><Link href="/get-a-quote">Get a quote</Link></li>
          <li class="mb-2"><Link href="/contact">Contact us</Link></li>
          <li class="mb-2"><Link href="/careers">Careers</Link></li>
        </ul>
      </div>

      <!-- Menu 3: Follow us -->
      <div class="flex-1">
        <p class="mb-4 text-xs font-medium uppercase tracking-wider text-foreground-secondary">
          Follow us
        </p>
        <ul class="text-lg leading-normal">
          <li class="mb-2"><Link href="#linkedin">LinkedIn</Link></li>
          <li class="mb-2"><Link href="#github">Github</Link></li>
        </ul>
      </div>
    </div>

    {#if !!configuration.footer_partners?.length}
      <div class="col-span-3 -ml-2 flex h-20 items-center gap-7 md:hidden ">
        {#each configuration.footer_partners as partner, i}
          {#if partner.light_mode?.filename}
            {@const { src, alt, width, height } = getImageAttributes(partner.light_mode, {
              size: [0, 720]
            })}
            <img
              {src}
              {alt}
              {width}
              {height}
              class={clsx(
                i === 0 && 'mt-[7px] h-auto  w-auto object-contain dark:hidden',
                i === 1 && 'h-auto  w-auto object-contain dark:hidden',
                i === 2 && 'mb-1 h-auto  w-auto object-contain dark:hidden'
              )}
            />
          {/if}
          {#if partner.dark_mode?.filename}
            {@const { src, alt, width, height } = getImageAttributes(partner.dark_mode, {
              size: [0, 720]
            })}
            <img
              {src}
              {alt}
              {width}
              {height}
              class={clsx(
                i === 0 && 'mt-[7px] hidden h-auto  w-auto object-contain dark:block',
                i === 1 && 'hidden h-auto  w-auto object-contain dark:block',
                i === 2 && 'mb-1 hidden h-auto  w-auto object-contain dark:block'
              )}
            />
          {/if}
        {/each}
      </div>
    {/if}
  </div>

  <div>
    <div
      class="container mx-auto flex flex-col items-start justify-between px-container py-4 text-sm text-foreground-secondary xs:flex-row xs:items-center"
    >
      <span>Techyor &mdash; Digital Product Design & Development Agency</span>
      <Link href="#legal">Legal</Link>
    </div>
  </div>
</footer>
