<script lang="ts">
  import TeamMemberCard from '$components/blocks/team-member-card.svelte';
  import { page } from '$app/stores';
  import { getActiveTeamMembers, type TeamMember } from '$lib/data/team';

  export let title: string = 'The team behind the work.';
  export let subtitle: string = 'Specialists you can hire directly.';
  /** Override the per-tenant DB list. Falls back to hardcoded only when DB is empty. */
  export let members: TeamMember[] | null = null;
  export let limit: number | undefined = undefined;
  export let showViewAll: boolean = false;

  $: dbMembers = ($page.data?.dbTeamMembers ?? []) as TeamMember[];
  $: effective =
    members ?? (dbMembers.length > 0 ? dbMembers : getActiveTeamMembers());
  $: visible = limit ? effective.slice(0, limit) : effective;
</script>



{#if visible.length > 0}
  <section class="border-t">
    <div class="container mx-auto px-container py-16 lg:py-24">
      <div class="mb-10 flex flex-col justify-between gap-4 lg:mb-14 lg:flex-row lg:items-end">
        <div>
          <h2 class="text-5xl text-foreground-secondary">{title}</h2>
          <p class="text-5xl">{subtitle}</p>
        </div>
        {#if showViewAll}
          <a
            href="/about"
            class="text-base font-medium text-foreground-secondary underline-offset-4 hover:text-foreground hover:underline"
          >
            See the full team →
          </a>
        {/if}
      </div>

      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {#each visible as member (member.slug)}
          <TeamMemberCard {member} />
        {/each}
      </div>
    </div>
  </section>
{/if}
