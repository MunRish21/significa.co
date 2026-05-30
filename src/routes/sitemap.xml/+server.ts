import { projectsData } from '$lib/data/projects';
import { getActiveTeamMembers } from '$lib/data/team';
import { hireRoles } from '$lib/data/hire-roles';
import { getReadyLocations } from '$lib/data/locations';

const BASE_URL = 'https://www.techyor.com';

const today = new Date().toISOString().split('T')[0];

// Static pages with priority and lastmod
const staticPages = [
  { path: '/', priority: 1.0, changefreq: 'weekly', lastmod: today },
  { path: '/about', priority: 0.8, changefreq: 'monthly', lastmod: today },
  { path: '/services', priority: 0.9, changefreq: 'monthly', lastmod: today },
  { path: '/website-maintenance-services', priority: 0.9, changefreq: 'weekly', lastmod: today },
  { path: '/php-development-services', priority: 0.9, changefreq: 'weekly', lastmod: today },
  { path: '/hire', priority: 0.9, changefreq: 'weekly', lastmod: today },
  { path: '/careers', priority: 0.8, changefreq: 'weekly', lastmod: today },
  { path: '/projects', priority: 0.9, changefreq: 'weekly', lastmod: today },
  { path: '/contact', priority: 0.7, changefreq: 'monthly', lastmod: today },
  { path: '/get-a-quote', priority: 0.7, changefreq: 'monthly', lastmod: today }
];

// Project slugs flagged for thin content (intro < 50 words or missing).
// Keep in sync with the same list in projects/[slug]/+page.svelte.
// Excluded from the sitemap; the page itself ships noindex,follow.
// Remove a slug once its intro is expanded past ~50 words with real
// problem / solution / stack / outcome detail.
const THIN_CONTENT_PROJECT_SLUGS = new Set([
  '260-sample-sale',
  'adt-control-android',
  'adt-control-ios',
  'agensip-styleest',
  'aimusicservice',
  'allbirds',
  'american-trucks',
  'arbys-fast-food-android',
  'arbys-fast-food-ios',
  'beauty-design',
  'beauty-products-framer',
  'buffalo-wild-wings-android',
  'buffalo-wild-wings-ios',
  'christmas-loft',
  'coore',
  'dakwala',
  'dave-holloway',
  'design-essentials',
  'dopple-press',
  'emaths-world',
  'evolve-clothing-gallery',
  'firmable',
  'gisteo',
  'guard-dog-security',
  'guitar-templates',
  'havalink',
  'hilink-travel-platform',
  'honey-by-kait',
  'hornsby-beekeeping',
  'howdo',
  'ichor-bio',
  'jacob-alexander',
  'jb-tools',
  'lineleader',
  'lynn-milo-pilates',
  'mane-ethical',
  'medela-family-android',
  'medela-family-ios',
  'meintrade',
  'mirai-homes',
  'mirror-media-marketing',
  'oona-home',
  'plant-doctor',
  'podologie-praxis-zug',
  'rayna-site',
  'rea-power',
  'salty-donut',
  'shark-leathers',
  'shin-jewelers',
  'surfboard-central-android',
  'surfboard-central-ios',
  'taste-hub',
  'thecodewiz',
  'vaisakhhi-haria',
  'woolf-university'
]);

// Dynamic project pages — exclude thin-content slugs (those are noindexed)
const projectPages = projectsData
  .filter((project) => !THIN_CONTENT_PROJECT_SLUGS.has(project.slug))
  .map((project) => ({
    path: `/projects/${project.slug}`,
    priority: 0.8,
    changefreq: 'yearly',
    lastmod: `${project.publishedYear}-12-31`
  }));

// Filter pages (/projects/<service>, /projects/<deliverable>) intentionally
// excluded — they render as noindex,follow aggregation views. Buyer-intent
// traffic is funneled to /hire/<role> pages instead.

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

const allPages = [
  ...staticPages,
  ...projectPages,
  ...teamPages,
  ...hirePages,
  ...locationPages
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
