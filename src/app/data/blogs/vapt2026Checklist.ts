import type { BlogPost } from "../blogsData";

/**
 * Blog #12 - How Often Should Your Company Do VAPT? A 2026 Checklist
 *
 * Author: Rajiv Sharma
 * Category: Cybersecurity
 * Published: September 26, 2026
 */
export const blogPostVapt2026Checklist: BlogPost = {
  id: "12",
  slug: "how-often-should-your-company-do-vapt-2026",
  title: "How Often Should Your Company Do VAPT? A 2026 Checklist",
  seoTitle: "How Often Should Your Company Do VAPT? A 2026 Checklist",
  metaDescription:
    "How often should a company perform VAPT? Follow this practical 2026 checklist: test after major new features, every 6–12 months, and after security incidents.",
  excerpt:
    "Vulnerability Assessment and Penetration Testing is not something a company should do once and forget. Your technology changes, new features are released, and attack techniques evolve. This practical 2026 guide explains the trigger-based VAPT strategy that balances recurring baseline testing with change-driven assessments.",
  category: "Cybersecurity",
  primaryKeyword: "how often should VAPT be done",
  secondaryKeywords: [
    "VAPT frequency",
    "vulnerability assessment",
    "penetration testing schedule",
    "web security testing",
    "application security",
    "network security",
    "cloud security",
    "security testing 2026",
  ],
  date: "September 26, 2026",
  publishedIsoDate: "2026-09-26T00:00:00Z",
  readTime: "10 min read",
  featuredImage: {
    src: "/media/blogs/vapt-2026-checklist.jpg",
    webpSrc: "/media/blogs/vapt-2026-checklist.webp",
    alt: "VAPT security testing checklist showing feature releases, six to twelve month testing cycles and security incidents",
    width: 1672,
    height: 941,
  },
  author: {
    name: "Rajiv Sharma",
    role: "Cybersecurity Engineer & Founder",
    avatar: "/media/authors/rajiv-sharma.webp",
    bio: "Rajiv Sharma is a cybersecurity engineer and founder at NebulaSafeTech, focusing on defensive security, zero-trust architectures, and data-layer protection for enterprise environments.",
    profileUrl: "https://www.linkedin.com/in/rajiv-sharma-nebula/",
  },
  cta: {
    statement: "Need to assess your application's current security posture?",
    description:
      "NebulaSafeTech can help scope security testing around your web, application, cloud, and network environment. Whether you need a one-time VAPT or a recurring security testing schedule, our team works with your risk profile and development lifecycle.",
    primaryActionText: "Explore Cybersecurity Services",
    primaryActionUrl: "/services/cybersecurity",
    secondaryActionText: "Talk to NebulaSafeTech",
    secondaryActionUrl: "/about",
  },
  faqs: [
    {
      question: "How often should VAPT be done?",
      answer:
        "A practical baseline is after major security-relevant changes, every 6–12 months based on risk, and after a security incident. Higher-risk environments may require more frequent testing.",
    },
    {
      question: "Is annual VAPT enough?",
      answer:
        "It can be an appropriate baseline for some organizations, but it is not automatically enough. Major changes and incidents should trigger additional security assessment. OWASP currently recommends at least annual penetration testing depending on the assurance required for the application.",
    },
    {
      question: "Should I do VAPT after every website update?",
      answer:
        "Not necessarily. A small content or styling update usually does not justify a full penetration test. A new API, payment system, authentication mechanism, admin function, or major architecture change can justify focused security testing.",
    },
    {
      question: "Is vulnerability scanning the same as VAPT?",
      answer:
        "No. Vulnerability assessment generally identifies known weaknesses, while penetration testing combines automated and manual techniques to validate exploitability and impact.",
    },
    {
      question: "Should VAPT be performed on a production website?",
      answer:
        "The decision depends on scope, authorization, testing methodology, and operational risk. Testing should be planned carefully to avoid unnecessary disruption.",
    },
    {
      question: "What happens after VAPT?",
      answer:
        "Findings should be prioritized, assigned, remediated, and retested where appropriate. The next testing cycle should also be scheduled.",
    },
    {
      question: "Can VAPT guarantee that a company is secure?",
      answer:
        "No. A penetration test provides assurance about the defined scope and testing performed at a particular point in time. It cannot prove that every possible vulnerability or future attack has been eliminated.",
    },
  ],
  toc: [
    { id: "what-vapt-actually-means", title: "1. What VAPT Actually Means", level: 2 },
    { id: "the-simple-2026-vapt-rule", title: "2. The Simple 2026 VAPT Rule", level: 2 },
    { id: "trigger-1-after-major-new-features-or-changes", title: "3. Trigger 1: After Major New Features or Changes", level: 2 },
    { id: "trigger-2-every-6-12-months", title: "4. Trigger 2: Every 6–12 Months", level: 2 },
    { id: "trigger-3-after-a-security-incident", title: "5. Trigger 3: After a Security Incident", level: 2 },
    { id: "when-you-should-test-more-frequently", title: "6. When You Should Test More Frequently", level: 2 },
    { id: "what-should-be-included-in-a-vapt", title: "7. What Should Be Included in a VAPT", level: 2 },
    { id: "vapt-vs-vulnerability-scanning", title: "8. VAPT vs Vulnerability Scanning", level: 2 },
    { id: "the-2026-vapt-checklist", title: "9. The 2026 VAPT Checklist", level: 2 },
    { id: "what-to-do-after-the-vapt", title: "10. What to Do After the VAPT", level: 2 },
    { id: "common-vapt-mistakes", title: "11. Common VAPT Mistakes", level: 2 },
    { id: "a-practical-vapt-schedule", title: "12. A Practical VAPT Schedule", level: 2 },
    { id: "frequently-asked-questions", title: "13. Frequently Asked Questions", level: 2 },
    { id: "conclusion", title: "14. Conclusion", level: 2 },
    { id: "relevant-nebulasafetech-services", title: "Relevant NebulaSafeTech Services", level: 2 },
    { id: "sources-and-further-reading", title: "Sources and Further Reading", level: 2 },
  ],
  sections: [
    // ─── Introduction ───────────────────────────────────────────────────────
    {
      id: "introduction",
      title: "Introduction",
      level: 2,
      blocks: [
        {
          type: "p",
          text: "Vulnerability Assessment and Penetration Testing, commonly called **VAPT**, is not something a company should do once and forget.",
        },
        {
          type: "p",
          text: "Your technology changes. New features are released. APIs are added. Cloud infrastructure changes. Employees and permissions change. New dependencies are introduced. Third-party integrations are connected. Attack techniques evolve.",
        },
        {
          type: "p",
          text: "Every meaningful change can change your security posture.",
        },
        {
          type: "p",
          text: "That leads to a practical question:",
        },
        {
          type: "quote",
          text: "How often should a company perform VAPT?",
        },
        {
          type: "p",
          text: "For most organizations, a useful baseline is: **Perform VAPT after major security-relevant changes, every 6–12 months based on risk, and after any security incident.**",
        },
        {
          type: "p",
          text: "This is not a universal regulatory rule for every company. The exact frequency should depend on the application's risk, exposure, data sensitivity, business impact, regulatory requirements, and how frequently the environment changes.",
        },
        {
          type: "p",
          text: "OWASP's current application-security guidance recommends risk-based security testing and says applications should receive penetration testing at least annually, or more often depending on the required level of assurance. OWASP also recommends security verification around significant changes and throughout the software development lifecycle.",
        },
        {
          type: "p",
          text: "CREST distinguishes Vulnerability Assessment from Penetration Testing: vulnerability assessments are commonly repeatable and automated, while penetration tests are generally more focused and performed less frequently, often annually, on release, or when driven by risk or regulation.",
        },
        {
          type: "p",
          text: "So the answer is not simply \"once a year.\"",
        },
        {
          type: "p",
          text: "It is a **trigger-based security testing strategy plus a recurring baseline**.",
        },
      ],
    },

    // ─── Section 1: What VAPT Actually Means ────────────────────────────────
    {
      id: "what-vapt-actually-means",
      title: "1. What VAPT Actually Means",
      level: 2,
      blocks: [
        {
          type: "p",
          text: "VAPT combines two related but different activities.",
        },
        {
          type: "h3",
          id: "vulnerability-assessment",
          title: "Vulnerability Assessment",
        },
        {
          type: "p",
          text: "A vulnerability assessment focuses on identifying known vulnerabilities and weaknesses. It can involve automated vulnerability scanners, asset discovery, configuration checks, dependency analysis, infrastructure scanning, and vulnerability prioritization.",
        },
        {
          type: "p",
          text: "CREST describes vulnerability assessment as commonly repeatable and suitable for continuous or regular schedules such as daily, weekly, or monthly scanning depending on the environment.",
        },
        {
          type: "h3",
          id: "penetration-testing",
          title: "Penetration Testing",
        },
        {
          type: "p",
          text: "Penetration testing goes further. A penetration tester uses automated and manual techniques to determine whether weaknesses can actually be exploited and what impact that exploitation could have.",
        },
        {
          type: "p",
          text: "A typical penetration test can include:",
        },
        {
          type: "list",
          style: "ordered",
          items: [
            "Reconnaissance",
            "Vulnerability analysis",
            "Exploitation",
            "Post-exploitation analysis",
            "Reporting and business-impact analysis",
          ],
        },
        {
          type: "p",
          text: "CREST notes that penetration testing is generally more focused and intrusive than vulnerability assessment and is often performed annually, on release, ad hoc, or when required by regulation or risk.",
        },
        {
          type: "h3",
          id: "why-the-difference-matters",
          title: "Why the difference matters",
        },
        {
          type: "p",
          text: "A vulnerability scanner might identify:",
        },
        {
          type: "diagram",
          content: "Potential vulnerability\n        ↓\nKnown affected component",
        },
        {
          type: "p",
          text: "A penetration test asks:",
        },
        {
          type: "diagram",
          content: "Potential vulnerability\n        ↓\nCan it actually be exploited?\n        ↓\nWhat access can be obtained?\n        ↓\nWhat data or business process is affected?",
        },
        {
          type: "p",
          text: "You should not treat these as interchangeable. A company can have regular vulnerability scanning and still need periodic penetration testing.",
        },
      ],
    },

    // ─── Section 2: The Simple 2026 VAPT Rule ───────────────────────────────
    {
      id: "the-simple-2026-vapt-rule",
      title: "2. The Simple 2026 VAPT Rule",
      level: 2,
      blocks: [
        {
          type: "p",
          text: "If you want one rule that is easy for a business to remember, use this:",
        },
        {
          type: "quote",
          text: "Test after major changes + every 6–12 months + after security incidents.",
        },
        {
          type: "h3",
          id: "rule-after-major-changes",
          title: "1. After major security-relevant changes",
        },
        {
          type: "p",
          text: "Perform appropriate security testing when significant changes affect the attack surface.",
        },
        {
          type: "p",
          text: "Examples include:",
        },
        {
          type: "list",
          style: "unordered",
          items: [
            "New authentication system",
            "New payment functionality",
            "New public API",
            "New file-upload functionality",
            "New admin functionality",
            "New user roles",
            "Major application rewrite",
            "New cloud infrastructure",
            "New external integration",
            "Major database changes",
            "Significant network architecture changes",
          ],
        },
        {
          type: "p",
          text: "OWASP's attack-surface guidance specifically recommends assessing how security risk changes when new interfaces, APIs, authentication, authorization, encryption, roles, or major architecture are introduced.",
        },
        {
          type: "h3",
          id: "rule-every-6-12-months",
          title: "2. Every 6–12 months",
        },
        {
          type: "p",
          text: "Use a recurring VAPT cycle as a baseline.",
        },
        {
          type: "p",
          text: "For lower-risk environments, annual testing may be sufficient when supported by continuous security controls and regular vulnerability management. For higher-risk systems, testing every six months can provide a shorter assurance cycle.",
        },
        {
          type: "p",
          text: "OWASP's current guidance says at least annual penetration testing may be appropriate, with more frequent testing depending on the required level of assurance.",
        },
        {
          type: "h3",
          id: "rule-after-security-incident",
          title: "3. After any security incident",
        },
        {
          type: "p",
          text: "If your company experiences a security incident, do not simply patch the reported vulnerability and move on. Reassess the affected environment.",
        },
        {
          type: "p",
          text: "The objective is to determine:",
        },
        {
          type: "list",
          style: "unordered",
          items: [
            "What was exploited?",
            "What else could be exploited?",
            "Did the attacker move laterally?",
            "Were similar weaknesses present elsewhere?",
            "Did the incident reveal an architectural problem?",
            "Did existing controls work?",
            "Did monitoring detect the activity?",
            "Were credentials or secrets exposed?",
          ],
        },
        {
          type: "p",
          text: "OWASP's secure code review guidance recommends a thorough review following security breaches or major vulnerabilities.",
        },
      ],
    },

    // ─── Section 3: Trigger 1 ────────────────────────────────────────────────
    {
      id: "trigger-1-after-major-new-features-or-changes",
      title: "3. Trigger 1: After Major New Features or Changes",
      level: 2,
      blocks: [
        {
          type: "p",
          text: "This is where many organizations make a mistake. They schedule one annual penetration test, but release new functionality throughout the year. The application can change significantly between tests.",
        },
        {
          type: "h3",
          id: "trigger1-example",
          title: "Example",
        },
        {
          type: "p",
          text: "Suppose your company has a secure web application.",
        },
        {
          type: "p",
          text: "In January:",
        },
        {
          type: "diagram",
          content: "Application\n├── Login\n├── User Dashboard\n└── Profile",
        },
        {
          type: "p",
          text: "In April, the company adds:",
        },
        {
          type: "diagram",
          content: "Application\n├── Login\n├── User Dashboard\n├── File Upload\n├── Admin Portal\n├── Public API\n└── Payment Integration",
        },
        {
          type: "p",
          text: "The original security assessment does not automatically cover the new attack surface.",
        },
        {
          type: "h3",
          id: "trigger1-not-every-change",
          title: "Not every small change requires a full VAPT",
        },
        {
          type: "p",
          text: "A small UI text change is not equivalent to adding a new API, payment flow, admin role, file upload, or authentication mechanism.",
        },
        {
          type: "p",
          text: "OWASP's attack-surface guidance recommends looking at what changed and whether the change creates a materially different security risk.",
        },
        {
          type: "p",
          text: "A practical approach is:",
        },
        {
          type: "diagram",
          content: "Small low-risk change\n        ↓\nNormal security checks\n\nSecurity-relevant feature\n        ↓\nFocused security review/testing\n\nMajor architecture or trust-boundary change\n        ↓\nBroader security assessment / VAPT",
        },
      ],
    },

    // ─── Section 4: Trigger 2 ────────────────────────────────────────────────
    {
      id: "trigger-2-every-6-12-months",
      title: "4. Trigger 2: Every 6–12 Months",
      level: 2,
      blocks: [
        {
          type: "p",
          text: "A recurring VAPT provides an independent security checkpoint.",
        },
        {
          type: "p",
          text: "Your environment changes even when your team does not intentionally change security controls. Over time:",
        },
        {
          type: "list",
          style: "unordered",
          items: [
            "Dependencies receive updates",
            "Cloud configurations change",
            "New endpoints appear",
            "Permissions change",
            "New vulnerabilities are discovered",
            "Infrastructure changes",
            "Employees and administrators change",
            "New integrations are introduced",
          ],
        },
        {
          type: "p",
          text: "An annual penetration test is therefore not a certificate saying \"this company is secure.\" It is a point-in-time assessment of the defined scope.",
        },
        {
          type: "p",
          text: "The scope, methodology, credentials, test environment, and date all matter.",
        },
        {
          type: "h3",
          id: "when-6-months-makes-more-sense",
          title: "When 6 months makes more sense",
        },
        {
          type: "p",
          text: "Consider a shorter cycle when you have:",
        },
        {
          type: "list",
          style: "unordered",
          items: [
            "Sensitive customer data",
            "Financial transactions",
            "Healthcare-related information",
            "High-value intellectual property",
            "Internet-facing critical systems",
            "Frequent production changes",
            "Large attack surfaces",
            "High business impact from compromise",
            "Significant regulatory or contractual requirements",
          ],
        },
        {
          type: "p",
          text: "The exact interval should be risk-based rather than selected simply because another company uses it.",
        },
      ],
    },

    // ─── Section 5: Trigger 3 ────────────────────────────────────────────────
    {
      id: "trigger-3-after-a-security-incident",
      title: "5. Trigger 3: After a Security Incident",
      level: 2,
      blocks: [
        {
          type: "p",
          text: "A security incident should change your testing priority.",
        },
        {
          type: "p",
          text: "Imagine a company discovers unauthorized access to an administrative account.",
        },
        {
          type: "p",
          text: "Changing the password is necessary. It is not enough.",
        },
        {
          type: "p",
          text: "You should investigate:",
        },
        {
          type: "diagram",
          content: "Initial weakness\n      ↓\nHow was access obtained?\n      ↓\nWhat permissions were available?\n      ↓\nWhat systems were reachable?\n      ↓\nWas lateral movement possible?\n      ↓\nWas sensitive data accessible?\n      ↓\nAre similar weaknesses elsewhere?",
        },
        {
          type: "p",
          text: "A post-incident assessment can help validate whether remediation actually closed the attack path.",
        },
        {
          type: "h3",
          id: "test-after-major-security-events",
          title: "Test after major security events such as:",
        },
        {
          type: "list",
          style: "unordered",
          items: [
            "Confirmed breach",
            "Account compromise",
            "Ransomware incident",
            "Significant data exposure",
            "Major API abuse",
            "Exploited vulnerability",
            "Unauthorized privilege escalation",
            "Cloud compromise",
            "Major credential leak",
          ],
        },
        {
          type: "p",
          text: "The scope should be determined from the incident and risk. Sometimes a focused retest is appropriate. Sometimes the incident justifies a broader assessment.",
        },
      ],
    },

    // ─── Section 6: When to Test More Frequently ────────────────────────────
    {
      id: "when-you-should-test-more-frequently",
      title: "6. When You Should Test More Frequently",
      level: 2,
      blocks: [
        {
          type: "p",
          text: "The 6–12 month rule is a baseline, not a ceiling.",
        },
        {
          type: "p",
          text: "Consider increasing testing frequency if your company:",
        },
        {
          type: "h3",
          id: "releases-frequently",
          title: "Releases frequently",
        },
        {
          type: "p",
          text: "Continuous delivery can create a constantly changing attack surface.",
        },
        {
          type: "h3",
          id: "operates-public-apis",
          title: "Operates public APIs",
        },
        {
          type: "p",
          text: "APIs can expose authentication, authorization, business logic, and sensitive data.",
        },
        {
          type: "h3",
          id: "handles-sensitive-information",
          title: "Handles sensitive information",
        },
        {
          type: "p",
          text: "The consequences of compromise may be significantly higher.",
        },
        {
          type: "h3",
          id: "uses-complex-cloud-infrastructure",
          title: "Uses complex cloud infrastructure",
        },
        {
          type: "p",
          text: "Cloud environments can change quickly through infrastructure-as-code and configuration changes.",
        },
        {
          type: "h3",
          id: "has-multiple-user-roles",
          title: "Has multiple user roles",
        },
        {
          type: "p",
          text: "Complex authorization models create additional security testing requirements.",
        },
        {
          type: "h3",
          id: "integrates-third-party-services",
          title: "Integrates many third-party services",
        },
        {
          type: "p",
          text: "Every integration introduces another trust relationship.",
        },
        {
          type: "h3",
          id: "has-strict-contractual-requirements",
          title: "Has strict contractual or regulatory requirements",
        },
        {
          type: "p",
          text: "Some industries and customers may require specific security testing schedules.",
        },
        {
          type: "p",
          text: "The correct schedule should be based on risk and applicable requirements.",
        },
      ],
    },

    // ─── Section 7: What Should Be Included in a VAPT ───────────────────────
    {
      id: "what-should-be-included-in-a-vapt",
      title: "7. What Should Be Included in a VAPT",
      level: 2,
      blocks: [
        {
          type: "p",
          text: "VAPT should be scoped according to the systems that matter.",
        },
        {
          type: "h3",
          id: "vapt-web-application",
          title: "Web application",
        },
        {
          type: "list",
          style: "unordered",
          items: [
            "Authentication",
            "Authorization",
            "Session management",
            "Input validation",
            "Business logic",
            "File uploads",
            "Access control",
            "Error handling",
            "API security",
          ],
        },
        {
          type: "h3",
          id: "vapt-api",
          title: "API",
        },
        {
          type: "list",
          style: "unordered",
          items: [
            "Authentication",
            "Authorization",
            "Rate limiting",
            "Object-level access control",
            "Input validation",
            "Sensitive data exposure",
            "Business logic",
          ],
        },
        {
          type: "h3",
          id: "vapt-network",
          title: "Network",
        },
        {
          type: "list",
          style: "unordered",
          items: [
            "Internet-facing services",
            "Open ports",
            "Network segmentation",
            "Service configuration",
            "Authentication",
            "Exposed infrastructure",
          ],
        },
        {
          type: "h3",
          id: "vapt-cloud",
          title: "Cloud",
        },
        {
          type: "list",
          style: "unordered",
          items: [
            "Identity and access management",
            "Storage permissions",
            "Network configuration",
            "Public exposure",
            "Secrets",
            "Security groups",
            "Logging and monitoring",
          ],
        },
        {
          type: "h3",
          id: "vapt-mobile",
          title: "Mobile",
        },
        {
          type: "p",
          text: "Where applicable:",
        },
        {
          type: "list",
          style: "unordered",
          items: [
            "Authentication",
            "Local storage",
            "API communication",
            "Certificate validation",
            "Reverse engineering resistance",
            "Authorization",
          ],
        },
        {
          type: "p",
          text: "The scope should be agreed before testing begins.",
        },
      ],
    },

    // ─── Section 8: VAPT vs Vulnerability Scanning ──────────────────────────
    {
      id: "vapt-vs-vulnerability-scanning",
      title: "8. VAPT vs Vulnerability Scanning",
      level: 2,
      blocks: [
        {
          type: "table",
          headers: ["Area", "Vulnerability Assessment", "Penetration Testing"],
          rows: [
            ["Primary goal", "Find vulnerabilities", "Validate exploitability and impact"],
            ["Automation", "High", "Mixed"],
            ["Manual testing", "Limited", "Significant"],
            ["Frequency", "Can be continuous/repeatable", "Usually periodic or trigger-based"],
            ["Scope", "Often broad", "Usually defined and focused"],
            ["Exploitation", "Usually not the primary objective", "Core part of the assessment"],
            ["Business impact", "Usually limited", "Evaluated through exploitation paths"],
          ],
        },
        {
          type: "p",
          text: "CREST explicitly distinguishes the two and notes that vulnerability assessments can be performed continuously or regularly, while penetration testing is typically less frequent and more focused.",
        },
        {
          type: "p",
          text: "A mature security program uses both where appropriate.",
        },
      ],
    },

    // ─── Section 9: The 2026 VAPT Checklist ─────────────────────────────────
    {
      id: "the-2026-vapt-checklist",
      title: "9. The 2026 VAPT Checklist",
      level: 2,
      blocks: [
        {
          type: "h3",
          id: "checklist-before-test",
          title: "Before the Test",
        },
        {
          type: "list",
          style: "unordered",
          items: [
            "Define the objective",
            "Identify assets",
            "Define the scope",
            "Identify production and test environments",
            "Document external IPs and domains",
            "Document APIs",
            "Document applications",
            "Document cloud resources",
            "Identify sensitive data",
            "Identify critical business functions",
            "Identify authentication methods",
            "Provide required test accounts",
            "Review previous findings",
            "Define testing windows",
            "Establish emergency contacts",
            "Confirm authorization for testing",
          ],
        },
        {
          type: "h3",
          id: "checklist-during-test",
          title: "During the Test",
        },
        {
          type: "list",
          style: "unordered",
          items: [
            "Reconnaissance",
            "Attack-surface analysis",
            "Vulnerability discovery",
            "Authentication testing",
            "Authorization testing",
            "Session testing",
            "Input validation testing",
            "Business-logic testing",
            "API testing",
            "File-upload testing",
            "Configuration testing",
            "Encryption/TLS review where in scope",
            "Cloud security testing where in scope",
            "Network security testing where in scope",
            "Exploitation validation",
            "Evidence collection",
            "Business-impact analysis",
          ],
        },
        {
          type: "p",
          text: "OWASP's Web Security Testing Guide structures application security testing across requirements, design, implementation, deployment, and maintenance, and recommends change verification after production changes.",
        },
        {
          type: "h3",
          id: "checklist-after-test",
          title: "After the Test",
        },
        {
          type: "list",
          style: "unordered",
          items: [
            "Receive technical report",
            "Receive executive summary",
            "Review severity",
            "Prioritize findings",
            "Assign owners",
            "Set remediation deadlines",
            "Fix critical findings first",
            "Retest important fixes",
            "Document accepted risks",
            "Update security controls",
            "Update security documentation",
            "Record lessons learned",
            "Schedule the next assessment",
          ],
        },
      ],
    },

    // ─── Section 10: What to Do After the VAPT ──────────────────────────────
    {
      id: "what-to-do-after-the-vapt",
      title: "10. What to Do After the VAPT",
      level: 2,
      blocks: [
        {
          type: "p",
          text: "A VAPT report is not the end of the process. It is the beginning of remediation.",
        },
        {
          type: "p",
          text: "A useful workflow is:",
        },
        {
          type: "diagram",
          content: "VAPT\n ↓\nFindings\n ↓\nRisk prioritization\n ↓\nFix\n ↓\nRetest\n ↓\nVerify\n ↓\nDocument\n ↓\nMonitor",
        },
        {
          type: "h3",
          id: "prioritize-based-on-risk",
          title: "Prioritize based on risk",
        },
        {
          type: "p",
          text: "Consider:",
        },
        {
          type: "list",
          style: "unordered",
          items: [
            "Exploitability",
            "Business impact",
            "Data sensitivity",
            "Exposure",
            "Existing controls",
            "Availability of compensating controls",
          ],
        },
        {
          type: "h3",
          id: "retesting-matters",
          title: "Retesting matters",
        },
        {
          type: "p",
          text: "If a critical vulnerability was fixed, verify the fix. Otherwise, the organization is relying on a developer's statement that the vulnerability is gone rather than evidence that the attack path was closed.",
        },
      ],
    },

    // ─── Section 11: Common VAPT Mistakes ───────────────────────────────────
    {
      id: "common-vapt-mistakes",
      title: "11. Common VAPT Mistakes",
      level: 2,
      blocks: [
        {
          type: "h3",
          id: "mistake-1-doing-vapt-only-once",
          title: "Mistake 1: Doing VAPT only once",
        },
        {
          type: "p",
          text: "A penetration test is not a permanent security certificate.",
        },
        {
          type: "h3",
          id: "mistake-2-testing-only-before-launch",
          title: "Mistake 2: Testing only before launch",
        },
        {
          type: "p",
          text: "Production systems change. Security testing needs to continue after deployment.",
        },
        {
          type: "h3",
          id: "mistake-3-ignoring-new-features",
          title: "Mistake 3: Ignoring new features",
        },
        {
          type: "p",
          text: "A new API or authentication system can materially change the attack surface.",
        },
        {
          type: "h3",
          id: "mistake-4-treating-scan-as-pentest",
          title: "Mistake 4: Treating a vulnerability scan as a penetration test",
        },
        {
          type: "p",
          text: "Automated scanning and human-led exploitation provide different levels of assurance.",
        },
        {
          type: "h3",
          id: "mistake-5-fixing-without-retesting",
          title: "Mistake 5: Fixing findings without retesting",
        },
        {
          type: "p",
          text: "A fix should be verified.",
        },
        {
          type: "h3",
          id: "mistake-6-ignoring-business-logic",
          title: "Mistake 6: Ignoring business logic",
        },
        {
          type: "p",
          text: "Not every vulnerability is a technical configuration issue. Attackers may abuse legitimate functionality in unintended ways.",
        },
        {
          type: "h3",
          id: "mistake-7-testing-without-scope",
          title: "Mistake 7: Testing without proper scope",
        },
        {
          type: "p",
          text: "Security testing needs authorization and clearly defined boundaries.",
        },
        {
          type: "h3",
          id: "mistake-8-forgetting-cloud-and-apis",
          title: "Mistake 8: Forgetting cloud and APIs",
        },
        {
          type: "p",
          text: "Modern applications are rarely limited to a single web server.",
        },
      ],
    },

    // ─── Section 12: A Practical VAPT Schedule ──────────────────────────────
    {
      id: "a-practical-vapt-schedule",
      title: "12. A Practical VAPT Schedule",
      level: 2,
      blocks: [
        {
          type: "table",
          headers: ["Situation", "Recommended action"],
          rows: [
            ["Normal operations", "Continuous/regular vulnerability management"],
            ["Small low-risk change", "Standard security checks"],
            ["Major new feature", "Focused security review/testing"],
            ["New public API", "Security testing before or around release"],
            ["New authentication/authorization system", "Focused security assessment"],
            ["Major architecture change", "Broader security assessment"],
            ["Every 6–12 months", "Scheduled VAPT based on risk"],
            ["Security incident", "Immediate investigation + appropriate VAPT/retest"],
            ["Critical vulnerability discovered", "Validate exposure and remediation"],
            ["Regulatory requirement", "Follow the applicable requirement"],
          ],
        },
        {
          type: "p",
          text: "The important point is that **time alone should not determine your testing schedule**.",
        },
        {
          type: "p",
          text: "Use both:",
        },
        {
          type: "diagram",
          content: "Calendar-based testing\n        +\nChange-based testing\n        +\nIncident-based testing",
        },
        {
          type: "p",
          text: "That gives your security program multiple ways to catch changes in risk.",
        },
      ],
    },

    // ─── Section 13: FAQ ────────────────────────────────────────────────────
    {
      id: "frequently-asked-questions",
      title: "13. Frequently Asked Questions",
      level: 2,
      blocks: [
        {
          type: "faq",
          items: [
            {
              question: "How often should VAPT be done?",
              answer:
                "A practical baseline is after major security-relevant changes, every 6–12 months based on risk, and after a security incident. Higher-risk environments may require more frequent testing.",
            },
            {
              question: "Is annual VAPT enough?",
              answer:
                "It can be an appropriate baseline for some organizations, but it is not automatically enough. Major changes and incidents should trigger additional security assessment. OWASP currently recommends at least annual penetration testing depending on the assurance required for the application.",
            },
            {
              question: "Should I do VAPT after every website update?",
              answer:
                "Not necessarily. A small content or styling update usually does not justify a full penetration test. A new API, payment system, authentication mechanism, admin function, or major architecture change can justify focused security testing.",
            },
            {
              question: "Is vulnerability scanning the same as VAPT?",
              answer:
                "No. Vulnerability assessment generally identifies known weaknesses, while penetration testing combines automated and manual techniques to validate exploitability and impact.",
            },
            {
              question: "Should VAPT be performed on a production website?",
              answer:
                "The decision depends on scope, authorization, testing methodology, and operational risk. Testing should be planned carefully to avoid unnecessary disruption.",
            },
            {
              question: "What happens after VAPT?",
              answer:
                "Findings should be prioritized, assigned, remediated, and retested where appropriate. The next testing cycle should also be scheduled.",
            },
            {
              question: "Can VAPT guarantee that a company is secure?",
              answer:
                "No. A penetration test provides assurance about the defined scope and testing performed at a particular point in time. It cannot prove that every possible vulnerability or future attack has been eliminated.",
            },
          ],
        },
      ],
    },

    // ─── Section 14: Conclusion ─────────────────────────────────────────────
    {
      id: "conclusion",
      title: "14. Conclusion",
      level: 2,
      blocks: [
        {
          type: "p",
          text: "VAPT should not be treated as an annual checkbox.",
        },
        {
          type: "p",
          text: "A modern security program needs to react to how the technology actually changes.",
        },
        {
          type: "p",
          text: "The practical rule is:",
        },
        {
          type: "quote",
          text: "After major new features or security-relevant changes. Every 6–12 months based on risk. After any security incident.",
        },
        {
          type: "p",
          text: "Then support that schedule with continuous vulnerability management, secure development practices, monitoring, patching, and change verification.",
        },
        {
          type: "p",
          text: "OWASP's current application-security guidance recommends integrating security activities throughout the software development lifecycle and maintaining recurring security testing, including at least annual penetration testing depending on assurance requirements.",
        },
        {
          type: "p",
          text: "For a company building websites, APIs, cloud systems, and applications, the question should not be:",
        },
        {
          type: "quote",
          text: "Did we do a VAPT this year?",
        },
        {
          type: "p",
          text: "It should be:",
        },
        {
          type: "quote",
          text: "Has our security testing kept pace with what changed in our environment?",
        },
        {
          type: "p",
          text: "That is the more useful question.",
        },
      ],
    },

    // ─── Relevant NebulaSafeTech Services ───────────────────────────────────
    {
      id: "relevant-nebulasafetech-services",
      title: "Relevant NebulaSafeTech Services",
      level: 2,
      blocks: [
        {
          type: "p",
          text: "NebulaSafeTech provides security services across:",
        },
        {
          type: "list",
          style: "unordered",
          items: [
            "Web Security",
            "Application Security",
            "Cloud Security",
            "Network Security",
            "Encryption & Data Protection",
            "Full-Stack Web Development",
            "Web Design & UI/UX Design",
            "Academic Training",
          ],
        },
        {
          type: "p",
          text: "VAPT can be especially relevant when your organization operates public-facing web applications, APIs, cloud infrastructure, internal networks, or systems handling sensitive information.",
        },
      ],
    },

    // ─── Sources and Further Reading ────────────────────────────────────────
    {
      id: "sources-and-further-reading",
      title: "Sources and Further Reading",
      level: 2,
      blocks: [
        {
          type: "sources",
          title: "Sources and Further Reading",
          items: [
            {
              id: 1,
              text: "OWASP Web Security Testing Guide",
              url: "https://owasp.org/www-project-web-security-testing-guide/",
            },
            {
              id: 2,
              text: "OWASP Top 10:2025 - Establishing a Modern Application Security Program",
              url: "https://owasp.org/www-project-top-ten/",
            },
            {
              id: 3,
              text: "OWASP Attack Surface Analysis Cheat Sheet",
              url: "https://cheatsheetseries.owasp.org/cheatsheets/Attack_Surface_Analysis_Cheat_Sheet.html",
            },
            {
              id: 4,
              text: "OWASP Secure Code Review Cheat Sheet",
              url: "https://cheatsheetseries.owasp.org/cheatsheets/Code_Review_Introduction.html",
            },
            {
              id: 5,
              text: "OWASP Application Security Verification Standard (ASVS)",
              url: "https://owasp.org/www-project-application-security-verification-standard/",
            },
            {
              id: 6,
              text: "CREST - A Cyber Buyer's Guide to Vulnerability Assessment and Penetration Testing",
              url: "https://www.crest-approved.org/",
            },
          ],
        },
      ],
    },
  ],
};
