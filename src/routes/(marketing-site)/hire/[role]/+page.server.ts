import { error } from '@sveltejs/kit';
import { getHireRole } from '$lib/data/hire-roles';
import { projectsData } from '$lib/data/projects';
import {
  getTestimonialsByService,
  getFeaturedTestimonials
} from '$lib/data/testimonials';
import { getActiveTeamMembers, type ServiceCategory } from '$lib/data/team';
import { BYPASS_TOKEN } from '$env/static/private';

export const load = async ({ params }) => {
  const role = getHireRole(params.role);
  if (!role) throw error(404, `Hire page not found for /${params.role}`);

  const tagSet = new Set(role.relatedServiceTags.map((t) => t.toLowerCase()));

  const matchingProjects = projectsData
    .filter((project) => {
      const services = (project.services || []).map((s) => s.toLowerCase());
      const deliverables = (project.deliverables || []).map((d) => d.toLowerCase());
      return services.some((s) => tagSet.has(s)) || deliverables.some((d) => tagSet.has(d));
    })
    .slice(0, 6)
    .map((project) => ({
      slug: project.slug,
      name: project.name,
      tagline: project.tagline,
      image: project.image,
      services: project.services,
      deliverables: project.deliverables
    }));

  const allMatchingTestimonials = (() => {
    const collected = new Map<string, ReturnType<typeof getTestimonialsByService>[number]>();
    for (const tag of role.relatedServiceTags) {
      const found = getTestimonialsByService(tag as ServiceCategory);
      for (const t of found) collected.set(t.id, t);
    }
    return Array.from(collected.values());
  })();

  const matchingTestimonials =
    allMatchingTestimonials.length > 0
      ? allMatchingTestimonials.slice(0, 3)
      : getFeaturedTestimonials(3);

  /** Aggregate ratings drawn from ALL matching testimonials (not just the displayed 3). */
  const ratings = allMatchingTestimonials
    .map((t) => t.rating)
    .filter((r): r is number => typeof r === 'number');

  /** Per-Review entries for Service.review JSON-LD (cap at 10 to keep payload reasonable). */
  const reviewEntries = allMatchingTestimonials
    .filter((t) => typeof t.rating === 'number')
    .slice(0, 10)
    .map((t) => ({
      rating: t.rating as number,
      body: t.quote,
      author: t.author,
      date: t.date
    }));

  /** Active team members shaped for ItemList of Person JSON-LD. */
  const teamSchemaMembers = getActiveTeamMembers().map((m) => ({
    name: m.name,
    jobTitle: m.role,
    description: m.tagline,
    image: m.avatar,
    url: `/team/${m.slug}`,
    sameAs: m.links.map((l) => l.url)
  }));

  return {
    role,
    matchingProjects,
    matchingTestimonials,
    ratings,
    reviewEntries,
    teamSchemaMembers
  };
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
