// Per-tenant homepage content. Keyed by tenant slug. The +page.svelte
// resolves the tenant from $page.data.tenant and renders the matching
// config. Sections with `enabled: false` are skipped at render time and
// take precedence over the page_sections.enabled flag in Supabase.
//
// This is the stepping-stone version. Once the homepage is fully driven
// by page_sections.props, this file can be replaced by reading
// sections[key].props for every block.

export type HomeContent = {
  meta: {
    title: string;
    description: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage: string;
    ogImageAlt: string;
    twitterSite?: string;
    twitterCreator?: string;
    keywords?: string;
  };
  hero: {
    enabled: boolean;
    headlineLines: { text: string; secondary?: boolean }[];
    subtitle: string;
  };
  stats: {
    enabled: boolean;
    items: { value: string; label: string }[];
  };
  capabilities: {
    enabled: boolean;
    eyebrow: string;
    title: string;
    items: { title: string; description: string }[];
  };
  about: {
    enabled: boolean;
    eyebrow: string;
    title: string;
    description: string;
    ctaLabel: string;
    ctaUrl: string;
  };
  newton: {
    enabled: boolean;
    title1: string;
    title2: string;
    description: string;
    ctaLabel: string;
    ctaUrl: string;
  };
  selectedWork: {
    enabled: boolean;
    eyebrow: string;
    title: string;
    projectSlugs?: string[]; // when set, only these slugs are shown
    viewAllLabel: string;
  };
  featuredHighlights: { enabled: boolean };
  showreel: { enabled: boolean };
  aboutGrid: { enabled: boolean };
  team: { enabled: boolean; title?: string; subtitle?: string };
  blogInsights: { enabled: boolean };
  clients: { enabled: boolean; title: string };
  faqs: { enabled: boolean };
};

const techyor: HomeContent = {
  meta: {
    title: 'Techyor — Web, App & AI Product Development Studio',
    description:
      'Techyor is a digital product studio building custom websites, web apps, mobile apps, e-commerce stores, AI tools, and automation for teams in the US, UK, Switzerland, and Australia. Strategy, design, development — under one roof.',
    ogImage: '/api/og/home',
    ogImageAlt: 'Techyor — digital product studio',
    twitterSite: '@TechyorDotCo',
    twitterCreator: '@TechyorDotCo'
  },
  hero: {
    enabled: true,
    headlineLines: [
      { text: 'Think.' },
      { text: 'Design.' },
      { text: 'Build.' },
      { text: 'Then keep shipping.', secondary: true }
    ],
    subtitle:
      "Techyor is a product studio. For eight years we've built websites, apps, and AI tools for teams in the US, UK, Switzerland, and Australia."
  },
  stats: {
    enabled: true,
    items: [
      { value: '8+', label: 'Years in' },
      { value: '80+', label: 'Shipped' },
      { value: '4', label: 'Time zones' },
      { value: '100%', label: 'One team' }
    ]
  },
  capabilities: {
    enabled: true,
    eyebrow: 'What we do.',
    title: 'Strategy. Design. Development.',
    items: [
      {
        title: 'Strategy.',
        description:
          'We start with research. User interviews, market analysis, product definition. Get the strategy right before you build.'
      },
      {
        title: 'Design.',
        description:
          "UI and UX that works on screen and in the browser. We sweat the details so your users don't have to."
      },
      {
        title: 'Development.',
        description:
          "Front-end, back-end, mobile, AI integrations. Code that performs, scales, and doesn't break when load spikes hit."
      }
    ]
  },
  about: {
    enabled: true,
    eyebrow: 'About Techyor.',
    title: 'We ship products, not promises.',
    description:
      'Eight years in, 80+ projects shipped for teams in the US, UK, Switzerland, and Australia. We handle strategy, design, and code. We move fast. We ship on time.',
    ctaLabel: 'About us',
    ctaUrl: '/about'
  },
  newton: {
    enabled: true,
    title1: 'Our services.',
    title2: 'One team. No handoffs.',
    description:
      "Websites, apps, e-commerce, AI tools, automation. We build it all in-house. Strategy and research upfront, design, code, launch. Same team the whole way, so ideas don't get lost between departments.",
    ctaLabel: 'Explore services',
    ctaUrl: '/services'
  },
  selectedWork: {
    enabled: true,
    eyebrow: 'Selected work.',
    title: "Products we're proud of.",
    viewAllLabel: 'View all projects'
  },
  featuredHighlights: { enabled: true },
  showreel: { enabled: true },
  aboutGrid: { enabled: true },
  team: {
    enabled: true,
    title: 'Meet the people building it.',
    subtitle: 'Hire a specialist directly.'
  },
  blogInsights: { enabled: true },
  clients: {
    enabled: true,
    title: 'Trusted by teams in the US, UK, Switzerland, and Australia.'
  },
  faqs: { enabled: true }
};

const rishab: HomeContent = {
  meta: {
    title: 'Rishab Singla — Full Stack Engineer (React, Next.js, Python) | Top Rated on Upwork',
    description:
      'Independent full stack engineer with 8 years building React, Next.js, Node.js, and Python web apps and AI tools. LLM integrations, SaaS platforms, custom APIs. 100% Job Success on Upwork.',
    ogImage: '/api/og/team/rishab-singla',
    ogImageAlt: 'Rishab Singla — Full Stack Engineer (React, Next.js, Python)'
  },
  hero: {
    enabled: true,
    headlineLines: [
      { text: 'Ship.' },
      { text: 'Scale.' },
      { text: 'Solo.' },
      { text: "Don't break in prod.", secondary: true }
    ],
    subtitle:
      "I'm Rishab. I build modern web apps and AI tools end-to-end. React, Next.js, Python, Node.js, LLM integrations. 8 years shipping. Strategy → design → code → deploy, same person the whole way."
  },
  stats: {
    enabled: true,
    items: [
      { value: '8 yrs', label: 'Building' },
      { value: '9', label: 'Jobs shipped' },
      { value: '353', label: 'Hours logged' },
      { value: '100%', label: 'Job success' }
    ]
  },
  capabilities: {
    enabled: true,
    eyebrow: 'What I build.',
    title: 'Web apps. AI tools. Backends.',
    items: [
      {
        title: 'Web apps.',
        description:
          'React, Next.js, TypeScript. Full-stack apps from blank page to production. SaaS dashboards, marketing sites, internal tools — fast, accessible, deployable.'
      },
      {
        title: 'AI tools.',
        description:
          'LLM integrations, agents, automations, Chrome extensions. Prompt engineering, RAG pipelines, voice AI. Useful AI, not demo-only.'
      },
      {
        title: 'Backend & APIs.',
        description:
          'Python, Node.js, Laravel. REST and streaming APIs, payment gateways, third-party integrations. The parts nobody wants to touch — handled end-to-end.'
      }
    ]
  },
  about: {
    enabled: true,
    eyebrow: 'About me.',
    title: 'Top Rated on Upwork. 100% job success.',
    description:
      "Eight years shipping for the web. I build modern web apps and AI tools end-to-end — React, Next.js, Python, Node.js, Laravel. LLM integrations, SaaS platforms, Chrome extensions. Long-running eCommerce experience too (Shopify, WooCommerce), so payments, integrations, and migrations aren't new territory.",
    ctaLabel: 'View profile',
    ctaUrl: '/team/rishab-singla'
  },
  newton: {
    enabled: true,
    title1: 'What I build.',
    title2: 'Solo. End-to-end.',
    description:
      'Web apps, AI tools, integrations, backends. Strategy → design → code → ship. Same person the whole way, so nothing gets lost between handoffs and the work moves at one speed: mine.',
    ctaLabel: 'See case studies',
    ctaUrl: '/projects'
  },
  selectedWork: {
    enabled: true,
    eyebrow: 'Recent work.',
    title: 'Selected case studies.',
    projectSlugs: [
      'monster-fairings',
      'b2-hookah',
      'karen-lazar-design',
      'indigenous-treats',
      'simpletalk-ai',
      'convertbankstatement',
      'firmable',
      'gisteo',
      'navjot-kaur-pllc',
      'allbirds'
    ],
    viewAllLabel: 'View all case studies'
  },
  featuredHighlights: { enabled: true },
  showreel: { enabled: false },
  aboutGrid: { enabled: false },
  team: { enabled: false },
  blogInsights: { enabled: false },
  clients: { enabled: true, title: "Clients I've worked with." },
  faqs: { enabled: false }
};

const munish: HomeContent = {
  meta: {
    title: 'Munish K. — Senior WordPress, Shopify & Webflow Developer | Top Rated on Upwork',
    description:
      'Senior web developer with 8 years building WordPress, Shopify, Webflow, Framer, React, and Next.js projects. 87+ jobs shipped, $50K+ earned, 100% Job Success on Upwork.',
    ogImage: '/api/og/team/munish-k',
    ogImageAlt: 'Munish K. — Senior Web Developer'
  },
  hero: {
    enabled: true,
    headlineLines: [
      { text: 'Build.' },
      { text: 'Ship.' },
      { text: 'Scale.' },
      { text: 'Stay fast.', secondary: true }
    ],
    subtitle:
      "I'm Munish. Senior web developer with 8 years building WordPress, WooCommerce, Shopify, Webflow, Framer, and React projects. Whatever the platform, I take it from design to production and keep it fast."
  },
  stats: {
    enabled: true,
    items: [
      { value: '8 yrs', label: 'Building' },
      { value: '87+', label: 'Jobs shipped' },
      { value: '1.8K+', label: 'Hours logged' },
      { value: '100%', label: 'Job success' }
    ]
  },
  capabilities: {
    enabled: true,
    eyebrow: 'What I build.',
    title: 'Sites. Stores. Custom apps.',
    items: [
      {
        title: 'CMS & no-code.',
        description:
          'WordPress, Webflow, Framer, Wix, Squarespace. Custom themes, Figma-to-code, content sites that stay maintainable.'
      },
      {
        title: 'eCommerce.',
        description:
          'Shopify and WooCommerce. Custom themes, headless storefronts, payment gateway integrations, high-traffic stores that stay fast.'
      },
      {
        title: 'Modern stacks.',
        description:
          'React, Next.js, Vue.js, Node.js, MongoDB. Full stack with payments, APIs, and integrations.'
      }
    ]
  },
  about: {
    enabled: true,
    eyebrow: 'About me.',
    title: '8 years. 87+ jobs. 100% job success.',
    description:
      'WordPress, WooCommerce, Shopify, Webflow, Framer, React, Next.js, Vue.js. Custom themes, headless storefronts, Figma-to-code builds, React eCommerce frontends. Design hand-off to production, payment gateways, API integrations, CMS migrations. High-traffic sites stay fast and reliable.',
    ctaLabel: 'View profile',
    ctaUrl: '/team/munish-k'
  },
  newton: {
    enabled: true,
    title1: 'What I build.',
    title2: 'Solo. End-to-end.',
    description:
      'Sites, stores, web apps. Design hand-off → code → launch → keep it fast. Same person the whole way, so nothing slips between handoffs and you always know who shipped what.',
    ctaLabel: 'See case studies',
    ctaUrl: '/projects'
  },
  selectedWork: {
    enabled: true,
    eyebrow: 'Recent work.',
    title: 'Selected case studies.',
    projectSlugs: [
      'karen-lazar-design',
      'oona-home',
      'taste-hub',
      'salty-donut',
      'lynn-milo-pilates',
      'mirai-homes',
      'christmas-loft',
      'beauty-products-framer',
      'rayna-site',
      'evolve-clothing-gallery'
    ],
    viewAllLabel: 'View all case studies'
  },
  featuredHighlights: { enabled: true },
  showreel: { enabled: false },
  aboutGrid: { enabled: false },
  team: { enabled: false },
  blogInsights: { enabled: false },
  clients: { enabled: true, title: "Clients I've worked with." },
  faqs: { enabled: false }
};

const byTenantSlug: Record<string, HomeContent> = {
  techyor,
  rishab,
  munish
};

export function getHomeContent(tenantSlug: string | undefined | null): HomeContent {
  if (!tenantSlug) return techyor;
  return byTenantSlug[tenantSlug] ?? techyor;
}
