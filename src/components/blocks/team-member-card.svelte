<script lang="ts">
  import type { TeamMember } from '$lib/data/team';
  import clsx from 'clsx';

  export let member: TeamMember;
  export let variant: 'default' | 'compact' = 'default';

  let className: string | undefined = undefined;
  export { className as class };
</script>

<a
  href={`/team/${member.slug}`}
  class={clsx(
    'group block overflow-hidden rounded-lg border bg-background-offset transition-colors hover:border-foreground/30',
    className
  )}
>
  <div class="aspect-[4/5] w-full overflow-hidden bg-foreground/5">
    <img
      src={member.avatar}
      alt={`${member.name} — ${member.role}`}
      width="576"
      height="720"
      loading="lazy"
      class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
    />
  </div>

  <div class={clsx('p-5', variant === 'compact' && 'p-4')}>
    <p class="text-xs uppercase tracking-wider text-foreground-secondary">
      {member.location}
    </p>
    <h3
      class={clsx(
        'mt-1 font-semibold leading-tight',
        variant === 'compact' ? 'text-xl' : 'text-2xl'
      )}
    >
      {member.name}
    </h3>
    <p class="mt-1 text-base text-foreground-secondary">
      {member.role}
    </p>

    {#if variant === 'default'}
      <div class="mt-3 flex flex-wrap gap-1.5">
        {#each member.badges.slice(0, 2) as badge}
          <span class="inline-flex items-center rounded-full bg-foreground/5 px-2.5 py-0.5 text-xs text-foreground-secondary">
            {badge}
          </span>
        {/each}
      </div>
    {/if}
  </div>
</a>
