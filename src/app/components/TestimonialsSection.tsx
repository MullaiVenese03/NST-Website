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

const TWO_CARD_MIN_WIDTH = 768;
const CARD_GAP = 24;

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

  const cardsPerView = containerWidth >= TWO_CARD_MIN_WIDTH ? 2 : 1;

  useEffect(() => {
    setActiveIndex((i) => i % slides.length);
  }, [cardsPerView]);

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
    slides[(activeIndex + i) % slides.length],
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
    <section className="w-full bg-white py-12 sm:py-14 px-4 sm:px-6 md:px-10 lg:px-16">
      <div className="max-w-[1440px] mx-auto min-w-0">
        <motion.div
          initial={{ opacity: 0, y: light ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.55 }}
          className="mb-8 sm:mb-10"
        >
          <p
            className="text-[#015AAA] font-bold text-base sm:text-lg uppercase tracking-wider mb-2 sm:mb-2.5"
            style={{ fontFamily: "var(--font-family)" }}
          >
            Clients Love Us
          </p>
          <h2
            className="font-bold text-slate-900 m-0"
            style={{
              fontFamily: "var(--font-family)",
              fontSize: "clamp(1.5rem, 4vw, 2rem)",
              letterSpacing: "0.04em",
            }}
          >
            Trusted by Leaders
          </h2>
        </motion.div>

        <div
          ref={containerRef}
          className="relative w-full min-w-0 overflow-hidden rounded-lg"
          style={{
            aspectRatio: "650 / 428",
            maxHeight: "min(72vw, 420px)",
            minHeight: "200px",
          }}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`${activeIndex}-${cardsPerView}`}
              custom={direction}
              variants={cardGroupVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute inset-0 grid min-w-0"
              style={{
                gap: CARD_GAP,
                gridTemplateColumns: `repeat(${cardsPerView}, minmax(0, 1fr))`,
              }}
            >
              {visibleSlides.map((slide, i) => (
                <div
                  key={`${slide.mediaSlug}-${i}`}
                  className="relative min-w-0 h-full rounded-lg overflow-hidden border border-[#c6c6c6] shadow-[2px_2px_4px_0px_rgba(0,0,0,0.25)]"
                >
                  <ResponsivePicture
                    slug={slide.mediaSlug}
                    alt={slide.cardTitle}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    profile="testimonial"
                    sizes={
                      cardsPerView === 2
                        ? "(max-width: 768px) 92vw, 420px"
                        : "(max-width: 768px) 92vw, 640px"
                    }
                  />

                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.08) 55%, transparent 100%)",
                    }}
                  />

                  <p
                    className="absolute bottom-4 sm:bottom-5 left-0 right-0 text-center text-white font-bold text-sm sm:text-lg px-3 sm:px-4 m-0 leading-snug"
                    style={{ fontFamily: "var(--font-family)", letterSpacing: "0.06em" }}
                  >
                    {slide.cardTitle}
                  </p>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-6 sm:mt-8 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto] gap-6 lg:gap-10 items-start min-w-0">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={descVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.32, ease: "easeOut" }}
              className="flex flex-col gap-2 sm:gap-3 min-w-0 max-w-xl"
            >
              <div className="flex items-center gap-2 flex-wrap min-w-0">
                <span
                  className="font-bold text-base sm:text-lg text-slate-900"
                  style={{ fontFamily: "var(--font-family)", letterSpacing: "0.02em" }}
                >
                  {slides[activeIndex].org}
                </span>
                <VerifiedIcon />
              </div>
              <p
                className="text-sm sm:text-base text-[#6d6d6d] leading-relaxed m-0"
                style={{ fontFamily: "var(--font-family)" }}
              >
                {slides[activeIndex].text}
              </p>
              <p
                className="font-bold text-sm text-[#015AAA] m-0"
                style={{ fontFamily: "var(--font-family)" }}
              >
                {slides[activeIndex].participants}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex flex-col items-center gap-3 sm:gap-4 w-full min-w-0 lg:items-end lg:justify-center lg:pt-1">
            <div
              className="flex items-center justify-center gap-1.5 sm:gap-2 w-full max-w-full overflow-x-auto overscroll-x-contain px-2 py-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              role="tablist"
              aria-label="Testimonial slides"
            >
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === activeIndex}
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className="border-none bg-transparent p-1.5 sm:p-2 cursor-pointer flex items-center justify-center min-h-[36px] min-w-[32px] sm:min-h-[40px] sm:min-w-[36px] shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#015AAA]/60"
                >
                  <span
                    className={`block h-1.5 sm:h-2 rounded-full transition-[width,background-color] duration-300 ease-out ${
                      i === activeIndex
                        ? "w-[16px] sm:w-[22px] bg-[#015AAA]"
                        : "w-1.5 sm:w-2 bg-[#C6C6C6]"
                    }`}
                    aria-hidden
                  />
                </button>
              ))}
            </div>

            <div className="flex items-center justify-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={goPrev}
                className="flex items-center justify-center rounded-full cursor-pointer border-none bg-transparent transition-transform duration-200 hover:scale-105 active:scale-95 shrink-0 min-h-[44px] min-w-[44px]"
                aria-label="Previous testimonial"
              >
                <svg className="w-10 h-10 sm:w-11 sm:h-11" viewBox="0 0 35.75 35.75" fill="none" aria-hidden>
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
                className="flex items-center justify-center rounded-full cursor-pointer border-none bg-transparent transition-transform duration-200 hover:scale-105 active:scale-95 shrink-0 min-h-[44px] min-w-[44px]"
                aria-label="Next testimonial"
              >
                <svg className="w-10 h-10 sm:w-11 sm:h-11" viewBox="0 0 35.75 35.75" fill="none" aria-hidden>
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
      </div>
    </section>
  );
}
