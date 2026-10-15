import { useEffect } from "react";
import { useLocation } from "react-router";
import { motion } from "motion/react";
import { MOTION_EASE_OUT } from "../utils/motionPresets";
import TopNav from "../components/TopNav";
import FooterSection from "../components/FooterSection";
import ScrollToTop from "../components/ScrollToTop";
import NotFoundPage from "./NotFoundPage";
import { SeoHead } from "../../seo/SeoHead";
import { SITE_ORIGIN } from "../../seo/seoConfig";
import { serviceSchema } from "../../seo/schemas/serviceSchema";
import { faqPageSchema, breadcrumbListSchema } from "../../seo/schemas/faqSchema";
import { enableSmoothScroll, resetScrollBehavior, scrollToTopInstant } from "../utils/scroll";
import { ServicesFaqSection } from "../components/ServicesFaqSection";
import {
  ServiceDetailHero,
  ServiceOfferingsSection,
  ServiceCapabilitiesSection,
  ServiceBenefitsSection,
  ServiceProcessSection,
  ServiceCtaSection,
  ServiceContactFormSection,
  ProblemAndAudienceSection,
} from "../components/ServiceDetailSections";
import {
  getCyberServiceSeo,
  type CyberServiceSlug,
  WEB_SECURITY_FAQ,
  CLOUD_SECURITY_FAQ,
  APPLICATION_SECURITY_FAQ,
  NETWORK_SECURITY_FAQ,
} from "../../seo/pageMeta";
import { getCyberServiceDetailContent } from "../data/serviceDetailContent";
import type { ServiceDetailContent } from "../data/serviceDetailContent";

const VALID_CYBER_SLUGS: CyberServiceSlug[] = [
  "web-security",
  "cloud-security",
  "application-security",
  "network-security",
];

function isCyberSlug(s: string | undefined): s is CyberServiceSlug {
  return !!s && (VALID_CYBER_SLUGS as string[]).includes(s);
}

function faqForSlug(slug: CyberServiceSlug) {
  switch (slug) {
    case "web-security": return WEB_SECURITY_FAQ;
    case "cloud-security": return CLOUD_SECURITY_FAQ;
    case "application-security": return APPLICATION_SECURITY_FAQ;
    case "network-security": return NETWORK_SECURITY_FAQ;
  }
}

export default function CyberServicePage() {
  const { pathname } = useLocation();
  const cyberSlug = pathname.replace(/\/+$/, "").split("/").pop() as string | undefined;
  const ok = isCyberSlug(cyberSlug);
  const meta = ok ? getCyberServiceSeo(cyberSlug) : null;
  const rawContent = ok ? getCyberServiceDetailContent(cyberSlug) : null;

  useEffect(() => {
    scrollToTopInstant();
    enableSmoothScroll();
    return () => resetScrollBehavior();
  }, [cyberSlug]);

  if (!ok || !meta || !rawContent) {
    return <NotFoundPage />;
  }

  const content = rawContent as unknown as ServiceDetailContent;
  const faqItems = faqForSlug(cyberSlug);

  const structured = [
    serviceSchema({
      serviceType: meta.serviceType,
      name: meta.serviceType,
      description: meta.description,
      url: `${SITE_ORIGIN}${meta.canonicalPath}`,
    }),
    faqPageSchema(faqItems),
    breadcrumbListSchema(
      [
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
        { name: "Cybersecurity", path: "/services/cybersecurity" },
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
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: MOTION_EASE_OUT }}
        >
          <ServiceDetailHero
            meta={meta}
            content={content}
            breadcrumbItems={[
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
              { name: "Cybersecurity", path: "/services/cybersecurity" },
              { name: meta.serviceType, path: meta.canonicalPath },
            ]}
          />
          <ProblemAndAudienceSection
            problemStatement={rawContent.problemStatement}
            audiences={rawContent.audiences}
          />
          <ServiceOfferingsSection content={content} />
          <ServiceCapabilitiesSection content={content} />
          <ServiceBenefitsSection content={content} />
          <ServiceProcessSection content={content} />
          <ServiceCtaSection content={content} />
          <ServiceContactFormSection key={cyberSlug} serviceName={meta.serviceType} />
          <ServicesFaqSection
            title={`${meta.serviceType} - FAQ`}
            subtitle="Straight answers about how we engage, what we cover, and how we differ from similar services."
            items={faqItems}
          />
        </motion.div>
      </main>
      <FooterSection />
      <ScrollToTop />
    </div>
  );
}
