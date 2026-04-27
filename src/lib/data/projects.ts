export const projectsData = [
  {
    id: 11,
    slug: 'monster-fairings',
    name: 'Monster Fairings.',
    tagline: 'A global e-commerce platform with AI-powered visualization, managing 5000+ fairings and serving riders across seven countries.',
    image: '/assets/projects/monster-fairings/cover.jpg',
    coverImage: '/assets/projects/monster-fairings/cover.jpg',
    publishedYear: 2021,
    services: ['Web Design', 'E-commerce', 'Development', 'Strategy', 'AI Integration'],
    deliverables: ['Website', 'E-commerce Platform'],
    links: [
      { label: 'Website', url: 'https://monsterfairings.com/' }
    ],
    team: [],
    metrics: [
      { label: 'Products', value: '5000+', tooltip: 'Product Catalog', isPositive: true },
      { label: 'Countries', value: '7+', tooltip: 'Shipping Destinations', isPositive: true }
    ],
    intro: 'Monster Fairings is a premier e-commerce platform specializing in custom motorcycle fairings for riders worldwide. We engineered a sophisticated platform managing 5000+ products with a complex payment structure supporting multiple business models. The system features an advanced filtering architecture, AI-powered fairings visualization kit allowing riders to see products on their bikes, comprehensive email management capabilities, and robust speed and security infrastructure. The platform seamlessly handles inventory management, customization options, international shipping, and delivers a superior shopping experience across multiple markets.',
    awards: []
  }
];

export function getProjectBySlug(slug: string) {
  return projectsData.find(p => p.slug === slug);
}

export function getAllProjects() {
  return projectsData;
}
