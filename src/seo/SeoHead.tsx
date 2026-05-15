import { Helmet } from "react-helmet-async";
import type { PageSeo } from "./pageMeta";
import { absoluteUrl, defaultOgImageUrl, ORG_NAME } from "./seoConfig";
import { canonicalUrlFromPathname } from "./canonicalUrls";
import { toJsonLdScript } from "./structuredData";

export type SeoHeadProps = {
  meta: PageSeo;
  /** Absolute or root-relative OG image; defaults to /og-image.png on this origin. */
  ogImage?: string;
  noindex?: boolean;
  /** Extra JSON-LD objects (FAQ, Service, BreadcrumbList, etc.) */
  structuredData?: object | object[];
};

export function SeoHead({ meta, ogImage, noindex, structuredData }: SeoHeadProps) {
  const canonical = canonicalUrlFromPathname(meta.canonicalPath);
  const imageUrl = ogImage?.startsWith("http") ? ogImage : ogImage ? absoluteUrl(ogImage) : defaultOgImageUrl();
  const kw = meta.keywords.join(", ");
  const robots = noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  const scripts =
    structuredData !== undefined ? (
      <script type="application/ld+json">{toJsonLdScript(structuredData)}</script>
    ) : null;

  return (
    <Helmet prioritizeSeoTags>
      <html lang="en" />
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      {kw ? <meta name="keywords" content={kw} /> : null}
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonical} />

      <meta property="og:locale" content="en_IN" />
      <meta property="og:site_name" content={ORG_NAME} />
      <meta property="og:type" content={meta.ogType ?? "website"} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={`${ORG_NAME} - preview image`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={imageUrl} />

      {scripts}
    </Helmet>
  );
}
