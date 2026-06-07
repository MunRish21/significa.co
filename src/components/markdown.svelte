<script lang="ts">
  import { marked } from 'marked';
  import { clsx } from 'clsx';

  /** Markdown source string (first-party, automation-authored). */
  export let source: string | null | undefined = '';
  let className: string | undefined = undefined;
  export { className as class };

  // `async: false` narrows the return type to `string` (no async extensions in use).
  $: html = source ? (marked.parse(source, { async: false, gfm: true, breaks: false }) as string) : '';
</script>

<!-- eslint-disable svelte/no-at-html-tags -->
{#if html}
  <div class={clsx('rich-text max-w-none', className)}>
    {@html html}
  </div>
{/if}
