/**
 * Location-targeted hire pages — `/hire-developers/<slug>`.
 *
 * Five pages total: united-states, united-kingdom, australia, canada, europe.
 * Currently only united-states is fully populated; the other four are
 * registered as drafts so the route resolver returns 404 for them
 * until copy lands. When a draft is ready, set `ready: true` and fill
 * in the missing fields.
 *
 * Each entry produces a public page with full Service + FAQPage +
 * BreadcrumbList + ContactPage JSON-LD, dynamic OG image, sitemap
 * entry, and per-region working-relationship content (timezone,
 * billing, legal, comms cadence).
 */

export type CaseStudyHighlight = {
  /** Slug must match a project in projectsData. */
  projectSlug: string;
  /** One-line angle to lead with on this region's page. */
  angle: string;
};

export type LocationFaq = {
  question: string;
  answer: string;
};

export type Location = {
  /** URL slug. */
  slug: string;
  /** Whether the page is fully drafted and should render. False = 404. */
  ready: boolean;
  /** Region display name, e.g. "United States". */
  countryName: string;
  /** Adjective form, e.g. "US" or "American". Used in body copy. */
  shortName: string;
  /** ISO country code (US, GB, AU, CA) or 'EU' for Europe broad. */
  countryCode: string;
  /** Hero H1, e.g. "Hire Senior Developers from India for US Companies". */
  h1: string;
  /** One-line subhead. */
  subhead: string;
  /** <title> tag — keep <= 65 chars. */
  metaTitle: string;
  /** Meta description ~155 chars. */
  metaDescription: string;
  /** SEO body intro — full paragraph (~150-220 words). */
  intro: string;

  /** Trust strip — 4 metrics. */
  stats: { label: string; value: string }[];

  /** 3 differentiators specific to this region's working relationship. */
  whyUs: { title: string; description: string }[];

  /** "How we work" — region-specific overlap window. */
  overlap: {
    /** e.g. "3-4 hours daily with US Pacific" */
    summary: string;
    /** Detail bullets shown under the heading. */
    details: string[];
  };

  /** Comms / cadence section. */
  comms: {
    summary: string;
    items: { title: string; description: string }[];
  };

  /** Legal & payment section. */
  legalAndPayment: {
    items: { title: string; description: string }[];
  };

  /** Pricing positioning. */
  pricing: {
    summary: string;
    /** Schema.org priceRange string: '$' affordable, '$$' mid, '$$$' premium. */
    priceRange: string;
    bands: { label: string; range: string; description: string }[];
  };

  /** Top industries served (1-3). */
  industries: { name: string; description: string }[];

  /** Case studies to feature on this page. */
  caseStudies: CaseStudyHighlight[];

  /** Region-specific FAQ. */
  faq: LocationFaq[];
};

export const locations: Location[] = [
  // ─── UNITED STATES (fully populated) ─────────────────────────────────────
  {
    slug: 'united-states',
    ready: true,
    countryName: 'United States',
    shortName: 'US',
    countryCode: 'US',
    h1: 'Hire Senior Developers from India for US Companies',
    subhead:
      "3–4 hours of daily overlap with US Pacific. USD billing on Stripe or Wise. Work-for-hire from day one. 50+ US clients shipped — and counting.",
    metaTitle: 'Hire Developers for US Companies | Techyor',
    metaDescription:
      'Hire senior developers from India for US companies. 50+ US clients shipped, 3–4 hrs daily PST overlap, USD billing on Stripe/Wise, work-for-hire IP, NDA day one.',
    intro:
      "Hiring offshore developers for a US company sounds simple until you do it. The promise — '24-hour turnaround, half the cost, same quality' — runs into friction the moment a real engagement starts. Time-zone gaps that nobody discussed. Invoices in unfamiliar currencies. NDAs that take three weeks of legal back-and-forth. IP terms that get clarified after the code is already written. We've shipped for 50+ US companies over the past 8 years, and we've designed our engagement model around the parts that actually break: the working hours that overlap with your sprint, the legal posture that doesn't surprise your counsel, the billing setup that flows through your AP without exceptions, and the communication cadence that keeps a US PM informed without keeping them up at 3am. This page is the honest version of how we work with US teams — what we commit to in writing, what we don't pretend to do, and what the first 60 days actually look like.",

    stats: [
      { label: 'US clients shipped', value: '50+' },
      { label: 'Years serving the US', value: '8+' },
      { label: 'Daily PST overlap', value: '3–4 hrs' },
      { label: 'Reply time', value: '24h' }
    ],

    whyUs: [
      {
        title: 'Real Pacific overlap, in writing',
        description:
          "We commit to 3–4 hours of daily overlap with US Pacific time (IST 8pm–11:30pm = PST 6:30am–9:30am). That covers your Pacific morning standup and your East Coast lunch — every day, not 'when convenient'."
      },
      {
        title: 'Work-for-hire from day one',
        description:
          "Every line of code is yours from the moment it's written. No assignment-on-payment clauses, no portfolio rights we hold back, no IP surprises six months in. The MSA you bring is the MSA we sign."
      },
      {
        title: '50+ US clients, 8+ years',
        description:
          "We've billed US companies in USD since before Stripe Connect existed. We know what your CFO expects on an invoice, what your legal team flags in our NDA reply, and what your engineering manager wants in a daily update."
      }
    ],

    overlap: {
      summary: '3–4 hours daily with US Pacific — and effective coverage of every US time zone.',
      details: [
        'IST 8:00pm–11:30pm = PST 6:30am–10:00am (West Coast morning + standup)',
        'Same window = EST 9:30am–12:30pm (East Coast late morning + lunch)',
        'Mountain and Central naturally fall between, fully covered',
        'Async work continues during US night — code and updates land before US morning',
        'Emergency response window: same-day reply, never next-day',
        'We never schedule meetings before your 9am or after your 5pm without asking'
      ]
    },

    comms: {
      summary:
        "Daily Slack updates and one weekly sync call. Async-first by default — your team isn't on calls all day, and neither are we.",
      items: [
        {
          title: 'Daily written updates in Slack',
          description:
            "Posted at end of our day (US morning). Format: what shipped, what's blocked, what's next, demo links. Your PM can skim in 60 seconds."
        },
        {
          title: 'One weekly sync (30–45 min)',
          description:
            "Live call to walk through demos, surface tradeoffs, and align on the next sprint. Default time is your Tuesday morning Pacific."
        },
        {
          title: 'Loom for the in-between',
          description:
            'When something needs context that text won\'t carry, we record a Loom. 3-minute walkthrough beats a 30-minute scheduled call.'
        },
        {
          title: 'Single point of contact',
          description:
            "One named project lead from our side, with you in Slack. No agency-style handoffs between account managers and engineers."
        },
        {
          title: 'Your tools, not ours',
          description:
            "We onboard onto your Slack, your Linear/Jira, your GitHub, your Figma. We don't ask you to migrate to ours."
        }
      ]
    },

    legalAndPayment: {
      items: [
        {
          title: 'NDA before details',
          description:
            "We sign your NDA before any project specifics, code reviews, or credentials change hands. If you don't have a template, we recommend one but use yours by default."
        },
        {
          title: 'Work-for-hire IP, by default',
          description:
            "All work product belongs to you from the moment it's written — code, designs, documentation, drafts. We don't retain portfolio rights unless you opt us in."
        },
        {
          title: 'USD billing — Stripe, Wise, or wire',
          description:
            "Invoiced in US dollars. Pay via Stripe (card / ACH), Wise (low FX cost), or direct wire. INR bank transfer also available if your accounting team requires it."
        },
        {
          title: 'Net-15 or net-30 terms',
          description:
            "Standard payment terms align with your AP cycle. Milestone-based billing for fixed-scope projects; bi-weekly for retainers."
        },
        {
          title: 'Tax forms',
          description:
            "We invoice as a non-US entity. We follow your accounting team's lead on W-8BEN-E or equivalent forms — happy to provide whatever your CFO requires."
        },
        {
          title: 'Mutual termination',
          description:
            "Engagements have a 2-week notice period either direction. No long lock-in contracts. Either party can walk for cause without penalty."
        }
      ]
    },

    pricing: {
      summary:
        "Transparent USD pricing built for offshore value. Projects start from $800 and scale with scope; hourly rates run $15–$40 depending on seniority and stack. Every quote is line-itemed so you see exactly where the budget goes.",
      priceRange: '$$',
      bands: [
        {
          label: 'Small Projects',
          range: 'From $800',
          description:
            'Landing pages, small features, integrations, fixes, and scoped one-offs. Typical timeline 1–2 weeks. Best for quick wins or validating an idea.'
        },
        {
          label: 'Mid-Size / MVP',
          range: '$2k – $25k',
          description:
            '4–12 weeks. Full features, MVPs, custom modules, full sites or apps. Working product ready to ship to real users.'
        },
        {
          label: 'Hourly / Retainer',
          range: '$15 – $40 / hr',
          description:
            'Senior developer time, billed hourly. Tier depends on seniority and stack. Ideal for ongoing roadmap work, staff augmentation, or specialist coverage.'
        }
      ]
    },

    industries: [
      {
        name: 'SaaS & B2B platforms',
        description:
          'Multi-tenant architecture, Stripe billing, role-based access, audit logs, SSO. We know the boring infrastructure SaaS actually runs on.'
      },
      {
        name: 'E-commerce & DTC',
        description:
          'Shopify Plus, Hydrogen, custom checkout, custom payment gateways, B2B wholesale. We ship stores that convert, not portfolios that look good.'
      },
      {
        name: 'Mobile-first consumer',
        description:
          'iOS and Android apps for retail, restaurant, health, and consumer brands. App Store launch readiness is part of the build, not an afterthought.'
      }
    ],

    caseStudies: [
      {
        projectSlug: 'firmable',
        angle: 'AI-driven B2B sales intelligence — RAG, fine-tuning, production-grade evals.'
      },
      {
        projectSlug: 'monster-fairings',
        angle: 'Global e-commerce platform — 5,000+ products, AI visualization, 7-country shipping.'
      },
      {
        projectSlug: 'lineleader',
        angle: 'SaaS business management platform — multi-tenant, subscription billing, daily ops at scale.'
      },
      {
        projectSlug: 'convertbankstatement',
        angle: 'AI document processing — Python + React/Next.js + multi-bank parsing pipeline.'
      },
      {
        projectSlug: 'simpletalk-ai',
        angle: 'Production voice AI — sub-second latency, real telephony, LiveKit + Vapi orchestration.'
      },
      {
        projectSlug: 'howdo',
        angle: 'B2B SaaS — content management + subscription model with React/Next.js frontend.'
      }
    ],

    faq: [
      {
        question: 'How does the time-zone overlap actually work day-to-day?',
        answer:
          "We commit to 3–4 hours of daily overlap with US Pacific time (IST 8pm–11:30pm = PST 6:30am–9:30am). That window covers your West Coast morning standup, your Mountain/Central mid-morning, and your East Coast late-morning to lunch. The rest of the workday on each side is async. We post daily updates in Slack at the end of our day (your morning), so when your team starts work, the latest status is already in their inbox."
      },
      {
        question: 'Do you bill in USD? What payment methods do you accept?',
        answer:
          'Yes — invoices in US dollars. Pay via Stripe (card or ACH for the lowest fees), Wise (low FX cost, good for larger transfers), or direct wire to our account. If your accounting team prefers INR direct, we can arrange that too. Net-15 or net-30 terms standard, milestone-based for fixed projects, bi-weekly for retainers.'
      },
      {
        question: 'What about W-8BEN-E or other US tax forms?',
        answer:
          "We invoice as a non-US entity. Most US clients ask us for a W-8BEN-E; we follow your accounting team's lead on what they need filed. We're happy to complete whatever forms your CFO or AP team requires before the first invoice."
      },
      {
        question: 'How do NDAs work?',
        answer:
          "We sign your NDA before any project specifics are exchanged — including before discovery calls go past the high-level. If you don't have a template ready, we'll suggest one, but yours always wins by default. We've signed every variation of US enterprise NDA you can imagine; legal review on our side is fast."
      },
      {
        question: 'Who owns the code and IP?',
        answer:
          "You do — fully and from day one. We work on a work-for-hire basis: every line of code, every design file, every piece of documentation belongs to you the moment it's written. We don't retain portfolio rights unless you specifically opt us in. The MSA you bring is the MSA we sign — we don't push our own contract on top of yours."
      },
      {
        question: 'How fast can a developer start?',
        answer:
          "Once an MSA + SOW is signed and access is provisioned, we're typically posting our first PR within 5–10 business days. The bottleneck is almost always client-side: GitHub access, Slack invite, environment credentials. We pre-qualify our bench so the developer is ready immediately — no hiring search, no two-week ramp before code lands."
      },
      {
        question: "What's the daily communication rhythm?",
        answer:
          "Daily written updates in Slack at the end of our day (your morning). One weekly 30–45 minute sync call — typically Tuesday morning Pacific. Loom recordings for anything that needs context text won't carry. Your team uses your tools (Slack, Linear/Jira, GitHub, Figma) — we onboard onto your stack, not the other way around."
      },
      {
        question: 'Do you handle compliance — SOC 2, HIPAA, PCI?',
        answer:
          "We've shipped for clients in regulated industries (healthcare, fintech, payments). We don't manage your audit, but we build with the right technical controls in mind: encryption at rest and in transit, least-privilege access, structured audit logs, and clean separation of secrets. For SOC 2 specifically, we can pair with Vanta, Drata, or Secureframe on the platform side."
      },
      {
        question: 'What happens if the project goes wrong?',
        answer:
          "Engagements include a 2-week mutual notice period either direction. If something isn't working — quality, fit, communication — either of us can pause without penalty. For fixed-scope projects, milestones are billed only on acceptance. We'd rather lose a project than ship something we can't stand behind."
      },
      {
        question: 'Why hire offshore from India instead of US-based talent?',
        answer:
          "Cost is the obvious answer — our hourly rates start at $15 and projects start at $800, often 70–90% less than equivalent US-based agencies. But the bigger reason most US clients return to us is talent depth: India's senior dev market is enormous, and we've spent 8 years building a bench that ships. The honest tradeoff is time-zone friction. We've designed our engagement model — overlap window, async-first updates, Loom-heavy comms — specifically to minimize that friction."
      }
    ]
  },

  // ─── DRAFTS (not ready, will 404 until populated) ────────────────────────
  {
    slug: 'united-kingdom',
    ready: false,
    countryName: 'United Kingdom',
    shortName: 'UK',
    countryCode: 'GB',
    h1: 'Hire Senior Developers from India for UK Companies',
    subhead: '',
    metaTitle: 'Hire Developers for UK Companies | Techyor',
    metaDescription: '',
    intro: '',
    stats: [],
    whyUs: [],
    overlap: { summary: '', details: [] },
    comms: { summary: '', items: [] },
    legalAndPayment: { items: [] },
    pricing: { summary: '', bands: [] },
    industries: [],
    caseStudies: [],
    faq: []
  },
  {
    slug: 'australia',
    ready: false,
    countryName: 'Australia',
    shortName: 'AU',
    countryCode: 'AU',
    h1: 'Hire Senior Developers from India for Australian Companies',
    subhead: '',
    metaTitle: 'Hire Developers for Australian Companies | Techyor',
    metaDescription: '',
    intro: '',
    stats: [],
    whyUs: [],
    overlap: { summary: '', details: [] },
    comms: { summary: '', items: [] },
    legalAndPayment: { items: [] },
    pricing: { summary: '', bands: [] },
    industries: [],
    caseStudies: [],
    faq: []
  },
  {
    slug: 'canada',
    ready: false,
    countryName: 'Canada',
    shortName: 'Canadian',
    countryCode: 'CA',
    h1: 'Hire Senior Developers from India for Canadian Companies',
    subhead: '',
    metaTitle: 'Hire Developers for Canadian Companies | Techyor',
    metaDescription: '',
    intro: '',
    stats: [],
    whyUs: [],
    overlap: { summary: '', details: [] },
    comms: { summary: '', items: [] },
    legalAndPayment: { items: [] },
    pricing: { summary: '', bands: [] },
    industries: [],
    caseStudies: [],
    faq: []
  },
  {
    slug: 'europe',
    ready: false,
    countryName: 'Europe',
    shortName: 'European',
    countryCode: 'EU',
    h1: 'Hire Senior Developers from India for European Companies',
    subhead: '',
    metaTitle: 'Hire Developers for European Companies | Techyor',
    metaDescription: '',
    intro: '',
    stats: [],
    whyUs: [],
    overlap: { summary: '', details: [] },
    comms: { summary: '', items: [] },
    legalAndPayment: { items: [] },
    pricing: { summary: '', bands: [] },
    industries: [],
    caseStudies: [],
    faq: []
  }
];

export const locationsBySlug: Record<string, Location> = Object.fromEntries(
  locations.map((l) => [l.slug, l])
);

export function getLocation(slug: string): Location | undefined {
  return locationsBySlug[slug];
}

export function getReadyLocations(): Location[] {
  return locations.filter((l) => l.ready);
}
