import { COMPANY_ICON } from "../brandAssets";
import { ORG_NAME, SITE_ORIGIN } from "../seoConfig";

export type BlogSchemaParams = {
  title: string;
  headline?: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author: {
    name: string;
    role?: string;
    url?: string;
  };
  publisherName?: string;
  publisherLogo?: string;
};

export function blogPostingSchema({
  title,
  headline,
  description,
  url,
  image,
  datePublished,
  dateModified,
  author,
  publisherName = ORG_NAME,
  publisherLogo = COMPANY_ICON.webUrl,
}: BlogSchemaParams) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    isPartOf: {
      "@type": "WebPage",
      "@id": url,
    },
    headline: headline || title,
    description,
    url,
    ...(image ? { image: [image] } : {}),
    datePublished,
    dateModified: dateModified || datePublished,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    author: {
      "@type": "Person",
      name: author.name,
      ...(author.role ? { jobTitle: author.role } : {}),
      ...(author.url ? { url: author.url } : {}),
      worksFor: {
        "@type": "Organization",
        name: ORG_NAME,
        url: SITE_ORIGIN,
      },
    },
    publisher: {
      "@type": "Organization",
      name: publisherName,
      url: SITE_ORIGIN,
      logo: {
        "@type": "ImageObject",
        url: publisherLogo,
      },
    },
  };
}
