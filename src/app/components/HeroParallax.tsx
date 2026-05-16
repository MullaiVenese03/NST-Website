import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { GPU_LAYER } from "../utils/motionPresets";

type HeroParallaxProps = {
  enabled: boolean;
  children: ReactNode;
};

/** Single wrapper at all widths - avoids remount flicker at the 768px motion breakpoint. */
export function HeroParallax({ enabled, children }: HeroParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, enabled ? 80 : 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, enabled ? 0.5 : 1]);

  return (
    <motion.div
      ref={ref}
      id="hero"
      className="relative w-full"
      style={
        enabled
          ? { position: "relative", y, opacity, ...GPU_LAYER }
          : { position: "relative" }
      }
    >
      {children}
    </motion.div>
  );
}
