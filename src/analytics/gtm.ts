import type { DataLayerEvent } from "./types";

function pushDataLayer(event: DataLayerEvent): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(event);
}

export function trackPageView(pagePath: string, pageTitle?: string): void {
  pushDataLayer({
    event: "page_view",
    page_path: pagePath,
    page_title: pageTitle ?? document.title,
    page_location: window.location.href,
  });
}

/** Fires exactly once when Formspree confirms a successful submission.
 *  No PII is included — event name only. */
export function trackContactFormSuccess(): void {
  pushDataLayer({ event: "contact_form_success" });
}
