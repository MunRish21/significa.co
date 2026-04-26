<script lang="ts">
  export let benefits: Array<{
    title: string;
    description: string;
    icon: string;
  }> = [];
</script>

<section class="border-b lg:mt-20 mt-10 md:mt-14">
  <div class="justify-between gap-10 container mx-auto mb-6 flex flex-col px-container pt-8 lg:mb-12 lg:pt-12 xl:flex-row xl:gap-4">
    <div class="xl:sticky xl:top-8 xl:max-w-xl xl:self-start xl:pr-6">
      <h3 class="text-5xl text-foreground-secondary">Benefits.</h3>
      <p class="text-5xl">Empowering you to do your best work.</p>
    </div>
    <div class="gap-12 grid grid-cols-1 md:grid-cols-2">
      {#each benefits as benefit (benefit.title)}
        <div class="flex flex-col items-start xl:max-w-xs">
          <img src={benefit.icon} alt="{benefit.title} icon" class="max-h-14 mb-3 object-contain drop-shadow-md light:hidden" />
          <div class="text-lg font-semibold">{benefit.title}</div>
          <div class="text-lg font-semibold text-foreground-secondary">{benefit.description}</div>
        </div>
      {/each}
    </div>
  </div>
</section>
