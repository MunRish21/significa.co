/**
 * Canonical slug derivation used for /projects/<service-or-deliverable>
 * filter URLs. Must match between:
 *   - sitemap.xml generator
 *   - /projects/[slug] page-server load (filter resolver)
 *   - /api/og/projects-filter/[slug] OG image renderer
 *
 * Rules: lowercase, spaces→dashes, "&"→"and", strip non-word chars,
 * collapse double dashes.
 */
export function toSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/&/g, 'and')
    .replace(/[^\w-]/g, '')
    .replace(/--+/g, '-');
}
