<script lang="ts">
  import Markdown from '$components/markdown.svelte';
  import { formatDate } from '$lib/utils/dates';
  import { estimateReadingTime, type ComparisonBlogPost } from '$lib/data/blog';

  export let post: ComparisonBlogPost;

  $: readingTime = estimateReadingTime(
    [post.introduction, post.rankingCriteria, post.verdict, ...post.faq.map((f) => f.answer)].join(
      ' '
    )
  );

  /**
   * Rendering modes based on tool count:
   *  - 3+ tools  → full comparison: show Pricing column, use-case picks, "at a glance" framing.
   *  - 2 tools   → side-by-side stack: hide Pricing, show use-case picks, re-label as "Tech stack".
   *  - 1 tool    → solo spotlight: hide Pricing AND use-case picks, re-label as "Tech stack".
   *
   * A "comparison" needs at least 3 entries to be meaningful — anything less reads
   * as a tool spotlight / tech stack, so we drop the comparison-y chrome.
   */
  $: isComparison = post.tools.length >= 3;
  $: hasMultipleTools = post.tools.length >= 2;
  $: glanceHeading = isComparison ? 'The tools at a glance' : 'Tech stack';
  $: depthHeading = isComparison ? 'The tools in depth' : 'In depth';

  const initials = (name: string) =>
    name
      .split(/\s+/)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase() ?? '')
      .join('');

  /**
   * Google's public favicon service — no API key required, works for any
   * reachable domain. Used as a fallback when a tool has no `logoUrl` of its
   * own but does have a `websiteUrl`.
   */
  const faviconUrl = (websiteUrl: string, size = 128) =>
    `https://www.google.com/s2/favicons?sz=${size}&domain_url=${encodeURIComponent(websiteUrl)}`;

  function onLogoError(event: Event) {
    const img = event.currentTarget as HTMLImageElement;
    img.style.display = 'none';
    const fallback = img.nextElementSibling as HTMLElement | null;
    if (fallback) fallback.style.display = 'flex';
  }
</script>

<article class="container mx-auto px-container py-12 lg:py-20">
  <!-- Header -->
  <header class="mx-auto max-w-4xl">
    <div class="flex flex-wrap items-center gap-2 text-base text-foreground-secondary">
      <span>{formatDate(new Date(post.date))}</span>
      <span class="text-foreground-secondary/60">•</span>
      <span>{readingTime} min read</span>
    </div>
    <h1 class="mt-3 text-4xl md:text-5xl lg:text-6xl">{post.title}</h1>
  </header>

  <!-- Hero image -->
  {#if post.heroImageUrl}
    <div class="mx-auto mt-8 max-w-4xl">
      <img
        src={post.heroImageUrl}
        alt={post.title}
        width="1200"
        height="630"
        class="aspect-[1200/630] w-full rounded-lg border object-cover"
        loading="eager"
        fetchpriority="high"
      />
    </div>
  {/if}

  <!-- Introduction -->
  {#if post.introduction}
    <div class="mx-auto mt-8 max-w-4xl">
      <Markdown source={post.introduction} />
    </div>
  {/if}

  <!-- Comparison table / tech-stack listing -->
  {#if post.tools.length}
    <section class="mx-auto mt-14 max-w-4xl">
      <h2 class="text-2xl md:text-3xl">{glanceHeading}</h2>

      <!-- Desktop table -->
      <div class="mt-6 hidden overflow-hidden rounded-lg border md:block">
        <table class="w-full border-collapse text-left">
          <thead class="bg-background-panel text-sm text-foreground-secondary">
            <tr>
              <th class="p-4 font-medium">Tool</th>
              <th class="p-4 font-medium">Best for</th>
              {#if isComparison}
                <th class="p-4 font-medium">Pricing</th>
              {/if}
              <th class="p-4 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {#each post.tools as tool (tool.id)}
              <tr class="border-t align-top">
                <td class="p-4">
                  <div class="flex items-center gap-3">
                    {#if tool.logoUrl}
                      <img
                        src={tool.logoUrl}
                        alt={`${tool.name} logo`}
                        width="32"
                        height="32"
                        loading="lazy"
                        class="h-8 w-8 rounded object-contain"
                        on:error={onLogoError}
                      />
                      <div
                        class="hidden h-8 w-8 items-center justify-center rounded border text-xs font-semibold"
                      >
                        {initials(tool.name)}
                      </div>
                    {:else if tool.websiteUrl}
                      <img
                        src={faviconUrl(tool.websiteUrl)}
                        alt={`${tool.name} favicon`}
                        width="32"
                        height="32"
                        loading="lazy"
                        class="h-8 w-8 rounded border object-contain p-1"
                        on:error={onLogoError}
                      />
                      <div
                        class="hidden h-8 w-8 items-center justify-center rounded border text-xs font-semibold"
                      >
                        {initials(tool.name)}
                      </div>
                    {:else}
                      <div
                        class="flex h-8 w-8 items-center justify-center rounded border text-xs font-semibold"
                      >
                        {initials(tool.name)}
                      </div>
                    {/if}
                    <a
                      href={`#tool-${tool.slug}`}
                      class="font-medium underline-offset-2 hover:underline"
                    >
                      {tool.name}
                    </a>
                  </div>
                </td>
                <td class="p-4 text-foreground-secondary">{tool.bestFor || '—'}</td>
                {#if isComparison}
                  <td class="p-4 text-foreground-secondary">{tool.pricing || '—'}</td>
                {/if}
                <td class="p-4">
                  <a
                    href={`#tool-${tool.slug}`}
                    class="whitespace-nowrap text-foreground-accent underline"
                  >
                    Read more →
                  </a>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>

      <!-- Mobile cards -->
      <div class="mt-6 grid grid-cols-1 gap-4 md:hidden">
        {#each post.tools as tool (tool.id)}
          <div class="rounded-lg border bg-background-panel p-4">
            <div class="flex items-center gap-3">
              {#if tool.logoUrl}
                <img
                  src={tool.logoUrl}
                  alt={`${tool.name} logo`}
                  width="32"
                  height="32"
                  loading="lazy"
                  class="h-8 w-8 rounded object-contain"
                  on:error={onLogoError}
                />
                <div
                  class="hidden h-8 w-8 items-center justify-center rounded border text-xs font-semibold"
                >
                  {initials(tool.name)}
                </div>
              {:else if tool.websiteUrl}
                <img
                  src={faviconUrl(tool.websiteUrl)}
                  alt={`${tool.name} favicon`}
                  width="32"
                  height="32"
                  loading="lazy"
                  class="h-8 w-8 rounded border object-contain p-1"
                  on:error={onLogoError}
                />
                <div
                  class="hidden h-8 w-8 items-center justify-center rounded border text-xs font-semibold"
                >
                  {initials(tool.name)}
                </div>
              {:else}
                <div
                  class="flex h-8 w-8 items-center justify-center rounded border text-xs font-semibold"
                >
                  {initials(tool.name)}
                </div>
              {/if}
              <a href={`#tool-${tool.slug}`} class="font-medium underline-offset-2 hover:underline">
                {tool.name}
              </a>
            </div>
            {#if tool.bestFor}
              <p class="mt-3 text-sm text-foreground-secondary">
                <span class="font-medium text-foreground">Best for:</span> {tool.bestFor}
              </p>
            {/if}
            {#if isComparison && tool.pricing}
              <p class="mt-1 text-sm text-foreground-secondary">
                <span class="font-medium text-foreground">Pricing:</span> {tool.pricing}
              </p>
            {/if}
            <a
              href={`#tool-${tool.slug}`}
              class="mt-3 inline-block text-foreground-accent underline"
            >
              Read more →
            </a>
          </div>
        {/each}
      </div>
    </section>
  {/if}

  <!-- How We Evaluated / ranking criteria -->
  {#if post.rankingCriteria}
    <section class="mx-auto mt-14 max-w-4xl">
      <Markdown source={post.rankingCriteria} />
    </section>
  {/if}

  <!-- Use-case picks (only meaningful when there's more than one tool to choose from) -->
  {#if hasMultipleTools && post.useCasePicks.length}
    <section class="mx-auto mt-14 max-w-4xl">
      <h2 class="text-2xl md:text-3xl">Best pick by use case</h2>
      <div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {#each post.useCasePicks as pick}
          <div class="rounded-lg border bg-background-panel p-5">
            <p class="text-sm uppercase tracking-wide text-foreground-secondary">{pick.useCase}</p>
            {#if pick.tool}
              <p class="mt-1 text-xl font-medium">{pick.tool}</p>
            {/if}
            {#if pick.reason}
              <p class="mt-2 text-foreground-secondary">{pick.reason}</p>
            {/if}
          </div>
        {/each}
      </div>
    </section>
  {/if}

  <!-- Tools in depth (one block per tool) -->
  {#if post.tools.length}
    <section class="mx-auto mt-14 max-w-4xl">
      <h2 class="text-2xl md:text-3xl">{depthHeading}</h2>
      <div class="mt-8 space-y-10">
        {#each post.tools as tool, i (tool.id)}
          <article id={`tool-${tool.slug}`} class="scroll-mt-24 border-t pt-8">
            <!-- Tool header -->
            <div class="flex flex-wrap items-center gap-4">
              {#if tool.logoUrl}
                <img
                  src={tool.logoUrl}
                  alt={`${tool.name} logo`}
                  width="48"
                  height="48"
                  loading="lazy"
                  class="h-12 w-12 rounded-lg object-contain"
                  on:error={onLogoError}
                />
                <div
                  class="hidden h-12 w-12 items-center justify-center rounded-lg border text-base font-semibold"
                >
                  {initials(tool.name)}
                </div>
              {:else if tool.websiteUrl}
                <img
                  src={faviconUrl(tool.websiteUrl)}
                  alt={`${tool.name} favicon`}
                  width="48"
                  height="48"
                  loading="lazy"
                  class="h-12 w-12 rounded-lg border object-contain p-2"
                  on:error={onLogoError}
                />
                <div
                  class="hidden h-12 w-12 items-center justify-center rounded-lg border text-base font-semibold"
                >
                  {initials(tool.name)}
                </div>
              {:else}
                <div
                  class="flex h-12 w-12 items-center justify-center rounded-lg border text-base font-semibold"
                >
                  {initials(tool.name)}
                </div>
              {/if}
              <div class="min-w-0">
                <h3 class="text-xl font-medium md:text-2xl">
                  <span class="text-foreground-secondary">{i + 1}.</span>
                  {tool.name}
                </h3>
                {#if tool.bestFor}
                  <p class="text-sm text-foreground-secondary">
                    <span class="font-medium text-foreground">Best for:</span> {tool.bestFor}
                  </p>
                {/if}
              </div>
            </div>

            <!-- Preview image -->
            {#if tool.previewImageUrl}
              <div class="mt-5">
                <img
                  src={tool.previewImageUrl}
                  alt={`${tool.name} preview`}
                  width="960"
                  height="540"
                  loading="lazy"
                  class="aspect-[16/9] w-full rounded-lg border object-cover"
                />
              </div>
            {/if}

            <!-- Summary -->
            {#if tool.summary}
              <p class="mt-4 text-lg text-foreground-secondary">{tool.summary}</p>
            {/if}

            <!-- Description -->
            {#if tool.description}
              <div class="mt-3">
                <Markdown source={tool.description} />
              </div>
            {/if}

            <!-- Pros & cons -->
            {#if tool.pros.length || tool.cons.length}
              <div class="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {#if tool.pros.length}
                  <div class="rounded-lg border bg-background-panel p-5">
                    <h4 class="font-medium">Pros</h4>
                    <ul class="mt-3 space-y-2">
                      {#each tool.pros.slice(0, 3) as pro}
                        <li class="flex gap-2 text-foreground-secondary">
                          <span class="mt-0.5 select-none text-foreground-accent" aria-hidden="true"
                            >+</span
                          >
                          <span>{pro}</span>
                        </li>
                      {/each}
                    </ul>
                  </div>
                {/if}
                {#if tool.cons.length}
                  <div class="rounded-lg border bg-background-panel p-5">
                    <h4 class="font-medium">Cons</h4>
                    <ul class="mt-3 space-y-2">
                      {#each tool.cons.slice(0, 3) as con}
                        <li class="flex gap-2 text-foreground-secondary">
                          <span
                            class="mt-0.5 select-none text-foreground-secondary/70"
                            aria-hidden="true">−</span
                          >
                          <span>{con}</span>
                        </li>
                      {/each}
                    </ul>
                  </div>
                {/if}
              </div>
            {/if}

            <!-- Pricing + website -->
            <div class="mt-5 flex flex-wrap items-center gap-4">
              {#if tool.websiteUrl}
                <a
                  href={tool.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  class="inline-flex items-center rounded-lg border bg-background-panel px-4 py-2 font-medium text-foreground-accent transition-colors hover:bg-foreground-tertiary/10"
                >
                  Visit website →
                </a>
              {/if}
              {#if isComparison && tool.pricing}
                <span class="text-sm text-foreground-secondary">
                  <span class="font-medium text-foreground">Pricing:</span> {tool.pricing}
                </span>
              {/if}
            </div>
          </article>
        {/each}
      </div>
    </section>
  {/if}

  <!-- Verdict -->
  {#if post.verdict}
    <section class="mx-auto mt-14 max-w-4xl">
      <h2 class="text-2xl md:text-3xl">The verdict</h2>
      <div class="mt-4">
        <Markdown source={post.verdict} />
      </div>
    </section>
  {/if}

  <!-- FAQ -->
  {#if post.faq.length}
    <section class="mx-auto mt-14 max-w-4xl">
      <h2 class="text-2xl md:text-3xl">Frequently asked questions</h2>
      <div class="mt-6 divide-y border-t">
        {#each post.faq as item}
          <details class="group py-4">
            <summary class="cursor-pointer list-none text-lg font-medium marker:hidden">
              {item.question}
            </summary>
            <p class="mt-3 text-foreground-secondary">{item.answer}</p>
          </details>
        {/each}
      </div>
    </section>
  {/if}
</article>
