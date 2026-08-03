import { BUSINESS_IDENTITY, BUSINESS_DESCRIPTION, ORG_NAME } from "./seoConfig";

export type PageSeo = {
  title: string;
  description: string;
  keywords: string[];
  canonicalPath: string;
  ogType?: "website" | "article";
};

const baseKeywords = [
  "NebulaSafeTech",
  "NST",
  "cybersecurity India",
  "digital solutions",
  "Hosur",
  "Tamil Nadu",
];

export const HOME_SEO: PageSeo = {
  title: "NebulaSafeTech - Cybersecurity and Digital Solutions in India",
  description: `${BUSINESS_IDENTITY} Practical VAPT, secure engineering, web development, UI/UX, and EdTech programs for organizations worldwide.`,
  keywords: [
    ...baseKeywords,
    "VAPT",
    "secure development",
    "web development company",
    "cyber awareness",
  ],
  canonicalPath: "/",
};

export const ABOUT_SEO: PageSeo = {
  title: `About ${ORG_NAME} | Cybersecurity Experts in India`,
  description: `${BUSINESS_IDENTITY} Learn how our defenders-first team delivers enterprise-grade security, transparency, and innovation for global clients.`,
  keywords: [...baseKeywords, "about NebulaSafeTech", "cybersecurity team", "security company India"],
  canonicalPath: "/about",
};

export const SERVICES_SEO: PageSeo = {
  title: `Services | ${ORG_NAME} - Security, Web, UI/UX & Training`,
  description: `${BUSINESS_DESCRIPTION} Explore assessments, cloud and application security, full-stack development, UI/UX, and academic training.`,
  keywords: [
    ...baseKeywords,
    "cybersecurity services",
    "web security",
    "cloud security",
    "full-stack development",
    "UI UX agency",
  ],
  canonicalPath: "/services",
};

export const CLIENTS_SEO: PageSeo = {
  title: `Clients & Programs | ${ORG_NAME}`,
  description: `${BUSINESS_IDENTITY} Cybersecurity awareness programs, MoUs, and training delivered for academic institutions and enterprises across India.`,
  keywords: [...baseKeywords, "cybersecurity training clients", "awareness program", "MoU cybersecurity"],
  canonicalPath: "/clients",
};

export const EDTECH_SEO: PageSeo = {
  title: `EdTech & Career Programs | ${ORG_NAME}`,
  description: `${BUSINESS_IDENTITY} Industry-grade cybersecurity training, hands-on labs, certifications, and project-based learning to launch tech careers.`,
  keywords: [...baseKeywords, "cybersecurity EdTech", "ethical hacking course", "student projects", "NST training"],
  canonicalPath: "/edtech",
};

/** /contact, /blog, /careers redirect via vercel.json — not indexed; contact is /#contact on home. */

export const PRIVACY_SEO: PageSeo = {
  title: `Privacy Policy | ${ORG_NAME}`,
  description: `How ${ORG_NAME} collects, uses, and protects personal information across our website and cybersecurity, engineering, and EdTech services.`,
  keywords: [...baseKeywords, "privacy policy", "data protection"],
  canonicalPath: "/privacy-policy",
};

export const TERMS_SEO: PageSeo = {
  title: `Terms & Conditions | ${ORG_NAME}`,
  description: `Terms governing use of the ${ORG_NAME} website and engagement with our cybersecurity, development, and training services.`,
  keywords: [...baseKeywords, "terms and conditions", "legal"],
  canonicalPath: "/terms-and-conditions",
};

export type ServiceSlug = "web-development" | "cybersecurity" | "ui-ux-design" | "edtech-training";

const SERVICE_DETAIL: Record<
  ServiceSlug,
  PageSeo & { serviceType: string; summary: string }
> = {
  "web-development": {
    title: `Full-Stack Web Development | ${ORG_NAME}`,
    description: `${ORG_NAME} builds scalable, secure web applications from Hosur, India with modern stacks, secure SDLC practices, and production-ready delivery for startups and enterprises.`,
    keywords: [...baseKeywords, "full-stack web development", "React development", "Node.js", "secure web apps"],
    canonicalPath: "/services/web-development",
    serviceType: "Full-Stack Web Development",
    summary:
      "We design and ship secure, maintainable web platforms-front-end, APIs, and cloud-ready deployments-with security embedded from discovery to release.",
  },
  cybersecurity: {
    title: `Cybersecurity Services & Assessments | ${ORG_NAME}`,
    description: `${ORG_NAME} in Hosur, Tamil Nadu delivers practical cybersecurity services including VAPT, application and cloud security, network hardening, and awareness programs for teams across India and abroad.`,
    keywords: [...baseKeywords, "VAPT", "penetration testing", "cloud security", "application security"],
    canonicalPath: "/services/cybersecurity",
    serviceType: "Cybersecurity Services",
    summary:
      "Our security engineers help you find and fix critical issues before attackers do-covering web, cloud, networks, and data protection with clear, actionable reporting.",
  },
  "ui-ux-design": {
    title: `UI/UX Design & Product Experience | ${ORG_NAME}`,
    description: `${ORG_NAME} crafts accessible, conversion-focused UI and UX for security products, SaaS, and marketing sites-aligned with your brand and engineering constraints.`,
    keywords: [...baseKeywords, "UI UX design", "product design", "Figma", "design systems"],
    canonicalPath: "/services/ui-ux-design",
    serviceType: "UI/UX Design Services",
    summary:
      "From discovery workshops to high-fidelity UI, we pair product thinking with implementation-aware design so interfaces feel as good as they perform.",
  },
  "edtech-training": {
    title: `EdTech & Cybersecurity Training | ${ORG_NAME}`,
    description: `${BUSINESS_IDENTITY} Structured cybersecurity training, labs, certifications, and institutional programs that connect learners to real-world projects.`,
    keywords: [...baseKeywords, "cybersecurity training", "EdTech programs", "student certifications"],
    canonicalPath: "/services/edtech-training",
    serviceType: "EdTech & Cybersecurity Training",
    summary:
      "We combine instructor-led depth with hands-on labs and capstone builds so learners graduate with portfolio-ready work-not slides alone.",
  },
};

export function getServiceDetailSeo(slug: ServiceSlug) {
  return SERVICE_DETAIL[slug];
}


export const SERVICES_FAQ_ITEMS = [
  {
    question: "What cybersecurity services does NebulaSafeTech provide?",
    answer:
      "We deliver assessments and hardening across web, applications, cloud, and networks, plus encryption and data-protection guidance, security-aware engineering, and awareness training tailored to your risk profile.",
  },
  {
    question: "How do we start a web development or product engagement?",
    answer:
      "Share your goals and timelines via the contact form or email. We align on scope, architecture, and security requirements, then run a phased delivery model from discovery through build, test, and launch.",
  },
  {
    question: "Do you provide UI/UX design services?",
    answer:
      "Yes. We design modern, accessible interfaces and design systems that integrate cleanly with engineering workflows-ideal for security dashboards, SaaS, and marketing experiences.",
  },
  {
    question: "What technologies do you use?",
    answer:
      "We use modern web stacks (including React and Node ecosystems), cloud-native patterns where appropriate, and industry-standard security tooling for testing and monitoring-chosen per project needs.",
  },
] as const;

export function serviceFaqForSlug(slug: ServiceSlug) {
  const common = SERVICES_FAQ_ITEMS;
  const specific =
    slug === "cybersecurity"
      ? [
          {
            question: "Do you support cloud and DevSecOps workflows?",
            answer:
              "Yes. We help teams integrate security reviews into delivery pipelines and review cloud configurations against practical threat models-not checkbox compliance alone.",
          },
        ]
      : slug === "web-development"
        ? [
            {
              question: "Is secure coding part of delivery?",
              answer:
                "Security is embedded in requirements, reviews, and testing. We emphasize OWASP-aware patterns, dependency hygiene, and deployment hardening suitable for production workloads.",
            },
          ]
        : slug === "ui-ux-design"
          ? [
              {
                question: "Can you work with our existing engineering team?",
                answer:
                  "We regularly partner with in-house engineers and vendors, delivering specs, components guidance, and design QA so implementation matches intent.",
              },
            ]
          : [
              {
                question: "Do you offer institutional or campus programs?",
                answer:
                  "Yes. We collaborate with colleges and organizations on MoUs, awareness sessions, and structured cybersecurity learning paths through our EdTech ecosystem.",
              },
            ];
  return [...common, ...specific];
}