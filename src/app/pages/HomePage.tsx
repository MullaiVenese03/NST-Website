import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useState, useRef } from "react";
import EnhancedHeroSection from "../components/EnhancedHeroSection";

import LoadingScreen from "../components/LoadingScreen";
import TrustedClientsSection from "../components/TrustedClientsSection";
import AboutSection from "../components/AboutSection";
import ServicesSection from "../components/ServicesSection";
import TestimonialsSection from "../components/TestimonialsSection";
import EdTechSection from "../components/EdTechSection";
import NexSection from "../components/NexSection";
import FooterSection from "../components/FooterSection";
import TopNav from "../components/TopNav";
import ScrollToTop from "../components/ScrollToTop";
import { enableSmoothScroll, scrollToTopInstant } from "../utils/scroll";

// Skip intro splash in production for faster LCP and better Lighthouse scores; dev keeps the animation once per session.
let hasShownLoadingAnimation = import.meta.env.PROD;

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(!hasShownLoadingAnimation);
  const [isRevealed, setIsRevealed] = useState(hasShownLoadingAnimation);
  const heroRef = useRef<HTMLDivElement>(null);

  // Parallax for hero section
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);

  useEffect(() => {
    if (!hasShownLoadingAnimation) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      scrollToTopInstant();
      enableSmoothScroll();
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!isRevealed) return;

    const sections = ["hero", "clients", "about", "services", "testimonials", "edtech", "nex", "contact"];

    const observers = sections.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            window.dispatchEvent(new CustomEvent("sectionChange", { detail: id }));
          }
        },
        { threshold: 0.2, rootMargin: "-20% 0px -45% 0px" }
      );
      observer.observe(el);
      return observer;
    });

    const handleScroll = () => {
      if (window.scrollY < 100) {
        window.dispatchEvent(new CustomEvent("sectionChange", { detail: "hero" }));
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observers.forEach(obs => obs?.disconnect());
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isRevealed]);

  const handleReveal = () => {
    hasShownLoadingAnimation = true;
    setIsLoading(false);
    setIsRevealed(true);
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
    scrollToTopInstant();
    enableSmoothScroll();
    window.dispatchEvent(new CustomEvent("sectionChange", { detail: "hero" }));
  };

  return (
    <div className="bg-white min-h-screen">
      {isLoading ? (
        <LoadingScreen isLoading={isLoading} onReveal={handleReveal} />
      ) : null}
      
      <div>
        <TopNav />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isRevealed ? 1 : 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="w-full relative z-10"
        >
          {/* Hero section with parallax */}
          <motion.div
            ref={heroRef}
            style={{ y: heroY, opacity: heroOpacity }}
            className="relative w-full"
            id="hero"
          >
            <EnhancedHeroSection />
          </motion.div>

          {/* Trusted Clients Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative w-full"
            id="clients"
          >
            <TrustedClientsSection />
          </motion.div>

          {/* About Us Section */}
          <div className="relative w-full" id="about">
            <AboutSection />
          </div>

          {/* Services Section */}
          <div className="relative w-full" id="services">
            <ServicesSection />
          </div>

          {/* Testimonials Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative w-full"
            id="testimonials"
          >
            <TestimonialsSection />
          </motion.div>

          {/* EdTech Ecosystem Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative w-full"
            id="edtech"
          >
            <EdTechSection />
          </motion.div>

          {/* NEX Product Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative w-full"
            id="nex"
          >
            <NexSection />
          </motion.div>

          {/* Footer / Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative w-full"
            id="contact"
          >
            <FooterSection />
          </motion.div>
          <ScrollToTop />
        </motion.div>
      </div>
    </div>
  );
}
