import { ORG_NAME, SITE_ORIGIN } from "../seoConfig";

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_ORIGIN}/#website`,
    name: ORG_NAME,
    url: SITE_ORIGIN,
    inLanguage: "en-IN",
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_ORIGIN}/#organization`,
      name: ORG_NAME,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_ORIGIN}/blogs?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

