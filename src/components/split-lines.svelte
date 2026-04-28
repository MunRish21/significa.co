<script lang="ts">
  export let as = 'p';
  export let text: string;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+?[\d\s\-().]{7,}$/;

  type LineKind = 'email' | 'phone' | 'text';
  const classify = (line: string): LineKind => {
    const trimmed = line.trim();
    if (emailRegex.test(trimmed)) return 'email';
    if (phoneRegex.test(trimmed)) return 'phone';
    return 'text';
  };
</script>

{#each text.split('\n') as line}
  {#if !line}
    <br />
  {:else}
    {@const kind = classify(line)}
    <svelte:element this={as} class={$$restProps.class} style={$$restProps.style}>
      {#if kind === 'email'}
        <a href={`mailto:${line.trim()}`} class="hover:underline">{line}</a>
      {:else if kind === 'phone'}
        <a href={`tel:${line.trim().replace(/[\s\-().]/g, '')}`} class="hover:underline">{line}</a>
      {:else}
        {line}
      {/if}
    </svelte:element>
  {/if}
{/each}
