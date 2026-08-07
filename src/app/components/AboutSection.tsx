import { motion } from "motion/react";
import svgPaths from "../../imports/AboutSection/svg-s1i9qf01my";
import { ResponsivePicture } from "./ResponsivePicture";
import { fadeHorizontalVariants, fadeUpVariants, VIEWPORT_ONCE } from "../utils/motionPresets";
import { useLightExperience } from "../utils/performance";

function UsersIcon() {
  return (
    <svg className="w-8 h-8 sm:w-9 sm:h-9" viewBox="0 0 57 48" fill="none" aria-hidden>
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
    <svg className="w-8 h-8 sm:w-9 sm:h-9" viewBox="0 0 51 56.5404" fill="none" aria-hidden>
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
    <svg className="w-8 h-8 sm:w-9 sm:h-9" viewBox="0 0 48.6877 48.6473" fill="none" aria-hidden>
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
            className="grid grid-cols-1 sm:grid-cols-3 items-stretch gap-3 sm:gap-2 border border-slate-100 rounded-2xl p-4 sm:p-6 bg-slate-50/30 shadow-sm mb-8 sm:mb-10 w-full max-w-lg sm:max-w-xl"
          >
            {features.map((f, i) => (
              <div
                key={i}
                className="flex flex-1 flex-col items-center justify-center gap-2 sm:gap-3 text-center min-h-[90px] sm:min-h-[100px] px-2 py-3 sm:py-0"
              >
                <div className="h-9 sm:h-10 flex items-center justify-center shrink-0" aria-hidden>
                  {f.icon}
                </div>
                <p
                  className="nst-small font-bold text-slate-900 leading-snug m-0"
                >
                  {f.label1}
                  <br />
                  {f.label2}
                </p>
              </div>
            ))}
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
