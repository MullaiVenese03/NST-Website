import { ORG_NAME, SITE_ORIGIN } from "../seoConfig";

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: ORG_NAME,
    url: SITE_ORIGIN,
    publisher: {
      "@type": "Organization",
      name: ORG_NAME,
    },
  };
}
