export const GET = async () => {
  const rss = `<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0">
  <channel>
    <title>Blog</title>
    <link>http://localhost</link>
    <description>Blog feed</description>
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml'
    }
  });
};
