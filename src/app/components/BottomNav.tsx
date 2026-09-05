import { useNavigate, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { navigateToContact, scrollToSection, scrollToTopInstant } from "../utils/scroll";

const navItems = [
  { name: "Home", href: "hero", path: "/" },
  { name: "About", href: "about", path: "/about" },
  { name: "Services", href: "services", path: "/services" },
  { name: "Testimonials", href: "testimonials", path: "/clients" },
  { name: "EdTech", href: "edtech", path: "/edtech" },
  { name: "Contact", href: "contact", path: "/#contact" },
];

export default function BottomNav() {
  const navigate = useNavigate();
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

    if (location.pathname !== "/") {
      const currentItem = navItems.find((item) => item.path === location.pathname);
      if (currentItem) {
        setActiveSection(currentItem.href);
      } else if (location.hash === "#contact") {
        setActiveSection("contact");
      }
    } else if (location.hash) {
      const hash = location.hash.replace("#", "");
      setActiveSection(hash);
    } else {
      setActiveSection("hero");
    }

    return () => window.removeEventListener("sectionChange", handleSectionChange);
  }, [location.pathname, location.hash]);

  const handleClick = (item: (typeof navItems)[0]) => {
    if (item.href === "contact") {
      navigateToContact(navigate, location.pathname === "/");
      return;
    }

    if (location.pathname === "/" && (item.path === "/" || item.path.startsWith("/#"))) {
      const sectionId = item.path === "/" ? item.href : item.path.split("#")[1];

      if (item.path === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        scrollToSection(sectionId);
      }
      return;
    }

    if (location.pathname === item.path) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    scrollToTopInstant();
    navigate(item.path);
  };

  return (
    <div
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
            <button
              key={item.name}
              type="button"
              onClick={() => handleClick(item)}
              className={`relative rounded-full border-none font-bold cursor-pointer whitespace-nowrap flex items-center justify-center flex-1 transition-colors duration-200 ${
                isActive
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
              {item.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
