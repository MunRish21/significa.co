<script lang="ts">
  import { page } from '$app/stores';
  import TimelineServices from '$components/blocks/timeline-services.svelte';
  import Services from '$components/blocks/services.svelte';
  import Clients from '$components/blocks/clients.svelte';
  import ClientsSection from '$components/sections/clients-section.svelte';
  import TeamSection from '$components/sections/team-section.svelte';
  import List from '$components/blocks/list.svelte';
  import UpworkTestimonials from '$components/sections/upwork-testimonials.svelte';
  import ContactForm from '$components/contact-form.svelte';
  import TrustBadge from '$components/trust-badge.svelte';
  import PricingTiers from '$components/pricing-tiers.svelte';
  import FaqsList from '$components/blocks/faqs-list.svelte';
  import { commonFaqsBlock, getCommonFaqsForSchema } from '$lib/data/faqs';
  import {
    filterFeaturedTestimonials,
    getFeaturedTestimonials,
    type Testimonial
  } from '$lib/data/testimonials';
  import { getActiveTeamMembers, type TeamMember } from '$lib/data/team';

  import { isSectionEnabled, type SectionsMap } from '$lib/tenant';
  import {
    BASE_URL,
    generateOrganizationSchema,
    generateBreadcrumbSchema,
    generateServicesPageSchema,
    generateFAQSchema,
    generateHowToSchema,
    generateTeamMembersSchema
  } from '$lib/utils/schema';

  export let data: {
    page: { title: string | null; description: string | null; meta: Record<string, unknown> } | null;
    sections: SectionsMap;
  };

  $: dbPage = data?.page ?? null;
  $: sections = (data?.sections ?? {}) as SectionsMap;
  $: on = (key: string) => isSectionEnabled(sections, key);
  $: isAgency =
    (($page.data?.tenant?.meta as Record<string, unknown> | undefined)?.isAgency as
      | boolean
      | undefined) === true;
  $: tenant = $page.data?.tenant as
    | { name?: string; meta?: Record<string, unknown> }
    | undefined;
  $: brandName = tenant?.name ?? 'Techyor';
  $: pageTitle =
    dbPage?.title ??
    (isAgency
      ? 'Services — Strategy, Design, Development | Techyor'
      : `Services — What I build | ${brandName}`);
  $: pageDescription =
    dbPage?.description ??
    (isAgency
      ? 'End-to-end digital product services. Strategy, UX/UI design, web and mobile development, AI integrations, e-commerce, and automation — all under one roof. Built for ambitious teams.'
      : `Services offered by ${brandName} — websites, web apps, e-commerce stores, integrations, and AI tools. Solo, end-to-end. Built for clients in the US, UK, EU, and Australia.`);
  $: pageMeta = (dbPage?.meta ?? {}) as Record<string, string>;

  $: dbTestimonials = (data?.dbTestimonials ?? []) as Testimonial[];
  $: servicesTestimonials =
    dbTestimonials.length > 0
      ? filterFeaturedTestimonials(dbTestimonials)
      : getFeaturedTestimonials();

  /** Pull aggregate ratings + reviews from the featured testimonials surfaced on this page. */
  $: ratings = servicesTestimonials
    .map((t) => t.rating)
    .filter((r): r is number => typeof r === 'number');

  $: reviewEntries = servicesTestimonials
    .filter((t) => typeof t.rating === 'number')
    .slice(0, 10)
    .map((t) => ({
      rating: t.rating as number,
      body: t.quote,
      author: t.author,
      date: t.date
    }));

  $: tenantMembers = (data?.dbTeamMembers ?? []) as TeamMember[];
  $: schemaSourceMembers = tenantMembers.length > 0 ? tenantMembers : getActiveTeamMembers();
  $: teamSchemaMembers = schemaSourceMembers.map((m) => ({
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
      'We work in three phases: strategy first, then design, then code. The combination of all three is what makes products people actually want to use.',
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
    subtitle: 'We build.',
    blocks: [
      {
        deliverable: 'E-commerce',
        description: 'Online stores that convert. Shopify, WooCommerce, custom builds.'
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
          'Chatbots, copilots, voice agents, and LLM integrations. We build AI products that work.'
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
    title: 'Design and development services for founders building V1.',
    description: 'How we build. Strategy first. Design next. Then code. QA throughout. Launch when ready.',
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
  <title>{pageTitle}</title>
  <meta name="description" content={pageDescription} />

  <meta property="og:type" content="website" />
  <meta property="og:title" content={pageMeta.ogTitle ?? pageTitle} />
  <meta property="og:description" content={pageMeta.ogDescription ?? pageDescription} />
  <meta property="og:image" content="{BASE_URL}{pageMeta.ogImage ?? '/api/og/services'}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta
    property="og:image:alt"
    content={isAgency
      ? 'Techyor services — strategy, design, development'
      : `${brandName} — services`}
  />

  <meta name="twitter:card" content={pageMeta.twitterCard ?? 'summary_large_image'} />
  {#if isAgency}
    <meta name="twitter:site" content="@TechyorDotCo" />
  {/if}
  <meta name="twitter:title" content={pageMeta.ogTitle ?? pageTitle} />
  <meta name="twitter:description" content={pageMeta.ogDescription ?? pageDescription} />
  <meta name="twitter:image" content="{BASE_URL}{pageMeta.ogImage ?? '/api/og/services'}" />
  <meta
    name="twitter:image:alt"
    content={isAgency
      ? 'Techyor services — strategy, design, development'
      : `${brandName} — services`}
  />

  {#if isAgency}
    {@html `<${'script'} type="application/ld+json">${generateOrganizationSchema()}</${'script'}>`}
  {/if}
  {@html `<${'script'} type="application/ld+json">${generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' }
  ])}</${'script'}>`}
  {#if isAgency}
    {@html `<${'script'} type="application/ld+json">${generateServicesPageSchema({
      url: `${BASE_URL}/services`,
      description:
        'End-to-end digital product services. Strategy, UX/UI design, web and mobile development, AI integrations, e-commerce, and automation — all under one roof.',
      serviceCategories: schemaServiceCategories,
      ratings,
      reviews: reviewEntries,
      imagePath: '/api/og/services'
    })}</${'script'}>`}
    {@html `<${'script'} type="application/ld+json">${generateHowToSchema({
      name: 'How Techyor delivers digital products',
      description:
        'Each delivery moves through cycles of strategy, design, and development. The blend of these creates products people love.',
      totalTime: 'P30D',
      steps: [
        {
          name: 'Strategy',
          text: 'Discovery, product definition, and operations. We start with the business problem before any pixel or line of code.'
        },
        {
          name: 'Design',
          text: 'Interface, brand, and multimedia. Visual systems and interaction design grounded in user research.'
        },
        {
          name: 'Development',
          text: 'Front-end, back-end, AI, e-commerce, and DevOps. Production-grade engineering with shipped outcomes.'
        }
      ]
    })}</${'script'}>`}
    {@html `<${'script'} type="application/ld+json">${generateFAQSchema(getCommonFaqsForSchema())}</${'script'}>`}
    {@html `<${'script'} type="application/ld+json">${generateTeamMembersSchema(teamSchemaMembers)}</${'script'}>`}
  {/if}
</svelte:head>

<div class="overflow-hidden">
  {#if on('timeline-services')}
    <TimelineServices block={timelineServicesBlock} />
  {/if}

  <TrustBadge />

  {#if on('services-list')}
    <Services block={servicesBlock} />
  {/if}

  <PricingTiers />

  {#if on('deliverables')}
    <List block={deliverablesBlock} />
  {/if}

  {#if on('testimonials')}
    <UpworkTestimonials
      items={servicesTestimonials}
      title="Testimonials."
      subtitle="What clients say."
      description="Verified Upwork reviews from clients who've worked with our team."
    />
  {/if}

  {#if on('team')}
    <TeamSection
      title="The specialists behind these services."
      subtitle="Hire them directly."
      showViewAll
    />
  {/if}

  {#if on('clients')}
    <ClientsSection title="Trusted by teams who ship." />
  {/if}

  {#if isAgency && on('contact')}
    <section class="container mx-auto mt-10 px-container @container lg:mt-20">
      <div class="grid grid-cols-3 overflow-hidden rounded-lg border">
        <div class="col-span-1 hidden flex-col bg-background-panel @5xl:flex">
          <div class="p-8">
            <h3 class="text-4xl">Got a project?<br /> Let's build it.</h3>
            <p class="mt-4 text-xl text-foreground-secondary">
              Tell us about your goals, timeline, and what problem you're solving. We'll respond within a business day.
            </p>
          </div>
        </div>
        <div class="col-span-3 bg-background-panel p-4 pt-8 @5xl:col-span-2 @5xl:border-l @5xl:p-8">
          <ContactForm />
        </div>
      </div>
    </section>
  {/if}

  {#if isAgency && on('faqs')}
    <FaqsList block={commonFaqsBlock} />
  {/if}
</div>
