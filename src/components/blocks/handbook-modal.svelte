<script lang="ts">
  export let isOpen = false;
  export let title = '';
  export let lastUpdated = '';
  export let image = '';
  export let expandUrl = '';

  function handleExpand() {
    if (expandUrl) {
      window.open(expandUrl, '_blank');
    }
  }
</script>

{#if isOpen}
  <!-- Overlay -->
  <button
    type="button"
    aria-label="Close modal"
    class="fixed inset-0 z-40 cursor-default bg-black/50 transition-opacity"
    on:click={() => (isOpen = false)}
  />

  <!-- Modal -->
  <div class="fixed bottom-2 left-2 right-2 top-2 z-50 overflow-y-auto scroll-smooth rounded-lg bg-background shadow-2xl transition md:left-auto md:w-3/4 lg:w-2/3">
    <!-- Header -->
    <header class="sticky left-0 top-0 z-50 flex items-center justify-between border-b bg-background p-2 motion-safe:transition-colors border-b-transparent">
      <button type="button" on:click={handleExpand} class="group relative inline-flex items-center justify-center gap-1.5 overflow-hidden whitespace-nowrap text-md font-medium leading-none outline-none transition-all hover:ring-4 focus-visible:ring-4 active:scale-[0.98] active:ring-2 disabled:pointer-events-none disabled:opacity-60 h-11 rounded-md px-5 bg-background">
        <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12.6 4v4h-1.2V5.4l-6 6H8v1.2H3.4V8h1.2v2.6l6-6H8V3.4h4.6V4Z" fill="currentColor"></path>
          <path d="M4.8 11.3c0-.4.7-.8 1-1.2l.5-.5.5-.8c.5-.7 1-1.5 1.7-2l.7-.6 1.1-.6.7-.5.3-.3M8.5 4H12M12 4v3.1M3.9 8.5v2.3l.2.7v.4M4.1 11.9h2.1c.2.2.6.2.8.2h.4l.2-.1" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"></path>
        </svg>
        <span>Expand</span>
      </button>
      <button type="button" aria-label="Close" on:click={() => (isOpen = false)} class="group relative inline-flex items-center justify-center gap-1.5 overflow-hidden whitespace-nowrap text-md font-medium leading-none outline-none transition-all hover:ring-4 focus-visible:ring-4 active:scale-[0.98] active:ring-2 disabled:pointer-events-none disabled:opacity-60 h-11 rounded-md px-5 bg-background">
        <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="m4.5 4.5 7 7M4.5 11.5l7-7" stroke="currentColor" stroke-width="1.2"></path>
          <path d="M4.4 4.3c0 .4.2.8.4 1.1l.8 1c.4.4.7.8 1.2 1.1l1.5.8c.6.2 1 .6 1.5 1l1 .6.7 1" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"></path>
          <path d="M11.3 5c0 .2-.3.4-.5.6l-.5.9c-.2.4-.4.5-.7.8l-1 .8c-.6.3-1.1.6-1.5 1-.6.7-1.4 1.2-2.1 1.6-.4.1-.7.4-.7.8" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"></path>
        </svg>
      </button>
    </header>

    <!-- Content -->
    <div>
      <div class="container mx-auto px-container">
        <div class="rich-text mx-auto mb-20 mt-10 max-w-2xl lg:mt-20">
          {#if image}
            <img src={image} alt={title} class="mb-10 w-full rounded-lg" />
          {/if}
          {#if lastUpdated}
            <p class="pt-0.5 text-sm text-foreground-secondary">
              <span>Last updated</span>
              <span class="text-foreground-tertiary">·</span>
              <span class="text-foreground">{lastUpdated}</span>
            </p>
          {/if}
          <h1 class="[&:first-of-type]:mt-0">{title}</h1>
        </div>

        <!-- Rich Content Slot -->
        <div class="group rich-text @container my-10 md:my-14 lg:my-20">
          <slot />
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  :global(.rich-text) {
    line-height: 1.6;
  }

  :global(.rich-text h2) {
    margin-top: 2rem;
    margin-bottom: 1rem;
    font-size: 1.875rem;
    font-weight: 600;
  }

  :global(.rich-text h3) {
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    font-size: 1.5rem;
    font-weight: 600;
  }

  :global(.rich-text p) {
    margin-bottom: 1rem;
  }

  :global(.rich-text a) {
    text-decoration: underline;
  }

  :global(.rich-text a:hover) {
    text-decoration: none;
  }
</style>
