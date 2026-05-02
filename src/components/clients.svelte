<script lang="ts">
  import type { ClientLogoStoryblok } from '$types/bloks';
  import { getImageAttributes } from '$lib/utils/cms';

  export let clients: ClientLogoStoryblok[];
</script>

<div class="flex flex-wrap justify-center gap-12 p-6">
  {#each clients as client}
    <div class="group transition-all duration-300">
      {#if client.light_mode?.filename}
        {@const { src, alt, width, height } = getImageAttributes(client.light_mode)}
        <img {src} {alt} {width} {height} class="h-auto max-h-16 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300" />
      {/if}
    </div>
  {/each}
</div>
