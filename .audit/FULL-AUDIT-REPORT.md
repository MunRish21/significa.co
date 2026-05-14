# Techyor — Full SEO Audit Report

**Audited:** 2026-05-14
**Site:** https://www.techyor.com
**Stack:** SvelteKit + Vercel + Storyblok CMS
**Business type:** Digital product studio (services / agency)
**Primary ICP:** Bootstrapped / pre-seed founder, US-primary, $3K–$20K budget
**Total URLs in sitemap:** 122

Per-area reports live in `/tmp/techyor-audit/0[1-6]-*.md`.

---

## SEO Health Score: **58 / 100**

The site has strong technical bones — SvelteKit SSR, comprehensive schema, real review data, strong security headers, on-brand voice — but is being crippled by 5 critical bugs and a wrong-by-policy AI search stance. Fixing the criticals lifts the score to ~80 without any content investment.

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 22% | 55 | 12.10 |
| Content Quality | 23% | 60 | 13.80 |
| On-Page SEO | 20% | 60 | 12.00 |
| Schema / Structured Data | 10% | 70 | 7.00 |
| Performance (CWV) | 10% | 75 (est.) | 7.50 |
| AI Search Readiness | 10% | 20 | 2.00 |
| Images | 5% | 80 (est.) | 4.00 |
| **Total** | **100%** | | **58.4** |

*Performance and Images scored from signals (Vercel + SvelteKit + `_optimized/` pipeline + sharp dep) rather than a Lighthouse run. To replace with real CWV data, hook up CrUX/PageSpeed via `/seo-google`.*

---

## Top 5 Critical Issues — fix this week

### 1. `/hire` and `/team/munish` ship as "4🥚4" placeholder pages
- Title literally renders as `4🥚4`. Description: Significa template boilerplate.
- Both are indexable, in the sitemap, and have NO JSON-LD attached.
- `/hire` is the parent of 21 indexable role pages and gets crawled first via nav.
- `/team/munish` is featured on `/about` team grid.
- **Impact:** trust-kill for any US founder doing due diligence; degrades the entire `/hire/*` cluster's relevance signal.
- *Sources:* `01-technical.md` §1, `02-content.md` §1, `03-schema.md` §1, `06-sxo.md` #1

### 2. AI search crawlers are blocked sitewide
- `static/robots.txt` blocks GPTBot, Google-Extended, anthropic-ai, ClaudeBot, CCBot.
- `static/llms.txt` *allows* them — but robots.txt wins.
- Techyor sells AI services and targets the highest-AI-adoption buyer segment.
- 0% citation possibility today in ChatGPT, Claude, Perplexity, Google AI Overviews.
- *Sources:* `01-technical.md` §2, `05-geo.md` §1

### 3. `llms.txt` contains Significa template branding ("based in Porto, Portugal")
- Any LLM that honors llms.txt ingests false brand metadata contradicting the rest of the site.
- *Sources:* `01-technical.md` §3, `02-content.md` §2, `05-geo.md` §2

### 4. Robots.txt sitemap URL is on the wrong host
- Declares `Sitemap: https://techyor.com/sitemap.xml` (no www) while all canonicals and sitemap entries use `https://www.techyor.com`.
- *Sources:* `01-technical.md` §4, `04-sitemap.md` §1

### 5. `/blog/[slug]` post detail pages are missing from the sitemap entirely
- Only `/blog` index is submitted. Individual posts (the actual indexable content) are invisible to crawlers.
- The 90-day editorial calendar work (`0992c70f`) won't compound until this is fixed.
- *Sources:* `04-sitemap.md` §2, `02-content.md` §5

---

## Top 5 Quick Wins — under 1 day each

### A. Unblock AI crawlers in robots.txt
Delete the five `User-agent: GPTBot / Google-Extended / anthropic-ai / ClaudeBot / CCBot — Disallow: /` blocks from `static/robots.txt`. 5-minute edit, single biggest GEO unlock.

### B. Rewrite `static/llms.txt`
Replace the "Porto, Portugal" Significa text with accurate Techyor positioning. 15 minutes.

### C. Fix sitemap URL in `static/robots.txt`
`https://techyor.com/sitemap.xml` → `https://www.techyor.com/sitemap.xml`. 1-minute edit.

### D. Add NDA + code ownership badge above the fold
Promote the FAQ #9 and #10 content ("NDA before first call. You own all code.") into a visible trust badge on `/services`, `/hire-developers/united-states`, and `/get-a-quote`. ~2 hours.

### E. Ship pricing tiers on `/services`
Add a 3-tier "Investment" section (Marketing Site $3K–$8K / Web App MVP $10K–$35K / Full Product $35K+). Founders explicitly anchor on price ranges; competitors all show them. Half a day.

---

## Findings by category

### Technical SEO (55/100)
Strong: SSR, HSTS preload, CSP, strict Permissions-Policy, X-Frame-Options DENY, non-www → www redirect, trailing-slash normalization (308), `/admin` correctly 404s.
Weak: placeholder pages indexable (issue #1), AI crawler block (issue #2), sitemap URL host mismatch (issue #4), default robots `<meta>` is "index, follow" by accident-of-omission, 307 (not 308) on host redirect.
*Detail:* `01-technical.md`

### Content Quality (60/100)
Strong: distinctive voice ("Strategy first. Design second. Code built to last, not just to launch and pray"), FAQ blocks are well-written, 80+ projects evidence, real testimonial data.
Weak: 2 placeholder pages; Significa-template leftovers in `llms.txt` and on `/hire` + `/munish` descriptions; soft H1s on `/services` and `/about`; `/get-a-quote` is thin (2,551 words) for a conversion page; `/hire-developers/united-states` overshoots at 19,800 words.
*Detail:* `02-content.md`

### Schema (70/100)
Strong: comprehensive Organization, ProfessionalService, FAQPage, Person (Rishab is exemplary), BreadcrumbList, JobPosting, BlogPosting, AggregateRating, Review array, SpeakableSpecification. Centralized in `src/lib/utils/schema.ts`.
Weak: NO JSON-LD on `/hire` and `/team/munish`; ProfessionalService is reused on every page (should be limited); aggregateRating duplicated across schema types; missing Article on `/blog/[slug]`; missing VideoObject for the homepage showreel.
*Detail:* `03-schema.md`

### Sitemap (component of Technical)
122 URLs. Format valid. Strong: no /admin/private leakage, hosts internally consistent, breakdown is sensible.
Weak: declared on wrong host in robots.txt; missing `/blog/[slug]` pages; 28 `/projects/[filter-slug]` pages may be thin filter views; `lastmod` dates are batch-stamped (today's date on 58 URLs); `<priority>` + `<changefreq>` are wasted bytes Google ignores.
*Detail:* `04-sitemap.md`

### AI Search Readiness / GEO (20/100)
Currently uncitable in any AI search system. Has good infrastructure (llms.txt exists, FAQ schema, Speakable markup) that becomes effective only after unblock.
Strategic gaps: sparse external brand mentions (Techyor has one GoodFirms listing — needs Clutch, DesignRush, Awwwards, founder bylines); no comparison pages; few "answer card" passages; passage-citability is weak because voice is conversational rather than declarative.
*Detail:* `05-geo.md`

### SXO / Persona Match (component of Content + On-Page)
Best-scoring pages from the bootstrapped US founder POV: `/hire-developers/united-states` (10/10), `/hire/react-developer` (8/10), `/team/rishab-singla` (8/10), `/projects/[case-study]` (8/10).
Worst-scoring: `/team/munish` (4/10 — placeholder), `/services` (6/10 — page-type mismatch for "MVP development" intent), `/get-a-quote` (6/10 — thin for primary conversion).
Recurring friction: no pricing transparency, NDA/code-ownership signals buried in FAQ, +91 phone on `/contact`, `$16/hr` rate visible on team profiles conflicts with studio positioning, duplicate intent across `/contact` + `/get-a-quote`.
*Detail:* `06-sxo.md`

---

## What's working — don't break

- SvelteKit SSR means HTML is fully rendered on first byte
- Schema utility at `src/lib/utils/schema.ts` is well-organized and centralized
- Brand voice is distinctive and on-target where it lands (homepage, FAQs, recent commits)
- HSTS preload + strong security headers
- Storyblok CMS + image pipeline (`_optimized/`, sharp)
- Real verified reviews with structured AggregateRating
- Person schema on Rishab is comprehensive and entity-graph-ready
- `/hire-developers/united-states` is the strongest persona-match page on the site — use as the model for the rest

---

## How to read the per-area reports

- `01-technical.md` — robots, sitemap, canonicals, redirects, security
- `02-content.md` — voice consistency, E-E-A-T, thin content, page-level scoring
- `03-schema.md` — JSON-LD inventory, validation, missing opportunities, code snippets
- `04-sitemap.md` — 122-URL coverage analysis, hygiene, host mismatch
- `05-geo.md` — AI crawler policy, passage citability, top 10 founder prompts
- `06-sxo.md` — persona-page score matrix, user-story mismatches, friction list

See `ACTION-PLAN.md` (next to this file) for the prioritized fix list with file paths and effort estimates.
