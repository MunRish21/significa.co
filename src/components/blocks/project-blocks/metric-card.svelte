<script lang="ts">
  export let label: string;
  export let value: string;
  export let tooltip: string;
  export let isPositive: boolean = true;
</script>

<div class="flex flex-col whitespace-nowrap">
  <div>
    <button class="cursor-pointer text-left group relative">
      <div>
        <p class="text-xs font-medium uppercase">{label}</p>
        <div class="flex items-center gap-1.5">
          <img
            class="max-h-1.5"
            src="/assets/storyblok/polygon.png"
            alt={isPositive ? 'increase' : 'decrease'}
          />
          <p class="text-lg font-semibold md:text-2xl">{value}</p>
        </div>
      </div>
      <div class="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 p-4 bg-background text-foreground-secondary rounded-md border transition-all opacity-0 group-hover:opacity-100 group-hover:visible w-[200px] md:w-auto">
        <p class="whitespace-nowrap text-sm md:whitespace-nowrap">{tooltip}</p>
      </div>
    </button>
  </div>
</div>
