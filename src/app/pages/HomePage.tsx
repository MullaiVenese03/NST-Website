import { motion, useInView } from "motion/react";
import { useEffect, useState, useRef } from "react";
import EnhancedHeroSection from "../components/EnhancedHeroSection";
import ScrollProgress from "../components/ScrollProgress";
import { FloatingDots, AnimatedGradient } from "../components/FloatingElements";
import ParticleSystem from "../components/ParticleSystem";
import LoadingScreen from "../components/LoadingScreen";
import TrustedClientsSection from "../components/TrustedClientsSection";
import AboutSection from "../components/AboutSection";
import ServicesSection from "../components/ServicesSection";
import TestimonialsSection from "../components/TestimonialsSection";
import EdTechSection from "../components/EdTechSection";
import NexSection from "../components/NexSection";
import FooterSection from "../components/FooterSection";

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: false, amount: 0.3 });

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    const timer = setTimeout(() => {
      setMounted(true);
      setIsLoading(false);
    }, 800);

    return () => {
      clearTimeout(timer);
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      <ScrollProgress />
      <AnimatedGradient />
      <FloatingDots />
      <ParticleSystem count={30} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: mounted ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full min-h-screen overflow-x-hidden bg-white relative z-10"
      >
        <motion.div
          ref={heroRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
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
      </motion.div>
    </>
  );
}
