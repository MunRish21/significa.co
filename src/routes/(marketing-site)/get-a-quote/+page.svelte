<script lang="ts">
  import ContactForm from '$components/contact-form.svelte';
  import Slideshow from '$components/blocks/slideshow.svelte';
  import Steps from '$components/blocks/steps.svelte';
  import FaqsList from '$components/blocks/faqs-list.svelte';
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
    steps_subtitle: 'Ready to build something great?',
    steps: [
      { title: 'Tell us about your project.', description: "Drop us a message with what you're building, what problem you're solving, and what you're looking for." },
      { title: "We'll get back within 24 hours.", description: "A real person on our team reads every inquiry and responds fast. We'll ask a few smart questions to understand your goals better." },
      { title: 'Discovery call & proposal.', description: "We jump on a quick call, understand the full scope, and send you a clear proposal — timeline, deliverables, and pricing. No surprises." },
      { title: 'We get to work.', description: "Once aligned, we kick off immediately. You'll have a dedicated team, regular updates, and full transparency throughout the project." }
    ]
  };

</script>

<svelte:head>
  <title>Get a Quote — Techyor</title>
  <meta name="description" content="Tell us what you're building. We'll get back within 24 hours with a clear proposal — timeline, deliverables, and pricing. No surprises." />
</svelte:head>

<div class="overflow-hidden">
  <!-- Form Section -->
  <section class="container relative mx-auto mt-10 gap-8 overflow-hidden px-container pb-12 md:mt-14 md:pb-20 lg:mt-20 lg:flex lg:justify-between lg:pb-32">
    <div class="flex-1">
      <h1 class="text-5xl font-medium md:text-6xl lg:text-7xl">
        Get a quote.
      </h1>
      <p class="mt-4 text-lg text-foreground-secondary">
        It all starts here.
      </p>
      <div class="mt-8">
        <p class="mb-2 text-foreground-secondary">Prefer email?</p>
        <a href="mailto:info@techyor.com" class="font-medium hover:underline">
          info@techyor.com
        </a>
      </div>
    </div>

    <div class="flex-1 lg:max-w-xl">
      <ContactForm variant="quote" disclaimer="We respect your privacy and will handle your information securely." />
    </div>
  </section>

  <!-- What's Next Section -->
  <Steps block={stepsBlock} />

  <!-- Work Section -->
  <Slideshow block={slideshowBlock} />

  <!-- FAQ Section -->
  <FaqsList block={commonFaqsBlock} />
</div>
