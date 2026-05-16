const prefetched = new Set<string>();

const routeLoaders: Record<string, () => Promise<unknown>> = {
  "/": () => import("../pages/HomePage"),
  "/about": () => import("../pages/AboutPage"),
  "/services": () => import("../pages/ServicesPage"),
  "/clients": () => import("../pages/ClientsPage"),
  "/edtech": () => import("../pages/EdTechPage"),
  "/privacy-policy": () => import("../pages/PrivacyPolicyPage"),
  "/terms-and-conditions": () => import("../pages/TermsAndConditionsPage"),
};

/** Warm route chunks on hover/focus without navigating. */
export function prefetchRoute(path: string): void {
  const normalized = path.split("#")[0] || "/";
  if (prefetched.has(normalized)) return;
  const loader = routeLoaders[normalized];
  if (!loader) return;
  prefetched.add(normalized);
  void loader();
}

/** Prefetch one likely next route after home is idle - avoids pulling ~1MB+ of JS early. */
export function prefetchCommonRoutes(): void {
  if (typeof window === "undefined") return;
  const run = () => prefetchRoute("/services");
  if ("requestIdleCallback" in window) {
    requestIdleCallback(run, { timeout: 8000 });
  } else {
    setTimeout(run, 5000);
  }
}
