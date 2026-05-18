import { motion, AnimatePresence } from "motion/react";
import { useNavigate, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { brandMarkUrl } from "../../brandMark";
import { navigateToContact, scrollToTopInstant } from "../utils/scroll";
import { prefetchRoute } from "../utils/prefetchRoute";
import { useLightExperience } from "../utils/performance";

const navItems = [
  { name: "Home", href: "hero", path: "/" },
  { name: "About", href: "about", path: "/about" },
  { name: "Services", href: "services", path: "/services" },
  { name: "Clients", href: "testimonials", path: "/clients" },
  { name: "EdTech", href: "edtech", path: "/edtech" },

];

function NstLogo() {
  return (
    <div className="w-8 h-8 md:w-10 md:h-10 flex-shrink-0 flex items-center justify-center">
      <img
        src={brandMarkUrl}
        alt=""
        width={40}
        height={40}
        decoding="async"
        className="w-full h-full object-contain"
      />
    </div>
  );
}

export default function TopNav() {
  const light = useLightExperience();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleSectionChange = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      if (location.pathname === "/") {
        setActiveSection(detail);
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

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!mobileOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleLogoClick = () => {
    setMobileOpen(false);
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      scrollToTopInstant();
      navigate("/");
    }
  };

  const handleContactClick = () => {
    setMobileOpen(false);
    navigateToContact(navigate, location.pathname === "/");
  };

  const handleNavClick = (item: (typeof navItems)[0]) => {
    setMobileOpen(false);
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
    scrollToTopInstant();
    navigate(item.path);
  };

  return (
    <>
      <motion.nav
        aria-label="Primary"
        className="fixed top-[18px] left-3 right-3 sm:left-4 sm:right-4 md:left-[50px] md:right-[50px] min-h-[52px] md:min-h-[60px] px-3 sm:px-4 md:px-6 flex items-center justify-between gap-2 z-[100] bg-white/10 backdrop-blur-md border border-white/20 rounded-[20px] shadow-lg overflow-visible"
        initial={light ? { opacity: 1, y: 0 } : { y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: light ? 0.2 : 0.5, ease: "easeOut" }}
      >
        <button
          type="button"
          className="flex gap-2 md:gap-3 cursor-pointer shrink-0 min-w-0 border-none bg-transparent p-0 text-left rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#015aaa]/60"
          onClick={handleLogoClick}
          aria-label="NebulaSafeTech home"
        >
          <NstLogo />
          <span
            className="text-base sm:text-xl md:text-3xl font-black tracking-[0.03em] text-gray-900 uppercase hidden sm:block relative top-[-4px] md:top-[-6px] leading-none truncate max-w-[40vw] md:max-w-none"
            style={{ fontFamily: "var(--font-company)" }}
          >
            NebulaSafeTech
          </span>
        </button>

        <div className="flex items-center gap-2 shrink-0 ml-auto">
          <motion.button
            type="button"
            className="md:hidden flex items-center justify-center rounded-xl border border-white/30 bg-white/20 text-gray-900 w-11 h-11 min-w-[44px] min-h-[44px] cursor-pointer"
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-primary-nav"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={22} strokeWidth={2.25} /> : <Menu size={22} strokeWidth={2.25} />}
          </motion.button>

          <motion.button
            type="button"
            className="bg-[#015aaa] text-white px-4 py-2.5 md:px-6 md:py-2.5 rounded-[16px] font-bold text-xs md:text-sm shadow-lg shadow-blue-200/50 flex items-center gap-2 group border-none cursor-pointer transition-colors hover:bg-[#014a8e] min-h-[44px]"
            onClick={handleContactClick}
            aria-label="Scroll to contact section"
          >
            Contact
            <svg
              className="w-3 h-3 md:w-4 md:h-4 transition-transform group-hover:translate-x-1 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            id="mobile-primary-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[190] md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
          >
            <button
              type="button"
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm border-none cursor-pointer"
              aria-label="Close menu overlay"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 34 }}
              className="absolute top-0 right-0 bottom-0 w-[min(100%,360px)] bg-white shadow-2xl flex flex-col pt-[88px] pb-8 px-6 overflow-y-auto"
            >
              <div className="flex flex-col gap-2">
                {navItems.map((item) => {
                  const isActive =
                    location.pathname === "/"
                      ? activeSection === item.href
                      : location.pathname === item.path;
                  return (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => handleNavClick(item)}
                      onMouseEnter={() => item.path.startsWith("/") && !item.path.includes("#") && prefetchRoute(item.path)}
                      onFocus={() => item.path.startsWith("/") && !item.path.includes("#") && prefetchRoute(item.path)}
                      className={`text-left py-3.5 px-4 rounded-xl font-bold text-base border-none cursor-pointer min-h-[48px] ${
                        isActive ? "bg-[#015aaa] text-white" : "bg-slate-50 text-gray-900 hover:bg-slate-100"
                      }`}
                    >
                      {item.name}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
