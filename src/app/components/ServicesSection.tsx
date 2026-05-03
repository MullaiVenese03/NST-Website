import { motion } from "motion/react";
import svgPaths from "../../imports/ServiceSection/svg-81gwe7znow";

import imgWebSecurity from "figma:asset/7346df11440f16b25549eb8cf287fb031b9683b2.png";
import imgCloudSecurity from "figma:asset/24f1dca8645b9371a10c988ee3739ad434d28e63.png";
import imgAppSecurity from "figma:asset/dafa5c9ee0601125e05fd5dbd560497dc7cc0e17.png";
import imgNetworkSecurity from "figma:asset/1ac74c6d41c7bd2cd987c3d92a2ca4a3b6f2a331.png";
import imgEncryption from "figma:asset/d75400a7458c5484886f6b0a8a673ade8d7be3cc.png";
import imgFullStack from "figma:asset/b37727328c320781de18d9263a96d352748196e9.png";
import imgWebDesign from "figma:asset/120bc0db098255f588d67ade37464ecb9aba739c.png";
import imgAcademicTraining from "figma:asset/acaaf38ce691fda7d772bfee47672921c5112b35.png";

/* Arrow icon used on every card */
function ArrowIcon({ strokePath }: { strokePath: string }) {
  return (
    <div className="w-5 h-5 flex-shrink-0">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <g clipPath="url(#arrow-clip)">
          <path
            d={strokePath}
            stroke="#015AAA"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </g>
        <defs>
          <clipPath id="arrow-clip">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

interface ServiceCardProps {
  image: string;
  title: string;
  description: string;
  arrowPath: string;
  border?: "left" | "right" | "top" | "bottom";
  imgClassName?: string;
  index: number;
}

function ServiceCard({
  image,
  title,
  description,
  arrowPath,
  border = "right",
  imgClassName,
  index,
}: ServiceCardProps) {
  const borderStyles: Record<string, React.CSSProperties> = {
    left: { borderLeft: "2px solid white" },
    right: { borderRight: "2px solid white" },
    top: { borderTop: "2px solid white" },
    bottom: { borderBottom: "2px solid #176BF0" },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.1, ease: "easeOut" }}
      className="relative rounded-[14px] bg-white flex flex-col justify-end gap-[14px] p-5 overflow-hidden"
      style={{
        width: "100%",
        minHeight: "370px",
        boxShadow: "inset 0px 2px 10px 0px rgba(23,107,240,0.25)",
        ...borderStyles[border],
      }}
    >
      {/* Card image */}
      <div className="w-full flex-1 overflow-hidden rounded-t-[8px] flex items-center justify-center">
        <img
          src={image}
          alt={title}
          className={imgClassName || "w-full h-[180px] object-cover"}
        />
      </div>

      {/* Title */}
      <p
        style={{
          fontFamily: "'Geist', sans-serif",
          fontWeight: 700,
          fontSize: "18px",
          lineHeight: "27px",
          color: "#101828",
          margin: 0,
        }}
      >
        {title}
      </p>

      {/* Description */}
      <p
        style={{
          fontFamily: "'Geist', sans-serif",
          fontWeight: 400,
          fontSize: "14px",
          lineHeight: "22.75px",
          color: "#4a5565",
          margin: 0,
        }}
      >
        {description}
      </p>

      {/* Arrow */}
      <ArrowIcon strokePath={arrowPath} />
    </motion.div>
  );
}

const services: Omit<ServiceCardProps, "index">[] = [
  {
    image: imgWebSecurity,
    title: "Web Security",
    description:
      "Secure your web apps with advanced vulnerability detection and real-time threat mitigation.",
    arrowPath: svgPaths.p123a1c40,
    border: "right",
    imgClassName: "w-full h-[180px] object-cover",
  },
  {
    image: imgCloudSecurity,
    title: "Cloud Security",
    description:
      "Secure cloud infrastructure and integrate security into your dev lifecycle seamlessly.",
    arrowPath: svgPaths.p123a1c40,
    border: "right",
    imgClassName: "w-full h-[180px] object-cover",
  },
  {
    image: imgAppSecurity,
    title: "Application Security",
    description:
      "Create innovative frameworks to build executable software with security, privacy, and trust.",
    arrowPath: svgPaths.p30ed7980,
    border: "left",
    imgClassName: "w-full h-[180px] object-cover",
  },
  {
    image: imgNetworkSecurity,
    title: "Network Security",
    description:
      "Create innovative frameworks to build executable software with security, privacy, and trust.",
    arrowPath: svgPaths.p30ed7980,
    border: "left",
    imgClassName: "w-full h-[180px] object-cover",
  },
  {
    image: imgEncryption,
    title: "Encryption & Data Protection",
    description:
      "Create innovative frameworks to build executable software with security, privacy, and trust.",
    arrowPath: svgPaths.p30ed7980,
    border: "bottom",
    imgClassName: "w-full h-[180px] object-cover",
  },
  {
    image: imgFullStack,
    title: "Full-Stack Web Development",
    description:
      "Scalable, high-performance web applications built with modern technologies.",
    arrowPath: svgPaths.p30ed7980,
    border: "top",
    imgClassName: "w-full h-[180px] object-cover",
  },
  {
    image: imgWebDesign,
    title: "Web Design & UI/UX Development",
    description:
      "Pixel-perfect designs and intuitive experiences that engage users and drive results.",
    arrowPath: svgPaths.p30ed7980,
    border: "top",
    imgClassName: "w-full h-[180px] object-cover",
  },
  {
    image: imgAcademicTraining,
    title: "Academic Training",
    description:
      "Practical training and real-world learning experiences that build skills and prepare you for industry.",
    arrowPath: svgPaths.p123a1c40,
    border: "right",
    imgClassName: "w-[76%] mx-auto h-[160px] object-contain",
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
                fontFamily: "'Inter', sans-serif",
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
                fontFamily: "'Geist', sans-serif",
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
                fontFamily: "'Manrope', sans-serif",
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

          {/* CTA – View all */}
          <motion.a
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            href="#"
            className="inline-flex items-center gap-3 self-start sm:self-center mt-2 sm:mt-6 group whitespace-nowrap"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: "20px",
              letterSpacing: "0.4px",
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

        {/* Cards grid – 4 columns on desktop, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((svc, i) => (
            <ServiceCard key={i} {...svc} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
