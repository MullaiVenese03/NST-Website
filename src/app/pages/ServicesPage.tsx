import { useRef, useEffect } from "react";
import { motion } from "motion/react";
import svgPaths from "../../imports/NstWebsiteV2Services/svg-ukc1gjjbsx";
import FooterSection from "../components/FooterSection";
import AnimatedNumber from "../components/AnimatedNumber";

import TopNav from "../components/TopNav";
import ScrollToTop from "../components/ScrollToTop";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { SeoHead } from "../../seo/SeoHead";
import { SERVICES_SEO, SERVICES_FAQ_ITEMS } from "../../seo/pageMeta";
import { SITE_ORIGIN } from "../../seo/seoConfig";
import { faqPageSchema } from "../../seo/schemas/faqSchema";
import { PAGE_BREADCRUMBS, pageBreadcrumbJsonLd } from "../utils/pageBreadcrumbs";
import { ServicesFaqSection } from "../components/ServicesFaqSection";
import { enableSmoothScroll, resetScrollBehavior, scrollToTopInstant } from "../utils/scroll";
import { fadeHorizontalVariants, fadeUpVariants, useParallaxY, VIEWPORT_ONCE } from "../utils/motionPresets";
import { useLightExperience } from "../utils/performance";

import { ResponsivePicture } from "../components/ResponsivePicture";
import { ServiceCard } from "../components/ServiceCard";
import type { MediaSlug } from "../utils/media";
import { SecurityFeaturesStrip } from "../components/SecurityFeaturesStrip";

function IconBadge({
  children,
  viewBox = "0 0 70 70",
  className = "w-[44px] h-[44px] rounded-xl bg-[#015AAA]/15 flex items-center justify-center shrink-0",
  iconClassName = "w-[26px] h-[26px] block",
}: {
  children: React.ReactNode;
  viewBox?: string;
  className?: string;
  iconClassName?: string;
}) {
  return (
    <div
      className={className}
      aria-hidden
    >
      <svg
        className={iconClassName}
        fill="none"
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid meet"
      >
        {children}
      </svg>
    </div>
  );
}

function ServicesHero() {
  const light = useLightExperience();
  const fadeUp = fadeUpVariants(light, 0.08);
  const fadeRight = fadeHorizontalVariants(light, "right", 20);
  const imgRef = useRef<HTMLDivElement>(null);
  const y = useParallaxY(imgRef, 40);

  return (
    <section className="relative w-full bg-white overflow-hidden pt-32 pb-20 px-8 md:px-14 lg:px-20">
      <div className="max-w-[1440px] mx-auto">
        <Breadcrumbs className="mb-8" items={[...PAGE_BREADCRUMBS.services]} />
        <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-10">

          <div className="flex-1 min-w-0">
            <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE} custom={0}
              className="nst-eyebrow text-[#015AAA]"
              style={{ marginBottom: "18px" }}>
              Our Services
            </motion.p>

            <motion.h1 variants={fadeUp} initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE} custom={1}
              className="nst-h1 text-slate-900"
              style={{ marginBottom: "20px", marginTop: 0 }}>
              Smart Solutions.<br className="hidden sm:inline" />{" "}Secure Future.
            </motion.h1>

            <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE} custom={2}
              className="nst-body text-slate-500"
              style={{ marginBottom: "44px", maxWidth: "540px" }}>
              From innovative web experiences to enterprise-grade security, we build, protect, and scale what matters most.
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={3}
              className="w-full max-w-xl"
            >
              <SecurityFeaturesStrip />
            </motion.div>
          </div>

          <motion.div ref={imgRef} className="flex-1 min-w-0 relative" variants={fadeRight} initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}>
            <motion.div style={{ y }} className="w-full">
              <ResponsivePicture
                slug="services-hero"
                alt="Smart Solutions - Security illustration"
                className="w-full h-auto object-contain"
                style={{ maxHeight: "520px" }}
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const serviceCards: { slug: string; mediaSlug: MediaSlug; title: string; desc: string }[] = [
  { slug: "/services/web-security", mediaSlug: "Icons--web-security", title: "Web Security", desc: "Secure your web apps with advanced vulnerability detection and real-time threat mitigation." },
  { slug: "/services/cloud-security", mediaSlug: "Icons--cloud-security", title: "Cloud Security", desc: "Secure cloud infrastructure and integrate security into your dev lifecycle seamlessly." },
  { slug: "/services/application-security", mediaSlug: "Icons--application-security", title: "Application Security", desc: "Identify flaws in application logic, APIs, and dependencies with source code reviews and remediation guidance." },
  { slug: "/services/network-security", mediaSlug: "Icons--network-security", title: "Network Security", desc: "Assess network exposure, firewall policies, segmentation, and access controls to eliminate attack paths." },
  { slug: "/services/web-development", mediaSlug: "Icons--full-stack-web-dev", title: "Full-Stack Web Development", desc: "Scalable, high-performance web applications built with modern technologies." },
  { slug: "/services/ui-ux-design", mediaSlug: "Icons--web-design-uiux", title: "Web Design & UI/UX Development", desc: "Pixel-perfect designs and intuitive experiences that engage users and drive results." },
  { slug: "/edtech", mediaSlug: "Icons--academic-training", title: "EdTech & Cybersecurity Training", desc: "Industry-grade training programs, hands-on vulnerability labs, and student certifications built to launch tech careers." },
];

function ServiceCardsSection() {
  return (
    <section className="w-full py-20 px-8 md:px-14 lg:px-20 overflow-hidden" style={{ background: "#F8FAFE" }}>
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
          {serviceCards.map((card, i) => (
            <ServiceCard
              key={`${card.slug}-${card.title}`}
              to={card.slug}
              mediaSlug={card.mediaSlug}
              title={card.title}
              description={card.desc}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const processSteps = [
  {
    num: "01", title: "Discover",
    desc: "We analyse your needs, challenges, and goals.",
    icon: (
      <IconBadge>
        <path d={svgPaths.p1d14d600} fill="#015AAA" />
      </IconBadge>
    ),
  },
  {
    num: "02", title: "Plan",
    desc: "We design a tailored strategy and roadmap.",
    icon: (
      <IconBadge>
        <path d={svgPaths.p25ae1080} fill="#015AAA" />
        <path d={svgPaths.p24172b00} fill="#015AAA" />
      </IconBadge>
    ),
  },
  {
    num: "03", title: "Build",
    desc: "We develop with best practices and cutting-edge technologies.",
    icon: (
      <IconBadge viewBox="0 0 46 46">
        <g>
          <path d={svgPaths.pa064e00} stroke="#015AAA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
          <path d={svgPaths.p39374772} stroke="#015AAA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
      </IconBadge>
    ),
  },
  {
    num: "04", title: "Secure",
    desc: "We test, validate, and ensure robust security.",
    icon: (
      <IconBadge>
        <path d={svgPaths.p17885a00} fill="#015AAA" />
      </IconBadge>
    ),
  },
  {
    num: "05", title: "Deliver",
    desc: "We deploy and provide ongoing support.",
    icon: (
      <IconBadge>
        <path d={svgPaths.p1a588000} fill="#015AAA" />
        <path d={svgPaths.p2cb01300} fill="#015AAA" />
        <path d={svgPaths.p2bc0e600} fill="#015AAA" />
      </IconBadge>
    ),
  },
];

function OurProcessSection() {
  const light = useLightExperience();
  const fadeUp = fadeUpVariants(light, 0.08);

  return (
    <section className="w-full bg-white py-20 px-8 md:px-14 lg:px-20 overflow-hidden">
      <div className="max-w-[1440px] mx-auto">

        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}
          className="nst-eyebrow text-[#015AAA]"
          style={{ marginBottom: "18px" }}>
          Our Process
        </motion.p>
        <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE} custom={1}
          className="nst-h2 text-slate-900"
          style={{ marginBottom: "14px", marginTop: 0 }}>
          How We Deliver Excellence
        </motion.h2>
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE} custom={2}
          className="nst-body text-slate-500"
          style={{ marginBottom: "48px", maxWidth: "580px" }}>
          We combine expertise, technology, and dedication to deliver solutions that drive growth and security.
        </motion.p>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4">
          {processSteps.map((step, i) => (
            <div key={i} className="flex flex-1 flex-col lg:flex-row items-center w-full">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT_ONCE}
                custom={i}
                className="relative rounded-2xl bg-white border border-slate-100 shadow-sm flex flex-col items-center p-8 w-full group min-h-[320px] text-center"
                whileHover={{ y: -4, boxShadow: "0 6px 16px rgba(1,90,170,0.06)" }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
              >
                <motion.div className="mb-6 shrink-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  {step.icon}
                </motion.div>
                <div className="space-y-2 flex-1 flex flex-col items-center">
                  <AnimatedNumber
                    value={step.num}
                    className="nst-stat text-[#015AAA]/20"
                  />
                  <h4 className="nst-h4 text-slate-900">{step.title}</h4>
                  <p className="nst-small text-slate-500">{step.desc}</p>
                </div>
              </motion.div>

              {i < processSteps.length - 1 && (
                <div className="hidden lg:flex items-center justify-center px-2 z-10">
                  <svg width="20" height="12" viewBox="0 0 18.5 11.5" fill="none" className="rotate-0">
                    <path d={svgPaths.p20b5e500} stroke="#015AAA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const whyFeatures = [
  {
    title: "Security First Approach",
    desc: "We prioritise security in every solution we build.",
    icon: (
      <IconBadge viewBox="0 0 42 46" className="w-[44px] h-[44px] rounded-xl bg-[#015AAA]/15 flex items-center justify-center shrink-0" iconClassName="w-[26px] h-[26px] block">
        <path d={svgPaths.p24ca6630} stroke="#015AAA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
      </IconBadge>
    ),
  },
  {
    title: "Tailored Solutions",
    desc: "Custom solutions designed to fit your unique business needs.",
    icon: (
      <IconBadge className="w-[44px] h-[44px] rounded-xl bg-[#015AAA]/15 flex items-center justify-center shrink-0" iconClassName="w-[26px] h-[26px] block">
        <path d={svgPaths.p25ae1080} fill="#015AAA" />
        <path d={svgPaths.p24172b00} fill="#015AAA" />
      </IconBadge>
    ),
  },
  {
    title: "Advanced Technology",
    desc: "Leveraging the latest tools and frameworks for impactful results.",
    icon: (
      <IconBadge className="w-[44px] h-[44px] rounded-xl bg-[#015AAA]/15 flex items-center justify-center shrink-0" iconClassName="w-[26px] h-[26px] block">
        <path d="M28 28H42V42H28V28Z" fill="#015AAA" />
        <path d={svgPaths.p11219e00} fill="#015AAA" />
      </IconBadge>
    ),
  },
  {
    title: "Reliable Support",
    desc: "24/7 support and continuous monitoring for your peace of mind.",
    icon: (
      <IconBadge viewBox="0 0 44 46" className="w-[44px] h-[44px] rounded-xl bg-[#015AAA]/15 flex items-center justify-center shrink-0" iconClassName="w-[26px] h-[26px] block">
        <path d={svgPaths.p3ef4e500} stroke="#015AAA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        <path d={svgPaths.p2aa32d80} stroke="#015AAA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
      </IconBadge>
    ),
  },
  {
    title: "Proven Track Record",
    desc: "Trusted by businesses and institutions worldwide.",
    icon: (
      <IconBadge className="w-[44px] h-[44px] rounded-xl bg-[#015AAA]/15 flex items-center justify-center shrink-0" iconClassName="w-[26px] h-[26px] block">
        <path d={svgPaths.p293f3a00} fill="#015AAA" />
      </IconBadge>
    ),
  },
];

function WhyChooseUsSection() {
  const light = useLightExperience();
  const fadeLeft = fadeHorizontalVariants(light, "left", 20);
  const fadeRight = fadeHorizontalVariants(light, "right", 20);
  const imgRef = useRef<HTMLDivElement>(null);
  const y = useParallaxY(imgRef, 50);

  return (
    <section className="relative w-full bg-white overflow-hidden py-20 px-8 md:px-14 lg:px-20">
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center gap-14 lg:gap-10">

        <div className="flex-1 min-w-0">
          <motion.p variants={fadeLeft} initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}
            className="nst-eyebrow text-[#015AAA]"
            style={{ marginBottom: "4px" }}>
            Why Choose Us
          </motion.p>
          <motion.h2 variants={fadeLeft} initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}
            className="nst-h2 text-slate-900"
            style={{ marginTop: 0 }}>
            Your Trusted Partner<br className="hidden sm:inline" />{" "}in Security &amp; Innovation
          </motion.h2>
          <motion.p variants={fadeLeft} initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}
            className="nst-body text-slate-500"
            style={{ maxWidth: "480px" }}>
            We combine expertise, technology, and dedication to deliver solutions that drive growth and security.
          </motion.p>

          <div ref={imgRef} className="relative overflow-hidden rounded-[16px] mt-4">
            <motion.div style={{ y }}>
              <ResponsivePicture
                slug="why-choose-us"
                alt="Why Choose NebulaSafeTech"
                className="w-full h-auto rounded-[16px] object-cover"
                style={{ maxHeight: "420px", objectPosition: "center top" }}
                sizes="(max-width: 1024px) 100vw, 480px"
              />
            </motion.div>
          </div>
        </div>

        <div className="flex-1 min-w-0 flex flex-col gap-5">
          {whyFeatures.map((feat, i) => (
            <motion.div
              key={i}
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
              custom={i}
              className="relative rounded-2xl bg-white border border-slate-100 p-6 flex items-center gap-6 overflow-hidden group shadow-sm"
              whileHover={{ x: 6 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
            >
              <motion.div className="flex-shrink-0 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                {feat.icon}
              </motion.div>
              <div className="flex flex-col gap-1">
                <h4 className="nst-h4 text-slate-900 group-hover:text-[#015AAA] transition-colors duration-200">{feat.title}</h4>
                <p className="nst-small text-slate-500">{feat.desc}</p>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#0056A7] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out origin-left pointer-events-none" aria-hidden />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  useEffect(() => {
    scrollToTopInstant();
    enableSmoothScroll();
    return () => { resetScrollBehavior(); };
  }, []);

  const faqJson = faqPageSchema([...SERVICES_FAQ_ITEMS]);
  const serviceIndex = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "NebulaSafeTech service areas",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Web Security", item: `${SITE_ORIGIN}/services/web-security` },
      { "@type": "ListItem", position: 2, name: "Cloud Security", item: `${SITE_ORIGIN}/services/cloud-security` },
      { "@type": "ListItem", position: 3, name: "Application Security", item: `${SITE_ORIGIN}/services/application-security` },
      { "@type": "ListItem", position: 4, name: "Network Security", item: `${SITE_ORIGIN}/services/network-security` },
      { "@type": "ListItem", position: 5, name: "Full-Stack Web Development", item: `${SITE_ORIGIN}/services/web-development` },
      { "@type": "ListItem", position: 6, name: "UI/UX Design", item: `${SITE_ORIGIN}/services/ui-ux-design` },
      { "@type": "ListItem", position: 7, name: "EdTech & Cybersecurity Training", item: `${SITE_ORIGIN}/edtech` },
    ],
  };

  return (
    <div className="w-full min-h-screen bg-white overflow-x-hidden">
      <SeoHead
        meta={SERVICES_SEO}
        structuredData={[faqJson, serviceIndex, pageBreadcrumbJsonLd(PAGE_BREADCRUMBS.services)]}
      />
      <TopNav />

      <main id="main-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <ServicesHero />
          <ServiceCardsSection />
          <OurProcessSection />
          <WhyChooseUsSection />
          <ServicesFaqSection items={[...SERVICES_FAQ_ITEMS]} />
          <FooterSection />
          <ScrollToTop />
        </motion.div>
      </main>
    </div>
  );
}
