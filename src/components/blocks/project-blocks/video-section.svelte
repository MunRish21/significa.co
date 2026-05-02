<script lang="ts">
  export let src: string;
  export const alt: string = 'Project video';
</script>

<figure class="not-rich-text my-8 h-auto w-full md:my-14 block block-video mx-auto max-w-4xl">
  <video class="m-auto rounded-lg bg-background" {src} loop autoplay muted playsinline>
    <track kind="captions" />
  </video>
</figure>
