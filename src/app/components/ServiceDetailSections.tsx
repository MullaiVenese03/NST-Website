import { useRef } from "react";
import { Link } from "react-router";
import { motion, type Variants } from "motion/react";
import { useParallaxY, VIEWPORT_ONCE, MOTION_EASE_OUT, fadeUpVariants } from "../utils/motionPresets";
import { useLightExperience } from "../utils/performance";
import { ArrowRight, CheckCircle2, Mail, Users } from "lucide-react";
import { Breadcrumbs } from "./Breadcrumbs";
import type { ServiceDetailContent } from "../data/serviceDetailContent";
import { ResponsivePicture } from "./ResponsivePicture";
import ContactForm from "./ContactForm";
import type { PageSeo } from "../../seo/pageMeta";
import AnimatedNumber from "./AnimatedNumber";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.52, delay: i * 0.08, ease: MOTION_EASE_OUT },
  }),
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: MOTION_EASE_OUT } },
};

type ServiceHeroProps = {
  meta: PageSeo & { serviceType: string; summary: string };
  content: ServiceDetailContent;
  breadcrumbItems?: { name: string; path: string }[];
};

export function ServiceDetailHero({ meta, content, breadcrumbItems }: ServiceHeroProps) {
  const imgRef = useRef<HTMLDivElement>(null);
  const y = useParallaxY(imgRef, 35);

  return (
    <section className="relative w-full bg-white overflow-hidden pt-28 pb-16 md:pb-20 px-8 md:px-14 lg:px-20">
      <div className="max-w-[1440px] mx-auto">
        <Breadcrumbs
          className="mb-8"
          items={breadcrumbItems || [
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
              className="nst-eyebrow font-bold text-[#015AAA] m-0 mb-3"
            >
              {content.eyebrow}
            </motion.p>
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="nst-h1 text-slate-900 m-0 mb-4"
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
              className="nst-body text-slate-600 m-0 mb-4 max-w-xl"
            >
              {content.tagline}
            </motion.p>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="nst-small text-slate-500 m-0 mb-6 max-w-xl"
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
                className="nst-ui font-semibold inline-flex items-center justify-center gap-2 rounded-xl bg-[#015AAA] text-white px-6 py-3.5 no-underline hover:bg-[#014080] transition-colors shadow-sm"
              >
                Discuss this service
                <ArrowRight className="w-4 h-4" aria-hidden />
              </a>
              <Link
                to="/services"
                className="nst-ui font-semibold inline-flex items-center justify-center rounded-xl border border-slate-200 text-slate-800 px-6 py-3.5 no-underline hover:border-[#015AAA]/40 hover:text-[#015AAA] transition-colors"
              >
                All services
              </Link>
            </motion.div>
          </div>

          <motion.div
            ref={imgRef}
            className="flex-1 min-w-0 w-full lg:max-w-[500px] flex items-center justify-center"
            variants={fadeRight}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="w-full rounded-2xl border border-slate-200/80 bg-slate-50/50 p-6 sm:p-8 md:p-10 flex items-center justify-center shadow-xs"
              style={{ y }}
            >
              <div className="flex items-center justify-center min-h-[220px] sm:min-h-[260px] max-h-[340px] w-full">
                <ResponsivePicture
                  slug={content.heroMedia}
                  alt={content.heroImageAlt}
                  className="w-full h-auto max-w-full max-h-[280px] sm:max-h-[320px] object-contain object-center mx-auto select-none"
                  sizes="(max-width: 1024px) 90vw, 480px"
                  profile="icon"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export function ProblemAndAudienceSection({
  problemStatement,
  audiences,
  problemEyebrow = "Why This Matters",
  problemTitle = "The core challenge",
  audienceEyebrow = "Who This Is For",
  audienceTitle = "Typical clients & partners",
}: {
  problemStatement: string;
  audiences: string[];
  problemEyebrow?: string;
  problemTitle?: string;
  audienceEyebrow?: string;
  audienceTitle?: string;
}) {
  const light = useLightExperience();
  const fadeUp = fadeUpVariants(light, 0.08);

  return (
    <section className="w-full bg-white border-y border-slate-100 py-14 md:py-18 px-8 md:px-14 lg:px-20">
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20">
        <div className="flex-1 min-w-0">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            className="nst-eyebrow font-bold text-[#015AAA] m-0 mb-2"
          >
            {problemEyebrow}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            custom={1}
            className="nst-h2 text-slate-900 m-0 mb-4"
          >
            {problemTitle}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            custom={2}
            className="nst-body text-slate-600 m-0 max-w-prose leading-relaxed pl-4 border-l-2 border-[#015AAA]/40"
          >
            {problemStatement}
          </motion.p>
        </div>

        <div className="flex-1 min-w-0">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            className="nst-eyebrow font-bold text-[#015AAA] m-0 mb-2"
          >
            {audienceEyebrow}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            custom={1}
            className="nst-h2 text-slate-900 m-0 mb-6"
          >
            {audienceTitle}
          </motion.h2>
          <motion.ul
            className="space-y-3 list-none m-0 p-0"
            variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
          >
            {audiences.map((audience) => (
              <motion.li
                key={audience}
                variants={fadeUp}
                className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/60 px-4 py-3.5 nst-small text-slate-800"
              >
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#015AAA]/10 text-[#015AAA] shrink-0 mt-0.5">
                  <Users className="w-4 h-4" aria-hidden />
                </span>
                {audience}
              </motion.li>
            ))}
          </motion.ul>
        </div>
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
          viewport={VIEWPORT_ONCE}
          className="nst-eyebrow font-bold text-[#015AAA] m-0 mb-2"
        >
          Offerings
        </motion.p>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          custom={1}
          className="nst-h2 text-slate-900 m-0 mb-3"
        >
          {content.offeringsTitle}
        </motion.h2>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          custom={2}
          className="nst-body text-slate-600 m-0 mb-10 max-w-2xl"
        >
          {content.offeringsSubtitle}
        </motion.p>

        <div className={`grid grid-cols-1 ${gridCols} gap-6`}>
          {content.offerings.map((item, i) => {
            const cardInner = (
              <>
                <div className="p-5 pb-2 flex items-center justify-center h-28 sm:h-32 bg-[#F8FAFE] shrink-0">
                  <ResponsivePicture
                    slug={item.mediaSlug}
                    alt=""
                    className="max-h-16 sm:max-h-20 w-auto object-contain transition-transform duration-200 ease-out group-hover:scale-105"
                    profile="icon"
                  />
                </div>
                <div className="p-5 pt-2 flex flex-col flex-1 min-w-0">
                  <h3 className="nst-h4 text-slate-900 m-0 mb-2 group-hover:text-[#015AAA] transition-colors duration-200">
                    {item.title}
                  </h3>
                  <p className="nst-small text-slate-500 m-0 flex-1">{item.description}</p>
                  {item.link ? (
                    <span className="nst-small font-semibold text-[#015AAA] inline-flex items-center gap-1.5 mt-4 group-hover:translate-x-1 transition-transform duration-200">
                      Learn more
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </span>
                  ) : null}
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#0056A7] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out origin-left pointer-events-none" aria-hidden />
              </>
            );

            const cardClasses =
              "group relative rounded-2xl bg-white border border-slate-100 hover:border-slate-200/90 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col overflow-hidden h-full no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#015AAA]";

            return item.link ? (
              <motion.div
                key={item.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                custom={i % 4}
                className="h-full flex flex-col"
              >
                <Link to={item.link} className={cardClasses}>
                  {cardInner}
                </Link>
              </motion.div>
            ) : (
              <motion.article
                key={item.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                custom={i % 4}
                className={cardClasses}
              >
                {cardInner}
              </motion.article>
            );
          })}
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
          viewport={VIEWPORT_ONCE}
        >
          <p className="nst-eyebrow font-bold text-[#015AAA] m-0 mb-2">Capabilities</p>
          <h2 className="nst-h2 text-slate-900 m-0 mb-4">
            {content.capabilitiesTitle}
          </h2>
          <p className="nst-body text-slate-600 m-0">{content.tagline}</p>
        </motion.div>

        <motion.ul
          className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 list-none m-0 p-0"
          variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
        >
          {content.capabilities.map((cap) => (
            <motion.li
              key={cap}
              variants={fadeUp}
              className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/60 px-4 py-3.5 text-slate-800 nst-small"
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
          viewport={VIEWPORT_ONCE}
          className="nst-eyebrow font-bold text-[#015AAA] m-0 mb-2 text-center"
        >
          Why NebulaSafeTech
        </motion.p>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          custom={1}
          className="nst-h2 text-slate-900 m-0 mb-10 text-center"
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
              viewport={VIEWPORT_ONCE}
              custom={i}
              className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm hover:shadow-md hover:border-[#015AAA]/20 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#015AAA]/10 text-[#015AAA] flex items-center justify-center font-bold mb-5 group-hover:bg-[#015AAA] group-hover:text-white transition-colors">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="nst-h3 text-slate-900 m-0 mb-2 group-hover:text-[#015AAA] transition-colors">
                {benefit.title}
              </h3>
              <p className="nst-body text-slate-600 m-0">{benefit.description}</p>
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
          viewport={VIEWPORT_ONCE}
          className="nst-eyebrow font-bold text-[#015AAA] m-0 mb-2"
        >
          Process
        </motion.p>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          custom={1}
          className="nst-h2 text-slate-900 m-0 mb-3"
        >
          {content.processTitle}
        </motion.h2>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          custom={2}
          className="nst-body text-slate-600 m-0 mb-12 max-w-2xl"
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
              viewport={VIEWPORT_ONCE}
              custom={i}
              className="relative rounded-2xl bg-white border border-slate-100 p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col min-h-[200px]"
            >
              <AnimatedNumber value={step.num} className="nst-stat text-[#015AAA]/25 mb-3" />
              <h3 className="nst-h4 text-slate-900 m-0 mb-2">{step.title}</h3>
              <p className="nst-small text-slate-500 m-0 mt-auto">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export function ServiceContactFormSection({
  serviceName,
}: {
  serviceName: string;
}) {
  return (
    <section className="w-full py-16 md:py-20 px-8 md:px-14 lg:px-20 bg-white border-t border-slate-100">
      <div className="max-w-[1440px] mx-auto">
        <ContactForm
          id="service-contact-form"
          title="Request a consultation"
          subtitle="Share your requirements and our team will follow up with a tailored proposal."
          defaultService={serviceName}
        />
      </div>
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
          className="absolute inset-0 bg-[#0056A7]"
          aria-hidden
        />
        <div className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden>
          <motion.div
            className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-white/25"
            aria-hidden
            animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.35, 0.2] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="relative z-10 px-8 py-12 md:px-14 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="max-w-xl">
            <h2 className="nst-h2 text-white m-0 mb-3">{content.ctaHeadline}</h2>
            <p className="nst-body text-blue-100 m-0">{content.ctaDescription}</p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center shrink-0">
            <a
              href="mailto:info@nebulasafetech.com"
              className="nst-ui font-bold inline-flex items-center gap-2 rounded-xl bg-white text-[#015AAA] px-6 py-3.5 no-underline hover:bg-blue-50 transition-colors shadow-sm"
            >
              <Mail className="w-5 h-5" aria-hidden />
              Email us
            </a>
            <a
              href="#service-contact-form"
              className="nst-ui font-semibold inline-flex items-center gap-2 rounded-xl border-2 border-white/40 text-white px-6 py-3.5 no-underline hover:bg-white/10 transition-colors"
            >
              Contact form
              <ArrowRight className="w-4 h-4" aria-hidden />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
