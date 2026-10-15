import { useRef, useEffect } from "react";
import { motion } from "motion/react";
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
import {
  fadeHorizontalVariants,
  fadeUpVariants,
  useParallaxY,
  VIEWPORT_ONCE,
} from "../utils/motionPresets";
import { useLightExperience } from "../utils/performance";

import { ResponsivePicture } from "../components/ResponsivePicture";
import { UNIFIED_PARTNER_LOGOS } from "../data/clientsData";
import { SecurityFeaturesStrip } from "../components/SecurityFeaturesStrip";

/* =========================================================================
   SECTION 1: HERO
   Two-column editorial hero with compact capability strip and precision
   dashboard console framing.
   ========================================================================= */
function HeroAboutSection() {
  const light = useLightExperience();
  const fadeUp = fadeUpVariants(light, 0.1);
  const fadeRight = fadeHorizontalVariants(light, "right");
  const imgRef = useRef<HTMLDivElement>(null);
  const y = useParallaxY(imgRef, 28);

  return (
    <section className="w-full bg-white overflow-hidden pt-28 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
      <div className="max-w-[1400px] mx-auto">
        <Breadcrumbs className="mb-6 sm:mb-8" items={[...PAGE_BREADCRUMBS.about]} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-16 items-center">
          {/* Left Column: Narrative & Compact Capabilities */}
          <div className="lg:col-span-7 flex flex-col justify-center min-w-0">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
              custom={0}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0056A7]/8 border border-[#0056A7]/15 text-[#0056A7] w-fit mb-5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#0056A7]" />
              <span className="text-xs font-bold uppercase tracking-wider">About Us</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
              custom={1}
              className="nst-h1 text-slate-900 tracking-tight text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.14] mb-5"
            >
              Built by defenders,
              <br className="hidden sm:inline" />{" "}
              for defenders.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
              custom={2}
              className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mb-8 sm:mb-10"
            >
              <span className="font-semibold text-slate-900">NebulaSafeTech</span> was founded
              by cybersecurity experts with a mission to deliver enterprise-grade protection through
              innovation, transparency, and relentless dedication.
            </motion.p>

            {/* Supporting capability strip */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
              custom={3}
              className="w-full max-w-xl"
            >
              <SecurityFeaturesStrip />
            </motion.div>
          </div>

          {/* Right Column: Integrated Dashboard Display */}
          <motion.div
            ref={imgRef}
            className="relative lg:col-span-5 min-w-0"
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
          >
            <motion.div
              style={{ y }}
              className="rounded-xl overflow-hidden bg-white border border-slate-200/90 shadow-[0_12px_36px_-10px_rgba(0,86,167,0.12)]"
            >
              {/* Refined enterprise console header bar */}
              <div className="flex items-center justify-between px-3.5 py-2.5 bg-slate-50 border-b border-slate-200/80 select-none">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <span className="ml-2 text-[11px] font-mono text-slate-500 font-medium tracking-wide">
                    Threat Defense Console
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-mono uppercase text-emerald-700 font-semibold tracking-wider">
                    Shield Active
                  </span>
                </div>
              </div>

              <ResponsivePicture
                slug="about-hero"
                alt="Security metrics dashboard"
                className="w-full h-auto object-cover object-center block"
                sizes="(max-width: 1024px) 100vw, 42vw"
                priority
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   SECTION 2: OUR STORY
   Editorial layout with prominent operations center image and narrative pacing.
   ========================================================================= */
function OurStorySection() {
  const light = useLightExperience();
  const fadeUp = fadeUpVariants(light, 0.1);
  const fadeLeft = fadeHorizontalVariants(light, "left");
  const imgRef = useRef<HTMLDivElement>(null);
  const y = useParallaxY(imgRef, 30);

  const storyParagraphs = [
    "We started with a simple belief - security should be proactive, intelligent, and accessible to every organization.",
    "From day one, we've focused on building solutions that not only defend against today's threats but anticipate tomorrow's challenges.",
    "Today, NebulaSafeTech empowers businesses across the globe to operate with confidence in an increasingly complex digital world.",
  ];

  return (
    <section className="w-full bg-slate-50/70 border-y border-slate-200/60 py-16 sm:py-24 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 overflow-hidden">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column (Desktop): Framed Operations Centre Image */}
        <motion.div
          ref={imgRef}
          className="relative lg:col-span-6 order-2 lg:order-1 min-w-0"
          variants={fadeLeft}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
        >
          <div className="rounded-xl overflow-hidden bg-white border border-slate-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-1.5">
            <motion.div style={{ y }} className="overflow-hidden rounded-lg">
              <ResponsivePicture
                slug="about-team"
                alt="NebulaSafeTech security operations team"
                className="w-full h-auto min-h-[260px] sm:min-h-[340px] max-h-[460px] object-cover object-center rounded-lg block"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
            <div className="flex items-center justify-between px-3 pt-2.5 pb-1 text-xs text-slate-500">
              <span className="font-semibold text-slate-700">Security Operations Team</span>
              <span className="font-mono text-[11px] text-slate-500">Global Threat Monitoring</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Editorial Narrative */}
        <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col justify-center min-w-0">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            custom={0}
            className="nst-eyebrow text-[#0056A7] mb-3"
          >
            Our Story
          </motion.p>

          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            custom={1}
            className="nst-h2 text-slate-900 tracking-tight text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-[1.18] mb-6"
          >
            Securing Today,
            <br className="hidden sm:inline" />{" "}
            Protecting Tomorrow
          </motion.h2>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            custom={2}
            className="space-y-4 max-w-xl"
          >
            <p className="text-base sm:text-lg text-slate-800 font-medium leading-relaxed pl-4 border-l-2 border-[#0056A7]">
              {storyParagraphs[0]}
            </p>
            <p className="nst-body text-slate-600 leading-relaxed">
              {storyParagraphs[1]}
            </p>
            <p className="nst-body text-slate-600 leading-relaxed">
              {storyParagraphs[2]}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   SECTION 3: COMPANY STATISTICS
   Refined horizontal statistics band with high numerical emphasis and
   consistent hairline separators.
   ========================================================================= */
const statsData = [
  {
    value: "50+",
    label: "Clients Served",
    icon: (
      <svg width="28" height="28" viewBox="0 0 44 48.617" fill="none" aria-hidden>
        <path
          d={svgPaths.p9630160}
          stroke="#0056A7"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3.5"
        />
      </svg>
    ),
  },
  {
    value: "120+",
    label: "Projects Delivered",
    icon: (
      <svg width="28" height="28" viewBox="0 0 49 41.5" fill="none" aria-hidden>
        <path
          d={svgPaths.p32f12880}
          stroke="#0056A7"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3.5"
        />
      </svg>
    ),
  },
  {
    value: "5+",
    label: "Years of Experience",
    icon: (
      <svg width="28" height="28" viewBox="0 0 50 42.5" fill="none" aria-hidden>
        <path
          d={svgPaths.p36902380}
          stroke="#0056A7"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="4"
        />
      </svg>
    ),
  },
];

function StatsSection() {
  const light = useLightExperience();
  const fadeUp = fadeUpVariants(light, 0.1);

  return (
    <section className="w-full bg-white border-b border-slate-200/80 py-12 sm:py-16 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200/80">
        {statsData.map((stat, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            custom={i}
            className="flex items-center gap-5 px-4 sm:px-8 lg:px-10 py-6 md:py-2 first:pt-0 last:pb-0 md:first:pt-2 md:last:pb-2 justify-start md:justify-center"
          >
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 bg-[#0056A7]/8 text-[#0056A7]"
              aria-hidden
            >
              {stat.icon}
            </div>
            <div>
              <div className="flex items-baseline">
                <AnimatedNumber
                  value={stat.value}
                  className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading"
                />
              </div>
              <p className="text-sm sm:text-base font-semibold text-slate-600 mt-1">
                {stat.label}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* =========================================================================
   SECTION 4: MISSION, VISION & VALUES
   Cohesive Architectural Tri-Pillar Manifesto with custom list styling,
   eliminating repetitive card grids.
   ========================================================================= */
function MissionVisionSection() {
  const light = useLightExperience();
  const fadeUp = fadeUpVariants(light, 0.1);

  const pillars = [
    {
      index: "01",
      badge: "Purpose",
      title: "Our Mission",
      icon: (
        <svg width="36" height="36" fill="none" viewBox="0 0 90 90" aria-hidden>
          <path
            d={svgPaths.p23704a80}
            stroke="#0056A7"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="5"
          />
        </svg>
      ),
      points: [
        "Deliver advanced, reliable cybersecurity solutions",
        "Protect digital assets with proactive defense",
        "Make enterprise-grade security accessible",
        "Partner closely with every client we serve",
      ],
    },
    {
      index: "02",
      badge: "Horizon",
      title: "Our Vision",
      icon: (
        <svg width="36" height="36" fill="none" viewBox="0 0 90 90" aria-hidden>
          <path d={svgPaths.p1b84cb00} fill="#0056A7" />
          <path d={svgPaths.p3c4d0b00} fill="#0056A7" />
        </svg>
      ),
      points: [
        "Lead globally in cybersecurity innovation",
        "Build a safer, more resilient digital world",
        "Champion integrity in every engagement",
        "Empower organizations to grow with confidence",
      ],
    },
    {
      index: "03",
      badge: "Ethics",
      title: "Our Values",
      icon: (
        <svg width="36" height="36" fill="none" viewBox="0 0 90 90" aria-hidden>
          <path d={svgPaths.p2bc40680} fill="#0056A7" />
          <path d={svgPaths.p16009380} fill="#0056A7" />
        </svg>
      ),
      points: [
        "Integrity in all we do",
        "Innovation that drives impact",
        "Transparency builds trust",
        "Relentless commitment to security",
        "Customer success is our priority",
      ],
    },
  ];

  return (
    <section className="w-full bg-slate-50/70 py-18 sm:py-24 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mb-10 sm:mb-14 text-left max-w-2xl"
        >
          <p className="nst-eyebrow text-[#0056A7] mb-3">
            Our Guiding Principles
          </p>
          <h2 className="nst-h2 text-slate-900 tracking-tight text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-[1.2]">
            Our Mission, Vision &amp; Values
          </h2>
        </motion.div>

        {/* Cohesive Tri-Pillar Manifesto Container */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="grid grid-cols-1 lg:grid-cols-3 rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-[0_4px_24px_-6px_rgba(0,0,0,0.04)] divide-y lg:divide-y-0 lg:divide-x divide-slate-200/80"
        >
          {pillars.map((pillar, i) => (
            <div
              key={i}
              className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between hover:bg-slate-50/40 transition-colors duration-200"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#0056A7]/8 flex items-center justify-center shrink-0">
                    {pillar.icon}
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold px-2.5 py-1 rounded-md bg-slate-100">
                    {pillar.index} / {pillar.badge}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-accent mb-6">
                  {pillar.title}
                </h3>

                <ul className="space-y-3.5 text-slate-600 text-sm sm:text-[15px] leading-relaxed">
                  {pillar.points.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0056A7] mt-2 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* =========================================================================
   SECTION 5: TRUSTED BY INDUSTRY & ACADEMIA
   Balanced corporate logo gallery with consistent sizing, visual alignment,
   and preserved aspect ratios.
   ========================================================================= */
function PartnersGallerySection() {
  const light = useLightExperience();
  const fadeUp = fadeUpVariants(light, 0.08);

  return (
    <section className="w-full bg-white border-t border-slate-200/80 py-18 sm:py-24 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <motion.header
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mb-12 sm:mb-14 text-left max-w-2xl"
        >
          <p className="nst-eyebrow text-[#0056A7] mb-3">
            Trusted by Industry &amp; Academia
          </p>
          <h2 className="nst-h2 text-slate-900 tracking-tight text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-[1.2] mb-3">
            Partnering with Leaders Worldwide
          </h2>
          <p className="nst-body text-slate-600 leading-relaxed m-0">
            We are proud to work with innovative companies and academic institutions
            that trust us to secure their digital future.
          </p>
        </motion.header>

        {/* Balanced 3x3 Logo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
          {UNIFIED_PARTNER_LOGOS.map((p, i) => (
            <motion.div
              key={p.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
              custom={i % 3}
              className={`bg-slate-50/50 hover:bg-slate-50 border border-slate-200/70 hover:border-slate-300 rounded-xl p-5 sm:p-6 flex flex-col items-center justify-center transition-all duration-200 group text-center min-h-[124px] sm:min-h-[136px] ${
                i === 8 ? "col-span-2 sm:col-span-1 max-w-[280px] sm:max-w-none mx-auto w-full" : ""
              }`}
            >
              <div className="w-full flex items-center justify-center h-14 sm:h-16 shrink-0">
                <ResponsivePicture
                  slug={p.mediaSlug}
                  alt={p.alt}
                  className="max-h-12 w-auto max-w-[130px] sm:max-w-[150px] object-contain mx-auto transition-transform duration-200 group-hover:scale-102"
                  profile="logo"
                />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-slate-700 tracking-tight text-center mt-3 group-hover:text-[#0056A7] transition-colors line-clamp-1">
                {p.name}
              </span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mt-0.5">
                {p.category}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   MAIN ABOUT PAGE EXPORT
   ========================================================================= */
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
      <SeoHead
        meta={ABOUT_SEO}
        structuredData={pageBreadcrumbJsonLd(PAGE_BREADCRUMBS.about)}
      />
      <TopNav />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <main id="main-content">
          <HeroAboutSection />
          <OurStorySection />
          <StatsSection />
          <MissionVisionSection />
          <PartnersGallerySection />
        </main>
        <FooterSection />
        <ScrollToTop />
      </motion.div>
    </div>
  );
}

