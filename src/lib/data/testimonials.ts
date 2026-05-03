/**
 * Central testimonials store — single source of truth for client reviews used
 * across the marketing site. Pages render their own visual design but pull
 * content from this file so authoring stays in one place.
 *
 * Surfaces today:
 *   - /team/[slug]                — getTestimonialsByMember()
 *   - /services                   — getFeaturedTestimonials()
 *   - /projects/[...path] filter  — getTestimonialsByService()
 *   - /projects/[slug] case study — getTestimonialsByProject()
 */

import type { ServiceCategory } from './team';

export type TestimonialSource = 'Upwork' | 'LinkedIn' | 'Direct' | 'Email';

export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  authorRole?: string;
  authorAvatar?: string;
  /** 1-5 — rendered as star row in card UIs. */
  rating?: number;
  /** Where the review was originally collected. Drives the trust badge. */
  source: TestimonialSource;
  /** Optional deep-link to the source review (e.g. Upwork job page). */
  sourceUrl?: string;
  /** Slug of the team member this review is about. Undefined = company-wide. */
  memberSlug?: string;
  /** Slug of the project case study this review relates to (optional). */
  projectSlug?: string;
  /** Service categories this review showcases — used by service filter pages. */
  services?: ServiceCategory[];
  /** Title of the engagement on the source platform. */
  projectTitle?: string;
  /** Human-readable date — keep stable since it's shown verbatim. */
  date?: string;
  /** Soft skill tags (Reliable, Clear Communicator, etc.) shown as chips. */
  tags?: string[];
  /** Eligible to surface on home / services / generic listings. */
  featured?: boolean;
};

export const testimonials: Testimonial[] = [
  // ─── Rishab Singla ────────────────────────────────────────────────────────
  {
    id: 'rishab-llm-2025-04',
    quote:
      'Great freelancer — proactive, thinks outside the box, and responds quickly. I hired them for the second time and will definitely hire again for future projects. Thanks!!',
    author: 'Repeat Client',
    source: 'Upwork',
    rating: 5,
    memberSlug: 'rishab-singla',
    projectTitle: 'LLM Setup for Content Creators on Google Colab',
    date: 'April 2025',
    services: ['AI & Machine Learning', 'Python Backend Engineering'],
    tags: ['Reliable', 'Clear Communicator', 'Solution Oriented'],
    featured: true
  },
  {
    id: 'rishab-nodejs-2024-08',
    quote:
      'Great member of a team. Very honest, great communicator, and provides great work. Highly recommend working with Rishab!',
    author: 'Verified Client',
    source: 'Upwork',
    rating: 5,
    memberSlug: 'rishab-singla',
    projectTitle: 'Node.JS Developer — Google Chrome Extensions, Firebase, GitHub',
    date: 'August 2024',
    services: ['Backend Engineering', 'React & Next.js Development'],
    tags: ['Collaborative', 'Clear Communicator', 'Committed to Quality'],
    featured: true
  },
  {
    id: 'rishab-wp-2024-07',
    quote: 'Great work by Rishab, delivered on time and exceeded expectations.',
    author: 'Verified Client',
    source: 'Upwork',
    rating: 5,
    memberSlug: 'rishab-singla',
    projectTitle: 'WordPress Theme Redesign Specialist',
    date: 'July 2024',
    services: ['Web Development & Design'],
    tags: ['Reliable', 'Committed to Quality']
  },

  // ─── Munish K. ────────────────────────────────────────────────────────────
  {
    id: 'munish-shopify-vue-2023-10',
    quote:
      "I'm thrilled to share my strong recommendation for Munish. He's an outstanding freelancer who handled my Shopify, WordPress, and Vue JS projects with expertise. Munish's adaptability, problem-solving skills, and exceptional communication were evident throughout our collaboration. Munish consistently delivered high-quality work, always meeting deadlines and maintaining error-free results. In summary, Munish is a top-tier choice for web development projects. His technical skills, adaptability, and dedication to quality make him an invaluable partner.",
    author: 'Riche D.',
    source: 'Upwork',
    rating: 5,
    memberSlug: 'munish-k',
    projectTitle: 'Long-term Shopify, WordPress & Vue.js engagement',
    date: 'October 2023',
    services: ['E-commerce', 'Web Development & Design', 'React & Next.js Development'],
    tags: ['Committed to Quality', 'Reliable', 'Clear Communicator'],
    featured: true
  },
  {
    id: 'munish-react-ecom-2025-05',
    quote:
      'Munish is a great React developer. He did an excellent job on our e-commerce website. He understands the work very well, writes clean code, and always looks for the best solution.',
    author: 'Verified Client',
    source: 'Upwork',
    rating: 5,
    memberSlug: 'munish-k',
    projectTitle: 'React E-commerce Development',
    date: 'May 2025',
    services: ['React & Next.js Development', 'E-commerce'],
    tags: [
      'Clear Communicator',
      'Committed to Quality',
      'Detail Oriented',
      'Professional',
      'Reliable',
      'Solution Oriented'
    ],
    featured: true
  },
  {
    id: 'munish-perfex-2025-05',
    quote:
      'Munish is an asset to anybody needing high-quality and correctly coded development. He’s a pleasure to work with and he’s always available and communication is very high. Thank you!',
    author: 'Verified Client',
    source: 'Upwork',
    rating: 5,
    memberSlug: 'munish-k',
    projectTitle: 'Perfex CRM Server Setup and Installation',
    date: 'May 2025',
    services: ['Backend Engineering', 'Web Development & Design'],
    tags: ['Committed to Quality', 'Collaborative', 'Clear Communicator', 'Reliable']
  },
  {
    id: 'munish-shopify-rebate-2025-05',
    quote:
      'Munish was exceptional with the work. He straight away understood the project and completed before time. He also went a bit extra and helped me rectify the system.',
    author: 'Verified Client',
    source: 'Upwork',
    rating: 5,
    memberSlug: 'munish-k',
    projectTitle: 'Shopify Rebate Forms Implementation & Cart Processing',
    date: 'May 2025',
    services: ['E-commerce'],
    tags: ['Committed to Quality', 'Clear Communicator', 'Reliable', 'Solution Oriented']
  },
  {
    id: 'munish-booking-app-2025-04',
    quote:
      'Extremely skilled and amazingly talented! He put our workflow together in just a few hours that would have taken someone else days. I would HIGHLY recommend him to anyone.',
    author: 'Verified Client',
    source: 'Upwork',
    rating: 5,
    memberSlug: 'munish-k',
    projectTitle: 'Booking App Developer',
    date: 'April 2025',
    services: ['Web Development & Design', 'React & Next.js Development'],
    tags: ['Committed to Quality'],
    featured: true
  },
  {
    id: 'munish-react-ecom-storefront-2024-03',
    quote:
      "Munish's job performance in creating our React e-commerce storefront was impressive. Taking our designs and working under a challenging deadline, Munish demonstrated exceptional skill and dedication. Not only did he deliver on time, the codebase was clean and easy to extend.",
    author: 'Verified Client',
    source: 'Upwork',
    rating: 5,
    memberSlug: 'munish-k',
    projectTitle: 'React E-commerce Website Front-End Development',
    date: 'March 2024',
    services: ['React & Next.js Development', 'E-commerce'],
    tags: ['Committed to Quality', 'Reliable']
  },
  {
    id: 'munish-shopify-storefront-2024-02',
    quote:
      'Munish did an outstanding job turning our designs into a Shopify storefront. His speed and responsiveness were impressive throughout the entire process. Munish was able to bring our vision to life.',
    author: 'Verified Client',
    source: 'Upwork',
    rating: 5,
    memberSlug: 'munish-k',
    projectTitle: 'Shopify Storefront Developer',
    date: 'February 2024',
    services: ['E-commerce', 'UX & UI Design'],
    tags: ['Committed to Quality', 'Reliable'],
    featured: true
  }
];

export const getTestimonialsByMember = (slug: string): Testimonial[] =>
  testimonials.filter((t) => t.memberSlug === slug);

export const getFeaturedTestimonials = (limit?: number): Testimonial[] => {
  const featured = testimonials.filter((t) => t.featured);
  return typeof limit === 'number' ? featured.slice(0, limit) : featured;
};

export const getTestimonialsByService = (svc: ServiceCategory, limit?: number): Testimonial[] => {
  const matched = testimonials.filter((t) => t.services?.includes(svc));
  return typeof limit === 'number' ? matched.slice(0, limit) : matched;
};

export const getTestimonialsByProject = (projectSlug: string): Testimonial[] =>
  testimonials.filter((t) => t.projectSlug === projectSlug);

export const renderStars = (rating: number): string =>
  '★'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating));
