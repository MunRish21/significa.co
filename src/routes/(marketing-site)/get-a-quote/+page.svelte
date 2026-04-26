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
        filename: 'https://a.storyblok.com/f/198185/528x296/326459166f/pn_timeline.png',
        alt: 'Passaporte Natura 2000 screens'
      },
      {
        filename: 'https://a.storyblok.com/f/198185/6000x4000/0184c60246/tagg-mockup-shot.jpg',
        alt: 'Tagg mockup'
      },
      {
        filename: 'https://a.storyblok.com/f/198185/3840x2880/746c872a60/zoko-thumb-02.jpg',
        alt: 'Zoko panels'
      },
      {
        filename: 'https://a.storyblok.com/f/198185/1638x1023/446240b59f/get-a-quote-curationist.png',
        alt: 'Curationist Homepage'
      },
      {
        filename: 'https://a.storyblok.com/f/198185/528x296/51e01a0ab6/dia2-timeline.png',
        alt: 'Dia screens'
      }
    ]
  };

  const stepsBlock = {
    component: 'steps',
    steps_title: "What's next.",
    steps_subtitle: 'Fourth base on a first date?',
    steps: [
      { title: 'Send us a message.', description: 'This is like our first date, and we appreciate you are taking the first step.' },
      { title: 'We will get back to you soon.', description: 'We have a few elves helping out with correspondence, so we usually respond to inquiries very fast. Unless, you know, the elves are busy.' },
      { title: 'Meet and proposal.', description: 'We meet. We scope. We issue a proposal. We negotiate. We discuss. We agree. We get started. Simple as that!' },
      { title: "Let's collaborate!", description: '"I think this is the beginning of a beautiful friendship". We, too, believe the best is yet to come.' }
    ]
  };

</script>

<svelte:head>
  <title>Get a Quote</title>
  <meta name="description" content="Get a quote from Significa. It all starts here." />
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
        <p class="text-foreground-secondary mb-2">Prefer email?</p>
        <a href="mailto:newbusiness@significa.co" class="font-medium hover:underline">
          newbusiness@significa.co
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
