import { motion, Variants } from "motion/react";
import svgPaths from "../../imports/NexSection/svg-rp6a4ek3k8";

import imgIcon1 from "../../assets/Icons/step-1.png";
import imgIcon2 from "../../assets/Icons/step-2.png";
import imgIcon3 from "../../assets/Icons/step-3.png";
import imgIcon4 from "../../assets/Icons/step-4.png";

const features = [
  { icon: imgIcon1, w: 52, h: 54, label1: "Powered", label2: "Threat Detection" },
  { icon: imgIcon2, w: 53, h: 54, label1: "Autonomous", label2: "Response" },
  { icon: imgIcon3, w: 54, h: 54, label1: "Unified Security", label2: "Dashboard" },
  { icon: imgIcon4, w: 63, h: 54, label1: "Built for the", label2: "Enterprise" },
];

function NexLogo() {
  return (
    <svg
      width="100%"
      viewBox="0 0 431.152 140"
      fill="none"
      style={{ maxWidth: "380px", display: "block" }}
    >
      {/* E */}
      <path d={svgPaths.p2ddc4500} fill="#0B0F19" />
      {/* N */}
      <path d={svgPaths.p588f500} fill="#0B0F19" />
      {/* Keyhole circle */}
      <circle cx="359.27" cy="63.7352" r="6.73516" fill="#0B0F19" />
      {/* Keyhole body */}
      <path d={svgPaths.p3285e100} fill="#0B0F19" />
      {/* X â€” blue parts */}
      <path d={svgPaths.p1b450300} fill="#2563EB" />
      <path d={svgPaths.p3e9d6e00} fill="#2563EB" />
      <path d={svgPaths.p2443e480} fill="#2563EB" />
      <path d={svgPaths.p16f85f00} fill="#2563EB" />
    </svg>
  );
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

export default function NexSection() {
  return (
    <section className="w-full bg-white py-12 px-6 md:px-10 lg:px-16 overflow-hidden">
      <div
        className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-0"
        style={{
          border: "1px solid #f1f5f9",
          borderRadius: "24px",
          padding: "48px",
          background: "#fff",
          boxShadow: "0 10px 40px -10px rgba(1, 90, 170, 0.08)",
        }}
      >
        {/* Left â€“ Content */}
        <div className="flex-1 flex flex-col">
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
              marginBottom: "20px",
            }}
          >
            NEX - Next Generation Security Platform
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
              fontSize: "clamp(26px, 3vw, 32px)",
              letterSpacing: "0.64px",
              color: "#000",
              margin: 0,
              marginBottom: "16px",
              lineHeight: 1.2,
            }}
          >
            The future of adaptive
            <br />
            security is coming.
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
              fontWeight: 400,
              fontSize: "14px",
              letterSpacing: "2px",
              color: "#4a5565",
              lineHeight: 1.625,
              marginBottom: "40px",
              maxWidth: "511px",
            }}
          >
            NEX is our upcoming AI-powered security platform designed
            <br />
            to predict, prevent, and neutralize threats in real-time.
          </motion.p>

          {/* Feature icons row */}
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex items-start"
          >
            {features.map((f, i) => (
              <div key={i} className="relative flex-1 flex flex-col items-center gap-4">
                {/* Vertical divider */}
                {i > 0 && (
                  <div
                    className="absolute left-0 top-3 bottom-3"
                    style={{ width: "1px", background: "#C6C6C6" }}
                  />
                )}
                <div className="h-[54px] flex items-center justify-center">
                  <img
                    src={f.icon}
                    alt={f.label1}
                    style={{ width: f.w, height: f.h, objectFit: "contain" }}
                  />
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-family)',
                    fontWeight: 700,
                    fontSize: "13.5px",
                    letterSpacing: "0.27px",
                    color: "#000",
                    textAlign: "center",
                    lineHeight: 1.5,
                    margin: 0,
                  }}
                >
                  {f.label1}
                  <br />
                  {f.label2}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Vertical divider */}
        <div
          className="hidden lg:block flex-shrink-0 mx-12"
          style={{ width: "1px", height: "350px", background: "#C6C6C6" }}
        />

        {/* Right â€“ NEX Logo */}
        <motion.div
          className="flex-shrink-0 flex flex-col items-center justify-center gap-6"
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          style={{ minWidth: "min(380px, 90vw)" }}
        >
          <NexLogo />
          {/* Tagline */}
          <p
            style={{
              fontFamily: 'var(--font-family)',
              fontWeight: 300,
              fontSize: "18px",
              letterSpacing: "0.36px",
              color: "#0B0F19",
              textAlign: "center",
              margin: 0,
            }}
          >
            SHARE{" "}
            <span style={{ color: "#2563EB" }}>NOTHING</span>,{" "}ACCESS{" "}
            <span style={{ color: "#2563EB" }}>EVERYTHING</span>.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

