import { useEffect, type RefObject } from "react";
import { useScroll, useTransform } from "motion/react";
import type { Transition, Variants } from "motion/react";
import { useLightExperience } from "./performance";

/**
 * Viewport trigger configurations:
 * - Trigger when element is slightly into view without waiting too long.
 * - Margin ensures smooth trigger before element hits bottom edge.
 */
export const VIEWPORT_ONCE = {
  once: true,
  margin: "0px 0px -40px 0px",
  amount: 0.15,
} as const;

export const VIEWPORT_REPEAT = {
  once: false,
  margin: "0px 0px -40px 0px",
  amount: 0.15,
} as const;

/**
 * Natural, smooth cubic bezier ease-out curve.
 * Decelerates fluidly without abrupt stops or artificial bounce.
 */
export const MOTION_EASE_OUT: Transition["ease"] = [0.21, 0.47, 0.32, 0.98];
const FALLBACK_EASE_OUT: Transition["ease"] = "easeOut";

/**
 * Standard fade-up reveal variant:
 * - Restrained vertical movement (18-24px)
 * - Restrained duration (0.45-0.55s)
 * - Immediate/opacity-only when light or reduced motion is preferred
 */
export function fadeUpVariants(light: boolean, stagger = 0.08, distance = 20): Variants {
  if (light) {
    return {
      hidden: { opacity: 0 },
      visible: (i: number = 0) => ({
        opacity: 1,
        transition: { duration: 0.28, delay: i * 0.03, ease: FALLBACK_EASE_OUT },
      }),
    };
  }
  return {
    hidden: { opacity: 0, y: distance },
    visible: (i: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.52, delay: i * stagger, ease: MOTION_EASE_OUT },
    }),
  };
}

/**
 * Subtle directional horizontal reveal:
 * - Subtle movement (18-24px) to prevent horizontal overflow on smaller screens
 */
export function fadeHorizontalVariants(
  light: boolean,
  from: "left" | "right",
  distance = 20,
): Variants {
  if (light) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.32, ease: FALLBACK_EASE_OUT } },
    };
  }
  const x = from === "left" ? -distance : distance;
  return {
    hidden: { opacity: 0, x },
    visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: MOTION_EASE_OUT } },
  };
}

/**
 * Subtle pure fade-in reveal (no translation).
 */
export function fadeInVariants(light: boolean, duration = 0.48): Variants {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: light ? 0.25 : duration, ease: FALLBACK_EASE_OUT },
    },
  };
}

/**
 * Image reveal variant:
 * Subtle transform and opacity without aggressive scaling or clipping.
 */
export function imageRevealVariants(light: boolean, from: "bottom" | "left" | "right" | "none" = "bottom"): Variants {
  if (light || from === "none") {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.35, ease: FALLBACK_EASE_OUT } },
    };
  }
  const x = from === "left" ? -18 : from === "right" ? 18 : 0;
  const y = from === "bottom" ? 16 : 0;
  return {
    hidden: { opacity: 0, x, y, scale: 0.99 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: { duration: 0.55, ease: MOTION_EASE_OUT },
    },
  };
}

/**
 * Parent group variant for staggered children lists/grids.
 */
export function staggerContainerVariants(stagger = 0.07, delayChildren = 0.04): Variants {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren,
      },
    },
  };
}

/**
 * Child item variant inside a staggerContainer.
 */
export function staggerItemVariants(distance = 18, duration = 0.48): Variants {
  return {
    hidden: { opacity: 0, y: distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration, ease: MOTION_EASE_OUT },
    },
  };
}

function ensureParallaxPosition(ref: RefObject<HTMLElement | null>) {
  const node = ref.current;
  if (!node) return;
  if (!node.style.position || node.style.position === "static") {
    node.style.position = "relative";
  }
}

export function useParallaxY(
  ref: RefObject<HTMLElement | null>,
  distance = 50,
): ReturnType<typeof useTransform<number, number>> {
  const light = useLightExperience();

  useEffect(() => {
    ensureParallaxPosition(ref);
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  return useTransform(scrollYProgress, [0, 1], light ? [0, 0] : [-distance, distance]);
}

export const GPU_LAYER = {
  willChange: "transform, opacity",
  transform: "translateZ(0)",
} as const;

