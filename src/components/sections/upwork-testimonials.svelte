<script lang="ts">
  import UpworkLogo from '$components/blocks/upwork-logo.svelte';
  import { renderStars, type Testimonial } from '$lib/data/testimonials';
  import { getTeamMember } from '$lib/data/team';

  /** Testimonials to render — keep in caller-controlled order. */
  export let items: Testimonial[];
  export let eyebrow: string = 'Verified client reviews';
  export let title: string = 'Testimonials.';
  export let subtitle: string = 'What clients say.';
  export let description: string =
    'Real reviews from real clients — every testimonial below is from a verified Upwork engagement.';
  /** Optional banner CTA (typically a link to the team member's Upwork profile). */
  export let ctaUrl: string | undefined = undefined;
  export let ctaLabel: string = 'View Upwork profile';
  /** Add a top border. Set false when the parent already separates visually. */
  export let bordered: boolean = true;
  /** Background tint — set to '' for transparent. */
  export let background: string = 'bg-background-offset/40';
</script>

{#if items.length > 0}
  <section class="{bordered ? 'border-t' : ''} {background}">
    <div class="container mx-auto px-container py-12 lg:py-20">
      <div class="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div class="max-w-2xl">
          <div
            class="mb-3 inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1.5"
          >
            <UpworkLogo />
            <span class="text-sm text-foreground-secondary">{eyebrow}</span>
          </div>
          <h2 class="text-5xl text-foreground-secondary">{title}</h2>
          <p class="text-5xl">{subtitle}</p>
          {#if description}
            <p class="mt-3 text-foreground-secondary">{description}</p>
          {/if}
        </div>

        {#if ctaUrl}
          <a
            href={ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex h-12 items-center gap-2 self-start rounded-lg border bg-background px-5 text-md font-medium transition-all hover:bg-foreground/5 lg:self-auto"
          >
            <UpworkLogo withText={false} />
            <span>{ctaLabel}</span>
            <span aria-hidden="true">↗</span>
          </a>
        {/if}
      </div>

      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {#each items as t (t.id)}
          {@const member = t.memberSlug ? getTeamMember(t.memberSlug) : undefined}
          <figure class="flex flex-col rounded-lg border bg-background p-6">
            <div class="flex items-center justify-between">
              {#if t.rating}
                <div
                  class="text-amber-500"
                  aria-label={`${t.rating} out of 5 stars`}
                >
                  {renderStars(t.rating)}
                </div>
              {:else}
                <span></span>
              {/if}
              {#if t.source === 'Upwork'}
                <span
                  class="inline-flex items-center gap-1 rounded-full bg-foreground/5 px-2.5 py-0.5 text-xs"
                >
                  <UpworkLogo withText={false} />
                  <span style="color:#14a800" class="font-medium">Verified</span>
                </span>
              {/if}
            </div>

            <blockquote class="mt-3 flex-1 text-lg leading-snug">
              "{t.quote}"
            </blockquote>

            {#if t.tags && t.tags.length > 0}
              <div class="mt-4 flex flex-wrap gap-1.5">
                {#each t.tags as tag}
                  <span
                    class="inline-flex items-center rounded-full bg-foreground/5 px-2.5 py-0.5 text-xs text-foreground-secondary"
                  >
                    {tag}
                  </span>
                {/each}
              </div>
            {/if}

            <figcaption class="mt-5 flex items-center gap-3 border-t pt-4">
              {#if t.authorAvatar}
                <img
                  src={t.authorAvatar}
                  alt={t.author}
                  width="40"
                  height="40"
                  class="h-10 w-10 rounded-full object-cover"
                />
              {:else}
                <div
                  class="flex h-10 w-10 items-center justify-center rounded-full bg-foreground/10 text-sm font-medium"
                >
                  {(t.author || 'C').charAt(0)}
                </div>
              {/if}
              <div class="min-w-0 flex-1">
                <p class="truncate text-sm font-medium">{t.author}</p>
                {#if t.projectTitle}
                  <p class="truncate text-xs text-foreground-secondary">{t.projectTitle}</p>
                {/if}
                <div class="mt-0.5 flex items-center gap-1.5 text-xs text-foreground-secondary">
                  {#if t.date}
                    <span>{t.date}</span>
                  {/if}
                  {#if member && t.date}
                    <span aria-hidden="true">·</span>
                  {/if}
                  {#if member}
                    <a
                      href={`/team/${member.slug}`}
                      class="underline-offset-2 hover:text-foreground hover:underline"
                    >
                      For {member.shortName || member.name}
                    </a>
                  {/if}
                </div>
              </div>
            </figcaption>
          </figure>
        {/each}
      </div>
    </div>
  </section>
{/if}
