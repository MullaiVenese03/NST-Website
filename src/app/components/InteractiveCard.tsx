import { motion } from "motion/react";
import { useState } from "react";

export default function InteractiveCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{
        scale: 1.03,
        y: -5,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        animate={isHovered ? { boxShadow: "0 20px 40px rgba(1, 90, 170, 0.15)" } : { boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" }}
        transition={{ duration: 0.3 }}
        className="size-full"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
