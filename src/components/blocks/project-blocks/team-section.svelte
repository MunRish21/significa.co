<script lang="ts">
  import { page } from '$app/stores';
  import TeamMemberAvatar from './team-member-avatar.svelte';

  export let team: Array<{
    name: string;
    image: string;
    href?: string;
  }> = [];

  $: isAgency =
    (($page.data?.tenant?.meta as Record<string, unknown> | undefined)?.isAgency as
      | boolean
      | undefined) === true;
</script>

{#if isAgency}
  <div class="mx-auto mt-8 max-w-2xl border-b pb-8">
    <h4 class="mb-4 text-xs uppercase tracking-wider text-foreground-secondary">Team involved</h4>
    <div class="flex flex-wrap gap-2">
      {#each team as member}
        <TeamMemberAvatar name={member.name} image={member.image} href={member.href || '#'} />
      {/each}
    </div>
  </div>
{/if}
