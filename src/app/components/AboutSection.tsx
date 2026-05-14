import { motion, Variants } from "motion/react";
import svgPaths from "../../imports/AboutSection/svg-s1i9qf01my";
import imgAbout from "../../assets/about-hero.png";

function UsersIcon() {
  return (
    <svg width="54" height="48" viewBox="0 0 57 48" fill="none">
      <path
        d={svgPaths.p91c0280}
        stroke="#015AAA"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg width="48" height="56" viewBox="0 0 51 56.5404" fill="none">
      <path
        d={svgPaths.p35f7eb80}
        stroke="#015AAA"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      />
    </svg>
  );
}

function Hours24Icon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48.6877 48.6473" fill="none">
      <path
        d={svgPaths.pe5e6700}
        stroke="#015AAA"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      />
      <path
        d={svgPaths.p1ba05580}
        stroke="#015AAA"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      />
    </svg>
  );
}

const features = [
  { icon: <UsersIcon />, label1: "Expert-Led", label2: "Security" },
  { icon: <ShieldCheckIcon />, label1: "Proactive", label2: "Protection" },
  { icon: <Hours24Icon />, label1: "24/7 Threat", label2: "Monitoring" },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.12, ease: "easeOut" },
  }),
};

export default function AboutSection() {
  return (
    <section className="w-full bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-stretch min-h-[499px]">
        {/* Left â€“ Image */}
        <motion.div
          className="relative w-full lg:w-[53%] min-h-[340px] lg:min-h-[499px] overflow-hidden"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <img
            src={imgAbout}
            alt="NST dashboard showing threats blocked and security posture"
            className="w-full h-full object-cover object-left-top"
            style={{ minHeight: "340px" }}
          />
        </motion.div>

        {/* Right â€“ Content */}
        <div className="flex-1 flex flex-col justify-center px-12 lg:px-16 py-14 lg:py-0">
          {/* Label */}
          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{
              fontFamily: 'var(--font-family)',
              fontWeight: 700,
              fontSize: "20px",
              letterSpacing: "1.2px",
              color: "#015AAA",
              textTransform: "uppercase",
              marginBottom: "18px",
            }}
          >
            About Us
          </motion.p>

          {/* Heading */}
          <motion.h2
            custom={1}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{
              fontFamily: 'var(--font-family)',
              fontWeight: 700,
              fontSize: "clamp(32px, 3.5vw, 48px)",
              letterSpacing: "0.96px",
              color: "#000",
              lineHeight: 1.1,
              marginBottom: "20px",
            }}
          >
            Built by defenders,
            <br />
            for defenders.
          </motion.h2>

          {/* Description */}
          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{
              fontFamily: 'var(--font-family)',
              fontWeight: 500,
              fontSize: "18px",
              letterSpacing: "0.4px",
              color: "#6d6d6d",
              lineHeight: 1.65,
              marginBottom: "40px",
              maxWidth: "480px",
            }}
          >
            <span style={{ fontFamily: 'var(--font-family)' }}>NebulaSafeTech</span> was founded by cybersecurity experts with a mission to
            deliver enterprise - grade protection through innovation, transparency,
            and relentless dedication.
          </motion.p>

          {/* Feature icons row */}
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex items-center gap-0 border border-slate-100 rounded-2xl p-6 bg-slate-50/30 shadow-sm mb-10"
            style={{ maxWidth: "520px" }}
          >
            {features.map((f, i) => (
              <div key={i} className="flex-1 flex items-center">
                <div className="flex-1 flex flex-col items-center gap-3">
                  <div className="h-[60px] flex items-center justify-center">
                    {f.icon}
                  </div>
                  <p
                    style={{
                      fontFamily: 'var(--font-family)',
                      fontWeight: 700,
                      fontSize: "16px",
                      letterSpacing: "0.36px",
                      color: "#000",
                      textAlign: "center",
                      lineHeight: 1.4,
                    }}
                  >
                    {f.label1}
                    <br />
                    {f.label2}
                  </p>
                </div>
                {/* Vertical divider */}
                {i < features.length - 1 && (
                  <div
                    className="w-[1.5px] self-stretch mx-2"
                    style={{ background: "#e2e8f0", minHeight: "80px" }}
                  />
                )}
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.a
            custom={4}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            href="/about"
            className="inline-flex items-center gap-3 group"
            style={{
              fontFamily: 'var(--font-family)',
              fontWeight: 700,
              fontSize: "16px",
              letterSpacing: "1px",
              color: "#015AAA",
              textDecoration: "none",
            }}
          >
            Learn more about us
            <svg
              width="20"
              height="12"
              viewBox="0 0 20 12"
              fill="none"
              className="transition-transform duration-200 group-hover:translate-x-1"
            >
              <path
                d="M19 6L14 1M19 6L14 11M19 6H1"
                stroke="#015AAA"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.a>
        </div>
      </div>
    </section>
  );
}

