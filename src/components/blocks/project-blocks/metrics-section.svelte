<script lang="ts">
  import MetricCard from './metric-card.svelte';

  export let metrics: Array<{
    label: string;
    value: string;
    tooltip: string;
    isPositive?: boolean;
  }> = [];
</script>

<div class="mx-auto flex max-w-2xl flex-wrap gap-6 gap-y-3 border-b py-6 md:gap-8 md:gap-y-4">
  {#each metrics as metric}
    <MetricCard label={metric.label} value={metric.value} tooltip={metric.tooltip} isPositive={metric.isPositive ?? true} />
  {/each}
</div>
