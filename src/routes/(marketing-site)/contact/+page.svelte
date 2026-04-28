<script lang="ts">
  import ContactForm from '$components/contact-form.svelte';
  import Segg1 from '$components/pages/contact/illustrations/segg1.svelte';
  import Segg2 from '$components/pages/contact/illustrations/segg2.svelte';
  import PanWithEggs from '$components/pages/contact/pan-with-eggs.svelte';
  import HoverableGallery from '$components/hoverable-gallery.svelte';

  const galleryCards = [
    {
      component: 'photo_card' as const,
      photo: {
        filename: '/assets/storyblok/contact1.png',
        alt: 'Contact image 1'
      }
    },
    {
      component: 'photo_card' as const,
      photo: {
        filename: '/assets/storyblok/contact2.png',
        alt: 'Contact image 2'
      }
    },
    {
      component: 'notepad_card' as const,
      text: 'Chandigarh, India\ninfo@techyor.com\n+91 9915002625'
    },
    {
      component: 'photo_card' as const,
      photo: {
        filename: '/assets/storyblok/contact3.png',
        alt: 'Contact image 3'
      }
    },
    {
      component: 'photo_card' as const,
      photo: {
        filename: '/assets/storyblok/contact4.png',
        alt: 'Contact image 4'
      }
    },
    {
      component: 'photo_card' as const,
      photo: {
        filename: '/assets/storyblok/contact5.png',
        alt: 'Contact image 5'
      }
    }
  ];
</script>

<svelte:head>
  <title>Contact Us — Techyor</title>
  <meta name="description" content="Got a project in mind? Drop us a message and we'll get back within 24 hours. No lengthy briefs needed — just tell us what you're thinking." />
</svelte:head>

<div class="overflow-hidden">
  <div class="container relative mx-auto px-container">
    <section class="pb-5 pt-10 lg:pb-12 lg:pt-20 lg:text-center">
      <h1 class="mx-auto text-7xl text-foreground-secondary lg:max-w-2xl">
        Contact us.
      </h1>
      <span class="mx-auto block text-7xl lg:max-w-2xl">Tell us what you're building.</span>
      <p class="mx-auto mt-6 max-w-xl text-lg text-foreground-secondary lg:mt-8">
        Got a project in mind? We'd love to hear it. Drop us a message and we'll get back within 24 hours. No lengthy briefs needed — just tell us what you're thinking.
      </p>
    </section>

    <section class="mx-auto lg:max-w-xl lg:pt-5">
      <ContactForm variant="contact" disclaimer="We respect your privacy and will handle your information securely." />
    </section>

    <PanWithEggs class="absolute -left-16 top-4 hidden -rotate-[14deg] drop-shadow-md lg:block" />
    <Segg1 class="absolute -right-16 top-[170px] hidden -rotate-[16deg] drop-shadow-md lg:block" />
    <Segg2 class="absolute -right-20 top-[400px] hidden -rotate-[16deg] drop-shadow-md lg:block" />
  </div>

  <div class="container mx-auto px-container py-12 lg:py-20">
    <HoverableGallery cards={galleryCards} />
  </div>
</div>
