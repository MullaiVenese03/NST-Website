import { memo } from "react";
import { motion } from "motion/react";
import { ResponsivePicture } from "./ResponsivePicture";
import type { MediaSlug } from "../utils/media";
import { VIEWPORT_ONCE } from "../utils/motionPresets";
import { useLightExperience } from "../utils/performance";

interface ServiceCardProps {
  mediaSlug: MediaSlug;
  title: string;
  description: string;
  index: number;
}

const ServiceCard = memo(function ServiceCard({
  mediaSlug,
  title,
  description,
  index,
  light,
}: ServiceCardProps & { light: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: light ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_ONCE}
      transition={{ duration: 0.45, delay: light ? 0 : (index % 4) * 0.06, ease: "easeOut" }}
      className="relative rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-transform duration-300 flex flex-col group cursor-pointer h-full"
    >
      <div className="p-6 sm:p-8 pb-4 flex items-center justify-center min-h-[160px] sm:min-h-[192px]">
        <div className="relative w-full max-w-[140px] sm:max-w-[160px] aspect-square flex items-center justify-center mx-auto">
          <div
            className={`absolute inset-0 rounded-full transition-transform duration-500 ${
              light ? "bg-blue-50/60 scale-90" : "bg-blue-50/40 scale-75 group-hover:scale-100"
            }`}
            aria-hidden
          />
          <ResponsivePicture
            slug={mediaSlug}
            alt={title}
            className="relative z-10 w-full h-full max-h-[100px] sm:max-h-[120px] object-contain object-center transition-transform duration-500 group-hover:scale-105"
            profile="icon"
          />
        </div>
      </div>

      <div className="px-8 pb-8 flex flex-col flex-1">
        <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-[#015AAA] transition-colors duration-300">
          {title}
        </h3>
        <p className="text-base text-slate-500 leading-relaxed flex-1">{description}</p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#015AAA] to-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-2xl origin-left" />
    </motion.div>
  );
});

const services: Omit<ServiceCardProps, "index">[] = [
  {
    mediaSlug: "Icons--web-security",
    title: "Web Security",
    description:
      "Secure your web apps with advanced vulnerability detection and real-time threat mitigation.",
  },
  {
    mediaSlug: "Icons--cloud-security",
    title: "Cloud Security",
    description: "Secure cloud infrastructure and integrate security into your dev lifecycle seamlessly.",
  },
  {
    mediaSlug: "Icons--application-security",
    title: "Application Security",
    description:
      "Create innovative frameworks to build executable software with security, privacy, and trust.",
  },
  {
    mediaSlug: "Icons--network-security",
    title: "Network Security",
    description:
      "Create innovative frameworks to build executable software with security, privacy, and trust.",
  },
  {
    mediaSlug: "Icons--encryption-data-protection",
    title: "Encryption & Data Protection",
    description:
      "Create innovative frameworks to build executable software with security, privacy, and trust.",
  },
  {
    mediaSlug: "Icons--full-stack-web-dev",
    title: "Full-Stack Web Development",
    description: "Scalable, high-performance web applications built with modern technologies.",
  },
  {
    mediaSlug: "Icons--web-design-uiux",
    title: "Web Design & UI/UX Development",
    description: "Pixel-perfect designs and intuitive experiences that engage users and drive results.",
  },
  {
    mediaSlug: "Icons--academic-training",
    title: "Academic Training",
    description:
      "Practical training and real-world learning experiences that build skills and prepare you for industry.",
  },
];

export default function ServicesSection() {
  const light = useLightExperience();

  return (
    <section className="w-full bg-white py-16 px-6 md:px-10 lg:px-16">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-10">
          <div>
            <motion.p
            initial={{ opacity: 0, y: light ? 0 : 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
              transition={{ duration: 0.5 }}
              style={{
                fontFamily: "var(--font-family)",
                fontWeight: 700,
                fontSize: "20px",
                letterSpacing: "1.2px",
                color: "#015AAA",
                textTransform: "uppercase",
                marginBottom: "14px",
              }}
            >
              Our Services
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.08 }}
              style={{
                fontFamily: "var(--font-family)",
                fontWeight: 700,
                fontSize: "clamp(26px, 3vw, 32px)",
                letterSpacing: "0.64px",
                color: "#000",
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              Smart Solutions. Secure Future.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.14 }}
              style={{
                fontFamily: "var(--font-family)",
                fontWeight: 500,
                fontSize: "18px",
                letterSpacing: "0.4px",
                color: "#6d6d6d",
                marginTop: "10px",
                lineHeight: 1.55,
              }}
            >
              From innovative web experiences to enterprise-grade security,
              <br className="hidden md:block" />
              we build, protect, and scale what matters most.
            </motion.p>
          </div>

          <motion.a
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            href="/services"
            className="inline-flex items-center gap-3 self-start sm:self-center mt-2 sm:mt-6 group flex-wrap"
            style={{
              fontFamily: "var(--font-family)",
              fontWeight: 700,
              fontSize: "16px",
              letterSpacing: "1px",
              color: "#015AAA",
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            View all services
            <svg
              width="20"
              height="12"
              viewBox="0 0 20 12"
              fill="none"
              className="transition-transform duration-200 group-hover:translate-x-1"
            >
              <path
                d="M19 6L14 1M19 6L14 11M19 6H1"
                stroke="#015AAA"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {services.map((svc, i) => (
            <ServiceCard key={svc.title} {...svc} index={i} light={light} />
          ))}
        </div>
      </div>
    </section>
  );
}
