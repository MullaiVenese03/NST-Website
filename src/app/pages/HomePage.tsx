import { lazy, Suspense, useEffect } from "react";
import { useLocation } from "react-router";
import EnhancedHeroSection from "../components/EnhancedHeroSection";
import TopNav from "../components/TopNav";
import { HeroParallax } from "../components/HeroParallax";
import { LazyWhenVisible } from "../components/LazyWhenVisible";
import { SeoHead } from "../../seo/SeoHead";
import { HOME_SEO } from "../../seo/pageMeta";
import { enableSmoothScroll, scrollToSection, scrollToTopInstant } from "../utils/scroll";
import { prefetchCommonRoutes } from "../utils/prefetchRoute";
import { useMotionEnabled } from "../utils/performance";

const ScrollToTop = lazy(() => import("../components/ScrollToTop"));

const sectionFallback = <div className="w-full min-h-[120px] bg-white" aria-hidden />;

const SECTION_IDS = ["hero", "clients", "about", "services", "testimonials", "edtech", "contact"] as const;

export default function HomePage() {
  const motionEnabled = useMotionEnabled();
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) scrollToTopInstant();
    enableSmoothScroll();
    prefetchCommonRoutes();
  }, [location.pathname]);

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.replace("#", "");
    scrollToSection(id);
  }, [location.hash, location.pathname]);

  useEffect(() => {
    const visible = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        let changed = false;
        for (const entry of entries) {
          const id = entry.target.id;
          if (!id) continue;
          if (entry.isIntersecting) {
            if (!visible.has(id)) {
              visible.add(id);
              changed = true;
              window.dispatchEvent(new CustomEvent("sectionChange", { detail: id }));
            }
          } else {
            visible.delete(id);
          }
        }
        if (!changed && window.scrollY < 100 && !visible.has("hero")) {
          window.dispatchEvent(new CustomEvent("sectionChange", { detail: "hero" }));
        }
      },
      { threshold: 0.2, rootMargin: "-20% 0px -45% 0px" },
    );

    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  const mainContent = (
    <main id="main-content">
      <HeroParallax enabled={motionEnabled}>
        <EnhancedHeroSection />
      </HeroParallax>

      <LazyWhenVisible
        id="clients"
        loader={() => import("../components/TrustedClientsSection")}
        fallback={sectionFallback}
        minHeight={150}
        className="relative w-full"
      />

      <LazyWhenVisible
        id="about"
        loader={() => import("../components/AboutSection")}
        fallback={sectionFallback}
        minHeight={340}
        className="relative w-full"
      />

      <LazyWhenVisible
        id="services"
        loader={() => import("../components/ServicesSection")}
        fallback={sectionFallback}
        minHeight={400}
        className="relative w-full"
      />

      <LazyWhenVisible
        id="testimonials"
        loader={() => import("../components/TestimonialsSection")}
        fallback={sectionFallback}
        minHeight={420}
        className="relative w-full"
      />

      <LazyWhenVisible
        id="edtech"
        loader={() => import("../components/EdTechSection")}
        fallback={sectionFallback}
        minHeight={420}
        className="relative w-full"
      />

      {/* TEMPORARILY DISABLED - NEX section will be re-enabled after project completion */}
      {/*
      <LazyWhenVisible
        id="nex"
        loader={() => import("../components/NexSection")}
        fallback={sectionFallback}
        minHeight={320}
        className="relative w-full"
      />
      */}

      <LazyWhenVisible
        hashTarget="contact"
        loader={() => import("../components/FooterSection")}
        fallback={sectionFallback}
        minHeight={280}
        className="relative w-full"
      />

      <Suspense fallback={null}>
        <ScrollToTop />
      </Suspense>
    </main>
  );

  return (
    <div className="bg-white min-h-screen overflow-x-clip w-full max-w-[100vw]">
      <SeoHead meta={HOME_SEO} />
      <TopNav />
      <div className="w-full relative z-10 min-w-0">{mainContent}</div>
    </div>
  );
}
