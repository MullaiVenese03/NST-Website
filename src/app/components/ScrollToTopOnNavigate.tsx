import { useEffect } from "react";
import { useLocation } from "react-router";
import { scrollToTopInstant } from "../utils/scroll";


export default function ScrollToTopOnNavigate() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    scrollToTopInstant();
  }, [pathname, hash]);

  return null;
}
