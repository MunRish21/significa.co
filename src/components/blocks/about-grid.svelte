<script lang="ts">
  import { drawerLinks } from '$lib/actions/drawer-links';
  import { storyblokEditable } from '$lib/actions/storyblok-editable';
  import { getAnchorFromCmsLink } from '$lib/utils/cms';
  import type { AboutGridStoryblok } from '$types/bloks';
  import { Button } from '@techyor/svelte-ui';

  export let block: AboutGridStoryblok;
  export let onMissionClick: (() => void) | null = null;

  function handleMissionClick() {
    if (onMissionClick) {
      onMissionClick();
    }
  }
</script>

<div use:storyblokEditable={block} class="border-y" use:drawerLinks>
  <div class="container mx-auto lg:flex">
    {#each block.about_links || [] as link}
      {@const { href } = getAnchorFromCmsLink(link.link)}
      <div
        class="flex flex-1 flex-col items-start justify-between border-t p-container transition-colors first:border-t-0 last:border-r-0 lg:border-r lg:border-t-0"
      >
        <div class="flex-1">
          <h3 class="text-2xl font-medium">{link.title}</h3>
          <p class="mt-2 text-xl/tight font-medium text-foreground-secondary">
            {link.description}
          </p>
        </div>
        {#if link.link_label}
          {#if href === '/handbook/mission-and-values' && onMissionClick}
            <button class="group relative inline-flex items-center justify-center gap-1.5 overflow-hidden whitespace-nowrap text-md font-medium leading-none outline-none transition-all hover:ring-4 focus-visible:ring-4 active:scale-[0.98] active:ring-2 disabled:pointer-events-none disabled:opacity-60 border-border hover:border-border-active focus-visible:border-border-active active:border-border-active border h-11 rounded-md px-5 mt-8 lg:mt-12 xl:mt-20" on:click={handleMissionClick}>
              <span>{link.link_label}</span>
              <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 8.5h9M8.5 4.5l3.5 4-3.5 4" stroke="currentColor" stroke-width="1.2"></path>
              </svg>
            </button>
          {:else}
            <Button class="mt-8 lg:mt-12 xl:mt-20" as="a" {href} variant="secondary" arrow
              >{link.link_label}</Button
            >
          {/if}
        {/if}
      </div>
    {/each}
  </div>
</div>
