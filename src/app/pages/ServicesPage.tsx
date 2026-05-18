import { useRef, useEffect } from "react";
import { Link } from "react-router";
import { motion, Variants } from "motion/react";
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
import { useParallaxY } from "../utils/motionPresets";

import { ResponsivePicture } from "../components/ResponsivePicture";
import type { MediaSlug } from "../utils/media";

/* â”€â”€ Animation variants â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 32 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.52, delay: i * 0.1, ease: "easeOut" },
  }),
};
const fadeLeft: Variants  = { hidden: { opacity: 0, x: -36 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } } };
const fadeRight: Variants = { hidden: { opacity: 0, x:  36 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } } };

function IconBadge({
  children,
  viewBox = "0 0 70 70",
}: {
  children: React.ReactNode;
  viewBox?: string;
}) {
  return (
    <div
      className="w-[70px] h-[70px] rounded-xl bg-[#015AAA]/15 flex items-center justify-center shrink-0"
      aria-hidden
    >
      <svg
        className="w-[44px] h-[44px] block"
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
  const imgRef = useRef<HTMLDivElement>(null);
  const y = useParallaxY(imgRef, 40);

  return (
    <section className="relative w-full bg-white overflow-hidden pt-32 pb-20 px-8 md:px-14 lg:px-20">
      <div className="max-w-[1440px] mx-auto">
        <Breadcrumbs className="mb-8" items={[...PAGE_BREADCRUMBS.services]} />
        <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-10">

        {/* Left */}
        <div className="flex-1 min-w-0">
          <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}
            style={{ fontFamily: 'var(--font-family)', fontWeight: 700, fontSize: "18px", letterSpacing: "1.2px", color: "#015AAA", textTransform: "uppercase", marginBottom: "18px" }}>
            Our Services
          </motion.p>

          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
            style={{ fontFamily: 'var(--font-family)', fontWeight: 700, fontSize: "clamp(32px,4.5vw,56px)", letterSpacing: "1.12px", color: "#000", lineHeight: 1.08, marginBottom: "20px" }}>
            Smart Solutions.<br />Secure Future.
          </motion.div>

          <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}
            style={{ fontFamily: 'var(--font-family)', fontWeight: 500, fontSize: "18px", letterSpacing: "0.4px", color: "#6D6D6D", lineHeight: 1.65, marginBottom: "44px", maxWidth: "540px" }}>
            From innovative web experiences to enterprise-grade security, we build, protect, and scale what matters most.
          </motion.p>

          {/* Feature icons */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={3}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-0 border border-slate-100 rounded-2xl p-4 sm:p-6 bg-slate-50/30 shadow-sm w-full max-w-xl"
          >
            {[
              { 
                icon: (
                  <svg className="w-full h-full" fill="none" viewBox="0 0 57 48">
                    <path d={svgPaths.p91c0280} stroke="#015AAA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
                  </svg>
                ), 
                label1: "Expert-Led", 
                label2: "Security" 
              },
              { 
                icon: (
                  <svg className="w-full h-full" fill="none" viewBox="0 0 51 56.5404">
                    <path d={svgPaths.p35f7eb80} stroke="#015AAA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
                  </svg>
                ), 
                label1: "Proactive", 
                label2: "Protection" 
              },
              { 
                icon: (
                  <svg className="w-full h-full" fill="none" viewBox="0 0 48.6877 48.6465">
                    <path d={svgPaths.pe5e6700} stroke="#015AAA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
                    <path d={svgPaths.p308e5280} stroke="#015AAA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
                  </svg>
                ), 
                label1: "24/7 Threat", 
                label2: "Monitoring" 
              },
            ].map((item, i) => (
              <div key={i} className="flex flex-1 items-center min-w-0">
                <div className="flex flex-col items-center gap-3 flex-1 px-3 sm:px-4 py-2 sm:py-0">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 relative flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div className="text-center">
                    <p style={{ fontFamily: 'var(--font-family)', fontWeight: 700, fontSize: "16px", color: "#000", letterSpacing: "0.32px", textAlign: "center" }}>
                      {item.label1}
                    </p>
                    <p style={{ fontFamily: 'var(--font-family)', fontWeight: 700, fontSize: "16px", color: "#000", letterSpacing: "0.32px", textAlign: "center" }}>
                      {item.label2}
                    </p>
                  </div>
                </div>
                {i < 2 && (
                  <div className="hidden sm:block w-px self-stretch mx-1 shrink-0" style={{ background: "#e2e8f0", minHeight: "72px" }} aria-hidden />
                )}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: services illustration with parallax */}
        <motion.div ref={imgRef} className="flex-1 min-w-0 relative" variants={fadeRight} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
          <motion.div style={{ y }} className="w-full">
            <ResponsivePicture
              slug="services-hero"
              alt="Smart Solutions – Security illustration"
              className="w-full h-auto object-contain"
              style={{ maxHeight: "520px" }}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
          <div className="absolute -z-10 inset-0 rounded-full bg-[#015AAA]/8 opacity-40" aria-hidden
            style={{ background: "radial-gradient(circle at 50% 40%, #015AAA 0%, transparent 70%)" }} />
        </motion.div>
        </div>
      </div>
    </section>
  );
}

const serviceCards: { slug: string; mediaSlug: MediaSlug; title: string; desc: string }[] = [
  { slug: "/services/cybersecurity", mediaSlug: "Icons--web-security", title: "Web Security", desc: "Secure your web apps with advanced vulnerability detection and real-time threat mitigation." },
  { slug: "/services/cybersecurity", mediaSlug: "Icons--cloud-security", title: "Cloud Security", desc: "Secure cloud infrastructure and integrate security into your dev lifecycle seamlessly." },
  { slug: "/services/cybersecurity", mediaSlug: "Icons--application-security", title: "Application Security", desc: "Create innovative frameworks to build executable software security with privacy and trust." },
  { slug: "/services/cybersecurity", mediaSlug: "Icons--network-security", title: "Network Security", desc: "Create innovative frameworks to executable software security - built for privacy and trust." },
  { slug: "/services/cybersecurity", mediaSlug: "Icons--encryption-data-protection", title: "Encryption & Data Protection", desc: "Create innovative frameworks to executable software security we built, privacy, and trust." },
  { slug: "/services/web-development", mediaSlug: "Icons--full-stack-web-dev", title: "Full-Stack Web Development", desc: "Scalable, high-performance web applications built with modern technologies." },
  { slug: "/services/ui-ux-design", mediaSlug: "Icons--web-design-uiux", title: "Web Design & UI/UX Development", desc: "Pixel-perfect designs and intuitive experiences that engage users and drive results." },
  { slug: "/services/edtech-training", mediaSlug: "Icons--academic-training", title: "Academic Training", desc: "Practical training and real-world learning experiences that build skills and prepare you for industry." },
];

function ServiceCardsSection() {
  return (
    <section className="w-full py-20 px-8 md:px-14 lg:px-20 overflow-hidden" style={{ background: "#F8FAFE" }}>
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-stretch">
          {serviceCards.map((card, i) => (
            <Link key={i} to={card.slug} className="no-underline text-inherit h-full block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#015AAA]/70 rounded-2xl min-w-0">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              custom={i % 4}
              className="relative rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col group cursor-pointer h-full min-h-[320px] sm:min-h-[360px]"
            >
              {/* Icon/Image Container */}
              <div className="p-6 sm:p-8 pb-4 flex items-center justify-center min-h-[160px] sm:min-h-[192px]">
                <div className="relative w-full max-w-[140px] sm:max-w-[160px] aspect-square flex items-center justify-center mx-auto">
                  <div className="absolute inset-0 bg-blue-50/50 rounded-full scale-90 group-hover:scale-100 transition-transform duration-500" aria-hidden />
                  <ResponsivePicture
                    slug={card.mediaSlug}
                    alt={card.title}
                    className="relative z-10 w-full h-full max-h-[100px] sm:max-h-[120px] object-contain object-center transition-transform duration-500 group-hover:scale-105"
                    profile="icon"
                  />
                </div>
              </div>

              {/* Text Content */}
              <div className="px-6 sm:px-8 pb-6 sm:pb-8 flex flex-col flex-1 min-w-0">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900 mb-3 sm:mb-4 group-hover:text-[#015AAA] transition-colors duration-300 break-words">
                  {card.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-500 leading-relaxed flex-1 break-words">
                  {card.desc}
                </p>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#015AAA] to-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-2xl origin-left" />
            </motion.div>
            </Link>
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
  return (
    <section className="w-full bg-white py-20 px-8 md:px-14 lg:px-20 overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          style={{ fontFamily: 'var(--font-family)', fontWeight: 700, fontSize: "18px", letterSpacing: "1.2px", color: "#015AAA", textTransform: "uppercase", marginBottom: "18px" }}>
          Our Process
        </motion.p>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
          style={{ fontFamily: 'var(--font-family)', fontWeight: 700, fontSize: "clamp(28px,3.8vw,52px)", letterSpacing: "1.12px", color: "#000", lineHeight: 1.1, marginBottom: "14px" }}>
          How We Deliver Excellence
        </motion.div>
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}
          style={{ fontFamily: 'var(--font-family)', fontWeight: 500, fontSize: "18px", letterSpacing: "0.4px", color: "#6D6D6D", lineHeight: 1.65, marginBottom: "48px", maxWidth: "580px" }}>
          We combine expertise, technology, and dedication to deliver solutions that drive growth and security.
        </motion.p>

        {/* Step cards row */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4">
          {processSteps.map((step, i) => (
            <div key={i} className="flex flex-1 flex-col lg:flex-row items-center w-full">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="relative rounded-2xl bg-white border border-slate-100 shadow-sm flex flex-col items-center p-8 w-full group min-h-[320px] text-center"
                whileHover={{ y: -6, boxShadow: "0 12px 32px rgba(1,90,170,0.1)" }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
              >
                <motion.div className="mb-6 shrink-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  {step.icon}
                </motion.div>
                <div className="space-y-2 flex-1 flex flex-col items-center">
                  <AnimatedNumber
                    value={step.num}
                    className="text-4xl font-black text-[#015AAA]/20 tracking-tighter"
                  />
                  <h4 className="text-xl font-bold text-slate-900">{step.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
              
              {/* Connector arrow (Desktop only) */}
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

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   WHY CHOOSE US
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
const whyFeatures = [
  {
    title: "Security First Approach",
    desc: "We prioritise security in every solution we build.",
    icon: (
      <IconBadge viewBox="0 0 42 46">
        <path d={svgPaths.p24ca6630} stroke="#015AAA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
      </IconBadge>
    ),
  },
  {
    title: "Tailored Solutions",
    desc: "Custom solutions designed to fit your unique business needs.",
    icon: (
      <IconBadge>
        <path d={svgPaths.p25ae1080} fill="#015AAA" />
        <path d={svgPaths.p24172b00} fill="#015AAA" />
      </IconBadge>
    ),
  },
  {
    title: "Advanced Technology",
    desc: "Leveraging the latest tools and frameworks for impactful results.",
    icon: (
      <IconBadge>
        <path d="M28 28H42V42H28V28Z" fill="#015AAA" />
        <path d={svgPaths.p11219e00} fill="#015AAA" />
      </IconBadge>
    ),
  },
  {
    title: "Reliable Support",
    desc: "24/7 support and continuous monitoring for your peace of mind.",
    icon: (
      <IconBadge viewBox="0 0 44 46">
        <path d={svgPaths.p3ef4e500} stroke="#015AAA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        <path d={svgPaths.p2aa32d80} stroke="#015AAA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
      </IconBadge>
    ),
  },
  {
    title: "Proven Track Record",
    desc: "Trusted by businesses and institutions worldwide.",
    icon: (
      <IconBadge>
        <path d={svgPaths.p293f3a00} fill="#015AAA" />
      </IconBadge>
    ),
  },
];

function WhyChooseUsSection() {
  const imgRef = useRef<HTMLDivElement>(null);
  const y = useParallaxY(imgRef, 50);

  return (
    <section className="relative w-full bg-white overflow-hidden py-20 px-8 md:px-14 lg:px-20">
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center gap-14 lg:gap-10">

        {/* Left */}
        <div className="flex-1 min-w-0">
          <motion.p variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}
            style={{ fontFamily: 'var(--font-family)', fontWeight: 700, fontSize: "18px", letterSpacing: "1.2px", color: "#015AAA", textTransform: "uppercase", marginBottom: "4px" }}>
            Why Choose Us
          </motion.p>
          <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}
            style={{ fontFamily: 'var(--font-family)', fontWeight: 700, fontSize: "clamp(26px,3.6vw,50px)", letterSpacing: "1px", color: "#000", lineHeight: 1.1 }}>
            Your Trusted Partner<br />in Security &amp; Innovation
          </motion.div>
          <motion.p variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}
            style={{ fontFamily: 'var(--font-family)', fontWeight: 500, fontSize: "18px", letterSpacing: "0.4px", color: "#6D6D6D", lineHeight: 1.65, maxWidth: "480px" }}>
            We combine expertise, technology, and dedication to deliver solutions that drive growth and security.
          </motion.p>

          {/* Illustration with parallax */}
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

        {/* Right: feature cards */}
        <div className="flex-1 min-w-0 flex flex-col gap-5">
          {whyFeatures.map((feat, i) => (
            <motion.div
              key={i}
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              className="relative rounded-2xl bg-white border border-slate-100 p-6 flex items-center gap-6 overflow-hidden group shadow-sm"
              whileHover={{ x: 6 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
            >
              <motion.div className="flex-shrink-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                {feat.icon}
              </motion.div>
              <div className="flex flex-col gap-1.5">
                <h4 className="text-xl font-bold text-slate-900 group-hover:text-[#015AAA] transition-colors duration-300">{feat.title}</h4>
                <p className="text-base text-slate-500 leading-relaxed">{feat.desc}</p>
              </div>
              {/* Bottom border accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#015AAA] to-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   MAIN PAGE
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
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
      { "@type": "ListItem", position: 1, name: "Cybersecurity", item: `${SITE_ORIGIN}/services/cybersecurity` },
      { "@type": "ListItem", position: 2, name: "Web development", item: `${SITE_ORIGIN}/services/web-development` },
      { "@type": "ListItem", position: 3, name: "UI/UX design", item: `${SITE_ORIGIN}/services/ui-ux-design` },
      { "@type": "ListItem", position: 4, name: "EdTech & training", item: `${SITE_ORIGIN}/services/edtech-training` },
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

