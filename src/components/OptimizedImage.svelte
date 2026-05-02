<script lang="ts">
  import imageManifest from '$lib/data/image-manifest.json';

  export let src: string;
  export let alt: string;
  export let sizes: string = '100vw';
  export let loading: 'lazy' | 'eager' = 'lazy';
  export let fetchpriority: 'high' | 'low' | 'auto' = 'auto';
  export let width: string | number | undefined = undefined;
  export let height: string | number | undefined = undefined;

  let className: string = '';
  export { className as class };

  type ImageManifest = Record<
    string,
    {
      srcset: { webp: string[]; avif: string[]; original: string[] };
      width: number;
      height: number;
      sizes: number[];
    }
  >;

  const manifest = imageManifest as ImageManifest;
  const imageMeta = manifest[src];

  const fallbackSrc = imageMeta
    ? imageMeta.srcset.original[imageMeta.srcset.original.length - 1].split(' ')[0]
    : src;

  $: resolvedWidth = width ?? imageMeta?.width;
  $: resolvedHeight = height ?? imageMeta?.height;
</script>

{#if imageMeta}
  <picture>
    <source type="image/avif" srcset={imageMeta.srcset.avif.join(', ')} {sizes} />
    <source type="image/webp" srcset={imageMeta.srcset.webp.join(', ')} {sizes} />
    <img
      src={fallbackSrc}
      srcset={imageMeta.srcset.original.join(', ')}
      {sizes}
      {alt}
      {loading}
      {fetchpriority}
      width={resolvedWidth}
      height={resolvedHeight}
      class={className}
    />
  </picture>
{:else}
  <img
    {src}
    {alt}
    {loading}
    {fetchpriority}
    width={resolvedWidth}
    height={resolvedHeight}
    class={className}
  />
{/if}

<style>
  picture,
  img {
    display: block;
    max-width: 100%;
    height: auto;
  }
</style>
