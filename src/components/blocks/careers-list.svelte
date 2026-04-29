<script lang="ts">
  import { page } from '$app/stores';
  import type { CareersListStoryblok } from '$types/bloks';

  import { Button } from '@techyor/svelte-ui';

  import { getAnchorFromCmsLink } from '$lib/utils/cms';
  import { storyblokEditable } from '$lib/actions/storyblok-editable';

  export let block: CareersListStoryblok;
</script>

<section use:storyblokEditable={block} class="mt-10 md:mt-14 lg:mt-20">
  <div class="container mx-auto justify-between gap-12 px-container lg:flex">
    <div class="flex flex-1 flex-col items-start">
      <div class="w-full flex-1">
        <h2 class="text-5xl">{block.title}</h2>
        {#if $page.data.careers?.length}
          <ul class="mt-10">
            {#each $page.data.careers as career}
              <li class="border-b first:border-t">
                <div class="flex w-full flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <span class="text-xl">{career.name}</span>
                  {#if career.content?.location || career.content?.employment_type}
                    <span class="text-sm text-foreground-secondary">
                      {[career.content?.employment_type, career.content?.location].filter(Boolean).join(' · ')}
                    </span>
                  {/if}
                </div>
              </li>
            {/each}
          </ul>
        {/if}
      </div>
      {#if block.cta_link && block.cta_label}
        {@const { href } = getAnchorFromCmsLink(block.cta_link)}
        <Button variant="secondary" as="a" {href} class="mt-10" arrow>
          {block.cta_label}
        </Button>
      {/if}
    </div>

    <aside
      data-theme={!block.handbook_image?.filename && 'yellow'}
      class="mt-10 flex flex-col items-start justify-between rounded-lg p-8 lg:mt-0 lg:min-h-[500px] lg:max-w-md"
      style={block.handbook_image?.filename
        ? `background-image: url('${block.handbook_image.filename}'); background-size: cover; background-position: center;`
        : undefined}
    >
      <div class="flex-1">
        <h3 class="text-4xl">{block.handbook_title}</h3>
        <p class="mt-4 text-xl text-foreground-secondary">{block.handbook_description}</p>
      </div>

      {#if block.handbook_cta_text && block.handbook_cta_link}
        {@const { href } = getAnchorFromCmsLink(block.handbook_cta_link)}
        <Button variant="secondary" as="a" {href} class="mt-10" icon="handbook" arrow>
          {block.handbook_cta_text}
        </Button>
      {/if}
    </aside>
  </div>
</section>
