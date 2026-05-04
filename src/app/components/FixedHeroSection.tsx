import { motion } from "motion/react";
import svgPaths from "../../imports/HeroSection/svg-3kvcnifylj";

export default function FixedHeroSection() {
  return (
    <div className="flex flex-col justify-center w-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex flex-col items-start"
      >
        {/* Heading: 24px gap below */}
        <motion.h2
          className="text-6xl md:text-7xl lg:text-8xl font-black leading-[1.25] tracking-tight text-gray-900 mb-[24px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <div className="flex flex-col">
            <span>
              <span className="text-[#015aaa]">One</span> Entry.
            </span>
            <span>
              <span className="text-[#015aaa]">One</span> Device.
            </span>
            <span>
              <span className="text-[#015aaa]">One</span> Purpose.
            </span>
          </div>
        </motion.h2>

        {/* Subtext: 16px gap below */}
        <motion.p
          className="text-lg md:text-xl text-gray-500 max-w-xl font-medium mb-[16px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Cybersecurity and IT solutions built to protect what
          matters most - your data, your systems, your future.
        </motion.p>

        {/* Trusted By / CTA: 24-32px gap above (from subtext) */}
        <motion.div
          className="flex items-center gap-2 text-sm text-gray-400 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <svg className="w-4 h-6" viewBox="0 0 9.5 9.92341">
            <path
              d={svgPaths.p31b6e600}
              stroke="#015aaa"
              fill="none"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Trusted by enterprises Worldwide</span>
        </motion.div>
      </motion.div>
    </div>
  );
}