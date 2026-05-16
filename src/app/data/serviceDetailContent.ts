import type { ServiceSlug } from "../../seo/pageMeta";
import type { MediaSlug } from "../utils/media";

export type ServiceOffering = {
  title: string;
  description: string;
  mediaSlug: MediaSlug;
};

export type ServiceBenefit = {
  title: string;
  description: string;
};

export type ServiceProcessStep = {
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

export const SERVICE_DETAIL_CONTENT: Record<ServiceSlug, ServiceDetailContent> = {
  "web-development": {
    slug: "web-development",
    eyebrow: "Full-Stack Web Development",
    heroHeadline: "Modern web products",
    heroHighlight: "built to scale securely.",
    heroMedia: "Icons--full-stack-web-dev",
    heroImageAlt: "Full-stack web development illustration",
    tagline:
      "From MVPs to enterprise platforms-we design, build, and deploy production-ready web applications with security and performance baked in from day one.",
    highlights: ["React & modern stacks", "Secure SDLC", "Cloud-ready deploys"],
    offeringsTitle: "What we build",
    offeringsSubtitle: "End-to-end delivery across front-end, APIs, and deployment-aligned to your roadmap.",
    offerings: [
      {
        title: "SaaS & product platforms",
        description: "Multi-tenant apps, dashboards, and subscription flows engineered for growth and maintainability.",
        mediaSlug: "Icons--full-stack-web-dev",
      },
      {
        title: "Business & marketing sites",
        description: "Fast, accessible sites with CMS-friendly structure and conversion-focused UX.",
        mediaSlug: "Icons--web-design-uiux",
      },
      {
        title: "APIs & integrations",
        description: "RESTful services, third-party integrations, and clean contracts your team can extend.",
        mediaSlug: "Icons--web-security",
      },
      {
        title: "Legacy modernization",
        description: "Incremental rewrites and refactors that reduce risk while improving security and velocity.",
        mediaSlug: "Icons--cloud-security",
      },
    ],
    capabilitiesTitle: "Technologies & practices",
    capabilities: [
      "React, TypeScript & Vite",
      "Node.js & API design",
      "OWASP-aware development",
      "Responsive & accessible UI",
      "CI/CD & staging pipelines",
      "Performance & Core Web Vitals",
    ],
    benefits: [
      {
        title: "Security from sprint one",
        description: "Threat modeling, secure defaults, and review checkpoints-not a bolt-on before launch.",
      },
      {
        title: "Engineering clarity",
        description: "Documented architecture, sensible abstractions, and handoffs your team can own long-term.",
      },
      {
        title: "Ship-ready delivery",
        description: "Staging environments, testing discipline, and deployment support through go-live.",
      },
    ],
    processTitle: "How we deliver",
    processSubtitle: "A phased model that keeps stakeholders aligned and quality high.",
    processSteps: [
      { num: "01", title: "Discover", description: "Goals, users, constraints, and success metrics." },
      { num: "02", title: "Architect", description: "Stack, data model, integrations, and security requirements." },
      { num: "03", title: "Build", description: "Iterative sprints with demos and transparent progress." },
      { num: "04", title: "Harden", description: "Testing, performance tuning, and security review." },
      { num: "05", title: "Launch", description: "Deploy, monitor, and transition to support." },
    ],
    ctaHeadline: "Ready to build your next web product?",
    ctaDescription: "Tell us about your idea, timeline, and stack-we'll propose a practical path to production.",
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
    offeringsSubtitle: "Coverage across the attack surface that matters most to your business.",
    offerings: [
      {
        title: "Web & application security",
        description: "OWASP-aligned testing for web apps, APIs, and authentication flows.",
        mediaSlug: "Icons--web-security",
      },
      {
        title: "Cloud security",
        description: "Configuration review, identity posture, and DevSecOps integration guidance.",
        mediaSlug: "Icons--cloud-security",
      },
      {
        title: "Application security programs",
        description: "Secure SDLC practices, threat modeling, and developer-ready remediation guidance.",
        mediaSlug: "Icons--application-security",
      },
      {
        title: "Network security",
        description: "Perimeter hardening, segmentation review, and exposure reduction.",
        mediaSlug: "Icons--network-security",
      },
      {
        title: "Encryption & data protection",
        description: "Data classification, encryption strategy, and privacy-conscious controls.",
        mediaSlug: "Icons--encryption-data-protection",
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
    eyebrow: "UI/UX Design Services",
    heroHeadline: "Experiences that",
    heroHighlight: "convert and delight.",
    heroMedia: "Icons--web-design-uiux",
    heroImageAlt: "UI and UX design illustration",
    tagline:
      "Research-led product design from first wireframe to polished UI-built for accessibility, brand consistency, and smooth handoff to engineering.",
    highlights: ["User research", "Design systems", "Dev-ready specs"],
    offeringsTitle: "Design services",
    offeringsSubtitle: "From discovery to pixel-perfect UI-aligned with how your team ships.",
    offerings: [
      {
        title: "UX research & discovery",
        description: "User interviews, journey maps, and problem framing before pixels hit the canvas.",
        mediaSlug: "Icons--web-design-uiux",
      },
      {
        title: "Wireframes & prototyping",
        description: "Clickable flows to validate ideas early and align stakeholders fast.",
        mediaSlug: "Icons--full-stack-web-dev",
      },
      {
        title: "Visual UI design",
        description: "High-fidelity screens for web and product surfaces with consistent visual language.",
        mediaSlug: "Icons--application-security",
      },
      {
        title: "Design systems",
        description: "Reusable components, tokens, and documentation that scale across teams.",
        mediaSlug: "Icons--cloud-security",
      },
    ],
    capabilitiesTitle: "Deliverables you receive",
    capabilities: [
      "Figma design files",
      "Component libraries",
      "Responsive breakpoints",
      "Accessibility (WCAG-aware)",
      "Interaction specifications",
      "Design QA with engineering",
    ],
    benefits: [
      {
        title: "Product thinking first",
        description: "Design decisions tied to user goals and business outcomes-not decoration alone.",
      },
      {
        title: "Implementation-aware",
        description: "Specs and components that respect your stack, timelines, and constraints.",
      },
      {
        title: "Brand-aligned polish",
        description: "Cohesive visuals that strengthen trust-especially for security and SaaS products.",
      },
    ],
    processTitle: "Design process",
    processSubtitle: "Collaborative sprints with clear checkpoints and feedback loops.",
    processSteps: [
      { num: "01", title: "Understand", description: "Users, jobs-to-be-done, and success criteria." },
      { num: "02", title: "Explore", description: "Sketches, wireframes, and rapid concept testing." },
      { num: "03", title: "Define", description: "Information architecture and interaction patterns." },
      { num: "04", title: "Design", description: "High-fidelity UI, states, and responsive layouts." },
      { num: "05", title: "Hand off", description: "Specs, assets, and design QA during build." },
    ],
    ctaHeadline: "Elevate your product experience",
    ctaDescription: "Share your product vision-we'll shape interfaces that users trust and teams can ship.",
  },

  "edtech-training": {
    slug: "edtech-training",
    eyebrow: "EdTech & Cybersecurity Training",
    heroHeadline: "Learn security",
    heroHighlight: "by building for real.",
    heroMedia: "Icons--academic-training",
    heroImageAlt: "EdTech and cybersecurity training illustration",
    tagline:
      "Instructor-led programs, hands-on labs, and capstone projects that turn learners into practitioners-with pathways for campuses and organizations.",
    highlights: ["Hands-on labs", "Industry mentors", "Portfolio projects"],
    offeringsTitle: "Programs & formats",
    offeringsSubtitle: "Structured learning paths for students, professionals, and institutions.",
    offerings: [
      {
        title: "Cybersecurity foundations",
        description: "Core concepts, networking basics, and ethical hacking fundamentals with guided labs.",
        mediaSlug: "Icons--web-security",
      },
      {
        title: "Advanced security tracks",
        description: "Web app security, cloud basics, and incident-response scenarios in sandbox environments.",
        mediaSlug: "Icons--application-security",
      },
      {
        title: "Campus & institutional MoUs",
        description: "Curriculum alignment, faculty enablement, and semester-long delivery models.",
        mediaSlug: "Icons--academic-training",
      },
      {
        title: "Corporate workshops",
        description: "Awareness sessions and role-based upskilling for engineering and IT teams.",
        mediaSlug: "Icons--network-security",
      },
    ],
    capabilitiesTitle: "What learners gain",
    capabilities: [
      "Live instructor sessions",
      "Virtual lab environments",
      "Capstone & mini-projects",
      "Certificate of completion",
      "Career-oriented mentorship",
      "Real-world case studies",
    ],
    benefits: [
      {
        title: "Practice over theory",
        description: "Labs and projects mirror industry workflows-not slide-only courses.",
      },
      {
        title: "Institution-ready",
        description: "Programs designed for colleges with scheduling and outcomes that fit academic calendars.",
      },
      {
        title: "Industry connection",
        description: "Exposure to NebulaSafeTech delivery practices and security engineering mindsets.",
      },
    ],
    processTitle: "Learning journey",
    processSubtitle: "From enrollment to portfolio-ready outcomes.",
    processSteps: [
      { num: "01", title: "Orient", description: "Goals, prerequisites, and lab setup." },
      { num: "02", title: "Learn", description: "Live sessions with guided exercises." },
      { num: "03", title: "Practice", description: "Scenario labs and peer collaboration." },
      { num: "04", title: "Build", description: "Capstone project with mentor review." },
      { num: "05", title: "Grow", description: "Feedback, certification, and next-step guidance." },
    ],
    ctaHeadline: "Bring industry-grade training to your learners",
    ctaDescription: "Partner with us for campus programs, corporate upskilling, or cohort-based cybersecurity courses.",
  },
};

export function getServiceDetailContent(slug: ServiceSlug): ServiceDetailContent {
  return SERVICE_DETAIL_CONTENT[slug];
}
