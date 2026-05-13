<script lang="ts">
  import ContactForm from '$components/contact-form.svelte';
  import Slideshow from '$components/blocks/slideshow.svelte';
  import Steps from '$components/blocks/steps.svelte';
  import FaqsList from '$components/blocks/faqs-list.svelte';
  import TeamSection from '$components/sections/team-section.svelte';
  import { commonFaqsBlock } from '$lib/data/faqs';

  const slideshowBlock = {
    component: 'slideshow',
    images: [
      {
        filename: '/assets/storyblok/pn_timeline.png',
        alt: 'Passaporte Natura 2000 screens'
      },
      {
        filename: '/assets/storyblok/tagg-mockup-shot.jpg',
        alt: 'Tagg mockup'
      },
      {
        filename: '/assets/storyblok/zoko-thumb-02.jpg',
        alt: 'Zoko panels'
      },
      {
        filename: '/assets/storyblok/get-a-quote-curationist.png',
        alt: 'Curationist Homepage'
      },
      {
        filename: '/assets/storyblok/dia2-timeline.png',
        alt: 'Dia screens'
      }
    ]
  };

  const stepsBlock = {
    component: 'steps',
    steps_title: 'What happens next.',
    steps_subtitle: 'The process.',
    steps: [
      {
        title: 'Tell us about your project.',
        description:
          "Message us: what you're building, the problem it solves, and what you need."
      },
      {
        title: "We reply within 24 hours.",
        description:
          "A real person reads your message and responds. We'll ask questions to understand your goals."
      },
      {
        title: 'Discovery call & proposal.',
        description:
          'We talk scope. You get a written proposal with timeline, deliverables, and price. No hidden costs.'
      },
      {
        title: 'We start.',
        description:
          "We move fast. You get daily updates and full visibility into the work from day one."
      }
    ]
  };
</script>

<svelte:head>
  <title>Get a Quote — Techyor</title>
  <meta
    name="description"
    content="Tell us what you're building. We reply within 24 hours with a clear proposal — timeline, deliverables, and pricing. No surprises, no lock-in."
  />

  <meta property="og:type" content="website" />
  <meta property="og:title" content="Get a Quote — Techyor" />
  <meta
    property="og:description"
    content="Tell us what you're building. We reply within 24 hours with a clear proposal."
  />
  <meta property="og:image" content="https://www.techyor.com/og.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Get a quote — Techyor" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@TechyorDotCo" />
  <meta name="twitter:title" content="Get a Quote — Techyor" />
  <meta
    name="twitter:description"
    content="Tell us what you're building. We reply within 24 hours with a clear proposal."
  />
  <meta name="twitter:image" content="https://www.techyor.com/og.png" />
</svelte:head>

<div class="overflow-hidden">
  <!-- Form Section -->
  <section
    class="container relative mx-auto mt-10 gap-8 overflow-hidden px-container pb-12 md:mt-14 md:pb-20 lg:mt-20 lg:flex lg:justify-between lg:pb-32"
  >
    <div class="flex-1">
      <h1 class="text-5xl font-medium md:text-6xl lg:text-7xl">Get a quote.</h1>
      <p class="mt-4 text-lg text-foreground-secondary">Let's talk about your project.</p>
      <div class="mt-8">
        <p class="mb-2 text-foreground-secondary">Prefer email?</p>
        <a href="mailto:info@techyor.com" class="font-medium hover:underline"> info@techyor.com </a>
      </div>
    </div>

    <div class="flex-1 lg:max-w-xl">
      <ContactForm
        variant="quote"
        disclaimer="We respect your privacy and will handle your information securely."
      />
    </div>
  </section>

  <!-- What's Next Section -->
  <Steps block={stepsBlock} />

  <!-- Team Section -->
  <TeamSection
    title="You'll work with these specialists."
    subtitle="The people who'll build it."
  />

  <!-- Work Section -->
  <Slideshow block={slideshowBlock} />

  <!-- FAQ Section -->
  <FaqsList block={commonFaqsBlock} />
</div>
