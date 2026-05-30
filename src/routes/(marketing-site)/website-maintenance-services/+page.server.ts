import { getFeaturedTestimonials } from '$lib/data/testimonials';
import { projectsData } from '$lib/data/projects';
import { BYPASS_TOKEN } from '$env/static/private';

/**
 * Curated, non-thin web/e-commerce projects with live sites — shown as
 * "sites we build and keep running" proof. Order is intentional (mixed
 * Shopify, WooCommerce, WordPress, custom React).
 */
const MAINTENANCE_PROJECT_SLUGS = [
  'monster-fairings',
  'karen-lazar-design',
  'indigenous-treats',
  'b2-hookah',
  'navjot-kaur-pllc',
  'convertbankstatement'
];

export const load = async () => {
  // Featured testimonials feed the visible reviews AND the JSON-LD, so the
  // marked-up review count always matches what's rendered on the page.
  const testimonials = getFeaturedTestimonials();

  const projects = MAINTENANCE_PROJECT_SLUGS.map((slug) =>
    projectsData.find((p) => p.slug === slug)
  )
    .filter((p): p is (typeof projectsData)[number] => Boolean(p))
    .map((p) => ({
      slug: p.slug,
      name: p.name,
      tagline: p.tagline,
      image: p.image,
      services: p.services
    }));

  const ratings = testimonials
    .map((t) => t.rating)
    .filter((r): r is number => typeof r === 'number');

  const reviewEntries = testimonials
    .filter((t) => typeof t.rating === 'number')
    .slice(0, 10)
    .map((t) => ({
      rating: t.rating as number,
      body: t.quote,
      author: t.author,
      date: t.date
    }));

  return { testimonials, ratings, reviewEntries, projects };
};

const getBypassToken = () => {
  if (BYPASS_TOKEN && BYPASS_TOKEN.length >= 32) return BYPASS_TOKEN;
  return '9b47deddf389b647b67158a19fe1013281fd3e7a4086a1c1e4a513b79c051e9f';
};

export const config = {
  isr: {
    expiration: 3600,
    bypassToken: getBypassToken(),
    allowQuery: ['t']
  }
};
