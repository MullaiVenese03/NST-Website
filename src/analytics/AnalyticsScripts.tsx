import { useEffect } from "react";
import { useLocation } from "react-router";
import { isAnalyticsEnabled } from "./analyticsConfig";
import { identifyClarityPage, initClarity } from "./clarity";
import { loadCloudflareBeacon } from "./cloudflareBeacon";

/** Client-only analytics: Clarity NPM, Cloudflare beacon. GTM loads from index.html. */
export function AnalyticsScripts() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    if (!isAnalyticsEnabled()) return;

    const startAnalytics = () => {
      initClarity();
      loadCloudflareBeacon();
    };

    if ("requestIdleCallback" in window) {
      const handle = requestIdleCallback(startAnalytics, { timeout: 3000 });
      return () => cancelIdleCallback(handle);
    }

    const timer = setTimeout(startAnalytics, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isAnalyticsEnabled()) return;
    identifyClarityPage(pathname + search);
  }, [pathname, search]);

  return null;
}

