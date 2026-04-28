<script lang="ts">
  import CultureSection from '$components/blocks/culture-section.svelte';
  import OpenPositions from '$components/blocks/open-positions.svelte';
  import ImageSlider from '$components/blocks/image-slider.svelte';
  import BenefitsSection from '$components/blocks/benefits-section.svelte';
  import RandomizedHoverableGallery from '$components/randomized-hoverable-gallery.svelte';
  import type { OpenPositionsStoryblok } from '$types/bloks';

  const openPositionsBlock: OpenPositionsStoryblok = {
    component: 'open-positions',
    open_positions_title: 'Open positions.',
    open_positions_description: "There's one."
  };

  const benefits = [
    {
      title: 'Welcome pack.',
      description: 'Welcome aboard! To get you started, we\'ll have you looking the part with Significa hoodie and other bits and bobs.',
      icon: '/assets/storyblok/xxs_backpack.webp'
    },
    {
      title: 'Flexible hours and location.',
      description: 'We are an office-first team, but you have freedom to come and go as you wish.',
      icon: '/assets/storyblok/xxs_watch.webp'
    },
    {
      title: 'Unlimited learning stipend.',
      description: 'We encourage personal growth and will cover the costs of any course or learning opportunities you desire.',
      icon: '/assets/storyblok/xxs_learning.webp'
    },
    {
      title: 'All the equipment you need.',
      description: 'Anything and everything you need to excel in your life at Significa.',
      icon: '/assets/storyblok/xxs_laptop.webp'
    },
    {
      title: 'Career plan and growth opportunities.',
      description: 'We\'ll work with you closely to help you reach your growth goals through one-on-ones, group workshops and OKRs.',
      icon: '/assets/storyblok/xxs_growth.webp'
    },
    {
      title: 'Annual company retreat.',
      description: 'Leave your Macbook at home, this annual 3-night retreat is purely about relaxation and enjoying each other\'s company.',
      icon: '/assets/storyblok/xxs_retreat.webp'
    },
    {
      title: 'Health insurance.',
      description: 'Health always comes first, you shouldn\'t ever need to worry about it for you or your kids.',
      icon: '/assets/storyblok/xxs_health.webp'
    },
    {
      title: 'Public transport subsidy.',
      description: 'We encourage green travel, that\'s why we are proud to reimburse you on your public transport costs.',
      icon: '/assets/storyblok/xxs_bus.webp'
    },
    {
      title: 'Corporate Social Responsibility.',
      description: 'We\'re a proud 1% for the Planet member, meaning your work benefits beyond Significa.',
      icon: '/assets/storyblok/xxs_heart.webp'
    },
    {
      title: 'Gym membership.',
      description: 'Healthy body, healthy mind. With a gym across the street from our office, you can make the most of every office day to keep fit and healthy.',
      icon: '/assets/storyblok/xxs_gym.webp'
    },
    {
      title: '25 vacation days.',
      description: 'That all-important R&R. Your 22 days of choice plus 3 days extra (your birthday, 24 and 31 of December). Our birthday gift to you is time for you.',
      icon: '/assets/storyblok/xxs_calendar.webp'
    },
    {
      title: 'Baby kit.',
      description: 'If you have a new arrival joining your family, congratulations! We\'ll help you out with a baby box full of goodies to help welcome your little one to the world.',
      icon: '/assets/storyblok/xxs_baby.webp'
    },
    {
      title: 'Referral bonus programme.',
      description: 'Refer a buddy to Significa and if they are hired, you\'ll receive an immediate bonus of 1000€. If you\'re both here one year later, you\'ll get a further 1000€.',
      icon: '/assets/storyblok/xxs_referral.webp'
    },
    {
      title: '1 extra vacation day per year at Significa.',
      description: 'From your second year onwards, you\'ll get an extra vacation day per annum. Downtime is important. Enjoy more and more time for yourself and your family, up to a maximum of 30 days per year.',
      icon: '/assets/storyblok/xxs_sun.webp'
    },
    {
      title: 'Period leave.',
      description: 'All women at Significa are entitled to 1 day per month for period leave. If you feel unwell, rest up.',
      icon: '/assets/storyblok/xxs_period-leave.webp'
    },
    {
      title: 'Support structures.',
      description: 'We\'ve partnered with an organisation to offer 24/7 support to you and your family regarding anything and everything you may need, from legal, fiscal, nutrition and mental health.',
      icon: '/assets/storyblok/xxs_support.webp'
    }
  ];

  const careerImages = [
    {
      src: '/assets/storyblok/careers1.png',
      alt: 'Career image 1',
      width: 1320,
      height: 826
    },
    {
      src: '/assets/storyblok/careers2.png',
      alt: 'Career image 2',
      width: 1320,
      height: 826
    },
    {
      src: '/assets/storyblok/careers3.png',
      alt: 'Career image 3',
      width: 1320,
      height: 826
    },
    {
      src: '/assets/storyblok/careers4.png',
      alt: 'Career image 4',
      width: 1320,
      height: 826
    },
    {
      src: '/assets/storyblok/careers5.png',
      alt: 'Career image 5',
      width: 1320,
      height: 826
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
  <title>Careers - Techyor</title>
  <meta name="description" content="Join our team. We're looking for talented designers and developers." />
</svelte:head>

<main>
  <!-- Hero Section -->
  <section class="container mx-auto px-container pb-16 md:pb-20 lg:pb-24">
    <h1 class="mt-10 text-7xl font-bold md:mt-14 lg:mt-20">Careers.</h1>
    <p class="mt-4 max-w-3xl text-2xl text-foreground-secondary md:mt-6 lg:mt-8">
      Join a team of creatives and builders who are passionate about crafting exceptional digital products.
    </p>
  </section>

  <!-- Culture Section -->
  <CultureSection />

  <!-- Open Positions Component -->
  <OpenPositions block={openPositionsBlock} />

  <!-- Image Slider Section -->
  <ImageSlider images={careerImages} />

  <!-- Benefits Section -->
  <BenefitsSection {benefits} />

  <!-- Office Gallery Section -->
  <section class="container mx-auto px-container py-12 lg:py-20">
    <RandomizedHoverableGallery cards={galleryCards} />
  </section>
</main>
