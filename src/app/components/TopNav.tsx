import { motion } from "motion/react";
import { useNavigate, useLocation } from "react-router";
import { brandMarkUrl } from "../../brandMark";
import { scrollToTopInstant } from "../utils/scroll";
import { useLightExperience } from "../utils/performance";

function NstLogo() {
  return (
    <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 flex-shrink-0 flex items-center justify-center">
      <img
        src={brandMarkUrl}
        alt="NebulaSafeTech logo"
        width={36}
        height={36}
        decoding="async"
        className="w-full h-full object-contain block"
      />
    </div>
  );
}

export default function TopNav() {
  const light = useLightExperience();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      scrollToTopInstant();
      navigate("/");
    }
  };

  return (
    <motion.nav
      aria-label="Primary"
      className="absolute top-4 sm:top-5 left-4 sm:left-6 md:left-[50px] z-20 inline-flex items-center min-h-[44px] sm:min-h-[48px] md:min-h-[52px] px-3.5 sm:px-4 md:px-5 py-2 rounded-full"
      style={{
        background: "rgba(255,255,255,0.55)",
        backdropFilter: "blur(18px) saturate(180%)",
        WebkitBackdropFilter: "blur(18px) saturate(180%)",
        border: "1px solid rgba(255,255,255,0.55)",
        boxShadow: "0 2px_16px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.6)",
      }}
      initial={light ? { opacity: 1, y: 0 } : { y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: light ? 0.2 : 0.5, ease: "easeOut" }}
    >
      <button
        type="button"
        className="flex items-center gap-2.5 sm:gap-3 cursor-pointer border-none bg-transparent p-0 text-left rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#015aaa]/60"
        onClick={handleLogoClick}
        aria-label="NebulaSafeTech home"
      >
        <NstLogo />
        <span
          className="text-base sm:text-lg md:text-xl font-black tracking-[0.03em] text-gray-900 uppercase select-none relative sm:top-[-4px] md:top-[-8px] lg:top-[-8px]"
          style={{ fontFamily: "var(--font-company)", lineHeight: 1 }}
        >
          NebulaSafeTech
        </span>
      </button>
    </motion.nav>
  );
}
