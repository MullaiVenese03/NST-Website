import { useEffect } from "react";
import { isAnalyticsEnabled } from "./analyticsConfig";
import { loadCloudflareBeacon } from "./cloudflareBeacon";

/** Client-only analytics: Cloudflare beacon. GTM loads from index.html. */
export function AnalyticsScripts() {
  useEffect(() => {
    if (!isAnalyticsEnabled()) return;

    let started = false;
    const startAnalytics = () => {
      if (started) return;
      started = true;
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

  return null;
}

