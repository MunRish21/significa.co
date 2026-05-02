import { projectsData } from '$lib/data/projects';

const BASE_URL = 'https://www.techyor.com';

const today = new Date().toISOString().split('T')[0];

// Helper function to generate URL-safe slugs
function toSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/&/g, 'and')
    .replace(/[^\w-]/g, '');
}

// Static pages with priority and lastmod
const staticPages = [
  { path: '/', priority: 1.0, changefreq: 'weekly', lastmod: today },
  { path: '/about', priority: 0.8, changefreq: 'monthly', lastmod: today },
  { path: '/services', priority: 0.9, changefreq: 'monthly', lastmod: today },
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

const allPages = [...staticPages, ...projectPages, ...servicePages, ...deliverablePages];

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
