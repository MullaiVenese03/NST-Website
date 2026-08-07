import { motion, Variants } from "motion/react";
import { ResponsivePicture } from "./ResponsivePicture";
import { UNIFIED_PARTNER_LOGOS } from "../data/clientsData";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: "easeOut" },
  }),
};

export default function PartnersSection() {
  return (
    <section className="w-full bg-white py-16 sm:py-20 px-4 sm:px-8 md:px-14 lg:px-20 overflow-hidden border-t border-slate-100">
      <div className="max-w-[1440px] mx-auto">
        <motion.header
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-10 text-left max-w-2xl"
        >
          <p className="nst-eyebrow text-[#015AAA] text-left mb-3">
            Trusted by Industry &amp; Academia
          </p>
          <h2 className="nst-h2 text-slate-900 text-left mb-3">
            Partnering with Leaders Worldwide
          </h2>
          <p className="nst-body text-slate-500 text-left m-0">
            We are proud to work with innovative companies and academic institutions
            that trust us to secure their digital future.
          </p>
        </motion.header>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-6 justify-items-center items-center w-full max-w-[1440px] mx-auto">
          {UNIFIED_PARTNER_LOGOS.map((p, i) => (
            <motion.div
              key={p.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i % 5}
              className="bg-white flex flex-col items-center justify-center p-6 rounded-[16px] border border-slate-100 shadow-sm w-full min-h-[120px] transition-all duration-300 group text-center"
              whileHover={{ y: -4, scale: 1.03, boxShadow: "0 6px 18px rgba(1,90,170,0.1)" }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
            >
              <div className="w-full flex items-center justify-center h-16 shrink-0">
                <ResponsivePicture
                  slug={p.mediaSlug}
                  alt={p.alt}
                  className="max-h-12 w-auto max-w-[120px] object-contain mx-auto transition-transform duration-300 group-hover:scale-105"
                  profile="logo"
                />
              </div>
              <span className="nst-meta font-bold text-slate-700 text-center mt-2 group-hover:text-[#015AAA] transition-colors">
                {p.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
