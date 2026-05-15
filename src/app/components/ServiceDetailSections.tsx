import { useRef } from "react";
import { Link } from "react-router";
import { motion, useScroll, useTransform, type Variants } from "motion/react";
import { ArrowRight, CheckCircle2, Mail } from "lucide-react";
import { Breadcrumbs } from "./Breadcrumbs";
import type { ServiceDetailContent } from "../data/serviceDetailContent";
import type { PageSeo } from "../../seo/pageMeta";
import AnimatedNumber from "./AnimatedNumber";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: "easeOut" },
  }),
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function useParallax(ref: React.RefObject<HTMLDivElement | null>, dist = 45) {
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  return useTransform(scrollYProgress, [0, 1], [-dist, dist]);
}

type ServiceHeroProps = {
  meta: PageSeo & { serviceType: string; summary: string };
  content: ServiceDetailContent;
};

export function ServiceDetailHero({ meta, content }: ServiceHeroProps) {
  const imgRef = useRef<HTMLDivElement>(null);
  const y = useParallax(imgRef, 35);

  return (
    <section className="relative w-full bg-white overflow-hidden pt-28 pb-16 md:pb-20 px-8 md:px-14 lg:px-20">
      <motion.div
        className="absolute top-20 right-0 w-[min(55vw,520px)] h-[min(55vw,520px)] rounded-full opacity-[0.07] pointer-events-none"
        style={{ background: "radial-gradient(circle, #015AAA 0%, transparent 70%)" }}
        aria-hidden
      />
      <div className="max-w-[1440px] mx-auto">
        <Breadcrumbs
          className="mb-8"
          items={[
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: meta.serviceType, path: meta.canonicalPath },
          ]}
        />

        <motion.div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="flex-1 min-w-0">
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="text-[#015AAA] text-sm md:text-base font-bold uppercase tracking-wider m-0 mb-3"
            >
              {content.eyebrow}
            </motion.p>
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="text-[clamp(2rem,4.5vw,3.5rem)] font-bold text-slate-900 leading-[1.08] m-0 mb-4"
              style={{ fontFamily: "var(--font-family)" }}
            >
              {content.heroHeadline}
              <br />
              <span className="text-[#015AAA]">{content.heroHighlight}</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="text-lg text-slate-600 leading-relaxed m-0 mb-4 max-w-xl"
            >
              {content.tagline}
            </motion.p>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="text-base text-slate-500 leading-relaxed m-0 mb-6 max-w-xl"
            >
              {meta.summary}
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              className="flex flex-wrap gap-2 mb-8"
            >
              {content.highlights.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#015AAA]/8 border border-[#015AAA]/15 px-3.5 py-1.5 text-sm font-semibold text-[#015AAA]"
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden />
                  {tag}
                </span>
              ))}
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={4}
              className="flex flex-wrap gap-3"
            >
              <a
                href={`mailto:info@nebulasafetech.com?subject=${encodeURIComponent(meta.serviceType + " inquiry")}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#015AAA] text-white font-semibold px-6 py-3.5 no-underline hover:bg-[#014080] transition-colors shadow-lg shadow-blue-200/40"
              >
                Discuss this service
                <ArrowRight className="w-4 h-4" aria-hidden />
              </a>
              <Link
                to="/services"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 text-slate-800 font-semibold px-6 py-3.5 no-underline hover:border-[#015AAA]/40 hover:text-[#015AAA] transition-colors"
              >
                All services
              </Link>
            </motion.div>
          </div>

          <motion.div
            ref={imgRef}
            className="flex-1 min-w-0 w-full max-w-lg lg:max-w-none relative flex items-center justify-center"
            variants={fadeRight}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="relative w-full rounded-3xl border border-slate-100 bg-gradient-to-br from-slate-50 to-white p-8 md:p-10 shadow-xl shadow-slate-200/50"
              style={{ y }}
            >
              <div
                className="absolute inset-0 rounded-3xl opacity-30 pointer-events-none"
                style={{ background: "radial-gradient(circle at 30% 20%, #015AAA 0%, transparent 55%)" }}
                aria-hidden
              />
              <motion.img
                src={content.heroImage}
                alt={content.heroImageAlt}
                className="relative z-10 w-full h-auto max-h-[340px] object-contain mx-auto"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export function ServiceOfferingsSection({ content }: { content: ServiceDetailContent }) {
  const gridCols =
    content.offerings.length >= 5
      ? "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
      : "sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4";

  return (
    <section className="w-full py-16 md:py-20 px-8 md:px-14 lg:px-20" style={{ background: "#F8FAFE" }}>
      <div className="max-w-[1440px] mx-auto">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-[#015AAA] text-sm md:text-base font-bold uppercase tracking-wider m-0 mb-2"
        >
          Offerings
        </motion.p>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
          className="text-2xl md:text-4xl font-bold text-slate-900 m-0 mb-3 leading-tight"
          style={{ fontFamily: "var(--font-family)" }}
        >
          {content.offeringsTitle}
        </motion.h2>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={2}
          className="text-slate-600 text-base md:text-lg leading-relaxed m-0 mb-10 max-w-2xl"
        >
          {content.offeringsSubtitle}
        </motion.p>

        <div className={`grid grid-cols-1 ${gridCols} gap-6`}>
          {content.offerings.map((item, i) => (
            <motion.article
              key={item.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              custom={i % 4}
              className="group relative rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden h-full"
            >
              <motion.div className="p-6 pb-2 flex items-center justify-center h-36 bg-gradient-to-b from-[#015AAA]/5 to-transparent">
                <img
                  src={item.image}
                  alt=""
                  className="max-h-[100px] w-auto object-contain transition-transform duration-500 group-hover:scale-110"
                />
              </motion.div>
              <div className="px-6 pb-6 flex flex-col flex-1">
                <h3 className="text-lg md:text-xl font-bold text-slate-900 m-0 mb-2 group-hover:text-[#015AAA] transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm md:text-base text-slate-500 leading-relaxed m-0 flex-1">{item.description}</p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#015AAA] to-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-2xl" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServiceCapabilitiesSection({ content }: { content: ServiceDetailContent }) {
  return (
    <section className="w-full py-16 md:py-20 px-8 md:px-14 lg:px-20 bg-white">
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
        <motion.div
          className="lg:w-[38%] shrink-0"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p className="text-[#015AAA] text-sm md:text-base font-bold uppercase tracking-wider m-0 mb-2">Capabilities</p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 m-0 mb-4 leading-tight" style={{ fontFamily: "var(--font-family)" }}>
            {content.capabilitiesTitle}
          </h2>
          <p className="text-slate-600 text-base leading-relaxed m-0">{content.tagline}</p>
        </motion.div>

        <motion.ul
          className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 list-none m-0 p-0"
          variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {content.capabilities.map((cap) => (
            <motion.li
              key={cap}
              variants={fadeUp}
              className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/60 px-4 py-3.5 text-slate-800 font-medium text-sm md:text-base"
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#015AAA]/10 text-[#015AAA] shrink-0">
                <CheckCircle2 className="w-4 h-4" aria-hidden />
              </span>
              {cap}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

export function ServiceBenefitsSection({ content }: { content: ServiceDetailContent }) {
  return (
    <section className="w-full py-16 md:py-20 px-8 md:px-14 lg:px-20 bg-white border-t border-slate-100">
      <div className="max-w-[1440px] mx-auto">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-[#015AAA] text-sm md:text-base font-bold uppercase tracking-wider m-0 mb-2 text-center"
        >
          Why NebulaSafeTech
        </motion.p>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
          className="text-2xl md:text-3xl font-bold text-slate-900 m-0 mb-10 text-center"
          style={{ fontFamily: "var(--font-family)" }}
        >
          Built for outcomes, not checkboxes
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {content.benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm hover:shadow-md hover:border-[#015AAA]/20 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#015AAA]/10 text-[#015AAA] flex items-center justify-center font-bold text-lg mb-5 group-hover:bg-[#015AAA] group-hover:text-white transition-colors">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="text-xl font-bold text-slate-900 m-0 mb-2 group-hover:text-[#015AAA] transition-colors">
                {benefit.title}
              </h3>
              <p className="text-slate-600 text-base leading-relaxed m-0">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServiceProcessSection({ content }: { content: ServiceDetailContent }) {
  return (
    <section className="w-full py-16 md:py-20 px-8 md:px-14 lg:px-20 overflow-hidden" style={{ background: "#F8FAFE" }}>
      <motion.div className="max-w-[1440px] mx-auto">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-[#015AAA] text-sm md:text-base font-bold uppercase tracking-wider m-0 mb-2"
        >
          Process
        </motion.p>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
          className="text-2xl md:text-4xl font-bold text-slate-900 m-0 mb-3"
          style={{ fontFamily: "var(--font-family)" }}
        >
          {content.processTitle}
        </motion.h2>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={2}
          className="text-slate-600 text-base md:text-lg m-0 mb-12 max-w-2xl"
        >
          {content.processSubtitle}
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {content.processSteps.map((step, i) => (
            <motion.div
              key={step.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              className="relative rounded-2xl bg-white border border-slate-100 p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col min-h-[200px]"
            >
              <AnimatedNumber value={step.num} className="text-3xl font-black text-[#015AAA]/25 tracking-tighter mb-3" />
              <h3 className="text-lg font-bold text-slate-900 m-0 mb-2">{step.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed m-0 mt-auto">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export function ServiceCtaSection({ content }: { content: ServiceDetailContent }) {
  return (
    <section className="w-full py-16 md:py-20 px-8 md:px-14 lg:px-20">
      <motion.div
        className="max-w-[1440px] mx-auto rounded-3xl overflow-hidden relative"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #014080 0%, #015AAA 50%, #1a7fd4 100%)",
          }}
          aria-hidden
        />
        <div className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden>
          <motion.div
            className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-white/30 blur-3xl"
            animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.35, 0.2] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="relative z-10 px-8 py-12 md:px-14 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="max-w-xl">
            <h2 className="text-2xl md:text-3xl font-bold text-white m-0 mb-3 leading-tight">{content.ctaHeadline}</h2>
            <p className="text-blue-100 text-base md:text-lg leading-relaxed m-0">{content.ctaDescription}</p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center shrink-0">
            <a
              href="mailto:info@nebulasafetech.com"
              className="inline-flex items-center gap-2 rounded-xl bg-white text-[#015AAA] font-bold px-7 py-3.5 no-underline hover:bg-blue-50 transition-colors shadow-lg"
            >
              <Mail className="w-5 h-5" aria-hidden />
              Email us
            </a>
            <Link
              to="/#contact"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-white/40 text-white font-semibold px-7 py-3.5 no-underline hover:bg-white/10 transition-colors"
            >
              Contact form
              <ArrowRight className="w-4 h-4" aria-hidden />
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
