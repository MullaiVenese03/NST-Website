import { motion } from "motion/react";
import { brandMarkUrl } from "../../brandMark";
import { GPU_LAYER } from "../utils/motionPresets";

export default function FixedHeroSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className="flex w-full max-w-[min(100%,40rem)] flex-col items-center gap-8 text-center md:max-w-2xl md:items-start md:gap-6 md:text-left"
      style={GPU_LAYER}
    >
      <h1 className="max-w-full text-5xl font-black leading-[1.12] tracking-tight text-gray-900 sm:text-6xl md:text-6xl lg:text-7xl xl:text-8xl">
        <span className="flex flex-col gap-1">
          <span>
            <span className="text-[#015aaa]">One</span> Entry.
          </span>
          <span>
            <span className="text-[#015aaa]">One</span> Device.
          </span>
          <span>
            <span className="text-[#015aaa]">One</span> Purpose.
          </span>
        </span>
      </h1>

      <p className="max-w-xl text-xl font-medium leading-relaxed text-gray-600">
        Cybersecurity and IT solutions built to protect what matters most - your data, your systems,
        your future.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-2 text-sm font-medium text-gray-500 md:justify-start">
        <img
          src={brandMarkUrl}
          alt=""
          width={20}
          height={20}
          decoding="async"
          className="h-5 w-5 shrink-0 object-contain"
          aria-hidden
        />
        <span>Trusted by enterprises Worldwide</span>
      </div>
    </motion.div>
  );
}
