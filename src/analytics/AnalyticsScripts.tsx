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
    initClarity();
    loadCloudflareBeacon();
  }, []);

  useEffect(() => {
    if (!isAnalyticsEnabled()) return;
    identifyClarityPage(pathname + search);
  }, [pathname, search]);

  return null;
}
