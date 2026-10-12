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

    let started = false;
    const startAnalytics = () => {
      if (started) return;
      started = true;
      initClarity();
      loadCloudflareBeacon();
    };

    const triggers = ["scroll", "touchstart", "click", "pointerdown", "keydown"];
    const onInteract = () => {
      startAnalytics();
      triggers.forEach((e) => window.removeEventListener(e, onInteract));
    };
    triggers.forEach((e) => window.addEventListener(e, onInteract, { once: true, passive: true }));

    const onLoad = () => {
      if ("requestIdleCallback" in window) {
        requestIdleCallback(startAnalytics, { timeout: 6000 });
      } else {
        setTimeout(startAnalytics, 3500);
      }
    };

    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad, { once: true });
    }

    return () => {
      triggers.forEach((e) => window.removeEventListener(e, onInteract));
      window.removeEventListener("load", onLoad);
    };
  }, []);

  useEffect(() => {
    if (!isAnalyticsEnabled()) return;
    identifyClarityPage(pathname + search);
  }, [pathname, search]);

  return null;
}

