import {
  BUSINESS_DESCRIPTION,
  BUSINESS_NAP,
  ORG_NAME,
  SITE_ORIGIN,
  SOCIAL_PROFILES,
  defaultOgImageUrl,
  napPostalAddress,
} from "../seoConfig";

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_ORIGIN}/#localbusiness`,
    name: BUSINESS_NAP.name,
    url: SITE_ORIGIN,
    image: defaultOgImageUrl(),
    logo: `${SITE_ORIGIN}/og-image.webp`,
    description: BUSINESS_DESCRIPTION,
    telephone: BUSINESS_NAP.telephone,
    email: BUSINESS_NAP.email,
    address: napPostalAddress(),
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    priceRange: "$$",
    sameAs: [...SOCIAL_PROFILES],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: BUSINESS_NAP.telephone,
      email: BUSINESS_NAP.email,
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["English", "Tamil"],
    },
  };
}
