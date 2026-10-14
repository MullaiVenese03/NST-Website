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
  "cybersecurity company India",
  "VAPT India",
  "penetration testing Hosur",
  "web development agency Hosur",
  "UI UX design studio Tamil Nadu",
  "EdTech cybersecurity training",
  "Hosur",
  "Tamil Nadu",
];

export const HOME_SEO: PageSeo = {
  title: "NebulaSafeTech | Cybersecurity, VAPT & Digital Solutions",
  description:
    "NebulaSafeTech delivers VAPT cybersecurity, secure web application development, UI/UX design, and practical EdTech training programs.",
  keywords: [
    ...baseKeywords,
    "VAPT services",
    "secure web application development",
    "cloud security auditing",
    "cybersecurity awareness training",
  ],
  canonicalPath: "/",
};

export const NOT_FOUND_SEO = {
  title: `404 - Page Not Found | ${ORG_NAME}`,
  description:
    "The requested page could not be found or may have moved. Return to the NebulaSafeTech homepage or explore our cybersecurity, web development, and educational technology services.",
  keywords: [...baseKeywords, "404", "page not found"],
  canonicalPath: "",
} as const;

export const ABOUT_SEO: PageSeo = {
  title: `About ${ORG_NAME} | Cybersecurity & Digital Engineering Experts`,
  description:
    "Learn how NebulaSafeTech's defenders-first engineering team in Hosur, India delivers enterprise cybersecurity, secure software, and innovation.",
  keywords: [...baseKeywords, "about NebulaSafeTech", "cybersecurity team India", "security engineering experts"],
  canonicalPath: "/about",
};

export const SERVICES_SEO: PageSeo = {
  title: `Services | ${ORG_NAME} - Security, Web, UI/UX & Training`,
  description:
    "Explore NebulaSafeTech services including VAPT security assessments, full-stack web engineering, UI/UX product design, and corporate training.",
  keywords: [
    ...baseKeywords,
    "cybersecurity services",
    "web security vulnerability testing",
    "cloud native security",
    "full-stack web development",
    "UI UX design systems",
  ],
  canonicalPath: "/services",
};

export const TESTIMONIALS_SEO: PageSeo = {
  title: `Client Testimonials & Institutional Programs | ${ORG_NAME}`,
  description:
    "Explore testimonials, cybersecurity awareness workshops, academic MoUs, and enterprise training programs delivered across India by NebulaSafeTech.",
  keywords: [
    ...baseKeywords,
    "cybersecurity testimonials",
    "client reviews",
    "academic MoU cybersecurity",
    "institutional security training",
  ],
  canonicalPath: "/testimonials",
};

export const CLIENTS_SEO = TESTIMONIALS_SEO;

export const EDTECH_SEO: PageSeo = {
  title: `EdTech & Cybersecurity Career Programs | ${ORG_NAME}`,
  description:
    "Industry-grade cybersecurity learning paths, hands-on vulnerability labs, student certifications, and capstone project guidance from NebulaSafeTech.",
  keywords: [...baseKeywords, "cybersecurity EdTech", "ethical hacking labs", "student cybersecurity courses", "NST EdTech ecosystem"],
  canonicalPath: "/edtech",
};

export const BLOGS_SEO: PageSeo = {
  title: `Technology & Cybersecurity Blog | ${ORG_NAME}`,
  description: `Read technical guides, VAPT methodologies, cloud-native architecture insights, and cybersecurity career roadmaps from ${ORG_NAME} engineers.`,
  keywords: [...baseKeywords, "cybersecurity blog", "VAPT technical guides", "career in cybersecurity", "web security tutorials"],
  canonicalPath: "/blogs",
};

export const PRIVACY_SEO: PageSeo = {
  title: `Privacy Policy | ${ORG_NAME}`,
  description: `How ${ORG_NAME} collects, handles, and protects user data across our digital platforms, cybersecurity assessments, and educational services.`,
  keywords: [...baseKeywords, "privacy policy", "data protection policy"],
  canonicalPath: "/privacy-policy",
};

export const TERMS_SEO: PageSeo = {
  title: `Terms & Conditions | ${ORG_NAME}`,
  description: `Official terms of service governing the use of ${ORG_NAME} website, client software engagements, and training programs.`,
  keywords: [...baseKeywords, "terms and conditions", "terms of service"],
  canonicalPath: "/terms-and-conditions",
};

export const CONTACT_SEO: PageSeo = {
  title: `Contact ${ORG_NAME} | Cybersecurity, Web Development & Training Inquiries`,
  description:
    "Get in touch with NebulaSafeTech to discuss cybersecurity assessments, custom web engineering, UI/UX design, or institutional training programs.",
  keywords: [
    ...baseKeywords,
    "contact NebulaSafeTech",
    "cybersecurity inquiry",
    "VAPT consultation",
    "web development quote",
    "Hosur cybersecurity company",
  ],
  canonicalPath: "/contact",
};



export type ServiceSlug = "web-development" | "cybersecurity" | "ui-ux-design" | "edtech-training";

const SERVICE_DETAIL: Record<
  ServiceSlug,
  PageSeo & { serviceType: string; summary: string }
> = {
  "web-development": {
    title: `Full-Stack Web Development | ${ORG_NAME}`,
    description:
      "Build scalable, high-performance web applications with modern React stacks, secure development lifecycles, and cloud-ready architectures from NST.",
    keywords: [...baseKeywords, "full-stack web development", "React development", "Node.js", "secure web apps"],
    canonicalPath: "/services/web-development",
    serviceType: "Full-Stack Web Development",
    summary:
      "We design and ship secure, maintainable web platforms-front-end, APIs, and cloud-ready deployments-with security embedded from discovery to release.",
  },
  cybersecurity: {
    title: `Cybersecurity Services & Assessments | ${ORG_NAME}`,
    description:
      "Protect systems with comprehensive VAPT assessments, application security, cloud auditing, network hardening, and actionable remediation from NST.",
    keywords: [...baseKeywords, "VAPT", "penetration testing", "cloud security", "application security"],
    canonicalPath: "/services/cybersecurity",
    serviceType: "Cybersecurity Services",
    summary:
      "Our security engineers help you find and fix critical issues before attackers do-covering web, cloud, networks, and data protection with clear, actionable reporting.",
  },
  "ui-ux-design": {
    title: `UI/UX Design & Product Experience | ${ORG_NAME}`,
    description:
      "Craft accessible, conversion-focused interfaces, design systems, and seamless user experiences for SaaS platforms and modern digital products.",
    keywords: [...baseKeywords, "UI UX design", "product design", "Figma", "design systems"],
    canonicalPath: "/services/ui-ux-design",
    serviceType: "UI/UX Design Services",
    summary:
      "From discovery workshops to high-fidelity UI, we pair product thinking with implementation-aware design so interfaces feel as good as they perform.",
  },
  "edtech-training": {
    title: `EdTech & Cybersecurity Training | ${ORG_NAME}`,
    description:
      "Advance technical capabilities through hands-on cybersecurity labs, industry certifications, and institutional learning programs from NST.",
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