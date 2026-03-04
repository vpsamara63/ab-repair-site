import { SITE_CONFIG } from "@/lib/utils";
import type { Appliance } from "@/lib/data/appliances";
import type { Brand } from "@/lib/data/brands";
import type { City } from "@/lib/data/cities";

const baseUrl = SITE_CONFIG.siteUrl;

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${baseUrl}/#business`,
    name: SITE_CONFIG.name,
    legalName: SITE_CONFIG.legalName,
    description: SITE_CONFIG.description,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    url: baseUrl,
    image: `${baseUrl}/logo.webp`,
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE_CONFIG.address.city,
      addressRegion: SITE_CONFIG.address.state,
      postalCode: SITE_CONFIG.address.zip,
      addressCountry: SITE_CONFIG.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 40.6687,
      longitude: -74.1143,
    },
    areaServed: [
      { "@type": "State", name: "New Jersey" },
      { "@type": "AdministrativeArea", name: "Hudson County, NJ" },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: SITE_CONFIG.googleRating,
      reviewCount: SITE_CONFIG.googleReviewCount,
      bestRating: 5,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "11:00",
        closes: "15:00",
      },
    ],
    priceRange: "$$",
    sameAs: [],
  };
}

export function getServiceSchema(appliance: Appliance, city?: City) {
  const location = city
    ? `${city.name}, ${city.state}`
    : "Bayonne, NJ";

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${appliance.name} in ${location}`,
    description: appliance.description,
    provider: {
      "@type": "LocalBusiness",
      "@id": `${baseUrl}/#business`,
      name: SITE_CONFIG.name,
    },
    areaServed: {
      "@type": "City",
      name: city?.name ?? "Bayonne",
      containedInPlace: {
        "@type": "State",
        name: city?.state ?? "NJ",
      },
    },
    serviceType: appliance.name,
  };
}

export function getBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`,
    })),
  };
}

export function getFAQSchema(
  faqs: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
