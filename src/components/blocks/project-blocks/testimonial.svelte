<script lang="ts">
  export let quote: string;
  export let author: string;
  export let title: string;
  export let image: string;
</script>

<div class="px-4 py-2 md:px-8 md:py-4 lg:px-16 lg:py-10 not-rich-text block block-richtext-testimonial mx-auto max-w-2xl">
  <p class="py-4 text-2xl/7 font-semibold md:py-0">
    <span class="bg-border">"{quote}"</span>
  </p>
  <div class="flex items-center gap-3 mt-6">
    <div
      class="bg-foreground/10 bg-cover bg-center bg-no-repeat sm flex-shrink-0 h-12 w-12 rounded-full"
      style="background-image: url('{image}');"
    ></div>
    <div>
      <p class="text-base font-semibold leading-none">{author}</p>
      <p title={title} class="mt-1 text-ellipsis whitespace-nowrap text-base font-semibold leading-none text-foreground-secondary">
        {title}
      </p>
    </div>
  </div>
</div>
