import { lazy, Suspense, useEffect, useRef, useState, type ComponentType, type ReactNode } from "react";
import { useLocation } from "react-router";

type LazyWhenVisibleProps = {
  loader: () => Promise<{ default: ComponentType<Record<string, never>> }>;
  fallback?: ReactNode;
  rootMargin?: string;
  minHeight?: number | string;
  className?: string;
  id?: string;
  
  hashTarget?: string;
};

export function LazyWhenVisible({
  loader,
  fallback = null,
  rootMargin = "280px 0px",
  minHeight = 120,
  className,
  id,
  hashTarget,
}: LazyWhenVisibleProps) {
  const { hash } = useLocation();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    const hash = window.location.hash.replace("#", "");
    if (hashTarget && hash === hashTarget) return true;
    if (id && hash === id) return true;
    return false;
  });
  const LazyComponent = lazy(loader);

  useEffect(() => {
    const target = hashTarget ?? id;
    if (!target || visible) return;
    if (hash.replace("#", "") === target) {
      setVisible(true);
    }
  }, [hash, hashTarget, id, visible]);

  useEffect(() => {
    if (visible) return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [visible, rootMargin]);

  return (
    <div ref={ref} className={className} id={id} style={{ minHeight }}>
      {visible ? (
        <Suspense fallback={fallback}>{<LazyComponent />}</Suspense>
      ) : (
        fallback
      )}
    </div>
  );
}
