export const GET = async () => {
  const robots = `# techyor.com — robots.txt
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

# Block AI training crawlers that don't respect content licensing.
User-agent: GPTBot
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: CCBot
Disallow: /

Sitemap: https://www.techyor.com/sitemap.xml
`;

  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=3600'
    }
  });
};
