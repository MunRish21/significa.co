<script lang="ts">
  import {
    BASE_URL,
    generateBreadcrumbSchema,
    generatePersonSchema,
    generateProfessionalReviewSchema
  } from '$lib/utils/schema';
  import ContactCtaSection from '$components/blocks/project-blocks/contact-cta-section.svelte';
  import TeamProjectsSlider from '$components/blocks/team-projects-slider.svelte';
  import UpworkLogo from '$components/blocks/upwork-logo.svelte';
  import { slugifyService, type TeamMember } from '$lib/data/team';
  import {
    filterTestimonialsByMember,
    getTestimonialsByMember,
    renderStars,
    type Testimonial
  } from '$lib/data/testimonials';
  import { page as pageStore } from '$app/stores';

  export let data: { member: TeamMember };

  $: member = data.member;
  $: pageUrl = `/team/${member.slug}`;
  $: upworkLink = member.links.find((l) => l.icon === 'upwork')?.url;
  $: isAgency =
    (($pageStore.data?.tenant?.meta as Record<string, unknown> | undefined)?.isAgency as
      | boolean
      | undefined) === true;
  $: brandName = ($pageStore.data?.tenant?.name as string | undefined) ?? 'Techyor';
  $: dbTestimonials = ($pageStore.data?.dbTestimonials ?? []) as Testimonial[];
  $: memberTestimonials =
    dbTestimonials.length > 0
      ? filterTestimonialsByMember(dbTestimonials, member.slug)
      : getTestimonialsByMember(member.slug);

  $: personSchema = generatePersonSchema({
    name: member.name,
    jobTitle: member.role,
    description: member.bio,
    image: member.avatar,
    url: pageUrl,
    sameAs: member.links.map((l) => l.url),
    knowsAbout: member.skills,
    alumniOf: member.education[0]?.school,
    worksFor: isAgency ? brandName : undefined,
    addressLocality: member.location.split(',')[0]?.trim(),
    addressCountry:
      member.location.toLowerCase().includes('india') ? 'IN' : undefined
  });

  $: reviewSchema =
    memberTestimonials.length > 0
      ? generateProfessionalReviewSchema({
          itemName: member.name,
          itemUrl: pageUrl,
          itemImage: member.avatar,
          reviews: memberTestimonials.map((t) => ({
            rating: t.rating || 5,
            body: t.quote,
            author: t.author || 'Verified Client',
            date: t.date
          }))
        })
      : null;

  $: breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about' },
    { name: member.name, url: pageUrl }
  ]);
</script>

<svelte:head>
  <title>{member.seo.title}</title>
  <meta name="description" content={member.seo.description} />
  <meta name="keywords" content={member.seo.keywords.join(', ')} />
  <link rel="canonical" href={`${BASE_URL}${pageUrl}`} />

  <meta property="og:type" content="profile" />
  <meta property="og:title" content={member.seo.title} />
  <meta property="og:description" content={member.seo.description} />
  <meta property="og:image" content={`${BASE_URL}/api/og/team/${member.slug}`} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="{member.name} — {member.role}{isAgency ? ` at ${brandName}` : ''}" />
  <meta property="og:url" content={`${BASE_URL}${pageUrl}`} />
  <meta property="profile:first_name" content={member.name.split(' ')[0]} />
  <meta property="profile:last_name" content={member.name.split(' ').slice(1).join(' ')} />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={member.seo.title} />
  <meta name="twitter:description" content={member.seo.description} />
  <meta name="twitter:image" content={`${BASE_URL}/api/og/team/${member.slug}`} />
  <meta name="twitter:image:alt" content="{member.name} — {member.role}{isAgency ? ` at ${brandName}` : ''}" />

  {@html `<${'script'} type="application/ld+json">${personSchema}</${'script'}>`}
  {@html `<${'script'} type="application/ld+json">${breadcrumbSchema}</${'script'}>`}
  {#if reviewSchema}
    {@html `<${'script'} type="application/ld+json">${reviewSchema}</${'script'}>`}
  {/if}
</svelte:head>

<!-- BREADCRUMBS -->
<div class="container mx-auto px-container pt-8">
  <nav class="text-sm text-foreground-secondary" aria-label="Breadcrumb">
    <a href="/" class="hover:text-foreground hover:underline">Home</a>
    <span class="mx-2">/</span>
    <a href="/about" class="hover:text-foreground hover:underline">About</a>
    <span class="mx-2">/</span>
    <span class="text-foreground">{member.name}</span>
  </nav>
</div>

<!-- HERO -->
<section class="container mx-auto px-container pb-12 pt-8 lg:pt-14">
  <div class="grid grid-cols-1 gap-10 lg:grid-cols-[420px_1fr] lg:gap-16">
    <div>
      <div class="overflow-hidden rounded-lg border bg-foreground/5">
        <img
          src={member.avatar}
          alt={`${member.name} — ${member.role}`}
          width="576"
          height="576"
          class="h-auto w-full object-cover"
        />
      </div>

      <div class="mt-5 grid grid-cols-3 gap-3 rounded-lg border bg-background-offset p-4">
        {#if member.stats.jobSuccess}
          <div>
            <p class="text-2xl font-semibold leading-tight">{member.stats.jobSuccess}</p>
            <p class="text-xs text-foreground-secondary">Job Success</p>
          </div>
        {/if}
        {#if member.stats.totalJobs !== undefined}
          <div>
            <p class="text-2xl font-semibold leading-tight">{member.stats.totalJobs}</p>
            <p class="text-xs text-foreground-secondary">Jobs Done</p>
          </div>
        {/if}
        {#if member.stats.totalHours !== undefined}
          <div>
            <p class="text-2xl font-semibold leading-tight">{member.stats.totalHours}</p>
            <p class="text-xs text-foreground-secondary">Hours Worked</p>
          </div>
        {/if}
      </div>
    </div>

    <div>
      {#if member.location}
        <p class="text-xs uppercase tracking-wider text-foreground-secondary">
          {member.location}
        </p>
      {/if}
      <h1 class="mt-2 text-5xl leading-tight lg:text-6xl">
        {member.name}
      </h1>
      <p class="mt-2 text-3xl text-foreground-secondary lg:text-4xl">
        {member.role}
      </p>
      <p data-speakable class="mt-1 text-xl text-foreground-secondary">{member.tagline}</p>

      <div class="mt-6 flex flex-wrap gap-2">
        {#each member.badges as badge}
          <span class="inline-flex items-center rounded-full border px-3 py-1 text-sm">
            {badge}
          </span>
        {/each}
      </div>

      <p class="mt-8 text-xl">{member.bio}</p>

      <div class="mt-8 flex flex-wrap gap-3">
        {#if isAgency}
          <a
            href="/get-a-quote"
            class="inline-flex h-12 items-center justify-center rounded-lg bg-foreground px-6 text-md font-medium text-background transition-all hover:ring-4 active:scale-[0.98]"
          >
            Hire {member.name.split(' ')[0]}
          </a>
          <a
            href="/contact"
            class="inline-flex h-12 items-center justify-center rounded-lg border px-6 text-md font-medium transition-all hover:bg-foreground/5"
          >
            Book a call
          </a>
        {/if}
        {#if member.hourlyRate}
          <span
            class="inline-flex h-12 items-center gap-2 rounded-lg bg-background-offset px-4 text-base text-foreground-secondary"
            title="Hourly rate for individual contractor engagements via Upwork. Studio projects are priced fixed-scope or retainer-based."
          >
            <span>Upwork rate: {member.hourlyRate}</span>
          </span>
        {/if}
      </div>
      {#if isAgency && member.hourlyRate}
        <p class="mt-3 max-w-2xl text-sm text-foreground-secondary">
          The hourly rate above is for individual contractor engagements via Upwork. Studio
          projects are priced project- or retainer-based —
          <a href="/get-a-quote" class="underline underline-offset-2 hover:text-foreground">
            get a quote
          </a>
          for typical ranges.
        </p>
      {/if}

      {#if member.links.length > 0}
        <div class="mt-6 flex flex-wrap items-center gap-4 text-sm text-foreground-secondary">
          <span>Verify on:</span>
          {#each member.links as link}
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              class="underline-offset-4 hover:text-foreground hover:underline"
            >
              {link.label} ↗
            </a>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</section>

<!-- INTRO VIDEO -->
{#if member.introVideo}
  <section class="border-t">
    <div class="container mx-auto px-container py-12 lg:py-20">
      <div class="mx-auto mb-8 max-w-2xl text-center">
        <p class="text-xs uppercase tracking-wider text-foreground-secondary">Video intro</p>
        <h2 class="mt-2 text-4xl text-foreground-secondary">Why work with me.</h2>
        <p class="text-4xl">Hear it straight from {member.name.split(' ')[0]}.</p>
      </div>
      <div class="mx-auto w-full max-w-2xl">
        <div class="relative overflow-hidden rounded-lg border bg-foreground/5 pb-[56.25%]">
          <iframe
            src={member.introVideo.url}
            title={member.introVideo.title || `${member.name} — intro video`}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
            referrerpolicy="strict-origin-when-cross-origin"
            class="absolute inset-0 h-full w-full"
          />
        </div>
      </div>
    </div>
  </section>
{/if}

<!-- LONG BIO -->
{#if member.longBio}
  <section class="border-t">
    <div class="container mx-auto grid grid-cols-1 gap-8 px-container py-12 lg:grid-cols-3 lg:gap-16 lg:py-20">
      <h2 class="text-4xl text-foreground-secondary lg:col-span-1">About.</h2>
      <p class="whitespace-pre-line text-2xl leading-snug lg:col-span-2">
        {member.longBio}
      </p>
    </div>
  </section>
{/if}

<!-- SKILLS -->
<section class="border-t">
  <div class="container mx-auto grid grid-cols-1 gap-8 px-container py-12 lg:grid-cols-3 lg:gap-16 lg:py-20">
    <div>
      <h2 class="text-4xl text-foreground-secondary">Skills.</h2>
      <p class="mt-2 text-foreground-secondary">
        What they use daily.
      </p>
    </div>
    <div class="lg:col-span-2">
      <div class="flex flex-wrap gap-2">
        {#each member.skills as skill}
          <span class="inline-flex items-center rounded-full bg-background-offset px-4 py-2 text-sm">
            {skill}
          </span>
        {/each}
      </div>
    </div>
  </div>
</section>

<!-- TESTIMONIALS -->
{#if memberTestimonials.length > 0}
  <section class="border-t bg-background-offset/40">
    <div class="container mx-auto px-container py-12 lg:py-20">
      <div class="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div class="max-w-2xl">
          <div class="mb-3 inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1.5">
            <UpworkLogo />
            <span class="text-sm text-foreground-secondary">Verified client reviews</span>
          </div>
          <h2 class="text-5xl text-foreground-secondary">Testimonials.</h2>
          <p class="text-5xl">What clients say.</p>
          <p class="mt-3 text-foreground-secondary">
            Verified client reviews from Upwork.
          </p>
        </div>

        {#if upworkLink}
          <a
            href={upworkLink}
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex h-12 items-center gap-2 self-start rounded-lg border bg-background px-5 text-md font-medium transition-all hover:bg-foreground/5 lg:self-auto"
          >
            <UpworkLogo withText={false} />
            <span>View Upwork profile</span>
            <span aria-hidden="true">↗</span>
          </a>
        {/if}
      </div>

      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {#each memberTestimonials as t}
          <figure class="flex flex-col rounded-lg border bg-background p-6">
            <div class="flex items-center justify-between">
              {#if t.rating}
                <div class="text-amber-500" aria-label={`${t.rating} out of 5 stars`}>
                  {renderStars(t.rating)}
                </div>
              {:else}
                <span></span>
              {/if}
              {#if t.source === 'Upwork'}
                <span class="inline-flex items-center gap-1 rounded-full bg-foreground/5 px-2.5 py-0.5 text-xs">
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
                  <span class="inline-flex items-center rounded-full bg-foreground/5 px-2.5 py-0.5 text-xs text-foreground-secondary">
                    {tag}
                  </span>
                {/each}
              </div>
            {/if}

            <figcaption class="mt-5 flex items-center gap-3 border-t pt-4">
              {#if t.authorAvatar}
                <img
                  src={t.authorAvatar}
                  alt={t.author || 'Client'}
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
                <p class="truncate text-sm font-medium">{t.author || 'Verified Client'}</p>
                {#if t.projectTitle}
                  <p class="truncate text-xs text-foreground-secondary">{t.projectTitle}</p>
                {/if}
                <p class="mt-0.5 text-xs text-foreground-secondary">
                  {t.date || ''}
                </p>
              </div>
            </figcaption>
          </figure>
        {/each}
      </div>

      {#if upworkLink}
        <div class="mt-10 flex flex-col items-start gap-3 rounded-lg border bg-background p-6 lg:flex-row lg:items-center lg:justify-between">
          <div class="flex items-start gap-3">
            <UpworkLogo size="md" withText={false} />
            <div>
              <p class="font-medium">All reviews above are from verified Upwork engagements.</p>
              <p class="mt-1 text-sm text-foreground-secondary">
                See the full work history, ratings, and earnings on the live profile.
              </p>
            </div>
          </div>
          <a
            href={upworkLink}
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex h-11 items-center gap-2 rounded-lg bg-foreground px-5 text-sm font-medium text-background transition-all hover:ring-4"
          >
            View on Upwork ↗
          </a>
        </div>
      {/if}
    </div>
  </section>
{/if}

<!-- FEATURED PROJECTS — slider with real case studies -->
{#if member.featuredProjectSlugs.length > 0}
  <TeamProjectsSlider
    slugs={member.featuredProjectSlugs}
    title="Recent work."
    subtitle="Selected case studies."
  />
{/if}

<!-- BACKGROUND: EDU + EMPLOYMENT -->
<section class="border-t">
  <div class="container mx-auto grid grid-cols-1 gap-12 px-container py-12 lg:grid-cols-2 lg:py-20">
    <div>
      <h2 class="text-4xl text-foreground-secondary">Education.</h2>
      <ul class="mt-6 space-y-6">
        {#each member.education as edu}
          <li class="border-l-2 border-foreground/20 pl-5">
            <p class="text-lg font-semibold">{edu.degree}</p>
            {#if edu.field}
              <p class="text-foreground-secondary">{edu.field}</p>
            {/if}
            <p class="mt-1 text-sm text-foreground-secondary">
              {edu.school} · {edu.years}
            </p>
          </li>
        {/each}
      </ul>
    </div>
    <div>
      <h2 class="text-4xl text-foreground-secondary">Experience.</h2>
      <ul class="mt-6 space-y-6">
        {#each member.employment as job}
          <li class="border-l-2 border-foreground/20 pl-5">
            <p class="text-lg font-semibold">{job.title}</p>
            {#if job.company}
              <p class="text-foreground-secondary">{job.company} · {job.period}</p>
            {:else}
              <p class="text-foreground-secondary">{job.period}</p>
            {/if}
            {#if job.description}
              <p class="mt-2 text-foreground-secondary">{job.description}</p>
            {/if}
          </li>
        {/each}
      </ul>
    </div>
  </div>
</section>

<!-- SERVICES THIS PERSON DELIVERS — links to real filter pages -->
{#if member.primaryServices.length > 0}
  <section class="border-t bg-background-offset/40">
    <div class="container mx-auto px-container py-12 lg:py-20">
      <div class="mb-8 max-w-2xl">
        <h2 class="text-5xl text-foreground-secondary">Services.</h2>
        <p class="text-5xl">What {member.name.split(' ')[0]} can build for you.</p>
        <p class="mt-3 text-foreground-secondary">
          Each service links to live work in that category.
        </p>
      </div>
      <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {#each member.primaryServices as svc}
          <a
            href={`/projects/${slugifyService(svc)}`}
            class="group flex items-center justify-between rounded-lg border bg-background p-5 transition-colors hover:border-foreground/30"
          >
            <span class="text-lg font-medium">{svc}</span>
            <span class="text-foreground-secondary transition-transform group-hover:translate-x-1">→</span>
          </a>
        {/each}
      </div>
      <div class="mt-8">
        <a
          href="/services"
          class="text-base font-medium text-foreground-secondary underline-offset-4 hover:text-foreground hover:underline"
        >
          Explore all services →
        </a>
      </div>
    </div>
  </section>
{/if}

{#if isAgency}
  <ContactCtaSection returnTo={pageUrl} />
{/if}
