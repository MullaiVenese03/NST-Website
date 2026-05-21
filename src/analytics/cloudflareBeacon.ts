import { CF_BEACON_TOKEN, isAnalyticsEnabled } from "./analyticsConfig";

let loaded = false;

/** Loads Cloudflare Web Analytics beacon when token is configured. */
export function loadCloudflareBeacon(): void {
  if (typeof document === "undefined" || loaded) return;
  if (!isAnalyticsEnabled() || !CF_BEACON_TOKEN) return;

  loaded = true;
  const script = document.createElement("script");
  script.defer = true;
  script.src = "https://static.cloudflareinsights.com/beacon.min.js";
  script.setAttribute("data-cf-beacon", JSON.stringify({ token: CF_BEACON_TOKEN }));
  document.head.appendChild(script);
}
