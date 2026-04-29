import { projectsData } from '$lib/data/projects';

const BASE_URL = 'https://www.techyor.com';

// Static pages with priority
const staticPages = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/about', priority: 0.8, changefreq: 'monthly' },
  { path: '/services', priority: 0.9, changefreq: 'monthly' },
  { path: '/careers', priority: 0.8, changefreq: 'weekly' },
  { path: '/projects', priority: 0.9, changefreq: 'weekly' },
  { path: '/blog', priority: 0.7, changefreq: 'daily' },
  { path: '/contact', priority: 0.7, changefreq: 'monthly' },
  { path: '/get-a-quote', priority: 0.7, changefreq: 'monthly' }
];

// Dynamic project pages
const projectPages = projectsData.map((project) => ({
  path: `/projects/${project.slug}`,
  priority: 0.8,
  changefreq: 'monthly',
  lastmod: new Date(project.publishedYear, 0, 1).toISOString().split('T')[0]
}));

const allPages = [...staticPages, ...projectPages];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${BASE_URL}${page.path}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>${
      page.lastmod ? `\n    <lastmod>${page.lastmod}</lastmod>` : ''
    }
  </url>`
  )
  .join('\n')}
</urlset>`;

export const GET = async () => {
  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml'
    }
  });
};
