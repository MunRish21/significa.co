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
        filename: 'https://a.storyblok.com/f/198185/480x642/a9691bbea9/contact1.png',
        alt: 'Contact image 1'
      }
    },
    {
      component: 'photo_card' as const,
      photo: {
        filename: 'https://a.storyblok.com/f/198185/480x642/94604269c6/contact2.png',
        alt: 'Contact image 2'
      }
    },
    {
      component: 'notepad_card' as const,
      text: 'Rua da Torrinha 154\n4050–609 Porto, Portugal\n(+351) 226 001 751'
    },
    {
      component: 'photo_card' as const,
      photo: {
        filename: 'https://a.storyblok.com/f/198185/480x643/2ae0447d30/contact3.png',
        alt: 'Contact image 3'
      }
    },
    {
      component: 'photo_card' as const,
      photo: {
        filename: 'https://a.storyblok.com/f/198185/481x642/9e41380f2d/contact4.png',
        alt: 'Contact image 4'
      }
    },
    {
      component: 'photo_card' as const,
      photo: {
        filename: 'https://a.storyblok.com/f/198185/480x642/3b1da65bf4/contact5.png',
        alt: 'Contact image 5'
      }
    }
  ];
</script>

<svelte:head>
  <title>Contact Us</title>
  <meta name="description" content="Get in touch with us" />
</svelte:head>

<div class="overflow-hidden">
  <div class="container relative mx-auto px-container">
    <section class="pb-5 pt-10 lg:pb-12 lg:pt-20 lg:text-center">
      <h1 class="mx-auto text-7xl text-foreground-secondary lg:max-w-xl">
        Get in
      </h1>
      <span class="mx-auto text-7xl lg:max-w-xl">Touch</span>
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
