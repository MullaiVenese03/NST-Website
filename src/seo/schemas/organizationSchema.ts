import { ORG_NAME, SITE_ORIGIN, BUSINESS_DESCRIPTION, SOCIAL_PROFILES, defaultOgImageUrl } from "../seoConfig";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: ORG_NAME,
    url: SITE_ORIGIN,
    logo: `${SITE_ORIGIN}/og-image.png`,
    image: defaultOgImageUrl(),
    sameAs: [...SOCIAL_PROFILES],
    description: BUSINESS_DESCRIPTION,
    founder: {
      "@type": "Person",
      name: "Mullai",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hosur",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
  };
}
