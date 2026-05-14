import { motion } from "motion/react";

import imgWebSecurity from "../../assets/Icons/web-security.png";
import imgCloudSecurity from "../../assets/Icons/cloud-security.png";
import imgAppSecurity from "../../assets/Icons/application-security.png";
import imgNetworkSecurity from "../../assets/Icons/network-security.png";
import imgEncryption from "../../assets/Icons/encryption-data-protection.png";
import imgFullStack from "../../assets/Icons/full-stack-web-dev.png";
import imgWebDesign from "../../assets/Icons/web-design-uiux.png";
import imgAcademicTraining from "../../assets/Icons/academic-training.png";

interface ServiceCardProps {
  image: string;
  title: string;
  description: string;
  index: number;
}

function ServiceCard({
  image,
  title,
  description,
  index,
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.1, ease: "easeOut" }}
      className="relative rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col group cursor-pointer h-full"
    >
      {/* Icon/Image Container */}
      <div className="p-8 pb-4 flex items-center justify-center h-48">
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Subtle background glow for icon */}
          <div className="absolute inset-0 bg-blue-50/50 rounded-full blur-2xl scale-75 group-hover:scale-100 transition-transform duration-500" />
          <img
            src={image}
            alt={title}
            className="relative z-10 w-auto h-full max-h-[120px] object-contain transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-8 pb-8 flex flex-col flex-1">
        <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-[#015AAA] transition-colors duration-300">
          {title}
        </h3>
        <p className="text-base text-slate-500 leading-relaxed flex-1">
          {description}
        </p>
      </div>

      {/* Bottom border accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#015AAA] to-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-2xl origin-left" />
    </motion.div>
  );
}

const services: Omit<ServiceCardProps, "index">[] = [
  {
    image: imgWebSecurity,
    title: "Web Security",
    description: "Secure your web apps with advanced vulnerability detection and real-time threat mitigation.",
  },
  {
    image: imgCloudSecurity,
    title: "Cloud Security",
    description: "Secure cloud infrastructure and integrate security into your dev lifecycle seamlessly.",
  },
  {
    image: imgAppSecurity,
    title: "Application Security",
    description: "Create innovative frameworks to build executable software with security, privacy, and trust.",
  },
  {
    image: imgNetworkSecurity,
    title: "Network Security",
    description: "Create innovative frameworks to build executable software with security, privacy, and trust.",
  },
  {
    image: imgEncryption,
    title: "Encryption & Data Protection",
    description: "Create innovative frameworks to build executable software with security, privacy, and trust.",
  },
  {
    image: imgFullStack,
    title: "Full-Stack Web Development",
    description: "Scalable, high-performance web applications built with modern technologies.",
  },
  {
    image: imgWebDesign,
    title: "Web Design & UI/UX Development",
    description: "Pixel-perfect designs and intuitive experiences that engage users and drive results.",
  },
  {
    image: imgAcademicTraining,
    title: "Academic Training",
    description: "Practical training and real-world learning experiences that build skills and prepare you for industry.",
  },
];

export default function ServicesSection() {
  return (
    <section className="w-full bg-white py-16 px-6 md:px-10 lg:px-16">
      <div className="max-w-[1440px] mx-auto">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-10">
          <div>
            {/* Label */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{
                fontFamily: 'var(--font-family)',
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

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.08 }}
              style={{
                fontFamily: 'var(--font-family)',
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

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.14 }}
              style={{
                fontFamily: 'var(--font-family)',
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

          {/* CTA â€“ View all */}
          <motion.a
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            href="/services"
            className="inline-flex items-center gap-3 self-start sm:self-center mt-2 sm:mt-6 group flex-wrap"
            style={{
              fontFamily: 'var(--font-family)',
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

        {/* Cards grid â€“ 4 columns on desktop, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((svc, i) => (
            <ServiceCard key={i} {...svc} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

