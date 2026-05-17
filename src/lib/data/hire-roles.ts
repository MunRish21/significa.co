/**
 * Hire-a-developer landing pages — backend source of truth.
 *
 * Every entry produces a public page at /hire/<slug>, a sitemap entry,
 * Service + FAQPage JSON-LD, and an auto-filtered projects/testimonials
 * section pulled from `projects.ts` and `testimonials.ts` via `relatedServiceTags`.
 *
 * Add a new role: append a HireRole to `hireRoles` below. No other code change required.
 */

import type { ServiceCategory } from './team';

export type HireRole = {
  slug: string;
  /** Short label (e.g. "React Developer"). Used in breadcrumbs and CTA text. */
  title: string;
  /** Hero H1. Always written as a search-friendly "Hire Senior X Developers" form. */
  h1: string;
  /** One-line subhead under H1. */
  subhead: string;
  /** <title> tag — keep <= 60 chars. */
  metaTitle: string;
  /** Meta description — keep ~150-160 chars. */
  metaDescription: string;
  /** Full SEO body intro paragraph (rendered above "Why hire from us"). */
  intro: string;
  /** 3 differentiators specific to this role/tech. */
  whyUs: { title: string; description: string }[];
  /** 6-10 specific skills/capabilities the role covers. Render as a checklist. */
  skills: string[];
  /** Related tech surfaces — render as inline chips ("React 19, Vite, RSC, …"). */
  techStack: string[];
  /** 6-8 FAQ entries — written per-role to avoid thin/duplicate content penalties. */
  faq: { question: string; answer: string }[];
  /**
   * Service names from projects.ts that this role's portfolio should pull from.
   * Filtering matches against project.services.
   */
  relatedServiceTags: (ServiceCategory | string)[];
  /** Internal cross-link suggestions for the "Related roles" section. */
  relatedRoles?: string[];
  /** Anchor keyword density target — primary phrase the page should rank for. */
  primaryKeyword: string;
};

/** Shared engagement models — premium framing, no hourly rates. */
export const engagementModels = [
  {
    title: 'Dedicated Full-Time',
    description:
      'A senior developer working exclusively on your product, embedded into your team, sprint cycle, and rituals. Best for roadmap-driven work with continuous shipping.'
  },
  {
    title: 'Part-Time / Fractional',
    description:
      'Two to three days a week of senior expertise. Ideal for early-stage teams, technical advisory, code review, or supplementing an existing in-house team.'
  },
  {
    title: 'Fixed-Scope Project',
    description:
      'Defined milestones, outcomes, and timeline. Best when the brief is clear and you want a predictable budget. Includes design, QA, and handover.'
  }
];

/** Shared engagement process — kept simple, reflects how we actually work. */
export const hiringProcess = [
  {
    step: 1,
    title: 'Quick intro call',
    description:
      "A 30-minute conversation. Tell us what you're building, the stack you're on, and where you'd like help. No deck, no obligation."
  },
  {
    step: 2,
    title: 'We share our experience',
    description:
      'We walk you through relevant projects we have shipped, the approach we would take, and the trade-offs to expect. Honest about what we are great at — and what we are not.'
  },
  {
    step: 3,
    title: 'Start work',
    description:
      'Mutual NDA, a clear scope, and a start date. We begin shipping that week. Daily updates and a single point of contact throughout.'
  }
];

/** Universal FAQ — each role *also* gets unique FAQs in its own block. */
export const sharedFaq = [
  {
    question: 'How fast can a developer start?',
    answer:
      'For most roles, within 5–10 business days from the intro call. We pre-qualify our bench so onboarding is contracts and access — not a hiring search.'
  },
  {
    question: 'Do you sign NDAs and IP assignment agreements?',
    answer:
      "Yes — every engagement starts with a mutual NDA and a clean IP assignment clause. All work product is your property the moment it's written."
  },
  {
    question: 'What time zones do your developers cover?',
    answer:
      'Our team primarily operates in IST with 4–6 hours of overlap with US Pacific, full overlap with EU, and full overlap with AU East. We commit to overlap windows in writing.'
  }
];

export const hireRoles: HireRole[] = [
  // ─── PHASE 1 ──────────────────────────────────────────────────────────────
  {
    slug: 'react-developer',
    title: 'React Developer',
    h1: 'Hire Senior React Developers',
    subhead:
      'Hire dedicated React developers and React.js development teams — production engineers who ship fast, accessible, performant interfaces.',
    metaTitle: 'Hire React Developers — Senior, Dedicated | Techyor',
    metaDescription:
      'Hire React developers and full React.js development teams with senior-level React 19, Next.js, RSC, and Core Web Vitals experience. Production-grade interfaces for US, UK, EU teams.',
    intro:
      "Hire React developers who are product engineers first — people who treat components as a means to an outcome, not the outcome itself. Every developer on our React bench has shipped at least three production React applications, knows the difference between client and server components in their sleep, and has opinions about state management they can defend with profiling data, not just preferences. We also place full React.js development teams when one engineer isn't enough — design, frontend, and full-stack moving as a unit. Our developers know when to reach for Zustand vs Redux, when Suspense saves you a bug and when it hides one, and how to keep a Lighthouse score above 95 once a real product team is shipping into the codebase.",
    primaryKeyword: 'hire react developers',
    whyUs: [
      {
        title: 'Senior, never bootcamp-junior',
        description:
          "Every React developer we place has 4+ years in production React, including at least one large-scale app (10k+ MAU). We don't market junior engineers as senior."
      },
      {
        title: 'Performance is non-negotiable',
        description:
          'Bundle budgets, Core Web Vitals targets, and accessibility audits are part of the definition of done — not afterthoughts addressed at launch.'
      },
      {
        title: 'Ship-shaped, not theory-shaped',
        description:
          "Our developers have closed real bug tickets, rolled back real deploys at 11pm, and shipped behind feature flags. They know what 'works in production' means."
      }
    ],
    skills: [
      'React 18/19, including Server Components and Server Actions',
      'Next.js (App Router) and Vite-based SPAs — chosen per use case',
      'TypeScript with strict mode and discriminated unions',
      'State management — Zustand, Redux Toolkit, Jotai, TanStack Query',
      'Testing — Vitest, React Testing Library, Playwright, Storybook',
      'Performance — code-splitting, RSC streaming, edge rendering, image optimization',
      'Accessibility — WCAG 2.2 AA, screen-reader testing, keyboard-first interactions',
      'Design system implementation — Radix, shadcn/ui, custom token systems',
      'CI/CD — Vercel, GitHub Actions, preview deploys, visual regression'
    ],
    techStack: [
      'React 19',
      'Next.js 16',
      'TypeScript',
      'Vite',
      'TanStack Query',
      'Zustand',
      'tRPC',
      'Tailwind CSS',
      'Radix UI',
      'Playwright',
      'Storybook'
    ],
    faq: [
      {
        question: 'Should I hire dedicated React developers or a full React.js development team?',
        answer:
          "Hire one or two dedicated React developers when the team is small and the work is a focused frontend slice — feature delivery, refactors, performance optimization, design system implementation. Hire a React.js development team when the build is bigger than one engineer can carry: a greenfield product, a major migration, a multi-surface app (web + mobile + admin), or a complex domain that needs design and engineering moving together. A team brings frontend, full-stack, and product engineering as a unit, with the same code review discipline and Lighthouse budgets as individual hires. The split is mostly about scope and timeline."
      },
      {
        question: 'How is hiring a senior React developer different from a junior?',
        answer:
          "Three things separate senior React work from junior. First, framework instinct — a senior knows when React Server Components are the right tool and when they're a footgun for a highly-interactive dashboard, when Suspense saves a bug vs hides one, when Zustand beats Redux Toolkit. Second, performance ownership — they read a Lighthouse report and immediately know which three changes move the LCP needle, watch the bundle diff on every PR, and treat Core Web Vitals as a budget not a goal. Third, production discipline — they ship behind feature flags, write tests that survive refactors, and don't break accessibility on the way to shipping faster. A senior React developer keeps the codebase improvable in three years without a rewrite."
      },
      {
        question: 'Can I hire React developers from India for a US or UK product?',
        answer:
          "Yes — most of our React clients are in the US, UK, EU, and Australia. We overlap with East Coast US morning and UK afternoon hours, run async-first with daily standups, and ship in your timezone's calendar. Senior India-based React developers cost 40–60% less than equivalent senior frontend engineers in the US or UK without quality compromise. We've shipped React apps across all four regions — multi-tenant SaaS dashboards, e-commerce frontends, content platforms, and complex interactive interfaces — with strict-mode TypeScript, accessibility-tested UI, and Lighthouse budgets enforced in CI."
      },
      {
        question: 'Do your React developers also handle backend work?',
        answer:
          "Yes — most are full-stack capable with Node.js, tRPC, or Next.js Route Handlers. If your product is React + Postgres + Redis, one developer can own the slice. For deep backend, we'd pair them with a backend specialist."
      },
      {
        question: 'Can you start on a legacy React 16/17 codebase?',
        answer:
          "Absolutely. We've migrated multiple legacy CRA codebases to Vite, jQuery → React, and class components → hooks. Migrations are a service we offer; we don't insist on greenfield."
      },
      {
        question: 'What about React Native?',
        answer:
          "Some of our React engineers also ship React Native — but if mobile is the primary surface, hire from our React Native bench instead. The two skillsets overlap but aren't identical."
      },
      {
        question: 'How do you handle code review and quality?',
        answer:
          'Every PR goes through review — either from your team if you have one, or from a senior engineer on our side. We enforce ESLint + TypeScript strict + per-PR Lighthouse comparison so regressions are caught before merge.'
      },
      {
        question: 'Will the developer use our existing design system?',
        answer:
          "Yes — adopting your design system, tokens, and component library is part of onboarding. If you don't have one, we can help you decide whether to adopt shadcn/ui, build custom, or stay component-by-component."
      },
      {
        question: 'Do you support React Server Components in production?',
        answer:
          "Yes. We've shipped multiple Next.js App Router apps with RSC, Server Actions, and partial prerendering in production. We can also tell you when RSC is the wrong fit for your app — it usually is for highly-interactive dashboards."
      }
    ],
    relatedServiceTags: ['React & Next.js Development', 'Web Development & Design', 'SaaS Platforms', 'Web Applications'],
    relatedRoles: ['nextjs-developer', 'typescript-developer', 'frontend-developer', 'full-stack-developer']
  },
  {
    slug: 'nextjs-developer',
    title: 'Next.js Developer',
    h1: 'Hire Senior Next.js Developers',
    subhead:
      'Hire dedicated Next.js developers — App Router specialists who ship sub-second TTFB apps on Vercel without overengineering them.',
    metaTitle: 'Hire Next.js Developers — Senior, Dedicated | Techyor',
    metaDescription:
      'Hire Next.js developers and a senior Next.js website development agency team — App Router, Server Components, Edge runtime, production deployment on Vercel for US, UK, EU teams.',
    intro:
      "Hire Next.js developers who think in routes, layouts, caching boundaries, and the cost of a serverless invocation — not just React with file-based routing. As a Next.js website development agency, we've shipped App Router applications in production for SaaS platforms, e-commerce stores, and internal tools — including the patterns that don't make it into the docs (when to use a layout, when to use a route group, why your `cache()` calls are silently invalidating). We've been in production with App Router since the day it shipped. Our developers know what to do when your `revalidatePath` doesn't, why Server Actions are sometimes the wrong tool, and how to keep your edge bundle under the 1 MB cap when integration libraries keep growing.",
    primaryKeyword: 'hire next.js developers',
    whyUs: [
      {
        title: 'App Router-native, not retrofit',
        description:
          'Our team writes App Router-first. We know the gotchas: caching tags, dynamic vs static segments, the parallel routing trap, and when ISR beats SSR.'
      },
      {
        title: 'Vercel-shipping engineers',
        description:
          'We deploy daily on Vercel. Edge functions, ISR, on-demand revalidation, custom build steps — we know the pricing model and how to stay inside it.'
      },
      {
        title: 'Performance budgets, not promises',
        description:
          'Every Next.js project we ship comes with a per-page TTFB and CLS budget enforced in CI. Regressions block merges.'
      }
    ],
    skills: [
      'Next.js 14/15/16 — App Router, Server Components, Server Actions',
      'Caching strategy — fetch cache, route cache, full-route cache, revalidateTag',
      'Edge runtime, middleware, and Routing Middleware',
      'ISR, on-demand revalidation, partial prerendering',
      'Authentication patterns — NextAuth.js, Clerk, custom JWT, OAuth',
      'Database integration — Prisma, Drizzle, Postgres, Redis',
      'Streaming, Suspense, loading.tsx and error.tsx patterns',
      'Vercel deployment — environment variables, secrets, preview URLs',
      'Performance — bundle analysis, image optimization, font subsetting'
    ],
    techStack: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'Drizzle / Prisma',
      'tRPC',
      'NextAuth.js',
      'Vercel AI SDK',
      'Tailwind CSS',
      'shadcn/ui',
      'Vercel Edge Functions'
    ],
    faq: [
      {
        question: 'Should I hire dedicated Next.js developers or a Next.js website development agency?',
        answer:
          "Hire one or two dedicated Next.js developers when you need engineers plugged into your team — feature delivery, App Router refactors, performance optimization, server-component patterns. Hire a Next.js website development agency when the build is bigger: greenfield products, complex App Router architectures, parallel marketing-site + product-app surfaces, or apps that need design, frontend, and full-stack engineers moving together. The agency route brings the same code review discipline and TTFB budgets, with more parallel velocity. The split is about scope and timeline, not quality."
      },
      {
        question: 'How is hiring a senior Next.js developer different from a junior?',
        answer:
          "Three things separate senior Next.js work from junior. First, App Router instinct — they know when a layout vs a route group is the right tool, when `cache()` is silently invalidating, when Server Actions are wrong for a form, and when partial prerendering earns the complexity. Second, caching strategy — full-route cache, fetch cache, data cache, route segment config, `revalidateTag` and `revalidatePath` — used deliberately to keep TTFB low without breaking freshness. Third, Vercel platform fluency — edge functions, ISR, on-demand revalidation, the pricing model, and how to stay inside it. A senior Next.js developer keeps the app fast and the bill predictable."
      },
      {
        question: 'Can I hire Next.js developers from India for a US or UK product?',
        answer:
          "Yes — most of our Next.js clients are in the US, UK, EU, and Australia. We overlap with East Coast US morning and UK afternoon hours, run async-first with daily standups, and ship in your timezone's calendar. Senior India-based Next.js developers cost 40–60% less than equivalent senior frontend engineers in the US or UK without quality compromise. We've shipped App Router apps across all four regions — multi-tenant SaaS dashboards, e-commerce frontends, content platforms — with strict-mode TypeScript, accessibility-tested UI, and TTFB budgets enforced in CI."
      },
      {
        question: 'App Router or Pages Router?',
        answer:
          'For new builds in 2026, App Router. We can also work in Pages Router on legacy codebases — and we can plan and execute a Pages → App migration without downtime.'
      },
      {
        question: 'Do you ship on Vercel only, or other platforms too?',
        answer:
          "Vercel is our default because feature parity is best there. We've also deployed Next.js to AWS (with OpenNext or sst), Cloudflare Pages, self-hosted Docker, and Netlify."
      },
      {
        question: 'Server Components or Client Components — what do you default to?',
        answer:
          "Server-first by default. We push interactivity to Client Components only where needed (forms, real-time UI, browser APIs). This keeps bundles small and TTFB low."
      },
      {
        question: 'How do you handle authentication?',
        answer:
          'For most projects, Clerk or NextAuth.js. For products with custom requirements (multi-tenant, SSO, complex permissions), we build custom auth on top of Lucia or oslo. We choose based on your IDP, not our convenience.'
      },
      {
        question: 'Can you optimize an existing slow Next.js app?',
        answer:
          'Yes — performance audits are a service we offer. Typical wins: kill expensive imports, add `cache()` where missed, fix N+1 queries, defer non-critical scripts, optimize images. Most apps see 30–60% TTFB improvement.'
      },
      {
        question: 'Do you write tests?',
        answer:
          'Yes. Component tests in Vitest + React Testing Library, E2E in Playwright. We also write Server Actions tests as integration tests against a real database.'
      }
    ],
    relatedServiceTags: ['React & Next.js Development', 'Web Development & Design', 'SaaS Platforms', 'Web Applications'],
    relatedRoles: ['react-developer', 'typescript-developer', 'full-stack-developer', 'frontend-developer']
  },
  {
    slug: 'full-stack-developer',
    title: 'Full Stack Developer',
    h1: 'Hire Senior Full Stack Developers',
    subhead:
      'Hire dedicated full stack developers — end-to-end engineers who own a feature from database schema to UI polish, without context-switching cost.',
    metaTitle: 'Hire Full Stack Developers — Senior, Dedicated | Techyor',
    metaDescription:
      'Hire full stack developers with senior-level experience across React/Next.js, Node.js, Python, Postgres, and AWS. One engineer, end-to-end product features. For US, UK, EU teams.',
    intro:
      "Hire full stack developers when your roadmap is feature-shaped, not stack-shaped. Instead of a frontend dev waiting on a backend dev, one senior engineer takes the ticket from API design through UI implementation through deployment. Our full stack team is fluent across React/Next.js + Node.js or Python, with hands-on experience in Postgres schema design, Redis caching, queue patterns, and production observability. We ship full stack web developers who handle the marketing-site-to-product-app continuum, and we know our limits — we pull in specialists for native mobile, ML, or deep platform work where the depth matters more than the breadth.",
    primaryKeyword: 'hire full stack developers',
    whyUs: [
      {
        title: 'Real depth, not breadth-only',
        description:
          'Our full-stack developers are 80%+ deep in either frontend or backend, with strong working knowledge of the other side. No "knows a bit of everything, expert in nothing".'
      },
      {
        title: 'Database-aware, not just ORM-aware',
        description:
          'They write SQL when the ORM is wrong. They know what an index does, when a transaction blocks, and why your query plan changed last Tuesday.'
      },
      {
        title: 'Production-shaped',
        description:
          'They have shipped, observed, alerted on, and fixed production systems. They write code expecting it to break, not hoping it won\'t.'
      }
    ],
    skills: [
      'Frontend — React, Next.js, TypeScript, Tailwind CSS',
      'Backend — Node.js (Express, Fastify, Hono), Python (FastAPI, Django)',
      'Database — Postgres, MySQL, MongoDB, Redis (with schema design)',
      'API design — REST, GraphQL, tRPC, OpenAPI specs',
      'Auth — OAuth 2.0, JWT, session-based, multi-tenant patterns',
      'Cloud — AWS (Lambda, RDS, S3, CloudFront), Vercel, Cloudflare',
      'CI/CD — GitHub Actions, preview environments, blue/green deploys',
      'Testing — unit, integration, E2E across the stack',
      'Observability — structured logging, Sentry, OpenTelemetry'
    ],
    techStack: [
      'TypeScript',
      'React',
      'Next.js',
      'Node.js',
      'Python',
      'Postgres',
      'Redis',
      'Docker',
      'AWS',
      'GraphQL',
      'tRPC'
    ],
    faq: [
      {
        question: 'Should I hire dedicated full stack developers or two specialists?',
        answer:
          "Hire dedicated full stack developers when the roadmap is feature-shaped — one senior engineer takes the ticket from API design through UI through deployment, 30–50% faster than two specialists handing off because there's no API contract negotiation, no waiting on the other side, and no integration debugging across people. Hire two specialists (frontend + backend) when the work is genuinely deep on both sides — complex data layer plus complex UX, or when team size justifies the separation. The trade is depth: for highly specialized work (ML, native mobile, complex infra), specialists win. For most product features, dedicated full stack developers ship faster."
      },
      {
        question: 'How is hiring a senior full stack developer different from a junior?',
        answer:
          "Three things separate senior full stack work from junior. First, real depth on one side — they're 80%+ deep in either frontend or backend, with strong working knowledge of the other side, not 'knows a bit of everything, expert in nothing'. Second, database awareness — they write SQL when the ORM is wrong, know what an index does, when a transaction blocks, and why your query plan changed last Tuesday. Third, production discipline — they've shipped, observed, alerted on, and fixed production systems. They write code expecting it to break, not hoping it won't. A senior full stack developer keeps features shippable from day one and improvable in two years."
      },
      {
        question: 'Can I hire full stack developers from India for a US or UK product?',
        answer:
          "Yes — most of our full stack clients are in the US, UK, EU, and Australia. We overlap with East Coast US morning and UK afternoon hours, run async-first with daily standups, and ship in your timezone's calendar. Senior India-based full stack developers cost 40–60% less than equivalent senior engineers in the US or UK without quality compromise. We've shipped full stack work across all four regions — React/Next.js + Node.js or Python + Postgres products, multi-tenant SaaS, e-commerce frontends with custom backends, and AI-integrated apps with end-to-end TypeScript or Python stacks."
      },
      {
        question: "What's the difference between a full-stack and two specialists?",
        answer:
          'Coordination cost. One full-stack developer ships a feature 30–50% faster than two specialists handing off because there\'s no API contract negotiation, no waiting on the other side, and no integration debugging across people. The trade is depth — for highly specialized work (ML, native mobile, complex infra), specialists win.'
      },
      {
        question: 'Can a full-stack developer handle DevOps?',
        answer:
          'Most can handle deployment, environment management, and basic monitoring on Vercel/AWS/Cloudflare. For Kubernetes, complex VPC setups, or platform engineering, hire a dedicated DevOps engineer.'
      },
      {
        question: 'Frontend-leaning or backend-leaning — does it matter?',
        answer:
          "Yes. Tell us what's harder in your codebase: the UX, or the data layer. We'll match a developer whose primary depth fits the harder side."
      },
      {
        question: 'Do they own UI design too?',
        answer:
          "No — we strongly recommend pairing with a designer. Our full-stack developers can implement great UI from a Figma file, but designing and implementing in one head usually compromises one or the other."
      },
      {
        question: 'How do you handle technology choices?',
        answer:
          "We default to your existing stack. If we're greenfield, we propose a short architecture doc with two options, recommendations, and trade-offs — not a 50-page proposal."
      },
      {
        question: 'Can they migrate a monolith to services?',
        answer:
          'Yes — we\'ve done several monolith → modular monolith → service migrations. We\'re strong skeptics of premature microservices; you usually want a modular monolith first.'
      }
    ],
    relatedServiceTags: ['Web Development & Design', 'SaaS Platforms', 'Backend Engineering', 'Web Applications'],
    relatedRoles: ['react-developer', 'nodejs-developer', 'python-developer', 'nextjs-developer']
  },
  {
    slug: 'mobile-app-developer',
    title: 'Mobile App Developer',
    h1: 'Hire Senior Mobile App Developers',
    subhead:
      'Hire dedicated mobile app developers — iOS, Android, and cross-platform engineers behind 14+ shipped apps across health, retail, and consumer brands.',
    metaTitle: 'Hire Mobile App Developers — Senior, Dedicated | Techyor',
    metaDescription:
      'Hire dedicated mobile app developers with senior-level experience across iOS (Swift), Android (Kotlin), React Native, and Flutter. 14+ shipped apps, App Store and Play Store launches for US, UK, EU teams.',
    intro:
      "Hire dedicated mobile app developers who've shipped to real users, not just to TestFlight. Mobile development is what we've shipped most: 14+ production apps for clients including Arby's, Buffalo Wild Wings, ADT, Medela, and Surfboard Central — across iOS, Android, and cross-platform stacks. Our mobile app developers know that an App Store rejection isn't a build error — it's a UX decision, an icon size, a privacy disclosure, an in-app purchase flow that doesn't quite match Apple's guidance. They know to test on a real device before committing, what offline-first really means for sync, and why your push notifications stopped delivering after iOS 17. We also operate as a mobile app development company when teams need design, iOS, Android, and cross-platform engineers moving as a unit.",
    primaryKeyword: 'hire dedicated mobile app developers',
    whyUs: [
      {
        title: '14+ shipped apps in production',
        description:
          'Real Play Store and App Store releases — including iOS in-app purchases, Android billing, push notifications via APNs and FCM, and silent OTA updates.'
      },
      {
        title: 'Native + cross-platform, both fluent',
        description:
          'We know when to choose React Native (most apps), Flutter (UI-heavy consumer apps), or full native (high-performance, hardware-integrated). We pick by problem, not preference.'
      },
      {
        title: 'Store launch, not just code',
        description:
          'App Store Connect, TestFlight, Play Console, internal testing tracks, phased rollouts, ASO basics — we ship the launch, not just the build.'
      }
    ],
    skills: [
      'iOS — Swift, SwiftUI, UIKit, Core Data, push notifications',
      'Android — Kotlin, Jetpack Compose, Room, WorkManager',
      'Cross-platform — React Native (with Reanimated, Skia), Flutter',
      'Mobile state — Redux Toolkit, Zustand, Riverpod, MobX',
      'Offline-first patterns — sync conflict resolution, local-first DBs',
      'Native modules — bridging Swift/Kotlin to React Native or Flutter',
      'In-app purchases — StoreKit, Google Play Billing, RevenueCat',
      'Push notifications — APNs, FCM, segmentation, deep links',
      'App Store / Play Store launch — review readiness, ASO, TestFlight'
    ],
    techStack: [
      'Swift',
      'SwiftUI',
      'Kotlin',
      'Jetpack Compose',
      'React Native',
      'Flutter',
      'Expo',
      'Firebase',
      'RevenueCat',
      'Sentry'
    ],
    faq: [
      {
        question: 'Should I hire dedicated mobile app developers or a mobile app development company?',
        answer:
          "Hire dedicated mobile app developers when you need one or two engineers plugged into your team — feature delivery, App Store submissions, performance optimization, in-app purchase work. Hire a mobile app development company when the build is bigger: greenfield products shipping to both stores, parallel iOS + Android tracks, or apps with custom backend, design system, and analytics work alongside the app itself. The company route brings design, native iOS (Swift/SwiftUI), native Android (Kotlin/Compose), and cross-platform (React Native or Flutter) engineers moving as a unit, with App Store and Play Store launch fluency. The split is about scope, not quality."
      },
      {
        question: 'How is hiring a senior mobile app developer different from a junior?',
        answer:
          "Three things separate senior mobile work from junior. First, store-review instinct — they anticipate the common App Store and Play Console rejections (Sign in with Apple, IAP for digital goods, privacy disclosures, ANR/crash rate gates) and architect around them upfront. Second, platform fluency — they know when to choose native iOS (Swift/SwiftUI) vs native Android (Kotlin/Compose) vs cross-platform (React Native, Flutter), and they can defend the choice with profiling data instead of preference. Third, real-device discipline — they test on 3-year-old Samsung phones with custom OEM skins, watch crash rate during phased rollouts, and ship with structured logging that survives production. A senior mobile app developer keeps the app on the store without surprises."
      },
      {
        question: 'Can I hire mobile app developers from India for a US or UK product?',
        answer:
          "Yes — most of our mobile clients are in the US, UK, EU, and Australia. We overlap with East Coast US morning and UK afternoon hours, run async-first with daily standups, and ship in your timezone's calendar. Senior India-based mobile app developers cost 40–60% less than equivalent senior mobile engineers in the US or UK without quality compromise. We've shipped to the US, UK, and global App and Play Stores — ADT Control (iOS + Android), Buffalo Wild Wings (iOS + Android), Arby's (iOS + Android), Medela Family (iOS + Android), Surfboard Central — including IAP, push notifications, deep links, and OTA updates."
      },
      {
        question: 'Native or cross-platform — which should we choose?',
        answer:
          "Cross-platform for most product apps in 2026. Choose native when you need: heavy hardware integration (camera/sensor-heavy), best-in-class UI animations beyond what React Native handles, or your team can hire two specialists and you ship to both stores at the same quality."
      },
      {
        question: 'Can you ship to both App Store and Play Store?',
        answer:
          'Yes — full launch service including App Store Connect setup, Play Console setup, screenshots, store listing copy, privacy disclosures, and walkthroughs of the review process.'
      },
      {
        question: 'How do you handle App Store rejections?',
        answer:
          'We anticipate the common rejection patterns (sign-in with Apple, IAP for digital goods, privacy policy URLs, demo accounts for review). When a rejection happens, we read the actual review note carefully — most are fixable in a day with the right interpretation.'
      },
      {
        question: 'Do you build with Expo or bare React Native?',
        answer:
          "Expo for most projects (managed workflow, EAS Build, OTA updates). Bare RN when we need a native module Expo doesn't support, or when the app is large enough to justify the build complexity."
      },
      {
        question: 'What about iPad and tablet support?',
        answer:
          'We ship universal apps when the product justifies it. Tablet is rarely a copy-paste of phone — we treat it as a separate UX surface and design accordingly.'
      },
      {
        question: 'Push notifications, deep links, and analytics — included?',
        answer:
          'Yes, included as standard. Default stack: Firebase Cloud Messaging, branch.io or universal links, and an analytics provider of your choice (PostHog, Amplitude, Mixpanel).'
      }
    ],
    relatedServiceTags: ['Mobile App Development', 'Mobile Applications'],
    relatedRoles: ['react-native-developer', 'flutter-developer', 'ios-developer', 'android-developer']
  },
  {
    slug: 'react-native-developer',
    title: 'React Native Developer',
    h1: 'Hire Senior React Native Developers',
    subhead:
      'Hire dedicated React Native app developers — JavaScript engineers who ship to App Store and Play Store from one codebase without sacrificing native polish.',
    metaTitle: 'Hire React Native Developers — Senior, Dedicated | Techyor',
    metaDescription:
      'Hire React Native app developers with senior-level Expo, Reanimated, native modules, and EAS Build experience. Ship to App Store and Play Store from one codebase. For US, UK, EU teams.',
    intro:
      "Hire React Native developers who think in bridge cost, frame budget, and platform conventions — not generalist React developers asked to also build a mobile app. That mismatch is why React Native gets a bad reputation. Our React Native app developers know when to drop into Swift or Kotlin to fix a problem, and when not to. They've shipped consumer apps to the App Store, retail apps to enterprise customers, and SDK-heavy products that need native modules. We use Expo as the default and bare RN when we need to. We also place full React Native development teams when one engineer isn't enough — frontend, app developer, and native-module engineers moving as a unit.",
    primaryKeyword: 'hire react native developers',
    whyUs: [
      {
        title: 'Expo + EAS, native fallback',
        description:
          "Expo managed workflow handles 90% of cases. For the other 10% (custom native modules, specialized hardware), our developers write Swift and Kotlin, not just JS."
      },
      {
        title: 'Animation and gesture handling',
        description:
          "Reanimated 3, React Native Gesture Handler, and Skia for high-performance UI. Our team writes 60fps animations, not 'good enough' ones."
      },
      {
        title: 'Real device testing, real launches',
        description:
          "TestFlight beta tracks, Play Console internal testing, Sentry crash reporting integrated from day one. Production-grade from version 1.0."
      }
    ],
    skills: [
      'React Native — Expo (SDK 51+), EAS Build, EAS Update',
      'Animation — Reanimated 3, Gesture Handler, Skia',
      'Navigation — React Navigation v7, Expo Router',
      'State — Zustand, Redux Toolkit, MMKV for persistence',
      'Native modules — Swift / Objective-C / Kotlin / Java bridging',
      'In-app purchases — RevenueCat, StoreKit 2, Google Play Billing',
      'Push — Expo Notifications, FCM, OneSignal',
      'Testing — Jest, Detox, Maestro for E2E flows',
      'Performance — Hermes, RAM bundles, lazy loading screens'
    ],
    techStack: [
      'React Native',
      'Expo SDK 51',
      'TypeScript',
      'Reanimated',
      'Skia',
      'EAS Build',
      'RevenueCat',
      'Sentry',
      'MMKV',
      'React Navigation'
    ],
    faq: [
      {
        question: 'Should I hire dedicated React Native developers or generalist React developers for mobile?',
        answer:
          "Hire dedicated React Native developers when the app is shipping to both stores from one codebase, when native module work is on the roadmap, or when 60fps animations and frame budgets matter. A generalist React developer will ship a working build; a dedicated React Native app developer handles the harder edges — bridge cost, JSI/TurboModule patterns, Reanimated 3 worklets, Skia for high-performance UI, and the OEM-specific quirks that don't show up in the JS layer. The split is most worth it past prototype, especially when the app needs to feel native on both platforms."
      },
      {
        question: 'How is hiring a senior React Native app developer different from a junior?',
        answer:
          "Three things separate senior React Native work from junior. First, native-bridge instinct — they know when to drop into Swift or Kotlin to write a custom TurboModule, when an existing community package is broken, and when JSI is the right escape hatch. Second, performance ownership — they read a Flipper trace and immediately know which JS thread block is dropping frames, when to reach for Reanimated worklets, and how to ship under the iOS app-binary limit. Third, store-launch discipline — TestFlight beta tracks, Play Console phased rollouts, Sentry crash gates, and OTA updates via EAS that never push native code. A senior React Native app developer keeps the app stable across both stores through launch and beyond."
      },
      {
        question: 'Can I hire React Native developers from India for a US or UK product?',
        answer:
          "Yes — most of our React Native clients are in the US, UK, EU, and Australia. We overlap with East Coast US morning and UK afternoon hours, run async-first with daily standups, and ship in your timezone's calendar. Senior India-based React Native app developers cost 40–60% less than equivalent senior mobile engineers in the US or UK without quality compromise. We've shipped React Native apps across all four regions — including apps with custom native modules in Swift and Kotlin, Reanimated-heavy UI, RevenueCat subscription flows, and EAS Build pipelines integrated with TestFlight and Play Console."
      },
      {
        question: 'Expo or bare React Native?',
        answer:
          "Expo for most apps in 2026 — EAS Build solves the historical pain points (custom native modules, build failures). We use bare React Native when we need a native module Expo doesn't support, or when integrating with a complex existing native codebase."
      },
      {
        question: 'How does React Native compare to Flutter?',
        answer:
          'For teams already in JavaScript/React, React Native wins on shared mental model and code reuse. For teams starting fresh with no React investment, Flutter offers stronger out-of-the-box performance and consistent UI. We do both — choose based on your team, not the framework wars.'
      },
      {
        question: 'Can you ship a Hermes-only app?',
        answer:
          "Yes. Hermes is the default for new apps and gives meaningful startup-time wins on Android. We also handle migrations from JSC to Hermes when memory profiles need it."
      },
      {
        question: 'Do you write native modules?',
        answer:
          'Yes. Swift modules with TurboModule API, Kotlin modules — both. We also publish to npm when reusable, and contribute back to community packages where licenses allow.'
      },
      {
        question: 'How do you handle OTA updates?',
        answer:
          "EAS Update for JS-only changes. We never push native code via OTA (Apple's policy), and we always gate updates behind a feature flag for safe rollback."
      },
      {
        question: 'Are you React Native New Architecture-ready?',
        answer:
          'Yes — we ship apps with the New Architecture (Fabric + TurboModules) enabled where the dependency tree supports it. We also know which packages are still incompatible and how to work around them.'
      }
    ],
    relatedServiceTags: ['Mobile App Development', 'Mobile Applications'],
    relatedRoles: ['mobile-app-developer', 'flutter-developer', 'ios-developer', 'android-developer']
  },
  {
    slug: 'python-developer',
    title: 'Python Developer',
    h1: 'Hire Senior Python Developers',
    subhead:
      'Hire dedicated Python developers — backend engineers who ship FastAPI, async services, and ML pipelines that handle real production load.',
    metaTitle: 'Hire Python Developers — Senior, Dedicated | Techyor',
    metaDescription:
      'Hire Python developers with senior-level FastAPI, async, ML, and high-throughput backend experience. Trusted Python development company for US, UK, EU teams.',
    intro:
      "Hire Python developers who write production async services, not Jupyter notebooks. 'Knows Python' covers everything from a hobbyist to a senior backend engineer running gRPC services at 10k QPS — the difference between the two is the difference between a build that ships and one that doesn't. As a Python development company, we ship FastAPI services, ML pipelines, and data tooling for products in the US, UK, EU, and Australia. Every Python developer on our bench has shipped at least one production async service, knows the difference between asyncio.gather and TaskGroup, has dealt with the GIL for real, and can explain what a Python interpreter is doing during your CPU spike.",
    primaryKeyword: 'hire python developers',
    whyUs: [
      {
        title: 'Async-first, not async-bolted-on',
        description:
          'Our Python developers think in terms of event loops, not threads. asyncio, FastAPI, and httpx are the daily kit — not theoretical knowledge.'
      },
      {
        title: 'Database performance is non-negotiable',
        description:
          'Connection pooling, prepared statements, indexes that work for your query patterns. We profile slow queries before shipping, not after the page-out.'
      },
      {
        title: 'ML and data adjacent',
        description:
          'Most of our Python team has shipped an ML model into production — we know the deployment story, not just the training notebook.'
      }
    ],
    skills: [
      'FastAPI — async, dependency injection, OpenAPI, Pydantic v2',
      'Django — DRF, async views, channels, custom middleware',
      'asyncio — TaskGroup, structured concurrency, anyio',
      'Database — SQLAlchemy 2.0, async, alembic migrations',
      'Postgres — schema design, partitioning, JSONB, full-text search',
      'Background jobs — Celery, RQ, Dramatiq, ARQ',
      'Testing — pytest, pytest-asyncio, factory_boy, hypothesis',
      'Type checking — mypy, pyright in strict mode',
      'Deployment — Docker, gunicorn/uvicorn, AWS Lambda via Mangum'
    ],
    techStack: [
      'Python 3.13/3.14',
      'FastAPI',
      'Django',
      'SQLAlchemy 2.0',
      'Pydantic v2',
      'Celery',
      'Postgres',
      'Redis',
      'Docker',
      'AWS / Vercel'
    ],
    faq: [
      {
        question: 'Should I hire dedicated Python developers or a generalist agency?',
        answer:
          "Hire dedicated Python developers when the project is more than scripting — async APIs, multi-tenant SaaS backends, ML inference pipelines, data ingestion at scale, or any service where event-loop discipline and database performance matter. A generalist agency will get the script working; dedicated Python developers will ship a production service with proper async patterns, type-checked codebases (mypy/pyright strict), structured logging, and observability that lets you debug it at 3am. The split is most worth it past the prototype stage or when uptime targets are real."
      },
      {
        question: 'How is hiring a senior Python developer different from a junior?',
        answer:
          "Three things separate senior Python work from junior. First, async instinct — a senior knows when to reach for asyncio.gather vs TaskGroup, why your asyncio code is silently blocking on a sync DB driver, how to structure concurrency safely with anyio. Second, performance discipline — they profile with cProfile / py-spy / scalene before guessing, recognize that 'slow Python' is usually a slow query or N+1, and know when to drop hot paths to Cython, Rust via PyO3, or a Go rewrite. Third, type and test rigor — mypy strict or pyright strict in CI, pytest-asyncio for async code, hypothesis for property tests. A senior Python developer turns 'it runs' into 'it runs reliably at 10k QPS.'"
      },
      {
        question: 'Can I hire Python developers from India for a US or UK product?',
        answer:
          "Yes — most of our Python clients are in the US, UK, EU, and Australia. We overlap with East Coast US morning and UK afternoon hours, run async-first with daily standups, and ship in your timezone's calendar. Senior India-based Python developers cost 40–60% less than equivalent senior backend engineers in the US or UK without quality compromise. We've shipped Python services across all four regions — Firmable (B2B sales intelligence), ConvertBankStatement (AI document processing), SimpleTalk AI (voice agents), AiMusicService (subscription AI) — including FastAPI APIs, ML pipelines, and async data tooling."
      },
      {
        question: 'FastAPI or Django — which do you recommend?',
        answer:
          "FastAPI for greenfield API-only services where async matters. Django for products that need an admin, ORM, auth, templating — anything where 'batteries included' saves you 3 months. We do both."
      },
      {
        question: 'Can your Python developers do machine learning?',
        answer:
          "Most can do applied ML (scikit-learn, XGBoost, fine-tuning open-weight models, RAG pipelines). For research-grade ML or training large models from scratch, hire a dedicated ML engineer instead."
      },
      {
        question: 'How do you handle Python performance issues?',
        answer:
          'Profile first (cProfile, py-spy, scalene). Most "slow Python" is actually slow database queries or N+1s. When it really is CPU, we move hot paths to Cython, Rust via PyO3, or rewrite the service in Go.'
      },
      {
        question: 'Pydantic v1 or v2?',
        answer:
          "v2 for everything new — it's 10–50x faster and the API is cleaner. We can also migrate v1 codebases."
      },
      {
        question: 'Do you write type-checked Python?',
        answer:
          "Yes — mypy --strict or pyright strict mode is the baseline. We don't ship untyped Python."
      },
      {
        question: 'Async vs sync Django?',
        answer:
          "Sync Django is still the default for most apps. We go async when there's a clear case (long-running I/O, many parallel external API calls, websockets). Mixing async and sync ORM is where teams get hurt — we plan for it deliberately."
      }
    ],
    relatedServiceTags: ['Python Backend Engineering', 'Backend Engineering', 'AI & Machine Learning'],
    relatedRoles: ['backend-developer', 'ai-engineer']
  },
  {
    slug: 'nodejs-developer',
    title: 'Node.js Developer',
    h1: 'Hire Senior Node.js Developers',
    subhead:
      'Hire dedicated senior Node.js developers — backend JavaScript engineers who write maintainable Node.js services in Fastify, Hono, NestJS, and Express.',
    metaTitle: 'Hire Node.js Developers — Senior, Dedicated | Techyor',
    metaDescription:
      'Hire Node.js developers with senior-level experience in Fastify, Hono, NestJS, real-time systems, and high-throughput APIs. TypeScript-first, production-shaped.',
    intro:
      "Hire senior Node.js developers who write Node like a production backend, not like browser JavaScript. The trap with most Node.js developers is the opposite end: ignored backpressure, untuned event loop, services that fall over at 200 RPS. Our team knows when to use streams, when to pin the libuv thread pool, why your Promise.all is silently leaking memory, and how to instrument a Node service so you can debug it at 3am. We default to TypeScript, write services with structured logging, and care about graceful shutdown.",
    primaryKeyword: 'hire node.js developers',
    whyUs: [
      {
        title: 'TypeScript-first, every time',
        description:
          'Strict mode, no `any` smuggled in. Types serve as contracts that survive refactors and onboarding.'
      },
      {
        title: 'Framework-fluent, not framework-religious',
        description:
          'We choose Fastify for raw performance, NestJS for structured large teams, Hono for edge runtime, Express only for compatibility. Pick by problem.'
      },
      {
        title: 'Operations-aware',
        description:
          'Graceful shutdown, signal handling, structured logs, distributed tracing. Our services behave well under SIGTERM, not just under load.'
      }
    ],
    skills: [
      'Frameworks — Fastify, Hono, NestJS, Express, tRPC',
      'TypeScript — strict mode, advanced types, generics',
      'Database — Prisma, Drizzle, Kysely, raw SQL',
      'Real-time — Socket.IO, ws, Server-Sent Events',
      'Queues — BullMQ, RabbitMQ, AWS SQS',
      'Auth — Lucia, Passport, custom JWT, OAuth flows',
      'Testing — Vitest, Jest, supertest, integration with real Postgres',
      'Observability — pino, OpenTelemetry, Sentry',
      'Deployment — Vercel Functions, AWS Lambda, Docker, Bun'
    ],
    techStack: [
      'Node.js 22 LTS',
      'Bun',
      'TypeScript',
      'Fastify',
      'Hono',
      'NestJS',
      'Prisma',
      'Drizzle',
      'BullMQ',
      'Postgres',
      'Redis'
    ],
    faq: [
      {
        question: 'Should I hire dedicated Node.js developers or full-stack generalists?',
        answer:
          "Hire dedicated Node.js developers when the backend is the product — APIs serving mobile and third-party consumers, real-time systems with WebSockets or SSE, queue-based workflows, services that need to scale past a single instance, or anything where event-loop discipline matters. A full-stack generalist will ship a working Node service; a dedicated Node.js developer will ship one with proper backpressure, libuv thread pool tuning, graceful shutdown handling, and structured logging that survives production. The split is most worth it past prototype RPS or when uptime targets become real."
      },
      {
        question: 'How is hiring a senior Node.js developer different from a junior?',
        answer:
          "Three things separate senior Node.js work from junior. First, event-loop instinct — a senior knows when a `Promise.all` is silently leaking memory, why a busy CPU-bound function is blocking every other request, when to reach for worker threads vs clustering. Second, framework opinions backed by reasoning — Fastify for raw RPS, NestJS for structured large teams, Hono on edge runtimes, Express only for ecosystem compatibility. Third, operations awareness — graceful shutdown under SIGTERM, structured logs with pino, OpenTelemetry traces, signal handling that doesn't lose in-flight requests. A senior Node.js developer keeps the service responsive under load and debuggable at 3am."
      },
      {
        question: 'Can I hire Node.js developers from India for a US or UK product?',
        answer:
          "Yes — most of our Node.js clients are in the US, UK, EU, and Australia. We overlap with East Coast US morning and UK afternoon hours, run async-first with daily standups, and ship in your timezone's calendar. Senior India-based Node.js developers cost 40–60% less than equivalent senior backend engineers in the US or UK without quality compromise. We've shipped Node.js APIs, real-time services, BullMQ-backed worker pipelines, and TypeScript monorepos across all four regions."
      },
      {
        question: 'Fastify, NestJS, or Express?',
        answer:
          "Fastify for performance-critical APIs. NestJS for large team codebases that benefit from structure (DI, modules). Express only when you need maximum ecosystem compatibility. We can also use Hono on edge runtimes."
      },
      {
        question: 'Can you handle high-throughput?',
        answer:
          'Yes. We tune connection pooling, libuv thread pool, garbage collection, and use clustering or worker threads where helpful. Ten of thousands of RPS per instance is achievable for typical APIs.'
      },
      {
        question: 'Bun in production — yes or no?',
        answer:
          "Yes for new services where the package compatibility holds. We test the dependency tree first; if Bun's compatibility is solid for the project, it ships 2–3x faster startup and simpler deployment. Otherwise, Node.js 22 LTS."
      },
      {
        question: 'How do you handle background jobs?',
        answer:
          'BullMQ on Redis for most cases. AWS SQS or Vercel Queues for managed alternatives. We build retry strategies, dead-letter queues, and observability for every queue from day one.'
      },
      {
        question: 'WebSockets or Server-Sent Events?',
        answer:
          "SSE for one-way push (notifications, live updates). WebSockets when you need bidirectional. Don't reach for WebSockets first — most 'we need WebSockets' problems are solved better with SSE + REST."
      },
      {
        question: 'Can you migrate a JavaScript codebase to TypeScript?',
        answer:
          "Yes — we've done several. Incremental migration is the right strategy: install TS, allow JS, convert files highest-traffic first, tighten compiler options gradually."
      }
    ],
    relatedServiceTags: ['Backend Engineering', 'Web Development & Design', 'APIs & Backend Services'],
    relatedRoles: ['typescript-developer', 'backend-developer', 'full-stack-developer']
  },
  {
    slug: 'wordpress-developer',
    title: 'WordPress Developer',
    h1: 'Hire Senior WordPress Developers',
    subhead:
      'Hire dedicated WordPress developers — plugin, theme, and headless WP engineers who ship custom builds and performance-first themes.',
    metaTitle: 'Hire WordPress Developers — Senior, Dedicated | Techyor',
    metaDescription:
      'Hire WordPress developers with senior-level experience — custom Gutenberg blocks, ACF, WordPress plugin developers, theme developers, headless WP, WooCommerce. Maintainable WordPress for US, UK, EU teams.',
    intro:
      "Hire WordPress developers who treat it as a CMS, not a templating wall. WordPress runs almost half the web — that doesn't mean it's been built well almost half the time. Our team includes WordPress plugin developers writing real PHP, theme developers building custom themes from scratch instead of layering page builders, and headless WordPress engineers running WP behind Next.js or SvelteKit frontends. We optimize page speed past 90 in Lighthouse on themes that didn't start there. If you have a theme that's 80MB of jQuery accreted over five years, we can refactor it. If you're starting fresh, we can build a maintainable WordPress site that doesn't need a rewrite in three years.",
    primaryKeyword: 'hire wordpress developers',
    whyUs: [
      {
        title: 'Custom themes, not page-builder soup',
        description:
          "We build custom WordPress themes in real PHP — no Elementor lock-in, no WP Bakery cleanup needed in two years. Block-based editing where it makes sense, custom code where it doesn't."
      },
      {
        title: 'Headless when it fits',
        description:
          'WordPress as a CMS, Next.js or SvelteKit on the front. Faster pages, better DX, same publishing workflow editors love.'
      },
      {
        title: 'Performance-first',
        description:
          'Object caching, edge CDN, image optimization, query reduction. Our WordPress sites consistently score 90+ on Lighthouse Mobile.'
      }
    ],
    skills: [
      'Custom theme development from scratch (PHP + Sass + JS)',
      'Custom Gutenberg blocks (React + InnerBlocks + dynamic blocks)',
      'Advanced Custom Fields (ACF) Pro — flexible content, repeaters, options',
      'WooCommerce — custom checkout, payment gateways, subscriptions',
      'Headless WordPress — WPGraphQL, Next.js / SvelteKit frontend',
      'Multilingual — WPML, Polylang, custom translation workflows',
      'Performance — object caching (Redis), edge CDN, query optimization',
      'Security — hardening, regular auditing, vulnerability response',
      'WP CLI, custom REST endpoints, hooks, custom post types'
    ],
    techStack: [
      'WordPress 6.x',
      'PHP 8.2+',
      'WPGraphQL',
      'ACF Pro',
      'WooCommerce',
      'Gutenberg',
      'Next.js (headless)',
      'Sass',
      'WP CLI'
    ],
    faq: [
      {
        question: 'Should I hire dedicated WordPress developers or freelancers from Fiverr/Upwork?',
        answer:
          "Hire dedicated WordPress developers when the project is more than a brochure site bolted onto a template. A freelance theme tweaker will get the first version live; dedicated WordPress developers write PHP that survives WP-core upgrades, build custom Gutenberg blocks in React, harden the install against the security issues WordPress is known for, and ship sites that score 90+ on Lighthouse Mobile instead of 40. The split is most worth it for sites with custom plugins, headless front-ends, WooCommerce stores past simple catalogs, or any project where WordPress is the operational backbone — not just the theme layer."
      },
      {
        question: 'WordPress plugin developer vs theme developer — what do I need?',
        answer:
          "Different specialists. A WordPress theme developer customizes the storefront — PHP templates, Sass, custom blocks, ACF flexible content, performance, brand UX. A WordPress plugin developer builds functionality that lives outside themes — custom post types, REST endpoints, admin UI, integrations with external systems, subscription logic, payment gateways. Most projects start with theme work; plugin developers come in when the site needs custom logic that doesn't belong in a theme (because it needs to survive theme changes). We have both."
      },
      {
        question: 'Can I hire WordPress developers from India for a US or UK site?',
        answer:
          "Yes — most of our WordPress clients are in the US, UK, EU, and Australia. We overlap with East Coast US morning and UK afternoon hours, run async-first with daily standups, and ship in your timezone's calendar. Senior India-based WordPress developers cost 40–60% less than equivalent senior WordPress engineers in the US or UK without quality compromise. Munish K. on our team is Top Rated on Upwork with 87+ jobs and 100% Job Success on WordPress and WooCommerce builds for clients across all four regions."
      },
      {
        question: 'Custom theme or page builder?',
        answer:
          "Custom theme almost always. Page builders (Elementor, Divi, WP Bakery) accumulate technical debt fast and lock your team into the builder. Custom themes cost more upfront, save more long-term."
      },
      {
        question: 'Headless WordPress — when does it make sense?',
        answer:
          "When the frontend benefits from a modern framework (React/Svelte/Next.js): page speed, animations, complex UI. Stick with traditional WP when the site is content-first, the frontend is simple, and editors are non-technical."
      },
      {
        question: 'Can you migrate from WordPress to a static site?',
        answer:
          "Yes — WordPress → Next.js, Astro, or 11ty migrations are a common service. We export content (often via WPGraphQL or REST), preserve URLs, set up redirects, and shut down WordPress when the new site is live."
      },
      {
        question: 'Do you do WooCommerce?',
        answer:
          "Yes — including custom checkout, custom payment gateways, subscriptions, multi-vendor, B2B pricing. For ecommerce-heavy projects, also evaluate Shopify; sometimes WooCommerce is the wrong tool."
      },
      {
        question: 'What about page speed?',
        answer:
          "We hit 85–95 mobile Lighthouse on WordPress sites we build. The recipe: object caching (Redis), edge CDN (Cloudflare), critical CSS, image optimization, and aggressive query reduction. We don't rely on a single 'cache plugin'."
      },
      {
        question: 'Security and maintenance?',
        answer:
          "WordPress's reputation for security issues is mostly about plugin sprawl. We minimize plugins, choose maintained ones, hard-secure wp-admin, and offer ongoing maintenance plans (updates, security audits, daily backups)."
      }
    ],
    relatedServiceTags: ['Content Management Systems', 'E-commerce', 'Website'],
    relatedRoles: ['woocommerce-developer', 'web-developer', 'frontend-developer']
  },
  {
    slug: 'shopify-developer',
    title: 'Shopify Developer',
    h1: 'Hire Senior Shopify Developers',
    subhead:
      'Hire dedicated Shopify developers — Shopify Plus, theme, and app developers who ship custom storefronts that convert.',
    metaTitle: 'Hire Shopify Developers — Senior, Dedicated | Techyor',
    metaDescription:
      'Hire Shopify developers with senior-level Online Store 2.0, Liquid, Hydrogen, custom app, and Shopify Plus experience. Custom themes and storefronts for US, UK, EU teams.',
    intro:
      "Hire Shopify developers who think in conversion rate, theme bloat, app performance, and the cost of every Liquid loop — not just theme tweaking. Our Shopify team has built custom OS 2.0 themes, headless Hydrogen storefronts, Shopify app developer work via Shopify CLI, custom theme developer builds for brand storefronts, and Shopify Plus migrations. We know which apps to remove on day one, why your AOV is dropping after that one A/B test, and how to ship a checkout extension that doesn't blow up your Plus contract.",
    primaryKeyword: 'hire shopify developers',
    whyUs: [
      {
        title: 'OS 2.0 + Hydrogen, both fluent',
        description:
          'Theme work in Liquid, JSON templates, sections everywhere — and headless Hydrogen storefronts on Oxygen or Vercel. We know when each is right.'
      },
      {
        title: 'Conversion-driven, not pixel-perfect-only',
        description:
          'Every theme change ships with a hypothesis: what conversion or AOV metric should this move? Pixel-perfect comes second to revenue impact.'
      },
      {
        title: 'Plus-ready',
        description:
          "Shopify Plus features — Scripts (where still applicable), Functions, Checkout Extensibility — are part of our regular work, not unfamiliar."
      }
    ],
    skills: [
      'Online Store 2.0 — sections everywhere, JSON templates, dynamic content',
      'Liquid — performance-aware, no-loop-soup',
      'Hydrogen — Oxygen and Vercel deployment, custom storefronts',
      'Shopify Functions — discount, payment, shipping, cart customization',
      'Custom apps — Shopify CLI, Remix admin, embedded apps',
      'Checkout Extensibility — UI extensions, post-purchase pages',
      'Storefront API & Admin API — GraphQL, webhooks, pagination',
      'Performance — theme weight reduction, app audit, image optimization',
      'A/B testing — through native experiments or third-party tools'
    ],
    techStack: [
      'Shopify Plus',
      'Liquid',
      'Hydrogen',
      'Remix (Shopify apps)',
      'GraphQL Admin API',
      'Storefront API',
      'Shopify Functions',
      'TypeScript',
      'Tailwind'
    ],
    faq: [
      {
        question: 'Should I hire dedicated Shopify developers or use a Shopify Expert agency?',
        answer:
          "Hire dedicated Shopify developers when the store has any of: custom theme work where the storefront is the product, custom apps in the Shopify App Store, headless Hydrogen migrations, Shopify Plus checkout extensions, or complex B2B/wholesale logic. A general Shopify Expert agency will tackle the marketing-site layer; a dedicated Shopify developer handles the harder engineering — theme weight optimization, custom Functions for discounts/shipping/payment, Shopify Plus Scripts-to-Functions migrations, and storefront API work that's beyond Liquid. The split is most worth it past the prototype theme stage."
      },
      {
        question: 'Shopify app developer vs Shopify theme developer — what do I need?',
        answer:
          "Different specialists. A Shopify theme developer customizes the storefront — Liquid templates, sections, JSON config, performance, brand UX. A Shopify app developer builds embedded or public apps using Shopify CLI, Remix, and Polaris — adding new functionality across the admin or storefront via the API. Most stores need theme work first. Apps come in when the store needs custom logic that doesn't belong in a theme (inventory rules, custom workflows, third-party integrations sold as products). We have both."
      },
      {
        question: 'Can I hire Shopify developers from India for a US or UK store?',
        answer:
          "Yes — most of our Shopify clients are in the US, UK, EU, and Australia. We overlap with East Coast US morning and UK afternoon hours, run async-first with daily standups, and ship in your timezone's calendar. Senior India-based Shopify developers cost 40–60% less than equivalent senior Shopify engineers in the US or UK without quality compromise. Our portfolio includes Allbirds, Mane Ethical, Christmas Loft, Evolve Clothing Gallery, REA Power, Guard Dog Security, Havalink, AgensIP StyleEst, and 260 Sample Sale — Shopify storefronts shipped for brands across all four regions."
      },
      {
        question: 'Custom theme or premium theme?',
        answer:
          "Custom theme for brands where the storefront is the product. Premium themes (Dawn, Impulse, Empire) make sense for fast launches; we customize them heavily but build from scratch when the design demands it."
      },
      {
        question: 'Hydrogen — when is it worth it?',
        answer:
          "When the storefront experience justifies the dev investment: custom interactions, complex product configurators, content-heavy commerce, blazing fast pages. For typical product-grid + product-detail stores, Liquid OS 2.0 is faster to build and easier to maintain."
      },
      {
        question: 'Can you migrate from BigCommerce / Magento / WooCommerce?',
        answer:
          'Yes — full migration including products, customers, orders, URL preservation, redirects, and email template recreation. We typically do these in 4–8 weeks depending on catalog complexity.'
      },
      {
        question: 'Custom Shopify apps?',
        answer:
          'Yes — embedded apps in Remix, public listing apps, private/custom apps. We use Shopify CLI for scaffolding and Polaris for admin UI. Apps with subscription billing handled via Shopify Billing API.'
      },
      {
        question: 'Performance on Shopify?',
        answer:
          "We routinely take stores from 30s LCP to <2.5s. The recipe: audit and remove unused apps, slim the theme, lazy-load images and below-fold sections, remove third-party scripts, use Shopify's built-in CDN aggressively."
      },
      {
        question: 'Shopify Plus features — Scripts, Functions, Flow?',
        answer:
          "Yes — we use Functions for new discount/cart/shipping/payment customizations. Flow for automation. Scripts only on legacy Plus stores still using them; new work goes to Functions."
      }
    ],
    relatedServiceTags: ['E-commerce', 'E-Commerce Platforms', 'Web Development & Design'],
    relatedRoles: ['woocommerce-developer', 'web-developer', 'frontend-developer', 'wordpress-developer']
  },
  {
    slug: 'ai-engineer',
    title: 'AI Engineer',
    h1: 'Hire Senior AI Engineers',
    subhead:
      'Engineers who ship LLM features, RAG pipelines, and AI agents into production — not demo videos.',
    metaTitle: 'Hire AI Engineers — LLM, RAG, Agents | Techyor',
    metaDescription:
      'Hire senior AI engineers experienced in LLM integration, RAG, agent frameworks, evals, and production observability. Ship AI features that actually ship.',
    intro:
      "AI engineering in 2026 is about reliability, cost, and evals — not which model is hot this week. Our AI engineers have shipped LLM features into production for SaaS platforms, customer support automation, internal tools, and content generation pipelines. They know how to design a RAG system that doesn't hallucinate, when to fine-tune vs prompt vs retrieve, how to build evaluation harnesses that catch regressions before users do, and how to keep token costs predictable under load. We use the AI SDK, MCP servers, and provider-agnostic patterns by default — your code shouldn't be coupled to one vendor.",
    primaryKeyword: 'hire ai engineer',
    whyUs: [
      {
        title: 'Provider-agnostic by default',
        description:
          'Vercel AI Gateway or LangChain abstractions — your code shouldn\'t couple to one model provider. Switch from Claude to GPT-5 to Gemini in a config change, not a rewrite.'
      },
      {
        title: 'Evals as a first-class artifact',
        description:
          'Every AI feature ships with an evaluation harness — golden datasets, automated scoring, regression detection. We can prove the feature got better, not just feels better.'
      },
      {
        title: 'Cost-aware, latency-aware',
        description:
          'We design for unit economics from day one. Caching, model routing (cheap model first, escalate to flagship), streaming for UX wins. Your bill is predictable.'
      }
    ],
    skills: [
      'LLM integration — OpenAI, Anthropic Claude, Gemini, open-weight (Llama, Mistral)',
      'RAG pipelines — chunking, embedding, retrieval, reranking, evals',
      'Agent frameworks — Vercel AI SDK, LangGraph, CrewAI, custom orchestration',
      'Vector databases — pgvector, Pinecone, Weaviate, Qdrant, Chroma',
      'Fine-tuning — LoRA, QLoRA on open-weight models',
      'Prompt engineering — few-shot, chain-of-thought, structured output',
      'Evaluation — Promptfoo, LangSmith, custom eval harnesses',
      'Observability — LLM tracing, token usage tracking, latency monitoring',
      'MCP — building servers, integrating clients into AI workflows'
    ],
    techStack: [
      'Anthropic Claude',
      'OpenAI',
      'Vercel AI SDK',
      'LangChain',
      'pgvector',
      'Pinecone',
      'LangGraph',
      'Promptfoo',
      'MCP servers'
    ],
    faq: [
      {
        question: 'RAG vs fine-tuning — when do you choose what?',
        answer:
          "RAG by default: it's cheaper, faster to iterate, and works for 80% of 'AI knows our docs' use cases. Fine-tune when you need behavior change (tone, format) or domain knowledge that's awkward to retrieve. We've often combined the two — fine-tune for behavior, RAG for facts."
      },
      {
        question: 'Which model do you recommend?',
        answer:
          "It depends on the task. Anthropic Claude Opus 4.7 for the hardest reasoning tasks. Sonnet 4.6 for most production work. Haiku 4.5 for high-volume, low-latency. GPT-5 family for tool use and structured output. We design code to be model-agnostic so you can switch."
      },
      {
        question: 'How do you measure AI feature quality?',
        answer:
          "Evaluation harnesses with golden datasets. Automated scoring (LLM-as-judge for subjective, rule-based for structured). User feedback signals. We don't ship AI features without a way to measure regressions."
      },
      {
        question: 'Are you safe with hallucinations?',
        answer:
          "We design for them. Citation requirements (every claim links to a source), structured output validation, refusal patterns when confidence is low. Hallucinations don't disappear — we constrain where they can do damage."
      },
      {
        question: 'Can you build AI agents?',
        answer:
          "Yes — production agents, not demos. Tool use, plan-execute loops, human-in-the-loop checkpoints, durable execution (Vercel Workflow, Inngest). We've shipped agents that take real actions on real systems."
      },
      {
        question: 'What about cost control?',
        answer:
          'Token budgeting per request, prompt caching (Anthropic), model routing (Haiku first, escalate), response caching for deterministic queries, streaming so users see progress. AI cost is engineering, not magic.'
      },
      {
        question: 'MCP — what is it and do you use it?',
        answer:
          "Model Context Protocol — Anthropic's open standard for AI tool integration. Yes, we build MCP servers for clients (data sources, internal APIs) and integrate MCP into agent workflows. It's becoming the default plumbing for AI integrations."
      }
    ],
    relatedServiceTags: ['AI & Machine Learning', 'Python Backend Engineering'],
    relatedRoles: ['python-developer', 'ml-engineer']
  },

  // ─── PHASE 2 ──────────────────────────────────────────────────────────────
  {
    slug: 'frontend-developer',
    title: 'Frontend Developer',
    h1: 'Hire Senior Frontend Developers',
    subhead:
      'Hire dedicated frontend developers who own the entire user-facing surface — from design system to performance budget to accessibility.',
    metaTitle: 'Hire Frontend Developers — Senior, Dedicated | Techyor',
    metaDescription:
      'Hire frontend developers with senior-level experience in React, Vue, Svelte, accessibility, performance, and design system implementation. Production-grade UI.',
    intro:
      "Hire frontend developers who own the user-facing surface end-to-end. Our team doesn't just translate Figma into JSX — they own performance, accessibility, animation polish, design system implementation, and CI for visual regressions. Frontend has become the most under-respected, over-leveraged role in product engineering. We have opinions about which framework belongs on which project, why your bundle ballooned, and what's actually blocking your LCP. Hire frontend specialists when the UI is the product, when the design system needs to scale, or when performance budgets are slipping.",
    primaryKeyword: 'hire frontend developers',
    whyUs: [
      {
        title: 'Framework-fluent, framework-agnostic',
        description:
          "React, Vue, Svelte, Solid — we choose by problem, not preference. Most of our team is multi-framework, with deep React and Svelte experience."
      },
      {
        title: 'Design system, not just components',
        description:
          "We build design systems that survive five product teams: tokens, semantic naming, dark mode that works, accessibility baked in. Storybook is documentation, not vanity."
      },
      {
        title: 'Performance and accessibility, not optional',
        description:
          'Core Web Vitals targets, WCAG 2.2 AA, keyboard-first interactions. These are part of the definition of done — every PR.'
      }
    ],
    skills: [
      'React, Vue, Svelte, SvelteKit',
      'TypeScript with strict mode',
      'CSS architecture — Tailwind, CSS modules, Sass, design tokens',
      'Animation — Framer Motion, GSAP, CSS animations, Lottie',
      'Accessibility — ARIA, focus management, screen reader testing, axe',
      'Design system implementation — Radix, shadcn/ui, custom systems',
      'Performance — bundle analysis, code-splitting, image optimization',
      'Visual regression — Chromatic, Playwright screenshots, Percy',
      'Build tooling — Vite, Webpack, Turbopack, esbuild'
    ],
    techStack: [
      'React',
      'Svelte',
      'Vue',
      'TypeScript',
      'Tailwind',
      'Radix UI',
      'shadcn/ui',
      'Framer Motion',
      'Storybook',
      'Vite'
    ],
    faq: [
      {
        question: 'Should I hire dedicated frontend developers or generalists?',
        answer:
          "Hire dedicated frontend developers when the UI is the product, when the design system needs to outlive its first author, or when performance and accessibility have measurable business cost. A full-stack generalist will ship working UI; a dedicated frontend developer ships UI that survives growth — bundles that don't drift over 18 months, accessibility that doesn't degrade with each feature, animations that don't cost frames on mobile. The split is most worth it past 3 engineers or when a designer needs a real implementation partner."
      },
      {
        question: 'How is hiring a senior frontend developer different from a junior?',
        answer:
          "Three things separate senior from junior frontend work. First, framework opinions backed by reasoning — knowing when React Server Components are the right tool and when they're a footgun, why your team's app should be Svelte not Next.js. Second, performance instinct — they read a Lighthouse report and immediately know which three changes will move the needle. Third, accessibility as a default, not a sprint. A senior frontend developer's PR is keyboard-navigable, screen-reader-tested, and within the perf budget without anyone asking."
      },
      {
        question: 'Can I hire frontend developers from India for a US or UK team?',
        answer:
          "Yes — most of our clients are in the US, UK, EU, and Australia. We overlap with East Coast US morning and UK afternoon hours, run async-first with daily standups, and ship in your timezone's calendar. Senior India-based frontend developers cost 40–60% less than equivalent senior frontend engineers in the US or UK without quality compromise. We've shipped design system work, complex animations, and accessibility-heavy products across all four regions."
      },
      {
        question: 'React, Vue, or Svelte?',
        answer:
          "React for the largest ecosystem and team availability. Svelte for performance-critical apps with smaller teams. Vue for clean ergonomics, especially at growing teams. We do all three."
      },
      {
        question: 'Tailwind or CSS modules?',
        answer:
          "Tailwind for speed, consistency, and small bundle. CSS modules / vanilla-extract when the design system is highly opinionated and Tailwind classes get unwieldy. We pair Tailwind with shadcn/ui or custom token systems."
      },
      {
        question: 'Animation library — Framer Motion or GSAP?',
        answer:
          "Framer Motion for React UI animations. GSAP for complex timeline-based animations and non-React contexts. CSS animations when transform + opacity is enough."
      },
      {
        question: 'How do you ensure accessibility?',
        answer:
          'Automated checks (axe-core in CI), manual keyboard testing, screen reader testing on real assistive tech, and design review with accessibility in mind. WCAG 2.2 AA is the baseline.'
      },
      {
        question: 'How do you handle design handoff?',
        answer:
          "Tight collaboration with designers — we review Figma files for technical feasibility before sprint planning, ask questions early, and pair with designers on tricky interactions."
      },
      {
        question: 'Performance budgets — how do you enforce?',
        answer:
          "Lighthouse CI on every PR, bundle-size diff comments, Core Web Vitals monitoring in production. When a regression hits the budget, the PR doesn't merge until we resolve it."
      }
    ],
    relatedServiceTags: ['Web Development & Design', 'UX & UI Design', 'Web Applications'],
    relatedRoles: ['react-developer', 'nextjs-developer', 'typescript-developer', 'ui-ux-designer']
  },
  {
    slug: 'backend-developer',
    title: 'Backend Developer',
    h1: 'Hire Senior Backend Developers',
    subhead:
      'Hire dedicated backend developers who design APIs, model data, and run production systems that don\'t fall over at 3am.',
    metaTitle: 'Hire Backend Developers — Senior, Dedicated | Techyor',
    metaDescription:
      'Hire backend developers with senior-level experience in Node.js, Python, Go, Postgres, Redis, and AWS. API design, data modeling, observability, production-grade.',
    intro:
      "Hire backend developers who don't just write APIs — they design them. Our team models data with future flexibility in mind, sets up observability before they need it, chooses Postgres extensions you didn't know existed, and writes services that handle real production traffic without surprises. Backend is where products earn their revenue. We're language-pluralist (Node.js, Python, Go) but pattern-consistent: structured concurrency, typed contracts, dependency injection, and ops-aware code.",
    primaryKeyword: 'hire backend developers',
    whyUs: [
      {
        title: 'API design as a craft',
        description:
          "REST done well, GraphQL where it earns its complexity, tRPC for tightly-coupled stacks. We design APIs that are pleasant to consume and survive evolution."
      },
      {
        title: 'Database depth',
        description:
          'Schema design, indexes, query plans, partitioning, replication. We go deep on Postgres specifically — extensions like pg_partman, pgvector, hypopg are part of regular practice.'
      },
      {
        title: 'Observability from day one',
        description:
          "Structured logs, distributed tracing, metric dashboards, alert thresholds. Our services are debuggable when (not if) something breaks."
      }
    ],
    skills: [
      'API design — REST, GraphQL, tRPC, OpenAPI specs, versioning strategies',
      'Languages — Node.js (TypeScript), Python, Go',
      'Databases — Postgres (deep), MySQL, MongoDB, Redis',
      'Caching — Redis, in-memory LRU, CDN edge caching, application caching',
      'Queues — BullMQ, Celery, RabbitMQ, AWS SQS, NATS',
      'Auth — OAuth 2.0, JWT, session, multi-tenant, multi-factor',
      'Cloud — AWS (Lambda, RDS, S3, ECS), Vercel, Cloudflare Workers',
      'Observability — structured logging, OpenTelemetry, Sentry, Datadog',
      'Testing — unit, integration with real services, contract tests, load tests'
    ],
    techStack: [
      'TypeScript',
      'Python',
      'Go',
      'Postgres',
      'Redis',
      'gRPC',
      'GraphQL',
      'AWS',
      'Docker',
      'OpenTelemetry'
    ],
    faq: [
      {
        question: 'Should I hire dedicated backend developers or full-stack generalists?',
        answer:
          "Hire dedicated backend developers when the data model is non-trivial, when API contracts are consumed by mobile or third parties, when uptime targets are real, or when scale is on the horizon (10k+ users, real-time features, complex billing). A full-stack engineer will ship a working API; a dedicated backend developer will ship one with the right indexes, the right cache invalidation strategy, and observability that catches problems before customers do. The split is most worth it past 3 engineers or when you have a real production load."
      },
      {
        question: 'How is hiring a senior backend developer different from a junior?',
        answer:
          "Three things separate senior from junior backend work. First, data modeling instinct — a senior knows when a JSONB column is the right choice and when it's a future migration headache, when to denormalize, and when to lean on Postgres extensions. Second, failure-mode thinking — they design retries, idempotency, and graceful degradation before the bug report arrives, not after. Third, observability as default — structured logs, traces, and metrics ship with the feature, not after the 3am page. A senior backend developer turns 'it works' into 'it keeps working at 100x scale.'"
      },
      {
        question: 'Can I hire backend developers from India for a US or UK product?',
        answer:
          "Yes — most of our clients are in the US, UK, EU, and Australia. We overlap with East Coast US morning and UK afternoon hours, run async-first with daily standups, and ship in your timezone's calendar. Senior India-based backend developers cost 40–60% less than equivalent senior backend engineers in the US or UK without quality compromise. We've shipped multi-tenant SaaS backends, high-throughput data pipelines, and AI-adjacent infrastructure across all four regions."
      },
      {
        question: 'Which language do you recommend?',
        answer:
          "TypeScript (Node.js) for stack consistency with frontend. Python for ML-adjacent work, data tooling, or FastAPI products. Go for high-throughput services or when teams have systems engineering experience. We choose by team and problem, not by trend."
      },
      {
        question: 'REST or GraphQL?',
        answer:
          "REST for most public APIs and simple CRUD. GraphQL when frontend team velocity benefits from query flexibility (mobile apps, complex dashboards). tRPC when frontend and backend share a TypeScript codebase."
      },
      {
        question: 'Microservices or monolith?',
        answer:
          'Modular monolith first. Microservices later, only when team size or scale forces the split. Premature microservices is the most common architecture mistake we fix.'
      },
      {
        question: 'How do you handle database migrations?',
        answer:
          'Forward-only, expand-then-contract for schema changes. Migrations run automatically in CI/CD. Zero-downtime patterns for renames, NOT-NULL additions, and column drops. Backfill jobs are tracked and observable.'
      },
      {
        question: 'How do you scale a slow API?',
        answer:
          "Profile first. Most 'API is slow' is a database query (missing index, N+1, expensive serialization). After DB, look at HTTP/network, then CPU. We use APM tools to find the bottleneck before guessing."
      },
      {
        question: 'Serverless or containers?',
        answer:
          "Serverless (Vercel Functions, AWS Lambda) for API services with bursty traffic and small footprints. Containers (ECS, Cloud Run) when warm starts matter, when you need long-running connections, or when serverless cold starts are unacceptable."
      }
    ],
    relatedServiceTags: ['Backend Engineering', 'Python Backend Engineering', 'APIs & Backend Services'],
    relatedRoles: ['nodejs-developer', 'python-developer', 'backend-developer']
  },
  {
    slug: 'typescript-developer',
    title: 'TypeScript Developer',
    h1: 'Hire Senior TypeScript Developers',
    subhead:
      'Hire dedicated TypeScript developers fluent in advanced types — generics, conditional types, branded types — across React, Node, and beyond.',
    metaTitle: 'Hire TypeScript Developers — Senior, Dedicated | Techyor',
    metaDescription:
      'Hire TypeScript developers with senior-level experience in advanced types, strict mode, type-safe APIs, and full-stack TypeScript projects.',
    intro:
      "Hire TypeScript developers who actually use the type system instead of tolerating it. Most 'TypeScript developers' are JavaScript developers with a tsconfig file. Ours write generic functions that compose, conditional types that catch real bugs, branded types that prevent ID-mixing, and discriminated unions that make impossible states impossible. We use TypeScript across the stack: React, Node.js, tRPC, Drizzle, Zod. The result is fewer runtime bugs, faster onboarding, and refactors that complete in hours instead of days.",
    primaryKeyword: 'hire typescript developers',
    whyUs: [
      {
        title: 'Strict mode, no escape hatches',
        description:
          "We enforce strict, noUncheckedIndexedAccess, exactOptionalPropertyTypes. We don't smuggle in `any`. Types are a force multiplier, not a tax."
      },
      {
        title: 'Type-safe across the stack',
        description:
          "tRPC, Drizzle, Zod give us end-to-end type safety from database to UI. A schema change reveals every site that needs updating before we ship."
      },
      {
        title: 'Advanced types in production',
        description:
          'Generics, conditional types, mapped types, type predicates — used pragmatically to model real domain logic, not as an academic exercise.'
      }
    ],
    skills: [
      'TypeScript 5.x — strict mode, noUncheckedIndexedAccess, exactOptionalPropertyTypes',
      'Advanced types — generics, conditional, mapped, template literal',
      'Type-safe APIs — tRPC, Hono RPC, custom contract types',
      'Schema validation — Zod, Valibot, Effect',
      'Type-safe ORM — Drizzle, Prisma, Kysely',
      'TypeScript ESLint — typescript-eslint with type-aware rules',
      'Build tooling — tsc, esbuild, swc, tsup',
      'Migration — JavaScript to TypeScript, weak types to strict'
    ],
    techStack: [
      'TypeScript 5.x',
      'tRPC',
      'Zod',
      'Drizzle',
      'Hono',
      'Vite',
      'esbuild',
      'tsup',
      'typescript-eslint'
    ],
    faq: [
      {
        question: 'Should I hire dedicated TypeScript developers or a JavaScript team?',
        answer:
          "Hire dedicated TypeScript developers when type safety has real business cost: contracts crossing service boundaries, mobile and third-party API consumers, large refactors on the roadmap, or a team big enough that the next dev shouldn't have to read every file to understand a function signature. A JavaScript team will ship working code; a dedicated TypeScript developer will ship code where the next refactor is a 30-minute IDE-led job instead of a week of regression hunting. The payoff compounds the longer the codebase lives."
      },
      {
        question: 'How is hiring a senior TypeScript developer different from a JavaScript developer who uses TS?',
        answer:
          "Three things separate senior TypeScript work from JavaScript-with-types. First, type-system literacy — knowing when a conditional type is the right tool and when it's premature, when generics earn their complexity. Second, runtime/compile-time discipline — pairing types with schema validation (Zod, Valibot) so the type system protects what the runtime actually sees. Third, refactor instinct — building APIs whose shape a TypeScript-aware editor can refactor across a 50k-line codebase in seconds. A senior TypeScript developer turns 'we should rename this field' from a sprint into a commit."
      },
      {
        question: 'Can I hire TypeScript developers from India for a US or UK product?',
        answer:
          "Yes — most of our clients are in the US, UK, EU, and Australia. We overlap with East Coast US morning and UK afternoon hours, run async-first with daily standups, and ship in your timezone's calendar. Senior India-based TypeScript developers cost 40–60% less than equivalent senior engineers in the US or UK without quality compromise. We've shipped strict-mode codebases, tRPC monorepos, and JavaScript-to-TypeScript migrations across all four regions."
      },
      {
        question: 'How strict is your strict mode?',
        answer:
          "All eight strict flags + noUncheckedIndexedAccess + exactOptionalPropertyTypes + noPropertyAccessFromIndexSignature. We turn on whatever the codebase can sustain — and migrate incrementally if needed."
      },
      {
        question: 'tRPC or REST + types?',
        answer:
          'tRPC when frontend and backend are in one TypeScript repo and the team controls both. REST + Zod schemas + generated client when the API has multiple consumers (mobile, third-parties).'
      },
      {
        question: 'Should I migrate my JavaScript codebase?',
        answer:
          'Usually yes — incrementally. Add `tsconfig.json`, allow JS, convert highest-traffic files first, tighten compiler options gradually over months. Net positive in 3–6 months for most non-trivial codebases.'
      },
      {
        question: 'Drizzle, Prisma, or Kysely?',
        answer:
          "Drizzle for SQL-aware teams that want type-safe queries close to SQL. Prisma for teams wanting maximum DX with migrations included. Kysely for query-builder fans. We do all three; choice is project-dependent."
      },
      {
        question: "What about runtime validation?",
        answer:
          "Zod by default — mature ecosystem, integrates with tRPC and most frameworks. Valibot for bundle-size-critical edge functions. Effect Schema for codebases adopting Effect."
      },
      {
        question: 'Generics — when do they pay off?',
        answer:
          "When you have multiple call sites with structural similarity and type variance. Don't reach for generics first; refactor to them when duplication shows up."
      }
    ],
    relatedServiceTags: ['Web Development & Design', 'Backend Engineering', 'React & Next.js Development'],
    relatedRoles: ['react-developer', 'nodejs-developer', 'nextjs-developer', 'frontend-developer']
  },
  {
    slug: 'flutter-developer',
    title: 'Flutter Developer',
    h1: 'Hire Senior Flutter Developers',
    subhead:
      'Hire dedicated Flutter developers who ship cross-platform mobile apps with consistent UI and 60fps animations.',
    metaTitle: 'Hire Flutter Developers — Senior, Dedicated | Techyor',
    metaDescription:
      'Hire Flutter developers with senior-level experience in Dart, Riverpod, custom rendering, and shipping apps to iOS, Android, web, and desktop.',
    intro:
      "Hire Flutter developers who ship apps with the same brand experience on iOS, Android, web, and (increasingly) desktop — using a single Dart codebase. Our team knows when to use Flutter's built-in widgets, when to drop into platform channels for native APIs, and when Flutter is the wrong tool (heavy native integration, App Clips). Flutter is the right choice when UI consistency matters more than native feel. We use Riverpod or BLoC for state, GoRouter for navigation, and ship with Firebase or custom backends.",
    primaryKeyword: 'hire flutter developers',
    whyUs: [
      {
        title: 'Consistent UI across every platform',
        description:
          "Flutter's strength is brand UI that looks identical everywhere. We exploit it: pixel-perfect across iOS and Android, with web and desktop targets when product calls for it."
      },
      {
        title: 'Performance-aware Dart',
        description:
          "We profile with DevTools, watch for build-method overhead, use const constructors and ListView.builder properly. 60fps is the default, not the exception."
      },
      {
        title: 'Native bridge fluency',
        description:
          'When we need a platform API Flutter doesn\'t expose, we write the platform channel: Swift on iOS, Kotlin on Android. We don\'t pretend Flutter is a complete native abstraction.'
      }
    ],
    skills: [
      'Flutter 3.x — widgets, custom rendering, Slivers, Hero animations',
      'Dart — sound null safety, async/await, isolates',
      'State management — Riverpod 2, BLoC, Provider',
      'Navigation — GoRouter, AutoRoute, deep links',
      'Local storage — Drift (SQLite), Hive, isar',
      'Platform channels — Swift / Kotlin native integration',
      'Firebase — Firestore, Auth, FCM, Crashlytics, Analytics',
      'Animation — Implicit/Explicit, Lottie, Rive',
      'Testing — widget tests, integration tests, golden file tests'
    ],
    techStack: [
      'Flutter 3.x',
      'Dart 3.x',
      'Riverpod 2',
      'GoRouter',
      'Drift',
      'Firebase',
      'Sentry',
      'Rive',
      'fastlane'
    ],
    faq: [
      {
        question: 'Should I hire dedicated Flutter developers or a generalist mobile team?',
        answer:
          "Hire dedicated Flutter developers when the app is shipping to iOS and Android simultaneously, when brand UI consistency matters more than platform-native feel, or when the same team needs to push to web and desktop later. A mobile generalist will get the first build out; a dedicated Flutter developer will architect for the scale problems specific to Flutter — build_method overhead, isolate boundaries, platform channel hot paths, custom render objects when widgets aren't enough. The split is most worth it past the prototype stage."
      },
      {
        question: 'How is hiring a senior Flutter developer different from a junior?',
        answer:
          "Three things separate senior Flutter work from junior. First, performance instinct — they read a slow build and immediately reach for const constructors, ListView.builder, RepaintBoundary, and DevTools timeline frames. Second, state-management opinions backed by reasoning — knowing when Riverpod's family modifiers earn the complexity and when BLoC's discipline is the right call. Third, native bridge fluency — when a community plugin breaks, they write the Swift or Kotlin themselves instead of waiting for a fix. A senior Flutter developer keeps the app on the green frame budget all the way to launch."
      },
      {
        question: 'Can I hire Flutter app developers from India for a US or UK product?',
        answer:
          "Yes — most of our clients are in the US, UK, EU, and Australia. We overlap with East Coast US morning and UK afternoon hours, run async-first with daily standups, and ship in your timezone's calendar. Senior India-based Flutter developers cost 40–60% less than equivalent senior mobile engineers in the US or UK without quality compromise. We've shipped Flutter apps to the App Store and Play Store across all four regions, including apps with custom platform channels, complex state, and heavy animation work."
      },
      {
        question: 'Flutter vs React Native?',
        answer:
          "Flutter for consistent UI across platforms (especially when brand UI matters more than platform-native feel) and for greenfield teams without React investment. React Native for teams with web React investment that benefits from shared mental models."
      },
      {
        question: 'State management — Riverpod or BLoC?',
        answer:
          "Riverpod for most projects — modern, testable, less boilerplate. BLoC for teams already invested or where strict pattern enforcement helps a large team. We do both."
      },
      {
        question: 'Flutter for web — production-ready?',
        answer:
          "For specific use cases: complex dashboards, internal tools, embedded UI. Not for SEO-driven public sites — initial bundle is heavy and SSR isn't first-class. We advise per-project."
      },
      {
        question: 'Flutter for desktop?',
        answer:
          "Production-ready on macOS, Windows, Linux for productivity tools and admin apps. We've shipped Flutter desktop apps. Not the right call for high-performance native desktop work (video editors, games)."
      },
      {
        question: 'How do you handle native APIs?',
        answer:
          "Use a community plugin if maintained. Write a custom platform channel when not. We can write Swift and Kotlin — Flutter is a UI framework with a native bridge, not a native abstraction."
      },
      {
        question: 'CI/CD for Flutter?',
        answer:
          "fastlane for iOS and Android signing/upload. Codemagic or GitHub Actions for build orchestration. We automate from PR → TestFlight / Play Console internal testing → production rollout."
      }
    ],
    relatedServiceTags: ['Mobile App Development', 'Mobile Applications'],
    relatedRoles: ['mobile-app-developer', 'react-native-developer', 'ios-developer', 'android-developer']
  },
  {
    slug: 'ios-developer',
    title: 'iOS Developer',
    h1: 'Hire Senior iOS Developers',
    subhead:
      'Hire dedicated iOS app developers — Swift and SwiftUI engineers who ship native apps that feel native, Apple HIG-fluent and App Store launch-ready.',
    metaTitle: 'Hire iOS Developers — Senior, Dedicated | Techyor',
    metaDescription:
      'Hire iOS developers with senior-level Swift, SwiftUI, UIKit, Core Data, App Store launch experience. Native iOS app developers for US, UK, and EU teams.',
    intro:
      "Hire iOS developers who ship apps that feel native, not cross-platform. Our iOS app developers write Swift, build with SwiftUI for new screens (UIKit when interop demands it), navigate Core Data and SwiftData decisions, and ship to the App Store with the kind of polish Apple rewards in features. Native iOS development is what you reach for when the user experience must feel iOS. They know what's new in the latest iOS, how to handle App Store review surprises, and what HIG actually says (vs what people remember it saying).",
    primaryKeyword: 'hire ios developers',
    whyUs: [
      {
        title: 'SwiftUI-first, UIKit-fluent',
        description:
          "New work in SwiftUI, UIKit when API maturity demands it. We know the boundary and bridge it cleanly with UIHostingController and UIViewRepresentable."
      },
      {
        title: 'HIG-respecting, brand-respecting',
        description:
          "We read the Human Interface Guidelines as a starting point, not a constraint. Where the brand needs custom, we go custom — informed, not ignorant."
      },
      {
        title: 'App Store launch fluency',
        description:
          "TestFlight, App Store Connect, in-app purchases via StoreKit 2, App Privacy disclosures, ASO basics. We've shipped through review enough times to anticipate the issues."
      }
    ],
    skills: [
      'Swift 6 — strict concurrency, actors, structured concurrency',
      'SwiftUI — declarative UI, animations, navigation',
      'UIKit — when API maturity demands (custom transitions, advanced gestures)',
      'Core Data and SwiftData — model design, migrations, CloudKit sync',
      'StoreKit 2 — IAP, subscriptions, server-side validation',
      'Combine and async/await for reactive code',
      'Push notifications — APNs, rich notifications, notification service extensions',
      'Widgets, App Clips, Live Activities',
      'Performance — Instruments profiling, view hierarchy debugging'
    ],
    techStack: [
      'Swift 6',
      'SwiftUI',
      'UIKit',
      'Core Data / SwiftData',
      'StoreKit 2',
      'Combine',
      'XCTest',
      'fastlane'
    ],
    faq: [
      {
        question: 'Should I hire dedicated iOS developers or a cross-platform team?',
        answer:
          "Hire dedicated iOS developers when the user experience must feel iOS, when you need to ship App Clips, Widgets, Live Activities, or App Intents, when StoreKit subscriptions are core to revenue, or when the brand cares about being featured by Apple. A cross-platform Flutter or React Native team will ship a functional app; a dedicated iOS developer will ship one that respects HIG, handles the App Store review cycle without surprises, and uses platform features that wouldn't survive a cross-platform abstraction. The split is most worth it past the prototype stage."
      },
      {
        question: 'How is hiring a senior iOS app developer different from a junior?',
        answer:
          "Three things separate senior iOS work from junior. First, App Store review instinct — they anticipate the common rejections (Sign in with Apple, IAP for digital goods, demo accounts, privacy disclosures) and architect around them upfront. Second, performance ownership — they read an Instruments trace and immediately know which view hierarchy churn or layout pass is costing frames. Third, platform fluency — Combine, Swift concurrency, structured concurrency, actors, StoreKit 2 — used pragmatically, not as an academic exercise. A senior iOS app developer keeps the app on the 60fps budget all the way through App Store launch."
      },
      {
        question: 'Can I hire iOS app developers from India for a US or UK product?',
        answer:
          "Yes — most of our clients are in the US, UK, EU, and Australia. We overlap with East Coast US morning and UK afternoon hours, run async-first with daily standups, and ship in your timezone's calendar. Senior India-based iOS app developers cost 40–60% less than equivalent senior iOS engineers in the US or UK without quality compromise. We've shipped to the US, UK, and global App Stores — ADT Control iOS, Buffalo Wild Wings iOS, Arby's iOS, Medela Family iOS, among others — including apps with custom Core Data migrations, complex animations, and IAP/subscription flows."
      },
      {
        question: 'SwiftUI or UIKit?',
        answer:
          "SwiftUI for new development on iOS 17+. UIKit when interop is required (custom transitions, complex gestures, third-party SDKs). Most modern apps are SwiftUI with selective UIKit dropdown."
      },
      {
        question: 'Core Data or SwiftData?',
        answer:
          "SwiftData for new apps targeting iOS 17+ — cleaner API, better SwiftUI integration. Core Data when targeting older iOS versions or when SwiftData's current limits matter (some advanced predicates, NSFetchedResultsController)."
      },
      {
        question: 'How do you handle App Store rejections?',
        answer:
          "We anticipate the common ones: Sign in with Apple if other auth is offered, IAP for digital goods, privacy policy accessibility, demo accounts for review. When rejection happens, we read the actual review note and respond — most resolve in a day."
      },
      {
        question: 'Subscriptions via StoreKit 2 or RevenueCat?',
        answer:
          "RevenueCat for most apps — abstracts platform differences, handles server-side validation, integrates with marketing tools. StoreKit 2 directly when subscription logic is bespoke or RevenueCat fees are a concern."
      },
      {
        question: 'Widgets and App Clips?',
        answer:
          "Yes — widgets for engagement (home screen, lock screen, StandBy), App Clips for instant utility experiences (URLs, NFC, App Banner). We assess the UX win against the maintenance cost."
      },
      {
        question: 'Performance on iOS?',
        answer:
          "Instruments profiling first. Common wins: avoid view hierarchy churn, use lazy stacks for long lists, prefetch ahead of scroll, cache layout. We hit 60fps consistently on 3-year-old devices."
      }
    ],
    relatedServiceTags: ['Mobile App Development', 'Mobile Applications'],
    relatedRoles: ['mobile-app-developer', 'android-developer', 'react-native-developer', 'flutter-developer']
  },
  {
    slug: 'android-developer',
    title: 'Android Developer',
    h1: 'Hire Senior Android Developers',
    subhead:
      'Hire dedicated Android app developers — Kotlin and Jetpack Compose engineers who ship Android apps that feel Android, Material 3 polish and Play Store launch-ready.',
    metaTitle: 'Hire Android Developers — Senior, Dedicated | Techyor',
    metaDescription:
      'Hire Android developers with senior-level Kotlin, Jetpack Compose, Material 3, Coroutines, and Play Store launch experience. Native Android app developers for US, UK, and EU teams.',
    intro:
      "Hire Android developers who ship apps that feel native to Android, not generic. Our Android app developers write Kotlin, build UIs in Jetpack Compose (XML when interop demands), use Coroutines and Flow for async, and ship through Play Console with phased rollouts. Native Android development matters when the user expects Material 3 polish, foldable support, deep system integration, or Wear OS extensions. They know when to drop to NDK, when to integrate with system features (App Actions, Quick Settings tiles), and how to debug the inevitable Pixel-vs-Samsung quirks.",
    primaryKeyword: 'hire android developers',
    whyUs: [
      {
        title: 'Compose-first, XML-fluent',
        description:
          "New work in Jetpack Compose. XML when interop with legacy Views is required. We don't apologize for either — both are tools, used correctly."
      },
      {
        title: 'Material 3 + custom brand',
        description:
          'Material 3 as foundation, custom theming for brand identity. Dark mode, dynamic color, motion specs — implemented correctly, not approximated.'
      },
      {
        title: 'Play Console launch fluency',
        description:
          'Internal testing, closed testing, phased rollouts, app signing by Google Play, in-app updates. We ship with the levers Google provides, not against them.'
      }
    ],
    skills: [
      'Kotlin 2.x — coroutines, Flow, sealed interfaces',
      'Jetpack Compose — UI, navigation, lifecycle, accompanist',
      'Material 3 — theming, dynamic color, motion',
      'Architecture — MVVM, MVI, Clean Architecture, Hilt for DI',
      'Local storage — Room, DataStore, encrypted prefs',
      'Network — Ktor or Retrofit + OkHttp, OkHttp interceptors',
      'Background work — WorkManager, Foreground Services',
      'In-app purchases — Google Play Billing v6+, server-side validation',
      'Performance — Macrobenchmark, baseline profiles, R8 optimization'
    ],
    techStack: [
      'Kotlin 2.x',
      'Jetpack Compose',
      'Material 3',
      'Hilt',
      'Room',
      'Coroutines',
      'Ktor',
      'Firebase',
      'fastlane'
    ],
    faq: [
      {
        question: 'Should I hire dedicated Android developers or a cross-platform team?',
        answer:
          "Hire dedicated Android developers when the user experience must feel native to Android — Material 3 motion, foldable layouts, Wear OS extension, Quick Settings tiles, deep WorkManager schedules, or anything touching the system at a level cross-platform abstractions don't expose. A Flutter or React Native team will ship a functional Android build; a dedicated Android developer will ship one that handles OEM-specific quirks (Samsung, Xiaomi, OnePlus), respects Material 3 motion specs, and survives the Play Console phased rollout without ANR spikes. The split is most worth it past the prototype stage."
      },
      {
        question: 'How is hiring a senior Android app developer different from a junior?',
        answer:
          "Three things separate senior Android work from junior. First, fragmentation instinct — they assume the app will run on a 5-year-old Samsung phone with a custom OEM skin and design accordingly. Second, performance ownership — they read a Macrobenchmark trace and immediately know which baseline profile to ship or which R8 rule to tune. Third, Play Console fluency — internal testing → closed testing → staged rollout, with crash rate and ANR rate as ramp gates. A senior Android app developer keeps the app stable across Pixel, Samsung, Xiaomi, and OnePlus through launch and beyond."
      },
      {
        question: 'Can I hire Android app developers from India for a US or UK product?',
        answer:
          "Yes — most of our clients are in the US, UK, EU, and Australia. We overlap with East Coast US morning and UK afternoon hours, run async-first with daily standups, and ship in your timezone's calendar. Senior India-based Android app developers cost 40–60% less than equivalent senior Android engineers in the US or UK without quality compromise. We've shipped to the US, UK, and global Play Stores — ADT Control Android, Buffalo Wild Wings Android, Arby's Android, Medela Family Android, among others — including apps with custom Room migrations, WorkManager pipelines, and Google Play Billing flows."
      },
      {
        question: 'Compose or XML?',
        answer:
          "Compose for new work — modern, type-safe, less boilerplate. XML when integrating with legacy Views, complex AnimatedVectorDrawable, or advanced ConstraintLayout patterns Compose doesn't yet match."
      },
      {
        question: 'Architecture — MVVM, MVI, Clean?',
        answer:
          "MVVM for most apps. MVI for state machines (chat, complex forms) where unidirectional data flow pays off. Clean Architecture when team size and feature count justify the structure."
      },
      {
        question: 'Foldables, tablets, Wear OS?',
        answer:
          "We ship for foldables and tablets when product justifies (window size class APIs, dual-pane layouts). Wear OS as an extension to phone apps when the use case fits — not as a default."
      },
      {
        question: 'Coroutines or RxJava?',
        answer:
          "Coroutines + Flow for new work. RxJava in legacy codebases — we maintain it but don't write new RxJava."
      },
      {
        question: 'Play Store rollout strategy?',
        answer:
          "Internal testing → Closed testing (alpha/beta) → Production with staged rollout (10% → 50% → 100%). In-app updates SDK for forced critical updates. We monitor crash rate and ANR rate before each ramp."
      },
      {
        question: 'How do you handle device fragmentation?',
        answer:
          "Test on real devices via Firebase Test Lab (matrix of OEM, OS version, screen size). Watch for OEM-specific quirks (especially Samsung, Xiaomi). Ship with crash reporting (Crashlytics or Sentry) tagged by device model."
      }
    ],
    relatedServiceTags: ['Mobile App Development', 'Mobile Applications'],
    relatedRoles: ['mobile-app-developer', 'ios-developer', 'react-native-developer', 'flutter-developer']
  },

  // ─── PHASE 3 ──────────────────────────────────────────────────────────────
  {
    slug: 'web-developer',
    title: 'Web Developer',
    h1: 'Hire Senior Web Developers',
    subhead:
      'Hire dedicated web developers and web app developers — full-spectrum engineers who ship websites and web apps that perform, convert, and stay maintainable.',
    metaTitle: 'Hire Web Developers — Senior, Dedicated | Techyor',
    metaDescription:
      'Hire web developers and web app developers with senior-level experience across React, Next.js, Svelte, WordPress, Shopify. Production sites and web apps for US, UK, EU teams.',
    intro:
      "Hire web developers who pick the right stack for the problem instead of selling the same hammer to every nail. Web development is the broadest hire we do — a senior web developer ranges from marketing-site SEO to web apps with complex state, e-commerce stores, and internal admin panels. We're also web app developers in the harder sense: typed state machines, optimistic UI, real-time data, accessibility-first interactions. Next.js when SEO + interactivity matters, SvelteKit when bundle size and performance lead, WordPress when editors drive content, Shopify for storefronts.",
    primaryKeyword: 'hire web developers',
    whyUs: [
      {
        title: 'Stack-pluralist',
        description:
          'React, Next.js, SvelteKit, Vue, WordPress, Shopify — chosen by problem. Most of our team is multi-stack with at least two deep specializations.'
      },
      {
        title: 'SEO and Core Web Vitals',
        description:
          "Web Vitals as non-negotiable. We hit 90+ Lighthouse Mobile on real-world projects, not just clean lab runs."
      },
      {
        title: 'Maintainable for years',
        description:
          'Code review discipline, automated tests, design systems. The site we ship today should be improvable in three years without a rewrite.'
      }
    ],
    skills: [
      'Frameworks — Next.js, SvelteKit, Astro, Nuxt, Remix',
      'CMS — WordPress, Sanity, Storyblok, Contentful, headless WP',
      'E-commerce — Shopify, WooCommerce, Medusa, BigCommerce',
      'CSS — Tailwind, CSS modules, Sass, design tokens',
      'Performance — Core Web Vitals, image optimization, font subsetting',
      'SEO — semantic HTML, structured data, sitemap, internal linking',
      'Accessibility — WCAG 2.2 AA, ARIA, keyboard navigation',
      'Deployment — Vercel, Netlify, Cloudflare Pages, AWS Amplify',
      'Analytics and monitoring — PostHog, Plausible, Sentry'
    ],
    techStack: [
      'Next.js',
      'SvelteKit',
      'Astro',
      'WordPress',
      'Shopify',
      'TypeScript',
      'Tailwind',
      'Sanity',
      'Vercel'
    ],
    faq: [
      {
        question: 'Should I hire dedicated web developers or generalists?',
        answer:
          "Hire dedicated web developers when the project involves more than a brochure site — a real web app, a high-traffic storefront, complex SEO requirements, or a design system that needs to scale. Generalists will ship the first version; dedicated web developers will ship one that survives traffic spikes, ranks for the keywords it should, and is still improvable in three years without a rewrite. The split is most worth it past the prototype stage or when web is your primary acquisition surface."
      },
      {
        question: 'What’s the difference between a web developer and a web app developer?',
        answer:
          "A web developer covers the full surface: marketing sites, content platforms, e-commerce, internal tools. A web app developer is a subset focused on interactive, state-heavy, often authenticated apps — dashboards, real-time tools, multi-tenant SaaS UIs. We have both. The same engineer often does both, but when a project is web-app-heavy we lean into web app developers who think in typed state machines, optimistic UI, accessibility-first interactions, and offline/error edge cases instead of marketing-site SEO."
      },
      {
        question: 'Can I hire web developers from India for a US or UK product?',
        answer:
          "Yes — most of our clients are in the US, UK, EU, and Australia. We overlap with East Coast US morning and UK afternoon hours, run async-first with daily standups, and ship in your timezone's calendar. Senior India-based web developers and web app developers cost 40–60% less than equivalent senior engineers in the US or UK without quality compromise. We've shipped marketing sites, e-commerce stores, SaaS dashboards, and content platforms across all four regions."
      },
      {
        question: 'Which framework do you recommend?',
        answer:
          "Depends on the project. Next.js for SEO + interactivity. SvelteKit for bundle-conscious apps and content sites. Astro for content-first sites with islands of interactivity. WordPress when editors lead. Shopify for storefronts."
      },
      {
        question: 'How do you approach SEO?',
        answer:
          "Semantic HTML, structured data (JSON-LD), comprehensive sitemap, sensible URL structure, internal linking, Core Web Vitals targets. We ship with Search Console verified and indexed pages monitored."
      },
      {
        question: 'Headless or traditional CMS?',
        answer:
          "Headless when frontend benefits from a modern framework and editors are technical-friendly. Traditional CMS (WordPress) when editors are non-technical and need a familiar publishing UX."
      },
      {
        question: 'Can you migrate from one framework to another?',
        answer:
          "Yes — WordPress → Next.js, React CRA → Vite, Pages Router → App Router. We do incremental migrations with redirect maps and SEO preservation."
      },
      {
        question: 'How do you handle performance?',
        answer:
          "Lighthouse CI in PRs, Core Web Vitals monitoring in production, image optimization (Next.js Image, sharp), font subsetting, code-splitting, edge caching, lazy-loading below the fold."
      },
      {
        question: 'Do you do design too?',
        answer:
          "We have designers in-house but recommend pairing with a designer for non-trivial work. Our developers can implement great UI from a Figma file but design and dev together usually compromises one."
      }
    ],
    relatedServiceTags: ['Web Development & Design', 'Website', 'Web Applications'],
    relatedRoles: ['react-developer', 'frontend-developer', 'wordpress-developer', 'shopify-developer']
  },
  {
    slug: 'woocommerce-developer',
    title: 'WooCommerce Developer',
    h1: 'Hire Senior WooCommerce Developers',
    subhead:
      'Hire dedicated WooCommerce developers who customize checkout, build payment gateways, and ship subscription stores.',
    metaTitle: 'Hire WooCommerce Developers — Senior, Dedicated | Techyor',
    metaDescription:
      'Hire WooCommerce developers with senior-level experience in custom checkout, payment gateways, subscriptions, B2B pricing, and high-performance stores.',
    intro:
      "Hire WooCommerce developers who know the platform past the surface. We build custom payment gateways, complex tax rules, B2B wholesale pricing, subscription billing, and performance optimization that takes a slow WooCommerce store under 2.5s. WooCommerce is the right e-commerce platform when content drives traffic and the store is part of a larger WordPress site. We also tell you when WooCommerce is the wrong tool — for catalog-heavy stores or international tax complexity, Shopify often wins.",
    primaryKeyword: 'hire woocommerce developers',
    whyUs: [
      {
        title: 'Custom checkout, custom gateways',
        description:
          'Beyond the standard plugins. We build custom payment gateways, modify checkout fields, integrate fraud detection, and customize order flow.'
      },
      {
        title: 'Subscription and B2B fluency',
        description:
          'WooCommerce Subscriptions, Memberships, dynamic pricing, role-based pricing, wholesale order flow. The complex commerce models WordPress can do.'
      },
      {
        title: 'Performance-tuned',
        description:
          'WooCommerce sites we ship hit 80+ mobile Lighthouse. Object caching, query optimization, CDN, deferred non-critical scripts.'
      }
    ],
    skills: [
      'WooCommerce — products, taxonomies, orders, customers, reports',
      'Checkout customization — fields, validation, conditional logic',
      'Payment gateways — Stripe, custom gateway development',
      'Subscriptions — WooCommerce Subscriptions, custom subscription logic',
      'B2B — wholesale pricing, role-based, request-a-quote flows',
      'Tax — WooCommerce Tax, TaxJar, Avalara integration',
      'Shipping — table rates, real-time carriers, custom shipping methods',
      'Performance — object caching, query optimization, CDN',
      'Migration — from Shopify, Magento, BigCommerce to WooCommerce'
    ],
    techStack: [
      'WordPress 6.x',
      'WooCommerce 9.x',
      'PHP 8.2+',
      'Stripe',
      'WooCommerce Subscriptions',
      'ACF Pro',
      'WP CLI'
    ],
    faq: [
      {
        question: 'Should I hire dedicated WooCommerce developers or a generalist agency?',
        answer:
          "Hire dedicated WooCommerce developers when the store has any of: custom checkout, subscription billing, B2B pricing, custom payment gateways, or 5,000+ products. A WordPress generalist can do a basic store; they hit a wall once the commerce logic is real. Our WooCommerce developers spend 100% of their time on WooCommerce work, which is why fixing a stuck WooCommerce build is faster than starting it generalist-led."
      },
      {
        question: 'How is hiring a senior WooCommerce expert different from a freelancer?',
        answer:
          "Three things. First, scope ownership — a senior WooCommerce expert designs the data model, payment flow, and caching strategy end-to-end instead of executing tickets. Second, edge cases — they've seen the failure modes (broken sessions on cached checkout, race conditions in stock, payment retries) and engineer around them upfront. Third, accountability — you get someone who'll still be there in three months when the production bug hits."
      },
      {
        question: 'Can I hire WooCommerce developers from India for a US or UK store?',
        answer:
          "Yes — most of our clients are in the US, UK, EU, and Australia. We work overlapping hours with the East Coast US morning and the UK afternoon, run async-first with daily standups, and ship in your timezone's calendar. Senior India-based WooCommerce developers cost 40–60% less than equivalent senior developers in the US or UK without quality compromise."
      },
      {
        question: 'WooCommerce vs Shopify?',
        answer:
          "WooCommerce when content (blog, editorial) drives traffic, when you need full code control, or when WordPress is already in use. Shopify for catalog-heavy stores, when international tax/shipping complexity is high, or when you want managed infrastructure."
      },
      {
        question: 'Can you build a custom payment gateway?',
        answer:
          "Yes — WooCommerce gateway API is well-documented. We've built custom gateways for regional payment processors, BNPL integrations, and direct bank integrations."
      },
      {
        question: 'Subscription billing — Subscriptions plugin or custom?',
        answer:
          "WooCommerce Subscriptions for standard recurring billing. Custom logic when subscription model is unique (usage-based, tiered with overages). We've built both."
      },
      {
        question: 'B2B / wholesale stores?',
        answer:
          'Yes — role-based pricing, request-a-quote, minimum order quantities, tiered discounts, custom registration flows. We use WooCommerce Wholesale Suite or build from primitives.'
      },
      {
        question: 'How do you handle performance?',
        answer:
          "Object caching (Redis), full-page caching (with cart/checkout exceptions), CDN, image optimization, query reduction (avoid wp_query in loops), lean theme. Most WooCommerce sites we touch see 50% LCP improvement."
      },
      {
        question: 'Can you migrate from Shopify?',
        answer:
          'Yes — products, customers, order history, URL structure, redirects. Typically 4–6 weeks for medium catalogs. We preserve SEO and minimize downtime.'
      }
    ],
    relatedServiceTags: ['E-commerce', 'E-Commerce Platforms', 'Web Development & Design'],
    relatedRoles: ['wordpress-developer', 'shopify-developer', 'web-developer']
  },
  {
    slug: 'saas-developer',
    title: 'SaaS Developer',
    h1: 'Hire Senior SaaS Developers',
    subhead:
      'Hire dedicated SaaS developers who build multi-tenant platforms with subscription billing, role-based access, and the boring infrastructure SaaS needs.',
    metaTitle: 'Hire SaaS Developers — Senior, Dedicated | Techyor',
    metaDescription:
      'Hire SaaS developers with senior-level experience in multi-tenancy, subscription billing, RBAC, audit logs, and production-grade SaaS infrastructure.',
    intro:
      "Hire SaaS developers who've shipped the boring infrastructure before — multi-tenancy, subscription billing, role-based access control, audit logs, customer onboarding, billing edge cases (proration, tax, dunning). Our SaaS developers know which Stripe webhook to trust, why your trial conversion is dropping, how to design a permissions model that scales past three roles, and what auditable means when SOC 2 enters the picture. We've shipped SaaS platforms for travel, healthcare, fintech, sales intelligence, and creator tools.",
    primaryKeyword: 'hire saas developers',
    whyUs: [
      {
        title: 'Multi-tenancy fluency',
        description:
          'Row-level (default for most) or schema-per-tenant (when isolation requires). We design tenant boundaries that survive scaling and security audits.'
      },
      {
        title: 'Stripe billing depth',
        description:
          'Subscriptions, invoices, proration, dunning, tax via Stripe Tax. Webhooks idempotent and observable. The boring billing details that lose teams revenue.'
      },
      {
        title: 'Compliance-aware',
        description:
          "SOC 2, HIPAA, GDPR — we don't promise compliance, but we build infrastructure that doesn't fight your audit (audit logs, SSO, data residency, encryption at rest)."
      }
    ],
    skills: [
      'Multi-tenancy — row-level, schema-per-tenant, hybrid patterns',
      'Stripe — subscriptions, invoices, webhooks, Connect, Tax',
      'RBAC — role models, attribute-based access, fine-grained permissions',
      'SSO — SAML 2.0, OIDC, OAuth 2.0',
      'Audit logs — append-only event streams, queryable history',
      'Customer onboarding — signup, verification, paywalls, free trials',
      'Email — transactional (Resend, Postmark), lifecycle (Customer.io)',
      'Background jobs — for billing reconciliation, exports, async work',
      'Compliance — SOC 2 controls, GDPR data subject rights, HIPAA basics'
    ],
    techStack: [
      'Stripe',
      'WorkOS',
      'Clerk',
      'Postgres',
      'Redis',
      'Inngest',
      'Resend',
      'PostHog',
      'Sentry'
    ],
    faq: [
      {
        question: 'Should I hire dedicated SaaS developers or generalists?',
        answer:
          "Hire dedicated SaaS developers when multi-tenancy, subscription billing, RBAC, or SSO are core to the product — not when you're just building a website with a login. The boring infrastructure is the moat, and it's where generalists slip. A dedicated SaaS developer has shipped Stripe Tax in production, knows why your proration math is off by a cent, understands the difference between row-level and schema-per-tenant isolation, and won't ship audit logs that miss the action the auditor actually asks about. The split is most worth it once paying customers exist."
      },
      {
        question: 'How is hiring a senior SaaS developer different from a junior full-stack?',
        answer:
          "Three things separate senior SaaS work from junior full-stack. First, billing instinct — they design webhook handlers to be idempotent from the first commit, anticipate Stripe race conditions, and test with Stripe's test clock to verify behavior over simulated time. Second, multi-tenancy discipline — every query has a tenant filter, every test asserts cross-tenant isolation, every migration considers backfill across millions of rows. Third, compliance-aware defaults — encryption at rest, audit logs that survive an auditor, least-privilege IAM. A senior SaaS developer turns 'we shipped the feature' into 'we shipped the feature and SOC 2 won't ding us for it.'"
      },
      {
        question: 'Can I hire SaaS developers from India for a US or UK product?',
        answer:
          "Yes — most of our SaaS clients are in the US, UK, EU, and Australia. We overlap with East Coast US morning and UK afternoon hours, run async-first with daily standups, and ship in your timezone's calendar. Senior India-based SaaS developers cost 40–60% less than equivalent senior engineers in the US or UK without quality compromise. We've shipped multi-tenant SaaS platforms across all four regions — travel, healthcare, fintech, sales intelligence, AI tools — including Stripe Billing integration, SSO, audit logs, and compliance-aware data models."
      },
      {
        question: 'Multi-tenancy — row-level or schema-per-tenant?',
        answer:
          'Row-level for most cases — simpler ops, easier reporting, scales further. Schema-per-tenant when isolation is required by regulation or customer contract. We make this decision early because it\'s expensive to change.'
      },
      {
        question: 'Stripe or alternative billing?',
        answer:
          "Stripe for almost every SaaS in 2026. Paddle when MoR (merchant of record) is critical for international tax. LemonSqueezy for indie/small teams. Stripe Billing handles 95% of SaaS billing requirements."
      },
      {
        question: 'How do you handle subscription edge cases?',
        answer:
          "Proration on plan changes, dunning emails on failed payments, grace periods on cancellation, scheduled plan changes. We test with Stripe's test clock to verify behavior over simulated time."
      },
      {
        question: 'SSO and enterprise features — when?',
        answer:
          "Add when 2–3 customers ask. WorkOS for SSO (SAML, OIDC) with minimal lift. Clerk if you're greenfield and want auth + SSO unified."
      },
      {
        question: 'Audit logs — how detailed?',
        answer:
          "Every state-changing action (CRUD on data, permission changes, exports) logged with actor, timestamp, before/after state. Append-only. Queryable by customer for self-service or audit response."
      },
      {
        question: 'SOC 2 — can you help?',
        answer:
          "We can build the technical controls (access logs, encryption at rest, least-privilege, vendor management). We don't manage the audit itself — pair with Vanta, Drata, or Secureframe for the compliance platform."
      }
    ],
    relatedServiceTags: ['SaaS Platforms', 'Subscription Platforms', 'Web Applications'],
    relatedRoles: ['full-stack-developer', 'backend-developer', 'react-developer', 'nodejs-developer']
  }
];

/** Slug → role map for fast lookup. */
export const hireRolesBySlug: Record<string, HireRole> = Object.fromEntries(
  hireRoles.map((role) => [role.slug, role])
);

export function getHireRole(slug: string): HireRole | undefined {
  return hireRolesBySlug[slug];
}

export function getAllHireRoles(): HireRole[] {
  return hireRoles;
}
