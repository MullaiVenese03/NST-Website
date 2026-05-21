import Clarity from "@microsoft/clarity";
import { CLARITY_PROJECT_ID, isAnalyticsEnabled } from "./analyticsConfig";

let initialized = false;

export function initClarity(): void {
  if (typeof window === "undefined" || initialized) return;
  if (!isAnalyticsEnabled() || !CLARITY_PROJECT_ID) return;

  Clarity.init(CLARITY_PROJECT_ID);
  initialized = true;
}

/** Call on every route so Clarity tracks SPA page views (per Identify API guidance). */
export function identifyClarityPage(pagePath: string, pageTitle?: string): void {
  if (!initialized || !isAnalyticsEnabled()) return;

  const title = pageTitle ?? document.title;
  Clarity.identify(pagePath, undefined, pagePath, title || undefined);
  Clarity.setTag("page_path", pagePath);
}
