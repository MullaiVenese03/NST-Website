import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import svgPaths from "../../imports/NstWebsiteV2AboutUs/svg-n77cdd2snf";
import FooterSection from "../components/FooterSection";
import ScrollProgress from "../components/ScrollProgress";

/* ── Image assets ─────────────────────────────────────────────────────── */
import imgDashboard from "figma:asset/400481b24bdc692161b886edf58eada3268fa9ba.png";
import imgTeam from "figma:asset/b1169effe8d5ec2e34b3c9c91ae11e55589f5fc1.png";
import imgCtaBg from "figma:asset/37ceb5ac938ce2fd6393d41f091635f2ffdd3e00.png";
import imgLogoThirukkural from "figma:asset/cae0543e4d40907e740964425ebb330b97abe22f.png";
import imgLogoStJoseph from "figma:asset/e355fe2f1a3f31bcdfe0cd0d99f6f28dda47e72a.png";
import imgLogoSolamalai from "figma:asset/d5f607418c370acbaa1f40116cb7f71ec15f7cb5.png";
import imgLogoDhanalakshmi from "figma:asset/05c41322d27468edf456953a87abfdd7ea362d4c.png";
import imgLogoAkshaya from "figma:asset/b4f771cbee9a12e39c116157c446004997e7dcfd.png";
import imgLogoNsr from "figma:asset/8d795a174b249a3418f58c1303298a2b79e129da.png";
import imgLogoSgnl from "figma:asset/c352b1695ed894ec9f13b794b78bfd0a7a5ce52f.png";
import imgLogoTwomile from "figma:asset/5ef75f1a4d3f2b1d66fafc1493ce45d1bbc807cb.png";
import imgLogoRapido from "figma:asset/f8b4c2e6aa66f714e256226143405c3478a1db0e.png";
import imgLogoP2Task from "figma:asset/1a60c549e67b214eaed0516c16e0c4ed107c690a.png";

/* ── Parallax hook ─────────────────────────────────────────────────────── */
function useParallax(ref: React.RefObject<HTMLDivElement | null>, distance = 60) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  return useTransform(scrollYProgress, [0, 1], [-distance, distance]);
}

/* ── Animation variants ─────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.12, ease: "easeOut" },
  }),
};

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: "easeOut" },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: "easeOut" },
  },
};

/* ══════════════════════════════════════════════════════════════════════
   NAVBAR
══════════════════════════════════════════════════════════════════════ */
function NSTLogo() {
  return (
    <svg className="w-10 h-10 flex-shrink-0" fill="none" viewBox="0 0 56 58.0458">
      <g>
        <path d={svgPaths.p33731b00} fill="#015AAA" />
        <path d={svgPaths.p3959b800} fill="#015AAA" />
        <path d={svgPaths.p3b6ed900} fill="#015AAA" />
        <path d={svgPaths.p36cd8100} fill="#015AAA" />
        <path d={svgPaths.p2e60b400} fill="#015AAA" />
        <path d={svgPaths.p14a5c980} fill="#015AAA" />
        <path d={svgPaths.p3ac0a900} fill="#015AAA" />
        <path d={svgPaths.p12afe570} fill="#015AAA" />
        <path d={svgPaths.p1c269b00} fill="#015AAA" />
      </g>
    </svg>
  );
}

function AboutNavbar() {
  const navLinks = [
    { label: "Home",     href: "/",         isActive: false },
    { label: "About",    href: "/about",    isActive: true  },
    { label: "Services", href: "/services", isActive: false },
    { label: "Clients",  href: "/clients",  isActive: false },
    { label: "EdTech",   href: "/edtech",   isActive: false },
    { label: "NEX",      href: "/#nex",     isActive: false },
  ];

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#")) {
      e.preventDefault();
      window.location.href = href;
    }
  };

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 bg-white border-b border-[#e8ecf0]"
      style={{ boxShadow: "0 1px 12px rgba(1,90,170,0.08)" }}
    >
      <div className="max-w-[1440px] mx-auto px-8 md:px-14 flex items-center justify-between h-[72px]">
        {/* Logo + Brand */}
        <a href="/" className="flex items-center gap-3 no-underline">
          <NSTLogo />
          <span
            style={{
              fontFamily: "'Overcame Demo', 'Geist', sans-serif",
              fontWeight: 700,
              fontSize: "22px",
              letterSpacing: "1.4px",
              color: "#030108",
            }}
          >
            NebulaSafeTech
          </span>
        </a>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNav(e, link.href)}
              className="px-5 py-2 rounded-full no-underline cursor-pointer transition-colors duration-200"
              style={{
                fontFamily: "'Satoshi', sans-serif",
                fontWeight: 700,
                fontSize: "16px",
                letterSpacing: "0.32px",
                color: link.isActive ? "#015AAA" : "#000",
                background: link.isActive ? "#f0f6ff" : "transparent",
                textDecoration: "none",
              }}
              whileHover={{ scale: 1.04, background: "#f0f6ff", color: "#015AAA" }}
              whileTap={{ scale: 0.97 }}
            >
              {link.label}
            </motion.a>
          ))}
        </div>

        {/* Contact button */}
        <motion.a
          href="/#contact"
          className="flex items-center gap-2 no-underline"
          style={{
            background: "#015AAA",
            borderRadius: "8px",
            padding: "10px 18px",
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
        >
          <span
            style={{
              fontFamily: "'Satoshi', sans-serif",
              fontWeight: 700,
              fontSize: "15px",
              color: "#fff",
              letterSpacing: "0.6px",
            }}
          >
            Contact
          </span>
          <svg width="16" height="10" viewBox="0 0 19.5 11.5" fill="none">
            <path
              d={svgPaths.p3c346e80}
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </svg>
        </motion.a>
      </div>
    </motion.nav>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   HERO — "Built by defenders, for defenders"
══════════════════════════════════════════════════════════════════════ */
function HeroAboutSection() {
  const imgRef = useRef<HTMLDivElement>(null);
  const y = useParallax(imgRef, 40);

  return (
    <section className="w-full bg-white overflow-hidden py-20 px-8 md:px-14 lg:px-20">
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
              fontFamily: "'Inter', sans-serif",
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
              fontFamily: "'Geist', sans-serif",
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
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 500,
              fontSize: "18px",
              letterSpacing: "0.4px",
              color: "#6D6D6D",
              lineHeight: 1.65,
              marginBottom: "44px",
              maxWidth: "520px",
            }}
          >
            NebulaSafeTech was founded by cybersecurity experts with a mission
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
            className="flex items-center gap-0"
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
                <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: "16px", color: "#000", letterSpacing: "0.32px", textAlign: "center" }}>
                  Expert-Led
                </p>
                <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: "16px", color: "#000", letterSpacing: "0.32px", textAlign: "center" }}>
                  Security
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="w-[1.5px] self-stretch mx-2" style={{ background: "#C6C6C6", minHeight: "100px" }} />

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
                <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: "16px", color: "#000", letterSpacing: "0.32px", textAlign: "center" }}>
                  Proactive
                </p>
                <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: "16px", color: "#000", letterSpacing: "0.32px", textAlign: "center" }}>
                  Protection
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="w-[1.5px] self-stretch mx-2" style={{ background: "#C6C6C6", minHeight: "100px" }} />

            {/* 24/7 */}
            <div className="flex flex-col items-center gap-3 flex-1 pl-6">
              <div className="w-[64px] h-[64px] relative overflow-hidden flex items-center justify-center">
                <svg className="w-full h-full" fill="none" viewBox="0 0 48.6877 48.6465">
                  <path d={svgPaths.pe5e6700} stroke="#015AAA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                  <path d={svgPaths.p308e5280} stroke="#015AAA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                </svg>
              </div>
              <div className="text-center">
                <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: "16px", color: "#000", letterSpacing: "0.32px", textAlign: "center" }}>
                  24/7 Threat
                </p>
                <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: "16px", color: "#000", letterSpacing: "0.32px", textAlign: "center" }}>
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

/* ══════════════════════════════════════════════════════════════════════
   OUR STORY — "Securing Today, Protecting Tomorrow"
══════════════════════════════════════════════════════════════════════ */
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
              fontFamily: "'Inter', sans-serif",
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
              fontFamily: "'Geist', sans-serif",
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
            "We started with a simple belief — security should be proactive, intelligent, and accessible to every organization.",
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
                fontFamily: "'Manrope', sans-serif",
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

/* ══════════════════════════════════════════════════════════════════════
   STATS — 99.98%, 100+, 10+
══════════════════════════════════════════════════════════════════════ */
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
              <p
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(22px, 2.5vw, 28px)",
                  letterSpacing: "0.48px",
                  color: "#015AAA",
                  margin: 0,
                }}
              >
                {stat.value}
              </p>
              <p
                style={{
                  fontFamily: "'Manrope', sans-serif",
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

/* ══════════════════════════════════════════════════════════════════════
   MISSION / VISION / VALUES
══════════════════════════════════════════════════════════════════════ */
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
        <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: "17px", color: "#000", letterSpacing: "0.34px", lineHeight: 1.7, margin: 0 }}>
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
        <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: "17px", color: "#000", letterSpacing: "0.34px", lineHeight: 1.7, margin: 0 }}>
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
        <ul style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: "17px", color: "#000", letterSpacing: "0.34px", lineHeight: "30px", margin: 0, paddingLeft: "22px" }}>
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
            fontFamily: "'Inter', sans-serif",
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
                  fontFamily: "'Manrope', sans-serif",
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

/* ══════════════════════════════════════════════════════════════════════
   PARTNERS / CLIENTS
══════════════════════════════════════════════════════════════════════ */
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
              fontFamily: "'Inter', sans-serif",
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
              fontFamily: "'Geist', sans-serif",
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
              fontFamily: "'Manrope', sans-serif",
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

        {/* Row 1 — 6 logos */}
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

        {/* Row 2 — mix of normal + wide */}
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

/* ══════════════════════════════════════════════════════════════════════
   CTA BANNER
══════════════════════════════════════════════════════════════════════ */
function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={sectionRef} className="w-full px-8 md:px-14 lg:px-20 py-12 bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        <motion.div
          className="relative rounded-[12px] overflow-hidden"
          style={{ minHeight: "240px" }}
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Background image with parallax */}
          <motion.div
            className="absolute inset-0"
            style={{ y: bgY, scale: 1.15 }}
          >
            <img
              src={imgCtaBg}
              alt=""
              className="w-full h-full object-cover"
              style={{ objectPosition: "center" }}
            />
          </motion.div>

          {/* Dark overlay */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(105deg, rgba(1,40,90,0.92) 0%, rgba(1,90,170,0.75) 60%, transparent 100%)" }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 px-10 md:px-14 py-14">
            <div style={{ maxWidth: "660px" }}>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.1 }}
                style={{
                  fontFamily: "'Geist', sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(22px, 3vw, 32px)",
                  letterSpacing: "2px",
                  color: "#fff",
                  margin: 0,
                  marginBottom: "14px",
                  lineHeight: 1.25,
                }}
              >
                Let's Build a Safer Digital Future Together
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.22 }}
                style={{
                  fontFamily: "'Geist', sans-serif",
                  fontWeight: 400,
                  fontSize: "15px",
                  letterSpacing: "2px",
                  color: "#C6C6C6",
                  lineHeight: 1.625,
                  margin: 0,
                }}
              >
                Whether you're a start-up or an enterprise, NebulaSafeTech is here
                to secure your journey.
              </motion.p>
            </div>

            {/* Get in Touch button */}
            <motion.a
              href="/#contact"
              className="flex-shrink-0 flex items-center gap-2 no-underline group"
              style={{
                background: "#fff",
                borderRadius: "8px",
                padding: "12px 18px",
              }}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
            >
              <span
                style={{
                  fontFamily: "'Satoshi', sans-serif",
                  fontWeight: 700,
                  fontSize: "13px",
                  letterSpacing: "0.96px",
                  color: "#015AAA",
                  textTransform: "uppercase",
                }}
              >
                Get in Touch
              </span>
              <svg width="13" height="10" viewBox="0 0 13.5 9.5" fill="none" className="transition-transform duration-200 group-hover:translate-x-0.5">
                <path d={svgPaths.pbf23500} stroke="#015AAA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              </svg>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════════════════════ */
export default function AboutPage() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    window.scrollTo(0, 0);
    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-white overflow-x-hidden">
      <ScrollProgress />
      <AboutNavbar />

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
        <CTASection />
        <FooterSection />
      </motion.div>
    </div>
  );
}