import { getSupabaseAdmin } from '$lib/supabase.server';
import {
  estimateReadingTime,
  excerptFromMarkdown,
  type BlogPost,
  type BlogPostSummary,
  type ComparisonBlogPost,
  type ComparisonTool,
  type FaqItem,
  type UseCasePick
} from './blog';

/* ------------------------------------------------------------------ */
/* normalizers                                                         */
/* ------------------------------------------------------------------ */

function normalizeFaq(value: unknown): FaqItem[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((v) => {
      const o = (v ?? {}) as Record<string, unknown>;
      return {
        question: typeof o.question === 'string' ? o.question : '',
        answer: typeof o.answer === 'string' ? o.answer : ''
      };
    })
    .filter((f) => f.question && f.answer);
}

function normalizeUseCasePicks(value: unknown): UseCasePick[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((v) => {
      const o = (v ?? {}) as Record<string, unknown>;
      return {
        useCase: typeof o.use_case === 'string' ? o.use_case : '',
        tool: typeof o.tool === 'string' ? o.tool : '',
        reason: typeof o.reason === 'string' ? o.reason : ''
      };
    })
    .filter((p) => p.useCase || p.tool);
}

function toIdArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((v): v is string => typeof v === 'string');
}

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((v): v is string => typeof v === 'string')
    .map((s) => s.trim())
    .filter(Boolean);
}

/* ------------------------------------------------------------------ */
/* tools join                                                          */
/* ------------------------------------------------------------------ */

/**
 * Fetch tools by id and return them in the SAME order as `ids`.
 * Postgres `in (...)` does not preserve order, so we reorder in JS.
 */
export async function fetchToolsByIds(ids: string[]): Promise<ComparisonTool[]> {
  if (ids.length === 0) return [];

  const { data, error } = await getSupabaseAdmin()
    .from('tools')
    .select(
      'id, name, slug, best_for, logo_url, website_url, pricing, summary, description, pros, cons'
    )
    .in('id', ids);

  if (error) {
    console.error('[blog] fetchToolsByIds failed', error);
    return [];
  }

  const byId = new Map(
    (data ?? []).map((row) => [
      row.id,
      {
        id: row.id,
        name: row.name,
        slug: row.slug,
        bestFor: row.best_for ?? '',
        logoUrl: row.logo_url ?? '',
        websiteUrl: row.website_url ?? '',
        pricing: row.pricing ?? '',
        summary: row.summary ?? '',
        description: row.description ?? '',
        pros: toStringArray(row.pros),
        cons: toStringArray(row.cons)
      } satisfies ComparisonTool
    ])
  );

  // Preserve the curated order from comparison_tool_ids; drop any missing ids.
  return ids.map((id) => byId.get(id)).filter((t): t is ComparisonTool => Boolean(t));
}

/* ------------------------------------------------------------------ */
/* posts                                                               */
/* ------------------------------------------------------------------ */

/** Published posts for the /blog index, newest first. */
export async function fetchPublishedBlogPostSummaries(): Promise<BlogPostSummary[]> {
  const { data, error } = await getSupabaseAdmin()
    .from('comparison_posts')
    .select('slug, title, topic, introduction, hero_image_url, created_at')
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[blog] fetchPublishedBlogPostSummaries failed', error);
    return [];
  }

  return (data ?? [])
    .filter((row) => row.slug)
    .map((row) => ({
      type: 'comparison' as const,
      slug: row.slug as string,
      title: row.title ?? 'Untitled',
      excerpt: excerptFromMarkdown(row.introduction),
      date: row.created_at,
      topic: row.topic ?? undefined,
      heroImageUrl: row.hero_image_url ?? undefined
    }));
}

/** Load a single published post by slug, with its tools resolved. */
export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await getSupabaseAdmin()
    .from('comparison_posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle();

  if (error) {
    console.error('[blog] fetchBlogPostBySlug failed', error);
    return null;
  }
  if (!data) return null;

  const tools = await fetchToolsByIds(toIdArray(data.comparison_tool_ids));

  const post: ComparisonBlogPost = {
    type: 'comparison',
    slug: data.slug ?? slug,
    title: data.title ?? 'Untitled',
    topic: data.topic ?? '',
    heroImageUrl: data.hero_image_url ?? '',
    introduction: data.introduction ?? '',
    rankingCriteria: data.ranking_criteria ?? '',
    verdict: data.verdict ?? '',
    faq: normalizeFaq(data.faq),
    useCasePicks: normalizeUseCasePicks(data.use_case_picks),
    tools,
    metaTitle: data.meta_title ?? data.title ?? 'Untitled',
    metaDescription: data.meta_description ?? excerptFromMarkdown(data.introduction),
    date: data.created_at,
    updatedAt: data.updated_at
  };

  return post;
}

/** Reading-time helper re-exported so routes can compute from a loaded post. */
export function readingTimeForComparison(post: ComparisonBlogPost): number {
  return estimateReadingTime(
    [post.introduction, post.rankingCriteria, post.verdict, ...post.faq.map((f) => f.answer)].join(
      ' '
    )
  );
}
