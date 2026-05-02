import { projectsData } from '$lib/data/projects';
import { error } from '@sveltejs/kit';

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/&/g, 'and')
    .replace(/[^\w-]/g, '');
}

export function load({ params }) {
  const { slug } = params;

  // Check if slug matches a project
  const project = projectsData.find(p => p.slug === slug);
  if (project) {
    return { isProject: true, project };
  }

  // Check if slug matches a service or deliverable
  const allServices = new Set<string>();
  const allDeliverables = new Set<string>();

  projectsData.forEach(p => {
    p.services.forEach(s => allServices.add(s));
    p.deliverables.forEach(d => allDeliverables.add(d));
  });

  // Find matching service or deliverable by comparing slugs
  let matchedFilter: string | null = null;
  let filterType: 'service' | 'deliverable' | null = null;

  for (const service of allServices) {
    if (slugify(service) === slug) {
      matchedFilter = service;
      filterType = 'service';
      break;
    }
  }

  if (!matchedFilter) {
    for (const deliverable of allDeliverables) {
      if (slugify(deliverable) === slug) {
        matchedFilter = deliverable;
        filterType = 'deliverable';
        break;
      }
    }
  }

  if (matchedFilter && filterType) {
    const filteredProjects = projectsData.filter(p => {
      if (filterType === 'service') {
        return p.services.includes(matchedFilter);
      } else {
        return p.deliverables.includes(matchedFilter);
      }
    });

    return {
      isProject: false,
      isFilter: true,
      filterType,
      filterName: matchedFilter,
      filteredProjects
    };
  }

  error(404, 'Not found');
}
