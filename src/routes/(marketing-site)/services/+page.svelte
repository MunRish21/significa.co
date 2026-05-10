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
  import { commonFaqsBlock, getCommonFaqsForSchema } from '$lib/data/faqs';
  import { getFeaturedTestimonials } from '$lib/data/testimonials';
  import { getActiveTeamMembers } from '$lib/data/team';

  const servicesTestimonials = getFeaturedTestimonials();
  import {
    BASE_URL,
    generateOrganizationSchema,
    generateBreadcrumbSchema,
    generateServicesPageSchema,
    generateFAQSchema,
    generateHowToSchema,
    generateTeamMembersSchema
  } from '$lib/utils/schema';

  /** Pull aggregate ratings + reviews from the featured testimonials surfaced on this page. */
  const ratings = servicesTestimonials
    .map((t) => t.rating)
    .filter((r): r is number => typeof r === 'number');

  const reviewEntries = servicesTestimonials
    .filter((t) => typeof t.rating === 'number')
    .slice(0, 10)
    .map((t) => ({
      rating: t.rating as number,
      body: t.quote,
      author: t.author,
      date: t.date
    }));

  const teamSchemaMembers = getActiveTeamMembers().map((m) => ({
    name: m.name,
    jobTitle: m.role,
    description: m.tagline,
    image: m.avatar,
    url: `/team/${m.slug}`,
    sameAs: m.links.map((l) => l.url)
  }));

  /** Service categories used by the OfferCatalog in the Service schema. */
  const schemaServiceCategories = [
    { title: 'Strategy', description: 'Discovery, product definition, and operations.' },
    { title: 'Design', description: 'Interface, brand, and multimedia.' },
    { title: 'Development', description: 'Front-end, back-end, AI, e-commerce, DevOps.' }
  ];

  const servicesBlock = {
    component: 'services',
    services_title: 'Our services.',
    services_subtitle: 'The full list.',
    services_description:
      "Strategy first. Then design. Then code. We do all three so you're not chasing three different vendors and stitching their work together. Here's what each one actually means in practice.",
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
              { label: 'React', link: '/hire/react-developer' },
              { label: 'Next.js', link: '/hire/nextjs-developer' },
              { label: 'TypeScript', link: '/hire/typescript-developer' },
              { label: 'Frontend Engineering', link: '/hire/frontend-developer' },
              { label: 'Web Development', link: '/hire/web-developer' }
            ]
          },
          {
            title: 'Mobile',
            list: [
              { label: 'React Native', link: '/hire/react-native-developer' },
              { label: 'iOS (Swift)', link: '/hire/ios-developer' },
              { label: 'Android (Kotlin)', link: '/hire/android-developer' },
              { label: 'Flutter', link: '/hire/flutter-developer' },
              { label: 'Mobile App Development', link: '/hire/mobile-app-developer' }
            ]
          },
          {
            title: 'Back-end',
            list: [
              { label: 'Node.js', link: '/hire/nodejs-developer' },
              { label: 'Python', link: '/hire/python-developer' },
              { label: 'Django', link: '/hire/django-developer' },
              { label: 'FastAPI', link: '/hire/fastapi-developer' },
              { label: 'Backend Engineering', link: '/hire/backend-developer' },
              { label: 'Full Stack', link: '/hire/full-stack-developer' }
            ]
          },
          {
            title: 'AI & Voice',
            list: [
              { label: 'AI Engineering', link: '/hire/ai-engineer' },
              { label: 'LLM Integration', link: '/hire/llm-developer' },
              { label: 'Voice AI', link: '/hire/voice-ai-developer' }
            ]
          },
          {
            title: 'E-commerce & CMS',
            list: [
              { label: 'Shopify', link: '/hire/shopify-developer' },
              { label: 'WooCommerce', link: '/hire/woocommerce-developer' },
              { label: 'WordPress', link: '/hire/wordpress-developer' },
              { label: 'Headless CMS', link: '/hire/headless-cms-developer' }
            ]
          },
          {
            title: 'Platform',
            list: [
              { label: 'SaaS Development', link: '/hire/saas-developer' },
              { label: 'DevOps', link: '/hire/devops-engineer' }
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
    subtitle: 'Including, but not limited to.',
    blocks: [
      {
        deliverable: 'E-commerce',
        description:
          "Online stores. Shopify, WooCommerce, or fully custom, depending on how big the catalog is and how strange your checkout needs to be.",
        link_title: 'See more',
        link: { url: '/e-commerce' }
      },
      {
        icon: {
          filename: '/assets/storyblok/browser.webp',
          alt: 'Browser icon'
        },
        deliverable: 'Website',
        description:
          "Marketing sites. Next.js or SvelteKit by default, WordPress when editors prefer it. Fast on mobile, easy to update without a developer."
      },
      {
        icon: {
          filename: '/assets/storyblok/laptop.webp',
          alt: 'Laptop icon'
        },
        deliverable: 'Software',
        description:
          "Internal tools and admin dashboards. The software your team uses every day but never shows off in pitches."
      },
      {
        icon: {
          filename: '/assets/storyblok/web.webp',
          alt: 'Globe icon'
        },
        deliverable: 'Web App',
        description:
          "Browser-based apps. Dashboards, multi-step forms, real-time UIs. Nothing to download, nothing to install."
      },
      {
        icon: {
          filename: '/assets/storyblok/iosapp.webp',
          alt: 'iOS smartphone icon'
        },
        deliverable: 'Mobile App',
        description:
          "iOS and Android. Native (Swift or Kotlin) when the polish matters; React Native or Flutter when shared code is the smarter call."
      },
      {
        icon: {
          filename: '/assets/storyblok/cms.webp',
          alt: 'Folder icon'
        },
        deliverable: 'CMS',
        description:
          "CMS setups. Sanity, Storyblok, Contentful, Payload, or WordPress, whichever your editors will actually open."
      },
      {
        deliverable: 'AI Solutions',
        description:
          "AI features. RAG, agents, voice, copilots. Production work with real evaluation harnesses, not weekend demos."
      },
      {
        deliverable: 'Automation',
        description:
          "Automation. Connect tools, kill manual steps, run jobs on a schedule. Make and n8n where they fit, custom code where they don't."
      },
      {
        deliverable: 'Robotics',
        description:
          "Robotics. Control software, firmware, and the dashboards on top. Less common for us, but we've shipped it."
      }
    ]
  };

  const timelineServicesBlock = {
    component: 'timeline-services',
    title: 'We design and build digital products.',
    description:
      "Eight years in. 80+ products shipped. Strategy, design, and engineering done by the same team — saves the handoff overhead and a lot of emails.",
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
    content="Strategy, design, and engineering for digital products. Websites, web apps, mobile apps, AI features, automation. 80+ shipped over 8 years for teams in the US, UK, AU, and Europe."
  />

  <meta property="og:type" content="website" />
  <meta property="og:title" content="Services — Strategy, Design, Development | Techyor" />
  <meta
    property="og:description"
    content="Strategy, design, and engineering for digital products. 80+ shipped over 8 years for teams across the US, UK, AU, and Europe."
  />
  <meta property="og:image" content="{BASE_URL}/api/og/services" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Techyor services — strategy, design, development" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@TechyorDotCo" />
  <meta name="twitter:title" content="Services — Strategy, Design, Development | Techyor" />
  <meta
    name="twitter:description"
    content="Strategy, design, and engineering for digital products. 80+ shipped, 8+ years, clients across the US, UK, AU, and EU."
  />
  <meta name="twitter:image" content="{BASE_URL}/api/og/services" />
  <meta name="twitter:image:alt" content="Techyor services — strategy, design, development" />

  {@html `<${'script'} type="application/ld+json">${generateOrganizationSchema()}</${'script'}>`}
  {@html `<${'script'} type="application/ld+json">${generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' }
  ])}</${'script'}>`}
  {@html `<${'script'} type="application/ld+json">${generateServicesPageSchema({
    url: `${BASE_URL}/services`,
    description:
      "Strategy, design, and engineering for digital products. Websites, web apps, mobile, AI, automation. 80+ shipped over 8 years for teams in the US, UK, AU, and Europe.",
    serviceCategories: schemaServiceCategories,
    ratings,
    reviews: reviewEntries,
    imagePath: '/api/og/services'
  })}</${'script'}>`}
  {@html `<${'script'} type="application/ld+json">${generateHowToSchema({
    name: 'How Techyor delivers digital products',
    description:
      "Strategy first. Then design. Then code. Same team across all three so projects don't fall apart in handoffs.",
    totalTime: 'P30D',
    steps: [
      {
        name: 'Strategy',
        text: "We start by understanding the actual problem your customers have, not just the feature you want built. Discovery, product definition, scope."
      },
      {
        name: 'Design',
        text: "Visual systems and interaction design grounded in what users actually do, not what they say in a survey. Brand, interface, motion."
      },
      {
        name: 'Development',
        text: "Front-end, back-end, AI, infrastructure. Whatever the project actually needs to ship and stay shipped."
      }
    ]
  })}</${'script'}>`}
  {@html `<${'script'} type="application/ld+json">${generateFAQSchema(getCommonFaqsForSchema())}</${'script'}>`}
  {@html `<${'script'} type="application/ld+json">${generateTeamMembersSchema(teamSchemaMembers)}</${'script'}>`}
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
    description="Real Upwork reviews. Verified, paid engagements only — no curated quotes."
  />

  <!-- Team Section -->
  <TeamSection
    title="The people you'd actually work with."
    subtitle="Hire them directly."
    showViewAll
  />

  <!-- Proud Clients Section -->
  <ClientsSection title="Some of the teams we've shipped for." />

  <!-- Contact Form Section -->
  <section class="container mx-auto mt-10 px-container @container lg:mt-20">
    <div class="grid grid-cols-3 overflow-hidden rounded-lg border">
      <div class="col-span-1 hidden flex-col bg-background-panel @5xl:flex">
        <div class="p-8">
          <h3 class="text-4xl">Got something in mind?<br /> Drop us a note.</h3>
          <p class="mt-4 text-xl text-foreground-secondary">
            Quick description of what you're building is enough to start. We reply within a day,
            usually with questions before solutions, because we'd rather understand the problem
            than pitch a plan that misses it.
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
