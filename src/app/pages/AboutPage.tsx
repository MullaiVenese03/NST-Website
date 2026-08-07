import { useRef, useEffect } from "react";
import { motion, Variants } from "motion/react";
import svgPaths from "../../imports/NstWebsiteV2AboutUs/svg-n77cdd2snf";
import FooterSection from "../components/FooterSection";
import AnimatedNumber from "../components/AnimatedNumber";

import TopNav from "../components/TopNav";
import ScrollToTop from "../components/ScrollToTop";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { SeoHead } from "../../seo/SeoHead";
import { ABOUT_SEO } from "../../seo/pageMeta";
import { enableSmoothScroll, resetScrollBehavior, scrollToTopInstant } from "../utils/scroll";
import { PAGE_BREADCRUMBS, pageBreadcrumbJsonLd } from "../utils/pageBreadcrumbs";
import { useParallaxY } from "../utils/motionPresets";

import { ResponsivePicture } from "../components/ResponsivePicture";
import type { MediaSlug } from "../utils/media";
import PartnersSection from "../components/PartnersSection";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.12, ease: "easeOut" },
  }),
};

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: "easeOut" },
  },
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: "easeOut" },
  },
};

function HeroAboutSection() {
  const imgRef = useRef<HTMLDivElement>(null);
  const y = useParallaxY(imgRef, 40);

  return (
    <section className="w-full bg-white overflow-hidden pt-28 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-8 md:px-14 lg:px-20">
      <div className="max-w-[1440px] mx-auto">
        <Breadcrumbs className="mb-6 sm:mb-8" items={[...PAGE_BREADCRUMBS.about]} />
        <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20">

        <div className="flex-1 min-w-0">

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="nst-eyebrow text-[#015AAA]"
            style={{ marginBottom: "18px" }}
          >
            About Us
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="nst-h1 text-slate-900"
            style={{ marginBottom: "20px" }}
          >
            Built by defenders,
            <br className="hidden sm:inline" />{" "}
            for defenders.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            className="nst-body text-slate-500"
            style={{ marginBottom: "44px", maxWidth: "520px" }}
          >
            <span>NebulaSafeTech</span> was founded by cybersecurity experts with a mission
            to deliver enterprise-grade protection through innovation,
            transparency, and relentless dedication.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={3}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-2 border border-slate-100 rounded-2xl p-4 sm:p-6 bg-slate-50/30 shadow-sm w-full max-w-xl"
          >

            <div className="flex flex-col items-center gap-3 flex-1 px-2 py-3 sm:py-0 min-h-[100px] sm:min-h-[120px] justify-center">
              <div className="w-[64px] h-[64px] relative overflow-hidden">
                <svg className="w-full h-full" fill="none" viewBox="0 0 57 48">
                  <path
                    d={svgPaths.p91c0280}
                    stroke="#015AAA"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                  />
                </svg>
              </div>
              <div className="text-center">
                <p className="nst-small font-bold text-slate-900 text-center">
                  Expert-Led
                </p>
                <p className="nst-small font-bold text-slate-900 text-center">
                  Security
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 flex-1 px-2 py-3 sm:py-0 min-h-[90px] sm:min-h-[100px] justify-center">
              <div className="w-12 h-12 relative overflow-hidden flex items-center justify-center">
                <svg className="w-9 h-9" fill="none" viewBox="0 0 51 56.5404">
                  <path
                    d={svgPaths.p35f7eb80}
                    stroke="#015AAA"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                  />
                </svg>
              </div>
              <div className="text-center">
                <p className="nst-small font-bold text-slate-900 text-center">
                  Proactive
                </p>
                <p className="nst-small font-bold text-slate-900 text-center">
                  Protection
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 flex-1 px-2 py-3 sm:py-0 min-h-[90px] sm:min-h-[100px] justify-center">
              <div className="w-12 h-12 relative overflow-hidden flex items-center justify-center">
                <svg className="w-9 h-9" fill="none" viewBox="0 0 48.6877 48.6465">
                  <path d={svgPaths.pe5e6700} stroke="#015AAA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                  <path d={svgPaths.p308e5280} stroke="#015AAA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                </svg>
              </div>
              <div className="text-center">
                <p className="nst-small font-bold text-slate-900 text-center">
                  24/7 Threat
                </p>
                <p className="nst-small font-bold text-slate-900 text-center">
                  Monitoring
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          ref={imgRef}
          className="flex-1 min-w-0 relative"
          variants={fadeRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div style={{ y }} className="overflow-hidden rounded-[16px] w-full">
            <ResponsivePicture
              slug="about-hero"
              alt="Security metrics dashboard"
              className="w-full h-auto max-h-[min(52vh,420px)] sm:max-h-none object-cover object-center rounded-[16px]"
              style={{ boxShadow: "0 4px 16px rgba(1,90,170,0.06)", border: "1px solid rgba(0,0,0,0.05)" }}
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </motion.div>

          <div
            className="absolute -z-10 inset-0 rounded-full bg-[#015AAA]/10 opacity-30"
            aria-hidden
            style={{ background: "radial-gradient(circle at 60% 40%, #015AAA 0%, transparent 70%)" }}
          />
        </motion.div>
        </div>
      </div>
    </section>
  );
}

function OurStorySection() {
  const imgRef = useRef<HTMLDivElement>(null);
  const y = useParallaxY(imgRef, 55);

  return (
    <section className="w-full overflow-hidden py-16 sm:py-20 px-4 sm:px-8 md:px-14 lg:px-20" style={{ background: "#F8FAFE" }}>
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center gap-14 lg:gap-20">

        <div className="flex-1 min-w-0">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="nst-eyebrow text-[#015AAA]"
            style={{ marginBottom: "18px" }}
          >
            Our Story
          </motion.p>

          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="nst-h2 text-slate-900"
            style={{ marginBottom: "28px" }}
          >
            Securing Today,
            <br className="hidden sm:inline" />{" "}
            Protecting Tomorrow
          </motion.h2>

          {[
            "We started with a simple belief - security should be proactive, intelligent, and accessible to every organization.",
            "From day one, we've focused on building solutions that not only defend against today's threats but anticipate tomorrow's challenges.",
            "Today, NebulaSafeTech empowers businesses across the globe to operate with confidence in an increasingly complex digital world.",
          ].map((para, i) => (
            <motion.p
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i + 2}
              className="nst-body text-slate-500"
              style={{ marginBottom: i < 2 ? "20px" : "0" }}
            >
              {para}
            </motion.p>
          ))}
        </div>

        <div ref={imgRef} className="flex-1 min-w-0 relative overflow-hidden rounded-[12px] min-h-[240px] sm:min-h-[320px] max-h-[min(52vh,420px)] lg:max-h-none">
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            style={{ y }}
            className="h-full w-full"
          >
            <ResponsivePicture
              slug="about-team"
              alt="NebulaSafeTech security operations team"
              className="w-full h-full min-h-[240px] object-cover object-center rounded-[12px]"
              style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.06)", border: "1px solid rgba(0,0,0,0.05)" }}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const statsData = [
  {
    value: "50+",
    label: "Clients Served",
    icon: (
      <svg width="36" height="36" viewBox="0 0 44 48.617" fill="none">
        <path d={svgPaths.p9630160} stroke="#015AAA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
      </svg>
    ),
  },
  {
    value: "120+",
    label: "Projects Delivered",
    icon: (
      <svg width="36" height="36" viewBox="0 0 49 41.5" fill="none">
        <path d={svgPaths.p32f12880} stroke="#015AAA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
      </svg>
    ),
  },
  {
    value: "5+",
    label: "Years of Experience",
    icon: (
      <svg width="36" height="36" viewBox="0 0 50 42.5" fill="none">
        <path d={svgPaths.p36902380} stroke="#015AAA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" />
      </svg>
    ),
  },
];

function StatsSection() {
  return (
    <section className="w-full bg-white py-16 px-8 md:px-14 lg:px-20">
      <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-0 sm:gap-0">
        {statsData.map((stat, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={i}
            className="flex items-center gap-5 flex-1 justify-center py-6 px-4 sm:px-8 w-full sm:w-auto border-b sm:border-b-0 sm:border-r border-[#E0E0E0] last:border-b-0 last:sm:border-r-0"
          >
            <div
              className="flex items-center justify-center flex-shrink-0 rounded-[14px]"
              style={{
                width: 56,
                height: 56,
                background: "rgba(1,90,170,0.08)",
              }}
            >
              {stat.icon}
            </div>
            <div>
              <AnimatedNumber
                value={stat.value}
                className="nst-stat text-[#015AAA]"
                style={{ margin: 0 }}
              />
              <p
                className="nst-body font-bold text-slate-900"
                style={{ margin: 0 }}
              >
                {stat.label}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function MissionVisionSection() {
  const cards = [
    {
      icon: (
        <svg width="52" height="52" fill="none" viewBox="0 0 90 90">
          <rect fill="#015AAA" fillOpacity="0.15" height="90" rx="12" width="90" />
          <path d={svgPaths.p23704a80} stroke="#015AAA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.5" />
        </svg>
      ),
      title: "Our Mission",
      content: (
        <ul className="nst-body text-slate-900 list-disc list-outside" style={{ margin: 0, paddingLeft: "22px" }}>
          <li>Deliver advanced, reliable cybersecurity solutions</li>
          <li>Protect digital assets with proactive defense</li>
          <li>Make enterprise-grade security accessible</li>
          <li>Partner closely with every client we serve</li>
        </ul>
      ),
    },
    {
      icon: (
        <svg width="52" height="52" fill="none" viewBox="0 0 90 90">
          <rect fill="#015AAA" fillOpacity="0.15" height="90" rx="12" width="90" />
          <path d={svgPaths.p1b84cb00} fill="#015AAA" />
          <path d={svgPaths.p3c4d0b00} fill="#015AAA" />
        </svg>
      ),
      title: "Our Vision",
      content: (
        <ul className="nst-body text-slate-900 list-disc list-outside" style={{ margin: 0, paddingLeft: "22px" }}>
          <li>Lead globally in cybersecurity innovation</li>
          <li>Build a safer, more resilient digital world</li>
          <li>Champion integrity in every engagement</li>
          <li>Empower organizations to grow with confidence</li>
        </ul>
      ),
    },
    {
      icon: (
        <svg width="52" height="52" fill="none" viewBox="0 0 90 90">
          <rect fill="#015AAA" fillOpacity="0.15" height="90" rx="12" width="90" />
          <path d={svgPaths.p2bc40680} fill="#015AAA" />
          <path d={svgPaths.p16009380} fill="#015AAA" />
        </svg>
      ),
      title: "Our Values",
      content: (
        <ul className="nst-body text-slate-900 list-disc list-outside" style={{ margin: 0, paddingLeft: "22px" }}>
          <li>Integrity in all we do</li>
          <li>Innovation that drives impact</li>
          <li>Transparency builds trust</li>
          <li>Relentless commitment to security</li>
          <li>Customer success is our priority</li>
        </ul>
      ),
    },
  ];

  return (
    <section className="w-full py-20 px-8 md:px-14 lg:px-20 overflow-hidden" style={{ background: "#F8FAFE" }}>
      <div className="max-w-[1440px] mx-auto">

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="nst-eyebrow text-[#015AAA]"
          style={{ marginBottom: "40px" }}
        >
          Our Mission, Vision &amp; Values
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              className="relative rounded-[14px] bg-white p-8 flex flex-col gap-5"
              style={{
                boxShadow: "0 2px 8px rgba(1,90,170,0.05)",
                border: "1px solid rgba(1,90,170,0.1)",
              }}
              whileHover={{ y: -4, boxShadow: "0 6px 18px rgba(1,90,170,0.08)" }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
            >
              {card.icon}
              <h3
                className="nst-h3 text-[#015AAA]"
                style={{ margin: 0 }}
              >
                {card.title}
              </h3>
              {card.content}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}



export default function AboutPage() {
  useEffect(() => {
    scrollToTopInstant();
    enableSmoothScroll();
    return () => {
      resetScrollBehavior();
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-white overflow-x-hidden">
      <SeoHead meta={ABOUT_SEO} structuredData={pageBreadcrumbJsonLd(PAGE_BREADCRUMBS.about)} />
      <TopNav />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <main id="main-content">
          <HeroAboutSection />
          <OurStorySection />
          <StatsSection />
          <MissionVisionSection />
          <PartnersSection />
        </main>
        <FooterSection />
        <ScrollToTop />
      </motion.div>
    </div>
  );
}
