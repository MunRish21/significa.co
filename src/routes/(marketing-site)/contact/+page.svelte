<script lang="ts">
  import ContactForm from '$components/contact-form.svelte';
  import Segg1 from '$components/pages/contact/illustrations/segg1.svelte';
  import Segg2 from '$components/pages/contact/illustrations/segg2.svelte';
  import PanWithEggs from '$components/pages/contact/pan-with-eggs.svelte';
  import RandomizedHoverableGallery from '$components/randomized-hoverable-gallery.svelte';
  import {
    BASE_URL,
    generateOrganizationSchema,
    generateBreadcrumbSchema,
    generateContactPageSchema,
    generateFAQSchema
  } from '$lib/utils/schema';

  import { isSectionEnabled, type SectionsMap } from '$lib/tenant';

  export let data: {
    page: { title: string | null; description: string | null; meta: Record<string, unknown> } | null;
    sections: SectionsMap;
  };

  $: dbPage = data?.page ?? null;
  $: sections = (data?.sections ?? {}) as SectionsMap;
  $: on = (key: string) => isSectionEnabled(sections, key);
  $: pageTitle = dbPage?.title ?? 'Contact Techyor — Start a Project or Ask a Question';
  $: pageDescription =
    dbPage?.description ??
    "Got a project in mind? Send us a message — no lengthy brief required. We reply within 24 hours. Email info@techyor.com or call +91 9915002625.";
  $: pageMeta = (dbPage?.meta ?? {}) as Record<string, string>;

  const faqs = [
    {
      question: 'How fast do you reply?',
      answer:
        "Within 24 hours on weekdays. If it's urgent, mention it in the message and we'll get back faster."
    },
    {
      question: 'What should I send with my first message?',
      answer:
        "Whatever's easiest. A rough idea, a Figma file, a feature list, or a 2-minute Loom. We don't need a polished brief."
    },
    {
      question: 'Do you work with teams outside India?',
      answer:
        'Yes. Most of our clients are in the US, UK, Switzerland, and Australia. We run remote with weekly syncs in your timezone.'
    },
    {
      question: 'How much does a project cost?',
      answer:
        'It depends on scope. Most engagements start at $5K for small builds and scale up for larger products. We send a fixed quote after a short scoping call.'
    },
    {
      question: 'Can you work with our existing team?',
      answer:
        "Yes. We're often the design and development arm of in-house product teams. We can plug into Slack, GitHub, Linear, or whatever you already use."
    },
    {
      question: 'How long until we can start?',
      answer:
        "Usually within one to two weeks. For smaller projects, sooner. We'll confirm exact timelines on the scoping call."
    }
  ];

  const galleryCards = [
    {
      component: 'photo_card' as const,
      photo: {
        filename: '/assets/storyblok/office-interior-03.jpg',
        alt: 'Office image 1'
      }
    },
    {
      component: 'photo_card' as const,
      photo: {
        filename: '/assets/storyblok/office-interior-05.jpg',
        alt: 'Office image 2'
      }
    },
    {
      component: 'notepad_card' as const,
      text: 'Chandigarh, India\ninfo@techyor.com\n+91 9915002625'
    },
    {
      component: 'photo_card' as const,
      photo: {
        filename: '/assets/storyblok/office-interior-04.jpg',
        alt: 'Office image 3'
      }
    },
    {
      component: 'photo_card' as const,
      photo: {
        filename: '/assets/storyblok/office-interior-01.jpg',
        alt: 'Office image 4'
      }
    },
    {
      component: 'photo_card' as const,
      photo: {
        filename: '/assets/storyblok/office-interior-02.jpg',
        alt: 'Office image 5'
      }
    }
  ];
</script>

<svelte:head>
  <title>{pageTitle}</title>
  <meta name="description" content={pageDescription} />

  <meta property="og:type" content="website" />
  <meta property="og:title" content="Contact Techyor — Start a Project" />
  <meta
    property="og:description"
    content="Tell us what you're building. We reply within 24 hours."
  />
  <meta property="og:image" content="{BASE_URL}/api/og/contact" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Contact Techyor — replies within 24 hours" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@TechyorDotCo" />
  <meta name="twitter:title" content="Contact Techyor — Start a Project" />
  <meta
    name="twitter:description"
    content="Tell us what you're building. We reply within 24 hours."
  />
  <meta name="twitter:image" content="{BASE_URL}/api/og/contact" />
  <meta name="twitter:image:alt" content="Contact Techyor — replies within 24 hours" />

  {@html `<${'script'} type="application/ld+json">${generateOrganizationSchema()}</${'script'}>`}
  {@html `<${'script'} type="application/ld+json">${generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Contact', url: '/contact' }
  ])}</${'script'}>`}
  {@html `<${'script'} type="application/ld+json">${generateContactPageSchema({
    url: `${BASE_URL}/contact`,
    description:
      "Get in touch with Techyor — a digital product studio building websites, apps, AI tools, and automation. Replies within 24 hours.",
    imagePath: '/api/og/contact'
  })}</${'script'}>`}
  {@html `<${'script'} type="application/ld+json">${generateFAQSchema(faqs)}</${'script'}>`}
</svelte:head>

<div class="overflow-hidden">
  {#if on('contact-form')}
    <div class="container relative mx-auto px-container">
      <section class="pb-5 pt-10 lg:pb-12 lg:pt-20 lg:text-center">
        <h1 class="mx-auto text-7xl text-foreground-secondary lg:max-w-2xl">Contact us.</h1>
        <span class="mx-auto block text-7xl lg:max-w-2xl">Tell us what you're building.</span>
        <p
          data-speakable
          class="mx-auto mt-6 max-w-xl text-lg text-foreground-secondary lg:mt-8"
        >
          Send us a message. We reply within 24 hours. No lengthy brief required.
        </p>
      </section>

      <section class="mx-auto lg:max-w-xl lg:pt-5">
        <ContactForm
          variant="contact"
          disclaimer="Your information stays private and is never shared."
        />
      </section>

      <PanWithEggs class="absolute -left-16 top-4 hidden -rotate-[14deg] drop-shadow-md lg:block" />
      <Segg1 class="absolute -right-16 top-[170px] hidden -rotate-[16deg] drop-shadow-md lg:block" />
      <Segg2 class="absolute -right-20 top-[400px] hidden -rotate-[16deg] drop-shadow-md lg:block" />
    </div>
  {/if}

  {#if on('gallery')}
    <div class="container mx-auto px-container py-12 lg:py-20">
      <RandomizedHoverableGallery cards={galleryCards} />
    </div>
  {/if}

  <section class="container mx-auto px-container py-16 lg:py-24">
    <div class="mx-auto max-w-2xl">
      <h2 class="text-3xl md:text-4xl">Common questions.</h2>
      <dl class="mt-8 space-y-8 lg:mt-12">
        {#each faqs as faq}
          <div>
            <dt class="text-lg font-medium">{faq.question}</dt>
            <dd class="mt-2 text-foreground-secondary">{faq.answer}</dd>
          </div>
        {/each}
      </dl>
    </div>
  </section>
</div>
