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
    generateContactPageSchema
  } from '$lib/utils/schema';

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
  <title>Contact Techyor — Start a Project or Ask a Question</title>
  <meta
    name="description"
    content="Got a project in mind? Send us a message — no lengthy brief required. We reply within 24 hours. Email info@techyor.com or call +91 9915002625."
  />

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
</svelte:head>

<div class="overflow-hidden">
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

  <div class="container mx-auto px-container py-12 lg:py-20">
    <RandomizedHoverableGallery cards={galleryCards} />
  </div>
</div>
