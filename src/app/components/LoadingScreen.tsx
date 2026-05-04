import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";
import svgPaths from "../../imports/HeroSection/svg-3kvcnifylj";

export default function LoadingScreen({
  isLoading,
  onReveal,
}: {
  isLoading: boolean;
  onReveal?: () => void;
}) {
  const [animationFinished, setAnimationFinished] = useState(false);
  const [shouldShow, setShouldShow] = useState(true);
  const hasRevealedRef = useRef(false);

  const reveal = () => {
    if (hasRevealedRef.current) return;

    hasRevealedRef.current = true;
    setShouldShow(false);
    onReveal?.();
  };

  useEffect(() => {
    if (!isLoading) {
      setShouldShow(false);
      return;
    }

    const timer = setTimeout(() => {
      setAnimationFinished(true);
    }, 2500); // Total duration for logo assembly

    return () => clearTimeout(timer);
  }, [isLoading]);

  useEffect(() => {
    if (!animationFinished || !shouldShow) return;

    const handleInteraction = () => reveal();
    const autoRevealTimer = setTimeout(reveal, 600);

    window.addEventListener("wheel", handleInteraction, {
      once: true,
      passive: true,
    });
    window.addEventListener("touchmove", handleInteraction, {
      once: true,
      passive: true,
    });
    window.addEventListener("mousedown", handleInteraction, {
      once: true,
      passive: true,
    });
    window.addEventListener("keydown", handleInteraction, {
      once: true,
      passive: true,
    });

    return () => {
      clearTimeout(autoRevealTimer);
      window.removeEventListener("wheel", handleInteraction);
      window.removeEventListener("touchmove", handleInteraction);
      window.removeEventListener("mousedown", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
    };
  }, [animationFinished, shouldShow, onReveal]);

  const logoPaths = [
    { d: svgPaths.pa90df80, x: -30, y: -30 },
    { d: svgPaths.p3959b800, x: 30, y: -30 },
    { d: svgPaths.p3b6ed900, x: -30, y: 30 },
    { d: svgPaths.p36cd8100, x: 30, y: 30 },
    { d: svgPaths.p35314300, x: 0, y: -40 },
    { d: svgPaths.p33416100, x: 0, y: 40 },
    { d: svgPaths.p3ac0a900, x: -40, y: 0 },
    { d: svgPaths.p12afe570, x: 40, y: 0 },
    { d: svgPaths.p206f9980, x: 0, y: 0, scale: 0.5 },
  ];

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 bg-white z-[9999] flex flex-col items-center justify-center overflow-hidden"
        >
          <div className="flex flex-col items-center gap-8">
            <motion.div className="relative w-32 h-32">
              <svg
                className="w-full h-full"
                viewBox="0 0 56 58.0457"
                fill="none"
              >
                <g>
                  {logoPaths.map((path, index) => (
                    <motion.path
                      key={index}
                      d={path.d}
                      fill="#015AAA"
                      initial={{
                        opacity: 0,
                        x: path.x,
                        y: path.y,
                        scale: path.scale || 1,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        y: 0,
                        scale: 1,
                      }}
                      transition={{
                        duration: 1.2,
                        delay: index * 0.08,
                        ease: "easeOut",
                      }}
                    />
                  ))}
                </g>
              </svg>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col items-center gap-4"
            >
              <h2
                className="text-3xl font-bold tracking-widest text-[#015aaa] uppercase"
                style={{ fontFamily: "'Overcame Demo', sans-serif" }}
              >
                NebulaSafeTech
              </h2>
              <div className="flex gap-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-3 h-3 bg-[#015aaa] rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
