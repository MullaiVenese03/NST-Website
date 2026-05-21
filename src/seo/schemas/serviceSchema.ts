import { ORG_NAME, SITE_ORIGIN } from "../seoConfig";

const LOCAL_BUSINESS_ID = `${SITE_ORIGIN}/#localbusiness`;

export type ServiceSchemaInput = {
  serviceType: string;
  name?: string;
  description?: string;
  url?: string;
};

export function serviceSchema(input: ServiceSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name ?? input.serviceType,
    serviceType: input.serviceType,
    description: input.description,
    url: input.url,
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
  };
}
