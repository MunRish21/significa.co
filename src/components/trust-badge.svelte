<script lang="ts">
  import { page } from '$app/stores';

  /** Compact variant strips description and uses smaller padding. */
  export let compact: boolean = false;
  /** Background variant — set to 'transparent' or '' to remove tint. */
  export let background: string = 'bg-background-offset/40';
  /** Add a top border. */
  export let bordered: boolean = false;

  $: isAgency =
    (($page.data?.tenant?.meta as Record<string, unknown> | undefined)?.isAgency as
      | boolean
      | undefined) === true;

  const signals = [
    {
      icon: '🔒',
      title: 'NDA before first call',
      description: 'Mutual NDA signed before we discuss anything specific to your product.'
    },
    {
      icon: '📦',
      title: 'You own all code and IP',
      description: 'Full code, repos, designs, and IP transfer on delivery. No vendor lock-in.'
    },
    {
      icon: '⚡',
      title: '4-hour response time',
      description: 'Replies during US business hours, async-first. No standing meetings unless you want one.'
    }
  ];
</script>

{#if isAgency}
<section class="{bordered ? 'border-t' : ''} {background}">
  <div class="container mx-auto px-container {compact ? 'py-6 lg:py-8' : 'py-10 lg:py-14'}">
    <div class="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
      {#each signals as signal}
        <div class="flex items-start gap-3">
          <span class="flex-shrink-0 text-2xl" aria-hidden="true">{signal.icon}</span>
          <div>
            <h3 class="font-semibold text-foreground">{signal.title}</h3>
            {#if !compact}
              <p class="mt-1 text-sm text-foreground-secondary leading-relaxed">
                {signal.description}
              </p>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
{/if}
