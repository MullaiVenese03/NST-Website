import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import svgPaths from "../../imports/NstWebsiteV2Services/svg-ukc1gjjbsx";
import FooterSection from "../components/FooterSection";

import TopNav from "../components/TopNav";
import BottomNav from "../components/BottomNav";

/* ── Image assets ─────────────────────────────────────────────────────── */
import imgServices1     from "../../assets/Services.png";
import imgWhyChooseUs1  from "../../assets/Why Choose Us.png";
import imgWebSecurity   from "../../assets/Icons/Web Security.png";
import imgCloudSecurity from "../../assets/Icons/Cloud Security.png";
import imgAppSecurity   from "../../assets/Icons/Application Security.png";
import imgNetworkSec    from "../../assets/Icons/Network Security.png";
import imgEncryption    from "../../assets/Icons/Encryption & Data Protection.png";
import imgWebDev        from "../../assets/Icons/Full-Stack Web Development.png";
import imgUIUX          from "../../assets/Icons/Web Design & UIUX Developmen.png";
import imgAcademic      from "../../assets/Icons/Academic Training.png";

/* ── Parallax helper ───────────────────────────────────────────────────── */
function useParallax(ref: React.RefObject<HTMLDivElement | null>, dist = 55) {
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  return useTransform(scrollYProgress, [0, 1], [-dist, dist]);
}

/* ── Animation variants ─────────────────────────────────────────────── */
const fadeUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.52, delay: i * 0.1, ease: "easeOut" },
  }),
};
const fadeLeft  = { hidden: { opacity: 0, x: -36 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } } };
const fadeRight = { hidden: { opacity: 0, x:  36 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } } };

/* ══════════════════════════════════════════════════════════════════════
   HERO — "Built by defenders, for defenders"
══════════════════════════════════════════════════════════════════════ */
function ServicesHero() {
  const imgRef = useRef<HTMLDivElement>(null);
  const y = useParallax(imgRef, 40);

  return (
    <section className="relative w-full bg-white overflow-hidden py-20 px-8 md:px-14 lg:px-20">
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center gap-14 lg:gap-10">

        {/* Left */}
        <div className="flex-1 min-w-0">
          <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}
            style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: "18px", letterSpacing: "1.2px", color: "#015AAA", textTransform: "uppercase", marginBottom: "18px" }}>
            Our Services
          </motion.p>

          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
            style={{ fontFamily: "'Geist',sans-serif", fontWeight: 700, fontSize: "clamp(32px,4.5vw,56px)", letterSpacing: "1.12px", color: "#000", lineHeight: 1.08, marginBottom: "20px" }}>
            Smart Solutions.<br />Secure Future.
          </motion.div>

          <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}
            style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 500, fontSize: "18px", letterSpacing: "0.4px", color: "#6D6D6D", lineHeight: 1.65, marginBottom: "44px", maxWidth: "540px" }}>
            From innovative web experiences to enterprise-grade security, we build, protect, and scale what matters most.
          </motion.p>

          {/* Feature icons */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={3} className="flex items-center">
            {[
              { icon: <svg width="56" height="52" viewBox="0 0 57 48" fill="none"><path d={svgPaths.p91c0280} stroke="#015AAA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/></svg>, label1: "Expert-Led", label2: "Security" },
              { icon: <svg width="52" height="58" viewBox="0 0 51 56.5404" fill="none"><path d={svgPaths.p35f7eb80} stroke="#015AAA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/></svg>, label1: "Proactive", label2: "Protection" },
              { icon: <svg width="56" height="56" viewBox="0 0 48.6877 48.6465" fill="none"><path d={svgPaths.pe5e6700} stroke="#015AAA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/><path d={svgPaths.p308e5280} stroke="#015AAA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/></svg>, label1: "24/7 Threat", label2: "Monitoring" },
            ].map((item, i) => (
              <div key={i} className="flex items-stretch">
                <div className="flex flex-col items-center gap-3 flex-1 px-4">
                  <div className="flex items-center justify-center w-16 h-16">{item.icon}</div>
                  <div className="text-center">
                    <p style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 700, fontSize: "16px", color: "#000", letterSpacing: "0.32px", textAlign: "center" }}>{item.label1}</p>
                    <p style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 700, fontSize: "16px", color: "#000", letterSpacing: "0.32px", textAlign: "center" }}>{item.label2}</p>
                  </div>
                </div>
                {i < 2 && <div className="w-[1.5px] self-stretch" style={{ background: "#C6C6C6", minHeight: "100px" }} />}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: services illustration with parallax */}
        <motion.div ref={imgRef} className="flex-1 min-w-0 relative" variants={fadeRight} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
          <motion.img
            src={imgServices1}
            alt="Smart Solutions – Security illustration"
            className="w-full h-auto"
            style={{ y, objectFit: "contain", maxHeight: "520px" }}
          />
          <div className="absolute -z-10 inset-0 blur-3xl opacity-15"
            style={{ background: "radial-gradient(circle at 50% 40%, #015AAA 0%, transparent 70%)" }} />
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   SERVICE CARDS — 8 cards
══════════════════════════════════════════════════════════════════════ */
const serviceCards = [
  { img: imgWebSecurity,   title: "Web Security",                    desc: "Secure your web apps with advanced vulnerability detection and real-time threat mitigation." },
  { img: imgCloudSecurity, title: "Cloud Security",                  desc: "Secure cloud infrastructure and integrate security into your dev lifecycle seamlessly." },
  { img: imgAppSecurity,   title: "Application Security",            desc: "Create innovative frameworks to build executable software security with privacy and trust." },
  { img: imgNetworkSec,    title: "Network Security",                desc: "Create innovative frameworks to executable software security — built for privacy and trust." },
  { img: imgEncryption,    title: "Encryption & Data Protection",    desc: "Create innovative frameworks to executable software security we built, privacy, and trust." },
  { img: imgWebDev,        title: "Full-Stack Web Development",      desc: "Scalable, high-performance web applications built with modern technologies." },
  { img: imgUIUX,          title: "Web Design & UI/UX Development",  desc: "Pixel-perfect designs and intuitive experiences that engage users and drive results." },
  { img: imgAcademic,      title: "Academic Training",               desc: "Practical training and real-world learning experiences that build skills and prepare you for industry." },
];

function ServiceCardsSection() {
  return (
    <section className="w-full py-20 px-8 md:px-14 lg:px-20 overflow-hidden" style={{ background: "#F8FAFE" }}>
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceCards.map((card, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              custom={i % 4}
              className="relative rounded-[14px] bg-white flex flex-col overflow-hidden cursor-pointer group"
              style={{ boxShadow: "inset 0px 2px 10px 0px rgba(23,107,240,0.25)", minHeight: "360px" }}
              whileHover={{ y: -6, boxShadow: "inset 0px 2px 10px 0px rgba(23,107,240,0.4), 0 12px 32px rgba(1,90,170,0.15)" }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
            >
              {/* Image */}
              <div className="w-full h-[160px] flex items-center justify-center relative overflow-hidden p-6 rounded-t-[14px]">
                <motion.img
                  src={card.img}
                  alt={card.title}
                  className="relative z-10 w-auto h-full max-h-[100px] object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Text */}
              <div className="px-6 pb-6 flex flex-col gap-2 flex-1">
                <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "20px", color: "#111827", margin: 0, lineHeight: "35px" }}>
                  {card.title}
                </h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "14px", color: "#6B7280", lineHeight: "22px", margin: 0 }}>
                  {card.desc}
                </p>
                {/* Arrow at the bottom right */}
                <div className="mt-auto pt-4 flex justify-end">
                  <div className="transition-transform duration-300 group-hover:translate-x-1">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#015AAA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Bottom blue accent */}
              <div className="absolute bottom-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-[14px]"
                style={{ background: "linear-gradient(90deg, #015AAA, #176bf0)" }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   OUR PROCESS — 5 steps with arrows
═════════════════════════════════════════════════════════════════════ */
const processSteps = [
  {
    num: "01", title: "Discover",
    desc: "We analyse your needs, challenges, and goals.",
    icon: (
      <svg width="70" height="70" fill="none" viewBox="0 0 70 70">
        <rect fill="#015AAA" fillOpacity="0.15" height="70" rx="12" width="70" />
        <path d={svgPaths.p1d14d600} fill="#015AAA" />
      </svg>
    ),
  },
  {
    num: "02", title: "Plan",
    desc: "We design a tailored strategy and roadmap.",
    icon: (
      <svg width="70" height="70" fill="none" viewBox="0 0 70 70">
        <rect fill="#015AAA" fillOpacity="0.15" height="70" rx="12" width="70" />
        <path d={svgPaths.p25ae1080} fill="#015AAA" />
        <path d={svgPaths.p24172b00} fill="#015AAA" />
      </svg>
    ),
  },
  {
    num: "03", title: "Build",
    desc: "We develop with best practices and cutting-edge technologies.",
    icon: (
      <svg width="70" height="70" fill="none" viewBox="0 0 70 70">
        <rect fill="#015AAA" fillOpacity="0.15" height="70" rx="12" width="70" />
        <g>
          <path d={svgPaths.pa064e00} stroke="#015AAA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
          <path d={svgPaths.p39374772} stroke="#015AAA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
      </svg>
    ),
  },
  {
    num: "04", title: "Secure",
    desc: "We test, validate, and ensure robust security.",
    icon: (
      <svg width="70" height="70" fill="none" viewBox="0 0 70 70">
        <rect fill="#015AAA" fillOpacity="0.15" height="70" rx="12" width="70" />
        <path d={svgPaths.p17885a00} fill="#015AAA" />
      </svg>
    ),
  },
  {
    num: "06", title: "Deliver",
    desc: "We deploy and provide ongoing support.",
    icon: (
      <svg width="70" height="70" fill="none" viewBox="0 0 70 70">
        <rect fill="#015AAA" fillOpacity="0.15" height="70" rx="12" width="70" />
        <path d={svgPaths.p1a588000} fill="#015AAA" />
        <path d={svgPaths.p2cb01300} fill="#015AAA" />
        <path d={svgPaths.p2bc0e600} fill="#015AAA" />
      </svg>
    ),
  },
];

function ArrowIcon() {
  return (
    <div className="flex-shrink-0 hidden lg:flex items-center justify-center px-1 mt-[-60px]">
      <svg width="20" height="12" viewBox="0 0 18.5 11.5" fill="none">
        <path d={svgPaths.p20b5e500} stroke="#015AAA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

function OurProcessSection() {
  return (
    <section className="w-full bg-white py-20 px-8 md:px-14 lg:px-20 overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: "18px", letterSpacing: "1.2px", color: "#015AAA", textTransform: "uppercase", marginBottom: "18px" }}>
          Our Process
        </motion.p>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
          style={{ fontFamily: "'Geist',sans-serif", fontWeight: 700, fontSize: "clamp(28px,3.8vw,52px)", letterSpacing: "1.12px", color: "#000", lineHeight: 1.1, marginBottom: "14px" }}>
          How We Deliver Excellence
        </motion.div>
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}
          style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 500, fontSize: "18px", letterSpacing: "0.4px", color: "#6D6D6D", lineHeight: 1.65, marginBottom: "48px", maxWidth: "580px" }}>
          We combine expertise, technology, and dedication to deliver solutions that drive growth and security.
        </motion.p>

        {/* Step cards row */}
        <div className="flex flex-col lg:flex-row items-start gap-4 lg:gap-0">
          {processSteps.map((step, i) => (
            <div key={i} className="flex items-center w-full lg:w-auto lg:flex-1">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="relative rounded-[14px] bg-white flex flex-col items-center gap-4 p-8 w-full"
                style={{ boxShadow: "inset 0px 2px 10px 0px rgba(23,107,240,0.25)", minHeight: "300px", justifyContent: "center" }}
                whileHover={{ y: -6, boxShadow: "inset 0px 2px 10px 0px rgba(23,107,240,0.4), 0 12px 32px rgba(1,90,170,0.12)" }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
              >
                {step.icon}
                <p style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 700, fontSize: "32px", letterSpacing: "0.64px", color: "#015AAA", margin: 0 }}>{step.num}</p>
                <p style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 700, fontSize: "26px", letterSpacing: "0.52px", color: "#030108", margin: 0 }}>{step.title}</p>
                <p style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 400, fontSize: "15px", color: "#000", textAlign: "center", letterSpacing: "0.3px", lineHeight: "26px", margin: 0 }}>{step.desc}</p>
              </motion.div>

              {/* Arrow connector (not after last step) */}
              {i < processSteps.length - 1 && <ArrowIcon />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   WHY CHOOSE US
══════════════════════════════════════════════════════════════════════ */
const whyFeatures = [
  {
    title: "Security First Approach",
    desc: "We prioritise security in every solution we build.",
    icon: (
      <svg width="70" height="70" fill="none" viewBox="0 0 70 70">
        <rect fill="#015AAA" fillOpacity="0.15" height="70" rx="12" width="70" />
        <path d={svgPaths.p24ca6630} stroke="#015AAA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
      </svg>
    ),
  },
  {
    title: "Tailored Solutions",
    desc: "Custom solutions designed to fit your unique business needs.",
    icon: (
      <svg width="70" height="70" fill="none" viewBox="0 0 70 70">
        <rect fill="#015AAA" fillOpacity="0.15" height="70" rx="12" width="70" />
        <path d={svgPaths.p25ae1080} fill="#015AAA" />
        <path d={svgPaths.p24172b00} fill="#015AAA" />
      </svg>
    ),
  },
  {
    title: "Advanced Technology",
    desc: "Leveraging the latest tools and frameworks for impactful results.",
    icon: (
      <svg width="70" height="70" fill="none" viewBox="0 0 70 70">
        <rect fill="#015AAA" fillOpacity="0.15" height="70" rx="12" width="70" />
        <path d="M28 28H42V42H28V28Z" fill="#015AAA" />
        <path d={svgPaths.p11219e00} fill="#015AAA" />
      </svg>
    ),
  },
  {
    title: "Reliable Support",
    desc: "24/7 support and continuous monitoring for your peace of mind.",
    icon: (
      <svg width="70" height="70" fill="none" viewBox="0 0 70 70">
        <rect fill="#015AAA" fillOpacity="0.15" height="70" rx="12" width="70" />
        <path d={svgPaths.p3ef4e500} stroke="#015AAA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        <path d={svgPaths.p2aa32d80} stroke="#015AAA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
      </svg>
    ),
  },
  {
    title: "Proven Track Record",
    desc: "Trusted by businesses and institutions worldwide.",
    icon: (
      <svg width="70" height="70" fill="none" viewBox="0 0 70 70">
        <rect fill="#015AAA" fillOpacity="0.15" height="70" rx="12" width="70" />
        <path d={svgPaths.p293f3a00} fill="#015AAA" />
      </svg>
    ),
  },
];

function WhyChooseUsSection() {
  const imgRef = useRef<HTMLDivElement>(null);
  const y = useParallax(imgRef, 50);

  return (
    <section className="relative w-full bg-white overflow-hidden py-20 px-8 md:px-14 lg:px-20">
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center gap-14 lg:gap-10">

        {/* Left */}
        <div className="flex-1 min-w-0">
          <motion.p variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}
            style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: "18px", letterSpacing: "1.2px", color: "#015AAA", textTransform: "uppercase", marginBottom: "4px" }}>
            Why Choose Us
          </motion.p>
          <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}
            style={{ fontFamily: "'Geist',sans-serif", fontWeight: 700, fontSize: "clamp(26px,3.6vw,50px)", letterSpacing: "1px", color: "#000", lineHeight: 1.1 }}>
            Your Trusted Partner<br />in Security &amp; Innovation
          </motion.div>
          <motion.p variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}
            style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 500, fontSize: "18px", letterSpacing: "0.4px", color: "#6D6D6D", lineHeight: 1.65, maxWidth: "480px" }}>
            We combine expertise, technology, and dedication to deliver solutions that drive growth and security.
          </motion.p>

          {/* Illustration with parallax */}
          <div ref={imgRef} className="relative overflow-hidden rounded-[16px] mt-4">
            <motion.img
              src={imgWhyChooseUs1}
              alt="Why Choose NebulaSafeTech"
              className="w-full h-auto rounded-[16px]"
              style={{ y, maxHeight: "420px", objectFit: "cover", objectPosition: "center top" }}
            />
          </div>
        </div>

        {/* Right: feature cards */}
        <div className="flex-1 min-w-0 flex flex-col gap-4">
          {whyFeatures.map((feat, i) => (
            <motion.div
              key={i}
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              className="relative rounded-[14px] bg-white p-5 flex items-start gap-5 overflow-hidden group"
              style={{ boxShadow: "inset 0px 2px 10px 0px rgba(23,107,240,0.25)" }}
              whileHover={{ x: 6, boxShadow: "inset 0px 2px 10px 0px rgba(23,107,240,0.4), 0 6px 24px rgba(1,90,170,0.1)" }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
            >
              <div className="flex-shrink-0">{feat.icon}</div>
              <div className="flex flex-col gap-1 pt-1">
                <p style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 700, fontSize: "18px", letterSpacing: "0.36px", color: "#030108", margin: 0 }}>{feat.title}</p>
                <p style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 400, fontSize: "14px", color: "#000", letterSpacing: "0.28px", lineHeight: "26px", margin: 0 }}>{feat.desc}</p>
              </div>
              {/* Hover accent */}
              <div className="absolute left-0 top-0 bottom-0 w-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-l-[14px]"
                style={{ background: "linear-gradient(180deg, #015AAA, #176bf0)" }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════════════════════ */
export default function ServicesPage() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    window.scrollTo(0, 0);
    return () => { document.documentElement.style.scrollBehavior = ""; };
  }, []);

  return (
    <div className="w-full min-h-screen bg-white overflow-x-hidden">
      <TopNav />
      <BottomNav />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <ServicesHero />
        <ServiceCardsSection />
        <OurProcessSection />
        <WhyChooseUsSection />
        <FooterSection />
      </motion.div>
    </div>
  );
}