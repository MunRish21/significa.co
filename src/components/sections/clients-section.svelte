<script lang="ts">
  import { clientsData } from '$lib/data/clients';

  export let title: string = 'Proud to have worked with';
</script>

<section class="container mx-auto mb-16 mt-20 px-container lg:my-20">
  <h3 class="text-center text-lg text-foreground-secondary">{title}</h3>
  <div class="flex flex-wrap justify-center gap-6 p-6">
    {#each clientsData as client}
      <a href={client.url} target="_blank" rel="noopener noreferrer" class="group transition-all duration-300">
        <img src={client.lightLogo} alt={client.name} width={client.width} height={client.height} class="h-auto max-h-16 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300" />
      </a>
    {/each}
  </div>
</section>
