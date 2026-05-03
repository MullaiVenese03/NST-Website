import { motion } from "motion/react";
import svgPaths from "../../imports/EdTechSection/svg-v7pn74uo9y";
import imgEdTech from "../../assets/EdTech-Image.png";

const bulletPoints = [
  "Industry-relevant training programs",
  "Hands-on labs & certifications",
  "Software project marketplace",
  "Launch & monetize your solutions",
];

function CheckIcon() {
  return (
    <svg width="18" height="13" viewBox="0 0 15.0006 12.6" fill="none" className="flex-shrink-0 mt-0.5">
      <path
        d={svgPaths.p557e254}
        stroke="#015AAA"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      />
    </svg>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

export default function EdTechSection() {
  return (
    <section className="w-full overflow-hidden" style={{ background: "#F8FAFE" }}>
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-stretch min-h-[420px]">
        {/* Left – Content */}
        <div className="flex-shrink-0 w-full lg:w-[42%] flex flex-col justify-center px-12 lg:px-16 py-14 lg:py-16">
          {/* Label */}
          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: "20px",
              letterSpacing: "1.2px",
              color: "#015AAA",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            EdTech Ecosystem
          </motion.p>

          {/* Heading */}
          <motion.h2
            custom={1}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{
              fontFamily: "'Geist', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(28px, 3vw, 36px)",
              letterSpacing: "0.64px",
              color: "#000",
              margin: 0,
              marginBottom: "12px",
              lineHeight: 1.15,
            }}
          >
            Learn. Build. Grow
          </motion.h2>

          {/* Sub-description */}
          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{
              fontFamily: "'Geist', sans-serif",
              fontWeight: 400,
              fontSize: "14px",
              letterSpacing: "2px",
              color: "#4a5565",
              lineHeight: 1.625,
              marginBottom: "28px",
            }}
          >
            Empowering the next generation of cybersecurity
            <br />
            professionals and entrepreneurs.
          </motion.p>

          {/* Bullet points */}
          <motion.ul
            custom={3}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col gap-[18px] mb-10 list-none p-0 m-0"
          >
            {bulletPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckIcon />
                <span
                  style={{
                    fontFamily: "'Geist', sans-serif",
                    fontWeight: 600,
                    fontSize: "16px",
                    letterSpacing: "0.32px",
                    color: "#000",
                    lineHeight: 1.4,
                  }}
                >
                  {point}
                </span>
              </li>
            ))}
          </motion.ul>

          {/* CTA Button */}
          <motion.a
            custom={4}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            href="/edtech"
            className="inline-flex items-center gap-2 group w-fit"
            style={{
              background: "#015AAA",
              borderRadius: "8px",
              padding: "10px 14px",
              textDecoration: "none",
            }}
          >
            <span
              style={{
                fontFamily: "'Satoshi', sans-serif",
                fontWeight: 700,
                fontSize: "13px",
                letterSpacing: "0.96px",
                color: "#fff",
                textTransform: "uppercase",
              }}
            >
              Explore EdTech Platform
            </span>
            <svg
              width="13"
              height="10"
              viewBox="0 0 13.5 9.5"
              fill="none"
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            >
              <path
                d={svgPaths.pbf23500}
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </svg>
          </motion.a>
        </div>

        {/* Right – Image */}
        <motion.div
          className="flex-1 flex items-center justify-center min-h-[360px] lg:min-h-0"
          style={{ background: "#F8FAFE" }}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <img
            src={imgEdTech}
            alt="EdTech platform showing featured projects and categories"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              objectPosition: "center",
              display: "block",
              maxHeight: "520px",
              padding: "16px 8px 16px 0",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}