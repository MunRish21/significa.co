<script lang="ts">
  import TeamMemberCard from '$components/blocks/team-member-card.svelte';
  import { getActiveTeamMembers, type TeamMember } from '$lib/data/team';

  export let title: string = 'The team behind the work.';
  export let subtitle: string = 'Specialists you can hire directly.';
  export let members: TeamMember[] = getActiveTeamMembers();
  export let limit: number | undefined = undefined;
  export let showViewAll: boolean = false;

  $: visible = limit ? members.slice(0, limit) : members;
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
