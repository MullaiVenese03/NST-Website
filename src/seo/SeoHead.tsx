import { Helmet } from "react-helmet-async";
import type { PageSeo } from "./pageMeta";
import { GSC_VERIFICATION } from "../analytics/analyticsConfig";
import { absoluteUrl, defaultOgImageUrl, GEO_LOCATION, ORG_NAME, TWITTER_HANDLE } from "./seoConfig";

const OG_IMAGE_WIDTH = 1200;
const OG_IMAGE_HEIGHT = 630;
import { canonicalUrlFromPathname } from "./canonicalUrls";
import { toJsonLdScript } from "./structuredData";

export type SeoHeadProps = {
  meta: PageSeo;
  ogImage?: string;
  noindex?: boolean;
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
      <html lang="en-IN" />
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      {kw ? <meta name="keywords" content={kw} /> : null}
      <meta name="robots" content={robots} />
      {GSC_VERIFICATION ? <meta name="google-site-verification" content={GSC_VERIFICATION} /> : null}
      <link rel="canonical" href={canonical} />

      {/* Geo Location Tags */}
      <meta name="geo.region" content={GEO_LOCATION.region} />
      <meta name="geo.placename" content={GEO_LOCATION.placename} />
      <meta name="geo.position" content={GEO_LOCATION.position} />
      <meta name="ICBM" content={GEO_LOCATION.position} />

      {/* Open Graph Tags */}
      <meta property="og:locale" content="en_IN" />
      <meta property="og:site_name" content={ORG_NAME} />
      <meta property="og:type" content={meta.ogType ?? "website"} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:secure_url" content={imageUrl} />
      <meta property="og:image:width" content={String(OG_IMAGE_WIDTH)} />
      <meta property="og:image:height" content={String(OG_IMAGE_HEIGHT)} />
      <meta property="og:image:alt" content={`${ORG_NAME} - preview image`} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:creator" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={imageUrl} />

      {scripts}
    </Helmet>
  );
}

