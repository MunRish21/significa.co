<script lang="ts">
  import { onMount } from 'svelte';

  export let beforeImage: string;
  export let afterImage: string;
  export let beforeLabel: string = 'Before';
  export let afterLabel: string = 'After';

  let visibility = 50;
  let isDragging = false;

  onMount(() => {
    const handler = document.querySelector('.comparison-handler');
    if (!handler) return;

    const handleMouseDown = () => {
      isDragging = true;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const container = handler.parentElement;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      visibility = Math.max(0, Math.min(100, (x / rect.width) * 100));
    };

    handler.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      handler.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  });
</script>

<div class="relative my-8 overflow-hidden rounded-md md:my-14 block block-comparison mx-auto max-w-4xl" style="--comparison-visibility: {visibility}%;">
  <div class="absolute left-[calc(var(--comparison-visibility)-2px)] top-0 z-10 h-full w-1 bg-black"></div>
  <button
    role="button"
    tabindex="0"
    class="flex items-center justify-center rounded-full outline-none focus-visible:ring-4 active:scale-95 h-10 w-10 comparison-handler absolute left-[var(--comparison-visibility)] top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize bg-black text-white transition-none hover:opacity-100"
    aria-hidden="true"
  >
    <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="m14 8.4-2.7 2.9-.9-.9 1.8-1.8H3.8l1.8 1.8-.9.9L2 8.4 1.5 8l.4-.4 2.8-2.9.9.9-1.8 1.8h8.4l-1.8-1.8.9-.9L14 7.6l.4.4-.4.4Z" fill="currentColor"></path>
      <path d="M2.9 7.9c1.3 0 2.7-.3 4 0h1l1.2.2 2 .1 1.7-.2M2 8c.2 0 .4.2.5.3l.3.3c.4.3 1 .4 1.2.8l.4.7.3.3s.2.3.1 0M10.9 5.2c.5.4.8 1 1.3 1.3l.4.4.3.3.3.3.3.2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"></path>
      <path d="M2 8c.2 0 .3-.2.4-.3.2 0 .3-.2.4-.3l.3-.1.1-.1.4-.3.2-.2.2-.2.3-.3.5-.6M13.6 8c0 .3-.3.6-.5.8-.2.3-.4.6-.7.7l-.3.3-.3.2-.5.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"></path>
    </svg>
  </button>
  <img class="h-auto w-full" src={beforeImage} alt={beforeLabel} width="1440" height="833" />
  <img class="absolute inset-0 h-full w-[var(--comparison-visibility)] overflow-hidden object-cover object-left" src={afterImage} alt={afterLabel} width="1440" height="833" />
</div>
