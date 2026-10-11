import { organizationSchema } from "./schemas/organizationSchema";
import { localBusinessSchema } from "./schemas/localBusinessSchema";
import { websiteSchema } from "./schemas/websiteSchema";
import { webPageSchema } from "./schemas/webPageSchema";
import { serviceSchema } from "./schemas/serviceSchema";
import { faqPageSchema, breadcrumbListSchema } from "./schemas/faqSchema";
import { blogPostingSchema } from "./schemas/blogSchema";
import { toJsonLdScript } from "./structuredData";
import {
  HOME_SEO,
  ABOUT_SEO,
  SERVICES_SEO,
  CLIENTS_SEO,
  EDTECH_SEO,
  BLOGS_SEO,
  PRIVACY_SEO,
  TERMS_SEO,
  getServiceDetailSeo,
  SERVICES_FAQ_ITEMS,
  serviceFaqForSlug,
  type ServiceSlug,
} from "./pageMeta";
import { PAGE_BREADCRUMBS } from "../app/utils/pageBreadcrumbs";
import { SITE_ORIGIN, ORG_NAME, defaultOgImageUrl } from "./seoConfig";
import type { BlogPost } from "../app/data/blogsData";

export function getGlobalSchemaJson(): string {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [organizationSchema(), localBusinessSchema(), websiteSchema()],
  };
  return toJsonLdScript(graph);
}

export function getPageSchemaJson(routePath: string, post?: BlogPost): string {
  if (routePath === "/") {
    const pageSchema = webPageSchema({
      url: `${SITE_ORIGIN}/`,
      name: HOME_SEO.title,
      description: HOME_SEO.description,
    });
    const breadcrumb = breadcrumbListSchema([{ name: "Home", path: "/" }], SITE_ORIGIN);
    return toJsonLdScript([pageSchema, breadcrumb]);
  }

  if (routePath === "/about") {
    const pageSchema = webPageSchema({
      url: `${SITE_ORIGIN}/about`,
      name: ABOUT_SEO.title,
      description: ABOUT_SEO.description,
    });
    const breadcrumb = breadcrumbListSchema([...PAGE_BREADCRUMBS.about], SITE_ORIGIN);
    return toJsonLdScript([pageSchema, breadcrumb]);
  }

  if (routePath === "/services") {
    const pageSchema = webPageSchema({
      url: `${SITE_ORIGIN}/services`,
      name: SERVICES_SEO.title,
      description: SERVICES_SEO.description,
    });
    const faqJson = faqPageSchema([...SERVICES_FAQ_ITEMS]);
    const serviceIndex = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "NebulaSafeTech service areas",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Cybersecurity", item: `${SITE_ORIGIN}/services/cybersecurity` },
        { "@type": "ListItem", position: 2, name: "Web development", item: `${SITE_ORIGIN}/services/web-development` },
        { "@type": "ListItem", position: 3, name: "UI/UX design", item: `${SITE_ORIGIN}/services/ui-ux-design` },
        { "@type": "ListItem", position: 4, name: "EdTech & training", item: `${SITE_ORIGIN}/services/edtech-training` },
      ],
    };
    const breadcrumb = breadcrumbListSchema([...PAGE_BREADCRUMBS.services], SITE_ORIGIN);
    return toJsonLdScript([pageSchema, faqJson, serviceIndex, breadcrumb]);
  }

  if (routePath.startsWith("/services/")) {
    const slug = routePath.replace("/services/", "") as ServiceSlug;
    const meta = getServiceDetailSeo(slug);
    if (!meta) return "";
    const pageSchema = webPageSchema({
      url: `${SITE_ORIGIN}${meta.canonicalPath}`,
      name: meta.title,
      description: meta.description,
    });
    const faqItems = [...serviceFaqForSlug(slug)];
    const sSchema = serviceSchema({
      serviceType: meta.serviceType,
      name: meta.title.split("|")[0]?.trim() ?? meta.serviceType,
      description: meta.description,
      url: `${SITE_ORIGIN}${meta.canonicalPath}`,
    });
    const faq = faqPageSchema(faqItems);
    const breadcrumb = breadcrumbListSchema(
      [
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
        { name: meta.serviceType, path: meta.canonicalPath },
      ],
      SITE_ORIGIN
    );
    return toJsonLdScript([pageSchema, sSchema, faq, breadcrumb]);
  }

  if (routePath === "/clients") {
    const pageSchema = webPageSchema({
      url: `${SITE_ORIGIN}/clients`,
      name: CLIENTS_SEO.title,
      description: CLIENTS_SEO.description,
    });
    const breadcrumb = breadcrumbListSchema([...PAGE_BREADCRUMBS.testimonials], SITE_ORIGIN);
    return toJsonLdScript([pageSchema, breadcrumb]);
  }

  if (routePath === "/edtech") {
    const pageSchema = webPageSchema({
      url: `${SITE_ORIGIN}/edtech`,
      name: EDTECH_SEO.title,
      description: EDTECH_SEO.description,
    });
    const breadcrumb = breadcrumbListSchema([...PAGE_BREADCRUMBS.edtech], SITE_ORIGIN);
    return toJsonLdScript([pageSchema, breadcrumb]);
  }

  if (routePath === "/blogs" || routePath === "/blog") {
    const pageSchema = webPageSchema({
      url: `${SITE_ORIGIN}/blogs`,
      name: BLOGS_SEO.title,
      description: BLOGS_SEO.description,
    });
    const breadcrumb = breadcrumbListSchema([...PAGE_BREADCRUMBS.blogs], SITE_ORIGIN);
    return toJsonLdScript([pageSchema, breadcrumb]);
  }

  if (routePath === "/privacy-policy") {
    const pageSchema = webPageSchema({
      url: `${SITE_ORIGIN}/privacy-policy`,
      name: PRIVACY_SEO.title,
      description: PRIVACY_SEO.description,
    });
    const breadcrumb = breadcrumbListSchema([...PAGE_BREADCRUMBS.privacyPolicy], SITE_ORIGIN);
    return toJsonLdScript([pageSchema, breadcrumb]);
  }

  if (routePath === "/terms-and-conditions") {
    const pageSchema = webPageSchema({
      url: `${SITE_ORIGIN}/terms-and-conditions`,
      name: TERMS_SEO.title,
      description: TERMS_SEO.description,
    });
    const breadcrumb = breadcrumbListSchema([...PAGE_BREADCRUMBS.termsAndConditions], SITE_ORIGIN);
    return toJsonLdScript([pageSchema, breadcrumb]);
  }

  if (post) {
    const articleCanonicalPath = `/blog/${post.slug}`;
    const pageSchema = webPageSchema({
      url: `${SITE_ORIGIN}${articleCanonicalPath}`,
      name: `${post.seoTitle || post.title} | ${ORG_NAME}`,
      description: post.metaDescription,
    });
    const blogPosting = blogPostingSchema({
      title: post.title,
      headline: post.seoTitle || post.title,
      description: post.metaDescription,
      url: `${SITE_ORIGIN}${articleCanonicalPath}`,
      image: post.featuredImage ? `${SITE_ORIGIN}${post.featuredImage.src}` : defaultOgImageUrl(),
      datePublished: post.publishedIsoDate,
      dateModified: post.updatedIsoDate || post.publishedIsoDate,
      author: {
        name: post.author.name,
        role: post.author.role,
        url: post.author.profileUrl,
      },
    });
    const breadcrumb = breadcrumbListSchema(
      [
        { name: "Home", path: "/" },
        { name: "Blogs", path: "/blogs" },
        { name: post.title, path: articleCanonicalPath },
      ],
      SITE_ORIGIN
    );
    const faqs = post.faqs && post.faqs.length > 0 ? [faqPageSchema(post.faqs)] : [];
    return toJsonLdScript([pageSchema, blogPosting, breadcrumb, ...faqs]);
  }

  return "";
}
