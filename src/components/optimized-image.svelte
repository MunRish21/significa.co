<script lang="ts">
  import imageManifest from '$lib/data/image-manifest.json';

  type ManifestEntry = {
    srcset: { webp: string[]; avif: string[]; original: string[] };
    width: number;
    height: number;
  };
  const manifest = imageManifest as Record<string, ManifestEntry>;

  export let src: string;
  export let alt: string;
  export let width: number | string | undefined = undefined;
  export let height: number | string | undefined = undefined;
  export let sizes = '(max-width: 768px) 100vw, 50vw';
  export let loading: 'lazy' | 'eager' = 'lazy';
  let className = '';
  export { className as class };

  $: meta = manifest[src];
  $: fallback = meta ? meta.srcset.original[meta.srcset.original.length - 1].split(' ')[0] : src;
</script>

{#if meta}
  <picture>
    <source type="image/avif" srcset={meta.srcset.avif.join(', ')} {sizes} />
    <source type="image/webp" srcset={meta.srcset.webp.join(', ')} {sizes} />
    <img
      class={className}
      src={fallback}
      srcset={meta.srcset.original.join(', ')}
      {sizes}
      {alt}
      width={width ?? meta.width}
      height={height ?? meta.height}
      {loading}
      decoding="async"
    />
  </picture>
{:else}
  <img class={className} {src} {alt} {width} {height} {loading} decoding="async" />
{/if}
