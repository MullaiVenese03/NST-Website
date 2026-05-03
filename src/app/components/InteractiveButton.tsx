import { motion } from "motion/react";
import { ReactNode, useState } from "react";

export default function InteractiveButton({
  children,
  variant = "primary",
  className = "",
}: {
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const variants = {
    primary: "bg-[#015aaa] text-white",
    secondary: "bg-white text-[#015aaa]",
  };

  return (
    <motion.button
      className={`relative overflow-hidden rounded-lg px-6 py-3 ${variants[variant]} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
        initial={{ x: "-100%" }}
        animate={isHovered ? { x: "100%" } : { x: "-100%" }}
        transition={{ duration: 0.6 }}
      />

      <motion.div
        className="absolute inset-0"
        animate={
          isHovered
            ? {
                boxShadow: "0 0 20px rgba(1, 90, 170, 0.5), 0 0 40px rgba(1, 90, 170, 0.3)",
              }
            : {
                boxShadow: "0 0 0px rgba(1, 90, 170, 0)",
              }
        }
        transition={{ duration: 0.3 }}
      />

      <span className="relative z-10 font-bold tracking-wide">{children}</span>
    </motion.button>
  );
}

export function NavButton({
  children,
  active = false,
  className = "",
}: {
  children: ReactNode;
  active?: boolean;
  className?: string;
}) {
  return (
    <motion.div
      className={`relative px-6 py-2 rounded-full cursor-pointer ${active ? "bg-[#015aaa] text-white" : "text-black"} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {!active && (
        <motion.div
          className="absolute inset-0 bg-[#015aaa] rounded-full"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 0.1 }}
          transition={{ duration: 0.2 }}
        />
      )}

      <span className="relative z-10 font-bold tracking-wider">{children}</span>

      {active && (
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: [
              "0 0 0px rgba(1, 90, 170, 0)",
              "0 0 20px rgba(1, 90, 170, 0.4)",
              "0 0 0px rgba(1, 90, 170, 0)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
    </motion.div>
  );
}
