import { useRef, useEffect, type ReactNode } from "react";

type HeroParallaxProps = {
  enabled: boolean;
  children: ReactNode;
};

export function HeroParallax({ enabled, children }: HeroParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;

    let rafId: number;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const height = el.offsetHeight || window.innerHeight;
        const progress = Math.min(Math.max(window.scrollY / height, 0), 1);
        const y = progress * 80;
        const opacity = 1 - (progress / 0.85) * 0.5;
        el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
        el.style.opacity = `${Math.max(opacity, 0.5).toFixed(3)}`;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [enabled]);

  return (
    <div
      ref={ref}
      id="hero"
      className="relative w-full"
      style={{ position: "relative", willChange: enabled ? "transform, opacity" : "auto" }}
    >
      {children}
    </div>
  );
}
