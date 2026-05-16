import { useLayoutEffect, type RefObject } from "react";
import { useScroll, useTransform } from "motion/react";
import type { Transition, Variants } from "motion/react";
import { useLightExperience } from "./performance";

/** Single intersection trigger for scroll reveals. */
export const VIEWPORT_ONCE = { once: true, margin: "0px 0px -10% 0px" } as const;

const EASE_OUT: Transition["ease"] = "easeOut";

/** Opacity + translate fades; minimal motion on light experience. */
export function fadeUpVariants(light: boolean, stagger = 0.1): Variants {
  if (light) {
    return {
      hidden: { opacity: 0 },
      visible: (i: number = 0) => ({
        opacity: 1,
        transition: { duration: 0.28, delay: i * 0.03, ease: EASE_OUT },
      }),
    };
  }
  return {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: i * stagger, ease: EASE_OUT },
    }),
  };
}

export function fadeHorizontalVariants(
  light: boolean,
  from: "left" | "right",
): Variants {
  if (light) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.35, ease: EASE_OUT } },
    };
  }
  const x = from === "left" ? -32 : 32;
  return {
    hidden: { opacity: 0, x },
    visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: EASE_OUT } },
  };
}

/** Apply on elements passed to `useParallaxY` (Motion requires non-static positioning). */
export const PARALLAX_REF_CLASS = "relative";

function ensureParallaxPosition(ref: RefObject<HTMLElement | null>) {
  const node = ref.current;
  if (!node) return false;
  if (getComputedStyle(node).position === "static") {
    node.style.position = "relative";
  }
  return true;
}

/** Scroll-linked Y parallax - disabled on mobile / save-data / reduced-motion. */
export function useParallaxY(
  ref: RefObject<HTMLElement | null>,
  distance = 50,
): ReturnType<typeof useTransform<number, number>> {
  const light = useLightExperience();

  useLayoutEffect(() => {
    if (ensureParallaxPosition(ref)) return;
    const frame = requestAnimationFrame(() => ensureParallaxPosition(ref));
    return () => cancelAnimationFrame(frame);
  });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  return useTransform(scrollYProgress, [0, 1], light ? [0, 0] : [-distance, distance]);
}

/** Compositor hint for animated layers (transform/opacity only). */
export const GPU_LAYER = {
  willChange: "transform, opacity",
  transform: "translateZ(0)",
} as const;
