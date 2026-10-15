import { ORG_NAME } from "./seoConfig";

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
export type CyberServiceSlug = "web-security" | "cloud-security" | "application-security" | "network-security";
export type AnyServiceSlug = ServiceSlug | CyberServiceSlug;

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

const CYBER_SERVICE_DETAIL: Record<
  CyberServiceSlug,
  PageSeo & { serviceType: string; summary: string }
> = {
  "web-security": {
    title: `Web Security Services & VAPT | ${ORG_NAME}`,
    description:
      "Identify and fix vulnerabilities in websites, web APIs, and authentication flows with OWASP-aligned VAPT assessments and actionable remediation from NST.",
    keywords: [...baseKeywords, "web security", "VAPT web applications", "OWASP testing", "web application penetration testing"],
    canonicalPath: "/services/web-security",
    serviceType: "Web Security",
    summary:
      "We assess your public-facing web properties for exploitable weaknesses-from injection flaws to broken authentication-and deliver clear, prioritised remediation guidance your team can act on.",
  },
  "cloud-security": {
    title: `Cloud Security Assessment & Hardening | ${ORG_NAME}`,
    description:
      "Audit cloud configurations, IAM posture, and DevSecOps pipelines to eliminate misconfigurations and exposure across AWS, Azure, and GCP.",
    keywords: [...baseKeywords, "cloud security", "cloud misconfiguration review", "IAM security", "DevSecOps", "cloud VAPT"],
    canonicalPath: "/services/cloud-security",
    serviceType: "Cloud Security",
    summary:
      "Cloud environments introduce configuration and identity risks that differ from traditional infrastructure. We review IAM policies, storage permissions, network controls, and DevSecOps pipeline exposure to close those gaps.",
  },
  "application-security": {
    title: `Application Security Testing & Secure SDLC | ${ORG_NAME}`,
    description:
      "Secure software from within with source code reviews, API security testing, threat modelling, and actionable developer remediation guidance.",
    keywords: [...baseKeywords, "application security", "secure SDLC", "source code review", "API security testing", "threat modelling"],
    canonicalPath: "/services/application-security",
    serviceType: "Application Security",
    summary:
      "Application security addresses the code, logic, and data flows inside your software-not just the external surface. We identify flaws in business logic, dependencies, and APIs, then work with your engineers to remediate them.",
  },
  "network-security": {
    title: `Network Security Assessment & Hardening | ${ORG_NAME}`,
    description:
      "Audit network perimeters, firewall rules, segmentation controls, and access paths to eliminate unnecessary exposure and reduce lateral movement risk.",
    keywords: [...baseKeywords, "network security", "network penetration testing", "firewall review", "network segmentation", "perimeter hardening"],
    canonicalPath: "/services/network-security",
    serviceType: "Network Security",
    summary:
      "Network security focuses on the infrastructure layer-routers, firewalls, segmentation, and exposure at the perimeter and between internal zones. We identify accessible paths attackers could use and recommend practical hardening steps.",
  },
};

export function getCyberServiceSeo(slug: CyberServiceSlug) {
  return CYBER_SERVICE_DETAIL[slug];
}


export const SERVICES_FAQ_ITEMS = [
  {
    question: "What cybersecurity services does NebulaSafeTech provide?",
    answer:
      "We deliver assessments and hardening across web, applications, cloud, and network infrastructure, plus security-aware engineering and practitioner-led institutional training tailored to your risk profile.",
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

export const WEB_DEVELOPMENT_FAQ: { question: string; answer: string }[] = [
  {
    question: "What web development technologies and stacks does NebulaSafeTech work with?",
    answer:
      "We engineer web applications primarily using React, TypeScript, Vite, Node.js, and modern CSS, backed by RESTful APIs, relational or document databases, and cloud deployments. We choose stable, maintainable stacks aligned with your long-term business roadmap.",
  },
  {
    question: "How is security integrated into your web development process?",
    answer:
      "Security is embedded from sprint zero rather than tested as an afterthought. We implement OWASP-guided secure coding standards, input validation, secure session and token handling, dependency vulnerability scanning, and pre-deployment security reviews.",
  },
  {
    question: "What does the testing and quality assurance process look like?",
    answer:
      "We test across target browsers, device viewports, and network conditions. Testing encompasses component functionality, API error handling, responsive layout verification, Core Web Vitals performance tuning, and cross-browser compatibility before client staging.",
  },
  {
    question: "What deliverables are included at project handover?",
    answer:
      "You receive complete ownership of source code repositories, build configurations, API documentation, environment setup guides, deployment scripts, and an engineering walkthrough session so your internal team can maintain the codebase independently.",
  },
  {
    question: "Do you build from scratch or can you work with an existing codebase?",
    answer:
      "We handle both greenfield product development from discovery to release and collaborative development on established codebases. For existing projects, we conduct a brief architecture and code review before beginning active sprint delivery.",
  },
];

export const UI_UX_DESIGN_FAQ: { question: string; answer: string }[] = [
  {
    question: "What design tools and deliverables do you provide?",
    answer:
      "We work primarily in Figma, delivering structured design files, interactive clickable prototypes, reusable component libraries with auto-layout and variants, design tokens (colors, typography, spacing), and annotated developer handoff documentation.",
  },
  {
    question: "How do you handle discovery and user flow definition?",
    answer:
      "We begin with stakeholder alignment sessions to identify core user personas, primary jobs-to-be-done, and business constraints. From there, we construct information architecture diagrams and map out clear user flows before designing visual screens.",
  },
  {
    question: "Do you provide responsive designs for mobile, tablet, and desktop?",
    answer:
      "Yes. Every interface is designed with responsive breakpoints in mind. We provide explicit layouts for mobile, tablet, and desktop screens, accounting for touch targets, navigation patterns, and typography scaling across devices.",
  },
  {
    question: "How do you collaborate with engineering teams during handoff?",
    answer:
      "We deliver production-ready Figma specs with organized components, spacing tokens, and interactive state definitions (hover, active, focus, disabled). We also participate in design QA reviews during front-end implementation to ensure the coded build matches the design intent.",
  },
  {
    question: "Can you create or extend an existing design system?",
    answer:
      "Yes. We can build a cohesive design system from scratch or expand your existing Figma component library with new UI patterns, accessible color palettes, and standardized tokens that scale as your product evolves.",
  },
];

export const EDTECH_TRAINING_FAQ: { question: string; answer: string }[] = [
  {
    question: "What types of institutional training and academic programs do you offer?",
    answer:
      "We offer structured cybersecurity learning tracks, hands-on lab sessions, campus technical seminars, faculty enablement programs, and long-term institutional MoUs tailored to university curricula and academic schedules.",
  },
  {
    question: "Are the training programs theoretical or practical?",
    answer:
      "Our programs emphasize practical, hands-on learning. Learners spend significant time working through realistic virtual lab scenarios, vulnerability demonstrations, and guided capstone exercises rather than lecture slides alone.",
  },
  {
    question: "How do institutional MoUs work with colleges and universities?",
    answer:
      "We collaborate with academic leadership to define customized modules, scheduled workshops, and practical lab access that fit within the semester calendar, providing student mentorship and certificates of completion.",
  },
  {
    question: "What topics are covered in the training tracks?",
    answer:
      "Core modules cover cybersecurity fundamentals, networking basics, web application security concepts (OWASP Top 10), basic reconnaissance and defensive practices, secure coding fundamentals, and digital safety practices.",
  },
  {
    question: "Do you conduct short-term seminars and workshops?",
    answer:
      "Yes. We deliver half-day, one-day, and multi-day intensive workshops and awareness seminars for campus cohorts, student technical clubs, and organizational teams on current cybersecurity trends and career paths.",
  },
];

export function serviceFaqForSlug(slug: ServiceSlug) {
  switch (slug) {
    case "web-development":
      return WEB_DEVELOPMENT_FAQ;
    case "ui-ux-design":
      return UI_UX_DESIGN_FAQ;
    case "edtech-training":
      return EDTECH_TRAINING_FAQ;
    case "cybersecurity":
    default:
      return [
        ...SERVICES_FAQ_ITEMS,
        {
          question: "Do you support cloud and DevSecOps workflows?",
          answer:
            "Yes. We help teams integrate security reviews into delivery pipelines and review cloud configurations against practical threat models-not checkbox compliance alone.",
        },
      ];
  }
}

export const WEB_SECURITY_FAQ: { question: string; answer: string }[] = [
  {
    question: "What is the difference between web security and application security?",
    answer:
      "Web security focuses on the externally exposed surface-URLs, HTTP responses, cookies, authentication endpoints, and browser-facing behaviour. Application security goes deeper into the code itself: business logic, internal APIs, data validation, dependency chains, and the software development lifecycle. A web security assessment examines what an attacker can reach through a browser; an application security engagement also reviews what is happening inside the codebase.",
  },
  {
    question: "What does a web security assessment cover?",
    answer:
      "We test for OWASP Top 10 classes of vulnerability including injection flaws, broken authentication, cross-site scripting, insecure direct object references, security misconfigurations, and sensitive data exposure. We also review session management, CORS policies, HTTP security headers, and redirect behaviour across web pages and public APIs.",
  },
  {
    question: "How long does a web security assessment take?",
    answer:
      "Scope and surface area determine duration. A single web application with defined test accounts typically takes two to five working days of active testing. Larger multi-app environments or those requiring authenticated testing of complex workflows take longer. We discuss timing during scoping.",
  },
  {
    question: "Do you test authenticated and unauthenticated flows?",
    answer:
      "Yes. We test both public-facing pages and authenticated areas where different privilege levels exist. Testing authenticated flows is essential because many high-severity vulnerabilities-such as broken access control and insecure direct object references-only appear once logged in.",
  },
  {
    question: "What does the report contain?",
    answer:
      "Each finding includes a severity rating, a clear description of the vulnerability, reproduction steps, and a recommended fix. The report includes an executive summary alongside the technical detail so both leadership and engineering teams can act on it immediately.",
  },
  {
    question: "Is a retest included?",
    answer:
      "We offer a focused retest of critical and high findings after your team has applied remediations. This confirms that the fixes hold under real conditions rather than just passing a code review.",
  },
];

export const CLOUD_SECURITY_FAQ: { question: string; answer: string }[] = [
  {
    question: "What does a cloud security assessment review?",
    answer:
      "We examine IAM roles and policies, storage bucket and object permissions, network security groups and firewall rules, secrets and credential management, logging and monitoring coverage, and service-to-service access controls. The goal is to find configurations that expose resources beyond intended boundaries.",
  },
  {
    question: "How is cloud security different from network security?",
    answer:
      "Cloud security specifically addresses the shared-responsibility model of cloud platforms-IAM, managed services, control plane access, and provider-specific configuration. Network security focuses on IP routing, firewall rules, VLANs, and perimeter devices. In a cloud environment both overlap, but cloud security includes identity and control-plane concerns that have no equivalent in on-premise network reviews.",
  },
  {
    question: "Which cloud platforms do you assess?",
    answer:
      "We work with common cloud environments including AWS and Azure. We review configurations through provided read-only credentials, exported policy documents, or Terraform/IaC files depending on what the client can share within their security constraints.",
  },
  {
    question: "Do you review DevSecOps pipelines?",
    answer:
      "Yes. CI/CD pipelines frequently hold elevated permissions, secrets, and deployment credentials. We review pipeline configuration for excessive privilege, secret sprawl, and opportunities for supply-chain manipulation.",
  },
  {
    question: "Can you help after the assessment with remediation?",
    answer:
      "Yes. We provide written remediation guidance for every finding and offer advisory sessions to walk through complex changes-particularly for IAM redesign and network policy updates where the order of changes matters.",
  },
];

export const APPLICATION_SECURITY_FAQ: { question: string; answer: string }[] = [
  {
    question: "What does application security cover that web security does not?",
    answer:
      "Application security reviews the code, business logic, internal APIs, data validation, and dependency chain-not just the external HTTP surface. It includes source code review (where access is provided), threat modelling, insecure deserialization, business logic flaws that only appear in specific workflow states, and secure SDLC guidance so engineers write more defensible code going forward.",
  },
  {
    question: "Do you review source code?",
    answer:
      "Yes, when clients provide code access. Source code review lets us identify vulnerabilities that are not directly exploitable from the outside but represent high-risk patterns-such as SQL concatenation, weak cryptography, hardcoded credentials, or improper input handling in internal paths.",
  },
  {
    question: "What is threat modelling and do you provide it?",
    answer:
      "Threat modelling is a structured exercise that identifies assets, trust boundaries, and potential attack paths for a given system before or during development. We work through system architecture diagrams with your team to surface high-risk design decisions and recommend controls. It is most valuable during product design or before a significant feature release.",
  },
  {
    question: "How do you handle third-party libraries and dependencies?",
    answer:
      "We review dependency manifests for known vulnerable packages and flag components that are significantly out of date or no longer maintained. We recommend tools and practices for ongoing dependency hygiene rather than treating it as a one-time check.",
  },
  {
    question: "What does a secure SDLC engagement look like?",
    answer:
      "We review your existing development process, identify security checkpoints that are missing or inconsistent, and recommend practical additions-such as peer review guidelines, pre-deployment security checklists, or specific testing steps at key stages. We focus on changes that fit your team's actual workflow rather than prescribing a complete process replacement.",
  },
];

export const NETWORK_SECURITY_FAQ: { question: string; answer: string }[] = [
  {
    question: "What does a network security assessment cover?",
    answer:
      "We review externally accessible network services, open ports, service banners, firewall rule sets, network segmentation between zones, VPN and remote access configurations, and internal access controls where applicable. The focus is on identifying paths an attacker could use to move laterally or reach sensitive systems.",
  },
  {
    question: "How is network security different from web security?",
    answer:
      "Web security focuses on HTTP-layer vulnerabilities in browsers and web applications. Network security operates at the infrastructure layer-IP routing, open services, firewall policies, network protocols, and segmentation boundaries. A network assessment would identify an exposed RDP port or weak SSH configuration; a web security assessment would identify an XSS or injection flaw in a web application.",
  },
  {
    question: "Do you test internal networks or only perimeter exposure?",
    answer:
      "Our default engagement covers the external-facing perimeter. Internal network reviews-covering segmentation, lateral movement paths, and internal service exposure-are scoped separately and typically require on-site or VPN access. We discuss scope during the initial consultation.",
  },
  {
    question: "What do you check in a firewall review?",
    answer:
      "We look for overly permissive rules, rules that allow access from any source, rules that have not been reviewed in a long time, and gaps between intended policy and the actual rule set. We also look for any services that are exposed to the internet without a clear business requirement.",
  },
  {
    question: "How do you deliver findings?",
    answer:
      "We produce a report listing each exposed service or misconfiguration with its risk level, evidence, and a recommended remediation action. We separate critical and high findings that need immediate attention from lower-severity hardening recommendations that can be scheduled.",
  },
];
