import { useEffect } from "react";
import { loadCloudflareBeacon } from "./cloudflareBeacon";

/** Client-only analytics helpers (Cloudflare beacon). GTM/Clarity load from index.html. */
export function AnalyticsScripts() {
  useEffect(() => {
    loadCloudflareBeacon();
  }, []);

  return null;
}
