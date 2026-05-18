import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, Variants } from "motion/react";
import { VIEWPORT_ONCE } from "../utils/motionPresets";
import { useLightExperience } from "../utils/performance";
import svgPaths from "../../imports/TestimonialsSection/svg-2ss3ybjdpk";

import { CLIENT_PROGRAMS } from "../data/clientsData";
import { ResponsivePicture } from "./ResponsivePicture";

const slides = CLIENT_PROGRAMS.map((program) => ({
  mediaSlug: program.mediaSlug,
  cardTitle: program.label,
  org: program.institution,
  text: program.desc,
  participants: program.participants,
}));

function VerifiedIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 15.5 15.5" fill="none" className="flex-shrink-0">
      <path
        d={svgPaths.p37b30500}
        stroke="#015AAA"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export default function TestimonialsSection() {
  const light = useLightExperience();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  const updateWidth = useCallback(() => {
    if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth);
  }, []);

  useEffect(() => {
    updateWidth();
    const ro = new ResizeObserver(() => {
      requestAnimationFrame(updateWidth);
    });
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [updateWidth]);

  const cardsPerView = containerWidth > 720 ? 2 : 1;
  const GAP = 24;

  const goPrev = () => {
    setDirection(-1);
    setActiveIndex((i) => (i - 1 + slides.length) % slides.length);
  };

  const goNext = () => {
    setDirection(1);
    setActiveIndex((i) => (i + 1) % slides.length);
  };

  const goTo = (i: number) => {
    setDirection(i > activeIndex ? 1 : -1);
    setActiveIndex(i);
  };

  const visibleSlides = Array.from({ length: cardsPerView }, (_, i) =>
    slides[(activeIndex + i) % slides.length]
  );

  const cardWidth = containerWidth > 0
    ? (containerWidth - (cardsPerView - 1) * GAP) / cardsPerView
    : 600;
  const cardHeight = Math.min(
    Math.max(Math.round(cardWidth * (428 / 650)), 220),
    containerWidth > 0 && containerWidth <= 480 ? 300 : 380
  );

  const cardGroupVariants = {
    enter: (d: number) =>
      light ? { opacity: 0 } : { opacity: 0, x: d > 0 ? 48 : -48 },
    center: { opacity: 1, x: 0 },
    exit: (d: number) =>
      light ? { opacity: 0 } : { opacity: 0, x: d > 0 ? -48 : 48 },
  };

  const descVariants: Variants = {
    enter: () => ({ opacity: 0 }),
    center: { opacity: 1 },
    exit: () => ({ opacity: 0 }),
  };

  return (
    <section className="w-full bg-white py-12 sm:py-14 px-4 sm:px-6 md:px-10 lg:px-16 overflow-hidden">
      <div className="max-w-[1440px] mx-auto">

        <motion.div
          initial={{ opacity: 0, y: light ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.55 }}
          className="mb-10"
        >
          <p
            style={{
              fontFamily: 'var(--font-family)',
              fontWeight: 700,
              fontSize: "20px",
              letterSpacing: "1.2px",
              color: "#015AAA",
              textTransform: "uppercase",
              marginBottom: "10px",
            }}
          >
            Clients Love Us
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-family)',
              fontWeight: 700,
              fontSize: "clamp(26px, 3vw, 32px)",
              letterSpacing: "0.64px",
              color: "#000",
              margin: 0,
            }}
          >
            Trusted by Leaders
          </h2>
        </motion.div>

        <div ref={containerRef} className="relative" style={{ height: cardHeight, overflow: "hidden" }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={cardGroupVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute inset-0 flex"
              style={{ gap: GAP }}
            >
              {visibleSlides.map((slide, i) => (
                <div
                  key={i}
                  className="relative rounded-[8px] overflow-hidden flex-1"
                  style={{
                    boxShadow: "2px 2px 4px 0px rgba(0,0,0,0.25)",
                    border: "1px solid #c6c6c6",
                  }}
                >
                  <ResponsivePicture
                    slug={slide.mediaSlug}
                    alt={slide.cardTitle}
                    className="absolute inset-0 w-full h-full object-cover"
                    profile="testimonial"
                    sizes="(max-width: 720px) 92vw, 420px"
                  />

                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.08) 55%, transparent 100%)",
                    }}
                  />

                  <p
                    className="absolute bottom-5 left-0 right-0 text-center text-white"
                    style={{
                      fontFamily: 'var(--font-family)',
                      fontWeight: 700,
                      fontSize: "18px",
                      letterSpacing: "1.08px",
                      margin: 0,
                      padding: "0 16px",
                    }}
                  >
                    {slide.cardTitle}
                  </p>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={descVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.32, ease: "easeOut" }}
              className="flex flex-col gap-3"
              style={{ maxWidth: "560px" }}
            >
              <div className="flex items-center gap-2 flex-wrap min-w-0">
                <span
                  style={{
                    fontFamily: "var(--font-family)",
                    fontWeight: 700,
                    fontSize: "18px",
                    letterSpacing: "0.36px",
                    color: "#000",
                  }}
                >
                  {slides[activeIndex].org}
                </span>
                <VerifiedIcon />
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-family)',
                  fontWeight: 500,
                  fontSize: "16px",
                  letterSpacing: "0.32px",
                  color: "#6d6d6d",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {slides[activeIndex].text}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-family)',
                  fontWeight: 700,
                  fontSize: "14px",
                  letterSpacing: "0.28px",
                  color: "#015AAA",
                  margin: 0,
                }}
              >
                {slides[activeIndex].participants}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center gap-3 flex-shrink-0 self-center sm:self-end pb-1">

            <motion.div className="flex items-center gap-2 mr-3" role="tablist" aria-label="Testimonial slides">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === activeIndex}
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className="border-none bg-transparent p-3 cursor-pointer flex items-center justify-center min-h-[44px] min-w-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#015AAA]/60"
                >
                  <span
                    className="block rounded-full transition-[width,background-color] duration-300 ease-out"
                    style={{
                      width: i === activeIndex ? "22px" : "8px",
                      height: "8px",
                      background: i === activeIndex ? "#015AAA" : "#C6C6C6",
                    }}
                    aria-hidden
                  />
                </button>
              ))}
            </motion.div>

            <button
              type="button"
              onClick={goPrev}
              className="flex items-center justify-center rounded-full cursor-pointer border-none bg-transparent transition-transform duration-200 hover:scale-105 active:scale-95"
              style={{ width: 45, height: 45 }}
              aria-label="Previous"
            >
              <svg width="45" height="45" viewBox="0 0 35.75 35.75" fill="none">
                <path
                  d={svgPaths.p2ebc4680}
                  stroke="#015AAA"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </button>

            <button
              type="button"
              onClick={goNext}
              className="flex items-center justify-center rounded-full cursor-pointer border-none bg-transparent transition-transform duration-200 hover:scale-105 active:scale-95"
              style={{ width: 45, height: 45 }}
              aria-label="Next"
            >
              <svg width="45" height="45" viewBox="0 0 35.75 35.75" fill="none">
                <path
                  d={svgPaths.p67ae800}
                  stroke="#015AAA"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
