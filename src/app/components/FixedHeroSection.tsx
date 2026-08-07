import { motion } from "motion/react";
import { Shield } from "lucide-react";
import { GPU_LAYER } from "../utils/motionPresets";

export default function FixedHeroSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className="flex w-full max-w-[min(100%,44rem)] flex-col items-center gap-8 text-center md:max-w-3xl md:items-start md:gap-6 md:text-left"
      style={GPU_LAYER}
    >
      <h1
        className="nst-h1-hero max-w-full text-gray-900"
      >
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

      <p className="nst-body-sm max-w-xl text-gray-600">
        Cybersecurity and IT solutions built to protect what matters most - your data, your systems,
        your future.
      </p>

      <div className="nst-small flex flex-wrap items-center justify-center gap-2 text-gray-500 md:justify-start">
        <Shield
          className="h-5 w-5 shrink-0 text-[#015aaa]"
          strokeWidth={2}
          aria-hidden
        />
        <span>Trusted by enterprises Worldwide</span>
      </div>
    </motion.div>
  );
}
