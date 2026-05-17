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
   * Service / deliverable names from projects.ts that this role's portfolio
   * should pull from. Filtering matches against project.services + project.deliverables.
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
      'Production React engineers who ship fast, accessible, performant interfaces — backed by 80+ shipped products.',
    metaTitle: 'Hire React Developers — Senior, Vetted | Techyor',
    metaDescription:
      'Hire senior React developers from Techyor. Ship production-grade interfaces with engineers experienced in React 19, Next.js, RSC, and Core Web Vitals.',
    intro:
      "When you hire a React developer from Techyor, you're hiring a product engineer first — someone who treats components as a means to an outcome, not the outcome itself. Every developer on our React bench has shipped at least three production React applications, knows the difference between client and server components in their sleep, and has opinions about state management that they can defend with profiling data, not just preferences. We work with React because the ecosystem rewards careful engineering. Our developers know when to reach for Zustand vs Redux, when Suspense saves you a bug and when it hides one, and how to keep a Lighthouse score above 95 once a real product team is shipping into the codebase.",
    primaryKeyword: 'hire react developer',
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
      'App Router specialists who ship App-Router apps with sub-second TTFB on Vercel — without overengineering it.',
    metaTitle: 'Hire Next.js Developers — App Router, RSC | Techyor',
    metaDescription:
      'Hire vetted senior Next.js developers experienced in App Router, Server Components, Edge runtime, and production deployment on Vercel.',
    intro:
      "Hiring a Next.js developer is different from hiring a React developer. Next.js engineers think in routes, layouts, caching boundaries, and the cost of a serverless invocation. Our Next.js team has shipped App Router applications in production for SaaS platforms, e-commerce stores, and internal tools — including the patterns that don't make it into the docs (when to use a layout, when to use a route group, why your `cache()` calls are silently invalidating). We've been in production with App Router since the day it shipped. Our developers know what to do when your `revalidatePath` doesn't, why Server Actions are sometimes the wrong tool, and how to keep your edge bundle under the 1 MB cap when integration libraries keep growing.",
    primaryKeyword: 'hire next.js developer',
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
      'End-to-end engineers who own a feature from database schema to UI polish — without context-switching cost.',
    metaTitle: 'Hire Full Stack Developers — Senior | Techyor',
    metaDescription:
      'Hire senior full stack developers fluent across React/Next.js, Node.js, Python, Postgres, and AWS. One engineer, end-to-end product features.',
    intro:
      "A full-stack developer is the right hire when your roadmap is feature-shaped, not stack-shaped. Instead of a frontend dev waiting on a backend dev, one senior engineer takes the ticket from API design through UI implementation through deployment. Our full-stack team is fluent across React/Next.js + Node.js or Python, with hands-on experience in Postgres schema design, Redis caching, queue patterns, and production observability. We don't pretend full-stack means knowing everything — we know our limits and pull in specialists for native mobile, ML, or infrastructure where it matters.",
    primaryKeyword: 'hire full stack developer',
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
      'iOS, Android, and cross-platform engineers behind 14+ shipped mobile apps across health, retail, and consumer brands.',
    metaTitle: 'Hire Mobile App Developers — iOS & Android | Techyor',
    metaDescription:
      'Hire senior mobile app developers experienced in iOS (Swift), Android (Kotlin), React Native, and Flutter. 14+ shipped apps, App Store and Play Store launches.',
    intro:
      "Mobile development is what we've shipped most: 14+ production apps for clients including Arby's, Buffalo Wild Wings, ADT, Medela, and Surfboard Central — across iOS, Android, and cross-platform stacks. Our mobile developers know that an App Store rejection isn't a build error: it's a UX decision, an icon size, a privacy disclosure, an in-app purchase flow that doesn't quite match Apple's guidance. They know to test on a real device before committing, what offline-first really means for sync, and why your push notifications stopped delivering after iOS 17. Hire them for the part of mobile that's not about writing the app — the part about getting it into users' hands and keeping it there.",
    primaryKeyword: 'hire mobile app developer',
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
      'JavaScript engineers who ship to App Store and Play Store from one codebase — without sacrificing native polish.',
    metaTitle: 'Hire React Native Developers — iOS & Android | Techyor',
    metaDescription:
      'Hire senior React Native developers fluent in Expo, Reanimated, native modules, and EAS Build. Ship to App Store and Play Store from one codebase.',
    intro:
      "React Native gets a bad reputation from teams that hired generalist React developers and asked them to also build a mobile app. That's not what you want. A senior React Native developer thinks in terms of bridge cost, frame budget, and platform conventions — they know when to drop into Swift or Kotlin to fix a problem, and when not to. Our React Native engineers have shipped consumer apps to the App Store, retail apps to enterprise customers, and SDK-heavy products that need native modules. We use Expo as the default and bare RN when we need to.",
    primaryKeyword: 'hire react native developer',
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
      'Backend Python engineers who ship FastAPI, Django, and ML pipelines that handle real production load.',
    metaTitle: 'Hire Python Developers — FastAPI, Django, ML | Techyor',
    metaDescription:
      'Hire senior Python developers experienced in FastAPI, Django, async, ML pipelines, and high-throughput data systems. Production-grade backend engineers.',
    intro:
      "Python is the most over-promised, under-delivered hire in the industry. 'Knows Python' covers everything from a Jupyter notebook hobbyist to a senior backend engineer who runs gRPC services at 10k QPS. Ours are the latter. Every Python developer on our bench has shipped at least one production async service, knows the difference between asyncio.gather and TaskGroup, has dealt with the GIL for real, and can explain what a Python interpreter is doing during your CPU spike. We use Python where its strengths matter — fast iteration on backend services, ML pipelines, data tooling — and we know when to reach for Go or Rust instead.",
    primaryKeyword: 'hire python developer',
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
    relatedRoles: ['fastapi-developer', 'backend-developer', 'ai-engineer']
  },
  {
    slug: 'nodejs-developer',
    title: 'Node.js Developer',
    h1: 'Hire Senior Node.js Developers',
    subhead:
      'Backend JavaScript engineers who write maintainable Node.js services — Express, Fastify, Hono, NestJS.',
    metaTitle: 'Hire Node.js Developers — Senior, Production | Techyor',
    metaDescription:
      'Hire senior Node.js developers experienced in Fastify, Hono, NestJS, real-time systems, and high-throughput APIs. TypeScript-first, production-shaped.',
    intro:
      "Node.js engineers are easy to find and hard to find good. The trap: developers who write Node like browser JavaScript, ignore backpressure, never tune the event loop, and ship services that fall over at 200 RPS. Ours don't. Our Node.js developers know when to use streams, when to pin the libuv thread pool, why your Promise.all is silently leaking memory, and how to instrument a Node service so you can debug it at 3am. We default to TypeScript, write services with structured logging, and care about graceful shutdown.",
    primaryKeyword: 'hire node.js developer',
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
    relatedRoles: ['typescript-developer', 'backend-developer', 'full-stack-developer', 'fastapi-developer']
  },
  {
    slug: 'wordpress-developer',
    title: 'WordPress Developer',
    h1: 'Hire Senior WordPress Developers',
    subhead:
      'WordPress engineers who treat it as a CMS, not a templating wall — custom Gutenberg blocks, headless builds, and performance-first themes.',
    metaTitle: 'Hire WordPress Developers — Custom, Headless | Techyor',
    metaDescription:
      'Hire senior WordPress developers experienced in custom Gutenberg blocks, ACF, WooCommerce, headless WP, and performance-first themes. Ship maintainable WordPress.',
    intro:
      "WordPress runs almost half the web. That doesn't mean it's been built well almost half the time. Our WordPress developers write custom themes from scratch, build Gutenberg blocks in React, run headless WordPress with Next.js or SvelteKit, and optimize page speed past 90 in Lighthouse — on themes that didn't start there. If you have a theme that's 80MB of jQuery accreted over five years, we can refactor it. If you're starting fresh, we can build a maintainable WordPress site that doesn't need a rewrite in three years.",
    primaryKeyword: 'hire wordpress developer',
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
    relatedRoles: ['woocommerce-developer', 'headless-cms-developer', 'web-developer', 'frontend-developer']
  },
  {
    slug: 'shopify-developer',
    title: 'Shopify Developer',
    h1: 'Hire Senior Shopify Developers',
    subhead:
      'Shopify and Shopify Plus engineers building custom themes, apps, and Hydrogen storefronts that convert.',
    metaTitle: 'Hire Shopify Developers — Plus, Hydrogen | Techyor',
    metaDescription:
      'Hire senior Shopify developers experienced in Online Store 2.0, Liquid, Hydrogen, custom apps, and Shopify Plus. Ship stores that convert.',
    intro:
      "Shopify development isn't theme tweaking. A senior Shopify developer thinks in terms of conversion rate, theme bloat, app performance, and the cost of every Liquid loop. Our Shopify team has built custom OS 2.0 themes, headless Hydrogen storefronts, custom apps via Shopify CLI, and Shopify Plus migrations. We know which apps to remove on day one, why your AOV is dropping after that one A/B test, and how to ship a checkout extension that doesn't blow up your Plus contract.",
    primaryKeyword: 'hire shopify developer',
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
    relatedRoles: ['ecommerce-developer', 'web-developer', 'frontend-developer', 'wordpress-developer']
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
    relatedServiceTags: ['AI & Machine Learning', 'Voice AI Engineering', 'Python Backend Engineering'],
    relatedRoles: ['python-developer', 'ml-engineer', 'voice-ai-developer']
  },

  // ─── PHASE 2 ──────────────────────────────────────────────────────────────
  {
    slug: 'fastapi-developer',
    title: 'FastAPI Developer',
    h1: 'Hire Senior FastAPI Developers',
    subhead:
      'Async Python engineers who ship FastAPI services with type-safe contracts, auto-generated OpenAPI, and production-grade ergonomics.',
    metaTitle: 'Hire FastAPI Developers — Async Python | Techyor',
    metaDescription:
      'Hire senior FastAPI developers experienced in async Python, Pydantic v2, dependency injection, and high-throughput API services.',
    intro:
      "FastAPI is the right framework when you want type-safe Python APIs without DjangoREST ceremony. Our FastAPI developers ship async-first services, write Pydantic v2 schemas as a contract that's also documentation, and use dependency injection to keep handlers thin. We pair FastAPI with SQLAlchemy 2.0 async, Alembic migrations, Celery or ARQ for background tasks, and OpenTelemetry for tracing. Services we ship handle thousands of RPS per instance and are deploy-anywhere — Docker, AWS Lambda via Mangum, Vercel Functions, or bare VPS.",
    primaryKeyword: 'hire fastapi developer',
    whyUs: [
      {
        title: 'Async-first by default',
        description:
          'Our developers think in event loops, structured concurrency, and backpressure — not threads. FastAPI is asyncio-native; we use it that way.'
      },
      {
        title: 'Pydantic v2 throughout',
        description:
          "Schemas are contracts. We use Pydantic v2's validation and serialization for type-safe APIs that double as auto-generated OpenAPI specs your frontend can consume."
      },
      {
        title: 'Dependency injection that scales',
        description:
          "FastAPI's DI shines for testability and modularity. We use it to keep handlers thin, mock cleanly in tests, and structure code that scales past 30 endpoints."
      }
    ],
    skills: [
      'FastAPI — async, dependency injection, OpenAPI customization',
      'Pydantic v2 — validation, custom validators, serialization',
      'SQLAlchemy 2.0 async — joined loading, query optimization',
      'Alembic — migrations, branching, downgrade safety',
      'Authentication — OAuth 2.0, JWT, Auth0/Clerk integration',
      'WebSockets — broadcasting, room management',
      'Background tasks — ARQ, Celery (sync mode), FastAPI BackgroundTasks',
      'Testing — pytest-asyncio, httpx AsyncClient, real DB integration tests',
      'Deployment — Docker, Mangum (Lambda), uvicorn workers behind nginx'
    ],
    techStack: [
      'FastAPI',
      'Python 3.13/3.14',
      'Pydantic v2',
      'SQLAlchemy 2.0',
      'asyncio',
      'Alembic',
      'ARQ',
      'Postgres',
      'Redis',
      'uvicorn'
    ],
    faq: [
      {
        question: 'FastAPI vs Flask vs Django?',
        answer:
          "FastAPI for typed async API services. Flask for tiny services where minimalism matters. Django when you need batteries (admin, auth, ORM, templates). FastAPI is our default for anything API-first in 2026."
      },
      {
        question: 'How do you handle authentication?',
        answer:
          "OAuth 2.0 password flow + JWT for first-party APIs. OAuth 2.0 authorization code flow for third-party integrations. Auth0 or Clerk when offloading user management makes sense."
      },
      {
        question: 'Can you use FastAPI for serverless?',
        answer:
          "Yes — Mangum on AWS Lambda, or Vercel Functions Python runtime. We design with cold starts in mind: lazy imports, connection pooling reused across invocations, minimal global state."
      },
      {
        question: 'Async ORM — SQLAlchemy 2.0 or alternatives?',
        answer:
          "SQLAlchemy 2.0 async for most cases — it's mature, well-documented, and ergonomic. Tortoise ORM for Django-like simplicity. SQLModel when you want Pydantic + SQLAlchemy unified."
      },
      {
        question: 'Background tasks?',
        answer:
          "ARQ for async-native task queues. Celery (sync) when integrating with an existing Celery setup. FastAPI's built-in BackgroundTasks only for fire-and-forget within request lifetime."
      },
      {
        question: 'Performance tuning?',
        answer:
          "uvicorn with N workers (CPU-bound) or single worker + async (I/O-bound). Connection pool tuned to expected concurrency. Pydantic v2 (10x faster than v1). asyncio.gather for parallel I/O. Profile with py-spy before guessing."
      }
    ],
    relatedServiceTags: ['Python Backend Engineering', 'Backend Engineering', 'APIs & Backend Services'],
    relatedRoles: ['python-developer', 'backend-developer', 'ai-engineer']
  },
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
    relatedRoles: ['nodejs-developer', 'python-developer', 'fastapi-developer', 'devops-engineer']
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
      'Dart engineers who ship cross-platform mobile and desktop apps with consistent UI and 60fps animations.',
    metaTitle: 'Hire Flutter Developers — iOS, Android, Web | Techyor',
    metaDescription:
      'Hire senior Flutter developers experienced in Dart, Riverpod, custom rendering, and shipping apps to iOS, Android, web, and desktop.',
    intro:
      "Flutter is the right choice when UI consistency matters more than native feel. Our Flutter developers ship apps with the same brand experience on iOS, Android, web, and (increasingly) desktop — using a single Dart codebase. They know when to use Flutter's built-in widgets, when to drop into platform channels for native APIs, and when Flutter is the wrong tool (heavy native integration, App Clips). We use Riverpod or BLoC for state, GoRouter for navigation, and ship with Firebase or custom backends.",
    primaryKeyword: 'hire flutter developer',
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
      'Swift and SwiftUI engineers who ship native iOS apps that feel native — Apple HIG-fluent, App Store launch-ready.',
    metaTitle: 'Hire iOS Developers — Swift, SwiftUI | Techyor',
    metaDescription:
      'Hire senior iOS developers experienced in Swift, SwiftUI, UIKit, Core Data, App Store launches, and native Apple platform features.',
    intro:
      "Native iOS development is what you reach for when the user experience must feel iOS — not feel cross-platform. Our iOS developers write Swift, build with SwiftUI for new screens (UIKit when interop demands it), navigate Core Data and SwiftData decisions, and ship to the App Store with the kind of polish Apple rewards in features. They know what's new in the latest iOS, how to handle App Store review surprises, and what HIG actually says (vs what people remember it saying).",
    primaryKeyword: 'hire ios developer',
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
      'Kotlin and Jetpack Compose engineers who ship Android apps that feel Android — Material 3, foldables, performance.',
    metaTitle: 'Hire Android Developers — Kotlin, Compose | Techyor',
    metaDescription:
      'Hire senior Android developers experienced in Kotlin, Jetpack Compose, Material 3, Coroutines, and Play Store launches. Native Android apps.',
    intro:
      "Native Android development matters when the user expects Material 3 polish, foldable support, deep system integration, or Wear OS extensions. Our Android developers write Kotlin, build UIs in Jetpack Compose (XML when interop demands), use Coroutines and Flow for async, and ship through Play Console with phased rollouts. They know when to drop to NDK, when to integrate with system features (App Actions, Quick Settings tiles), and how to debug the inevitable Pixel-vs-Samsung quirks.",
    primaryKeyword: 'hire android developer',
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
  {
    slug: 'voice-ai-developer',
    title: 'Voice AI Developer',
    h1: 'Hire Senior Voice AI Developers',
    subhead:
      'Engineers who ship voice agents that sound human — STT, LLM, TTS, with sub-second latency and graceful interruption.',
    metaTitle: 'Hire Voice AI Developers — Conversational AI | Techyor',
    metaDescription:
      'Hire senior voice AI developers building production conversational agents. Twilio, Vapi, LiveKit, sub-second latency, interruption handling.',
    intro:
      "Voice AI is the most demanding production AI you can ship. Latency matters: a conversational agent needs sub-second time-to-first-audio or it feels robotic. Interruption handling matters: real conversations interrupt. Persona matters: a voice agent that sounds awkward loses trust in seconds. Our voice AI developers ship production voice agents for customer support, sales, and accessibility — using Twilio, Vapi, LiveKit, or custom orchestration. We know the latency tradeoffs of every STT-LLM-TTS provider and how to design conversations that don't fall apart when the model gets confused.",
    primaryKeyword: 'hire voice ai developer',
    whyUs: [
      {
        title: 'Sub-second latency or it doesn\'t ship',
        description:
          'Time-to-first-audio under 1.5s with streaming STT, streaming LLM, streaming TTS. We measure and budget every hop.'
      },
      {
        title: 'Interruption-safe by design',
        description:
          "Voice agents that handle real human conversation: interruptions, backchanneling, repair patterns. We don't ship turn-based bots."
      },
      {
        title: 'Telephony-fluent',
        description:
          "Twilio, Vonage, SIP integration. PSTN and WebRTC. We've connected voice agents to real phone numbers and handled compliance basics (call recording, consent flows)."
      }
    ],
    skills: [
      'Voice platforms — Vapi, LiveKit Agents, Pipecat, Retell, custom orchestration',
      'STT — Deepgram, AssemblyAI, OpenAI Whisper (for non-realtime)',
      'TTS — ElevenLabs, Cartesia, Deepgram Aura, Azure Neural',
      'LLM orchestration — function calling, tool use, conversation memory',
      'Telephony — Twilio Voice, SIP, WebRTC',
      'Real-time audio — WebSocket streaming, opus codec',
      'Interruption handling — VAD, barge-in, repair conversations',
      'Latency optimization — streaming pipelines, parallel hops',
      'Compliance — call recording, consent, PII redaction in transcripts'
    ],
    techStack: [
      'Vapi',
      'LiveKit',
      'Pipecat',
      'Twilio',
      'Deepgram',
      'ElevenLabs',
      'Cartesia',
      'Anthropic Claude',
      'OpenAI'
    ],
    faq: [
      {
        question: 'Vapi, Retell, LiveKit, or custom?',
        answer:
          "Vapi for fastest time-to-market with managed orchestration. LiveKit Agents when you want full control and self-hosting. Pipecat when you need Python-based orchestration. Custom when latency budgets, persona requirements, or compliance demand it."
      },
      {
        question: 'What latency can we expect?',
        answer:
          "Time-to-first-audio: 800ms–1.5s end-to-end with streaming STT + streaming LLM + streaming TTS. End-to-turn (full response): 2–4s depending on response length. We measure each hop."
      },
      {
        question: 'How do you handle interruptions?',
        answer:
          'Voice activity detection (VAD) on the user\'s mic. When the user speaks during the agent\'s turn, we cut TTS, capture the new utterance, and reroute. Repair turns ("sorry, can you say that again?") for low-confidence ASR.'
      },
      {
        question: 'TTS quality — which provider?',
        answer:
          "ElevenLabs for the most expressive voices (slower). Cartesia for low-latency real-time (faster). Deepgram Aura for cost-effective production. We benchmark on your script and persona."
      },
      {
        question: 'Can you connect to a real phone number?',
        answer:
          "Yes — Twilio Voice + SIP integration is standard. We handle the inbound call, route to the voice agent, and connect outbound when the agent decides to transfer to a human."
      },
      {
        question: 'Compliance — call recording, consent?',
        answer:
          "Yes — opt-in consent flows at call start, recording with user awareness, PII redaction from transcripts before storage. We follow jurisdictional rules (US two-party, EU GDPR-aware)."
      }
    ],
    relatedServiceTags: ['Voice AI Engineering'],
    relatedRoles: ['ai-engineer', 'python-developer', 'ml-engineer']
  },

  // ─── PHASE 3 ──────────────────────────────────────────────────────────────
  {
    slug: 'web-developer',
    title: 'Web Developer',
    h1: 'Hire Senior Web Developers',
    subhead:
      'Full-spectrum web engineers who ship websites and web apps that perform, convert, and stay maintainable.',
    metaTitle: 'Hire Web Developers — Senior, Full-Spectrum | Techyor',
    metaDescription:
      'Hire senior web developers fluent across modern stacks — React, Next.js, Svelte, WordPress, Shopify. Production websites and web apps that ship and last.',
    intro:
      "Web development is the broadest hire we do. A senior web developer ranges from marketing-site SEO to web apps with complex state to e-commerce stores to internal admin panels. Ours pick the right stack for the problem — Next.js when SEO + interactivity matters, SvelteKit when bundle size and performance lead, WordPress when editors drive content, Shopify for storefronts. We don't sell the same hammer to every nail.",
    primaryKeyword: 'hire web developer',
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
    slug: 'headless-cms-developer',
    title: 'Headless CMS Developer',
    h1: 'Hire Senior Headless CMS Developers',
    subhead:
      'Engineers who architect content infrastructure — Sanity, Storyblok, Contentful, Payload — for marketing sites that scale.',
    metaTitle: 'Hire Headless CMS Developers — Sanity, Storyblok | Techyor',
    metaDescription:
      'Hire senior headless CMS developers experienced in Sanity, Storyblok, Contentful, Payload, and Strapi. Content infrastructure that scales.',
    intro:
      "Headless CMS is the right call when the frontend benefits from a modern framework and the content team needs editorial freedom. Our headless CMS developers architect content models that survive two product redesigns, integrate with Next.js / SvelteKit / Astro frontends, and design preview workflows that editors actually use. We've built on Sanity, Storyblok, Contentful, Payload (self-hosted), and Strapi — and we'll tell you which one fits your team rather than which one we sell.",
    primaryKeyword: 'hire headless cms developer',
    whyUs: [
      {
        title: 'Content modeling depth',
        description:
          "Document types, references, embedded content, slug strategies, localization. We design schemas that don't need to be torn down in two years."
      },
      {
        title: 'Preview that works',
        description:
          "Live preview, draft mode, on-demand revalidation — set up so editors see changes the way users will. The preview workflow is part of the deliverable."
      },
      {
        title: 'Platform-pluralist',
        description:
          "Sanity for developer-controlled schemas. Storyblok for marketer-friendly visual editing. Contentful for enterprise teams. Payload for self-hosted with full control. We do all of them."
      }
    ],
    skills: [
      'Sanity — schema design, GROQ, structure builder, custom inputs',
      'Storyblok — visual editor, blocks, story types, asset management',
      'Contentful — content models, entries, assets, GraphQL',
      'Payload (self-hosted) — collections, globals, hooks, custom UI',
      'Strapi — content types, plugins, media library',
      'Frontend integration — Next.js, SvelteKit, Astro',
      'Preview workflows — draft mode, on-demand revalidation, live preview',
      'Localization — multi-language content, fallback strategies',
      'Migration — WordPress → headless, between headless platforms'
    ],
    techStack: [
      'Sanity',
      'Storyblok',
      'Contentful',
      'Payload',
      'Strapi',
      'Next.js',
      'SvelteKit',
      'Astro',
      'GROQ',
      'GraphQL'
    ],
    faq: [
      {
        question: 'Which headless CMS do you recommend?',
        answer:
          "Sanity for developer-led teams that want full schema control and powerful querying. Storyblok for marketing teams that want visual editing. Contentful for enterprise content workflows. Payload for self-hosted with TypeScript-native config. Choose by team, not feature comparison."
      },
      {
        question: 'Can you migrate from WordPress?',
        answer:
          "Yes — we extract content via WP REST API or WPGraphQL, map to the headless schema, preserve URLs, set up redirects, and shut down WordPress when the new site is live."
      },
      {
        question: 'How do you handle preview?',
        answer:
          "Next.js Draft Mode + revalidatePath/revalidateTag for on-demand. Sanity Live Preview for real-time editing experience. Storyblok Visual Editor for editor-led drafts. We set the workflow up so editors don't need to ping engineers."
      },
      {
        question: 'Localization?',
        answer:
          "Per-CMS approach. Sanity uses internationalization plugin or custom field structure. Storyblok has language folders. Contentful has locale-per-field. We design schemas with i18n in mind from the start."
      },
      {
        question: 'Self-hosted or SaaS?',
        answer:
          'SaaS (Sanity, Storyblok, Contentful) for most cases — managed infra, auto-scaling, regular feature updates. Self-hosted (Payload, Strapi) when data sovereignty, customization, or cost-at-scale demands it.'
      },
      {
        question: 'Performance for content sites?',
        answer:
          "Static generation (SSG/ISR) with on-demand revalidation. CDN-cached. Edge functions for personalization. Most headless sites we ship hit 95+ Lighthouse Mobile."
      }
    ],
    relatedServiceTags: ['Content Management Systems', 'Website'],
    relatedRoles: ['web-developer', 'frontend-developer', 'wordpress-developer', 'nextjs-developer']
  },
  {
    slug: 'saas-developer',
    title: 'SaaS Developer',
    h1: 'Hire Senior SaaS Developers',
    subhead:
      'Engineers who build multi-tenant platforms with subscription billing, role-based access, and the boring infrastructure SaaS needs.',
    metaTitle: 'Hire SaaS Developers — Multi-tenant, Production | Techyor',
    metaDescription:
      'Hire senior SaaS developers experienced in multi-tenancy, subscription billing, RBAC, audit logs, and production-grade SaaS infrastructure.',
    intro:
      "Building SaaS is mostly the boring infrastructure: multi-tenancy, subscription billing, role-based access control, audit logs, customer onboarding, billing edge cases (proration, tax, dunning). Our SaaS developers have built it before. They know which Stripe webhook to trust, why your trial conversion is dropping, how to design a permissions model that scales past three roles, and what auditable means when SOC 2 enters the picture.",
    primaryKeyword: 'hire saas developer',
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
  },
  {
    slug: 'devops-engineer',
    title: 'DevOps Engineer',
    h1: 'Hire Senior DevOps Engineers',
    subhead:
      'Platform engineers who ship CI/CD, observability, and cloud infrastructure that runs unattended.',
    metaTitle: 'Hire DevOps Engineers — Senior, Cloud | Techyor',
    metaDescription:
      'Hire senior DevOps engineers experienced in AWS, Kubernetes, Terraform, CI/CD, observability, and platform engineering for product teams.',
    intro:
      "DevOps is the role you hire when product engineers are spending more time on infrastructure than features. Our DevOps engineers ship CI/CD pipelines that finish in minutes, observability stacks that catch issues before users notice, infrastructure-as-code that's reviewable like product code, and cloud architectures that scale without surprises. They're platform engineers — they build internal platforms that make other engineers faster.",
    primaryKeyword: 'hire devops engineer',
    whyUs: [
      {
        title: 'Platform engineering, not script collecting',
        description:
          "We build internal platforms (Backstage-style or simpler) that abstract infrastructure away from product teams. Self-service deploys, environment management, observability included."
      },
      {
        title: 'Cost-aware',
        description:
          "Cloud bills are engineering. We profile spend, identify waste (idle resources, oversized instances, S3 lifecycle), and design architectures that scale efficiently."
      },
      {
        title: 'Observability-first',
        description:
          'OpenTelemetry across services, structured logs, metric dashboards, alert thresholds. We ship with the levers to debug production before we need them.'
      }
    ],
    skills: [
      'Cloud — AWS (deep), GCP, Azure, Cloudflare, Vercel',
      'IaC — Terraform, Pulumi, AWS CDK',
      'Containers — Docker, Kubernetes (when needed), ECS, Cloud Run',
      'CI/CD — GitHub Actions, GitLab CI, CircleCI, Vercel Builds',
      'Observability — OpenTelemetry, Datadog, Grafana, Prometheus',
      'Logging — structured logs, log aggregation, retention policies',
      'Security — IAM, secrets management, vulnerability scanning, SOC 2 controls',
      'Cost optimization — Reserved Instances, Spot, S3 lifecycle, right-sizing',
      'Disaster recovery — backups, multi-region failover, runbook drills'
    ],
    techStack: [
      'AWS',
      'Terraform',
      'Kubernetes',
      'Docker',
      'GitHub Actions',
      'OpenTelemetry',
      'Datadog',
      'Grafana',
      'Cloudflare'
    ],
    faq: [
      {
        question: 'Kubernetes or simpler?',
        answer:
          'Simpler when possible — ECS, Cloud Run, Vercel Functions, fly.io. Kubernetes when you actually have the scale to justify the operational complexity. Most product teams don\'t need Kubernetes.'
      },
      {
        question: 'Multi-cloud or single-cloud?',
        answer:
          "Single-cloud for almost every product company. Multi-cloud only when regulatory or strategic reasons demand it — not for redundancy (that's what regions are for)."
      },
      {
        question: 'Terraform or alternatives?',
        answer:
          "Terraform for most projects — mature, broad ecosystem, well-understood. Pulumi when teams want to use TypeScript or Python instead of HCL. AWS CDK when AWS-only and code-first appeals."
      },
      {
        question: 'How do you handle secrets?',
        answer:
          "AWS Secrets Manager or HashiCorp Vault. Never in env files in repos, never in CI logs. Rotation policies for high-sensitivity credentials. SOPS or age for encrypted-in-repo when needed."
      },
      {
        question: 'Cost — typical wins?',
        answer:
          'Right-sizing instances (most are oversized), Reserved Instances or Savings Plans for steady workloads, S3 lifecycle to Glacier, eliminating idle/forgotten resources, dev/staging downscaled outside hours. 30–50% reductions are typical.'
      },
      {
        question: 'Compliance — SOC 2, HIPAA?',
        answer:
          "We build the technical controls: encryption at rest and in transit, access logs, least-privilege IAM, vulnerability scanning, backup/restore drills. Pair with Vanta or Drata for the compliance platform side."
      }
    ],
    relatedServiceTags: ['Backend Engineering'],
    relatedRoles: ['backend-developer', 'full-stack-developer', 'python-developer', 'nodejs-developer']
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
