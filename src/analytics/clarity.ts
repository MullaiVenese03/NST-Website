import Clarity from "@microsoft/clarity";
import { CLARITY_PROJECT_ID, isAnalyticsEnabled } from "./analyticsConfig";

let initialized = false;

export function initClarity(): void {
  if (typeof window === "undefined" || initialized) return;
  if (!isAnalyticsEnabled() || !CLARITY_PROJECT_ID) return;

  try {
    const win = window as unknown as { clarity?: { (...args: unknown[]): void; q?: unknown[] } };
    win.clarity =
      win.clarity ||
      function () {
        (win.clarity!.q = win.clarity!.q || []).push(arguments);
      };
    win.clarity("consentv2", {
      ad_Storage: "denied",
      analytics_Storage: "denied",
    });
    win.clarity("consent", false);
  } catch {
    // fallback if window is unavailable
  }

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
