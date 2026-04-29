export const GET = async () => {
  const robots = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /private
Disallow: /form/
Crawl-delay: 1

Sitemap: https://www.techyor.com/sitemap.xml`;

  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain'
    }
  });
};
