<script lang="ts">
  import CultureSection from '$components/blocks/culture-section.svelte';
  import OpenPositions from '$components/blocks/open-positions.svelte';
  import ImageSlider from '$components/blocks/image-slider.svelte';
  import BenefitsSection from '$components/blocks/benefits-section.svelte';
  import RandomizedHoverableGallery from '$components/randomized-hoverable-gallery.svelte';
  import type { OpenPositionsStoryblok } from '$types/bloks';
  import {
    BASE_URL,
    generateOrganizationSchema,
    generateBreadcrumbSchema,
    generateJobPostingSchema
  } from '$lib/utils/schema';

  const openPositionsBlock: OpenPositionsStoryblok = {
    component: 'open-positions',
    open_positions_title: 'Open positions.',
    open_positions_description: 'One spot. Big opportunity.'
  };

  const benefits = [
    {
      title: 'Flexible hours.',
      description:
        'Work the hours that suit your life. We trust you to manage your time and get the job done.',
      icon: '/assets/storyblok/xxs_watch.webp'
    },
    {
      title: 'Holiday leaves.',
      description:
        'Take time off for the holidays you love. Our calendar follows the standard Indian holidays.',
      icon: '/assets/storyblok/xxs_calendar.webp'
    },
    {
      title: 'A day a month, for you.',
      description:
        'Take a personal day each month, no questions asked. Rest, recharge, do whatever you need.',
      icon: '/assets/storyblok/xxs_sun.webp'
    },
    {
      title: 'A relaxed pace.',
      description:
        'No surprise late nights or weekend grind. We focus on steady, thoughtful work over hustle.',
      icon: '/assets/storyblok/xxs_heart.webp'
    },
    {
      title: 'Room to grow.',
      description:
        'We back the things that help you level up, with mentoring and time to learn on the job.',
      icon: '/assets/storyblok/xxs_growth.webp'
    },
    {
      title: 'Welcome pack.',
      description: 'Some Techyor goodies to make you feel at home from day one.',
      icon: '/assets/storyblok/xxs_backpack.webp'
    }
  ];

  const sliderImages = benefits.map((b) => ({
    src: b.icon,
    alt: `${b.title} icon`,
    width: 120,
    height: 120
  }));

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
  <title>Careers at Techyor — Design, Engineering & Marketing Roles</title>
  <meta
    name="description"
    content="Join Techyor in Chandigarh, India. We're hiring designers, engineers, and marketers — remote-friendly, full-time. Help us ship digital products for teams in the US, UK, Switzerland, and Australia."
  />
  <meta
    name="keywords"
    content="careers Chandigarh, jobs at Techyor, design jobs India, full stack developer jobs, digital agency careers, remote jobs India"
  />

  <meta property="og:type" content="website" />
  <meta property="og:title" content="Careers at Techyor — Join Our Team" />
  <meta
    property="og:description"
    content="Open roles in design, engineering, and marketing. Remote-friendly, full-time. Build digital products for global clients."
  />
  <meta property="og:image" content="{BASE_URL}/api/og/careers" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Careers at Techyor — open roles" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@TechyorDotCo" />
  <meta name="twitter:title" content="Careers at Techyor — Join Our Team" />
  <meta
    name="twitter:description"
    content="Open roles in design, engineering, and marketing. Remote-friendly, full-time."
  />
  <meta name="twitter:image" content="{BASE_URL}/api/og/careers" />
  <meta name="twitter:image:alt" content="Careers at Techyor — open roles" />

  {@html `<${'script'} type="application/ld+json">${generateOrganizationSchema()}</${'script'}>`}
  {@html `<${'script'} type="application/ld+json">${generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Careers', url: '/careers' }
  ])}</${'script'}>`}
  {@html `<${'script'} type="application/ld+json">${generateJobPostingSchema('Digital Product Designer', 'Join Techyor as a Digital Product Designer. Build beautiful and functional digital products.')}</${'script'}>`}
  {@html `<${'script'} type="application/ld+json">${generateJobPostingSchema('Full Stack Developer', 'Join Techyor as a Full Stack Developer. Work on cutting-edge web and mobile applications.')}</${'script'}>`}
</svelte:head>

<main class="overflow-hidden">
  <!-- Hero Section -->
  <section class="container mx-auto px-container pb-16 md:pb-20 lg:pb-24">
    <h1 class="mt-10 text-7xl font-bold md:mt-14 lg:mt-20">Careers.</h1>
    <p
      data-speakable
      class="mt-4 max-w-3xl text-2xl text-foreground-secondary md:mt-6 lg:mt-8"
    >
      Join a team of creatives, strategists, and builders shipping digital products for clients
      across the US, UK, Switzerland, and Australia. Based in Chandigarh, India — remote-friendly,
      full-time, and built for people who care about their craft.
    </p>
  </section>

  <!-- Culture Section -->
  <CultureSection />

  <!-- Open Positions Component -->
  <OpenPositions block={openPositionsBlock} />

  <!-- Image Slider Section -->
  <ImageSlider images={sliderImages} />

  <!-- Benefits Section -->
  <BenefitsSection {benefits} />

  <!-- Office Gallery Section -->
  <section class="container mx-auto px-container py-12 lg:py-20">
    <RandomizedHoverableGallery cards={galleryCards} />
  </section>
</main>
