import { projectsData } from '$lib/data/projects';
import { getActiveTeamMembers } from '$lib/data/team';
import { hireRoles } from '$lib/data/hire-roles';
import { getReadyLocations } from '$lib/data/locations';
import { toSlug } from '$lib/utils/slugify';

const BASE_URL = 'https://www.techyor.com';

const today = new Date().toISOString().split('T')[0];

// Static pages with priority and lastmod
const staticPages = [
  { path: '/', priority: 1.0, changefreq: 'weekly', lastmod: today },
  { path: '/about', priority: 0.8, changefreq: 'monthly', lastmod: today },
  { path: '/services', priority: 0.9, changefreq: 'monthly', lastmod: today },
  { path: '/hire', priority: 0.9, changefreq: 'weekly', lastmod: today },
  { path: '/careers', priority: 0.8, changefreq: 'weekly', lastmod: today },
  { path: '/projects', priority: 0.9, changefreq: 'weekly', lastmod: today },
  { path: '/blog', priority: 0.7, changefreq: 'weekly', lastmod: today },
  { path: '/contact', priority: 0.7, changefreq: 'monthly', lastmod: today },
  { path: '/get-a-quote', priority: 0.7, changefreq: 'monthly', lastmod: today }
];

// Dynamic project pages — use end-of-year of publishedYear so newer projects rank above older
const projectPages = projectsData.map((project) => ({
  path: `/projects/${project.slug}`,
  priority: 0.8,
  changefreq: 'yearly',
  lastmod: `${project.publishedYear}-12-31`
}));

// Extract unique services from projects for service listing pages
const uniqueServices = new Set<string>();
projectsData.forEach((project) => {
  project.services.forEach((service) => {
    uniqueServices.add(service);
  });
});

// Generate service pages with proper URL slugs
const servicePages = Array.from(uniqueServices)
  .sort()
  .map((service) => ({
    path: `/projects/${toSlug(service)}`,
    priority: 0.7,
    changefreq: 'weekly',
    lastmod: today
  }));

// Extract unique deliverables from projects for deliverable listing pages
const uniqueDeliverables = new Set<string>();
projectsData.forEach((project) => {
  project.deliverables.forEach((deliverable) => {
    uniqueDeliverables.add(deliverable);
  });
});

// Generate deliverable pages with proper URL slugs
const deliverablePages = Array.from(uniqueDeliverables)
  .sort()
  .map((deliverable) => ({
    path: `/projects/${toSlug(deliverable)}`,
    priority: 0.7,
    changefreq: 'weekly',
    lastmod: today
  }));

// Team member pages — high priority for SEO
const teamMembers = getActiveTeamMembers();
const teamPages = teamMembers.map((member) => ({
  path: `/team/${member.slug}`,
  priority: 0.85,
  changefreq: 'monthly',
  lastmod: today
}));

// /hire/<role> landing pages — primary lead-gen surface
const hirePages = hireRoles.map((role) => ({
  path: `/hire/${role.slug}`,
  priority: 0.9,
  changefreq: 'weekly',
  lastmod: today
}));

// /hire-developers/<location> location-targeted pages — only ready ones
const locationPages = getReadyLocations().map((location) => ({
  path: `/hire-developers/${location.slug}`,
  priority: 0.9,
  changefreq: 'weekly',
  lastmod: today
}));

// Blog posts — extracted from blog/+page.svelte hardcoded data
const blogPages = [
  { path: '/blog/the-future-of-ecommerce', lastmod: '2024-03-15' },
  { path: '/blog/designing-for-accessibility', lastmod: '2024-03-10' },
  { path: '/blog/mobile-first-development', lastmod: '2024-03-05' },
  { path: '/blog/user-research-best-practices', lastmod: '2024-02-28' },
  { path: '/blog/scaling-your-product', lastmod: '2024-02-20' },
  { path: '/blog/web-performance-optimization', lastmod: '2024-02-15' }
].map((post) => ({
  ...post,
  priority: 0.7,
  changefreq: 'monthly'
}));

const allPages = [
  ...staticPages,
  ...projectPages,
  ...servicePages,
  ...deliverablePages,
  ...teamPages,
  ...hirePages,
  ...locationPages,
  ...blogPages
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${BASE_URL}${page.path}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

export const GET = async () => {
  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    }
  });
};
