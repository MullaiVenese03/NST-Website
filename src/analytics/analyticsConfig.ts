/** When unset, analytics run in production builds only. Set to "false" to disable in prod. */
export function isAnalyticsEnabled(): boolean {
  const flag = import.meta.env.VITE_ENABLE_ANALYTICS;
  if (flag === "false") return false;
  if (flag === "true") return true;
  if (
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1" ||
      window.location.hostname.endsWith(".local"))
  ) {
    return false;
  }
  return import.meta.env.PROD;
}

export const CLARITY_PROJECT_ID = import.meta.env.VITE_CLARITY_PROJECT_ID ?? "wum1ijwahj";

export const CF_BEACON_TOKEN = import.meta.env.VITE_CF_BEACON_TOKEN ?? "";

export const GSC_VERIFICATION = import.meta.env.VITE_GSC_VERIFICATION ?? "";
