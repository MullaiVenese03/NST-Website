import { motion } from "motion/react";
import { Link } from "react-router";
import svgPaths from "../../imports/EdTechSection/svg-v7pn74uo9y";
import { ResponsivePicture } from "./ResponsivePicture";
import { fadeHorizontalVariants, fadeUpVariants, VIEWPORT_ONCE } from "../utils/motionPresets";
import { useLightExperience } from "../utils/performance";

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

export default function EdTechSection() {
  const light = useLightExperience();
  const fadeUp = fadeUpVariants(light, 0.08);
  const fadeRight = fadeHorizontalVariants(light, "right");

  return (
    <section className="w-full overflow-hidden" style={{ background: "#F8FAFE" }}>
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-stretch min-h-[420px]">

        <div className="flex-shrink-0 w-full lg:w-[42%] flex flex-col justify-center px-5 sm:px-8 md:px-12 lg:px-16 py-14 lg:py-16 min-w-0">

          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            className="nst-eyebrow text-[#015AAA]"
            style={{
              marginBottom: "16px",
            }}
          >
            EdTech Ecosystem
          </motion.p>

          <motion.h2
            custom={1}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            className="nst-h2 text-slate-900"
            style={{
              marginBottom: "12px",
            }}
          >
            Learn. Build. Grow
          </motion.h2>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            className="nst-body-sm text-slate-500"
            style={{
              marginBottom: "28px",
            }}
          >
            Empowering the next generation of cybersecurity
            <br className="hidden sm:inline" />{" "}
            professionals and entrepreneurs.
          </motion.p>

          <motion.ul
            custom={3}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            className="flex flex-col gap-[18px] mb-10 list-none p-0 m-0"
          >
            {bulletPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckIcon />
                <span
                  className="nst-body font-semibold text-slate-900"
                >
                  {point}
                </span>
              </li>
            ))}
          </motion.ul>

          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            className="w-fit"
          >
            <Link
              to="/edtech"
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-[#015AAA] text-white font-bold nst-ui uppercase no-underline hover:bg-[#014080] hover:shadow-sm hover:-translate-y-0.5 active:scale-95 transition-all duration-300 group cursor-pointer shrink-0"
            >
              <span>Explore EdTech Platform</span>
              <svg
                width="13"
                height="10"
                viewBox="0 0 13.5 9.5"
                fill="none"
                className="transition-transform duration-200 group-hover:translate-x-1.5"
              >
                <path
                  d={svgPaths.pbf23500}
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.75"
                />
              </svg>
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="flex-1 flex items-center justify-center min-h-[360px] lg:min-h-0"
          style={{ background: "#F8FAFE" }}
          variants={fadeRight}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
        >
          <ResponsivePicture
            slug="edtech-hero"
            alt="EdTech platform showing featured projects and categories"
            className="w-full h-auto block"
            style={{
              objectFit: "contain",
              objectPosition: "center",
              maxHeight: "520px",
              padding: "16px 8px 16px 0",
            }}
            sizes="(max-width: 1024px) 100vw, 42vw"
          />
        </motion.div>
      </div>
    </section>
  );
}
