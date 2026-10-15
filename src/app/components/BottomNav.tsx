import { Link, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { isReducedMotion, scrollToTopInstant } from "../utils/scroll";
import {
  Home,
  Info,
  Briefcase,
  MessageSquare,
  GraduationCap,
  Phone,
  type LucideProps,
} from "lucide-react";
import type React from "react";

// ─── Icon map ─────────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, React.ComponentType<LucideProps>> = {
  Home: Home,
  About: Info,
  Services: Briefcase,
  Testimonials: MessageSquare,
  EdTech: GraduationCap,
  Contact: Phone,
};

/**
 * Renders a lucide icon for the given nav item name.
 * Shown on mobile (below sm breakpoint), hidden on tablet/desktop.
 */
function NavIcon({ name, className }: { name: string; className?: string }) {
  const Icon = ICON_MAP[name];
  if (!Icon) return null;
  return (
    <Icon
      size={20}
      strokeWidth={2}
      aria-hidden="true"
      focusable="false"
      className={className}
    />
  );
}

// ─── Nav data ─────────────────────────────────────────────────────────────────

const navItems = [
  { name: "Home", href: "hero", path: "/" },
  { name: "About", href: "about", path: "/about" },
  { name: "Services", href: "services", path: "/services" },
  { name: "Testimonials", href: "testimonials", path: "/testimonials" },
  { name: "EdTech", href: "edtech", path: "/edtech" },
  { name: "Contact", href: "contact", path: "/contact" },
];

export default function BottomNav() {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleSectionChange = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      if (location.pathname === "/") {
        const sectionId = detail === "clients" ? "testimonials" : detail;
        setActiveSection(sectionId);
      }
    };
    window.addEventListener("sectionChange", handleSectionChange);

    if (location.pathname === "/") {
      if (location.hash) {
        const hash = location.hash.replace("#", "");
        setActiveSection(hash);
      } else {
        setActiveSection("hero");
      }
    } else {
      const currentItem = navItems.find((item) => item.path === location.pathname);
      if (currentItem) {
        setActiveSection(currentItem.href);
      }
    }

    return () => window.removeEventListener("sectionChange", handleSectionChange);
  }, [location.pathname, location.hash]);

  const handleLinkClick = (item: (typeof navItems)[0], e: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === item.path) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: isReducedMotion() ? "auto" : "smooth" });
      return;
    }

    scrollToTopInstant();
  };

  return (
    <nav
      aria-label="Main navigation"
      className="fixed bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-[100] transition-opacity duration-200"
      style={{ width: "min(96vw, 52rem)" }}
    >
      <div
        className="relative rounded-full flex items-center justify-between max-w-full overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.55)",
          backdropFilter: "blur(18px) saturate(180%)",
          WebkitBackdropFilter: "blur(18px) saturate(180%)",
          border: "1px solid rgba(255,255,255,0.55)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.6)",
          padding: "clamp(3px, 0.6vw, 6px)",
          gap: "clamp(1px, 0.4vw, 4px)",
        }}
      >
        {navItems.map((item) => {
          const isActive = activeSection === item.href;

          return (
            <Link
              key={item.name}
              to={item.path}
              onClick={(e) => handleLinkClick(item, e)}
              aria-label={item.name}
              aria-current={isActive ? "page" : undefined}
              className={`relative rounded-full border-none font-bold whitespace-nowrap flex items-center justify-center flex-1 no-underline transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#015aaa]/60 ${isActive
                  ? "bg-[#015aaa] text-white shadow-sm"
                  : "bg-transparent text-gray-800 hover:bg-slate-100/70 hover:text-[#015aaa]"
                }`}
              style={{
                fontSize: "clamp(11px, 2vw, 13px)",
                paddingLeft: "clamp(6px, 2.5vw, 20px)",
                paddingRight: "clamp(6px, 2.5vw, 20px)",
                paddingTop: "clamp(6px, 1.2vw, 10px)",
                paddingBottom: "clamp(6px, 1.2vw, 10px)",
                minHeight: "clamp(32px, 5vw, 44px)",
              }}
            >
              {/* Mobile (below sm): icon only - text is visually hidden but aria-label covers a11y */}
              <NavIcon name={item.name} className="sm:hidden" />
              {/* Tablet / Desktop (sm and above): existing text label - completely unchanged */}
              <span className="hidden sm:inline">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
