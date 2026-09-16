import { SITE_ORIGIN, ORG_NAME } from "../seoConfig";

export type WebPageSchemaParams = {
  url: string;
  name: string;
  description: string;
};

export function webPageSchema({ url, name, description }: WebPageSchemaParams) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE_ORIGIN}/#website`,
    },
    about: {
      "@type": "Organization",
      "@id": `${SITE_ORIGIN}/#organization`,
      name: ORG_NAME,
    },
  };
}
