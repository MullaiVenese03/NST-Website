import { COMPANY_ICON } from "../brandAssets";
import {
  BUSINESS_DESCRIPTION,
  BUSINESS_NAP,
  COMPANY_KNOWS_ABOUT,
  ORG_NAME,
  SITE_ORIGIN,
  SOCIAL_PROFILES,
  napPostalAddress,
} from "../seoConfig";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_ORIGIN}/#organization`,
    name: ORG_NAME,
    url: SITE_ORIGIN,
    logo: COMPANY_ICON.webUrl,
    image: COMPANY_ICON.webUrl,
    sameAs: [...SOCIAL_PROFILES],
    description: BUSINESS_DESCRIPTION,
    telephone: BUSINESS_NAP.telephone,
    email: BUSINESS_NAP.email,
    knowsAbout: [...COMPANY_KNOWS_ABOUT],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: BUSINESS_NAP.telephone,
      email: BUSINESS_NAP.email,
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["English", "Tamil"],
    },
    founder: {
      "@type": "Person",
      name: "Mullai",
    },
    address: napPostalAddress(),
  };
}

