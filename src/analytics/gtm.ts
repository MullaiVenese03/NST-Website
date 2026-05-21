import type { DataLayerEvent } from "./types";

export function pushDataLayer(event: DataLayerEvent): void {
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
