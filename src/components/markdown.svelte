<script lang="ts">
  import { marked, type Tokens } from 'marked';
  import { clsx } from 'clsx';

  /** Markdown source string (first-party, automation-authored). */
  export let source: string | null | undefined = '';
  let className: string | undefined = undefined;
  export { className as class };

  /**
   * Custom link renderer: every *external* link rendered from markdown gets
   * `target="_blank" rel="nofollow noopener noreferrer"`. Internal links
   * (paths starting with `/` or `#`, or relative) render as plain anchors so
   * we don't accidentally apply nofollow to our own pages and tank internal
   * link equity.
   *
   * `marked.use({ renderer })` mutates the module-level marked instance, so
   * this applies to every parse below — including all comparison-post
   * markdown fields (introduction, ranking criteria, verdict, tool
   * description).
   */
  marked.use({
    renderer: {
      link({ href, title, text }: Tokens.Link) {
        const isExternal = /^https?:\/\//i.test(href);
        const titleAttr = title ? ` title="${title}"` : '';
        const extAttr = isExternal
          ? ' target="_blank" rel="nofollow noopener noreferrer"'
          : '';
        return `<a href="${href}"${titleAttr}${extAttr}>${text}</a>`;
      }
    }
  });

  // `async: false` narrows the return type to `string` (no async extensions in use).
  $: html = source ? (marked.parse(source, { async: false, gfm: true, breaks: false }) as string) : '';
</script>

<!-- eslint-disable svelte/no-at-html-tags -->
{#if html}
  <div class={clsx('rich-text max-w-none', className)}>
    {@html html}
  </div>
{/if}
