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
