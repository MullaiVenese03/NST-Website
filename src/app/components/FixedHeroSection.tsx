import { motion } from "motion/react";
import { useNavigate } from "react-router";
import svgPaths from "../../imports/HeroSection/svg-3kvcnifylj";

function NstLogo() {
  return (
    <motion.div
      className="w-14 h-14"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
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
    </motion.div>
  );
}

function TopNav() {
  const navigate = useNavigate();

  const topNavItems = [
    { name: "Home",     href: "/",         isRoute: true },
    { name: "About",    href: "/about",    isRoute: true },
    { name: "Services", href: "/services", isRoute: true },
    { name: "Clients",  href: "/clients",  isRoute: true },
    { name: "EdTech",   href: "/edtech",   isRoute: true },
    { name: "NEX",      href: "#nex",      isRoute: false },
  ];

  const handleTopNav = (item: typeof topNavItems[0]) => {
    if (item.isRoute) {
      navigate(item.href);
    } else {
      const el = document.querySelector(`#${item.href.slice(1)}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.nav
      className="flex items-center justify-between px-16 py-6 relative z-20"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <div className="flex items-center gap-4">
        <NstLogo />
        <h1 className="text-3xl font-bold tracking-wider text-black">NebulaSafeTech</h1>
      </div>

      {/* Center nav links */}
      <div className="hidden lg:flex items-center gap-1">
        {topNavItems.map((item) => (
          <motion.button
            key={item.name}
            onClick={() => handleTopNav(item)}
            className="px-4 py-2 rounded-full font-semibold text-sm text-black hover:bg-gray-200/50 hover:text-[#015aaa] transition-all cursor-pointer border-none bg-transparent"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {item.name}
          </motion.button>
        ))}
      </div>

      <motion.button
        className="bg-[#015aaa] text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Contact
        <svg className="w-5 h-5" fill="none" viewBox="0 0 19.5 11.5">
          <path d={svgPaths.p3c346e80} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </svg>
      </motion.button>
    </motion.nav>
  );
}

function HeroContent() {
  return (
    <div className="flex flex-col items-start justify-center px-16 py-20 relative z-10">
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <motion.h2
          className="text-7xl font-bold leading-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <span className="text-[#015aaa]">One</span> Entry.
          </motion.div>
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            <span className="text-[#015aaa]">One</span> Device.
          </motion.div>
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.3 }}
          >
            <span className="text-[#015aaa]">One</span> Purpose.
          </motion.div>
        </motion.h2>
      </motion.div>

      <motion.p
        className="text-xl text-gray-600 mt-8 max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        Cybersecurity and IT solutions built to protect what
        <br />
        matters most - your data, your systems, your future.
      </motion.p>

      <motion.div
        className="flex items-center gap-2 mt-6 text-sm text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.7 }}
      >
        <svg className="w-3 h-3" viewBox="0 0 9 9.92341">
          <path d={svgPaths.p31b6e600} stroke="#015AAA" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span>Trusted by enterprises Worldwide</span>
      </motion.div>
    </div>
  );
}

function BottomNav() {
  const navigate = useNavigate();

  const navItems = [
    { name: "Home",     href: "/",         isRoute: true },
    { name: "About",    href: "/about",    isRoute: true },
    { name: "Services", href: "/services", isRoute: true },
    { name: "Clients",  href: "/clients",  isRoute: true },
    { name: "EdTech",   href: "/edtech",   isRoute: true },
    { name: "NEX",      href: "#nex",      isRoute: false },
  ];

  const handleClick = (item: typeof navItems[0]) => {
    if (item.isRoute) {
      navigate(item.href);
    } else {
      const el = document.querySelector(item.href);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.div
      className="flex items-center justify-center gap-2 px-16 pb-12 relative z-10"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.9 }}
    >
      <div className="bg-gray-200/40 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-4">
        {navItems.map((item, index) => (
          <motion.button
            key={item.name}
            onClick={() => handleClick(item)}
            className={`px-8 py-2 rounded-full font-bold text-sm transition-all cursor-pointer ${
              item.name === "Home" ? "bg-[#015aaa] text-white" : "text-black hover:bg-gray-200/50"
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 2 + index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {item.name}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

export default function FixedHeroSection() {
  return (
    <div className="relative w-full h-screen flex flex-col justify-between">
      <TopNav />
      <HeroContent />
      <BottomNav />
    </div>
  );
}