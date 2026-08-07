import { motion } from "motion/react";
import { ResponsivePicture } from "./ResponsivePicture";
import { VIEWPORT_ONCE } from "../utils/motionPresets";
import { UNIFIED_PARTNER_LOGOS } from "../data/clientsData";

const logos = UNIFIED_PARTNER_LOGOS;
const allLogos = [...logos, ...logos];

export default function TrustedClientsSection() {
  return (
    <section className="w-full py-8 sm:py-10 bg-white border-y border-gray-100 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 flex flex-col lg:flex-row items-center gap-6 lg:gap-8 min-w-0">
        <header className="flex-shrink-0 w-full lg:w-[min(380px,100%)] text-center lg:text-left border-b border-gray-100 pb-6 lg:pb-0 lg:border-b-0 lg:pr-6 min-w-0">
          <motion.p
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.4 }}
            className="nst-meta font-bold text-[#015aaa] tracking-[0.1em] uppercase mb-1"
          >
            Our Partners
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="nst-h3 font-bold text-gray-900"
          >
            Trusted by
            <br />
            <span style={{ color: "#015AAA" }}>Industry &amp; Academia</span>
          </motion.h2>
        </header>

        <div className="flex-1 relative w-full min-w-0 h-[120px] sm:h-[140px] md:h-[150px] overflow-hidden">
          <div
            className="pointer-events-none absolute left-0 top-0 z-10 h-full w-6 sm:w-8 bg-gradient-to-r from-white to-transparent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute right-0 top-0 z-10 h-full w-6 sm:w-8 bg-gradient-to-l from-white to-transparent"
            aria-hidden
          />

          <div className="nst-marquee-track h-full gap-8 sm:gap-10">
            {allLogos.map((logo, index) => (
              <div
                key={`${logo.mediaSlug}-${index}`}
                className="flex h-full w-[72px] sm:w-20 shrink-0 items-center justify-center grayscale opacity-60"
              >
                <ResponsivePicture
                  slug={logo.mediaSlug}
                  alt={logo.alt}
                  className="max-h-[52px] sm:max-h-16 w-full max-w-full object-contain"
                  profile="logo"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
