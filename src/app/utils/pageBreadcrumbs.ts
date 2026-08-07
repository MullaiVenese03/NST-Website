import type { BreadcrumbItem } from "../components/Breadcrumbs";
import { breadcrumbListSchema } from "../../seo/schemas/faqSchema";
import { SITE_ORIGIN } from "../../seo/seoConfig";

export const PAGE_BREADCRUMBS = {
  about: [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ],
  services: [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
  ],
  testimonials: [
    { name: "Home", path: "/" },
    { name: "Testimonials", path: "/clients" },
  ],
  edtech: [
    { name: "Home", path: "/" },
    { name: "EdTech", path: "/edtech" },
  ],
  blogs: [
    { name: "Home", path: "/" },
    { name: "Blogs", path: "/blogs" },
  ],
  privacyPolicy: [
    { name: "Home", path: "/" },
    { name: "Privacy Policy", path: "/privacy-policy" },
  ],
  termsAndConditions: [
    { name: "Home", path: "/" },
    { name: "Terms & Conditions", path: "/terms-and-conditions" },
  ],
} as const satisfies Record<string, readonly BreadcrumbItem[]>;


export function pageBreadcrumbJsonLd(items: readonly BreadcrumbItem[]) {
  return breadcrumbListSchema([...items], SITE_ORIGIN);
}
