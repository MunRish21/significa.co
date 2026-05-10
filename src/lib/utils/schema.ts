export const BASE_URL = 'https://www.techyor.com';

export function generateOrganizationSchema() {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Techyor',
    url: BASE_URL,
    logo: `${BASE_URL}/techyor.png`,
    description:
      'A digital product studio that ships. Building websites, web apps, and mobile products for ambitious teams across the US, UK, Switzerland, and Australia.',
    sameAs: ['https://twitter.com/TechyorDotCo', 'https://www.linkedin.com/company/techyor'],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
      addressLocality: 'Chandigarh'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Sales',
      email: 'info@techyor.com',
      telephone: '+91 9915002625'
    }
  });
}

/**
 * ProfessionalService — better than plain Organization for the homepage:
 * surfaces services offered, area served, audience, ratings, and price
 * range in one entity. Eligible for Local Business / Service rich-results.
 */
export function generateProfessionalServiceSchema(input: {
  description: string;
  url: string;
  imagePath?: string;
  ratings?: number[];
  reviews?: Array<{ rating: number; body: string; author: string; date?: string }>;
}) {
  const ratings = input.ratings || [];
  const aggregateRating =
    ratings.length > 0
      ? {
          '@type': 'AggregateRating',
          ratingValue: (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1),
          reviewCount: ratings.length,
          bestRating: 5,
          worstRating: 1
        }
      : undefined;

  const review =
    input.reviews && input.reviews.length > 0
      ? input.reviews.map((r) => ({
          '@type': 'Review',
          reviewRating: {
            '@type': 'Rating',
            ratingValue: r.rating,
            bestRating: 5,
            worstRating: 1
          },
          author: { '@type': 'Person', name: r.author },
          reviewBody: r.body,
          datePublished: r.date
        }))
      : undefined;

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Techyor',
    alternateName: 'Techyor Digital Product Studio',
    description: input.description,
    url: input.url,
    logo: `${BASE_URL}/techyor.png`,
    image: `${BASE_URL}${input.imagePath || '/og.png'}`,
    priceRange: '$$$',
    sameAs: ['https://twitter.com/TechyorDotCo', 'https://www.linkedin.com/company/techyor'],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
      addressLocality: 'Chandigarh'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Sales',
      email: 'info@techyor.com',
      telephone: '+91 9915002625',
      areaServed: ['US', 'GB', 'AU', 'CH', 'IN'],
      availableLanguage: ['en']
    },
    areaServed: [
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Country', name: 'United Kingdom' },
      { '@type': 'Country', name: 'Australia' },
      { '@type': 'Country', name: 'Switzerland' },
      { '@type': 'Place', name: 'Worldwide' }
    ],
    knowsAbout: [
      'Web development',
      'Mobile app development',
      'AI and machine learning',
      'E-commerce',
      'SaaS',
      'UX/UI design',
      'React',
      'Next.js',
      'Python',
      'React Native'
    ],
    aggregateRating,
    review,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': input.url,
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['h1', '[data-speakable]']
      }
    }
  });
}

/**
 * AboutPage schema — used for the /about route. Pairs with
 * Organization/ProfessionalService and a team ItemList.
 */
export function generateAboutPageSchema(input: {
  url: string;
  description: string;
  imagePath?: string;
}) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Techyor',
    description: input.description,
    url: input.url,
    image: `${BASE_URL}${input.imagePath || '/og.png'}`,
    mainEntity: {
      '@type': 'Organization',
      name: 'Techyor',
      url: BASE_URL,
      logo: `${BASE_URL}/techyor.png`
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '[data-speakable]']
    }
  });
}

/**
 * ContactPage schema — surfaces ContactPoint info to crawlers and
 * voice assistants. Layered on top of /contact's existing Organization.
 */
export function generateContactPageSchema(input: {
  url: string;
  description: string;
  imagePath?: string;
}) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Techyor',
    description: input.description,
    url: input.url,
    image: `${BASE_URL}${input.imagePath || '/og.png'}`,
    mainEntity: {
      '@type': 'Organization',
      name: 'Techyor',
      url: BASE_URL,
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'Sales',
          email: 'info@techyor.com',
          telephone: '+91 9915002625',
          areaServed: ['US', 'GB', 'AU', 'CH', 'IN'],
          availableLanguage: ['en']
        }
      ]
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '[data-speakable]']
    }
  });
}

/**
 * Region-targeted Service schema for /hire-developers/<location> pages.
 * Like generateHireRoleSchema but areaServed is locked to a specific
 * country and the Service description, audience, and offer catalog are
 * region-tailored.
 */
export function generateLocationServiceSchema(input: {
  countryName: string;
  countryCode: string;
  h1: string;
  description: string;
  url: string;
  imagePath?: string;
  pricingBands: { label: string; range: string; description: string }[];
  industries: { name: string; description: string }[];
  ratings?: number[];
  reviews?: Array<{ rating: number; body: string; author: string; date?: string }>;
}) {
  const ratings = input.ratings || [];
  const aggregateRating =
    ratings.length > 0
      ? {
          '@type': 'AggregateRating',
          ratingValue: (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1),
          reviewCount: ratings.length,
          bestRating: 5,
          worstRating: 1
        }
      : undefined;

  const review =
    input.reviews && input.reviews.length > 0
      ? input.reviews.map((r) => ({
          '@type': 'Review',
          reviewRating: {
            '@type': 'Rating',
            ratingValue: r.rating,
            bestRating: 5,
            worstRating: 1
          },
          author: { '@type': 'Person', name: r.author },
          reviewBody: r.body,
          datePublished: r.date
        }))
      : undefined;

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: input.h1,
    description: input.description,
    url: input.url,
    image: `${BASE_URL}${input.imagePath || '/og.png'}`,
    serviceType: `Senior developer hiring for ${input.countryName} companies`,
    category: 'Software development services',
    provider: {
      '@type': 'Organization',
      name: 'Techyor',
      url: BASE_URL,
      logo: `${BASE_URL}/techyor.png`,
      sameAs: ['https://twitter.com/TechyorDotCo', 'https://www.linkedin.com/company/techyor']
    },
    areaServed:
      input.countryCode === 'EU'
        ? [{ '@type': 'Place', name: 'Europe' }]
        : [{ '@type': 'Country', name: input.countryName }],
    audience: {
      '@type': 'BusinessAudience',
      audienceType: `Startups, scale-ups, and product teams based in ${input.countryName}`
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      priceRange: '$$$',
      availability: 'https://schema.org/InStock',
      offeredBy: { '@type': 'Organization', name: 'Techyor' }
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${input.countryName} engagement bands`,
      itemListElement: input.pricingBands.map((b, i) => ({
        '@type': 'Offer',
        position: i + 1,
        priceCurrency: 'USD',
        priceSpecification: {
          '@type': 'PriceSpecification',
          priceCurrency: 'USD',
          price: b.range
        },
        itemOffered: {
          '@type': 'Service',
          name: b.label,
          description: b.description
        }
      }))
    },
    knowsAbout: input.industries.map((i) => i.name),
    aggregateRating,
    review,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': input.url,
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['h1', '[data-speakable]']
      }
    }
  });
}

/**
 * Blog index schema — Blog entity with publisher and main entity list.
 */
export function generateBlogIndexSchema(input: {
  url: string;
  description: string;
  imagePath?: string;
  posts?: Array<{ title: string; url: string; datePublished?: string }>;
}) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Techyor Blog',
    description: input.description,
    url: input.url,
    image: `${BASE_URL}${input.imagePath || '/og.png'}`,
    publisher: {
      '@type': 'Organization',
      name: 'Techyor',
      url: BASE_URL,
      logo: { '@type': 'ImageObject', url: `${BASE_URL}/techyor.png` }
    },
    blogPost: (input.posts || []).slice(0, 10).map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      url: p.url.startsWith('http') ? p.url : `${BASE_URL}${p.url}`,
      datePublished: p.datePublished
    })),
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '[data-speakable]']
    }
  });
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.url}`
    }))
  });
}

export function generateServiceSchema(name: string, description: string, image?: string) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    image: image ? `${BASE_URL}${image}` : undefined,
    provider: {
      '@type': 'Organization',
      name: 'Techyor'
    }
  });
}

export function generateJobPostingSchema(
  title: string,
  description: string,
  jobLocation: string = 'Chandigarh, India'
) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title,
    description,
    datePosted: new Date().toISOString().split('T')[0],
    hiringOrganization: {
      '@type': 'Organization',
      name: 'Techyor',
      sameAs: BASE_URL
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: jobLocation,
        addressCountry: 'IN'
      }
    },
    employmentType: 'FULL_TIME'
  });
}

export function generateCreativeWorkSchema(
  title: string,
  description: string,
  image: string,
  datePublished: string,
  author: string = 'Techyor'
) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: title,
    description,
    image: `${BASE_URL}${image}`,
    datePublished,
    author: {
      '@type': 'Organization',
      name: author
    }
  });
}

export function generateProjectSchema(
  name: string,
  description: string,
  image: string,
  url: string,
  year: number,
  extra?: {
    services?: string[];
    deliverables?: string[];
    keywords?: string[];
    ratings?: number[];
    reviews?: Array<{
      rating: number;
      body: string;
      author: string;
      date?: string;
    }>;
  }
) {
  const ratings = extra?.ratings || [];
  const aggregateRating =
    ratings.length > 0
      ? {
          '@type': 'AggregateRating',
          ratingValue: (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1),
          reviewCount: ratings.length,
          bestRating: 5,
          worstRating: 1
        }
      : undefined;

  const review =
    extra?.reviews && extra.reviews.length > 0
      ? extra.reviews.map((r) => ({
          '@type': 'Review',
          reviewRating: {
            '@type': 'Rating',
            ratingValue: r.rating,
            bestRating: 5,
            worstRating: 1
          },
          author: { '@type': 'Person', name: r.author },
          reviewBody: r.body,
          datePublished: r.date
        }))
      : undefined;

  const keywords = [
    ...(extra?.services || []),
    ...(extra?.deliverables || []),
    ...(extra?.keywords || [])
  ];

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name,
    description,
    image: `${BASE_URL}${image}`,
    url: `${BASE_URL}${url}`,
    datePublished: `${year}-01-01`,
    inLanguage: 'en',
    creator: {
      '@type': 'Organization',
      name: 'Techyor',
      url: BASE_URL,
      logo: `${BASE_URL}/techyor.png`
    },
    publisher: {
      '@type': 'Organization',
      name: 'Techyor',
      url: BASE_URL,
      logo: { '@type': 'ImageObject', url: `${BASE_URL}/techyor.png` }
    },
    keywords: keywords.length > 0 ? keywords.join(', ') : undefined,
    about: extra?.services?.map((s) => ({ '@type': 'Thing', name: s })),
    aggregateRating,
    review,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}${url}`,
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['h1', '[data-speakable]']
      }
    }
  });
}

/**
 * Rich schema for the /services overview page.
 * Treats Techyor's services as a top-level Service entity that has
 * many specialized sub-services in its OfferCatalog. Pairs with
 * AggregateRating + per-Review entries from featured testimonials.
 */
export function generateServicesPageSchema(input: {
  url: string;
  description: string;
  serviceCategories: { title: string; description: string; url?: string }[];
  ratings?: number[];
  reviews?: Array<{ rating: number; body: string; author: string; date?: string }>;
  imagePath?: string;
}) {
  const ratings = input.ratings || [];
  const aggregateRating =
    ratings.length > 0
      ? {
          '@type': 'AggregateRating',
          ratingValue: (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1),
          reviewCount: ratings.length,
          bestRating: 5,
          worstRating: 1
        }
      : undefined;

  const review =
    input.reviews && input.reviews.length > 0
      ? input.reviews.map((r) => ({
          '@type': 'Review',
          reviewRating: {
            '@type': 'Rating',
            ratingValue: r.rating,
            bestRating: 5,
            worstRating: 1
          },
          author: { '@type': 'Person', name: r.author },
          reviewBody: r.body,
          datePublished: r.date
        }))
      : undefined;

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Techyor — Digital Product Studio Services',
    description: input.description,
    url: input.url,
    image: `${BASE_URL}${input.imagePath || '/og.png'}`,
    serviceType: 'Digital product strategy, design, and development',
    category: 'Software development services',
    provider: {
      '@type': 'Organization',
      name: 'Techyor',
      url: BASE_URL,
      logo: `${BASE_URL}/techyor.png`,
      sameAs: ['https://twitter.com/TechyorDotCo', 'https://www.linkedin.com/company/techyor']
    },
    areaServed: [
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Country', name: 'United Kingdom' },
      { '@type': 'Country', name: 'Australia' },
      { '@type': 'Country', name: 'Switzerland' },
      { '@type': 'Place', name: 'Worldwide' }
    ],
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'Startups, scale-ups, and product teams'
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      priceRange: '$$$',
      availability: 'https://schema.org/InStock',
      offeredBy: { '@type': 'Organization', name: 'Techyor' }
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Techyor service categories',
      itemListElement: input.serviceCategories.map((s, i) => ({
        '@type': 'Offer',
        position: i + 1,
        itemOffered: {
          '@type': 'Service',
          name: s.title,
          description: s.description,
          url: s.url ? `${BASE_URL}${s.url}` : undefined
        }
      }))
    },
    aggregateRating,
    review,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': input.url,
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['h1', '[data-speakable]']
      }
    }
  });
}

/**
 * CollectionPage schema for /projects/<service-slug> filter pages —
 * the implicit "items in this collection" entity. Includes
 * AggregateRating + Review when testimonials exist for the filter.
 */
export function generateCollectionPageSchema(input: {
  name: string;
  description: string;
  url: string;
  numberOfItems: number;
  itemUrls: string[];
  ratings?: number[];
  reviews?: Array<{ rating: number; body: string; author: string; date?: string }>;
  imagePath?: string;
}) {
  const ratings = input.ratings || [];
  const aggregateRating =
    ratings.length > 0
      ? {
          '@type': 'AggregateRating',
          ratingValue: (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1),
          reviewCount: ratings.length,
          bestRating: 5,
          worstRating: 1
        }
      : undefined;

  const review =
    input.reviews && input.reviews.length > 0
      ? input.reviews.map((r) => ({
          '@type': 'Review',
          reviewRating: {
            '@type': 'Rating',
            ratingValue: r.rating,
            bestRating: 5,
            worstRating: 1
          },
          author: { '@type': 'Person', name: r.author },
          reviewBody: r.body,
          datePublished: r.date
        }))
      : undefined;

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: input.name,
    description: input.description,
    url: input.url,
    image: `${BASE_URL}${input.imagePath || '/og.png'}`,
    publisher: {
      '@type': 'Organization',
      name: 'Techyor',
      url: BASE_URL,
      logo: `${BASE_URL}/techyor.png`
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: input.numberOfItems,
      itemListElement: input.itemUrls.slice(0, 20).map((url, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: url.startsWith('http') ? url : `${BASE_URL}${url}`
      }))
    },
    aggregateRating,
    review,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '[data-speakable]']
    }
  });
}

export function generateArticleSchema(article: {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
}) {
  const imageUrl = article.image
    ? article.image.startsWith('http')
      ? article.image
      : `${BASE_URL}${article.image}`
    : `${BASE_URL}/og.png`;

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.description,
    image: imageUrl,
    url: `${BASE_URL}${article.url}`,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      '@type': article.authorName ? 'Person' : 'Organization',
      name: article.authorName || 'Techyor'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Techyor',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/techyor.png`
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}${article.url}`
    }
  });
}

export function generateWebsiteSchema() {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Techyor',
    url: BASE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/blog?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  });
}

export function generatePersonSchema(person: {
  name: string;
  jobTitle: string;
  description: string;
  image: string;
  url: string;
  sameAs?: string[];
  knowsAbout?: string[];
  alumniOf?: string;
  worksFor?: string;
  addressLocality?: string;
  addressCountry?: string;
}) {
  const imageUrl = person.image.startsWith('http')
    ? person.image
    : `${BASE_URL}${person.image}`;

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
    jobTitle: person.jobTitle,
    description: person.description,
    image: imageUrl,
    url: `${BASE_URL}${person.url}`,
    sameAs: person.sameAs,
    knowsAbout: person.knowsAbout,
    alumniOf: person.alumniOf
      ? { '@type': 'CollegeOrUniversity', name: person.alumniOf }
      : undefined,
    worksFor: {
      '@type': 'Organization',
      name: person.worksFor || 'Techyor',
      url: BASE_URL
    },
    address: person.addressLocality
      ? {
          '@type': 'PostalAddress',
          addressLocality: person.addressLocality,
          addressCountry: person.addressCountry || 'IN'
        }
      : undefined
  });
}

export function generateProfessionalReviewSchema(reviews: {
  itemName: string;
  itemUrl: string;
  itemImage: string;
  reviews: Array<{
    rating: number;
    body: string;
    author: string;
    date?: string;
  }>;
}) {
  const ratings = reviews.reviews.map((r) => r.rating);
  const avg = ratings.reduce((a, b) => a + b, 0) / ratings.length;
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: reviews.itemName,
    image: `${BASE_URL}${reviews.itemImage}`,
    url: `${BASE_URL}${reviews.itemUrl}`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: avg.toFixed(1),
      reviewCount: reviews.reviews.length,
      bestRating: 5,
      worstRating: 1
    },
    review: reviews.reviews.map((r) => ({
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: r.rating,
        bestRating: 5
      },
      author: { '@type': 'Person', name: r.author },
      reviewBody: r.body,
      datePublished: r.date
    }))
  });
}

/**
 * Rich Service schema for /hire/<role> pages. Combines Service +
 * AggregateRating + Offers (engagement models) + per-Review entries
 * so the page is eligible for Google rich results and surfaces
 * price/audience/area-served signals to crawlers.
 */
export function generateHireRoleSchema(input: {
  roleTitle: string;
  h1: string;
  description: string;
  url: string;
  serviceType: string;
  techStack: string[];
  engagementModels: { title: string; description: string }[];
  ratings?: number[];
  reviews?: Array<{
    rating: number;
    body: string;
    author: string;
    date?: string;
  }>;
  imagePath?: string;
}) {
  const ratings = input.ratings || [];
  const aggregateRating =
    ratings.length > 0
      ? {
          '@type': 'AggregateRating',
          ratingValue: (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1),
          reviewCount: ratings.length,
          bestRating: 5,
          worstRating: 1
        }
      : undefined;

  const review =
    input.reviews && input.reviews.length > 0
      ? input.reviews.map((r) => ({
          '@type': 'Review',
          reviewRating: {
            '@type': 'Rating',
            ratingValue: r.rating,
            bestRating: 5,
            worstRating: 1
          },
          author: { '@type': 'Person', name: r.author },
          reviewBody: r.body,
          datePublished: r.date
        }))
      : undefined;

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: input.h1,
    alternateName: `Hire ${input.roleTitle}`,
    description: input.description,
    url: input.url,
    image: `${BASE_URL}${input.imagePath || '/og.png'}`,
    serviceType: input.serviceType,
    category: 'Software development services',
    keywords: input.techStack.join(', '),
    provider: {
      '@type': 'Organization',
      name: 'Techyor',
      url: BASE_URL,
      logo: `${BASE_URL}/techyor.png`,
      sameAs: ['https://twitter.com/TechyorDotCo', 'https://www.linkedin.com/company/techyor']
    },
    areaServed: [
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Country', name: 'United Kingdom' },
      { '@type': 'Country', name: 'Australia' },
      { '@type': 'Country', name: 'Switzerland' },
      { '@type': 'Place', name: 'Worldwide' }
    ],
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'Startups, scale-ups, and product teams hiring senior developers'
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      priceRange: '$$$',
      availability: 'https://schema.org/InStock',
      offeredBy: { '@type': 'Organization', name: 'Techyor' }
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${input.roleTitle} engagement models`,
      itemListElement: input.engagementModels.map((m, i) => ({
        '@type': 'Offer',
        position: i + 1,
        itemOffered: {
          '@type': 'Service',
          name: m.title,
          description: m.description
        }
      }))
    },
    aggregateRating,
    review,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': input.url,
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['h1', '[data-speakable]']
      }
    }
  });
}

/**
 * HowTo schema — used to describe a step-by-step engagement process.
 * Eligible for Google "HowTo" rich-result style on supported queries.
 */
export function generateHowToSchema(input: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
  totalTime?: string; // ISO 8601 duration, e.g. PT5D for 5 days
}) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: input.name,
    description: input.description,
    totalTime: input.totalTime,
    step: input.steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text
    }))
  });
}

/**
 * ItemList of Person entities — used to mark up team-member sections.
 * Each member also includes worksFor → Organization for entity linkage.
 */
export function generateTeamMembersSchema(
  members: Array<{
    name: string;
    jobTitle: string;
    description: string;
    image: string;
    url: string;
    sameAs?: string[];
  }>
) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Techyor team',
    itemListElement: members.map((m, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Person',
        name: m.name,
        jobTitle: m.jobTitle,
        description: m.description,
        image: m.image.startsWith('http') ? m.image : `${BASE_URL}${m.image}`,
        url: m.url.startsWith('http') ? m.url : `${BASE_URL}${m.url}`,
        sameAs: m.sameAs,
        worksFor: {
          '@type': 'Organization',
          name: 'Techyor',
          url: BASE_URL
        }
      }
    }))
  });
}

export function generateFAQSchema(
  faqs: Array<{
    question: string;
    answer: string;
  }>
) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  });
}
