import { getFeaturedTestimonials } from '$lib/data/testimonials';
import { projectsData } from '$lib/data/projects';
import { BYPASS_TOKEN } from '$env/static/private';

/**
 * Curated WordPress / PHP builds — honest proof for a PHP services page
 * (every one of these is a real WordPress site we shipped).
 */
const PHP_PROJECT_SLUGS = [
  'navjot-kaur-pllc',
  'mirai-homes',
  'podologie-praxis-zug',
  'howdo',
  'thecodewiz',
  'firmable'
];

export const load = async () => {
  // Featured testimonials feed the visible reviews AND the JSON-LD so the
  // marked-up review count matches what's rendered (several mention WordPress
  // and the Perfex/CodeIgniter CRM work — genuine PHP social proof).
  const testimonials = getFeaturedTestimonials();

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

  const projects = PHP_PROJECT_SLUGS.map((slug) => projectsData.find((p) => p.slug === slug))
    .filter((p): p is (typeof projectsData)[number] => Boolean(p))
    .map((p) => ({
      slug: p.slug,
      name: p.name,
      tagline: p.tagline,
      image: p.image,
      services: p.services
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
