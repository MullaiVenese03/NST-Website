import { motion } from "motion/react";
import { fadeUpVariants, VIEWPORT_ONCE } from "../utils/motionPresets";
import { useLightExperience } from "../utils/performance";
import svgPaths from "../../imports/NexSection/svg-rp6a4ek3k8";

import { ResponsivePicture } from "./ResponsivePicture";
import type { MediaSlug } from "../utils/media";

const features: { mediaSlug: MediaSlug; w: number; h: number; label1: string; label2: string }[] = [
  { mediaSlug: "Icons--step-1", w: 52, h: 54, label1: "Powered", label2: "Threat Detection" },
  { mediaSlug: "Icons--step-2", w: 53, h: 54, label1: "Autonomous", label2: "Response" },
  { mediaSlug: "Icons--step-3", w: 54, h: 54, label1: "Unified Security", label2: "Dashboard" },
  { mediaSlug: "Icons--step-4", w: 63, h: 54, label1: "Built for the", label2: "Enterprise" },
];

function NexLogo() {
  return (
    <svg
      width="100%"
      viewBox="0 0 431.152 140"
      fill="none"
      style={{ maxWidth: "380px", display: "block" }}
    >

      <path d={svgPaths.p2ddc4500} fill="#0B0F19" />

      <path d={svgPaths.p588f500} fill="#0B0F19" />

      <circle cx="359.27" cy="63.7352" r="6.73516" fill="#0B0F19" />

      <path d={svgPaths.p3285e100} fill="#0B0F19" />

      <path d={svgPaths.p1b450300} fill="#2563EB" />
      <path d={svgPaths.p3e9d6e00} fill="#2563EB" />
      <path d={svgPaths.p2443e480} fill="#2563EB" />
      <path d={svgPaths.p16f85f00} fill="#2563EB" />
    </svg>
  );
}

export default function NexSection() {
  const light = useLightExperience();
  const fadeUp = fadeUpVariants(light, 0.08);

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

        <div className="flex-1 flex flex-col">

          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            style={{
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

          <motion.h2
            custom={1}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            style={{
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

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            style={{
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

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            className="flex items-start"
          >
            {features.map((f, i) => (
              <div key={i} className="relative flex-1 flex flex-col items-center gap-4">

                {i > 0 && (
                  <div
                    className="absolute left-0 top-3 bottom-3"
                    style={{ width: "1px", background: "#C6C6C6" }}
                  />
                )}
                <div className="h-[54px] flex items-center justify-center">
                  <ResponsivePicture
                    slug={f.mediaSlug}
                    alt={f.label1}
                    className="object-contain"
                    style={{ width: f.w, height: f.h }}
                    profile="icon"
                    sizes="80px"
                  />
                </div>
                <p
                  style={{
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

        <div
          className="hidden lg:block flex-shrink-0 mx-12"
          style={{ width: "1px", height: "350px", background: "#C6C6C6" }}
        />

        <motion.div
          className="flex-shrink-0 flex flex-col items-center justify-center gap-6"
          initial={{ opacity: 0, y: light ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ minWidth: "min(380px, 90vw)" }}
        >
          <NexLogo />

          <p
            style={{
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
