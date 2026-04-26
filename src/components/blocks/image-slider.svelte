<script lang="ts">
  export let images: Array<{
    src: string;
    alt: string;
    width: number;
    height: number;
  }> = [];
</script>

<div class="flex justify-center overflow-hidden border-b py-8 md:py-20">
  <div class="flex gap-10" style="transform: translateX(calc(-268px + 15vw));">
    {#each images as image (image.src)}
      <img
        class="max-h-96 rounded-md object-cover"
        alt={image.alt}
        src={image.src}
        width={image.width}
        height={image.height}
      />
    {/each}
  </div>
</div>
