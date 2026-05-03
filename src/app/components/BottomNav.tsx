import { motion, AnimatePresence } from "motion/react";
import { useNavigate, useLocation } from "react-router";
import { useEffect, useState } from "react";

const navItems = [
  { name: "Home",        href: "hero",         path: "/" },
  { name: "About",       href: "about",        path: "/about" },
  { name: "Services",    href: "services",     path: "/services" },
  { name: "Testimonials", href: "testimonials", path: "/clients" },
  { name: "EdTech",      href: "edtech",       path: "/edtech" },
  { name: "NEX",         href: "nex",          path: "/#nex" },
  { name: "Footer",      href: "contact",      path: "/#contact" },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("hero");
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Listen for section changes (dispatched by HomePage's IntersectionObserver)
    const handleSectionChange = (e: any) => {
      if (location.pathname === "/") {
        setActiveSection(e.detail);
      }
    };
    window.addEventListener("sectionChange", handleSectionChange);
    
    // Update active section based on current path for non-home pages
    if (location.pathname !== "/") {
      // Find item that matches path
      const currentItem = navItems.find(item => item.path === location.pathname);
      if (currentItem) setActiveSection(currentItem.href);
    } else if (location.hash) {
      const hash = location.hash.replace("#", "");
      setActiveSection(hash);
    } else {
      setActiveSection("hero");
    }

    return () => window.removeEventListener("sectionChange", handleSectionChange);
  }, [location.pathname, location.hash]);

  // Hide bottom nav when scrolled, allowing it to "merge" into TopNav
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY <= 50);
    };

    // Check initial state
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (item: typeof navItems[0]) => {
    // Case 1: Already on home page and item is a home section or hash link
    if (location.pathname === "/" && (item.path === "/" || item.path.startsWith("/#"))) {
      const sectionId = item.path === "/" ? item.href : item.path.split("#")[1];
      
      if (item.path === "/") {
        // Home button — scroll to very top
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
      return;
    }

    // Case 2: Already on the target page — scroll to top
    if (location.pathname === item.path) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Case 3: Navigate to a new page — scroll to top FIRST then navigate
    // This ensures the new page starts from the top
    window.scrollTo(0, 0);
    navigate(item.path);
  };

  return (
    <motion.div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-4xl"
      initial={{ y: 100, opacity: 0 }}
      animate={{ 
        y: isVisible ? 0 : 100, 
        opacity: isVisible ? 1 : 0 
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="relative bg-white/40 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.1)] rounded-full p-1.5 flex items-center justify-between gap-1 overflow-hidden md:overflow-visible">
        {navItems.map((item, index) => {
          const isActive = activeSection === item.href;
          
          return (
            <motion.button
              key={item.name}
              onClick={() => handleClick(item)}
              className={`relative px-4 py-2.5 md:px-6 md:py-3 rounded-full font-bold text-xs md:text-sm transition-all cursor-pointer border-none whitespace-nowrap flex-1 flex items-center justify-center ${
                isActive 
                  ? "text-white" 
                  : "text-gray-700 hover:text-[#015aaa] hover:bg-white/30"
              }`}
            >
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-[#015aaa] rounded-full shadow-lg shadow-blue-500/30 -z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </AnimatePresence>
              {item.name}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
