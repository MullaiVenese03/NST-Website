

export const SITE_ORIGIN = "https://www.nebulasafetech.com";

export const ORG_NAME = "NebulaSafeTech";

export const TWITTER_HANDLE = "@nebulasafetech";

export const BUSINESS_IDENTITY =
  "NebulaSafeTech is a cybersecurity and digital solutions company based in Hosur, Tamil Nadu, India.";

export const BUSINESS_DESCRIPTION =
  "NebulaSafeTech is a cybersecurity and digital solutions company providing VAPT, secure web development, UI/UX design, and EdTech training services for startups, enterprises, and academic partners worldwide.";

const DEFAULT_OG_IMAGE_PATH = "/og-image.webp";

export function absoluteUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_ORIGIN}${p}`;
}

export function defaultOgImageUrl(): string {
  return absoluteUrl(DEFAULT_OG_IMAGE_PATH);
}

export const SOCIAL_PROFILES = [
  "https://linkedin.com/company/nebulasafetech-nst/",
  "https://instagram.com/nebulasafetech",
  "https://twitter.com/nebulasafetech",
  "https://www.youtube.com/@NebulaSafeTech",
] as const;

/** Geographic location coordinates for Hosur, Tamil Nadu, India */
export const GEO_LOCATION = {
  region: "IN-TN",
  placename: "Hosur, Tamil Nadu, India",
  position: "12.7409;77.8253",
  latitude: 12.7409,
  longitude: 77.8253,
} as const;

export const COMPANY_KNOWS_ABOUT = [
  "Cybersecurity Services",
  "Vulnerability Assessment and Penetration Testing (VAPT)",
  "Web Application Security",
  "Cloud Infrastructure Security",
  "Full-Stack Web Development",
  "React & Node.js Application Engineering",
  "UI/UX Product Design",
  "EdTech Cybersecurity Training",
  "DevSecOps Pipelines",
] as const;

/** Single source of truth for NAP (Name, Address, Phone) - footer, schema, GBP alignment. */
export const BUSINESS_NAP = {
  name: ORG_NAME,
  telephone: "+91 63810 13086",
  telephoneE164: "+916381013086",
  email: "info@nebulasafetech.com",
  streetAddress: "",
  addressLocality: "Hosur",
  addressRegion: "Tamil Nadu",
  postalCode: "",
  addressCountry: "IN",
  formattedAddress: "Hosur, Tamil Nadu, India.",
  mapsQuery: "Hosur,Tamil+Nadu,India",
} as const;

export function napPostalAddress() {
  return {
    "@type": "PostalAddress" as const,
    ...(BUSINESS_NAP.streetAddress ? { streetAddress: BUSINESS_NAP.streetAddress } : {}),
    addressLocality: BUSINESS_NAP.addressLocality,
    addressRegion: BUSINESS_NAP.addressRegion,
    ...(BUSINESS_NAP.postalCode ? { postalCode: BUSINESS_NAP.postalCode } : {}),
    addressCountry: BUSINESS_NAP.addressCountry,
  };
}

