# Techyor — SEO Action Plan

**Generated:** 2026-05-14 | **Source:** `FULL-AUDIT-REPORT.md` + per-area reports in `/tmp/techyor-audit/`

Effort estimates assume one engineer + one content owner. ICP impact rated against the primary ICP (bootstrapped US founder, $3K–$20K).

---

## 🚨 Critical — this week (1–3 days total)

### C1. Ship real content on `/hire` and `/team/munish`
- **What:** both currently render with title `4🥚4` and Significa boilerplate. Replace with proper title, description, H1, body, JSON-LD.
- **Files:**
  - `/team/munish`: `src/lib/data/team.ts` already has the correct SEO title — the rendering path is dropping it. Check `src/routes/(marketing-site)/team/[slug]/+page.svelte`.
  - `/hire`: `src/routes/(marketing-site)/hire/[role]/` has children but the index `/hire/+page.svelte` is missing/broken. Build an index page that lists all 21 roles with intro copy.
- **Schema:** add Person (Munish) mirroring the Rishab pattern. Add Organization + BreadcrumbList + FAQPage to `/hire`.
- **Effort:** 0.5 day per page = 1 day total
- **ICP impact:** CRITICAL — trust-kill if a founder lands here mid-evaluation

### C2. Unblock AI search crawlers in `static/robots.txt`
- **What:** delete the five `User-agent: GPTBot/Google-Extended/anthropic-ai/ClaudeBot/CCBot` + `Disallow: /` blocks.
- **File:** `static/robots.txt`
- **Effort:** 5 minutes
- **ICP impact:** CRITICAL — moves AI citation possibility from 0% to candidate

### C3. Rewrite `static/llms.txt` body
- **What:** replace "Techyor is a design-led digital agency based in Porto, Portugal" with accurate Techyor positioning. Suggested:
  ```
  # Techyor — small digital product studio
  # We build websites, web apps, mobile apps, AI tools, and automation for
  # founders and product teams in the US, UK, EU, and Australia.
  # India-based team. English-first communication. 8+ years, 80+ shipped products.
  ```
- **File:** `static/llms.txt`
- **Effort:** 15 minutes
- **ICP impact:** HIGH — prevents wrong brand metadata reaching LLMs

### C4. Fix sitemap URL in `static/robots.txt`
- **What:** `Sitemap: https://techyor.com/sitemap.xml` → `Sitemap: https://www.techyor.com/sitemap.xml`
- **File:** `static/robots.txt`
- **Effort:** 1 minute
- **ICP impact:** MEDIUM — fixes a Googlebot discovery gap

### C5. Add `/blog/[slug]` URLs to the sitemap
- **What:** enumerate all published blog posts in the sitemap generator. Use real publish dates as `lastmod`.
- **File:** wherever sitemap is generated — likely `src/routes/sitemap.xml/+server.ts` or similar. (Search for `sitemap` and `urlset`.)
- **Effort:** 2–3 hours including verifying each post URL
- **ICP impact:** HIGH — unlocks indexing of the content investment from the editorial calendar

**Critical-tier total:** ~1.5 days engineering, ships before any optimization work.

---

## 🔥 High — this month

### H1. Add pricing transparency to `/services` and `/get-a-quote`
- **What:** 3-tier "Investment" section. Marketing Site $3K–$8K / Web App MVP $10K–$35K / Full Product $35K+. Same honest voice used elsewhere.
- **Files:** `src/routes/(marketing-site)/services/+page.svelte`, `src/routes/(marketing-site)/get-a-quote/+page.svelte`
- **Effort:** 1–2 days
- **ICP impact:** HIGH — pricing transparency is table-stakes for the founder ICP; absence reads as red-flag

### H2. Surface NDA + code-ownership trust as a visible badge
- **What:** "NDA before first call. You own all code and IP on delivery." Above-fold on `/services`, `/hire-developers/united-states`, `/get-a-quote`.
- **Files:** the three page templates plus a reusable `TrustBadge` component.
- **Effort:** 0.5 day
- **ICP impact:** HIGH — directly addresses the founder's #1 anxiety

### H3. Replace soft H1s where SEO matters
- **What:**
  - `/services` H1 "How we build." → e.g. "Design and development services for founders building V1." (keep "How we build." as eyebrow/section title)
  - `/about` H1 "About us." → "A small product studio building for founders in the US, UK, Switzerland, and Australia."
- **Files:** `src/routes/(marketing-site)/services/+page.svelte`, `src/routes/(marketing-site)/about/+page.svelte`
- **Effort:** 0.25 day each
- **ICP impact:** MEDIUM — adds keyword weight without breaking voice

### H4. Audit and decide on 28 `/projects/[filter-slug]` filter pages
- **What:** if these are thin filter views (project grid + category swap, no unique intro): `<meta name="robots" content="noindex">` them and remove from sitemap. If they carry real unique copy: leave them but gate future additions on a 60%+ uniqueness threshold.
- **Files:** `src/routes/(marketing-site)/projects/[...path]/+page.svelte` + the sitemap generator
- **Effort:** 0.5 day to inspect + 0.5 day to implement decision
- **ICP impact:** MEDIUM — protects against Helpful Content Update penalty risk as portfolio grows

### H5. Consolidate `/contact` and `/get-a-quote`
- **What:** make `/get-a-quote` the primary conversion CTA (process strip, social proof, qualified form). Make `/contact` a sparse info page (address, phone — move +91 below fold or behind a "international" toggle).
- **Files:** `src/routes/(marketing-site)/contact/+page.svelte`, `src/routes/(marketing-site)/get-a-quote/+page.svelte`
- **Effort:** 1 day
- **ICP impact:** MEDIUM-HIGH — eliminates intent-splitting and softens the offshore-risk signal

### H6. Add lead-qualification fields to the contact/quote form
- **What:** two optional fields — "Project type" (Marketing Site / Web App / Mobile App / AI Tool / Other) and "Budget range" (Under $5K / $5K–$15K / $15K–$50K / $50K+).
- **Files:** `src/components/contact-form.svelte` + form submission handler (Notion API).
- **Effort:** 0.5 day
- **ICP impact:** MEDIUM — improves founder confidence + lets you route or auto-respond by tier

### H7. Reconcile `$16/hr` rate on team profiles vs studio positioning
- **What:** either remove the hourly rate from team profiles entirely, or add a context note: "Studio engagements are priced project- or retainer-based; this hourly rate reflects individual contractor engagements via Upwork."
- **Files:** `src/routes/(marketing-site)/team/[slug]/+page.svelte` (likely) + the data file rendering rates.
- **Effort:** 0.25 day
- **ICP impact:** MEDIUM — preserves Upwork-funnel value while removing studio-vs-freelancer confusion

---

## 📈 Medium — this quarter

### M1. Add Article schema to `/blog/[slug]` posts
- **File:** blog post template + `src/lib/utils/schema.ts` (add `generateArticleSchema`)
- **Effort:** 0.5 day
- **ICP impact:** MEDIUM — unlocks blog post rich results

### M2. Add VideoObject schema for homepage showreel
- **File:** `src/routes/(marketing-site)/+page.svelte` or schema utility
- **Effort:** 0.5 day
- **ICP impact:** LOW-MEDIUM — Google Video indexing

### M3. Add per-page "AI-friendly answer card"
- **What:** a bolded one-sentence answer + 3-row comparison table + "Quick facts" box on each high-value page (home, /services, /hire/[role], /hire-developers/[location]). Mark with `data-speakable`.
- **Effort:** 1 day per page-type × 4 = 4 days
- **ICP impact:** HIGH for AI search citation rate post-unblock

### M4. Create `/services/mvp-development` (or "Building your V1?" section)
- **What:** dedicated page-type match for the "MVP development company for startup" search intent. Stage-specific language, timeline estimate, budget range.
- **Effort:** 2–3 days
- **ICP impact:** HIGH — captures highest-volume founder query

### M5. Publish 1 authority piece targeting NDA / code-ownership intent
- **What:** blog post or `/trust/` page titled "Who owns the code? How Techyor handles IP, NDAs, and confidentiality." Content already exists in FAQs.
- **Effort:** 1 day
- **ICP impact:** MEDIUM — captures awareness-stage founder

### M6. Add outcome metrics to top case studies
- **What:** for the 5–10 most-featured projects, add: client stage at start, timeline to launch, one quantified outcome.
- **Files:** `src/lib/data/projects.ts` (data) + case study template
- **Effort:** 2 days (mostly content work)
- **ICP impact:** HIGH — case studies are an investment that compounds across all marketing channels

### M7. Limit ProfessionalService schema to relevant pages
- **What:** drop ProfessionalService from `/about`, `/blog`, `/careers`, `/team/[slug]`, `/projects/*`. Keep on `/`, `/services`, `/hire`, `/hire/[role]`, `/hire-developers/[location]`.
- **File:** `src/lib/utils/schema.ts` + page-level schema invocations
- **Effort:** 0.5 day
- **ICP impact:** LOW — schema cleanliness, no direct ranking effect

### M8. Update `lastmod` in sitemap to per-page real dates
- **What:** derive `lastmod` from Storyblok CMS publish date or `git log -1 --format=%aI -- <file>`. Stop batch-stamping today's date on every page.
- **Files:** sitemap generator
- **Effort:** 0.5 day
- **ICP impact:** LOW — crawl efficiency, not ranking

### M9. Strip `<priority>` and `<changefreq>` from sitemap
- **What:** Google ignores both. Removing cuts file size ~35%.
- **File:** sitemap generator
- **Effort:** 0.25 day
- **ICP impact:** LOW

### M10. Default `<meta name="robots">` to `noindex` for new routes
- **What:** flip the default in the SEO utility so accidentally-shipped pages don't get indexed. Require explicit `index: true` opt-in.
- **File:** `src/lib/utils/seo.ts` (or wherever robots meta is set)
- **Effort:** 0.5 day
- **ICP impact:** PREVENTIVE — stops the next /hire-style placeholder bug from being indexed

---

## 🌱 Low — backlog

### L1. Switch non-www → www redirect from 307 to 308
- 307 (temporary) works but 308 (permanent) is the canonical signal.

### L2. Tighten cache-control on truly-static pages
- `/about`, `/careers`, `/services` could use longer cache + stale-while-revalidate for CWV.

### L3. Add `@id` linking across schema graphs
- Lets AI search build a confident entity graph. Reference `BASE_URL + "#organization"` consistently.

### L4. Get listed on Clutch, DesignRush, Awwwards, AlternativeTo
- Beyond the existing GoodFirms listing. Builds AI-search entity confidence.

### L5. Create 3–5 comparison pages (Techyor vs Toptal / Upwork / DesignJoy)
- High AI Overviews citation rate for comparison content.

### L6. Add author bylines + Person schema on `/blog/[slug]` posts
- Once Article schema and sitemap inclusion are shipped.

### L7. Measure real CWV via CrUX / PageSpeed Insights
- Run `/seo-google` skill to replace estimated Performance score with real data.

### L8. Wikidata entry once 80+ products is verifiable via public press
- Strong AI entity grounding signal.

---

## Suggested 30-day sequence

| Week | Theme | Items |
|---|---|---|
| 1 | Stop the bleeding | C1–C5 (critical fixes) |
| 2 | Convert the visits | H1, H2, H5, H6 (pricing, trust badges, /get-a-quote consolidation, lead-qualification) |
| 3 | Strengthen the SERP | H3, H4, H7 + M3 (answer cards on top 4 pages) |
| 4 | Expand the surface | M1, M4, M5, M6 + start Clutch/DesignRush submissions |

After week 4, re-run `/seo-audit` for a diff and re-score.
