/**
 * Client-safe blog types. A "blog post" is a discriminated union keyed by
 * `type`. The first (and currently only) type is `comparison`, sourced from
 * the `comparison_posts` table. Future post types (e.g. a plain `standard`
 * post) add a new member to the union and a new branch in the detail page.
 */

export type BlogPostType = 'comparison';

export type FaqItem = {
  question: string;
  answer: string;
};

export type UseCasePick = {
  useCase: string;
  tool: string; // tool name (string), not an id
  reason: string;
};

/**
 * A tool resolved from `comparison_tool_ids` → `public.tools`. Carries the full
 * detail (summary, description, pros, cons) so the comparison post can render
 * each tool in depth inline — there is no separate tool page.
 */
export type ComparisonTool = {
  id: string;
  name: string;
  slug: string;
  bestFor: string;
  logoUrl: string;
  previewImageUrl: string;
  websiteUrl: string;
  pricing: string;
  summary: string;
  description: string;
  pros: string[];
  cons: string[];
};

/** Listing-card shape shared by every post type. */
export type BlogPostSummary = {
  type: BlogPostType;
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  topic?: string;
  heroImageUrl?: string;
};

export type ComparisonBlogPost = {
  type: 'comparison';
  slug: string;
  title: string;
  topic: string;
  heroImageUrl: string;
  introduction: string;
  rankingCriteria: string;
  verdict: string;
  faq: FaqItem[];
  useCasePicks: UseCasePick[];
  tools: ComparisonTool[];
  metaTitle: string;
  metaDescription: string;
  date: string; // ISO (created_at)
  updatedAt: string; // ISO (updated_at)
};

export type BlogPost = ComparisonBlogPost;

/** Rough reading-time estimate (~200 wpm), min 1 minute. */
export function estimateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/**
 * Turn a Markdown string into a short plain-text excerpt: first non-empty
 * paragraph with the most common inline Markdown markers stripped.
 */
export function excerptFromMarkdown(markdown: string | null | undefined, maxLen = 200): string {
  if (!markdown) return '';
  const firstPara = markdown
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .find((p) => p && !p.startsWith('#'));
  if (!firstPara) return '';
  const plain = firstPara
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1') // links → text
    .replace(/[*_`>#]/g, '') // inline markers
    .replace(/\s+/g, ' ')
    .trim();
  return plain.length > maxLen ? `${plain.slice(0, maxLen - 1).trimEnd()}…` : plain;
}
