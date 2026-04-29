<script lang="ts">
  import type { OfficeCardsStoryblok } from '$types/bloks';
  import HoverableGallery from '$components/hoverable-gallery.svelte';
  import RandomizedHoverableGallery from '$components/randomized-hoverable-gallery.svelte';
  import clsx from 'clsx';
  import { storyblokEditable } from '$lib/actions/storyblok-editable';
  import { getAnchorFromCmsLink } from '$lib/utils/cms';
  import { Button } from '@techyor/svelte-ui';

  export let block: OfficeCardsStoryblok;
  export let randomize = false;
</script>

<section
  use:storyblokEditable={block}
  class={clsx('overflow-hidden', !block.variant && 'border-y')}
>
  {#if !block.variant}
    <div class="container mx-auto px-container pb-8 pt-8 lg:pb-12 lg:pt-12">
      <div class="flex flex-col justify-between gap-7 lg:flex-row lg:gap-4">
        <div class="lg:max-w-lg">
          <h2 class="text-5xl text-foreground-secondary">{block.office_title1}</h2>
          <p class="text-5xl">{block.office_title2}</p>

          {#if block.btn_link?.story?.url && block.btn_label}
            {@const { href } = getAnchorFromCmsLink(block.btn_link)}
            <Button as="a" {href} arrow size="md" class="z-10 mx-auto mt-6">
              {block.btn_label}
            </Button>
          {/if}
        </div>

        <p class="whitespace-pre-line text-2xl text-foreground-secondary lg:max-w-xl">
          {block.office_description}
        </p>
      </div>

      {#if !!block.office_cards?.length}
        {#if randomize}
          <RandomizedHoverableGallery
            cards={block.office_cards}
            class={clsx(
              block.office_title1 && block.office_title2 && block.office_description
                ? 'lg:-mt-10'
                : 'lg:-mt-5',
              'mt-12'
            )}
          />
        {:else}
          <HoverableGallery
            cards={block.office_cards}
            class={clsx(
              block.office_title1 && block.office_title2 && block.office_description
                ? 'lg:-mt-10'
                : 'lg:-mt-5',
              'mt-12'
            )}
          />
        {/if}
      {/if}
    </div>
  {:else if !!block.office_cards?.length}
    <section class="border-b">
      <div class="container mx-auto px-container">
        {#if randomize}
          <RandomizedHoverableGallery cards={block.office_cards} class="mt-12 lg:mt-4" />
        {:else}
          <HoverableGallery cards={block.office_cards} class="mt-12 lg:mt-4" />
        {/if}
      </div>
    </section>
  {/if}
</section>
