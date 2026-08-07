import { Terminal, Network, Monitor, Code2, ShieldCheck, Wrench, Compass } from "lucide-react";

interface RoadmapStage {
  step: string;
  title: string;
  icon: React.ReactNode;
  summary: string;
  tags: string[];
  details?: string;
}

const STAGES: RoadmapStage[] = [
  {
    step: "01",
    title: "Stage 1: Computer Fundamentals",
    icon: <Terminal size={20} className="text-[#015AAA]" />,
    summary: "Understand how hardware, operating systems, and memory interact.",
    tags: ["Hardware", "Software", "Filesystems", "Processes", "Memory", "Permissions"],
  },
  {
    step: "02",
    title: "Stage 2: Networking Fundamentals",
    icon: <Network size={20} className="text-[#015AAA]" />,
    summary: "Learn how devices communicate across local networks and the internet.",
    tags: ["IP Addressing", "TCP/IP", "DNS", "HTTP/HTTPS", "Ports", "OSI Model"],
  },
  {
    step: "03",
    title: "Stage 3: Operating Systems",
    icon: <Monitor size={20} className="text-[#015AAA]" />,
    summary: "Become comfortable working directly with operating system internals.",
    tags: ["Linux CLI", "Windows Internals", "Logs", "Services", "Network Tools"],
  },
  {
    step: "04",
    title: "Stage 4: Programming & Scripting",
    icon: <Code2 size={20} className="text-[#015AAA]" />,
    summary: "Learn enough logic to automate repetitive tasks and parse security data.",
    tags: ["Python", "Variables & Loops", "Functions", "APIs", "Automation"],
    details: "Python is a reasonable starting point, but the choice eventually depends on your specialization.",
  },
  {
    step: "05",
    title: "Stage 5: Security Fundamentals",
    icon: <ShieldCheck size={20} className="text-[#015AAA]" />,
    summary: "Master core security concepts, threats, and defensive controls.",
    tags: ["Authentication", "Authorization", "Encryption", "Hashing", "Threat Models"],
  },
  {
    step: "06",
    title: "Stage 6: Hands-On Practice",
    icon: <Wrench size={20} className="text-[#015AAA]" />,
    summary: "Apply what you've learned through controlled labs and authorized testing.",
    tags: ["Home Labs", "Virtual Machines", "CTF Challenges", "Intentionally Vulnerable Apps"],
  },
  {
    step: "07",
    title: "Stage 7: Choose a Specialization",
    icon: <Compass size={20} className="text-[#015AAA]" />,
    summary: "Explore specific cybersecurity domains based on your interests.",
    tags: ["Web App Security", "Penetration Testing", "Cloud Security", "SOC / Incident Response"],
    details: "Build fundamentals first, experiment with different areas, and specialize gradually.",
  },
];

export function BlogRoadmapTimeline() {
  return (
    <div className="relative my-8">
      {/* Central Connecting Vertical Line */}
      <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-slate-200 hidden sm:block" />

      <div className="space-y-6">
        {STAGES.map((stage) => (
          <div
            key={stage.step}
            className="relative flex flex-col sm:flex-row items-start gap-4 p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-[#015AAA]/30 transition-all group"
          >
            {/* Step Icon Badge */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-12 h-12 rounded-xl bg-[#015AAA]/10 text-[#015AAA] flex items-center justify-center font-bold text-sm z-10 group-hover:scale-105 transition-transform">
                {stage.icon}
              </div>
              <span className="sm:hidden font-mono font-bold text-xs text-[#015AAA] bg-slate-100 px-2 py-0.5 rounded">
                Stage {stage.step}
              </span>
            </div>

            {/* Stage Body */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                <h3 className="nst-h3 text-slate-900 m-0 text-base sm:text-lg font-bold">
                  {stage.title}
                </h3>
                <span className="hidden sm:inline-block font-mono font-bold text-xs text-[#015AAA] bg-[#015AAA]/10 px-2.5 py-0.5 rounded-full border border-[#015AAA]/20">
                  {stage.step}
                </span>
              </div>

              <p className="nst-small text-slate-600 m-0 mb-3 text-sm leading-relaxed">
                {stage.summary}
              </p>

              {/* Pill Tags */}
              <div className="flex flex-wrap items-center gap-1.5 mb-2">
                {stage.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block text-xs font-medium text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {stage.details ? (
                <p className="text-xs text-slate-500 italic m-0 pt-1 border-t border-slate-100">
                  {stage.details}
                </p>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
