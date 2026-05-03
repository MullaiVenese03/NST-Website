import { motion } from "motion/react";
import FixedHeroSection from "./FixedHeroSection";
import { RadialGlow, ShimmerEffect, AnimatedGrid, FloatingOrbs } from "./HeroEffects";

export default function EnhancedHeroSection() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
      <AnimatedGrid />
      <FloatingOrbs />
      <RadialGlow />
      <ShimmerEffect />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative z-10 w-full h-full"
      >
        <FixedHeroSection />
      </motion.div>

      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <motion.div
          className="absolute top-0 left-0 right-0 h-40"
          style={{
            background: "linear-gradient(to bottom, rgba(255, 255, 255, 0.02), transparent)",
          }}
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </div>
  );
}
