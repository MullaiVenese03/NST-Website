import { useEffect } from "react";
import { useLightExperience } from "../utils/performance";

/** Defers ~21KB brand WOFF2 until idle on desktop; mobile keeps system fallback. */
export function DeferredCompanyFont() {
  const light = useLightExperience();

  useEffect(() => {
    if (light) return;

    const load = () => {
      void import("../../styles/fonts-company.css");
    };

    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(load, { timeout: 2500 });
      return () => cancelIdleCallback(id);
    }

    const t = (window as Window).setTimeout(load, 1500);
    return () => clearTimeout(t);
  }, [light]);

  return null;
}
