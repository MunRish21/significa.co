<script lang="ts">
  import { onMount } from 'svelte';

  /** CSS selector of the element that, when in viewport, hides the floating CTA. */
  export let hideWhenVisibleSelector: string = '#contact-form';
  /** Visible label, e.g. "Hire React Developers". */
  export let label: string;
  /** Selector to scroll to on click. */
  export let scrollTargetSelector: string = '#contact-form';
  /** Distance below the top of viewport before the CTA fades in. */
  export let revealAfterScrollPx: number = 600;

  let mounted = false;
  let scrolledPastThreshold = false;
  let formInView = false;

  /** Final visibility = mounted AND past threshold AND form not in view. */
  $: visible = mounted && scrolledPastThreshold && !formInView;

  function handleClick(event: MouseEvent) {
    event.preventDefault();
    const target = document.querySelector(scrollTargetSelector);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  onMount(() => {
    mounted = true;

    const onScroll = () => {
      scrolledPastThreshold = window.scrollY > revealAfterScrollPx;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const target = document.querySelector(hideWhenVisibleSelector);
    let observer: IntersectionObserver | undefined;
    if (target && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          formInView = entries[0]?.isIntersecting ?? false;
        },
        { rootMargin: '0px 0px -25% 0px', threshold: 0 }
      );
      observer.observe(target);
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer?.disconnect();
    };
  });
</script>

<div
  class="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-4 transition-all duration-300 sm:bottom-6 sm:justify-end sm:pr-6 md:pr-8"
  class:opacity-0={!visible}
  class:translate-y-4={!visible}
  class:opacity-100={visible}
  aria-hidden={!visible}
>
  <a
    href={scrollTargetSelector}
    on:click={handleClick}
    tabindex={visible ? 0 : -1}
    class="pointer-events-auto inline-flex h-12 items-center gap-2 rounded-full border border-foreground bg-foreground px-6 font-medium text-background shadow-lg outline-none transition-all hover:scale-[1.02] hover:ring-4 focus-visible:ring-4 active:scale-[0.98]"
  >
    <span
      class="relative flex h-2 w-2 items-center justify-center"
      aria-hidden="true"
    >
      <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
      <span class="relative inline-flex h-2 w-2 rounded-full bg-green-400"></span>
    </span>
    <span>{label}</span>
    <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M8 3v9M11.5 8.5l-3.5 3.5-3.5-3.5" stroke="currentColor" stroke-width="1.4" />
    </svg>
  </a>
</div>
