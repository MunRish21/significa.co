<script lang="ts" context="module">
  import type { ComponentType } from 'svelte';

  type Loader = () => Promise<{ default: ComponentType }>;

  const map: Record<string, Loader> = {
    'about-grid': () => import('./about-grid.svelte'),
    'awards-list': () => import('./awards-list.svelte'),
    'awards-grid': () => import('./awards-grid.svelte'),
    'draw-segg': () => import('./draw-segg.svelte'),
    'blog-list': () => import('./blog-list.svelte'),
    image: () => import('./image.svelte'),
    'careers-list': () => import('./careers-list.svelte'),
    faqs: () => import('./faqs-list.svelte'),
    'contact-us-form': () => import('./contact-us-form.svelte'),
    comparison: () => import('./comparison.svelte'),
    canvas: () => import('./canvas.svelte'),
    'core-values': () => import('./core-values.svelte'),
    'form-budget-range': () => import('./form-budget-range.svelte'),
    'image-grid': () => import('./image-grid.svelte'),
    'richtext-code-block': () => import('./rich-text-code-block.svelte'),
    'two-columns': () => import('./two-columns.svelte'),
    table: () => import('./table.svelte'),
    'richtext-testimonial': () => import('./rich-text-testimonial.svelte'),
    video: () => import('./video.svelte'),
    'richtext-box': () => import('./rich-text-box.svelte'),
    list: () => import('./list.svelte'),
    hero: () => import('./hero.svelte'),
    packages: () => import('./packages.svelte'),
    physics: () => import('./physics.svelte'),
    'prefooter-form': () => import('./prefooter-form.svelte'),
    'projects-two-columns': () => import('./projects-two-columns.svelte'),
    'work-recognitions': () => import('./work-recognitions.svelte'),
    estimation: () => import('./estimation.svelte'),
    newton: () => import('./newton.svelte'),
    'office-cards': () => import('./office-cards.svelte'),
    'open-positions': () => import('./open-positions.svelte'),
    slogan: () => import('./slogan.svelte'),
    slideshow: () => import('./slideshow.svelte'),
    steps: () => import('./steps.svelte'),
    services: () => import('./services.svelte'),
    testimonials: () => import('./testimonials.svelte'),
    'timeline-services': () => import('./timeline-services.svelte'),
    timeline: () => import('./timeline.svelte'),
    timezone: () => import('./timezone.svelte'),
    'vertical-list': () => import('./vertical-list.svelte'),
    clients: () => import('./clients.svelte'),
    projects: () => import('./projects.svelte'),
    'cta-card': () => import('./cta-card.svelte'),
    box: () => import('./box.svelte'),
    measurements: () => import('./measurements.svelte'),
    'text-with-media': () => import('./text-with-media.svelte'),
    'split-text': () => import('./split-text.svelte')
  };

  export type Blocks = keyof typeof map;

  const isBlock = (block: { component: string }): block is { component: Blocks } => {
    return !!block.component && block.component in map;
  };
</script>

<script lang="ts">
  import { dev } from '$app/environment';

  export let block: { component: string };

  const loader: Loader | null = isBlock(block) ? map[block.component] : null;
  const componentPromise = loader ? loader().then((m) => m.default) : null;

  if (!loader && dev) {
    console.error('Uncaught component', block.component);
  }
</script>

{#if componentPromise}
  {#await componentPromise then Component}
    <svelte:component this={Component} {block} {...$$restProps} />
  {/await}
{/if}
