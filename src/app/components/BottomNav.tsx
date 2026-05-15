import { motion } from "motion/react";
import { useNavigate, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { scrollToTopInstant } from "../utils/scroll";

const navItems = [
  { name: "Home", href: "hero", path: "/" },
  { name: "About", href: "about", path: "/about" },
  { name: "Services", href: "services", path: "/services" },
  { name: "Testimonials", href: "testimonials", path: "/clients" },
  { name: "EdTech", href: "edtech", path: "/edtech" },
  { name: "NEX", href: "nex", path: "/#nex" },
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
      if (currentItem) setActiveSection(currentItem.href);
    } else if (location.hash) {
      const hash = location.hash.replace("#", "");
      setActiveSection(hash);
    } else {
      setActiveSection("hero");
    }

    return () => window.removeEventListener("sectionChange", handleSectionChange);
  }, [location.pathname, location.hash]);

  const handleClick = (item: (typeof navItems)[0]) => {
    if (location.pathname === "/" && (item.path === "/" || item.path.startsWith("/#"))) {
      const sectionId = item.path === "/" ? item.href : item.path.split("#")[1];

      if (item.path === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
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
    <motion.div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-4xl max-md:hidden"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="relative rounded-full border border-slate-200/90 bg-white/95 p-1 sm:p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.12)] flex items-stretch gap-0.5 sm:gap-1 overflow-x-auto overflow-y-hidden max-w-full [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:overflow-visible md:justify-between">
        {navItems.map((item) => {
          const isActive = activeSection === item.href;

          return (
            <motion.button
              key={item.name}
              type="button"
              onClick={() => handleClick(item)}
              className={`relative shrink-0 min-w-[44px] min-h-[44px] rounded-full border-none px-2.5 sm:px-4 md:px-6 py-2.5 md:py-3 font-bold text-[11px] sm:text-xs md:text-sm transition-colors duration-200 cursor-pointer whitespace-nowrap flex items-center justify-center md:flex-1 ${
                isActive
                  ? "bg-[#014080] text-white shadow-md shadow-blue-900/25"
                  : "bg-transparent text-gray-800 hover:bg-slate-100 hover:text-[#015aaa]"
              }`}
            >
              {item.name}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
