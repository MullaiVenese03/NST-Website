/** Single source of truth for public site origin (www matches existing index + robots). */
export const SITE_ORIGIN = "https://www.nebulasafetech.com";

export const ORG_NAME = "NebulaSafeTech";

/** Consistent entity statement for metadata, schema, and on-page copy. */
export const BUSINESS_IDENTITY =
  "NebulaSafeTech is a cybersecurity and digital solutions company based in India.";

export const BUSINESS_DESCRIPTION =
  "NebulaSafeTech is a cybersecurity and digital solutions company providing web development, UI/UX, SEO, and EdTech services for startups, enterprises, and academic partners.";

export const DEFAULT_OG_IMAGE_PATH = "/og-image.png";

export function absoluteUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_ORIGIN}${p}`;
}

export function defaultOgImageUrl(): string {
  return absoluteUrl(DEFAULT_OG_IMAGE_PATH);
}

export const SOCIAL_PROFILES = [
  "https://github.com/MullaiVenese03",
  "https://linkedin.com/company/nebulasafetech-nst/",
  "https://instagram.com/nebulasafetech",
  "https://twitter.com/nebulasafetech",
] as const;
