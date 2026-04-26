<script lang="ts">
  import Physics from '$components/blocks/physics.svelte';
  import CoreValues from '$components/blocks/core-values.svelte';
  import FaqsList from '$components/blocks/faqs-list.svelte';
  import Clients from '$components/blocks/clients.svelte';
  import OfficeCards from '$components/blocks/office-cards.svelte';
  import { commonFaqsBlock } from '$lib/data/faqs';

  const physicsBlock = {
    component: 'physics',
    variant: 'hero',
    hero_title: 'About us.',
    physics_blocks: [
      {
        _uid: '1',
        component: 'physics-balloon-card',
        theme: 'yellow',
        text: 'What is the meaning of Techyor?'
      },
      {
        _uid: '2',
        component: 'physics-sticker',
        photo: {
          filename: 'https://a.storyblok.com/f/198185/271x352/1a58bf0e7e/physics-sereno.png',
          alt: 'Sereno illustration'
        }
      },
      {
        _uid: '3',
        component: 'physics-rectangle-card',
        theme: 'dark',
        text: 'What is meant by innovation, design thinking, and purposeful development.'
      },
      {
        _uid: '4',
        component: 'physics-sticker',
        photo: {
          filename: 'https://a.storyblok.com/f/198185/289x352/1b519cc752/physics-manel.png',
          alt: 'Manel illustration'
        }
      },
      {
        _uid: '5',
        component: 'physics-sticker',
        photo: {
          filename: 'https://a.storyblok.com/f/198185/340x350/90ad6097b6/physics-design.png',
          alt: 'Design illustration'
        }
      },
      {
        _uid: '6',
        component: 'physics-input',
        placeholder: 'Type something...'
      },
      {
        _uid: '7',
        component: 'physics-balloon-card',
        theme: 'yellow',
        text: 'Click around.'
      },
      {
        _uid: '8',
        component: 'physics-sticker',
        photo: {
          filename: 'https://a.storyblok.com/f/198185/400x316/fd675bb564/physics-development.png',
          alt: 'Development illustration'
        }
      },
      {
        _uid: '9',
        component: 'physics-rectangle-card',
        theme: 'dark',
        text: 'Toss me.'
      },
      {
        _uid: '10',
        component: 'physics-balloon-card',
        theme: 'yellow',
        text: 'Eggcellent!'
      },
      {
        _uid: '11',
        component: 'physics-sticker',
        photo: {
          filename: 'https://a.storyblok.com/f/198185/400x400/463c1ffd8a/physics-hatch.png',
          alt: 'Hatch illustration'
        }
      }
    ]
  };

  const coreValuesBlock = {
    component: 'core-values',
    values_title1: 'Core values.',
    values_title2: 'Expressed in everything.',
    values_description: '',
    values: [
      {
        title: 'Empathy and compassion.',
        description: 'We recognise we are all human and that, as such, we are all different. We embrace difference.'
      },
      {
        title: 'Teamwork.',
        description: 'Go further together with curiosity and empathy, always.'
      },
      {
        title: 'Playfulness.',
        description: 'We are witty by nature. We have fun at work while being extremely professional in what we do.'
      },
      {
        title: 'Integrity.',
        description: 'We foster an environment where reliability and ethical principles are not just appreciated.'
      },
      {
        title: 'Ambition.',
        description: 'We aspire higher. We push ourselves to be better. We push others to be better.'
      }
    ]
  };

  const officeCardsBlock = {
    component: 'office-cards',
    office_title1: 'Office.',
    office_title2: 'Drop by for some eggs. At anytime.',
    office_description: 'Our office is not just a physical space. It is so much more than that – it is what builds our connectedness. A space where we can bounce ideas off each other, support colleagues, catch up on the weekend\'s activities or play marralhinha at lunch. This sense of togetherness is born and nurtured out of our shared space, the office.',
    office_cards: [
      {
        component: 'photo_card' as const,
        photo: {
          filename: 'https://a.storyblok.com/f/198185/481x643/a07f2ad743/office3.png',
          alt: 'Office image 1'
        }
      },
      {
        component: 'photo_card' as const,
        photo: {
          filename: 'https://a.storyblok.com/f/198185/481x643/3e966cb641/office5.png',
          alt: 'Office image 2'
        }
      },
      {
        component: 'notepad_card' as const,
        text: 'Rua da Torrinha 154\n4050–609 Porto, Portugal\n(+351) 226 001 751'
      },
      {
        component: 'photo_card' as const,
        photo: {
          filename: 'https://a.storyblok.com/f/198185/481x643/121b51a6eb/office4.png',
          alt: 'Office image 3'
        }
      },
      {
        component: 'photo_card' as const,
        photo: {
          filename: 'https://a.storyblok.com/f/198185/481x643/6696f35186/office1.png',
          alt: 'Office image 4'
        }
      },
      {
        component: 'photo_card' as const,
        photo: {
          filename: 'https://a.storyblok.com/f/198185/481x643/3ca27b4f9b/office2.png',
          alt: 'Office image 5'
        }
      }
    ]
  };

  const clientsBlock = {
    component: 'clients',
    clients_title: 'Clients we\'ve worked with',
    clients: [
      {
        light_mode: {
          filename: 'https://a.storyblok.com/f/198185/326x84/fafe7547ba/light-fcp-final.png',
          alt: ''
        },
        dark_mode: {
          filename: 'https://a.storyblok.com/f/198185/326x84/3a6318eff4/dark-fcp-final.png',
          alt: ''
        }
      },
      {
        light_mode: {
          filename: 'https://a.storyblok.com/f/198185/2976x520/60a2856d4d/backercamp-light.png',
          alt: 'Backercamp Logo'
        },
        dark_mode: {
          filename: 'https://a.storyblok.com/f/198185/2976x520/e5f43f5d10/backercamp-dark.png',
          alt: 'Backercamp Logo'
        }
      },
      {
        light_mode: {
          filename: 'https://a.storyblok.com/f/198185/928x520/efbbe25cf4/allo-light.png',
          alt: 'allO Logo'
        },
        dark_mode: {
          filename: 'https://a.storyblok.com/f/198185/928x520/a63160331b/allo-dark.png',
          alt: 'allO Logo'
        }
      },
      {
        light_mode: {
          filename: 'https://a.storyblok.com/f/198185/1980x520/c27ec6fd0d/heyharper-light.png',
          alt: ''
        },
        dark_mode: {
          filename: 'https://a.storyblok.com/f/198185/1980x520/eadca83872/heyharper-dark.png',
          alt: ''
        }
      },
      {
        light_mode: {
          filename: 'https://a.storyblok.com/f/198185/1055x282/e097310607/mishmash_lightmode.png',
          alt: ''
        },
        dark_mode: {
          filename: 'https://a.storyblok.com/f/198185/1054x281/44144e3c56/mishmash_darkmode.png',
          alt: ''
        }
      }
    ]
  };

</script>

<svelte:head>
  <title>About Techyor</title>
  <meta name="description" content="Learn about Techyor - our mission, values, and team." />
</svelte:head>

<div class="overflow-hidden">
  <!-- Physics Hero Section -->
  <Physics block={physicsBlock} />

  <!-- Who We Are Section -->
  <section class="border-t">
    <div class="container mx-auto flex flex-col justify-between gap-6 px-container py-8 lg:flex-row lg:gap-4 lg:py-12">
      <div class="lg:max-w-xl">
        <h2 class="text-5xl text-foreground-secondary">Who we are.</h2>
        <p class="text-5xl">An exquisite omelette.</p>
      </div>
      <p class="whitespace-pre-line text-2xl text-foreground-secondary lg:max-w-xl">We are not pixel pushers or code monkeys. We let our creativity lead the way, but we know where we're headed, and there's a purpose to everything we do. We're just a bunch of talented, creative people aspiring to do incredible things together and have some fun along the way.</p>
    </div>
  </section>

  <!-- Core Values Section -->
  <CoreValues block={coreValuesBlock} />

  <!-- Clients Section -->
  <Clients block={clientsBlock} />

  <!-- FAQ Section -->
  <FaqsList block={commonFaqsBlock} />

  <!-- Office Section -->
  <OfficeCards block={officeCardsBlock} />
</div>
