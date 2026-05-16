import { error } from '@sveltejs/kit';
import { getLocation } from '$lib/data/locations';
import { projectsData } from '$lib/data/projects';
import { getFeaturedTestimonials } from '$lib/data/testimonials';
import { getActiveTeamMembers } from '$lib/data/team';
import { hireRoles } from '$lib/data/hire-roles';
import { BYPASS_TOKEN } from '$env/static/private';

export const load = async ({ params, locals }) => {
  const isAgency = (locals.tenant?.meta as Record<string, unknown> | undefined)?.isAgency === true;
  if (!isAgency) throw error(404, 'Not found');

  const location = getLocation(params.location);
  if (!location || !location.ready) throw error(404, 'Location page not yet available');

  /** Resolve case-study slugs into full project objects (skip any that don't exist). */
  const caseStudies = location.caseStudies
    .map(({ projectSlug, angle }) => {
      const project = projectsData.find((p) => p.slug === projectSlug);
      return project ? { project, angle } : null;
    })
    .filter((entry): entry is { project: (typeof projectsData)[number]; angle: string } =>
      Boolean(entry)
    )
    .slice(0, 6);

  /** Featured testimonials — for now, treat all featured ones as US/UK fair-game per user. */
  const featuredTestimonials = getFeaturedTestimonials();
  const ratings = featuredTestimonials
    .map((t) => t.rating)
    .filter((r): r is number => typeof r === 'number');
  const reviewEntries = featuredTestimonials
    .filter((t) => typeof t.rating === 'number')
    .slice(0, 10)
    .map((t) => ({
      rating: t.rating as number,
      body: t.quote,
      author: t.author,
      date: t.date
    }));

  /** All 25 hire roles, grouped, for the cross-link grid. */
  const roleGroups = [
    {
      title: 'Front-end',
      slugs: ['react-developer', 'nextjs-developer', 'typescript-developer', 'frontend-developer', 'web-developer']
    },
    {
      title: 'Mobile',
      slugs: ['react-native-developer', 'ios-developer', 'android-developer', 'flutter-developer', 'mobile-app-developer']
    },
    {
      title: 'Back-end',
      slugs: ['nodejs-developer', 'python-developer', 'django-developer', 'fastapi-developer', 'backend-developer', 'full-stack-developer']
    },
    {
      title: 'AI & Voice',
      slugs: ['ai-engineer', 'llm-developer', 'voice-ai-developer']
    },
    {
      title: 'E-commerce & CMS',
      slugs: ['shopify-developer', 'woocommerce-developer', 'wordpress-developer', 'headless-cms-developer']
    },
    {
      title: 'Platform',
      slugs: ['saas-developer', 'devops-engineer']
    }
  ].map((group) => ({
    title: group.title,
    roles: group.slugs
      .map((slug) => hireRoles.find((r) => r.slug === slug))
      .filter((r): r is (typeof hireRoles)[number] => Boolean(r))
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
    location,
    caseStudies,
    featuredTestimonials,
    ratings,
    reviewEntries,
    roleGroups,
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
