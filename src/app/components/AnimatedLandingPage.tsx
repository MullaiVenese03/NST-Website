import { motion, useScroll, useTransform, useInView } from "motion/react";
import { useRef } from "react";
import NstWebsiteV from "../../imports/NstWebsiteV2/NstWebsiteV2";

function ScrollAnimationWrapper({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function AnimatedLandingPage() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.98]);

  return (
    <div className="size-full overflow-x-hidden bg-white">
      <motion.div style={{ opacity, scale }} className="relative">
        <NstWebsiteV />
      </motion.div>
    </div>
  );
}
