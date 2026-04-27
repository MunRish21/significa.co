<script lang="ts">
  import TimelineServices from '$components/blocks/timeline-services.svelte';
  import Services from '$components/blocks/services.svelte';
  import Clients from '$components/blocks/clients.svelte';
  import List from '$components/blocks/list.svelte';
  import Testimonials from '$components/blocks/testimonials.svelte';
  import ContactForm from '$components/contact-form.svelte';
  import FaqsList from '$components/blocks/faqs-list.svelte';
  import { commonFaqsBlock } from '$lib/data/faqs';

  let visibleAwards = 3;

  const servicesBlock = {
    component: 'services',
    services_title: 'Our services.',
    services_subtitle: 'The full list!',
    services_description: 'Each delivery moves through cycles of strategy, design and development. It is the blend of all these elements that creates interfaces that people will love.',
    services: [
      {
        title: 'Strategy',
        entry: [
          {
            title: 'Discovery',
            list: [
              { label: 'Product auditing' },
              { label: 'Business and data analysis' },
              { label: 'Segmentation and personas' },
              { label: 'User research' }
            ]
          },
          {
            title: 'Product Definition',
            list: [
              { label: 'Product strategy' },
              { label: 'Proof of concept' },
              { label: 'Minimum viable product' },
              { label: 'Growth strategy' },
              { label: 'Conversion rate optimisation' }
            ]
          },
          {
            title: 'Operations',
            list: [
              { label: 'Product management' },
              { label: 'Project management' }
            ]
          }
        ]
      },
      {
        title: 'Design',
        entry: [
          {
            title: 'Interface',
            list: [
              { label: 'User experience strategy' },
              { label: 'User experience design' },
              { label: 'User interface design' },
              { label: 'Design systems' },
              { label: 'User testing' }
            ]
          },
          {
            title: 'Brand',
            list: [
              { label: 'Brand strategy' },
              { label: 'Brand identity' },
              { label: 'Logo design' },
              { label: 'Brand guidelines' }
            ]
          },
          {
            title: 'Multimedia',
            list: [
              { label: 'Illustration' },
              { label: 'Video and motion design' }
            ]
          }
        ]
      },
      {
        title: 'Development',
        entry: [
          {
            title: 'Front-end',
            list: [
              { label: 'React' },
              { label: 'NextJS' },
              { label: 'Svelte' },
              { label: 'React Native' },
              { label: 'Swift' },
              { label: 'Kotlin' }
            ]
          },
          {
            title: 'Back-end',
            list: [
              { label: 'Elixir' },
              { label: 'Python' },
              { label: 'Node' }
            ]
          },
          {
            title: 'DevOps',
            list: [
              { label: 'Hosting and maintenance' },
              { label: 'Infrastructure setup' }
            ]
          }
        ]
      }
    ]
  };

  const deliverablesBlock = {
    component: 'list',
    type: 'deliverables',
    title: 'Deliverables.',
    subtitle: 'Including but not limited to.',
    blocks: [
      {
        deliverable: 'E-commerce',
        description: 'The online shop where you can sell your products.',
        link_title: 'See more',
        link: { url: '/e-commerce' }
      },
      {
        icon: {
          filename: '/assets/storyblok/browser.webp',
          alt: 'Browser icon'
        },
        deliverable: 'Website',
        description: 'Things like your corporate or marketing website.'
      },
      {
        icon: {
          filename: '/assets/storyblok/laptop.webp',
          alt: 'Laptop icon'
        },
        deliverable: 'Desktop App',
        description: 'The apps that run natively on your computer.'
      },
      {
        icon: {
          filename: '/assets/storyblok/web.webp',
          alt: 'Globe icon'
        },
        deliverable: 'Web App',
        description: 'The apps that run in your web browser.'
      },
      {
        icon: {
          filename: '/assets/storyblok/iosapp.webp',
          alt: 'iOS smartphone icon'
        },
        deliverable: 'Mobile App',
        description: 'Apps that run natively on your Android and iOS phones.'
      },
      {
        icon: {
          filename: '/assets/storyblok/cms.webp',
          alt: 'Folder icon'
        },
        deliverable: 'CMS',
        description: 'Content Management System. The system where content gets managed.'
      },
      {
        icon: {
          filename: '/assets/storyblok/watch.webp',
          alt: 'Watch icon'
        },
        deliverable: 'Watch and TV App',
        description: 'Apps that run natively on your watch or your TV.'
      }
    ]
  };

  const certifiedPartnersBlock = {
    _uid: 'certified-partners-1',
    component: 'clients' as const,
    clients_title: 'Certified Partners',
    clients: [
      {
        light_mode: {
          filename: '/assets/storyblok/shopify-mono-black.png',
          alt: 'Shopify'
        },
        dark_mode: {
          filename: '/assets/storyblok/shopify-mono-white.png',
          alt: 'Shopify'
        }
      },
      {
        light_mode: {
          filename: '/assets/storyblok/sb_lighttheme.png',
          alt: 'Storyblok'
        },
        dark_mode: {
          filename: '/assets/storyblok/sb_darktheme.png',
          alt: 'Storyblok'
        }
      }
    ]
  };

  const prouldClientsBlock = {
    _uid: 'proud-clients-1',
    component: 'clients' as const,
    clients_title: 'Proud to have worked with',
    clients: [
      {
        light_mode: {
          filename: '/assets/storyblok/light-fcp-final.png',
          alt: 'FCP'
        },
        dark_mode: {
          filename: '/assets/storyblok/dark-fcp-final.png',
          alt: 'FCP'
        }
      },
      {
        light_mode: {
          filename: '/assets/storyblok/emma-light.png',
          alt: 'Emma Logo'
        },
        dark_mode: {
          filename: '/assets/storyblok/emma-dark.png',
          alt: 'Emma Logo'
        }
      },
      {
        light_mode: {
          filename: '/assets/storyblok/tfp-light.png',
          alt: 'TFP Logo'
        },
        dark_mode: {
          filename: '/assets/storyblok/tfp-dark.png',
          alt: 'TFP Logo'
        }
      },
      {
        light_mode: {
          filename: '/assets/storyblok/heyharper-light.png',
          alt: 'HeyHarper'
        },
        dark_mode: {
          filename: '/assets/storyblok/heyharper-dark.png',
          alt: 'HeyHarper'
        }
      },
      {
        light_mode: {
          filename: '/assets/storyblok/allo-light.png',
          alt: 'allO Logo'
        },
        dark_mode: {
          filename: '/assets/storyblok/allo-dark.png',
          alt: 'allO Logo'
        }
      },
      {
        light_mode: {
          filename: '/assets/storyblok/mishmash_lightmode.png',
          alt: 'mishmash'
        },
        dark_mode: {
          filename: '/assets/storyblok/mishmash_darkmode.png',
          alt: 'mishmash'
        }
      }
    ]
  };

  const timelineServicesBlock = {
    component: 'timeline-services',
    title: 'Custom digital products built to grow with your business.',
    description: 'Strategy-led. Design-driven.',
    timeline: [
      {
        title: 'Strategy',
        subrows: [
          {
            cells: [
              {
                label: 'Discovery',
                left_offset: 0,
                before_light: { filename: '/assets/storyblok/purple1-before-light.svg', alt: 'Purple box' },
                before_dark: { filename: '/assets/storyblok/purple1-before-light.svg', alt: 'Purple box' },
                after_light: { filename: '/assets/storyblok/purple1-after-light.svg', alt: 'Grey box' },
                after_dark: { filename: '/assets/storyblok/purple1-after-light.svg', alt: 'Grey box' }
              },
              {
                label: 'Definition',
                left_offset: 0,
                before_light: { filename: '/assets/storyblok/purple1-before-light.svg', alt: 'Purple box' },
                before_dark: { filename: '/assets/storyblok/purple1-before-light.svg', alt: 'Purple box' },
                after_light: { filename: '/assets/storyblok/purple1-after-light.svg', alt: 'Grey box' },
                after_dark: { filename: '/assets/storyblok/purple1-after-light.svg', alt: 'Grey box' }
              }
            ]
          },
          {
            cells: [
              {
                label: 'UX Research',
                left_offset: 114,
                before_light: { filename: '/assets/storyblok/purple2-before-light.svg', alt: 'Purple box' },
                before_dark: { filename: '/assets/storyblok/purple2-before-light.svg', alt: 'Purple box' },
                after_light: { filename: '/assets/storyblok/purple2-after-light.svg', alt: 'Grey box' },
                after_dark: { filename: '/assets/storyblok/purple2-after-light.svg', alt: 'Grey box' }
              }
            ]
          }
        ]
      },
      {
        title: 'Design',
        subrows: [
          {
            cells: [
              {
                label: 'Wireframes',
                left_offset: 300,
                before_light: { filename: '/assets/storyblok/orange1-before-light.svg', alt: 'Orange box' },
                before_dark: { filename: '/assets/storyblok/orange1-before-light.svg', alt: 'Orange box' },
                after_light: { filename: '/assets/storyblok/orange1-after-light.svg', alt: 'Grey box' },
                after_dark: { filename: '/assets/storyblok/orange1-after-light.svg', alt: 'Grey box' }
              },
              {
                label: 'User Testing',
                left_offset: 0,
                before_light: { filename: '/assets/storyblok/gray1-before-light.svg', alt: 'Dark grey box' },
                before_dark: { filename: '/assets/storyblok/gray1-before-light.svg', alt: 'Dark grey box' },
                after_light: { filename: '/assets/storyblok/gray1-after-light.svg', alt: 'Grey box' },
                after_dark: { filename: '/assets/storyblok/gray1-after-light.svg', alt: 'Grey box' }
              },
              {
                label: 'Look & Feel',
                left_offset: 0,
                before_light: { filename: '/assets/storyblok/orange1-before-light.svg', alt: 'Orange box' },
                before_dark: { filename: '/assets/storyblok/orange1-before-light.svg', alt: 'Orange box' },
                after_light: { filename: '/assets/storyblok/orange1-after-light.svg', alt: 'Grey box' },
                after_dark: { filename: '/assets/storyblok/orange1-after-light.svg', alt: 'Grey box' }
              },
              {
                label: 'Final Design',
                left_offset: 0,
                before_light: { filename: '/assets/storyblok/orange2-before-light.svg', alt: 'Orange box' },
                before_dark: { filename: '/assets/storyblok/orange2-before-light.svg', alt: 'Orange box' },
                after_light: { filename: '/assets/storyblok/orange2-after-light.svg', alt: 'Grey box' },
                after_dark: { filename: '/assets/storyblok/orange2-after-light.svg', alt: 'Grey box' }
              },
              {
                label: 'User Testing',
                left_offset: 0,
                before_light: { filename: '/assets/storyblok/gray1-before-light.svg', alt: 'Dark grey box' },
                before_dark: { filename: '/assets/storyblok/gray1-before-light.svg', alt: 'Dark grey box' },
                after_light: { filename: '/assets/storyblok/gray1-after-light.svg', alt: 'Grey box' },
                after_dark: { filename: '/assets/storyblok/gray1-after-light.svg', alt: 'Grey box' }
              }
            ]
          },
          {
            cells: [
              {
                label: 'Design System',
                left_offset: 835,
                before_light: { filename: '/assets/storyblok/orange1-before-light.svg', alt: 'Orange box' },
                before_dark: { filename: '/assets/storyblok/orange1-before-light.svg', alt: 'Orange box' },
                after_light: { filename: '/assets/storyblok/orange1-after-light.svg', alt: 'Grey box' },
                after_dark: { filename: '/assets/storyblok/orange1-after-light.svg', alt: 'Grey box' }
              }
            ]
          }
        ]
      },
      {
        title: 'Development',
        subrows: [
          {
            cells: [
              {
                label: 'Software Architecture',
                left_offset: 300,
                before_light: { filename: '/assets/storyblok/blue1-before-light.svg', alt: 'Blue box' },
                before_dark: { filename: '/assets/storyblok/blue1-before-light.svg', alt: 'Blue box' },
                after_light: { filename: '/assets/storyblok/blue1-after-light.svg', alt: 'Grey box' },
                after_dark: { filename: '/assets/storyblok/blue1-after-light.svg', alt: 'Grey box' }
              },
              {
                label: 'Development',
                left_offset: 236,
                before_light: { filename: '/assets/storyblok/blue2-before-light.svg', alt: 'Blue box' },
                before_dark: { filename: '/assets/storyblok/blue2-before-light.svg', alt: 'Blue box' },
                after_light: { filename: '/assets/storyblok/blue2-after-light.svg', alt: 'Grey box' },
                after_dark: { filename: '/assets/storyblok/blue2-after-light.svg', alt: 'Grey box' },
                throw_confetti: true,
                decoration_light: { filename: '/assets/storyblok/decorations-dark.svg', alt: '' },
                decoration_dark: { filename: '/assets/storyblok/decorations-dark.svg', alt: '' }
              },
              {
                label: 'Launch',
                left_offset: 0,
                before_light: { filename: '/assets/storyblok/golden-before-light.svg', alt: 'Golden box' },
                before_dark: { filename: '/assets/storyblok/golden-before-light.svg', alt: 'Golden box' },
                after_light: { filename: '/assets/storyblok/golden-after-light.svg', alt: 'Grey box' },
                after_dark: { filename: '/assets/storyblok/golden-after-light.svg', alt: 'Grey box' }
              }
            ]
          },
          {
            cells: [
              {
                label: 'QA',
                left_offset: 927,
                before_light: { filename: '/assets/storyblok/gray2-before-light.svg', alt: 'Dark grey box' },
                before_dark: { filename: '/assets/storyblok/gray2-before-light.svg', alt: 'Dark grey box' },
                after_light: { filename: '/assets/storyblok/gray2-after-light.svg', alt: 'Grey box' },
                after_dark: { filename: '/assets/storyblok/gray2-after-light.svg', alt: 'Grey box' }
              },
              {
                label: 'QA',
                left_offset: 0,
                before_light: { filename: '/assets/storyblok/gray2-before-light.svg', alt: 'Dark grey box' },
                before_dark: { filename: '/assets/storyblok/gray2-before-light.svg', alt: 'Dark grey box' },
                after_light: { filename: '/assets/storyblok/gray2-after-light.svg', alt: 'Grey box' },
                after_dark: { filename: '/assets/storyblok/gray2-after-light.svg', alt: 'Grey box' }
              },
              {
                label: 'QA',
                left_offset: 0,
                before_light: { filename: '/assets/storyblok/gray2-before-light.svg', alt: 'Dark grey box' },
                before_dark: { filename: '/assets/storyblok/gray2-before-light.svg', alt: 'Dark grey box' },
                after_light: { filename: '/assets/storyblok/gray2-after-light.svg', alt: 'Grey box' },
                after_dark: { filename: '/assets/storyblok/gray2-after-light.svg', alt: 'Grey box' }
              }
            ]
          }
        ]
      }
    ]
  };

  const testimonialsBlock = {
    _uid: 'testimonials-1',
    component: 'testimonials' as const,
    testimonials_title1: 'Testimonials.',
    testimonials_title2: 'Rumour has it.',
    testimonials_cta_label: 'See projects',
    testimonials_cta_link: {
      linktype: 'url' as const,
      url: '/projects'
    },
    variant: 'two' as const,
    size: 'h2' as const,
    testimonials: [
      {
        _uid: 'testimonial-1',
        component: 'richtext-testimonial' as const,
        testimonial: 'Significa listened to our needs and delivered a solution that exceeded our expectations. Their attention to detail and creative thinking truly set them apart.',
        name: 'Sarah Johnson',
        position: 'CEO, Digital Innovations',
        photo: {
          id: 1,
          name: 'avatar-1',
          alt: 'Sarah Johnson',
          filename: '/assets/storyblok/default-avatar-1.jpg',
          focus: null,
          source: null,
          title: null,
          copyright: null
        }
      },
      {
        _uid: 'testimonial-2',
        component: 'richtext-testimonial' as const,
        testimonial: 'Working with Significa was a game-changer for our business. They understood our vision and brought it to life with remarkable precision and creativity.',
        name: 'Michael Chen',
        position: 'Founder, Creative Studios',
        photo: {
          id: 2,
          name: 'avatar-2',
          alt: 'Michael Chen',
          filename: '/assets/storyblok/default-avatar-2.jpg',
          focus: null,
          source: null,
          title: null,
          copyright: null
        }
      },
      {
        _uid: 'testimonial-3',
        component: 'richtext-testimonial' as const,
        testimonial: 'The team at Significa is not just talented—they\'re collaborative, responsive, and genuinely passionate about their work. Highly recommended!',
        name: 'Emma Williams',
        position: 'Product Manager, Tech Solutions',
        photo: {
          id: 3,
          name: 'avatar-3',
          alt: 'Emma Williams',
          filename: '/assets/storyblok/default-avatar-3.jpg',
          focus: null,
          source: null,
          title: null,
          copyright: null
        }
      },
      {
        _uid: 'testimonial-4',
        component: 'richtext-testimonial' as const,
        testimonial: 'From strategy to execution, Significa handled every aspect with professionalism and excellence. Our product is better because of their expertise.',
        name: 'David Martinez',
        position: 'CTO, Growth Ventures',
        photo: {
          id: 4,
          name: 'avatar-4',
          alt: 'David Martinez',
          filename: '/assets/storyblok/default-avatar-4.jpg',
          focus: null,
          source: null,
          title: null,
          copyright: null
        }
      },
      {
        _uid: 'testimonial-5',
        component: 'richtext-testimonial' as const,
        testimonial: 'A truly exceptional partner. They don\'t just build products; they build experiences. Our users love what they created for us.',
        name: 'Jessica Lee',
        position: 'Director, Brand Agency',
        photo: {
          id: 5,
          name: 'avatar-5',
          alt: 'Jessica Lee',
          filename: '/assets/storyblok/default-avatar-5.jpg',
          focus: null,
          source: null,
          title: null,
          copyright: null
        }
      }
    ]
  };
</script>

<svelte:head>
  <title>Services</title>
  <meta name="description" content="Our services in digital product design and development." />
</svelte:head>

<div class="overflow-hidden">
  <TimelineServices block={timelineServicesBlock} />
  <Services block={servicesBlock} />
  <Clients block={certifiedPartnersBlock} />

  <!-- Awards Section -->
  <section class="mt-10 md:mt-14">
    <div class="container mx-auto flex px-container">
      <div class="xl:max-w-3xl">
        <h3 class="text-5xl text-foreground-secondary">Awards.</h3>
        <p class="text-5xl">Celebrating outstanding work.</p>
      </div>
    </div>
  </section>

  <!-- Awards List -->
  <section class="mt-10 md:mt-14 lg:mt-20">
    <div class="justify-between gap-12 lg:flex">
      <div class="flex flex-1 flex-col items-start">
        <div class="w-full flex-1">
          <ul>
            {#each [
              { href: '/projects/hey-harper', label: 'Best Of The Year', award: 'eCommerce Awards 2025', project: 'Hey Harper.', image: '/assets/storyblok/ecomawards.png' },
              { href: '/projects/mishmash', label: 'Award', award: 'Red Dot 2025', project: 'mishmash.', image: '/assets/storyblok/reddot.webp' },
              { href: '/projects/significa', label: 'Awwwards', award: 'Distinction 2023', project: 'Significa.', image: '/assets/storyblok/awwwardshm.png' },
              { href: '/projects/mishmash', label: 'Awwwards', award: 'Distinction 2020', project: 'mishmash.', image: '/assets/storyblok/awwwardshm.png' },
              { href: '/projects/vertbase', label: 'Awwwards', award: 'Distinction 2019', project: 'Vertbase.', image: '/assets/storyblok/awwwardshm.png' }
            ] as award, i}
              {#if i < visibleAwards}
                <li class="block border-b first:border-t transition-colors hover:bg-foreground-tertiary/10">
                  <a href={award.href} class="container mx-auto flex flex-col justify-between px-container py-5 lg:flex-row">
                    <div class="flex w-full flex-col-reverse items-center lg:flex-row">
                      <div class="mb-4 flex w-full items-center lg:mb-0">
                        <img class="mr-2 h-auto w-14 rounded-xs bg-background-offset" src={award.image} alt={award.award} width="122" height="88">
                        <div class="ml-4 flex-col">
                          <p class="text-base font-semibold text-foreground-secondary">{award.label}</p>
                          <p class="text-base font-semibold">{award.award}</p>
                        </div>
                      </div>
                      <div class="mb-4 w-full lg:mb-0">
                        <p class="text-3xl font-semibold">{award.project}</p>
                      </div>
                    </div>
                    <div class="w-1/3">
                      <div class="flex-1 justify-end text-foreground-tertiary xl:flex">
                        <button class="group relative inline-flex items-center justify-center gap-1.5 overflow-hidden whitespace-nowrap text-md font-medium leading-none outline-none transition-all hover:ring-4 focus-visible:ring-4 active:scale-[0.98] active:ring-2 disabled:pointer-events-none disabled:opacity-60 text-foreground border-border hover:border-border-active focus-visible:border-border-active active:border-border-active border h-11 rounded-md px-5">
                          <span>View project</span>
                        </button>
                      </div>
                    </div>
                  </a>
                </li>
              {/if}
            {/each}
          </ul>
        </div>
      </div>
    </div>
    {#if visibleAwards < 5}
      <div class="container mx-auto flex px-container">
        <button on:click={() => visibleAwards = 5} class="group relative inline-flex items-center justify-center gap-1.5 overflow-hidden whitespace-nowrap text-md font-medium leading-none outline-none transition-all hover:ring-4 focus-visible:ring-4 active:scale-[0.98] active:ring-2 disabled:pointer-events-none disabled:opacity-60 text-foreground border-border hover:border-border-active focus-visible:border-border-active active:border-border-active border h-11 rounded-md px-5 mt-10">
          <span>Load more</span>
        </button>
      </div>
    {/if}
  </section>

  <!-- Deliverables Section -->
  <List block={deliverablesBlock} />

  <!-- Testimonials Section -->
  <Testimonials block={testimonialsBlock} />

  <!-- Proud Clients Section -->
  <Clients block={prouldClientsBlock} />

  <!-- Contact Form Section -->
  <section class="container mx-auto mt-10 px-container @container lg:mt-20">
    <div class="grid grid-cols-3 overflow-hidden rounded-lg border">
      <div class="col-span-1 hidden flex-col bg-background-panel @5xl:flex">
        <div class="p-8">
          <h3 class="text-4xl">How can we help?<br> Let's work together.</h3>
          <p class="mt-4 text-xl text-foreground-secondary">Working together takes some practice to get in sync, but once we find our rhythm, the result can be magical!</p>
        </div>
      </div>
      <div class="col-span-3 bg-background-panel p-4 pt-8 @5xl:col-span-2 @5xl:border-l @5xl:p-8">
        <ContactForm />
      </div>
    </div>
  </section>

  <!-- FAQ Section -->
  <FaqsList block={commonFaqsBlock} />
</div>
