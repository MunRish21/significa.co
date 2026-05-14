import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals, url }) => {
  const tenant = locals.tenant;
  const tenantMeta = (tenant?.meta ?? {}) as Record<string, unknown>;
  const shouldIndex = tenantMeta.robotsIndex !== false;

  if (!shouldIndex) {
    const robots = `# ${tenant?.name ?? 'Site'} — robots.txt (noindex during development)\nUser-agent: *\nDisallow: /\n`;
    return new Response(robots, {
      headers: { 'Content-Type': 'text/plain', 'Cache-Control': 'public, max-age=300' }
    });
  }

  const siteOrigin = tenant?.primary_domain
    ? `https://${tenant.primary_domain}`
    : `${url.protocol}//${url.host}`;

  const robots = `# ${tenant?.name ?? 'Techyor'} — robots.txt
# Crawlable: marketing site, hire pages, services, projects, blog, team
# Blocked: admin tooling and form submission endpoints (no SEO value)

User-agent: *
Allow: /
Allow: /hire/
Allow: /services
Allow: /projects/
Allow: /team/
Disallow: /admin
Disallow: /private
Disallow: /form/
Disallow: /preview
Disallow: /exit-preview

Sitemap: ${siteOrigin}/sitemap.xml
`;

  return new Response(robots, {
    headers: { 'Content-Type': 'text/plain', 'Cache-Control': 'public, max-age=3600' }
  });
};
