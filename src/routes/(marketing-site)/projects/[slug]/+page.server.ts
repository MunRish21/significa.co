import { error } from '@sveltejs/kit';
import { projectsData } from '$lib/data/projects';
import { toSlug } from '$lib/utils/slugify';
import {
  testimonials,
  getTestimonialsByService,
  getTestimonialsByProject
} from '$lib/data/testimonials';
import type { ServiceCategory } from '$lib/data/team';

export function load({ params }) {
  const { slug } = params;

  // ─── 1. Project case-study page ────────────────────────────────────
  const project = projectsData.find((p) => p.slug === slug);
  if (project) {
    const projectTestimonials = getTestimonialsByProject(project.slug);
    const ratings = projectTestimonials
      .map((t) => t.rating)
      .filter((r): r is number => typeof r === 'number');
    const reviewEntries = projectTestimonials
      .filter((t) => typeof t.rating === 'number')
      .slice(0, 10)
      .map((t) => ({
        rating: t.rating as number,
        body: t.quote,
        author: t.author,
        date: t.date
      }));
    return {
      isProject: true,
      project,
      ratings,
      reviewEntries
    };
  }

  // ─── 2. Filter (service or deliverable) page ───────────────────────
  const allServices = new Set<string>();
  const allDeliverables = new Set<string>();
  projectsData.forEach((p) => {
    p.services.forEach((s) => allServices.add(s));
    p.deliverables.forEach((d) => allDeliverables.add(d));
  });

  let matchedFilter: string | null = null;
  let filterType: 'service' | 'deliverable' | null = null;

  for (const service of allServices) {
    if (toSlug(service) === slug) {
      matchedFilter = service;
      filterType = 'service';
      break;
    }
  }
  if (!matchedFilter) {
    for (const deliverable of allDeliverables) {
      if (toSlug(deliverable) === slug) {
        matchedFilter = deliverable;
        filterType = 'deliverable';
        break;
      }
    }
  }

  if (matchedFilter && filterType) {
    const filteredProjects = projectsData.filter((p) =>
      filterType === 'service'
        ? p.services.some((s) => s.toLowerCase() === matchedFilter!.toLowerCase())
        : p.deliverables.some((d) => d.toLowerCase() === matchedFilter!.toLowerCase())
    );

    // Filter testimonials match either service tag or any project that matched.
    const matchedSlugs = new Set(filteredProjects.map((p) => p.slug));
    const filterTestimonials = testimonials.filter(
      (t) =>
        (filterType === 'service' &&
          t.services?.some(
            (s) => (s as string).toLowerCase() === matchedFilter!.toLowerCase()
          )) ||
        (t.projectSlug && matchedSlugs.has(t.projectSlug))
    );
    const ratings = filterTestimonials
      .map((t) => t.rating)
      .filter((r): r is number => typeof r === 'number');
    const reviewEntries = filterTestimonials
      .filter((t) => typeof t.rating === 'number')
      .slice(0, 10)
      .map((t) => ({
        rating: t.rating as number,
        body: t.quote,
        author: t.author,
        date: t.date
      }));

    return {
      isProject: false,
      isFilter: true,
      filterType,
      filterName: matchedFilter,
      filteredProjects,
      ratings,
      reviewEntries
    };
  }

  error(404, 'Not found');
}
