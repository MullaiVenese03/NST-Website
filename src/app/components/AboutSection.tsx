import { motion } from "motion/react";
import { ResponsivePicture } from "./ResponsivePicture";
import { fadeHorizontalVariants, fadeUpVariants, VIEWPORT_ONCE } from "../utils/motionPresets";
import { useLightExperience } from "../utils/performance";
import { SecurityFeaturesStrip } from "./SecurityFeaturesStrip";

export default function AboutSection() {
  const light = useLightExperience();
  const fadeUp = fadeUpVariants(light, 0.08);
  const fadeLeft = fadeHorizontalVariants(light, "left");

  return (
    <section className="w-full bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-stretch min-w-0">

        <motion.div
          className="relative w-full lg:w-[52%] shrink-0 flex items-center justify-center bg-slate-50 overflow-hidden min-h-[220px] sm:min-h-[280px] lg:min-h-[400px]"
          variants={fadeLeft}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
        >
          <ResponsivePicture
            slug="about-hero"
            alt="NST dashboard showing threats blocked and security posture"
            className="w-full h-auto max-h-[min(70vh,480px)] lg:absolute lg:inset-0 lg:h-full lg:max-h-none object-contain object-center"
            sizes="(max-width: 1024px) 100vw, 42vw"
          />
        </motion.div>

        <div className="flex-1 flex flex-col justify-center px-6 sm:px-8 lg:px-16 py-10 sm:py-12 lg:py-14 min-w-0">
          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            className="nst-eyebrow text-[#015AAA] font-bold mb-3 sm:mb-4"
          >
            About Us
          </motion.p>

          <motion.h2
            custom={1}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            className="nst-h2 text-slate-900 mb-4 sm:mb-5"
          >
            Built by defenders,
            <br className="hidden sm:inline" />{" "}
            for defenders.
          </motion.h2>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            className="nst-body text-[#6d6d6d] leading-relaxed mb-8 sm:mb-10 max-w-xl"
          >
            <span>NebulaSafeTech</span> was founded by
            cybersecurity experts with a mission to deliver enterprise-grade protection through
            innovation, transparency, and relentless dedication.
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            className="mb-8 sm:mb-10 w-full max-w-lg sm:max-w-xl"
          >
            <SecurityFeaturesStrip />
          </motion.div>

          <motion.a
            custom={4}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            href="/about"
            className="nst-ui inline-flex items-center gap-3 group min-h-[44px] text-[#015AAA] font-bold no-underline"
          >
            Learn more about us
            <svg
              width="16"
              height="10"
              viewBox="0 0 20 12"
              fill="none"
              className="transition-transform duration-200 group-hover:translate-x-1 shrink-0"
              aria-hidden
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
