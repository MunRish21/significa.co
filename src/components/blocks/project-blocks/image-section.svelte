<script lang="ts">
  export let src: string;
  export let alt: string;
  export let width: number = 3200;
  export let height: number = 2400;
</script>

<figure class="not-rich-text mx-auto my-8 h-auto w-full md:my-14 block block-image mx-auto max-w-4xl">
  <div class="w-full overflow-hidden rounded-md">
    <img class="h-auto w-full" {src} {alt} {width} {height} />
  </div>
</figure>
