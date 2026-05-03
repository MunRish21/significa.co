<script lang="ts">
  let className: string | undefined = undefined;
  export { className as class };
  export let withText: boolean = true;
  export let size: 'sm' | 'md' = 'sm';
</script>

<span
  class={`inline-flex items-center gap-1.5 ${size === 'md' ? 'text-base' : 'text-sm'} ${className ?? ''}`}
>
  <svg
    viewBox="0 0 56 56"
    xmlns="http://www.w3.org/2000/svg"
    class={size === 'md' ? 'h-5 w-5' : 'h-4 w-4'}
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      d="M42.4 18.6c-3.7 0-7 2.4-8.3 5.7-2-3-3.5-6.8-4.5-10h-4.6v12.1c0 3-2.4 5.5-5.5 5.5s-5.5-2.5-5.5-5.5V14.3H9.4v12.1c0 5.5 4.4 10 9.9 10s9.9-4.5 9.9-10v-2c1 1.9 2.1 3.9 3.5 5.7l-3 14H34l2.1-9.9c1.8 1.2 4 1.9 6.3 1.9 5 0 9.1-4.1 9.1-9.2 0-5.1-4-9.3-9.1-9.3zm0 14c-1.9 0-3.7-.8-5.2-2.1l.4-1.5v-.1c.3-1.6 1.2-4.4 4.8-4.4 2.7 0 4.8 2.2 4.8 4.9-.1 2.9-2.2 5.2-4.8 5.2z"
      style="color:#14a800"
    />
  </svg>
  {#if withText}
    <span class="font-medium" style="color:#14a800">Upwork</span>
  {/if}
</span>
