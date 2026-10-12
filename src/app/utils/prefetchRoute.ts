const prefetched = new Set<string>();

const staticRouteLoaders: Record<string, () => Promise<unknown>> = {
  "/": () => import("../pages/HomePage"),
  "/about": () => import("../pages/AboutPage"),
  "/services": () => import("../pages/ServicesPage"),
  "/testimonials": () => import("../pages/ClientsPage"),
  "/edtech": () => import("../pages/EdTechPage"),
  "/blogs": () => import("../pages/BlogsPage"),
  "/privacy-policy": () => import("../pages/PrivacyPolicyPage"),
  "/terms-and-conditions": () => import("../pages/TermsAndConditionsPage"),
};


export function prefetchRoute(path: string): void {
  const normalized = path.split("#")[0] || "/";
  if (prefetched.has(normalized)) return;
  let loader = staticRouteLoaders[normalized];
  if (!loader && (normalized.startsWith("/blogs/") || normalized.startsWith("/blog/"))) {
    loader = () => import("../pages/BlogPostPage");
  } else if (!loader && normalized.startsWith("/services/")) {
    loader = () => import("../pages/ServiceDetailPage");
  }
  if (!loader) return;
  prefetched.add(normalized);
  void loader();
}


export function prefetchCommonRoutes(): void {
  if (typeof window === "undefined") return;
  const run = () => {
    prefetchRoute("/services");
  };
  const onInteraction = () => {
    window.removeEventListener("pointerdown", onInteraction);
    window.removeEventListener("touchstart", onInteraction);
    window.removeEventListener("scroll", onInteraction);
    if ("requestIdleCallback" in window) {
      requestIdleCallback(run, { timeout: 3000 });
    } else {
      setTimeout(run, 1500);
    }
  };
  window.addEventListener("pointerdown", onInteraction, { once: true, passive: true });
  window.addEventListener("touchstart", onInteraction, { once: true, passive: true });
  window.addEventListener("scroll", onInteraction, { once: true, passive: true });
}
