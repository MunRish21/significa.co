<script lang="ts">
  export let title: string = 'Investment.';
  export let subtitle: string = 'What it costs to build with us.';
  export let description: string =
    'Most engagements price as fixed-scope projects. Ranges below reflect typical V1 builds — we send a written estimate after one call.';
  /** Background variant — empty string for transparent. */
  export let background: string = '';
  /** Add a top border. */
  export let bordered: boolean = true;

  const tiers = [
    {
      label: 'Marketing site',
      range: '$3K–$8K',
      timeframe: '2–4 weeks',
      description: 'For founders who need a fast, credible site to launch, raise, or sell.',
      includes: [
        'Design + build (5–10 pages)',
        'CMS so you can edit copy yourself',
        'Analytics + SEO basics wired up',
        'Mobile-responsive, fast, accessible'
      ],
      best_for: 'Pre-launch startups, founders pitching investors, indie hackers'
    },
    {
      label: 'Web app MVP',
      range: '$10K–$35K',
      timeframe: '6–12 weeks',
      description: 'For founders shipping V1 — real product, real users, real database.',
      includes: [
        'Custom design + product flows',
        'Auth, payments, dashboards, APIs',
        'Database + backend infrastructure',
        '30-day post-launch support included'
      ],
      best_for: 'Pre-seed / seed founders, validated ideas, paying or waitlisted users',
      featured: true
    },
    {
      label: 'Full product',
      range: '$35K+',
      timeframe: '3+ months',
      description: 'For teams scaling past V1 — multi-screen, AI features, integrations.',
      includes: [
        'Web app + mobile or admin tooling',
        'AI integrations, automations, complex workflows',
        'Dedicated team across the engagement',
        'Retainer option after launch'
      ],
      best_for: 'Post-MVP teams, seed-stage with revenue, businesses adding new product lines'
    }
  ];
</script>

<section class="{bordered ? 'border-t' : ''} {background}">
  <div class="container mx-auto px-container py-16 lg:py-24">
    <!-- Header -->
    <div class="mb-12 max-w-2xl">
      <h2 class="text-5xl text-foreground-secondary">{title}</h2>
      <p class="text-5xl">{subtitle}</p>
      {#if description}
        <p class="mt-4 text-foreground-secondary">{description}</p>
      {/if}
    </div>

    <!-- Tiers -->
    <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
      {#each tiers as tier}
        <div
          class="flex flex-col rounded-lg border p-6 {tier.featured
            ? 'border-foreground bg-background-offset/40'
            : 'border-border'}"
        >
          {#if tier.featured}
            <span
              class="mb-3 inline-block self-start rounded-full bg-foreground px-2 py-0.5 text-xs font-medium uppercase tracking-wider text-background"
            >
              Most common
            </span>
          {/if}
          <h3 class="text-2xl font-semibold">{tier.label}</h3>
          <p class="mt-2 text-3xl font-bold">{tier.range}</p>
          <p class="mt-1 text-sm text-foreground-secondary">{tier.timeframe}</p>
          <p class="mt-4 text-sm text-foreground-secondary leading-relaxed">{tier.description}</p>

          <ul class="mt-6 space-y-2 text-sm">
            {#each tier.includes as item}
              <li class="flex items-start gap-2">
                <span class="mt-0.5 flex-shrink-0 text-foreground" aria-hidden="true">✓</span>
                <span>{item}</span>
              </li>
            {/each}
          </ul>

          <p class="mt-6 border-t border-border pt-4 text-xs text-foreground-secondary">
            <span class="font-semibold text-foreground">Best for:</span>
            {tier.best_for}
          </p>
        </div>
      {/each}
    </div>

    <!-- Disclaimer -->
    <p class="mt-8 max-w-3xl text-sm text-foreground-secondary">
      Ranges are estimates from prior engagements. Exact pricing depends on scope, integrations,
      and timeline. We send a written estimate after one intro call — no obligation, no sales follow-up.
    </p>
  </div>
</section>
