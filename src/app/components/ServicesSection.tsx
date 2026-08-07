import { motion } from "motion/react";
import { SectionCtaLink } from "./SectionCtaLink";
import { VIEWPORT_ONCE } from "../utils/motionPresets";
import { useLightExperience } from "../utils/performance";
import { ServiceCard, type ServiceCardProps } from "./ServiceCard";

const services: Omit<ServiceCardProps, "index">[] = [
  {
    to: "/services/cybersecurity",
    mediaSlug: "Icons--web-security",
    title: "Web Security",
    description:
      "Secure your web apps with advanced vulnerability detection and real-time threat mitigation.",
  },
  {
    to: "/services/cybersecurity",
    mediaSlug: "Icons--cloud-security",
    title: "Cloud Security",
    description: "Secure cloud infrastructure and integrate security into your dev lifecycle seamlessly.",
  },
  {
    to: "/services/cybersecurity",
    mediaSlug: "Icons--application-security",
    title: "Application Security",
    description:
      "Create innovative frameworks to build executable software with security, privacy, and trust.",
  },
  {
    to: "/services/cybersecurity",
    mediaSlug: "Icons--network-security",
    title: "Network Security",
    description:
      "Create innovative frameworks to build executable software with security, privacy, and trust.",
  },
  {
    to: "/services/cybersecurity",
    mediaSlug: "Icons--encryption-data-protection",
    title: "Encryption & Data Protection",
    description:
      "Create innovative frameworks to build executable software with security, privacy, and trust.",
  },
  {
    to: "/services/web-development",
    mediaSlug: "Icons--full-stack-web-dev",
    title: "Full-Stack Web Development",
    description: "Scalable, high-performance web applications built with modern technologies.",
  },
  {
    to: "/services/ui-ux-design",
    mediaSlug: "Icons--web-design-uiux",
    title: "Web Design & UI/UX Development",
    description: "Pixel-perfect designs and intuitive experiences that engage users and drive results.",
  },
  {
    to: "/services/edtech-training",
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
              className="nst-eyebrow text-[#015AAA]"
              style={{
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
              className="nst-h2 text-slate-900"
            >
              Smart Solutions. Secure Future.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.14 }}
              className="nst-body-sm text-slate-500"
              style={{
                marginTop: "10px",
              }}
            >
              From innovative web experiences to enterprise-grade security,
              <br className="hidden md:block" />
              we build, protect, and scale what matters most.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="self-start sm:self-center mt-2 sm:mt-6 shrink-0"
          >
            <SectionCtaLink to="/services" label="View all services" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {services.map((svc, i) => (
            <ServiceCard key={`${svc.to}-${svc.title}`} {...svc} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
