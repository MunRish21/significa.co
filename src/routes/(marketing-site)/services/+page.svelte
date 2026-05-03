<script lang="ts">
  import TimelineServices from '$components/blocks/timeline-services.svelte';
  import Services from '$components/blocks/services.svelte';
  import Clients from '$components/blocks/clients.svelte';
  import ClientsSection from '$components/sections/clients-section.svelte';
  import TeamSection from '$components/sections/team-section.svelte';
  import List from '$components/blocks/list.svelte';
  import UpworkTestimonials from '$components/sections/upwork-testimonials.svelte';
  import ContactForm from '$components/contact-form.svelte';
  import FaqsList from '$components/blocks/faqs-list.svelte';
  import { commonFaqsBlock } from '$lib/data/faqs';
  import { getFeaturedTestimonials } from '$lib/data/testimonials';

  const servicesTestimonials = getFeaturedTestimonials();
  import {
    generateOrganizationSchema,
    generateBreadcrumbSchema,
    generateServiceSchema,
    generateFAQSchema
  } from '$lib/utils/schema';

  const servicesBlock = {
    component: 'services',
    services_title: 'Our services.',
    services_subtitle: 'The full list!',
    services_description:
      'Each delivery moves through cycles of strategy, design and development. It is the blend of all these elements that creates interfaces that people will love.',
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
            list: [{ label: 'Product management' }, { label: 'Project management' }]
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
            list: [{ label: 'Illustration' }, { label: 'Video and motion design' }]
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
            list: [{ label: 'Elixir' }, { label: 'Python' }, { label: 'Node' }]
          },
          {
            title: 'DevOps',
            list: [{ label: 'Hosting and maintenance' }, { label: 'Infrastructure setup' }]
          }
        ]
      }
    ]
  };

  const deliverablesBlock = {
    component: 'list',
    type: 'deliverables',
    title: 'Deliverables.',
    subtitle: 'Including, but not limited to.',
    blocks: [
      {
        deliverable: 'E-commerce',
        description: 'Online stores crafted to turn browsers into loyal buyers.',
        link_title: 'See more',
        link: { url: '/e-commerce' }
      },
      {
        icon: {
          filename: '/assets/storyblok/browser.webp',
          alt: 'Browser icon'
        },
        deliverable: 'Website',
        description: 'Corporate, marketing, and brand sites that tell your story with clarity.'
      },
      {
        icon: {
          filename: '/assets/storyblok/laptop.webp',
          alt: 'Laptop icon'
        },
        deliverable: 'Software',
        description:
          'Custom software and internal tools tailored to the way your team actually works.'
      },
      {
        icon: {
          filename: '/assets/storyblok/web.webp',
          alt: 'Globe icon'
        },
        deliverable: 'Web App',
        description: 'Powerful tools that live in the browser — no installs, no friction.'
      },
      {
        icon: {
          filename: '/assets/storyblok/iosapp.webp',
          alt: 'iOS smartphone icon'
        },
        deliverable: 'Mobile App',
        description: 'Native iOS and Android experiences built for the way people use their phones.'
      },
      {
        icon: {
          filename: '/assets/storyblok/cms.webp',
          alt: 'Folder icon'
        },
        deliverable: 'CMS',
        description: 'Content systems your team will actually enjoy using day to day.'
      },
      {
        deliverable: 'AI Solutions',
        description:
          'Intelligent products, copilots, and integrations that put modern AI to work for your business.'
      },
      {
        deliverable: 'Automation',
        description:
          'Workflows and integrations that quietly handle the busywork, so your team can focus on what matters.'
      },
      {
        deliverable: 'Robotics',
        description:
          'Physical-meets-digital experiences — control software, firmware, and interfaces for robotic systems.'
      }
    ]
  };

  const timelineServicesBlock = {
    component: 'timeline-services',
    title: 'End-to-end digital products, built to grow with your business.',
    description: 'Strategy-led. Design-driven. Engineered to last.',
    timeline: [
      {
        title: 'Strategy',
        subrows: [
          {
            cells: [
              {
                label: 'Discovery',
                left_offset: 0,
                before_light: {
                  filename: '/assets/storyblok/purple1-before-light.svg',
                  alt: 'Purple box'
                },
                before_dark: {
                  filename: '/assets/storyblok/purple1-before-light.svg',
                  alt: 'Purple box'
                },
                after_light: {
                  filename: '/assets/storyblok/purple1-after-light.svg',
                  alt: 'Grey box'
                },
                after_dark: {
                  filename: '/assets/storyblok/purple1-after-light.svg',
                  alt: 'Grey box'
                }
              },
              {
                label: 'Definition',
                left_offset: 0,
                before_light: {
                  filename: '/assets/storyblok/purple1-before-light.svg',
                  alt: 'Purple box'
                },
                before_dark: {
                  filename: '/assets/storyblok/purple1-before-light.svg',
                  alt: 'Purple box'
                },
                after_light: {
                  filename: '/assets/storyblok/purple1-after-light.svg',
                  alt: 'Grey box'
                },
                after_dark: {
                  filename: '/assets/storyblok/purple1-after-light.svg',
                  alt: 'Grey box'
                }
              }
            ]
          },
          {
            cells: [
              {
                label: 'UX Research',
                left_offset: 114,
                before_light: {
                  filename: '/assets/storyblok/purple2-before-light.svg',
                  alt: 'Purple box'
                },
                before_dark: {
                  filename: '/assets/storyblok/purple2-before-light.svg',
                  alt: 'Purple box'
                },
                after_light: {
                  filename: '/assets/storyblok/purple2-after-light.svg',
                  alt: 'Grey box'
                },
                after_dark: {
                  filename: '/assets/storyblok/purple2-after-light.svg',
                  alt: 'Grey box'
                }
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
                before_light: {
                  filename: '/assets/storyblok/orange1-before-light.svg',
                  alt: 'Orange box'
                },
                before_dark: {
                  filename: '/assets/storyblok/orange1-before-light.svg',
                  alt: 'Orange box'
                },
                after_light: {
                  filename: '/assets/storyblok/orange1-after-light.svg',
                  alt: 'Grey box'
                },
                after_dark: {
                  filename: '/assets/storyblok/orange1-after-light.svg',
                  alt: 'Grey box'
                }
              },
              {
                label: 'User Testing',
                left_offset: 0,
                before_light: {
                  filename: '/assets/storyblok/gray1-before-light.svg',
                  alt: 'Dark grey box'
                },
                before_dark: {
                  filename: '/assets/storyblok/gray1-before-light.svg',
                  alt: 'Dark grey box'
                },
                after_light: {
                  filename: '/assets/storyblok/gray1-after-light.svg',
                  alt: 'Grey box'
                },
                after_dark: { filename: '/assets/storyblok/gray1-after-light.svg', alt: 'Grey box' }
              },
              {
                label: 'Look & Feel',
                left_offset: 0,
                before_light: {
                  filename: '/assets/storyblok/orange1-before-light.svg',
                  alt: 'Orange box'
                },
                before_dark: {
                  filename: '/assets/storyblok/orange1-before-light.svg',
                  alt: 'Orange box'
                },
                after_light: {
                  filename: '/assets/storyblok/orange1-after-light.svg',
                  alt: 'Grey box'
                },
                after_dark: {
                  filename: '/assets/storyblok/orange1-after-light.svg',
                  alt: 'Grey box'
                }
              },
              {
                label: 'Final Design',
                left_offset: 0,
                before_light: {
                  filename: '/assets/storyblok/orange2-before-light.svg',
                  alt: 'Orange box'
                },
                before_dark: {
                  filename: '/assets/storyblok/orange2-before-light.svg',
                  alt: 'Orange box'
                },
                after_light: {
                  filename: '/assets/storyblok/orange2-after-light.svg',
                  alt: 'Grey box'
                },
                after_dark: {
                  filename: '/assets/storyblok/orange2-after-light.svg',
                  alt: 'Grey box'
                }
              },
              {
                label: 'User Testing',
                left_offset: 0,
                before_light: {
                  filename: '/assets/storyblok/gray1-before-light.svg',
                  alt: 'Dark grey box'
                },
                before_dark: {
                  filename: '/assets/storyblok/gray1-before-light.svg',
                  alt: 'Dark grey box'
                },
                after_light: {
                  filename: '/assets/storyblok/gray1-after-light.svg',
                  alt: 'Grey box'
                },
                after_dark: { filename: '/assets/storyblok/gray1-after-light.svg', alt: 'Grey box' }
              }
            ]
          },
          {
            cells: [
              {
                label: 'Design System',
                left_offset: 835,
                before_light: {
                  filename: '/assets/storyblok/orange1-before-light.svg',
                  alt: 'Orange box'
                },
                before_dark: {
                  filename: '/assets/storyblok/orange1-before-light.svg',
                  alt: 'Orange box'
                },
                after_light: {
                  filename: '/assets/storyblok/orange1-after-light.svg',
                  alt: 'Grey box'
                },
                after_dark: {
                  filename: '/assets/storyblok/orange1-after-light.svg',
                  alt: 'Grey box'
                }
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
                before_light: {
                  filename: '/assets/storyblok/blue1-before-light.svg',
                  alt: 'Blue box'
                },
                before_dark: {
                  filename: '/assets/storyblok/blue1-before-light.svg',
                  alt: 'Blue box'
                },
                after_light: {
                  filename: '/assets/storyblok/blue1-after-light.svg',
                  alt: 'Grey box'
                },
                after_dark: { filename: '/assets/storyblok/blue1-after-light.svg', alt: 'Grey box' }
              },
              {
                label: 'Development',
                left_offset: 236,
                before_light: {
                  filename: '/assets/storyblok/blue2-before-light.svg',
                  alt: 'Blue box'
                },
                before_dark: {
                  filename: '/assets/storyblok/blue2-before-light.svg',
                  alt: 'Blue box'
                },
                after_light: {
                  filename: '/assets/storyblok/blue2-after-light.svg',
                  alt: 'Grey box'
                },
                after_dark: {
                  filename: '/assets/storyblok/blue2-after-light.svg',
                  alt: 'Grey box'
                },
                throw_confetti: true,
                decoration_light: { filename: '/assets/storyblok/decorations-dark.svg', alt: '' },
                decoration_dark: { filename: '/assets/storyblok/decorations-dark.svg', alt: '' }
              },
              {
                label: 'Launch',
                left_offset: 0,
                before_light: {
                  filename: '/assets/storyblok/golden-before-light.svg',
                  alt: 'Golden box'
                },
                before_dark: {
                  filename: '/assets/storyblok/golden-before-light.svg',
                  alt: 'Golden box'
                },
                after_light: {
                  filename: '/assets/storyblok/golden-after-light.svg',
                  alt: 'Grey box'
                },
                after_dark: {
                  filename: '/assets/storyblok/golden-after-light.svg',
                  alt: 'Grey box'
                }
              }
            ]
          },
          {
            cells: [
              {
                label: 'QA',
                left_offset: 927,
                before_light: {
                  filename: '/assets/storyblok/gray2-before-light.svg',
                  alt: 'Dark grey box'
                },
                before_dark: {
                  filename: '/assets/storyblok/gray2-before-light.svg',
                  alt: 'Dark grey box'
                },
                after_light: {
                  filename: '/assets/storyblok/gray2-after-light.svg',
                  alt: 'Grey box'
                },
                after_dark: { filename: '/assets/storyblok/gray2-after-light.svg', alt: 'Grey box' }
              },
              {
                label: 'QA',
                left_offset: 0,
                before_light: {
                  filename: '/assets/storyblok/gray2-before-light.svg',
                  alt: 'Dark grey box'
                },
                before_dark: {
                  filename: '/assets/storyblok/gray2-before-light.svg',
                  alt: 'Dark grey box'
                },
                after_light: {
                  filename: '/assets/storyblok/gray2-after-light.svg',
                  alt: 'Grey box'
                },
                after_dark: { filename: '/assets/storyblok/gray2-after-light.svg', alt: 'Grey box' }
              },
              {
                label: 'QA',
                left_offset: 0,
                before_light: {
                  filename: '/assets/storyblok/gray2-before-light.svg',
                  alt: 'Dark grey box'
                },
                before_dark: {
                  filename: '/assets/storyblok/gray2-before-light.svg',
                  alt: 'Dark grey box'
                },
                after_light: {
                  filename: '/assets/storyblok/gray2-after-light.svg',
                  alt: 'Grey box'
                },
                after_dark: { filename: '/assets/storyblok/gray2-after-light.svg', alt: 'Grey box' }
              }
            ]
          }
        ]
      }
    ]
  };

</script>

<svelte:head>
  <title>Services — Strategy, Design, Development | Techyor</title>
  <meta
    name="description"
    content="End-to-end digital product services. Strategy, UX/UI design, web and mobile development, AI integrations, e-commerce, and automation — all under one roof. Built for ambitious teams."
  />

  <meta property="og:type" content="website" />
  <meta property="og:title" content="Services — Strategy, Design, Development | Techyor" />
  <meta
    property="og:description"
    content="Strategy, design, web and mobile development, AI, e-commerce, and automation. Custom-built for ambitious teams."
  />
  <meta property="og:image" content="https://www.techyor.com/og.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Techyor services" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@TechyorDotCo" />
  <meta name="twitter:title" content="Services — Strategy, Design, Development | Techyor" />
  <meta
    name="twitter:description"
    content="Strategy, design, web/mobile development, AI, e-commerce, and automation — under one roof."
  />
  <meta name="twitter:image" content="https://www.techyor.com/og.png" />

  <script type="application/ld+json">
{generateOrganizationSchema()}
  </script>
  <script type="application/ld+json">
{generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' }
  ])}
  </script>
  <script type="application/ld+json">
{generateServiceSchema('Digital Product Services', 'End-to-end digital product development including strategy, design, development, and deployment.')}
  </script>
  <script type="application/ld+json">
{generateFAQSchema(commonFaqsBlock.faqs_items.map(item => ({
    question: item.question,
    answer: item.answer
  })))}
  </script>
</svelte:head>

<div class="overflow-hidden">
  <TimelineServices block={timelineServicesBlock} />
  <Services block={servicesBlock} />

  <!-- Deliverables Section -->
  <List block={deliverablesBlock} />

  <!-- Testimonials Section -->
  <UpworkTestimonials
    items={servicesTestimonials}
    title="Testimonials."
    subtitle="What clients say."
    description="Verified Upwork reviews from clients who've worked with our team."
  />

  <!-- Team Section -->
  <TeamSection
    title="The specialists behind these services."
    subtitle="Hire them directly."
    showViewAll
  />

  <!-- Proud Clients Section -->
  <ClientsSection title="Trusted by ambitious teams." />

  <!-- Contact Form Section -->
  <section class="container mx-auto mt-10 px-container @container lg:mt-20">
    <div class="grid grid-cols-3 overflow-hidden rounded-lg border">
      <div class="col-span-1 hidden flex-col bg-background-panel @5xl:flex">
        <div class="p-8">
          <h3 class="text-4xl">Have a project in mind?<br /> Let's make it happen.</h3>
          <p class="mt-4 text-xl text-foreground-secondary">
            Tell us about your goals, your timeline, and the problem you're solving. We'll get back
            within a business day with thoughts, questions, and next steps.
          </p>
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
