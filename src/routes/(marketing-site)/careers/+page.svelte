<script lang="ts">
  import CultureSection from '$components/blocks/culture-section.svelte';
  import OpenPositions from '$components/blocks/open-positions.svelte';
  import ImageSlider from '$components/blocks/image-slider.svelte';
  import BenefitsSection from '$components/blocks/benefits-section.svelte';
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
      icon: 'https://a.storyblok.com/f/198185/96x101/8519670a4e/xxs_backpack.webp/m/0x0/'
    },
    {
      title: 'Flexible hours and location.',
      description: 'We are an office-first team, but you have freedom to come and go as you wish.',
      icon: 'https://a.storyblok.com/f/198185/98x106/420108ad73/xxs_watch.webp/m/0x0/'
    },
    {
      title: 'Unlimited learning stipend.',
      description: 'We encourage personal growth and will cover the costs of any course or learning opportunities you desire.',
      icon: 'https://a.storyblok.com/f/198185/100x98/a557c8de95/xxs_learning.webp/m/0x0/'
    },
    {
      title: 'All the equipment you need.',
      description: 'Anything and everything you need to excel in your life at Significa.',
      icon: 'https://a.storyblok.com/f/198185/106x97/46950a6655/xxs_laptop.webp/m/0x0/'
    },
    {
      title: 'Career plan and growth opportunities.',
      description: 'We\'ll work with you closely to help you reach your growth goals through one-on-ones, group workshops and OKRs.',
      icon: 'https://a.storyblok.com/f/198185/100x100/6a09b2f287/xxs_growth.webp/m/0x0/'
    },
    {
      title: 'Annual company retreat.',
      description: 'Leave your Macbook at home, this annual 3-night retreat is purely about relaxation and enjoying each other\'s company.',
      icon: 'https://a.storyblok.com/f/198185/96x97/5987ebb2d6/xxs_retreat.webp/m/0x0/'
    },
    {
      title: 'Health insurance.',
      description: 'Health always comes first, you shouldn\'t ever need to worry about it for you or your kids.',
      icon: 'https://a.storyblok.com/f/198185/96x97/3716011145/xxs_health.webp/m/0x0/'
    },
    {
      title: 'Public transport subsidy.',
      description: 'We encourage green travel, that\'s why we are proud to reimburse you on your public transport costs.',
      icon: 'https://a.storyblok.com/f/198185/96x97/78b175d3da/xxs_bus.webp/m/0x0/'
    },
    {
      title: 'Corporate Social Responsibility.',
      description: 'We\'re a proud 1% for the Planet member, meaning your work benefits beyond Significa.',
      icon: 'https://a.storyblok.com/f/198185/96x97/a06914dd27/xxs_heart.webp/m/0x0/'
    },
    {
      title: 'Gym membership.',
      description: 'Healthy body, healthy mind. With a gym across the street from our office, you can make the most of every office day to keep fit and healthy.',
      icon: 'https://a.storyblok.com/f/198185/100x97/dcdce4dfe8/xxs_gym.webp/m/0x0/'
    },
    {
      title: '25 vacation days.',
      description: 'That all-important R&R. Your 22 days of choice plus 3 days extra (your birthday, 24 and 31 of December). Our birthday gift to you is time for you.',
      icon: 'https://a.storyblok.com/f/198185/96x101/0b06b534f8/xxs_calendar.webp/m/0x0/'
    },
    {
      title: 'Baby kit.',
      description: 'If you have a new arrival joining your family, congratulations! We\'ll help you out with a baby box full of goodies to help welcome your little one to the world.',
      icon: 'https://a.storyblok.com/f/198185/96x101/079ce6e0fc/xxs_baby.webp/m/0x0/'
    },
    {
      title: 'Referral bonus programme.',
      description: 'Refer a buddy to Significa and if they are hired, you\'ll receive an immediate bonus of 1000€. If you\'re both here one year later, you\'ll get a further 1000€.',
      icon: 'https://a.storyblok.com/f/198185/109x107/20d1fa2bac/xxs_referral.webp/m/0x0/'
    },
    {
      title: '1 extra vacation day per year at Significa.',
      description: 'From your second year onwards, you\'ll get an extra vacation day per annum. Downtime is important. Enjoy more and more time for yourself and your family, up to a maximum of 30 days per year.',
      icon: 'https://a.storyblok.com/f/198185/108x109/ea69ad64cb/xxs_sun.webp/m/0x0/'
    },
    {
      title: 'Period leave.',
      description: 'All women at Significa are entitled to 1 day per month for period leave. If you feel unwell, rest up.',
      icon: 'https://a.storyblok.com/f/198185/96x97/1c6f4b1998/xxs_period-leave.webp/m/0x0/'
    },
    {
      title: 'Support structures.',
      description: 'We\'ve partnered with an organisation to offer 24/7 support to you and your family regarding anything and everything you may need, from legal, fiscal, nutrition and mental health.',
      icon: 'https://a.storyblok.com/f/198185/96x101/5dd555e235/xxs_support.webp/m/0x0/'
    }
  ];

  const careerImages = [
    {
      src: 'https://a.storyblok.com/f/198185/1320x826/007e0c66f1/careers1.png/m/0x0/',
      alt: 'Career image 1',
      width: 1320,
      height: 826
    },
    {
      src: 'https://a.storyblok.com/f/198185/1320x826/222139dce5/careers2.png/m/0x0/',
      alt: 'Career image 2',
      width: 1320,
      height: 826
    },
    {
      src: 'https://a.storyblok.com/f/198185/1320x826/dd8a858097/careers3.png/m/0x0/',
      alt: 'Career image 3',
      width: 1320,
      height: 826
    },
    {
      src: 'https://a.storyblok.com/f/198185/1320x826/7baf9a530a/careers4.png/m/0x0/',
      alt: 'Career image 4',
      width: 1320,
      height: 826
    },
    {
      src: 'https://a.storyblok.com/f/198185/1320x826/6aab800005/careers5.png/m/0x0/',
      alt: 'Career image 5',
      width: 1320,
      height: 826
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
</main>
