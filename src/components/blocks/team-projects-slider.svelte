<script lang="ts">
  import { projectsData } from '$lib/data/projects';

  export let slugs: string[] = [];
  export let title: string = 'Recent work.';
  export let subtitle: string = 'Selected case studies.';

  $: projects = slugs
    .map((slug) => projectsData.find((p) => p.slug === slug))
    .filter((p): p is (typeof projectsData)[number] => Boolean(p));

  let scroller: HTMLDivElement;

  const scrollByCard = (dir: 1 | -1) => {
    if (!scroller) return;
    const card = scroller.querySelector<HTMLElement>('[data-slide]');
    const step = card ? card.offsetWidth + 24 : scroller.clientWidth * 0.8;
    scroller.scrollBy({ left: step * dir, behavior: 'smooth' });
  };
</script>

{#if projects.length > 0}
  <section class="border-t">
    <div class="container mx-auto px-container py-12 lg:py-20">
      <div class="mb-8 flex flex-col justify-between gap-4 lg:mb-10 lg:flex-row lg:items-end">
        <div class="max-w-2xl">
          <h2 class="text-5xl text-foreground-secondary">{title}</h2>
          <p class="text-5xl">{subtitle}</p>
        </div>

        <div class="flex items-center gap-3">
          <a
            href="/projects"
            class="text-base font-medium text-foreground-secondary underline-offset-4 hover:text-foreground hover:underline"
          >
            View all projects →
          </a>
          <div class="hidden gap-2 lg:flex">
            <button
              type="button"
              aria-label="Previous projects"
              class="flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:bg-foreground/5"
              on:click={() => scrollByCard(-1)}
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Next projects"
              class="flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:bg-foreground/5"
              on:click={() => scrollByCard(1)}
            >
              →
            </button>
          </div>
        </div>
      </div>

      <div
        bind:this={scroller}
        class="-mx-container flex snap-x snap-mandatory gap-6 overflow-x-auto px-container pb-4 [scrollbar-width:thin]"
      >
        {#each projects as project (project.slug)}
          <a
            data-slide
            href={`/projects/${project.slug}`}
            class="group flex w-[85%] flex-shrink-0 snap-start flex-col overflow-hidden rounded-lg border bg-background-offset transition-colors hover:border-foreground/30 sm:w-[60%] lg:w-[calc((100%-3rem)/3)]"
          >
            <div class="aspect-[4/3] w-full overflow-hidden bg-foreground/5">
              <img
                src={project.image}
                alt={project.name}
                loading="lazy"
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <div class="flex flex-1 flex-col p-5">
              {#if project.publishedYear}
                <p class="text-xs uppercase tracking-wider text-foreground-secondary">
                  {project.publishedYear}
                </p>
              {/if}
              <h3 class="mt-1 text-2xl font-semibold leading-tight">{project.name}</h3>
              {#if project.tagline}
                <p class="mt-2 line-clamp-3 text-base text-foreground-secondary">
                  {project.tagline}
                </p>
              {/if}

              {#if project.services && project.services.length > 0}
                <div class="mt-4 flex flex-wrap gap-1.5">
                  {#each project.services.slice(0, 3) as svc}
                    <span class="inline-flex items-center rounded-full bg-foreground/5 px-2.5 py-0.5 text-xs text-foreground-secondary">
                      {svc}
                    </span>
                  {/each}
                </div>
              {/if}

              <div class="mt-auto pt-5">
                <span class="text-sm font-medium underline-offset-4 group-hover:underline">
                  View case study →
                </span>
              </div>
            </div>
          </a>
        {/each}
      </div>
    </div>
  </section>
{/if}
