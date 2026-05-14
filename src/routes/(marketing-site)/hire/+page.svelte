<script lang="ts">
  import OptimizedImage from '$components/optimized-image.svelte';
  import {
    BASE_URL,
    generateBreadcrumbSchema,
    generateOrganizationSchema,
    generateFAQSchema
  } from '$lib/utils/schema';
  import { hireRoles, sharedFaq } from '$lib/data/hire-roles';

  $: breadcrumbJsonLd = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Hire', url: '/hire' }
  ]);
  $: faqJsonLd = generateFAQSchema(sharedFaq);
  $: orgJsonLd = generateOrganizationSchema();
</script>

<svelte:head>
  <title>Hire Developers — Dedicated Teams from Techyor</title>
  <meta
    name="description"
    content="Hire senior developers for React, Node.js, Python, mobile, AI, and more. Dedicated, code-ownership, NDA-friendly."
  />

  <meta property="og:type" content="website" />
  <meta property="og:title" content="Hire Developers — Dedicated Teams from Techyor" />
  <meta
    property="og:description"
    content="Hire senior developers for React, Node.js, Python, mobile, AI, and more. Dedicated, code-ownership, NDA-friendly."
  />
  <meta property="og:image" content="{BASE_URL}/og.png" />

  {@html `<${'script'} type="application/ld+json">${breadcrumbJsonLd}</${'script'}>`}
  {@html `<${'script'} type="application/ld+json">${faqJsonLd}</${'script'}>`}
  {@html `<${'script'} type="application/ld+json">${orgJsonLd}</${'script'}>`}
</svelte:head>

<main class="overflow-hidden">
  <!-- Breadcrumbs -->
  <div class="container mx-auto px-container pt-8 text-sm text-foreground-secondary">
    <a href="/" class="transition-colors hover:text-foreground">Home</a>
    <span class="mx-2">/</span>
    <span class="text-foreground">Hire</span>
  </div>

  <!-- Hero -->
  <section class="container mx-auto px-container py-16 md:py-24">
    <div class="max-w-3xl">
      <h1 class="font-display text-4xl md:text-5xl font-bold leading-tight mb-4">
        Hire Developers
      </h1>
      <p class="text-lg text-foreground-secondary max-w-2xl">
        Dedicated, vetted senior developers for React, Node.js, Python, mobile apps, AI tools, and
        more. Code you own. NDA-friendly. Respond in 4 hours.
      </p>
    </div>
  </section>

  <!-- Role Grid -->
  <section class="container mx-auto px-container py-16 md:py-24">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each hireRoles as role (role.slug)}
        <a
          href="/hire/{role.slug}"
          class="group block p-6 border border-border rounded-lg transition-all hover:border-foreground hover:shadow-lg"
        >
          <h3 class="font-semibold text-lg mb-2 group-hover:text-accent transition-colors">
            {role.title}
          </h3>
          <p class="text-sm text-foreground-secondary mb-4">
            {role.subhead}
          </p>
          <div class="flex flex-wrap gap-2">
            {#each role.techStack.slice(0, 3) as tech}
              <span class="px-2 py-1 bg-background-secondary text-xs rounded">
                {tech}
              </span>
            {/each}
            {#if role.techStack.length > 3}
              <span class="px-2 py-1 bg-background-secondary text-xs rounded text-foreground-secondary">
                +{role.techStack.length - 3} more
              </span>
            {/if}
          </div>
        </a>
      {/each}
    </div>
  </section>

  <!-- FAQ -->
  <section class="container mx-auto px-container py-16 md:py-24">
    <div class="max-w-2xl">
      <h2 class="font-display text-3xl font-bold mb-8">Common Questions</h2>
      <div class="space-y-6">
        {#each sharedFaq as item}
          <details class="group border-b border-border pb-4">
            <summary class="cursor-pointer font-semibold text-foreground group-open:text-accent">
              {item.question}
            </summary>
            <p class="mt-3 text-foreground-secondary text-sm leading-relaxed">
              {item.answer}
            </p>
          </details>
        {/each}
      </div>
    </div>
  </section>
</main>
