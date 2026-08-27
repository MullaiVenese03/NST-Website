import type { BlogPost } from "../blogsData";

export const blogPostShadowAiAgents: BlogPost = {
  id: "4",
  slug: "shadow-ai-agents-enterprise-security-risk",
  title: "Shadow AI Agents: The Enterprise Security Risk You Can't See",
  seoTitle: "Shadow AI Agents: Enterprise Security Risks in 2026",
  metaDescription:
    "Shadow AI agents can access enterprise data, APIs, and SaaS tools without complete security oversight. Learn the risks and how to govern AI agent access.",
  excerpt:
    "AI agents are entering enterprise environments faster than security teams can discover and govern them. Shadow AI agents may connect to enterprise data, SaaS apps, and APIs without complete visibility into who created them, what permissions they hold, or what actions they can take.",
  category: "Cybersecurity",
  primaryKeyword: "shadow AI agents",
  secondaryKeywords: [
    "AI agent security",
    "unknown AI agents",
    "enterprise AI security",
    "shadow AI risk",
    "AI agent governance",
    "AI agent data access",
    "agentic AI security",
  ],
  date: "August 27, 2026",
  publishedIsoDate: "2026-08-27T00:00:00Z",
  readTime: "14 min read",
  featuredImage: {
    src: "/media/blogs/shadow-ai-agents-enterprise-security-risk.jpg",
    webpSrc: "/media/blogs/shadow-ai-agents-enterprise-security-risk.webp",
    alt: "Shadow AI agents operating outside enterprise security visibility — governance and risk overview",
    width: 1536,
    height: 1024,
  },
  author: {
    name: "Rajiv Sharma",
    role: "Cybersecurity Engineer & Founder",
    avatar: "/media/authors/rajiv-sharma.webp",
    bio: "Rajiv Sharma is a cybersecurity engineer and founder at NebulaSafeTech, focusing on defensive security, zero-trust architectures, and data-layer protection for enterprise environments.",
    profileUrl: "https://www.linkedin.com/in/rajiv-sharma-nebula/",
  },
  faqs: [
    {
      question: "What is a shadow AI agent?",
      answer:
        "A shadow AI agent is an AI-powered agent or autonomous workflow operating without complete organizational visibility, inventory, approval, or governance. It may exist inside an otherwise approved platform.",
    },
    {
      question: "Is shadow AI the same as shadow IT?",
      answer:
        "No. Shadow AI overlaps with shadow IT but is more complex because AI agents can be embedded inside approved applications and can have changing identities, permissions, connectors, and autonomy levels.",
    },
    {
      question: "Why are shadow AI agents a security risk?",
      answer:
        "Security teams may not know what data the agent can access, which identity it uses, what tools it can call, or what actions it can perform. This makes risk assessment, access control, monitoring, and incident response more difficult.",
    },
    {
      question: "Can an approved AI application still create shadow AI risk?",
      answer:
        "Yes. The application may be approved while a specific agent, workflow, connector, permission configuration, or data-access pattern remains outside complete security visibility.",
    },
    {
      question: "How can organizations reduce shadow AI risk?",
      answer:
        "Start with discovery and inventory, assign ownership, identify agent identities, map permissions, apply least privilege, control connectors, monitor activity, and establish decommissioning procedures.",
    },
    {
      question: "Does NEX solve all shadow AI security risks?",
      answer:
        "No. NEX should be positioned as one layer in a broader security architecture, particularly around controlled access to sensitive data. AI discovery, governance, identity security, monitoring, and incident response require additional controls and processes.",
    },
  ],
  cta: {
    statement: "AI Agents Should Not Have Unchecked Access to Sensitive Data",
    description:
      "As AI agents become more autonomous, enterprises need security controls that enforce clear boundaries around identities, permissions, tools, and sensitive data.",
    primaryActionText: "Explore NEX",
    primaryActionUrl: "/services/cybersecurity",
    secondaryActionText: "Talk to NebulaSafeTech",
    secondaryActionUrl: "/about",
  },
  sections: [
    {
      id: "introduction",
      title: "Introduction",
      level: 2,
      blocks: [
        {
          type: "p",
          text: "AI agents are entering enterprise environments faster than many security teams can discover, classify, and govern them. The problem is not simply that employees use AI. The larger risk is that autonomous agents may connect to enterprise data, SaaS applications, APIs, and workflows without complete visibility into who created them, what permissions they hold, or what actions they can perform.",
        },
        {
          type: "p",
          text: "These are **shadow AI agents**: AI agents or autonomous workflows operating outside complete organizational visibility or governance. A 2026 Cloud Security Alliance survey found that 82% of surveyed organizations had discovered at least one previously unknown AI agent or workflow, while 65% reported an AI agent-related security incident in the previous year.",
        },
        {
          type: "p",
          text: "If your organization cannot answer **which AI agents exist, what identity each one uses, what data each one can access, and what actions each one can perform**, it has an AI governance problem.",
        },
        {
          type: "p",
          text: "This guide explains what shadow AI agents are, why they create a new enterprise security challenge, how they expand the attack surface, and what organizations can do to regain control.",
        },
      ],
    },
    {
      id: "what-are-shadow-ai-agents",
      title: "What Are Shadow AI Agents?",
      level: 2,
      blocks: [
        {
          type: "p",
          text: "A shadow AI agent is an AI-powered agent, automation, or autonomous workflow that operates without complete visibility, approval, inventory, or governance from the organization's responsible security or IT functions.",
        },
        {
          type: "p",
          text: "The important point is that **shadow AI does not always mean an obviously unauthorized application**.",
        },
        {
          type: "p",
          text: "A company may approve an AI platform, but employees can still create:",
        },
        {
          type: "list",
          style: "unordered",
          items: [
            "Custom AI agents",
            "Autonomous workflows",
            "Personal AI assistants connected to work systems",
            "New connectors to SaaS applications",
            "API integrations",
            "AI-powered browser extensions",
            "Department-specific copilots",
            "Agents built using low-code or no-code platforms",
          ],
        },
        {
          type: "p",
          text: "The application may be known. The **agent, configuration, connector, identity, or permission scope may not be**.",
        },
        {
          type: "p",
          text: "That distinction matters because enterprise risk increasingly exists at the level of the individual AI interaction and access path, not simply at the level of an approved application.",
        },
        {
          type: "h3",
          id: "shadow-ai-agent-example",
          title: "Shadow AI Agent Example",
        },
        {
          type: "p",
          text: "Consider an employee using an approved AI platform. The platform itself is sanctioned. The employee then creates an agent that can read documents from a shared repository, search project-management records, query customer information, call an external API, and automatically summarize and send results.",
        },
        {
          type: "image",
          src: "/media/blogs/shadow-ai-agents-enterprise-security-risk/shadow-ai-agent-example.jpg",
          webpSrc:
            "/media/blogs/shadow-ai-agents-enterprise-security-risk/shadow-ai-agent-example-1280.webp 1280w, /media/blogs/shadow-ai-agents-enterprise-security-risk/shadow-ai-agent-example-960.webp 960w, /media/blogs/shadow-ai-agents-enterprise-security-risk/shadow-ai-agent-example-640.webp 640w",
          avifSrc:
            "/media/blogs/shadow-ai-agents-enterprise-security-risk/shadow-ai-agent-example-1280.avif 1280w, /media/blogs/shadow-ai-agents-enterprise-security-risk/shadow-ai-agent-example-960.avif 960w, /media/blogs/shadow-ai-agents-enterprise-security-risk/shadow-ai-agent-example-640.avif 640w",
          alt: "Shadow AI agent example showing an approved platform user creating an agent with access to documents, CRM, and external APIs without security oversight",
          width: 1774,
          height: 887,
          loading: "lazy",
        },
        {
          type: "p",
          text: "The organization may know the AI platform exists. But does it know this specific agent exists? Who owns it? Which identity it uses? Which repositories it can access? Which API permissions it has? Whether its permissions are still necessary? Where its outputs can be sent? If the answer is no, the organization has a visibility gap.",
        },
      ],
    },
    {
      id: "why-enterprises-are-losing-visibility",
      title: "Why Enterprises Are Losing Visibility Into AI Agents",
      level: 2,
      blocks: [
        {
          type: "p",
          text: "Traditional enterprise software usually follows a relatively familiar pattern:",
        },
        {
          type: "quote",
          text: "Application → Approval → User Access → Security Monitoring",
        },
        {
          type: "p",
          text: "AI agents complicate this model. An agent can be created inside an existing SaaS platform, connected to multiple tools, given delegated permissions, modified after deployment, and allowed to perform multi-step actions.",
        },
        {
          type: "p",
          text: "The result is a growing number of possible combinations. Each layer can change independently. A team may create a new agent without notifying security. An existing agent may receive a new connector. A connector may gain access to another data source. An employee may leave while an agent or automation remains active. This creates what can be described as **agent sprawl**.",
        },
        {
          type: "p",
          text: "Gartner has specifically identified centralized agent inventory and governance as necessary responses to AI agent sprawl. It also warns that simply blocking AI use is not a sustainable strategy because excessive restrictions can push employees toward less visible shadow AI alternatives.",
        },
        {
          type: "h3",
          id: "the-visibility-problem",
          title: "The Visibility Problem",
        },
        {
          type: "p",
          text: "The core problem can be simplified into four questions: Do we know the agent? Do we know its identity? Do we know what it can access? Do we know what it can do? If any answer is unknown, security teams cannot confidently assess the associated risk.",
        },
        {
          type: "image",
          src: "/media/blogs/shadow-ai-agents-enterprise-security-risk/shadow-ai-visibility-problem.jpg",
          webpSrc:
            "/media/blogs/shadow-ai-agents-enterprise-security-risk/shadow-ai-visibility-problem-1280.webp 1280w, /media/blogs/shadow-ai-agents-enterprise-security-risk/shadow-ai-visibility-problem-960.webp 960w, /media/blogs/shadow-ai-agents-enterprise-security-risk/shadow-ai-visibility-problem-640.webp 640w",
          avifSrc:
            "/media/blogs/shadow-ai-agents-enterprise-security-risk/shadow-ai-visibility-problem-1280.avif 1280w, /media/blogs/shadow-ai-agents-enterprise-security-risk/shadow-ai-visibility-problem-960.avif 960w, /media/blogs/shadow-ai-agents-enterprise-security-risk/shadow-ai-visibility-problem-640.avif 640w",
          alt: "The four-question visibility problem for shadow AI agents: knowing the agent, its identity, what it can access, and what it can do",
          width: 1983,
          height: 793,
          loading: "lazy",
        },
      ],
    },
    {
      id: "what-can-an-unknown-ai-agent-access",
      title: "What Can an Unknown AI Agent Actually Access?",
      level: 2,
      blocks: [
        {
          type: "p",
          text: "The answer depends entirely on the permissions and integrations granted to the agent. A capable AI agent may potentially interact with document repositories, shared drives, knowledge bases, project-management systems, customer relationship management platforms, email systems, databases, internal APIs, cloud services, source code repositories, and external web services.",
        },
        {
          type: "p",
          text: "The model itself does not automatically have access to these resources. **Access comes from the surrounding system.** This is a critical security distinction. The risk increases when an AI agent is connected to tools and granted authority to act.",
        },
        {
          type: "image",
          src: "/media/blogs/shadow-ai-agents-enterprise-security-risk/shadow-ai-agent-access.jpg",
          webpSrc:
            "/media/blogs/shadow-ai-agents-enterprise-security-risk/shadow-ai-agent-access-1280.webp 1280w, /media/blogs/shadow-ai-agents-enterprise-security-risk/shadow-ai-agent-access-960.webp 960w, /media/blogs/shadow-ai-agents-enterprise-security-risk/shadow-ai-agent-access-640.webp 640w",
          avifSrc:
            "/media/blogs/shadow-ai-agents-enterprise-security-risk/shadow-ai-agent-access-1280.avif 1280w, /media/blogs/shadow-ai-agents-enterprise-security-risk/shadow-ai-agent-access-960.avif 960w, /media/blogs/shadow-ai-agents-enterprise-security-risk/shadow-ai-agent-access-640.avif 640w",
          alt: "What an unknown AI agent can access: document repositories, CRM, email, databases, APIs, and external services through broad inherited permissions",
          width: 1983,
          height: 793,
          loading: "lazy",
        },
        {
          type: "p",
          text: "OWASP's AI security guidance identifies risks including prompt injection, sensitive information disclosure, excessive agency, supply-chain vulnerabilities, and other weaknesses that become important when AI systems interact with external tools, data, and applications.",
        },
        {
          type: "quote",
          label: "The right security question:",
          text: "Not 'Is this AI model safe?' but 'What can this specific AI system access and what is it authorized to do?'",
        },
      ],
    },
    {
      id: "the-5-biggest-shadow-ai-agent-risks",
      title: "The 5 Biggest Shadow AI Agent Risks",
      level: 2,
      blocks: [
        {
          type: "image",
          src: "/media/blogs/shadow-ai-agents-enterprise-security-risk/shadow-ai-five-risks.jpg",
          webpSrc:
            "/media/blogs/shadow-ai-agents-enterprise-security-risk/shadow-ai-five-risks-1280.webp 1280w, /media/blogs/shadow-ai-agents-enterprise-security-risk/shadow-ai-five-risks-960.webp 960w, /media/blogs/shadow-ai-agents-enterprise-security-risk/shadow-ai-five-risks-640.webp 640w",
          avifSrc:
            "/media/blogs/shadow-ai-agents-enterprise-security-risk/shadow-ai-five-risks-1280.avif 1280w, /media/blogs/shadow-ai-agents-enterprise-security-risk/shadow-ai-five-risks-960.avif 960w, /media/blogs/shadow-ai-agents-enterprise-security-risk/shadow-ai-five-risks-640.avif 640w",
          alt: "The five biggest shadow AI agent security risks: excessive data access, unknown identity, uncontrolled SaaS connections, prompt injection, and no audit trail",
          width: 1981,
          height: 793,
          loading: "lazy",
        },
        {
          type: "h3",
          id: "risk-1-excessive-data-access",
          title: "1. Excessive Data Access",
        },
        {
          type: "p",
          text: "An AI agent may inherit access from a user, service account, API token, or connected application. If that identity has access to thousands of files, the agent may potentially operate across that same scope unless additional controls restrict it.",
        },
        {
          type: "p",
          text: "The problem is not AI alone. The problem is **AI capabilities combined with excessive permissions**. An agent designed to summarize project documents may not need access to HR records, financial reports, legal documents, customer databases, source code, or executive communications. Yet broad inherited permissions can create exactly that situation.",
        },
        {
          type: "p",
          text: "The principle of least privilege must apply to AI agents as well as human users.",
        },
        {
          type: "h3",
          id: "risk-2-unknown-identity-and-ownership",
          title: "2. Unknown Identity and Ownership",
        },
        {
          type: "p",
          text: "Every important enterprise identity should have accountability. Security teams should be able to determine: Who owns the agent? Who approved it? Which identity does it use? Is the identity human, service-based, or delegated? What happens when the owner leaves? Can the agent's access be revoked quickly?",
        },
        {
          type: "p",
          text: "Without clear ownership, an AI agent can become an unmanaged access path. This is particularly important during decommissioning. An agent may stop being actively used while its credentials, integrations, or permissions remain active.",
        },
        {
          type: "quote",
          text: "Inactive does not necessarily mean decommissioned.",
        },
        {
          type: "h3",
          id: "risk-3-uncontrolled-saas-and-api-connections",
          title: "3. Uncontrolled SaaS and API Connections",
        },
        {
          type: "p",
          text: "Modern AI agents are valuable because they can connect to other systems. That same capability expands the attack surface. An agent may connect to a knowledge base, file storage, CRM, email, database, internal API, and external service simultaneously. Each connection creates questions about authentication, authorization, token storage, permission scope, data transfer, logging, revocation, and third-party risk.",
        },
        {
          type: "p",
          text: "An organization may approve an AI tool without understanding every connector that individual teams have enabled. That is why application allowlists alone are no longer sufficient for AI governance.",
        },
        {
          type: "h3",
          id: "risk-4-prompt-injection",
          title: "4. Prompt Injection and Malicious Instructions",
        },
        {
          type: "p",
          text: "AI agents can process information from users, documents, web pages, emails, knowledge bases, and other external or semi-trusted sources. Prompt injection occurs when untrusted content influences an AI system to behave in unintended ways. This becomes more serious when the AI system can call tools or access sensitive information.",
        },
        {
          type: "p",
          text: "A malicious instruction may attempt to influence an agent to ignore its intended instructions, retrieve unnecessary information, call an unintended tool, reveal sensitive content, or send information to an unauthorized destination. Security controls should not assume that the AI model itself will always correctly distinguish trusted instructions from untrusted data.",
        },
        {
          type: "p",
          text: "OWASP continues to identify prompt injection as a major risk for LLM-based systems and also highlights excessive agency as a separate concern when AI systems are granted the ability to call functions or perform actions.",
        },
        {
          type: "h3",
          id: "risk-5-no-audit-trail",
          title: "5. No Clear Audit Trail",
        },
        {
          type: "p",
          text: "Security teams need to reconstruct what happened after an incident. For AI agents, that can require understanding: Which user initiated the workflow? Which agent executed it? Which identity was used? Which tools were called? What resources were accessed? What actions were performed? Where was data sent? When did the activity occur?",
        },
        {
          type: "p",
          text: "Without correlated logging, investigation becomes significantly harder. A simple log saying 'API request successful' may not be enough. Organizations may need to correlate the human user, AI agent, agent session, identity, tool call, resource access, and action together. This is necessary for accountability and incident response.",
        },
      ],
    },
    {
      id: "shadow-ai-vs-shadow-it",
      title: "Shadow AI Is Not the Same as Shadow IT",
      level: 2,
      blocks: [
        {
          type: "p",
          text: "Shadow IT traditionally refers to technology used without formal IT approval or management. Shadow AI overlaps with this problem but introduces additional complexity. A shadow AI agent may be built inside an approved application, created by an authorized employee, connected using legitimate credentials, and performing a legitimate business task — yet it may still operate outside complete governance.",
        },
        {
          type: "p",
          text: "That means an organization cannot solve shadow AI simply by maintaining a list of approved applications. It also needs visibility into agents, workflows, connectors, identities, permission scopes, data sources, actions, and ownership.",
        },
        {
          type: "quote",
          label: "The critical shift:",
          text: "Instead of asking only 'Is this application approved?' organizations increasingly need to ask 'What is this agent doing inside the approved application?'",
        },
      ],
    },
    {
      id: "how-shadow-ai-creates-larger-blast-radius",
      title: "How Shadow AI Agents Create a Larger Blast Radius",
      level: 2,
      blocks: [
        {
          type: "p",
          text: "A security incident involving an AI agent does not have to expose the entire organization. The amount of potential damage depends heavily on the agent's access scope.",
        },
        {
          type: "image",
          src: "/media/blogs/shadow-ai-agents-enterprise-security-risk/shadow-ai-blast-radius.jpg",
          webpSrc:
            "/media/blogs/shadow-ai-agents-enterprise-security-risk/shadow-ai-blast-radius-1280.webp 1280w, /media/blogs/shadow-ai-agents-enterprise-security-risk/shadow-ai-blast-radius-960.webp 960w, /media/blogs/shadow-ai-agents-enterprise-security-risk/shadow-ai-blast-radius-640.webp 640w",
          avifSrc:
            "/media/blogs/shadow-ai-agents-enterprise-security-risk/shadow-ai-blast-radius-1280.avif 1280w, /media/blogs/shadow-ai-agents-enterprise-security-risk/shadow-ai-blast-radius-960.avif 960w, /media/blogs/shadow-ai-agents-enterprise-security-risk/shadow-ai-blast-radius-640.avif 640w",
          alt: "Comparison of large vs limited blast radius from a compromised shadow AI agent: broad permissions versus explicitly scoped project data access",
          width: 1774,
          height: 887,
          loading: "lazy",
        },
        {
          type: "p",
          text: "A single compromised or manipulated agent with broad permissions may affect customer data, financial records, HR files, legal documents, source code, internal knowledge bases, and multiple SaaS systems simultaneously.",
        },
        {
          type: "p",
          text: "By contrast, a properly scoped agent with access only to explicitly defined project data is not risk-free — it is simply more containable. This is why **blast radius reduction** should be a major design principle for AI agent security.",
        },
        {
          type: "callout",
          variant: "info",
          title: "Design principle:",
          text: "Do not assume every agent needs enterprise-wide access. Start with the smallest necessary scope. Expand access only when there is a documented business requirement.",
        },
      ],
    },
    {
      id: "7-questions-security-teams-should-ask",
      title: "7 Questions Every Security Team Should Ask",
      level: 2,
      blocks: [
        {
          type: "p",
          text: "Every organization deploying AI agents should be able to answer these questions.",
        },
        {
          type: "h3",
          id: "question-1-complete-inventory",
          title: "1. Do we have a complete inventory of our AI agents?",
        },
        {
          type: "p",
          text: "Include custom agents, embedded agents, autonomous workflows, department-specific agents, no-code and low-code agents, and third-party agents.",
        },
        {
          type: "h3",
          id: "question-2-ownership",
          title: "2. Who owns each agent?",
        },
        {
          type: "p",
          text: "Every production agent should have a responsible owner.",
        },
        {
          type: "h3",
          id: "question-3-identity",
          title: "3. What identity does each agent use?",
        },
        {
          type: "p",
          text: "Identify whether it operates through user delegation, service identity, API token, OAuth authorization, or application credentials.",
        },
        {
          type: "h3",
          id: "question-4-data-access",
          title: "4. What data can it access?",
        },
        {
          type: "p",
          text: "Do not accept broad answers such as 'It can access company documents.' Identify the actual repositories and scope.",
        },
        {
          type: "h3",
          id: "question-5-actions",
          title: "5. What actions can it perform?",
        },
        {
          type: "p",
          text: "Can the agent read, write, delete, send, execute, create records, or call external APIs?",
        },
        {
          type: "h3",
          id: "question-6-external-systems",
          title: "6. Which external systems can it connect to?",
        },
        {
          type: "p",
          text: "Every connector can introduce another trust boundary.",
        },
        {
          type: "h3",
          id: "question-7-revocation",
          title: "7. How quickly can access be revoked?",
        },
        {
          type: "p",
          text: "If an agent behaves unexpectedly, the organization should know how to disable the agent, revoke credentials, remove tool access, block external connections, and preserve relevant logs. If these questions cannot be answered quickly, governance is incomplete.",
        },
      ],
    },
    {
      id: "how-to-discover-and-govern-ai-agents",
      title: "How to Discover and Govern AI Agents",
      level: 2,
      blocks: [
        {
          type: "p",
          text: "The objective should not be to eliminate AI adoption. The objective should be to make AI use **visible, accountable, and appropriately controlled**.",
        },
        {
          type: "image",
          src: "/media/blogs/shadow-ai-agents-enterprise-security-risk/shadow-ai-discover-govern.jpg",
          webpSrc:
            "/media/blogs/shadow-ai-agents-enterprise-security-risk/shadow-ai-discover-govern-1280.webp 1280w, /media/blogs/shadow-ai-agents-enterprise-security-risk/shadow-ai-discover-govern-960.webp 960w, /media/blogs/shadow-ai-agents-enterprise-security-risk/shadow-ai-discover-govern-640.webp 640w",
          avifSrc:
            "/media/blogs/shadow-ai-agents-enterprise-security-risk/shadow-ai-discover-govern-1280.avif 1280w, /media/blogs/shadow-ai-agents-enterprise-security-risk/shadow-ai-discover-govern-960.avif 960w, /media/blogs/shadow-ai-agents-enterprise-security-risk/shadow-ai-discover-govern-640.avif 640w",
          alt: "7-step process for discovering and governing AI agents: inventory, ownership, classification, least privilege, connector control, monitoring, and decommissioning",
          width: 1875,
          height: 839,
          loading: "lazy",
        },
        {
          type: "h3",
          id: "step-1-build-agent-inventory",
          title: "Step 1: Build an Agent Inventory",
        },
        {
          type: "p",
          text: "Start by discovering known AI platforms, agents built inside those platforms, connected applications, automation workflows, service identities, and API credentials. The inventory should be continuously maintained. A spreadsheet created once is not enough.",
        },
        {
          type: "h3",
          id: "step-2-assign-ownership",
          title: "Step 2: Assign Ownership",
        },
        {
          type: "p",
          text: "Every agent should have a business owner, technical owner, purpose, data classification, access scope, and approval status. No owner should mean no production deployment.",
        },
        {
          type: "h3",
          id: "step-3-classify-by-autonomy",
          title: "Step 3: Classify Agents by Autonomy and Access",
        },
        {
          type: "p",
          text: "Not every AI agent presents the same risk. A read-only document summarizer is different from an autonomous agent that can modify records across multiple systems. Gartner recommends proportional governance based on an agent's autonomy and access scope rather than applying identical controls to every agent.",
        },
        {
          type: "h3",
          id: "step-4-apply-least-privilege",
          title: "Step 4: Apply Least Privilege",
        },
        {
          type: "p",
          text: "Give the agent only the permissions necessary for its intended function. Do not automatically grant access based on the permissions of its creator, the permissions of an entire department, convenience, or future requirements that do not yet exist. Reduce access scope first. Expand it deliberately.",
        },
        {
          type: "h3",
          id: "step-5-control-connectors",
          title: "Step 5: Control Connectors and Tool Access",
        },
        {
          type: "p",
          text: "Maintain visibility into which tools an agent can call. For each connector, define the approved purpose, allowed data scope, allowed actions, authentication method, permission scope, and revocation method. Tool access should be treated as a security boundary.",
        },
        {
          type: "h3",
          id: "step-6-monitor-and-log",
          title: "Step 6: Monitor and Log Agent Activity",
        },
        {
          type: "p",
          text: "Organizations need meaningful visibility into agent behavior. Logs should support investigation of the user, agent, identity, tool, resource, action, timestamp, and result. This helps security teams understand both normal operations and suspicious activity.",
        },
        {
          type: "h3",
          id: "step-7-decommissioning",
          title: "Step 7: Establish a Decommissioning Process",
        },
        {
          type: "p",
          text: "When an agent is no longer needed: disable it, revoke associated credentials, remove unnecessary connectors, review remaining permissions, preserve required logs, and update the inventory. Do not assume an unused agent is harmless. CSA's 2026 research highlighted formal decommissioning as a governance gap among surveyed organizations.",
        },
      ],
    },
    {
      id: "where-traditional-security-controls-fall-short",
      title: "Where Traditional Security Controls Fall Short",
      level: 2,
      blocks: [
        {
          type: "p",
          text: "Traditional controls remain important. Identity security, MFA, endpoint protection, network segmentation, and logging do not suddenly become irrelevant because AI agents exist. The problem is that organizations may not know **where to apply those controls** if they do not know an agent exists.",
        },
        {
          type: "p",
          text: "You cannot govern an unknown agent with an unknown identity and unknown access. The first security problem is often discovery. The second is authorization. The third is containment.",
        },
        {
          type: "p",
          text: "This means effective AI security requires visibility across the entire chain: discover, inventory, identify owner, map identity, map access, limit permissions, monitor activity, and revoke when necessary.",
        },
      ],
    },
    {
      id: "where-nex-fits",
      title: "Where NEX Fits in Controlling Sensitive Data Access",
      level: 2,
      blocks: [
        {
          type: "p",
          text: "NEX should not be positioned as a complete solution for shadow AI discovery or AI governance. That would be an overclaim. A complete enterprise AI security strategy requires multiple layers, including AI agent discovery, identity and access management, governance, application security, monitoring, incident response, and data security.",
        },
        {
          type: "p",
          text: "NEX can fit within the **controlled data access layer**. The relevant question is: When an AI agent requests access to sensitive data, what deterministic controls exist around that data access?",
        },
        {
          type: "image",
          src: "/media/blogs/shadow-ai-agents-enterprise-security-risk/shadow-ai-nex-fits.jpg",
          webpSrc:
            "/media/blogs/shadow-ai-agents-enterprise-security-risk/shadow-ai-nex-fits-1280.webp 1280w, /media/blogs/shadow-ai-agents-enterprise-security-risk/shadow-ai-nex-fits-960.webp 960w, /media/blogs/shadow-ai-agents-enterprise-security-risk/shadow-ai-nex-fits-640.webp 640w",
          avifSrc:
            "/media/blogs/shadow-ai-agents-enterprise-security-risk/shadow-ai-nex-fits-1280.avif 1280w, /media/blogs/shadow-ai-agents-enterprise-security-risk/shadow-ai-nex-fits-960.avif 960w, /media/blogs/shadow-ai-agents-enterprise-security-risk/shadow-ai-nex-fits-640.avif 640w",
          alt: "Where NEX fits in the enterprise AI security architecture: as the controlled data access layer between agent governance and sensitive enterprise data",
          width: 1920,
          height: 819,
          loading: "lazy",
        },
        {
          type: "p",
          text: "The purpose of this model is not to claim that NEX makes an organization safe from every AI risk. Its role should be clearly defined as part of a broader defense-in-depth approach focused on controlling access to sensitive data.",
        },
        {
          type: "quote",
          label: "Core principle:",
          text: "AI behavior can be probabilistic. Security boundaries around sensitive data should remain enforceable and deterministic.",
        },
      ],
    },
    {
      id: "shadow-ai-security-checklist",
      title: "A Practical Shadow AI Agent Security Checklist",
      level: 2,
      blocks: [
        {
          type: "p",
          text: "Use this checklist to evaluate your current environment.",
        },
        {
          type: "table",
          headers: ["Area", "Checklist Item"],
          rows: [
            ["Visibility", "We maintain an inventory of production AI agents"],
            ["Visibility", "We can identify agents created inside approved platforms"],
            ["Visibility", "We review unknown or newly discovered agents"],
            ["Visibility", "We maintain visibility into agent connectors"],
            ["Ownership", "Every production agent has a documented owner"],
            ["Ownership", "Every agent has a defined business purpose"],
            ["Ownership", "Ownership is reviewed when employees change roles or leave"],
            ["Identity & Access", "Each agent's identity is known"],
            ["Identity & Access", "Permissions follow least-privilege principles"],
            ["Identity & Access", "Sensitive repositories are explicitly scoped"],
            ["Identity & Access", "Access can be revoked quickly"],
            ["Tools & Connectors", "Tool access is documented"],
            ["Tools & Connectors", "External connections are reviewed"],
            ["Tools & Connectors", "API credentials are managed securely"],
            ["Tools & Connectors", "Unnecessary connectors are removed"],
            ["Monitoring", "Agent actions are logged"],
            ["Monitoring", "Logs connect user, agent, identity, and actions"],
            ["Monitoring", "Suspicious behavior can be investigated"],
            ["Monitoring", "Incident-response procedures include AI agents"],
            ["Decommissioning", "Agents have a defined lifecycle"],
            ["Decommissioning", "Unused agents are disabled"],
            ["Decommissioning", "Credentials are revoked during decommissioning"],
            ["Decommissioning", "Connectors and permissions are removed when no longer required"],
          ],
        },
      ],
    },
    {
      id: "what-organizations-should-measure",
      title: "What Most Organizations Should Measure",
      level: 2,
      blocks: [
        {
          type: "p",
          text: "Counting the number of AI tools in the company is not enough. A stronger measurement model includes:",
        },
        {
          type: "h3",
          id: "measure-visibility",
          title: "Visibility",
        },
        {
          type: "p",
          text: "What percentage of AI agents are inventoried?",
        },
        {
          type: "h3",
          id: "measure-ownership",
          title: "Ownership",
        },
        {
          type: "p",
          text: "What percentage have an accountable owner?",
        },
        {
          type: "h3",
          id: "measure-identity",
          title: "Identity",
        },
        {
          type: "p",
          text: "What percentage use documented identities and credentials?",
        },
        {
          type: "h3",
          id: "measure-access",
          title: "Access",
        },
        {
          type: "p",
          text: "What percentage have explicitly defined permission scopes?",
        },
        {
          type: "h3",
          id: "measure-monitoring",
          title: "Monitoring",
        },
        {
          type: "p",
          text: "What percentage generate usable security logs?",
        },
        {
          type: "h3",
          id: "measure-decommissioning",
          title: "Decommissioning",
        },
        {
          type: "p",
          text: "What percentage have a defined shutdown and credential-revocation process? These measurements turn AI governance from a policy document into an operational security practice.",
        },
      ],
    },
    {
      id: "controlled-ai-adoption-not-prohibition",
      title: "The Goal Is Controlled AI Adoption, Not AI Prohibition",
      level: 2,
      blocks: [
        {
          type: "p",
          text: "Completely banning AI is usually unrealistic. Employees adopt tools when those tools help them complete work faster. If sanctioned options are too restrictive or too slow, some users may move toward less visible alternatives. That can make the security problem worse.",
        },
        {
          type: "quote",
          text: "Enable useful AI adoption while making high-risk access visible and controllable.",
        },
        {
          type: "p",
          text: "Organizations should create a clear path for teams to request AI agents, register agents, connect approved tools, define required permissions, assign ownership, and apply security controls. Security should reduce unnecessary risk without forcing legitimate innovation outside the organization's visibility.",
        },
      ],
    },
    {
      id: "frequently-asked-questions",
      title: "Frequently Asked Questions",
      level: 2,
      blocks: [
        {
          type: "faq",
          items: [
            {
              question: "What is a shadow AI agent?",
              answer:
                "A shadow AI agent is an AI-powered agent or autonomous workflow operating without complete organizational visibility, inventory, approval, or governance. It may exist inside an otherwise approved platform.",
            },
            {
              question: "Is shadow AI the same as shadow IT?",
              answer:
                "No. Shadow AI overlaps with shadow IT but is more complex because AI agents can be embedded inside approved applications and can have changing identities, permissions, connectors, and autonomy levels.",
            },
            {
              question: "Why are shadow AI agents a security risk?",
              answer:
                "Security teams may not know what data the agent can access, which identity it uses, what tools it can call, or what actions it can perform. This makes risk assessment, access control, monitoring, and incident response more difficult.",
            },
            {
              question: "Can an approved AI application still create shadow AI risk?",
              answer:
                "Yes. The application may be approved while a specific agent, workflow, connector, permission configuration, or data-access pattern remains outside complete security visibility.",
            },
            {
              question: "How can organizations reduce shadow AI risk?",
              answer:
                "Start with discovery and inventory, assign ownership, identify agent identities, map permissions, apply least privilege, control connectors, monitor activity, and establish decommissioning procedures.",
            },
            {
              question: "Does NEX solve all shadow AI security risks?",
              answer:
                "No. NEX should be positioned as one layer in a broader security architecture, particularly around controlled access to sensitive data. AI discovery, governance, identity security, monitoring, and incident response require additional controls and processes.",
            },
          ],
        },
      ],
    },
    {
      id: "conclusion",
      title: "Conclusion: If You Cannot See the Agent, You Cannot Govern Its Access",
      level: 2,
      blocks: [
        {
          type: "p",
          text: "The enterprise AI security challenge is no longer limited to deciding whether a company should allow AI. AI agents are increasingly becoming part of everyday workflows, and their ability to connect to data and tools creates new governance requirements.",
        },
        {
          type: "p",
          text: "The critical questions are straightforward: Do you know which agents exist? Do you know who owns them? Do you know which identities they use? Do you know what data they can access? Do you know what actions they can perform? Can you stop that access when necessary?",
        },
        {
          type: "p",
          text: "If the answer to any of these is unclear, the organization has a visibility and governance gap. The goal should not be to stop AI adoption. The goal should be to make AI-powered access **visible, accountable, appropriately scoped, and controllable**.",
        },
        {
          type: "p",
          text: "As AI agents become more autonomous, enterprises need security controls that extend beyond the model itself and enforce clear boundaries around identities, permissions, tools, and sensitive data.",
        },
      ],
    },
    {
      id: "sources-and-further-reading",
      title: "Sources and Further Reading",
      level: 2,
      blocks: [
        {
          type: "sources",
          title: "Authoritative References & Research",
          items: [
            {
              id: 1,
              text: "Cloud Security Alliance: The Shadow AI Agent Problem in Enterprise Environments",
              url: "https://cloudsecurityalliance.org/blog/2026/04/28/the-shadow-ai-agent-problem-in-enterprise-environments",
            },
            {
              id: 2,
              text: "Cloud Security Alliance: Enterprise AI Security Starts with AI Agents",
              url: "https://cloudsecurityalliance.org/artifacts/enterprise-ai-security-starts-with-ai-agents",
            },
            {
              id: 3,
              text: "Gartner: Six Steps to Manage AI Agent Sprawl",
              url: "https://www.gartner.com/en/newsroom/press-releases/2026-04-28-gartner-identifies-six-steps-to-manage-artificial-intelligence-agent-sprawl",
            },
            {
              id: 4,
              text: "Gartner: Governance Across AI Agents",
              url: "https://www.gartner.com/en/newsroom/press-releases/2026-05-26-gartner-says-applying-uniform-governance-across-ai-agents-will-lead-to-enterprise-ai-agent-failure",
            },
            {
              id: 5,
              text: "OWASP Top 10 for Agentic Applications",
              url: "https://genai.owasp.org/2025/12/09/owasp-top-10-for-agentic-applications-the-benchmark-for-agentic-security-in-the-age-of-autonomous-ai/",
            },
            {
              id: 6,
              text: "OWASP GenAI Top 10",
              url: "https://genai.owasp.org/initiatives/top-10-for-llm-and-genai/",
            },
          ],
        },
      ],
    },
  ],
};
