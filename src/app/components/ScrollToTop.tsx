import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { isReducedMotion } from "../utils/scroll";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    toggleVisibility();
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: isReducedMotion() ? "auto" : "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.85, y: 12 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.85, y: 12 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          whileHover={shouldReduceMotion ? undefined : { scale: 1.08 }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
          onClick={scrollToTop}
          className="fixed bottom-28 max-[1023px]:bottom-32 right-4 sm:right-8 z-[110] w-12 h-12 min-w-[48px] min-h-[48px] rounded-full bg-[#015AAA] hover:bg-[#014c8f] text-white shadow-md flex items-center justify-center cursor-pointer border-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#015AAA] transition-colors"
          aria-label="Back to top"
          title="Back to top"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="block shrink-0 pointer-events-none"
          >
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
