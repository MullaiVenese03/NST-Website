import { useEffect } from "react";
import { Link, useParams } from "react-router";
import TopNav from "../components/TopNav";
import FooterSection from "../components/FooterSection";
import ScrollToTop from "../components/ScrollToTop";
import { SeoHead } from "../../seo/SeoHead";
import { getServiceDetailSeo, serviceFaqForSlug, type PageSeo, type ServiceSlug } from "../../seo/pageMeta";
import { SITE_ORIGIN, ORG_NAME } from "../../seo/seoConfig";
import { serviceSchema } from "../../seo/schemas/serviceSchema";
import { faqPageSchema, breadcrumbListSchema } from "../../seo/schemas/faqSchema";
import { enableSmoothScroll, resetScrollBehavior, scrollToTopInstant } from "../utils/scroll";
import { ServicesFaqSection } from "../components/ServicesFaqSection";
import { getServiceDetailContent } from "../data/serviceDetailContent";
import {
  ServiceDetailHero,
  ServiceOfferingsSection,
  ServiceCapabilitiesSection,
  ServiceBenefitsSection,
  ServiceProcessSection,
  ServiceCtaSection,
  ServiceContactFormSection,
} from "../components/ServiceDetailSections";

const VALID: ServiceSlug[] = ["web-development", "cybersecurity", "ui-ux-design", "edtech-training"];

function isServiceSlug(s: string | undefined): s is ServiceSlug {
  return !!s && (VALID as string[]).includes(s);
}

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const ok = isServiceSlug(slug);
  const meta = ok ? getServiceDetailSeo(slug) : null;
  const content = ok ? getServiceDetailContent(slug) : null;

  useEffect(() => {
    scrollToTopInstant();
    enableSmoothScroll();
    return () => resetScrollBehavior();
  }, [slug]);

  if (!ok || !meta || !content) {
    const notFoundMeta: PageSeo = {
      title: `Service not found | ${ORG_NAME}`,
      description: "This service URL is not valid. Explore NebulaSafeTech cybersecurity, web, UI/UX, and EdTech service pages from the main services index.",
      keywords: ["NebulaSafeTech", "services"],
      canonicalPath: "/services",
    };
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <SeoHead meta={notFoundMeta} noindex />
        <TopNav />
        <main className="flex-1 pt-32 px-6 text-center">
          <h1 className="text-2xl font-bold text-slate-900">Service not found</h1>
          <p className="text-slate-600 mt-2">
            <Link to="/services" className="text-[#015AAA] font-semibold">
              View all services
            </Link>
          </p>
        </main>
        <FooterSection />
        <ScrollToTop />
      </div>
    );
  }

  const faqItems = [...serviceFaqForSlug(slug)];
  const structured = [
    serviceSchema({
      serviceType: meta.serviceType,
      name: meta.title.split("|")[0]?.trim() ?? meta.serviceType,
      description: meta.description,
      url: `${SITE_ORIGIN}${meta.canonicalPath}`,
    }),
    faqPageSchema(faqItems),
    breadcrumbListSchema(
      [
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
        { name: meta.serviceType, path: meta.canonicalPath },
      ],
      SITE_ORIGIN
    ),
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <SeoHead meta={meta} structuredData={structured} />
      <TopNav />
      <main id="main-content">
        <ServiceDetailHero meta={meta} content={content} />
        <ServiceOfferingsSection content={content} />
        <ServiceCapabilitiesSection content={content} />
        <ServiceBenefitsSection content={content} />
        <ServiceProcessSection content={content} />
        <ServiceCtaSection content={content} />
        <ServiceContactFormSection key={slug} serviceName={meta.serviceType} />
        <ServicesFaqSection
          title={`${meta.serviceType} - FAQ`}
          subtitle="Common questions about this service area and how we work with clients."
          items={faqItems}
        />
        <FooterSection />
      </main>
      <ScrollToTop />
    </div>
  );
}
