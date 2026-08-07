import { COMPANY_ICON } from "../brandAssets";
import {
  BUSINESS_DESCRIPTION,
  BUSINESS_NAP,
  COMPANY_KNOWS_ABOUT,
  GEO_LOCATION,
  ORG_NAME,
  SITE_ORIGIN,
  SOCIAL_PROFILES,
  napPostalAddress,
} from "../seoConfig";

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_ORIGIN}/#localbusiness`,
    name: BUSINESS_NAP.name,
    url: SITE_ORIGIN,
    image: COMPANY_ICON.webUrl,
    logo: COMPANY_ICON.webUrl,
    description: BUSINESS_DESCRIPTION,
    telephone: BUSINESS_NAP.telephone,
    email: BUSINESS_NAP.email,
    address: napPostalAddress(),
    geo: {
      "@type": "GeoCoordinates",
      latitude: GEO_LOCATION.latitude,
      longitude: GEO_LOCATION.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    knowsAbout: [...COMPANY_KNOWS_ABOUT],
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

