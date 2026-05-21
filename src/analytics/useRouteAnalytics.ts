import { useEffect, useRef } from "react";
import { useLocation } from "react-router";
import { isAnalyticsEnabled } from "./analyticsConfig";
import { trackPageView } from "./gtm";

/**
 * Pushes SPA page_view events to GTM dataLayer on client-side navigations.
 * Initial load is handled by GTM "All Pages"; skip the first fire to avoid duplicates.
 * Clarity page identity is handled in AnalyticsScripts via @microsoft/clarity.
 */
export function useRouteAnalytics(): void {
  const { pathname, search } = useLocation();
  const isFirst = useRef(true);

  useEffect(() => {
    if (!isAnalyticsEnabled()) return;

    const pagePath = pathname + search;

    if (isFirst.current) {
      isFirst.current = false;
      return;
    }

    const fire = () => trackPageView(pagePath);
    if (document.title) {
      fire();
      return;
    }
    const id = requestAnimationFrame(() => {
      trackPageView(pagePath);
    });
    return () => cancelAnimationFrame(id);
  }, [pathname, search]);
}
