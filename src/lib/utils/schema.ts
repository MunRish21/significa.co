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
  year: number
) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name,
    description,
    image: `${BASE_URL}${image}`,
    url: `${BASE_URL}${url}`,
    datePublished: `${year}-01-01`,
    creator: {
      '@type': 'Organization',
      name: 'Techyor'
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
 * AggregateRating + Offers (engagement models) so the page is eligible
 * for Google rich results and surfaces price/audience/area-served
 * signals to crawlers.
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
