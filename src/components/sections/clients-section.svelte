<script lang="ts">
  import { page } from '$app/stores';

  type ClientLogo = {
    slug: string;
    name: string;
    lightLogo: string;
    darkLogo: string;
    width: number;
    height: number;
    url: string;
  };

  export let title: string = 'Proud to have worked with';

  $: clients = ($page.data?.clients ?? []) as ClientLogo[];
</script>

{#if clients.length > 0}
  <section class="container mx-auto mb-16 mt-20 px-container lg:my-20">
    <h3 class="text-center text-lg text-foreground-secondary">{title}</h3>
    <div class="flex flex-wrap justify-center gap-9 p-6">
      {#each clients as client}
        <a
          href={client.url}
          target="_blank"
          rel="noopener noreferrer"
          class="group transition-all duration-300"
        >
          <img
            src={client.lightLogo}
            alt={client.name}
            width={client.width}
            height={client.height}
            class="h-auto max-h-16 w-auto object-contain grayscale transition-all duration-300 group-hover:grayscale-0"
          />
        </a>
      {/each}
    </div>
  </section>
{/if}
