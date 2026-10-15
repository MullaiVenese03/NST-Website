import React, { memo } from "react";
import { motion, type HTMLMotionProps, type Variants } from "motion/react";
import { usePrefersReducedMotion, useLightExperience } from "../utils/performance";
import { MOTION_EASE_OUT, VIEWPORT_ONCE } from "../utils/motionPresets";

export type RevealVariant = "fadeUp" | "fadeIn" | "fadeLeft" | "fadeRight";

type MotionSafeHTMLProps = Omit<
  React.HTMLAttributes<HTMLElement>,
  "onAnimationStart" | "onDrag" | "onDragStart" | "onDragEnd"
>;

export interface RevealProps extends MotionSafeHTMLProps {
  children: React.ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
  margin?: string;
  amount?: number | "some" | "all";
  className?: string;
  style?: React.CSSProperties;
  as?: "div" | "section" | "article" | "header" | "footer" | "p" | "span" | "aside" | "nav";
  id?: string;
}

export const Reveal = memo(function Reveal({
  children,
  variant = "fadeUp",
  delay = 0,
  duration = 0.52,
  distance = 20,
  once = true,
  margin = "0px 0px -40px 0px",
  amount = 0.15,
  className = "",
  style,
  as = "div",
  id,
  ...rest
}: RevealProps) {
  const reducedMotion = usePrefersReducedMotion();
  const light = useLightExperience();

  if (reducedMotion) {
    const Tag = as;
    return (
      <Tag id={id} className={className} style={style} {...rest}>
        {children}
      </Tag>
    );
  }

  const effectiveDistance = light ? Math.min(distance, 12) : distance;
  const effectiveDuration = light ? 0.32 : duration;
  const effectiveDelay = light ? Math.min(delay, 0.1) : delay;

  let initialTransform: { opacity: number; x?: number; y?: number } = { opacity: 0, y: effectiveDistance };
  if (variant === "fadeIn") {
    initialTransform = { opacity: 0 };
  } else if (variant === "fadeLeft") {
    initialTransform = { opacity: 0, x: -effectiveDistance };
  } else if (variant === "fadeRight") {
    initialTransform = { opacity: 0, x: effectiveDistance };
  }

  const MotionComponent = motion[as as keyof typeof motion] as React.ComponentType<HTMLMotionProps<any>>;

  return (
    <MotionComponent
      id={id}
      initial={initialTransform}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin, amount }}
      transition={{
        duration: effectiveDuration,
        delay: effectiveDelay,
        ease: MOTION_EASE_OUT,
      }}
      className={className}
      style={style}
      {...(rest as any)}
    >
      {children}
    </MotionComponent>
  );
});

export interface RevealGroupProps extends MotionSafeHTMLProps {
  children: React.ReactNode;
  stagger?: number;
  delayChildren?: number;
  once?: boolean;
  margin?: string;
  amount?: number | "some" | "all";
  className?: string;
  style?: React.CSSProperties;
  as?: "div" | "ul" | "ol" | "section";
  id?: string;
}

export const RevealGroup = memo(function RevealGroup({
  children,
  stagger = 0.07,
  delayChildren = 0.04,
  once = true,
  margin = "0px 0px -40px 0px",
  amount = 0.15,
  className = "",
  style,
  as = "div",
  id,
  ...rest
}: RevealGroupProps) {
  const reducedMotion = usePrefersReducedMotion();
  const light = useLightExperience();

  if (reducedMotion) {
    const Tag = as;
    return (
      <Tag id={id} className={className} style={style} {...rest}>
        {children}
      </Tag>
    );
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: light ? Math.min(stagger, 0.04) : stagger,
        delayChildren: light ? 0 : delayChildren,
      },
    },
  };

  const MotionComponent = motion[as as keyof typeof motion] as React.ComponentType<HTMLMotionProps<any>>;

  return (
    <MotionComponent
      id={id}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin, amount }}
      className={className}
      style={style}
      {...(rest as any)}
    >
      {children}
    </MotionComponent>
  );
});

export interface RevealItemProps extends MotionSafeHTMLProps {
  children: React.ReactNode;
  variant?: RevealVariant;
  distance?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
  as?: "div" | "li" | "article" | "span";
}

export const RevealItem = memo(function RevealItem({
  children,
  variant = "fadeUp",
  distance = 18,
  duration = 0.48,
  className = "",
  style,
  as = "div",
  ...rest
}: RevealItemProps) {
  const reducedMotion = usePrefersReducedMotion();
  const light = useLightExperience();

  if (reducedMotion) {
    const Tag = as;
    return (
      <Tag className={className} style={style} {...rest}>
        {children}
      </Tag>
    );
  }

  const effectiveDistance = light ? Math.min(distance, 10) : distance;
  const effectiveDuration = light ? 0.28 : duration;

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: variant === "fadeUp" ? effectiveDistance : 0,
      x: variant === "fadeLeft" ? -effectiveDistance : variant === "fadeRight" ? effectiveDistance : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: effectiveDuration,
        ease: MOTION_EASE_OUT,
      },
    },
  };

  const MotionComponent = motion[as as keyof typeof motion] as React.ComponentType<HTMLMotionProps<any>>;

  return (
    <MotionComponent variants={itemVariants} className={className} style={style} {...(rest as any)}>
      {children}
    </MotionComponent>
  );
});

export interface ImageRevealProps {
  children: React.ReactNode;
  from?: "bottom" | "left" | "right" | "none";
  distance?: number;
  duration?: number;
  priority?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const ImageReveal = memo(function ImageReveal({
  children,
  from = "bottom",
  distance = 16,
  duration = 0.55,
  priority = false,
  className = "",
  style,
}: ImageRevealProps) {
  const reducedMotion = usePrefersReducedMotion();
  const light = useLightExperience();

  if (reducedMotion || priority) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  const effectiveDistance = light ? Math.min(distance, 10) : distance;
  const x = from === "left" ? -effectiveDistance : from === "right" ? effectiveDistance : 0;
  const y = from === "bottom" ? effectiveDistance : 0;

  return (
    <motion.div
      initial={{ opacity: 0, x, y, scale: 0.99 }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={VIEWPORT_ONCE}
      transition={{
        duration,
        ease: MOTION_EASE_OUT,
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
});
