/**
 * SEO-optimized service and deliverable descriptions
 * Used on filter/category pages for improved search visibility and user guidance
 */

export const serviceDescriptions: Record<string, string> = {
  'AI & Machine Learning': `We build AI systems. Chatbots, voice agents, RAG pipelines, fine-tuned models for specific domains. If you have data and a problem, we can build a model for it. Predictive analytics, document processing, computer vision — we've done it all.`,

  'Backend Engineering': `Fast, reliable backend systems. APIs that don't break when traffic spikes. Databases that scale. We build systems you can trust. REST, GraphQL, real-time, async workers — whatever your product needs.`,

  'Business Services': `We solve business problems with software. Streamline your ops, improve your workflows, build new revenue streams. Technology is a means to an end, not the end itself. We start by understanding your actual problem.`,

  'Design & Creative': `Design that works. Interfaces people can use without frustration. Brands that people remember. We research, iterate, test with users. Accessible by default. Beautiful as a side effect.`,

  'Education & Training': `Learning platforms and tools that actually teach. LMS software, interactive courses, skill tracking. We know what works for retention: testing, spacing, feedback. Built for real learning, not just checking boxes.`,

  'E-commerce': `Online stores that convert. Shopify, custom builds, whatever fits your scale. Multi-currency, international shipping, subscription handling. We've shipped stores that actually make money.`,

  'Financial Services': `Fintech built right. Payment systems, trading platforms, banking software. Compliance is non-negotiable. PCI, SOC 2, regulatory audits — we know the constraints.`,

  'Food & Beverage': `Systems for restaurants, delivery, specialty food brands. Inventory management, kitchen screens, ordering. We understand F&B logistics and margins.`,

  'Health & Wellness': `Healthcare software that respects privacy. Telemedicine, patient portals, health records. HIPAA built in from day one. Patient data stays secure.`,

  'Mobile App Development': `iOS and Android apps. Native when it matters, cross-platform when it makes sense. App Store launches, over-the-air updates, real device testing. Built to ship.`,

  'Python Backend Engineering': `Fast backends with Python. Django, FastAPI, async workers. Data pipelines, APIs, real-time systems. Python gets us to production quickly without sacrificing performance.`,

  'React & Next.js Development': `React interfaces and Next.js apps. Performance, accessibility, fast page loads. Core Web Vitals that matter. From dashboards to marketing sites with ecommerce.`,

  'Real Estate & Property': `Property listing sites, landlord portals, rental management. Virtual tours, analytics, tenant communication. Built for the people who use it.`,

  'SaaS Platforms': `Multi-tenant SaaS products. Built to grow. Subscription billing, usage metering, API access. Product-first approach — we build things people want to use.`,

  'Voice AI Engineering': `Voice systems that actually work. Chatbots, IVR replacement, hands-free interfaces. Understanding context, handling interruptions, sounding human.`,

  'Web Development & Design': `Full-stack web work. Strategy, design, frontend, backend, DevOps. From landing pages to complex web apps. Performance and conversion are the metrics that matter.`,

  'UX & UI Design': `User research, interaction design, visual design. Interfaces people can actually use. Accessibility from day one. Iterative testing with real users.`,

  // Deliverables
  'Website': `Websites that work. Fast, mobile-friendly, accessible. Built to your brand, optimized to convert. From simple marketing sites to complex interactive experiences.`,

  'E-Commerce Platforms': `Online stores built to sell. Inventory, pricing, payment processing, shipping. Multi-currency and international support if you need it. Grows with your business.`,

  'Web Applications': `Complex web apps. Dashboards, project tools, collaboration software. Real-time data, external integrations, performance at scale.`,

  'Mobile Applications': `iOS and Android apps. Built natively for the platform. App Store ready. Users actually download and use them.`,

  'Subscription Platforms': `SaaS products with subscription billing. Infrastructure, payment handling, retention analytics. But really, a good product that users keep paying for.`,

  'APIs & Backend Services': `APIs that developers like using. Good documentation, clean design, stable. REST, GraphQL, websockets. Powers your apps and integrations.`,

  'Design & Branding': `Brand identity and design systems. Logo, color, typography, guidelines. Consistency across products and touchpoints. Brands that stick.`,

  'Content Management Systems': `CMS software. Write and publish without code. Fits your workflow. WordPress, custom builds, or headless CMS — whatever makes sense.`,

  'Business Management Platforms': `Software tailored to how your business actually works. Not off-the-shelf bloatware. Your workflows, automated. Reporting and visibility that matters.`,
};

export function getServiceDescription(filterName: string): string {
  return serviceDescriptions[filterName] ||
    `We specialize in delivering exceptional ${filterName.toLowerCase()} that drive business growth. With ${30}+ projects delivered across diverse industries, we bring proven expertise, technical excellence, and a deep understanding of what makes these solutions succeed.`;
}
