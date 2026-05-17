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
    role: 'Shopify & WooCommerce Developer',
    tagline: 'Custom Apps, API Integrations & Full Stack Development',
    location: 'Chandigarh, India',
    avatar: '/assets/team/rishab-singla.jpg',
    isActive: true,
    bio: "I build and fix Shopify and WooCommerce stores. Slow stores, broken integrations, missing features — I handle all of it. PHP, Node.js, React, Next.js, Python. Whatever the problem is, I can ship the solution.",
    longBio:
      "8 years building eCommerce. Shopify, WooCommerce, PrestaShop. I've worked on stores with thousands of SKUs, multi-currency setups, headless storefronts, and AI product visualizations. I also build SaaS platforms, AI integrations, and Chrome extensions.\n\nStacks: PHP, Laravel, Node.js, React, Next.js, Python. Payment gateways, APIs, migrations, custom apps — I build it all end-to-end. Top Rated on Upwork, 100% job success.",
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
      'Shopify',
      'WooCommerce',
      'PrestaShop',
      'PHP',
      'Laravel',
      'CodeIgniter',
      'Node.js',
      'Next.js',
      'React',
      'Python',
      'WordPress',
      'JavaScript',
      'TypeScript',
      'Web Design',
      'CMS Development',
      'Website & CMS Bug Fix',
      'UI/UX Prototyping',
      'Visual Communication',
      'Webflow',
      'Framer',
      'Artificial Intelligence',
      'LLM Prompt Engineering',
      'Google Chrome Extensions',
      'Firebase',
      'API Integrations'
    ],
    primaryServices: [
      'E-commerce',
      'Web Development & Design',
      'React & Next.js Development',
      'Python Backend Engineering',
      'AI & Machine Learning',
      'SaaS Platforms',
      'Backend Engineering',
      'Voice AI Engineering'
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
        title: 'Full Stack Developer',
        company: 'Freelancer',
        period: 'January 2017 – Present',
        description:
          "Shopify, WooCommerce, and custom full-stack builds for clients across the UK, Australia, and Europe. Specializing in eCommerce, APIs, and SaaS platforms. PHP, Node.js, React, Python."
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
        'Rishab Singla — Shopify & WooCommerce Developer | Top Rated on Upwork',
      description:
        'Hire Rishab Singla — Top Rated Shopify & WooCommerce developer with 8+ years of full stack experience in PHP, React, Next.js, Python, and AI integrations. 100% Job Success on Upwork.',
      keywords: [
        'hire Shopify developer',
        'hire WooCommerce developer',
        'hire React developer',
        'hire Next.js developer',
        'full stack developer India',
        'eCommerce developer Chandigarh',
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
