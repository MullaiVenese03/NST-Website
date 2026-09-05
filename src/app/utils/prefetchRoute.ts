const prefetched = new Set<string>();

const routeLoaders: Record<string, () => Promise<unknown>> = {
  "/": () => import("../pages/HomePage"),
  "/about": () => import("../pages/AboutPage"),
  "/services": () => import("../pages/ServicesPage"),
  "/clients": () => import("../pages/ClientsPage"),
  "/edtech": () => import("../pages/EdTechPage"),
  "/blogs": () => import("../pages/BlogsPage"),
  "/blog": () => import("../pages/BlogsPage"),
  "/blog/data-sovereignty-ai-sensitive-enterprise-files": () => import("../pages/BlogPostPage"),
  "/blog/ai-agent-security-identity-access-enterprise-data": () => import("../pages/BlogPostPage"),
  "/blog/shadow-ai-agents-enterprise-security-risk": () => import("../pages/BlogPostPage"),
  "/blog/ransomware-data-theft-protect-business-2026": () => import("../pages/BlogPostPage"),
  "/blog/ai-agents-enterprise-data-security": () => import("../pages/BlogPostPage"),
  "/blog/how-to-start-career-cybersecurity": () => import("../pages/BlogPostPage"),
  "/privacy-policy": () => import("../pages/PrivacyPolicyPage"),
  "/terms-and-conditions": () => import("../pages/TermsAndConditionsPage"),
};


export function prefetchRoute(path: string): void {
  const normalized = path.split("#")[0] || "/";
  if (prefetched.has(normalized)) return;
  const loader = routeLoaders[normalized];
  if (!loader) return;
  prefetched.add(normalized);
  void loader();
}


export function prefetchCommonRoutes(): void {
  if (typeof window === "undefined") return;
  const run = () => prefetchRoute("/services");
  if ("requestIdleCallback" in window) {
    requestIdleCallback(run, { timeout: 8000 });
  } else {
    setTimeout(run, 5000);
  }
}
