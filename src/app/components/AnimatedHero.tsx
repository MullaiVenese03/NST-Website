import { motion } from "motion/react";
import { ReactNode } from "react";

export function AnimatedHeading({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: delay + 0.5,
        ease: [0.25, 0.4, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedSubtext({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: delay + 0.7,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedNav({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: delay + 0.2,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedButton({ children, delay = 0, index = 0 }: { children: ReactNode; delay?: number; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.95 }}
      transition={{
        duration: 0.4,
        delay: delay + 0.9 + index * 0.1,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedBackground({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ scale: 1.1, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        duration: 1.5,
        ease: "easeOut",
      }}
      className="size-full"
    >
      {children}
    </motion.div>
  );
}

export function FloatingElement({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        y: [0, -10, 0],
      }}
      transition={{
        opacity: { duration: 0.6, delay },
        y: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        },
      }}
    >
      {children}
    </motion.div>
  );
}
