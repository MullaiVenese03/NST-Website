import type { ServiceSlug, CyberServiceSlug } from "../../seo/pageMeta";
import type { MediaSlug } from "../utils/media";

type ServiceOffering = {
  title: string;
  description: string;
  mediaSlug: MediaSlug;
  link?: string;
};

type ServiceBenefit = {
  title: string;
  description: string;
};

type ServiceProcessStep = {
  num: string;
  title: string;
  description: string;
};

export type ServiceDetailContent = {
  slug: ServiceSlug;
  eyebrow: string;
  heroHeadline: string;
  heroHighlight: string;
  heroMedia: MediaSlug;
  heroImageAlt: string;
  tagline: string;
  problemStatement?: string;
  audiences?: string[];
  highlights: string[];
  offeringsTitle: string;
  offeringsSubtitle: string;
  offerings: ServiceOffering[];
  capabilitiesTitle: string;
  capabilities: string[];
  benefits: ServiceBenefit[];
  processTitle: string;
  processSubtitle: string;
  processSteps: ServiceProcessStep[];
  ctaHeadline: string;
  ctaDescription: string;
};

const SERVICE_DETAIL_CONTENT: Record<ServiceSlug, ServiceDetailContent> = {
  "web-development": {
    slug: "web-development",
    eyebrow: "Full-Stack Web Development",
    heroHeadline: "Modern web products",
    heroHighlight: "built to scale securely.",
    heroMedia: "Icons--full-stack-web-dev",
    heroImageAlt: "Full-stack web development illustration",
    tagline:
      "We design, engineer, test, and deploy production-grade web applications and business platforms using React, TypeScript, and Node - with security, performance, and clean handover built in.",
    problemStatement:
      "Many web initiatives struggle with brittle codebases, slow performance, security blind spots, and undocumented architectures that make future maintenance costly. We engineer web applications with structured component systems, OWASP-guided secure coding, thorough multi-device testing, and full code ownership handed over to your team upon launch.",
    highlights: ["React & TypeScript stacks", "Secure SDLC & QA testing", "Complete codebase handover"],
    audiences: [
      "Startups and growth-stage companies launching web platforms or MVPs",
      "Enterprises requiring custom web portals, dashboards, or internal tools",
      "Organizations modernizing legacy websites with React and modern APIs",
      "Product teams seeking a disciplined engineering partner with built-in QA",
    ],
    offeringsTitle: "Web development scope & deliverables",
    offeringsSubtitle: "End-to-end delivery across front-end, backend APIs, testing, and deployment.",
    offerings: [
      {
        title: "Custom web applications & SaaS",
        description: "Interactive web applications, customer dashboards, and business tools built with modular React components and scalable architectures.",
        mediaSlug: "Icons--full-stack-web-dev",
      },
      {
        title: "Business & marketing websites",
        description: "Fast, accessible, and responsive websites engineered for Core Web Vitals, cross-device compatibility, and search visibility.",
        mediaSlug: "Icons--web-design-uiux",
      },
      {
        title: "API development & integrations",
        description: "RESTful services, secure authentication, database schemas, and clean third-party API integrations your team can easily extend.",
        mediaSlug: "Icons--web-security",
      },
      {
        title: "Testing, optimization & handover",
        description: "Comprehensive cross-browser QA, performance tuning, deployment pipelines, and structured codebase documentation at handover.",
        mediaSlug: "Icons--cloud-security",
      },
    ],
    capabilitiesTitle: "Core technologies & delivery standards",
    capabilities: [
      "React, TypeScript & modern toolchains",
      "Node.js & REST API architecture",
      "OWASP secure coding practices",
      "Responsive layout & accessibility (WCAG)",
      "Performance & Core Web Vitals tuning",
      "Cross-browser and multi-device QA",
      "CI/CD and staging environment setup",
      "Full source code & documentation handover",
    ],
    benefits: [
      {
        title: "Security embedded from sprint one",
        description: "Input validation, secure authentication, dependency hygiene, and pre-release security reviews are baked in - not bolted on before launch.",
      },
      {
        title: "Maintainable, typed codebases",
        description: "Structured TypeScript architectures, reusable components, and clear documentation allow your internal team to own and extend the code confidently.",
      },
      {
        title: "Disciplined testing and handover",
        description: "Staging previews, multi-browser QA, and complete repository ownership ensure smooth handover without vendor lock-in.",
      },
    ],
    processTitle: "How we deliver web projects",
    processSubtitle: "A phased delivery model that keeps stakeholders aligned from discovery to handover.",
    processSteps: [
      { num: "01", title: "Discover", description: "Align on functional requirements, user flows, architecture constraints, and success criteria." },
      { num: "02", title: "Architect", description: "Design component hierarchy, API contracts, database schemas, and security requirements." },
      { num: "03", title: "Build", description: "Iterative sprint delivery with regular preview demos, clean commits, and transparent progress." },
      { num: "04", title: "Test", description: "Cross-browser validation, responsive testing, security checks, and Core Web Vitals tuning." },
      { num: "05", title: "Handover", description: "Production deployment, environment configuration, and complete repository and documentation handoff." },
    ],
    ctaHeadline: "Ready to build your next web application?",
    ctaDescription: "Share your project goals, timeline, and stack requirements - we will outline a practical delivery roadmap.",
  },

  cybersecurity: {
    slug: "cybersecurity",
    eyebrow: "Cybersecurity Services",
    heroHeadline: "Find vulnerabilities",
    heroHighlight: "before attackers do.",
    heroMedia: "services-hero",
    heroImageAlt: "Cybersecurity services illustration",
    tagline:
      "Practical assessments and hardening across web, cloud, networks, and data-with clear reports your team can act on, not shelf-ware.",
    highlights: ["VAPT & testing", "Cloud & network review", "Actionable reporting"],
    offeringsTitle: "Security offerings",
    offeringsSubtitle: "Explore our specialised cybersecurity assessment and hardening services.",
    offerings: [
      {
        title: "Web Security",
        description:
          "Vulnerability testing and VAPT for websites, web APIs, and authentication endpoints using OWASP-aligned methods.",
        mediaSlug: "Icons--web-security",
        link: "/services/web-security",
      },
      {
        title: "Cloud Security",
        description:
          "Configuration auditing, IAM least-privilege analysis, and DevSecOps posture reviews across AWS, Azure, and GCP.",
        mediaSlug: "Icons--cloud-security",
        link: "/services/cloud-security",
      },
      {
        title: "Application Security",
        description:
          "Source code reviews, API security testing, threat modelling, and secure SDLC guidance to fix flaws before release.",
        mediaSlug: "Icons--application-security",
        link: "/services/application-security",
      },
      {
        title: "Network Security",
        description:
          "External perimeter assessments, firewall policy reviews, and network segmentation to eliminate lateral attack paths.",
        mediaSlug: "Icons--network-security",
        link: "/services/network-security",
      },
    ],
    capabilitiesTitle: "Assessment focus areas",
    capabilities: [
      "Penetration testing (VAPT)",
      "API & authentication review",
      "Cloud misconfiguration checks",
      "Network exposure analysis",
      "Security awareness sessions",
      "Remediation support & retest",
    ],
    benefits: [
      {
        title: "Risk-based prioritization",
        description: "Findings ranked by real impact so engineering effort goes to what matters first.",
      },
      {
        title: "Developer-friendly reports",
        description: "Reproduction steps and fix guidance-not vague scanner dumps.",
      },
      {
        title: "Continuous improvement",
        description: "Retests and advisory support to validate fixes and mature your posture.",
      },
    ],
    processTitle: "Our security engagement flow",
    processSubtitle: "Structured, transparent, and tailored to your environment.",
    processSteps: [
      { num: "01", title: "Scope", description: "Assets, rules of engagement, and compliance context." },
      { num: "02", title: "Assess", description: "Manual and tool-assisted testing by domain experts." },
      { num: "03", title: "Report", description: "Executive summary plus technical detail for builders." },
      { num: "04", title: "Remediate", description: "Workshops and guidance to close critical gaps." },
      { num: "05", title: "Retest", description: "Validation that fixes hold under real conditions." },
    ],
    ctaHeadline: "Strengthen your security posture",
    ctaDescription: "Share your environment and priorities-we'll recommend the right assessment scope.",
  },

  "ui-ux-design": {
    slug: "ui-ux-design",
    eyebrow: "Web Design & UI/UX Development",
    heroHeadline: "Intuitive digital products",
    heroHighlight: "designed to convert.",
    heroMedia: "Icons--web-design-uiux",
    heroImageAlt: "UI and UX design illustration",
    tagline:
      "From stakeholder discovery and user journey mapping to wireframing, high-fidelity UI, responsive prototyping, and developer-ready Figma specifications - we design accessible, human-centered interfaces that look exceptional and ship smoothly.",
    problemStatement:
      "Digital platforms often fail to achieve business goals because of confusing navigation, fragmented user flows, and inconsistent interface patterns that cause friction. We apply structured product thinking, user flow analysis, and systematic Figma design processes to create responsive interfaces where every interaction feels natural and drives measurable engagement.",
    highlights: ["User flows & wireframes", "Figma design systems", "Responsive dev handoff"],
    audiences: [
      "SaaS and web application teams seeking refined user flows and high-converting UI",
      "Businesses launching new digital products requiring validated interaction prototypes",
      "Engineering teams needing structured Figma components and standardized tokens",
      "Organizations modernizing existing web interfaces for better usability and accessibility",
    ],
    offeringsTitle: "Design scope & deliverables",
    offeringsSubtitle: "From discovery to pixel-perfect Figma specs - aligned with engineering workflows.",
    offerings: [
      {
        title: "Discovery & user flow mapping",
        description: "Stakeholder alignment, persona definition, information architecture, and core journey mapping before visual design starts.",
        mediaSlug: "Icons--web-design-uiux",
      },
      {
        title: "Wireframing & interactive prototypes",
        description: "Low- and mid-fidelity clickable flows in Figma to test user journeys early, gather feedback, and validate requirements fast.",
        mediaSlug: "Icons--full-stack-web-dev",
      },
      {
        title: "High-fidelity visual & responsive UI",
        description: "Polished interface screens with accessible contrast, typography hierarchies, and dedicated layouts across mobile, tablet, and desktop.",
        mediaSlug: "Icons--application-security",
      },
      {
        title: "Design systems & engineering handoff",
        description: "Scalable Figma component libraries, auto-layout variants, design tokens (colors, spacing, type), and developer inspection specs.",
        mediaSlug: "Icons--cloud-security",
      },
    ],
    capabilitiesTitle: "Design capabilities & artifacts",
    capabilities: [
      "Figma component libraries & tokens",
      "Interactive clickable prototyping",
      "User flows & journey architecture",
      "Responsive layout specs (Mobile, Tablet, Desktop)",
      "WCAG-conscious color & accessibility",
      "Interactive component states (hover, focus, disabled)",
      "Developer handoff documentation",
      "Design QA review during implementation",
    ],
    benefits: [
      {
        title: "Product thinking first",
        description: "Design decisions anchored in genuine user workflows and business objectives - not decorative guesswork.",
      },
      {
        title: "Implementation-ready handoff",
        description: "Auto-layout components, documented states, and standardized tokens that reduce friction and back-and-forth for front-end developers.",
      },
      {
        title: "Trust-building visual polish",
        description: "Clean, consistent aesthetics that convey credibility and technical sophistication across all user touchpoints.",
      },
    ],
    processTitle: "Our collaborative design process",
    processSubtitle: "Structured sprints with transparent checkpoints and rapid feedback loops.",
    processSteps: [
      { num: "01", title: "Discover", description: "Define product goals, core personas, functional requirements, and competitive benchmarks." },
      { num: "02", title: "Map & Wireframe", description: "Construct information architecture, define key user journeys, and create structural wireframes." },
      { num: "03", title: "Prototype", description: "Build clickable Figma prototypes to test usability, refine transitions, and align stakeholders." },
      { num: "04", title: "Visual Design", description: "Develop high-fidelity UI screens, establish design system tokens, and detail responsive views." },
      { num: "05", title: "Handoff & QA", description: "Deliver production-ready Figma files, exportable assets, and conduct design QA during build." },
    ],
    ctaHeadline: "Elevate your digital product experience",
    ctaDescription: "Share your product vision or redesign goals - we will craft an intuitive interface your users and developers will love.",
  },

  "edtech-training": {
    slug: "edtech-training",
    eyebrow: "EdTech & Institutional Training",
    heroHeadline: "Hands-on cybersecurity",
    heroHighlight: "and technology training.",
    heroMedia: "Icons--academic-training",
    heroImageAlt: "EdTech and cybersecurity training illustration",
    tagline:
      "Practical, lab-driven cybersecurity education, campus workshops, technical seminars, and institutional MoU partnerships delivered by active industry practitioners.",
    problemStatement:
      "Traditional computer science and IT curricula often focus heavily on textbook theory with minimal hands-on exposure to live security tools, vulnerability demonstrations, or real-world defensive methodologies. We bridge that divide through guided virtual lab environments, hands-on vulnerability scenarios, and structured institutional partnerships that build genuine engineering competence.",
    highlights: ["Hands-on virtual labs", "Campus & institutional MoUs", "Industry practitioner mentors"],
    audiences: [
      "Engineering colleges and universities seeking industry-aligned MoUs and guest seminars",
      "Computer science and IT departments looking for structured cybersecurity modules",
      "Students and aspiring security professionals seeking practical lab experience",
      "Organizations seeking cybersecurity awareness sessions and technical upskilling workshops",
    ],
    offeringsTitle: "Programs, formats & engagement models",
    offeringsSubtitle: "Structured learning paths for institutions, students, and technology teams.",
    offerings: [
      {
        title: "Cybersecurity foundations & labs",
        description: "Core networking concepts, Linux command-line basics, and security fundamentals explored through guided virtual lab exercises.",
        mediaSlug: "Icons--web-security",
      },
      {
        title: "Web security & ethical hacking workshops",
        description: "Hands-on demonstrations of OWASP Top 10 vulnerabilities, common attack vectors, and remediation in isolated sandbox environments.",
        mediaSlug: "Icons--application-security",
      },
      {
        title: "Campus MoUs & institutional programs",
        description: "Semester-aligned curriculum enrichment, guest faculty lectures, technical symposiums, and long-term academic partnerships.",
        mediaSlug: "Icons--academic-training",
      },
      {
        title: "Technical seminars & career roadmaps",
        description: "Half-day and full-day interactive workshops on modern cybersecurity careers, industry expectations, and defensive tooling.",
        mediaSlug: "Icons--network-security",
      },
    ],
    capabilitiesTitle: "Training deliverables & learner outcomes",
    capabilities: [
      "Virtual lab environment access",
      "Hands-on scenario demonstrations",
      "OWASP Top 10 vulnerability labs",
      "Campus seminars & technical workshops",
      "Curriculum-aligned institutional MoUs",
      "Interactive Q&A and industry mentorship",
      "Capstone mini-projects & assessments",
      "Authorized certificates of completion",
    ],
    benefits: [
      {
        title: "Practice over slides",
        description: "Learners engage with live configurations, simulated vulnerabilities, and real tools rather than theoretical slides alone.",
      },
      {
        title: "Academic calendar integration",
        description: "Flexible delivery models - from intensive one-day workshops to semester-long MoU modules that fit smoothly into university timetables.",
      },
      {
        title: "Active practitioner mentorship",
        description: "Instruction led by security engineers and developers who bring daily industry experience and real-world case studies to the classroom.",
      },
    ],
    processTitle: "How institutional engagements run",
    processSubtitle: "From curriculum alignment to practical student evaluation and certification.",
    processSteps: [
      { num: "01", title: "Consult", description: "Align with academic coordinators on target student cohorts, skill levels, and schedule." },
      { num: "02", title: "Structure", description: "Select program modules, lab exercises, and specific learning outcomes." },
      { num: "03", title: "Deliver", description: "Interactive lecture delivery combined with guided hands-on lab sessions and demonstrations." },
      { num: "04", title: "Practice", description: "Supervised student practice, scenario challenges, and mentor troubleshooting." },
      { num: "05", title: "Certify", description: "Practical evaluation, certificate issuance, and next-step career guidance." },
    ],
    ctaHeadline: "Bring industry-grade training to your learners",
    ctaDescription: "Partner with NebulaSafeTech for campus workshops, technical seminars, or long-term institutional MoUs tailored to your academic calendar.",
  },
};

export function getServiceDetailContent(slug: ServiceSlug): ServiceDetailContent {
  return SERVICE_DETAIL_CONTENT[slug];
}

// ─────────────────────────────────────────────────────────────
// DEDICATED CYBERSECURITY SERVICE PAGES
// ─────────────────────────────────────────────────────────────
export type CyberServiceDetailContent = Omit<ServiceDetailContent, "slug"> & {
  slug: CyberServiceSlug;
  problemStatement: string;
  audiences: string[];
};

const CYBER_SERVICE_CONTENT: Record<CyberServiceSlug, CyberServiceDetailContent> = {
  "web-security": {
    slug: "web-security",
    eyebrow: "Web Security",
    heroHeadline: "Find what attackers see",
    heroHighlight: "in your web surface.",
    heroMedia: "Icons--web-security",
    heroImageAlt: "Web security vulnerability testing illustration",
    tagline:
      "We test your public-facing websites, web APIs, and authentication endpoints using OWASP-aligned methods - producing findings your team can reproduce and fix, not scanner noise.",
    problemStatement:
      "Most web attacks exploit well-understood classes of vulnerability: injection flaws, broken authentication, insecure session handling, and misconfigured security headers. The problem is not that these vulnerabilities are novel - it is that they go undetected in production until an attacker finds them first. A structured web security assessment closes that gap before it becomes an incident.",
    highlights: ["OWASP Top 10 coverage", "Authenticated & unauthenticated testing", "Actionable remediation"],
    audiences: [
      "SaaS companies preparing for customer security reviews",
      "Organisations handling user data or payments",
      "Development teams building or launching web products",
      "Businesses that have not had an external assessment in the last 12 months",
    ],
    offeringsTitle: "What a web security engagement covers",
    offeringsSubtitle:
      "Manual testing informed by OWASP methodology - not an automated scan repackaged as a report.",
    offerings: [
      {
        title: "Web application VAPT",
        description:
          "Hands-on vulnerability assessment and penetration testing of web pages, forms, and flows - covering injection, XSS, IDOR, and broken access control.",
        mediaSlug: "Icons--web-security",
      },
      {
        title: "API security testing",
        description:
          "Review of REST endpoints, authentication tokens, rate limiting, and response data exposure - including business logic flaws not caught by automated scanners.",
        mediaSlug: "Icons--application-security",
      },
      {
        title: "Authentication & session review",
        description:
          "Assessment of login flows, password reset mechanisms, multi-factor authentication implementation, and session token handling.",
        mediaSlug: "Icons--network-security",
      },
      {
        title: "HTTP security headers & CORS",
        description:
          "Review of security response headers, CORS policy, cookie attributes, and content security policy configuration.",
        mediaSlug: "Icons--cloud-security",
      },
    ],
    capabilitiesTitle: "Testing scope and methods",
    capabilities: [
      "OWASP Top 10 (2021) coverage",
      "Authenticated multi-role testing",
      "Session management review",
      "HTTP security header analysis",
      "CORS and cross-origin policy review",
      "Redirect and open redirect testing",
      "File upload and content-type handling",
      "Third-party script exposure review",
    ],
    benefits: [
      {
        title: "Findings that developers can act on",
        description:
          "Each vulnerability comes with reproduction steps and a specific fix recommendation - not generic advice. Engineers can begin remediation without a separate briefing call.",
      },
      {
        title: "Severity-ranked to guide effort",
        description:
          "Findings are rated by actual exploitability and impact, so your team knows exactly where to focus first. We do not inflate severity to make a report look impressive.",
      },
      {
        title: "Retest on critical findings",
        description:
          "After you apply remediations, we verify that the fixes hold. This closes the loop and gives you confidence before re-exposing the surface.",
      },
    ],
    processTitle: "How a web security engagement runs",
    processSubtitle:
      "A clear sequence from scoping to retest - designed to minimise disruption while maximising coverage.",
    processSteps: [
      { num: "01", title: "Scope", description: "Agree on URLs, user roles, testing environment, and rules of engagement." },
      { num: "02", title: "Recon", description: "Map the attack surface, enumerate endpoints, and identify authentication flows." },
      { num: "03", title: "Test", description: "Manual and tool-assisted testing against agreed scope using OWASP methodology." },
      { num: "04", title: "Report", description: "Executive summary plus per-finding technical detail with reproduction steps and fixes." },
      { num: "05", title: "Retest", description: "Validate that critical and high findings have been effectively remediated." },
    ],
    ctaHeadline: "Know your web surface before attackers do",
    ctaDescription:
      "Share your web application details and we will scope an assessment that fits your environment and timeline.",
  },

  "cloud-security": {
    slug: "cloud-security",
    eyebrow: "Cloud Security",
    heroHeadline: "Close the gaps in your",
    heroHighlight: "cloud configuration.",
    heroMedia: "Icons--cloud-security",
    heroImageAlt: "Cloud security configuration review illustration",
    tagline:
      "Misconfigured IAM, overly permissive storage, and exposed services are the most common entry points in cloud environments. We review your configuration and identify what needs to change.",
    problemStatement:
      "Cloud platforms give engineering teams enormous speed - but that speed often creates configuration debt. Overly permissive IAM roles, publicly accessible storage, secrets in environment variables, and unreviewed pipeline permissions are common in environments that have grown organically. These are not advanced attack techniques; they are the standard path attackers use into cloud environments.",
    highlights: ["IAM & identity posture review", "Storage & network configuration", "DevSecOps pipeline review"],
    audiences: [
      "Engineering teams that have grown their cloud infrastructure quickly",
      "Companies preparing for customer security due diligence or audits",
      "Organisations that have never had a formal cloud configuration review",
      "Development teams managing CI/CD pipelines with production access",
    ],
    offeringsTitle: "What a cloud security review covers",
    offeringsSubtitle:
      "Configuration-focused review of the control plane and identity layer - not just network scanning.",
    offerings: [
      {
        title: "IAM policy review",
        description:
          "Audit of roles, policies, and service accounts for excessive permissions, wildcard actions, and privilege escalation paths.",
        mediaSlug: "Icons--cloud-security",
      },
      {
        title: "Storage & resource exposure",
        description:
          "Review of storage buckets, databases, and managed services for public accessibility, encryption settings, and access logging.",
        mediaSlug: "Icons--network-security",
      },
      {
        title: "Network controls review",
        description:
          "Assessment of security groups, VPC routing, firewall rules, and inter-service communication for unnecessary exposure.",
        mediaSlug: "Icons--web-security",
      },
      {
        title: "DevSecOps & pipeline review",
        description:
          "Review of CI/CD pipeline permissions, secret injection patterns, and supply-chain exposure in build environments.",
        mediaSlug: "Icons--application-security",
      },
    ],
    capabilitiesTitle: "Cloud security review scope",
    capabilities: [
      "IAM role and policy analysis",
      "Storage bucket access controls",
      "Network security group review",
      "Secrets and credential management",
      "Logging and monitoring coverage",
      "Service-to-service access patterns",
      "CI/CD pipeline permission review",
      "Publicly accessible resource identification",
    ],
    benefits: [
      {
        title: "Prioritised misconfiguration findings",
        description:
          "We rank findings by exploitability and data exposure risk - so you address the access paths that matter most before the ones that are harder to reach.",
      },
      {
        title: "Written remediation guidance",
        description:
          "Each finding includes a specific configuration change, not just a description of the problem. For complex changes like IAM redesign, we provide step-by-step advisory.",
      },
      {
        title: "Fits within your access constraints",
        description:
          "We work with read-only credentials, exported policy documents, or IaC files - whatever your security team is comfortable sharing. We do not require broad access to do a useful review.",
      },
    ],
    processTitle: "How a cloud security engagement works",
    processSubtitle:
      "A structured review that fits within your access and compliance constraints.",
    processSteps: [
      { num: "01", title: "Scope", description: "Agree on cloud platforms, accounts, and access method for the review." },
      { num: "02", title: "Enumerate", description: "Map resources, services, and access patterns across the environment." },
      { num: "03", title: "Assess", description: "Review IAM, network controls, storage, secrets, and pipeline configuration." },
      { num: "04", title: "Report", description: "Findings with risk rating, specific remediation steps, and prioritisation guidance." },
      { num: "05", title: "Advise", description: "Walk through findings with your team and support complex remediation decisions." },
    ],
    ctaHeadline: "Review your cloud posture before it becomes a liability",
    ctaDescription:
      "Tell us about your cloud environment and we will scope a configuration review that matches your access constraints and risk priorities.",
  },

  "application-security": {
    slug: "application-security",
    eyebrow: "Application Security",
    heroHeadline: "Secure the code,",
    heroHighlight: "not just the surface.",
    heroMedia: "Icons--application-security",
    heroImageAlt: "Application security source code and API review illustration",
    tagline:
      "Application security addresses vulnerabilities inside your software: business logic flaws, insecure dependencies, API design issues, and the development practices that introduce them. It goes beyond what external testing alone can find.",
    problemStatement:
      "Web security assessments test what an attacker can reach through a browser. Application security looks inside - at the code paths, data validation, privilege logic, and software supply chain that determine what can be exploited even when the external surface looks clean. Many of the most impactful vulnerabilities in production systems are in business logic and internal APIs, not the perimeter.",
    highlights: ["Source code review", "API security & logic testing", "Secure SDLC guidance"],
    audiences: [
      "Software product teams with in-house engineering",
      "Companies that have had a web VAPT but want deeper coverage",
      "Organisations building security-sensitive features (payments, access control, data export)",
      "Teams preparing to release a significant new product or feature",
    ],
    offeringsTitle: "What application security covers",
    offeringsSubtitle:
      "Code, logic, and lifecycle - where the vulnerabilities that external testing misses actually live.",
    offerings: [
      {
        title: "Source code review",
        description:
          "Review of application source code for insecure patterns: SQL construction, weak cryptography, hardcoded credentials, improper input handling, and dangerous function usage.",
        mediaSlug: "Icons--application-security",
      },
      {
        title: "API security testing",
        description:
          "Assessment of API authentication, authorisation logic, rate limiting, input validation, and response data exposure - including business logic-level flaws.",
        mediaSlug: "Icons--web-security",
      },
      {
        title: "Threat modelling",
        description:
          "Structured review of system architecture, trust boundaries, and data flows to surface high-risk design decisions before they become vulnerabilities in production.",
        mediaSlug: "Icons--cloud-security",
      },
      {
        title: "Dependency & supply chain review",
        description:
          "Assessment of third-party libraries and package dependencies for known vulnerabilities and unmaintained components.",
        mediaSlug: "Icons--network-security",
      },
    ],
    capabilitiesTitle: "Application security focus areas",
    capabilities: [
      "Source code review (language-agnostic)",
      "Business logic and access control testing",
      "API authentication and authorisation",
      "Dependency vulnerability analysis",
      "Threat modelling and design review",
      "Secure SDLC process assessment",
      "Insecure deserialization identification",
      "Developer-focused remediation guidance",
    ],
    benefits: [
      {
        title: "Vulnerabilities external tests miss",
        description:
          "Business logic flaws, internal privilege escalation paths, and insecure data flows are often invisible to external assessment tools. Code review and threat modelling surface them.",
      },
      {
        title: "Developer-ready findings",
        description:
          "Reports include the specific file, function, or design decision that introduces the risk - so engineers can locate and fix the issue without a separate investigation.",
      },
      {
        title: "Secure SDLC improvement",
        description:
          "We identify patterns, not just instances. Recommendations address the practices that produce vulnerabilities, reducing recurrence in future development cycles.",
      },
    ],
    processTitle: "Application security engagement flow",
    processSubtitle:
      "Designed to integrate with your development workflow without blocking delivery.",
    processSteps: [
      { num: "01", title: "Scope", description: "Agree on codebase access, focus areas, and business logic to review." },
      { num: "02", title: "Analyse", description: "Code review, dependency audit, and architecture walkthrough." },
      { num: "03", title: "Test", description: "API and logic testing against agreed scenarios and data flows." },
      { num: "04", title: "Report", description: "Per-finding detail with code location, risk explanation, and specific fix." },
      { num: "05", title: "Remediate", description: "Developer advisory sessions and retest of critical findings." },
    ],
    ctaHeadline: "Find what external testing cannot",
    ctaDescription:
      "Share your application details and we will design an engagement that covers the logic and code paths your current testing misses.",
  },

  "network-security": {
    slug: "network-security",
    eyebrow: "Network Security",
    heroHeadline: "Reduce your exposed",
    heroHighlight: "network attack surface.",
    heroMedia: "Icons--network-security",
    heroImageAlt: "Network security perimeter and firewall assessment illustration",
    tagline:
      "We assess the infrastructure layer - open services, firewall rules, network segmentation, and access controls - to identify the paths attackers could use and recommend practical hardening steps.",
    problemStatement:
      "Network exposure grows incrementally. A port opened for a project, a firewall rule added during an outage, an internal service reachable from an unexpected zone - each is low risk individually. Together they create pathways for lateral movement and unauthorised access. A structured network security review identifies these accumulated exposures before they are exploited.",
    highlights: ["External perimeter assessment", "Firewall rule review", "Segmentation & access controls"],
    audiences: [
      "Organisations that have not reviewed their network perimeter in the past year",
      "Companies preparing for compliance or customer security assessments",
      "Teams that have recently migrated or expanded infrastructure",
      "Businesses with mixed on-premise and cloud network environments",
    ],
    offeringsTitle: "What a network security assessment covers",
    offeringsSubtitle:
      "Infrastructure-layer review focused on exposure, segmentation, and access paths.",
    offerings: [
      {
        title: "External perimeter review",
        description:
          "Identification of externally accessible services, open ports, service banners, and exposure beyond the expected perimeter.",
        mediaSlug: "Icons--network-security",
      },
      {
        title: "Firewall rule assessment",
        description:
          "Review of firewall policies for overly permissive rules, any-source access, stale rules, and gaps between intended policy and actual configuration.",
        mediaSlug: "Icons--web-security",
      },
      {
        title: "Network segmentation review",
        description:
          "Assessment of zone separation between internal networks, DMZ, and external-facing services to identify lateral movement paths.",
        mediaSlug: "Icons--cloud-security",
      },
      {
        title: "Remote access & VPN review",
        description:
          "Review of VPN configuration, remote desktop exposure, and authentication requirements for remote access services.",
        mediaSlug: "Icons--application-security",
      },
    ],
    capabilitiesTitle: "Network security assessment scope",
    capabilities: [
      "External service enumeration",
      "Open port and protocol review",
      "Firewall rule analysis",
      "Network segmentation assessment",
      "VPN and remote access review",
      "Service banner and version exposure",
      "Access control between zones",
      "Hardening recommendations",
    ],
    benefits: [
      {
        title: "Infrastructure-layer visibility",
        description:
          "Network security findings represent your actual exposure at the IP and service layer - independent of what applications are running on those services.",
      },
      {
        title: "Hardening recommendations that are actionable",
        description:
          "Each finding comes with a specific recommended change: close this port, tighten this rule, add this segment boundary. Not abstract advice.",
      },
      {
        title: "Scoped to your environment",
        description:
          "External-only, internal, or hybrid assessments depending on your infrastructure and what your team can authorise. We define scope together before any testing begins.",
      },
    ],
    processTitle: "Network security engagement process",
    processSubtitle:
      "Structured, coordinated, and scoped before any active testing begins.",
    processSteps: [
      { num: "01", title: "Scope", description: "Define IP ranges, networks, and rules of engagement before testing." },
      { num: "02", title: "Enumerate", description: "Identify services, open ports, and accessible endpoints." },
      { num: "03", title: "Assess", description: "Review firewall rules, segmentation, and access controls." },
      { num: "04", title: "Report", description: "Risk-rated findings with specific remediation steps." },
      { num: "05", title: "Harden", description: "Advisory support for applying configuration changes in the right order." },
    ],
    ctaHeadline: "Know what is reachable on your network",
    ctaDescription:
      "Describe your infrastructure and we will scope a network security assessment that covers your perimeter and internal exposure.",
  },
};

export function getCyberServiceDetailContent(slug: CyberServiceSlug): CyberServiceDetailContent {
  return CYBER_SERVICE_CONTENT[slug];
}
