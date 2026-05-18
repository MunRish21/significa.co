/**
 * Team member profiles. Used on:
 *   - /about (team grid)
 *   - /team/[slug] (detail pages)
 *   - service / hire-* pages (specialists for that tech)
 *   - project case studies (team involved)
 */

export type TeamTestimonial = {
  quote: string;
  author?: string;
  authorRole?: string;
  authorAvatar?: string;
  rating?: number;
  source?: 'Upwork' | 'LinkedIn' | 'Direct' | 'Email';
  projectTitle?: string;
  date?: string;
  tags?: string[];
};

export type TeamProject = {
  title: string;
  description?: string;
  rating?: number;
  url?: string;
  tags?: string[];
};

/**
 * Slugs of real projects from src/lib/data/projects.ts that this team member
 * has worked on. The slider on the team detail page will hydrate these from
 * projectsData so cards link to /projects/[slug] case studies.
 */
export type FeaturedProjectRef = string;

/**
 * Service category names — must match service strings used in projects.ts so
 * /projects/[service-slug] filter pages resolve correctly when linked from
 * the team detail page.
 */
export type ServiceCategory =
  | 'AI & Machine Learning'
  | 'Backend Engineering'
  | 'Business Services'
  | 'Design & Creative'
  | 'E-commerce'
  | 'Education & Training'
  | 'Financial Services'
  | 'Food & Beverage'
  | 'Health & Wellness'
  | 'Mobile App Development'
  | 'Python Backend Engineering'
  | 'React & Next.js Development'
  | 'Real Estate & Property'
  | 'SaaS Platforms'
  | 'UX & UI Design'
  | 'Voice AI Engineering'
  | 'Web Development & Design';

export type TeamMember = {
  slug: string;
  name: string;
  shortName?: string;
  role: string;
  tagline: string;
  location: string;
  avatar: string;
  coverImage?: string;
  isActive: boolean;
  bio: string;
  longBio?: string;
  yearsExperience: number;
  hourlyRate?: string;
  badges: string[];
  stats: {
    jobSuccess?: string;
    totalEarnings?: string;
    totalJobs?: number;
    totalHours?: number;
  };
  skills: string[];
  primaryServices: ServiceCategory[];
  featuredProjectSlugs: FeaturedProjectRef[];
  languages: { name: string; level: string }[];
  education: {
    school: string;
    degree: string;
    field?: string;
    years: string;
  }[];
  employment: {
    title: string;
    company?: string;
    period: string;
    description?: string;
  }[];
  links: {
    label: string;
    url: string;
    icon?: string;
  }[];
  /** Optional YouTube/Vimeo embed URL shown on the team detail page hero. */
  introVideo?: {
    url: string;
    title?: string;
  };
  /**
   * @deprecated Testimonials now live in src/lib/data/testimonials.ts —
   * use getTestimonialsByMember(slug) instead. Field kept optional for
   * backwards compatibility while pages are migrated.
   */
  testimonials?: TeamTestimonial[];
  /** Optional manual project entries — usually leave empty and use featuredProjectSlugs to pull from projectsData. */
  featuredProjects?: TeamProject[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
};

export const teamMembers: TeamMember[] = [
  {
    slug: 'rishab-singla',
    name: 'Rishab Singla',
    shortName: 'Rishab S.',
    role: 'Full Stack Engineer — React, Next.js & Python',
    tagline: 'Web Apps, AI Tools & Backend APIs',
    location: 'Chandigarh, India',
    avatar: '/assets/team/rishab-singla.jpg',
    isActive: true,
    bio: "I build modern web apps and AI tools end-to-end. React, Next.js, Python, Node.js, LLM integrations. 8 years shipping. Strategy, design, code, deploy — same person the whole way.",
    longBio:
      "8 years building for the web. I build modern web apps and AI tools end-to-end — React, Next.js, Python, Node.js, Laravel. LLM integrations, agents, automations, Chrome extensions, SaaS platforms from scratch.\n\nAlso 8 years of eCommerce experience across Shopify, WooCommerce, and PrestaShop — thousands of SKUs, multi-currency, headless storefronts, payment gateways, AI product visualizations. Same engineer either way: strategy → design → code → ship. Top Rated on Upwork, 100% job success.",
    yearsExperience: 8,
    hourlyRate: '$16/hr',
    badges: ['Top Rated on Upwork', '100% Job Success', 'ID Verified'],
    stats: {
      jobSuccess: '100%',
      totalEarnings: '$7K+',
      totalJobs: 9,
      totalHours: 353
    },
    skills: [
      'React',
      'Next.js',
      'Node.js',
      'Python',
      'TypeScript',
      'JavaScript',
      'Artificial Intelligence',
      'LLM Prompt Engineering',
      'AI Integrations',
      'Google Chrome Extensions',
      'Firebase',
      'API Integrations',
      'Laravel',
      'PHP',
      'CodeIgniter',
      'Web Design',
      'UI/UX Prototyping',
      'CMS Development',
      'Webflow',
      'Framer',
      'Shopify',
      'WooCommerce',
      'WordPress',
      'PrestaShop'
    ],
    primaryServices: [
      'React & Next.js Development',
      'AI & Machine Learning',
      'Python Backend Engineering',
      'SaaS Platforms',
      'Backend Engineering',
      'Voice AI Engineering',
      'Web Development & Design',
      'E-commerce'
    ],
    featuredProjectSlugs: [
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
    languages: [{ name: 'English', level: 'Fluent' }],
    education: [
      {
        school: 'Giani Zail Singh Campus College of Engineering & Technology',
        degree: 'Bachelor of Technology (BTech)',
        field: 'Computer Science',
        years: '2014 – 2018'
      }
    ],
    employment: [
      {
        title: 'Full Stack Engineer',
        company: 'Freelancer',
        period: 'January 2017 – Present',
        description:
          "Modern web apps, AI tools, and backend APIs for clients across the US, UK, Australia, and Europe. React, Next.js, Python, Node.js, Laravel. LLM integrations, SaaS platforms, Chrome extensions. Also long-running eCommerce work on Shopify and WooCommerce."
      }
    ],
    links: [
      {
        label: 'Upwork',
        url: 'https://www.upwork.com/freelancers/~0147df006e8175ba30',
        icon: 'upwork'
      },
      {
        label: 'LinkedIn',
        url: 'https://www.linkedin.com/in/rishab-singla03/',
        icon: 'linkedin'
      },
      { label: 'GitHub', url: 'https://github.com/MunRish21', icon: 'github' }
    ],
    seo: {
      title:
        'Rishab Singla — Full Stack Engineer (React, Next.js, Python) | Top Rated on Upwork',
      description:
        'Hire Rishab Singla — Top Rated full stack engineer with 8+ years building React, Next.js, Node.js, and Python web apps and AI tools. LLM integrations, SaaS platforms, custom APIs. 100% Job Success on Upwork.',
      keywords: [
        'hire React developer',
        'hire Next.js developer',
        'hire Python developer',
        'hire Node.js developer',
        'hire AI developer',
        'LLM integration developer',
        'full stack developer India',
        'SaaS developer Chandigarh',
        'Top Rated Upwork developer'
      ]
    }
  },
  {
    slug: 'munish-k',
    name: 'Munish K.',
    shortName: 'Munish K.',
    role: 'Senior Web Developer',
    tagline: 'WordPress, Shopify, Webflow, React & API Integration',
    location: 'Mohali, India',
    avatar: '/assets/team/munish-k.jpg',
    isActive: true,
    bio: "I build WordPress, WooCommerce, and Shopify sites. Also React, Next.js, Webflow, Framer. Whatever the platform, I can take it from design to production and keep it fast.",
    longBio:
      "8 years building web applications and stores. WordPress, WooCommerce, Shopify, Webflow, Framer, React, Next.js, Vue.js. Custom themes, headless storefronts, Figma-to-code builds, React e-commerce frontends.\n\nI handle the whole stack: design hand-off to production, payment gateways, API integrations, CMS migrations. High-traffic sites stay fast and reliable. Top Rated on Upwork, 100% job success, $50K+ earned across 87+ projects.",
    yearsExperience: 8,
    hourlyRate: '$16/hr',
    badges: ['Top Rated on Upwork', '100% Job Success', 'ID Verified', 'Military Veteran'],
    stats: {
      jobSuccess: '100%',
      totalEarnings: '$50K+',
      totalJobs: 87,
      totalHours: 1854
    },
    skills: [
      'WordPress',
      'WooCommerce',
      'Shopify',
      'Webflow',
      'Framer',
      'Figma',
      'GitHub',
      'Next.js',
      'Node.js',
      'React',
      'React Native',
      'Vue.js',
      'NodeJS Framework',
      'MongoDB',
      'Wix',
      'Squarespace',
      'CSS',
      'HTML',
      'JavaScript',
      'Payment Gateway Integration',
      'Web Design',
      'Web Development'
    ],
    primaryServices: [
      'Web Development & Design',
      'E-commerce',
      'React & Next.js Development',
      'UX & UI Design',
      'Backend Engineering',
      'SaaS Platforms',
      'Design & Creative'
    ],
    featuredProjectSlugs: [
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
    languages: [{ name: 'English', level: 'Fluent' }],
    education: [
      {
        school: 'Panjab University',
        degree: 'Master of Computer Applications (MCA)',
        field: 'Computer Applications',
        years: '2013 – 2016'
      }
    ],
    employment: [
      {
        title: 'PHP Web Developer',
        company: 'Self-employed',
        period: 'January 2017 – Present',
        description:
          'WordPress, Shopify, Webflow, Framer, React projects. Custom themes, headless storefronts, payment integrations, Figma-to-code builds. Clients across the US, UK, EU, and Australia.'
      },
      {
        title: 'Web Developer',
        period: '2015 – 2017',
        description:
          'Maintained content sites. Transitioned to full-time freelancing in 2017.'
      }
    ],
    links: [
      {
        label: 'Upwork',
        url: 'https://www.upwork.com/freelancers/~0122a9e10b8fd61548',
        icon: 'upwork'
      }
    ],
    introVideo: {
      url: 'https://www.youtube-nocookie.com/embed/g3lDsAXxZG8?enablejsapi=1&fs=1',
      title: 'Why Choose Me — Munish K.'
    },
    seo: {
      title:
        'Munish K. — Senior WordPress & Shopify Developer | Top Rated on Upwork',
      description:
        'Hire Munish K. — Top Rated senior web developer with 8+ years building WordPress, Shopify, Webflow, Framer, React, and Next.js projects. $50K+ earned, 87+ jobs, 100% Job Success on Upwork.',
      keywords: [
        'hire WordPress developer',
        'hire Shopify developer',
        'hire Webflow developer',
        'hire Framer developer',
        'hire React developer',
        'hire Next.js developer',
        'Figma to Webflow developer',
        'Figma to Framer developer',
        'senior web developer India',
        'Top Rated Upwork developer'
      ]
    }
  }
];

export const getTeamMember = (slug: string) =>
  teamMembers.find((m) => m.slug === slug);

export const getActiveTeamMembers = () =>
  teamMembers.filter((m) => m.isActive);

export const getTeamMembersByService = (service: ServiceCategory) =>
  teamMembers.filter((m) => m.isActive && m.primaryServices.includes(service));

/**
 * Mirror of the slugify() in /projects/[slug]/+page.server.ts so service /
 * deliverable links from team pages resolve to the same filter route.
 */
export const slugifyService = (name: string): string =>
  name
    .toLowerCase()
    .replace(/&/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .replace(/[^\w-]/g, '');
