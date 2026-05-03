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
    bio: "I help eCommerce store owners build fast, scalable, and fully customized solutions on Shopify and WooCommerce. If your store is slow, breaking due to plugin/app conflicts, or you need custom functionality that existing tools can't handle, I can fix and build it the right way.",
    longBio:
      "With 8+ years of experience as a Full Stack Developer, I specialise in eCommerce engineering — Shopify, WooCommerce, PrestaShop — and the custom apps, APIs, and integrations that hold high-traffic stores together. My work spans complex catalogues with 5,000+ SKUs, multi-currency international commerce, headless storefronts, and AI-powered product visualisation. I'm proficient in PHP, Node.js, React, Next.js, and Python — meaning whether your store needs a frontend rebuild, a payment gateway integration, a custom Shopify app, or a full re-architecture, I can ship it end-to-end. Beyond eCommerce, I build SaaS platforms, AI integrations (LLM setup, custom GPTs, voice AI), and Chrome extensions. I'm Top Rated on Upwork with a 100% Job Success Score.",
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
          "Over 8 years of comprehensive experience as a Full Stack Developer proficient in PHP, WordPress, Shopify, PrestaShop, Node.js, React, Next.js, and Python. Skill set spans the development of robust web applications and APIs using PHP frameworks like Laravel and CodeIgniter, ensuring scalable and maintainable solutions for clients across the UK, Australia, Spain, and Europe."
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
    bio: "Businesses often need reliable development to build, customize, and scale web applications and eCommerce platforms — that's where my experience fits in. With 8+ years of experience, I've worked extensively with WordPress, WooCommerce, and Shopify, alongside modern stacks like React and Next.js, to ship scalable, user-friendly solutions.",
    longBio:
      "I'm a senior web developer with 8+ years of full-stack experience and a track record of $50K+ earned across 87+ Upwork engagements. My core stack spans WordPress, WooCommerce, Shopify, Webflow, Framer, React, Next.js, Vue.js, and Wix — meaning whether you need a custom theme, a headless storefront, a Figma-to-Webflow build, a Framer animation site, or a full React e-commerce front-end, I can take it from design hand-off to production. I'm Top Rated on Upwork with a 100% Job Success Score, and clients return for the combination of clean code, fast communication, and getting the job done before deadline. Beyond the build, I integrate payment gateways, third-party APIs, CMS migrations, and the ongoing optimisation that keeps high-traffic sites fast and reliable.",
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
        title: 'PHP Web Developer | Freelancer',
        company: 'Self-employed',
        period: 'January 2017 – Present',
        description:
          'Building and shipping WordPress, Shopify, Webflow, Framer, and React projects for clients across the US, UK, EU, and Australia. Specialising in custom themes, headless storefronts, payment integrations, and Figma-to-code conversions for design agencies and direct-to-consumer brands.'
      },
      {
        title: 'Web Developer',
        period: '2015 – 2017',
        description:
          'Developed and maintained a content website for around 2 years before transitioning to full-time freelancing.'
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
        'Munish K. — Senior WordPress, Shopify & Webflow Developer | Top Rated on Upwork',
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
