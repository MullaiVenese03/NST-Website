import { useEffect } from "react";
import { useLocation } from "react-router";
import { scrollToTopInstant } from "../utils/scroll";

/**
 * Scrolls to top on every route pathname change.
 * Hash-only navigation (e.g. /#contact on home) is handled by the target page.
 */
export default function ScrollToTopOnNavigate() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    scrollToTopInstant();
  }, [pathname, hash]);

  return null;
}
