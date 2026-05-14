import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, Variants } from "motion/react";
import svgPaths from "../../imports/NstWebsiteV2AboutUs/svg-n77cdd2snf";
import FooterSection from "../components/FooterSection";
import AnimatedNumber from "../components/AnimatedNumber";

import TopNav from "../components/TopNav";
import ScrollToTop from "../components/ScrollToTop";
import { enableSmoothScroll, resetScrollBehavior, scrollToTopInstant } from "../utils/scroll";

/* â”€â”€ Image assets â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
import imgDashboard from "../../assets/about-hero.png";
import imgTeam from "../../assets/about-team.png";
import imgLogoThirukkural from "../../assets/logo-thirukkural-transport.png";
import imgLogoStJoseph from "../../assets/logo-st-joseph-college.png";
import imgLogoSolamalai from "../../assets/logo-solamalai-college.png";
import imgLogoDhanalakshmi from "../../assets/logo-dhanalakshmi-srinivasan.png";
import imgLogoAkshaya from "../../assets/logo-akshaya-college.png";
import imgLogoNsr from "../../assets/logo-nsr.png";
import imgLogoSgnl from "../../assets/logo-sgnl.png";
import imgLogoTwomile from "../../assets/logo-twomile-heavy-industries.png";
import imgLogoRapido from "../../assets/logo-rapido.png";
import imgLogoP2Task from "../../assets/logo-p2task.png";

/* â”€â”€ Parallax hook â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function useParallax(ref: React.RefObject<HTMLDivElement | null>, distance = 60) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  return useTransform(scrollYProgress, [0, 1], [-distance, distance]);
}

/* â”€â”€ Animation variants â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   HERO â€” "Built by defenders, for defenders"
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function HeroAboutSection() {
  const imgRef = useRef<HTMLDivElement>(null);
  const y = useParallax(imgRef, 40);

  return (
    <section className="w-full bg-white overflow-hidden pt-32 pb-20 px-8 md:px-14 lg:px-20">
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center gap-14 lg:gap-20">
        {/* Left: content */}
        <div className="flex-1 min-w-0">
          {/* Label */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            style={{
              fontFamily: 'var(--font-family)',
              fontWeight: 700,
              fontSize: "18px",
              letterSpacing: "1.2px",
              color: "#015AAA",
              textTransform: "uppercase",
              marginBottom: "18px",
            }}
          >
            About Us
          </motion.p>

          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            style={{
              fontFamily: 'var(--font-family)',
              fontWeight: 700,
              fontSize: "clamp(32px, 4vw, 52px)",
              letterSpacing: "0.96px",
              color: "#000",
              lineHeight: 1.1,
              marginBottom: "20px",
            }}
          >
            Built by defenders,
            <br />
            for defenders.
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            style={{
              fontFamily: 'var(--font-family)',
              fontWeight: 500,
              fontSize: "18px",
              letterSpacing: "0.4px",
              color: "#6D6D6D",
              lineHeight: 1.65,
              marginBottom: "44px",
              maxWidth: "520px",
            }}
          >
            <span style={{ fontFamily: 'var(--font-family)' }}>NebulaSafeTech</span> was founded by cybersecurity experts with a mission
            to deliver enterprise-grade protection through innovation,
            transparency, and relentless dedication.
          </motion.p>

          {/* Feature icons row */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={3}
            className="flex items-center gap-0 border border-slate-100 rounded-2xl p-6 bg-slate-50/30 shadow-sm"
          >
            {/* Expert-Led Security */}
            <div className="flex flex-col items-center gap-3 flex-1 pr-6">
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
                <p style={{ fontFamily: 'var(--font-family)', fontWeight: 700, fontSize: "16px", color: "#000", letterSpacing: "0.32px", textAlign: "center" }}>
                  Expert-Led
                </p>
                <p style={{ fontFamily: 'var(--font-family)', fontWeight: 700, fontSize: "16px", color: "#000", letterSpacing: "0.32px", textAlign: "center" }}>
                  Security
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="w-[1px] self-stretch mx-2" style={{ background: "#e2e8f0", minHeight: "80px" }} />

            {/* Proactive Protection */}
            <div className="flex flex-col items-center gap-3 flex-1 px-6">
              <div className="w-[64px] h-[64px] relative overflow-hidden">
                <svg className="w-full h-full" fill="none" viewBox="0 0 51 56.5404">
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
                <p style={{ fontFamily: 'var(--font-family)', fontWeight: 700, fontSize: "16px", color: "#000", letterSpacing: "0.32px", textAlign: "center" }}>
                  Proactive
                </p>
                <p style={{ fontFamily: 'var(--font-family)', fontWeight: 700, fontSize: "16px", color: "#000", letterSpacing: "0.32px", textAlign: "center" }}>
                  Protection
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="w-[1px] self-stretch mx-2" style={{ background: "#e2e8f0", minHeight: "80px" }} />

            {/* 24/7 */}
            <div className="flex flex-col items-center gap-3 flex-1 pl-6">
              <div className="w-[64px] h-[64px] relative overflow-hidden flex items-center justify-center">
                <svg className="w-full h-full" fill="none" viewBox="0 0 48.6877 48.6465">
                  <path d={svgPaths.pe5e6700} stroke="#015AAA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                  <path d={svgPaths.p308e5280} stroke="#015AAA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                </svg>
              </div>
              <div className="text-center">
                <p style={{ fontFamily: 'var(--font-family)', fontWeight: 700, fontSize: "16px", color: "#000", letterSpacing: "0.32px", textAlign: "center" }}>
                  24/7 Threat
                </p>
                <p style={{ fontFamily: 'var(--font-family)', fontWeight: 700, fontSize: "16px", color: "#000", letterSpacing: "0.32px", textAlign: "center" }}>
                  Monitoring
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right: dashboard image with parallax */}
        <motion.div
          ref={imgRef}
          className="flex-1 min-w-0 relative"
          variants={fadeRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div style={{ y }} className="overflow-hidden rounded-[16px]">
            <img
              src={imgDashboard}
              alt="Security metrics dashboard"
              className="w-full h-auto rounded-[16px]"
              style={{ boxShadow: "0 8px 40px rgba(1,90,170,0.15)" }}
            />
          </motion.div>
          {/* Decorative glow */}
          <div
            className="absolute -z-10 inset-0 blur-3xl opacity-20"
            style={{ background: "radial-gradient(circle at 60% 40%, #015AAA 0%, transparent 70%)" }}
          />
        </motion.div>
      </div>
    </section>
  );
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   OUR STORY â€” "Securing Today, Protecting Tomorrow"
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function OurStorySection() {
  const imgRef = useRef<HTMLDivElement>(null);
  const y = useParallax(imgRef, 55);

  return (
    <section className="w-full overflow-hidden py-20 px-8 md:px-14 lg:px-20" style={{ background: "#F8FAFE" }}>
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center gap-14 lg:gap-20">
        {/* Left: text */}
        <div className="flex-1 min-w-0">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            style={{
              fontFamily: 'var(--font-family)',
              fontWeight: 700,
              fontSize: "18px",
              letterSpacing: "1.2px",
              color: "#015AAA",
              textTransform: "uppercase",
              marginBottom: "18px",
            }}
          >
            Our Story
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            style={{
              fontFamily: 'var(--font-family)',
              fontWeight: 700,
              fontSize: "clamp(28px, 3.5vw, 48px)",
              letterSpacing: "0.96px",
              color: "#000",
              lineHeight: 1.15,
              marginBottom: "28px",
            }}
          >
            Securing Today,
            <br />
            Protecting Tomorrow
          </motion.div>

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
              style={{
                fontFamily: 'var(--font-family)',
                fontWeight: 500,
                fontSize: "18px",
                letterSpacing: "0.4px",
                color: "#6D6D6D",
                lineHeight: 1.65,
                marginBottom: i < 2 ? "20px" : "0",
              }}
            >
              {para}
            </motion.p>
          ))}
        </div>

        {/* Right: team photo with parallax */}
        <div ref={imgRef} className="flex-1 min-w-0 relative overflow-hidden rounded-[12px]">
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.img
              src={imgTeam}
              alt="NebulaSafeTech security operations team"
              className="w-full h-auto rounded-[12px]"
              style={{
                y,
                boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
                display: "block",
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   STATS â€” 99.98%, 100+, 10+
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
const statsData = [
  {
    value: "99.98%",
    label: "Customer Trust",
    icon: (
      <svg width="60" height="60" viewBox="0 0 44 48.617" fill="none">
        <path d={svgPaths.p9630160} stroke="#015AAA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
      </svg>
    ),
  },
  {
    value: "100+",
    label: "Clients Projects",
    icon: (
      <svg width="60" height="60" viewBox="0 0 49 41.5" fill="none">
        <path d={svgPaths.p32f12880} stroke="#015AAA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
      </svg>
    ),
  },
  {
    value: "10+",
    label: "Years of Experience",
    icon: (
      <svg width="60" height="60" viewBox="0 0 50 42.5" fill="none">
        <path d={svgPaths.p36902380} stroke="#015AAA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" />
      </svg>
    ),
  },
];

function StatsSection() {
  return (
    <section className="w-full bg-white py-16 px-8 md:px-14 lg:px-20">
      <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-0">
        {statsData.map((stat, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={i}
            className="flex items-center gap-5 flex-1 justify-center py-6 px-8"
            style={{
              borderRight: i < statsData.length - 1 ? "1px solid #E0E0E0" : "none",
            }}
          >
            <div
              className="flex items-center justify-center flex-shrink-0 rounded-[16px]"
              style={{
                width: 80,
                height: 80,
                background: "rgba(1,90,170,0.08)",
              }}
            >
              {stat.icon}
            </div>
            <div>
              <AnimatedNumber
                value={stat.value}
                style={{
                  fontFamily: 'var(--font-family)',
                  fontWeight: 700,
                  fontSize: "clamp(22px, 2.5vw, 28px)",
                  letterSpacing: "0.48px",
                  color: "#015AAA",
                  margin: 0,
                }}
              />
              <p
                style={{
                  fontFamily: 'var(--font-family)',
                  fontWeight: 700,
                  fontSize: "16px",
                  letterSpacing: "0.32px",
                  color: "#000",
                  margin: 0,
                }}
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

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   MISSION / VISION / VALUES
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function MissionVisionSection() {
  const cards = [
    {
      icon: (
        <svg width="90" height="90" fill="none" viewBox="0 0 90 90">
          <rect fill="#015AAA" fillOpacity="0.15" height="90" rx="12" width="90" />
          <path d={svgPaths.p23704a80} stroke="#015AAA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.5" />
        </svg>
      ),
      title: "Our Mission",
      content: (
        <p style={{ fontFamily: 'var(--font-family)', fontWeight: 400, fontSize: "17px", color: "#000", letterSpacing: "0.34px", lineHeight: 1.7, margin: 0 }}>
          To provide advanced, reliable, and affordable cybersecurity solutions that help organizations safeguard their digital assets and build a secure future.
        </p>
      ),
    },
    {
      icon: (
        <svg width="90" height="90" fill="none" viewBox="0 0 90 90">
          <rect fill="#015AAA" fillOpacity="0.15" height="90" rx="12" width="90" />
          <path d={svgPaths.p1b84cb00} fill="#015AAA" />
          <path d={svgPaths.p3c4d0b00} fill="#015AAA" />
        </svg>
      ),
      title: "Our Vision",
      content: (
        <p style={{ fontFamily: 'var(--font-family)', fontWeight: 400, fontSize: "17px", color: "#000", letterSpacing: "0.34px", lineHeight: 1.7, margin: 0 }}>
          To be a global leader in cybersecurity, recognized for innovation, integrity, and our commitment to a safer digital world.
        </p>
      ),
    },
    {
      icon: (
        <svg width="90" height="90" fill="none" viewBox="0 0 90 90">
          <rect fill="#015AAA" fillOpacity="0.15" height="90" rx="12" width="90" />
          <path d={svgPaths.p2bc40680} fill="#015AAA" />
          <path d={svgPaths.p16009380} fill="#015AAA" />
        </svg>
      ),
      title: "Our Values",
      content: (
        <ul style={{ fontFamily: 'var(--font-family)', fontWeight: 400, fontSize: "17px", color: "#000", letterSpacing: "0.34px", lineHeight: "30px", margin: 0, paddingLeft: "22px" }}>
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
        {/* Label */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            fontFamily: 'var(--font-family)',
            fontWeight: 700,
            fontSize: "18px",
            letterSpacing: "1.2px",
            color: "#015AAA",
            textTransform: "uppercase",
            marginBottom: "40px",
          }}
        >
          Our Mission, Vision &amp; Values
        </motion.p>

        {/* Cards */}
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
                boxShadow: "inset 0px 2px 10px 0px rgba(23,107,240,0.25), 0 2px 16px rgba(1,90,170,0.08)",
                border: "1px solid rgba(1,90,170,0.1)",
              }}
              whileHover={{ y: -6, boxShadow: "inset 0px 2px 10px 0px rgba(23,107,240,0.35), 0 12px 32px rgba(1,90,170,0.15)" }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
            >
              {card.icon}
              <p
                style={{
                  fontFamily: 'var(--font-family)',
                  fontWeight: 700,
                  fontSize: "clamp(24px, 2.5vw, 32px)",
                  letterSpacing: "0.64px",
                  color: "#015AAA",
                  margin: 0,
                }}
              >
                {card.title}
              </p>
              {card.content}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   PARTNERS / CLIENTS
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
const partnersRow1 = [
  { img: imgLogoThirukkural, alt: "Thirukkural Transport", size: 100 },
  { img: imgLogoStJoseph, alt: "St. Joseph College", size: 100 },
  { img: imgLogoSolamalai, alt: "Solamalai College", size: 100 },
  { img: imgLogoDhanalakshmi, alt: "Dhanalakshmi Srinivasan College", size: 100 },
  { img: imgLogoAkshaya, alt: "Akshaya College", size: 100 },
  { img: imgLogoNsr, alt: "NSR", size: 100 },
];

const partnersRow2 = [
  { img: imgLogoSgnl, alt: "SGNL", size: 100, wide: false },
  { img: imgLogoTwomile, alt: "Twomile Heavy Industries", size: 100, wide: false },
  { img: imgLogoRapido, alt: "Rapido", w: 187, h: 100, wide: true },
  { img: imgLogoP2Task, alt: "P2Task", w: 300, h: 83, wide: true },
];

function PartnersSection() {
  return (
    <section className="w-full bg-white py-20 px-8 md:px-14 lg:px-20 overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <motion.div
          variants={fadeLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12"
        >
          <p
            style={{
              fontFamily: 'var(--font-family)',
              fontWeight: 700,
              fontSize: "18px",
              letterSpacing: "1.2px",
              color: "#015AAA",
              textTransform: "uppercase",
              marginBottom: "14px",
            }}
          >
            Trusted by Industry &amp; Academia
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-family)',
              fontWeight: 700,
              fontSize: "clamp(28px, 3.5vw, 48px)",
              letterSpacing: "0.96px",
              color: "#000",
              margin: 0,
              marginBottom: "12px",
            }}
          >
            Partnering with Leaders Worldwide
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-family)',
              fontWeight: 500,
              fontSize: "18px",
              letterSpacing: "0.4px",
              color: "#6D6D6D",
              margin: 0,
            }}
          >
            We are proud to work with innovative companies and academic institutions
            that trust us to secure their digital future.
          </p>
        </motion.div>

        {/* Row 1 â€” 6 logos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 mb-5">
          {partnersRow1.map((p, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              className="bg-white flex items-center justify-center p-7 rounded-[24px]"
              style={{ boxShadow: "3px 3px 12px 0px rgba(1,90,170,0.25)" }}
              whileHover={{ scale: 1.06, boxShadow: "3px 3px 20px 0px rgba(1,90,170,0.4)" }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
            >
              <img src={p.img} alt={p.alt} style={{ width: p.size, height: p.size, objectFit: "contain" }} />
            </motion.div>
          ))}
        </div>

        {/* Row 2 â€” mix of normal + wide */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          {partnersRow2.map((p, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              className={`bg-white flex items-center justify-center p-7 rounded-[24px] ${p.wide ? "col-span-1" : ""}`}
              style={{ boxShadow: "3px 3px 12px 0px rgba(1,90,170,0.25)" }}
              whileHover={{ scale: 1.05, boxShadow: "3px 3px 20px 0px rgba(1,90,170,0.4)" }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
            >
              <img
                src={p.img}
                alt={p.alt}
                style={{
                  width: "w" in p ? p.w : 100,
                  height: "h" in p ? p.h : 100,
                  objectFit: "contain",
                  maxWidth: "100%",
                  maxHeight: "100px",
                }}
              />
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
      <TopNav />

      {/* Animated page entry */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <HeroAboutSection />
        <OurStorySection />
        <StatsSection />
        <MissionVisionSection />
        <PartnersSection />
        <FooterSection />
        <ScrollToTop />
      </motion.div>
    </div>
  );
}

