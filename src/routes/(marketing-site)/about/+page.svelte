<script lang="ts">
  import Physics from '$components/blocks/physics.svelte';
  import CoreValues from '$components/blocks/core-values.svelte';
  import FaqsList from '$components/blocks/faqs-list.svelte';
  import ClientsSection from '$components/sections/clients-section.svelte';
  import OfficeCards from '$components/blocks/office-cards.svelte';
  import { commonFaqsBlock } from '$lib/data/faqs';
  import {
    generateOrganizationSchema,
    generateFAQSchema,
    generateBreadcrumbSchema
  } from '$lib/utils/schema';

  const physicsBlock = {
    component: 'physics',
    variant: 'hero',
    hero_title: 'About us.',
    physics_blocks: [
      {
        _uid: '1',
        component: 'physics-balloon-card',
        theme: 'yellow',
        text: 'Top Rated on Upwork ⭐'
      },
      {
        _uid: '2',
        component: 'physics-sticker',
        photo: {
          filename: '/assets/storyblok/upwork-certified.webp',
          alt: 'Top Rated on Upwork'
        }
      },
      {
        _uid: '4',
        component: 'physics-sticker',
        photo: {
          filename: '/assets/storyblok/experience-badge.webp',
          alt: '8 Years of Experience'
        }
      },
      {
        _uid: '5',
        component: 'physics-sticker',
        photo: {
          filename: '/assets/storyblok/design-services.webp',
          alt: 'Design Services'
        }
      },
      {
        _uid: '6',
        component: 'physics-input',
        placeholder: 'Type something...'
      },
      {
        _uid: '7',
        component: 'physics-rectangle-card',
        theme: 'dark',
        text: '8 Years of Experience'
      },
      {
        _uid: '8',
        component: 'physics-sticker',
        photo: {
          filename: '/assets/storyblok/development-services.webp',
          alt: 'Development Services'
        }
      },
      {
        _uid: '10',
        component: 'physics-balloon-card',
        theme: 'yellow',
        text: '95% International Clients'
      },
      {
        _uid: '11',
        component: 'physics-sticker',
        photo: {
          filename: '/assets/storyblok/growth-milestone.webp',
          alt: 'Growth & Milestone'
        }
      }
    ]
  };

  const coreValuesBlock = {
    component: 'core-values',
    values_title1: 'Our Values.',
    values_title2: 'Built into every line of code.',
    values_description: '',
    values: [
      {
        title: 'Ownership.',
        description: "We treat every project like it's ours. Because until you're happy, it is."
      },
      {
        title: 'Speed with substance.',
        description:
          'We move fast — but never at the cost of quality. Every decision is intentional.'
      },
      {
        title: 'Radical honesty.',
        description: "No sugarcoating. No vanishing acts. You'll always know where things stand."
      },
      {
        title: "Builder's mindset.",
        description:
          "We don't just execute briefs. We think, question, and improve — because good enough never ships great products."
      },
      {
        title: 'Hunger.',
        description:
          "Eight years in and we're still chasing better. For our clients, for our craft, for ourselves."
      }
    ]
  };

  const remoteBlock = {
    component: 'office-cards',
    office_title1: 'Remote.',
    office_title2: 'Built for the world, from India.',
    office_description:
      "We don't have a fancy office — and that's exactly the point. Our lean, remote setup means lower overheads, faster turnarounds, and savings we pass directly to our clients. No commute. No fluff. Just focused people doing their best work — wherever they are.",
    office_cards: []
  };
</script>

<svelte:head>
  <title>About Techyor — Mission, Values & Team Behind the Studio</title>
  <meta
    name="description"
    content="Techyor is a digital product studio with 8+ years of experience and 80+ products shipped. Meet the team, our values, and the principles behind every product we build."
  />

  <meta property="og:type" content="website" />
  <meta property="og:title" content="About Techyor — Mission, Values & Team" />
  <meta
    property="og:description"
    content="A digital product studio with 8+ years of experience. Meet the team, our values, and how we build."
  />
  <meta property="og:image" content="https://www.techyor.com/og.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="About Techyor" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@TechyorDotCo" />
  <meta name="twitter:title" content="About Techyor — Mission, Values & Team" />
  <meta
    name="twitter:description"
    content="A digital product studio with 8+ years of experience. Meet the team behind the work."
  />
  <meta name="twitter:image" content="https://www.techyor.com/og.png" />

  <script type="application/ld+json">
{generateOrganizationSchema()}
  </script>
  <script type="application/ld+json">
{generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about' }
  ])}
  </script>
  <script type="application/ld+json">
{generateFAQSchema(commonFaqsBlock.faqs_items.map(item => ({
    question: item.question,
    answer: item.answer
  })))}
  </script>
</svelte:head>

<div class="overflow-hidden">
  <!-- Physics Hero Section -->
  <Physics block={physicsBlock} />

  <!-- Who We Are Section -->
  <section class="border-t">
    <div
      class="container mx-auto flex flex-col justify-between gap-6 px-container py-8 lg:flex-row lg:gap-4 lg:py-12"
    >
      <div class="lg:max-w-xl">
        <h2 class="text-5xl text-foreground-secondary">Who we are.</h2>
        <p class="text-5xl">A lean team that ships.</p>
      </div>
      <p class="whitespace-pre-line text-2xl text-foreground-secondary lg:max-w-xl">
        We started in 2018 with one goal — build digital products that actually work. No fluff, no
        overcomplicating things. Just sharp execution, honest communication, and results you can
        measure. We're a dev-first agency that puts AI at the centre of everything we build today.
        From chatbots to voice agents to full-scale web platforms — we've done it, shipped it, and
        have the client reviews to back it up. Based in India. Trusted by clients across the UK,
        Australia, Spain, and Europe. 8 years in. Still hungry.
      </p>
    </div>
  </section>

  <!-- Our Values Section -->
  <CoreValues block={coreValuesBlock} />

  <!-- Clients Section -->
  <ClientsSection title="Clients we've worked with" />

  <!-- FAQ Section -->
  <FaqsList block={commonFaqsBlock} />

  <!-- Remote Section -->
  <OfficeCards block={remoteBlock} />
</div>
