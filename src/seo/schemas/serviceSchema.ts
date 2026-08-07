import { ORG_NAME, SITE_ORIGIN } from "../seoConfig";

const LOCAL_BUSINESS_ID = `${SITE_ORIGIN}/#localbusiness`;

export type ServiceSchemaInput = {
  serviceType: string;
  name?: string;
  description?: string;
  url?: string;
  category?: string;
};

export function serviceSchema(input: ServiceSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name ?? input.serviceType,
    serviceType: input.serviceType,
    description: input.description,
    url: input.url,
    category: input.category ?? "Cybersecurity & Technology Services",
    provider: {
      "@type": "ProfessionalService",
      "@id": LOCAL_BUSINESS_ID,
      name: ORG_NAME,
      url: SITE_ORIGIN,
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "NebulaSafeTech Core Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Vulnerability Assessment and Penetration Testing (VAPT)",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Full-Stack Web Application Development",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "UI/UX Product Design Systems",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "EdTech & Institutional Cybersecurity Training",
          },
        },
      ],
    },
  };
}

