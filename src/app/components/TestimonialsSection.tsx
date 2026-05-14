import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "motion/react";
import svgPaths from "../../imports/TestimonialsSection/svg-2ss3ybjdpk";

import imgSlide1 from "../../assets/testimonial-st-joseph-1.png";
import imgSlide2 from "../../assets/testimonial-cppm-college.png";
import imgSlide3 from "../../assets/testimonial-st-joseph-2.png";
import imgSlide4 from "../../assets/testimonial-st-joseph-mou.png";
import imgSlide5 from "../../assets/testimonial-tn-police.png";
import imgSlide6 from "../../assets/testimonial-dhanalakshmi-mou.png";

const slides = [
  {
    img: imgSlide1,
    cardTitle: "Cybersecurity Awareness Program",
    org: "St. Joseph College for Women",
    text: "Happy to conduct a cybersecurity awareness session for students, where we discussed common cyber threats, online safety habits, and simple steps everyone can follow to stay secure in their daily digital life.",
  },
  {
    img: imgSlide2,
    cardTitle: "Cybersecurity Awareness Program",
    org: "CPPM College, Hosur",
    text: "Delivered an awareness program focused on digital safety, cyber hygiene, and common mistakes people make online. The session helped students understand how small actions can prevent bigger cyber problems.",
  },
  {
    img: imgSlide3,
    cardTitle: "Cybersecurity Seminar",
    org: "St. Joseph College for Women",
    text: "Presented a seminar covering the basics of cybersecurity, real-world cyber attack examples, and career paths in the field. The goal was to make cybersecurity easy to understand and relatable for students.",
  },
  {
    img: imgSlide4,
    cardTitle: "MoU Signing",
    org: "St. Joseph College for Women",
    text: "Proud to sign a Memorandum of Understanding to support cybersecurity training, hands-on learning, and collaboration between industry and students for future skill development.",
  },
  {
    img: imgSlide5,
    cardTitle: "Law Enforcement Training",
    org: "Tamil Nadu Police, Hosur",
    text: "Conducted a cybersecurity training session for law enforcement personnel, focusing on cybercrime awareness, basic digital investigation concepts, and understanding online threats more effectively.",
  },
  {
    img: imgSlide6,
    cardTitle: "MoU Signing & Academic Collaboration",
    org: "Dhanalakshmi Srinivasan College",
    text: "Happy to sign an MoU with Dhanalakshmi Srinivasan College, Perambalur, to promote cybersecurity awareness, practical learning, and industry-focused skill development for students.",
  },
];

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
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const update = () => {
      if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth);
    };
    update();
    const ro = new ResizeObserver(update);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

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
  const cardHeight = Math.round(cardWidth * (428 / 650));

  const cardGroupVariants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 80 : -80 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -80 : 80 }),
  };

  const descVariants: Variants = {
    enter: (d: number) => ({ opacity: 0, y: d > 0 ? 14 : -14 }),
    center: { opacity: 1, y: 0 },
    exit: (d: number) => ({ opacity: 0, y: d > 0 ? -14 : 14 }),
  };

  return (
    <section className="w-full bg-white py-14 px-6 md:px-10 lg:px-16 overflow-hidden">
      <div className="max-w-[1440px] mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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

        {/* Cards */}
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
                  <img
                    src={slide.img}
                    alt={slide.cardTitle}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {/* Gradient overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.08) 55%, transparent 100%)",
                    }}
                  />
                  {/* Card title */}
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

        {/* Description + navigation */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">

          {/* Animated description */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={descVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.32, ease: "easeOut" }}
              className="flex flex-col gap-2"
              style={{ maxWidth: "560px" }}
            >
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  style={{
                    fontFamily: 'var(--font-family)',
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
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center gap-3 flex-shrink-0 self-center sm:self-end pb-1">
            {/* Dot indicators */}
            <div className="flex items-center gap-1.5 mr-3">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className="rounded-full transition-all duration-300 cursor-pointer border-none"
                  style={{
                    width: i === activeIndex ? "20px" : "8px",
                    height: "8px",
                    background: i === activeIndex ? "#015AAA" : "#C6C6C6",
                  }}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            {/* Left arrow */}
            <motion.button
              onClick={goPrev}
              className="flex items-center justify-center rounded-full cursor-pointer border-none bg-transparent"
              style={{ width: 45, height: 45 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
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
            </motion.button>

            {/* Right arrow */}
            <motion.button
              onClick={goNext}
              className="flex items-center justify-center rounded-full cursor-pointer border-none bg-transparent"
              style={{ width: 45, height: 45 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
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
            </motion.button>
          </div>
        </div>

      </div>
    </section>
  );
}
