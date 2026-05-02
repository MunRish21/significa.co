<script lang="ts">
  import { storyblokEditable } from '$lib/actions/storyblok-editable';
  import { getAnchorFromCmsLink, getImageAttributes } from '$lib/utils/cms';
  import type { ClientStoryblok } from '$types/bloks';

  export let block: ClientStoryblok;
</script>

<section use:storyblokEditable={block} class="container mx-auto mb-16 mt-20 px-container lg:my-20">
  <h3 class="text-center text-lg text-foreground-secondary">{block.clients_title}</h3>
  {#if block.clients}
    <div class="flex flex-wrap justify-center gap-6 p-6">
      {#each block.clients as client, i}
        {#if client.light_mode?.filename}
          {@const { src, alt, width, height } = getImageAttributes(client.light_mode)}
          {#if block.links && block.links[i]?.link}
            {@const { href, target, rel } = getAnchorFromCmsLink(block.links[i].link)}
            <a {href} {target} {rel} class="group transition-all duration-300">
              <img {src} {alt} {width} {height} class="h-auto max-h-16 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300" />
            </a>
          {:else}
            <div class="group">
              <img
                {src}
                {alt}
                {width}
                {height}
                class="h-auto max-h-16 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
              />
            </div>
          {/if}
        {/if}
      {/each}
    </div>
  {/if}
</section>
