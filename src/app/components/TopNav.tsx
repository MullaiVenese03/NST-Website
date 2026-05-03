import { motion, AnimatePresence } from "motion/react";
import { useNavigate, useLocation } from "react-router";
import { useEffect, useState } from "react";
import svgPaths from "../../imports/HeroSection/svg-3kvcnifylj";

const navItems = [
  { name: "Home",        href: "hero",         path: "/" },
  { name: "About",       href: "about",        path: "/about" },
  { name: "Services",    href: "services",     path: "/services" },
  { name: "Clients",     href: "testimonials", path: "/clients" },
  { name: "EdTech",      href: "edtech",       path: "/edtech" },
  { name: "NEX",         href: "nex",          path: "/#nex" },
];

function NstLogo() {
  return (
    <div className="w-8 h-8 md:w-10 md:h-10 flex-shrink-0">
      <svg className="w-full h-full" fill="none" viewBox="0 0 56 58.0457">
        <g>
          <path d={svgPaths.pa90df80} fill="#015AAA" />
          <path d={svgPaths.p3959b800} fill="#015AAA" />
          <path d={svgPaths.p3b6ed900} fill="#015AAA" />
          <path d={svgPaths.p36cd8100} fill="#015AAA" />
          <path d={svgPaths.p35314300} fill="#015AAA" />
          <path d={svgPaths.p33416100} fill="#015AAA" />
          <path d={svgPaths.p3ac0a900} fill="#015AAA" />
          <path d={svgPaths.p12afe570} fill="#015AAA" />
          <path d={svgPaths.p206f9980} fill="#015AAA" />
        </g>
      </svg>
    </div>
  );
}

export default function TopNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    // Check initial scroll
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleSectionChange = (e: any) => {
      if (location.pathname === "/") {
        setActiveSection(e.detail);
      }
    };
    window.addEventListener("sectionChange", handleSectionChange);
    
    if (location.pathname !== "/") {
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

  const handleLogoClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  const handleContactClick = () => {
    if (location.pathname === "/") {
      const el = document.getElementById("contact");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/#contact");
    }
  };

  const handleNavClick = (item: typeof navItems[0]) => {
    if (location.pathname === "/" && (item.path === "/" || item.path.startsWith("/#"))) {
      const sectionId = item.path === "/" ? item.href : item.path.split("#")[1];
      if (item.path === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return;
    }
    if (location.pathname === item.path) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    window.scrollTo(0, 0);
    navigate(item.path);
  };

  return (
    <motion.nav
      className="fixed top-[18px] left-4 right-4 md:left-[50px] md:right-[50px] h-13 md:h-15 px-4 md:px-6 flex items-center justify-between z-[100] bg-white/10 backdrop-blur-md border border-white/20 rounded-[20px] shadow-lg overflow-hidden"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Left: Logo + Name */}
      <div 
        className="flex  gap-2 md:gap-3 cursor-pointer shrink-0"
        onClick={handleLogoClick}
      >
        <NstLogo />
        <span 
          className="text-md md:text-3xl font-black tracking-[0.03em] text-gray-900 uppercase hidden sm:block relative top-[-6px]  leading-none"
          style={{ fontFamily: "'Overcame Demo', sans-serif" }}
        >
          NebulaSafeTech
        </span>
      </div>

      {/* Center: Merged Navigation Links (visible when scrolled) */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="hidden lg:flex items-center gap-1"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.href;
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item)}
                  className={`relative px-4 py-1.5 rounded-full font-bold text-xs transition-all cursor-pointer border-none whitespace-nowrap ${
                    isActive 
                      ? "text-white" 
                      : "text-gray-700 hover:text-[#015aaa] hover:bg-white/30"
                  }`}
                >
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        layoutId="topNavActiveTab"
                        className="absolute inset-0 bg-[#015aaa] rounded-full shadow-lg shadow-blue-500/30 -z-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </AnimatePresence>
                  {item.name}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Right: Contact CTA */}
      <motion.button
        className="bg-[#015aaa] text-white px-4 py-2 md:px-6 md:py-2.5 rounded-[16px] font-bold text-xs md:text-sm shadow-lg shadow-blue-200/50 flex items-center gap-2 group border-none cursor-pointer transition-colors hover:bg-[#014a8e] shrink-0"
        onClick={handleContactClick}
      >
        Contact
        <svg 
          className="w-3 h-3 md:w-4 md:h-4 transition-transform group-hover:translate-x-1" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </motion.button>
    </motion.nav>
  );
}
