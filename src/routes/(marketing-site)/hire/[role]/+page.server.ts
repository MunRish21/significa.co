import { error } from '@sveltejs/kit';
import { getHireRole } from '$lib/data/hire-roles';
import { projectsData } from '$lib/data/projects';
import {
  getTestimonialsByService,
  getFeaturedTestimonials
} from '$lib/data/testimonials';
import type { ServiceCategory } from '$lib/data/team';
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

  const matchingTestimonials = (() => {
    const collected = new Map<string, ReturnType<typeof getTestimonialsByService>[number]>();
    for (const tag of role.relatedServiceTags) {
      const found = getTestimonialsByService(tag as ServiceCategory);
      for (const t of found) collected.set(t.id, t);
    }
    const list = Array.from(collected.values());
    return list.length > 0 ? list.slice(0, 3) : getFeaturedTestimonials(3);
  })();

  return {
    role,
    matchingProjects,
    matchingTestimonials
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
