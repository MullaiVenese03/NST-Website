import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import {
  Shield, Award, Code2, ShoppingBag, Users, TrendingUp,
  BookOpen, Wrench, Rocket, CheckCircle, Laptop, DollarSign,
  UserCheck, ArrowRight, ExternalLink, Star,
  Globe, ChevronRight, Play, Zap, GraduationCap, FlaskConical,
  Lightbulb, Target, Building2, BarChart3
} from "lucide-react";
import { ImageWithFallback } from "../components/ImageWithFallback";
import FooterSection from "../components/FooterSection";

import TopNav from "../components/TopNav";
import BottomNav from "../components/BottomNav";
import svgPathsNST from "../../imports/HeroSection/svg-3kvcnifylj";

/* ══════════════════════════════════════════════════════════════════════
   DESIGN TOKENS  (Premium SaaS — Light Mode)
══════════════════════════════════════════════════════════════════════ */
const C = {
  primary:   "#0A66C2",
  secondary: "#083A75",
  bg:        "#F8FAFC",
  card:      "#FFFFFF",
  border:    "#E2E8F0",
  heading:   "#0F172A",
  body:      "#475569",
  muted:     "#94A3B8",
  accent:    "#EFF6FF",
  accentMid: "#DBEAFE",
};

/* ── Shared animation presets ────────────────────────────────────────── */
const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};
const fadeLeft  = { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22,1,0.36,1] } } };
const fadeRight = { hidden: { opacity: 0, x:  40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22,1,0.36,1] } } };

/* ── Parallax hook ───────────────────────────────────────────────────── */
function useParallax(ref: React.RefObject<HTMLDivElement | null>, dist = 50) {
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  return useTransform(scrollYProgress, [0, 1], [-dist, dist]);
}

/* ══════════════════════════════════════════════════════════════════════
   SHARED: NST LOGO (inline SVG — no import needed)
══════════════════════════════════════════════════════════════════════ */
function NSTLogo() {
  return (
    <div className="flex items-center gap-3">
      <svg className="w-10 h-10 flex-shrink-0" fill="none" viewBox="0 0 56 58.0457">
        <g>
          <path d={svgPathsNST.pa90df80}   fill="#015AAA" />
          <path d={svgPathsNST.p3959b800}  fill="#015AAA" />
          <path d={svgPathsNST.p3b6ed900}  fill="#015AAA" />
          <path d={svgPathsNST.p36cd8100}  fill="#015AAA" />
          <path d={svgPathsNST.p35314300}  fill="#015AAA" />
          <path d={svgPathsNST.p33416100}  fill="#015AAA" />
          <path d={svgPathsNST.p3ac0a900}  fill="#015AAA" />
          <path d={svgPathsNST.p12afe570}  fill="#015AAA" />
          <path d={svgPathsNST.p206f9980}  fill="#015AAA" />
        </g>
      </svg>
      <span style={{ fontFamily: "'Overcame Demo', sans-serif", fontWeight: 800, fontSize: "20px", letterSpacing: "0.5px", color: C.heading }}>
        NebulaSafe<span style={{ color: C.primary }}>Tech</span>
      </span>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   1. HERO  —  "Learn. Build. Launch."
══════════════════════════════════════════════════════════════════════ */
function EdTechHero() {
  const imgRef = useRef<HTMLDivElement>(null);
  const y = useParallax(imgRef, 35);

  const floatingStats = [
    { val: "1,000+", label: "Students Trained" },
    { val: "6+",     label: "Partner Institutions" },
    { val: "20+",    label: "Live Projects" },
  ];

  return (
    <section className="relative w-full overflow-hidden" style={{ background: C.bg, paddingTop: "80px", paddingBottom: "80px" }}>
      <div className="max-w-[1320px] mx-auto px-8 flex flex-col lg:flex-row items-center gap-16">

        {/* ── Left content ── */}
        <div className="flex-1 min-w-0">
          {/* Badge */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6"
            style={{ background: C.accentMid, border: `1px solid ${C.border}` }}>
            <GraduationCap size={15} color={C.primary} />
            <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: "12px", letterSpacing: "1px", color: C.primary, textTransform: "uppercase" }}>
              EdTech Ecosystem
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={1}
            style={{ fontFamily: "'Inter',sans-serif", fontWeight: 900, fontSize: "clamp(40px,5.5vw,72px)", color: C.heading, lineHeight: 1.06, letterSpacing: "-1.5px", marginBottom: "24px", margin: "0 0 24px 0" }}>
            Learn.<br />
            <span style={{ color: C.primary }}>Build.</span><br />
            Launch.
          </motion.h1>

          {/* Subtext */}
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={2}
            style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: "18px", color: C.body, lineHeight: 1.75, maxWidth: "480px", marginBottom: "40px", margin: "0 0 40px 0" }}>
            Industry-grade training programs, real-world projects, and a software marketplace — all in one cybersecurity EdTech ecosystem built to launch your tech career.
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3}
            className="flex flex-wrap gap-4 mb-12">
            <motion.a href="#programs"
              className="flex items-center gap-2 no-underline"
              style={{ background: C.primary, color: "#fff", borderRadius: "12px", padding: "14px 28px", fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: "15px" }}
              whileHover={{ scale: 1.04, background: C.secondary }} whileTap={{ scale: 0.96 }}>
              Explore Programs <ArrowRight size={16} />
            </motion.a>
            <motion.a href="#ecommerce"
              className="flex items-center gap-2 no-underline"
              style={{ background: "#fff", color: C.primary, border: `2px solid ${C.border}`, borderRadius: "12px", padding: "14px 28px", fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: "15px" }}
              whileHover={{ scale: 1.04, borderColor: C.primary, background: C.accent }} whileTap={{ scale: 0.96 }}>
              <Play size={15} fill={C.primary} /> View Projects
            </motion.a>
          </motion.div>

          {/* Floating stat pills */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={4}
            className="flex flex-wrap gap-3">
            {floatingStats.map((s, i) => (
              <div key={i} className="flex items-center gap-2 rounded-[10px] px-4 py-2"
                style={{ background: "#fff", border: `1px solid ${C.border}`, boxShadow: "0 2px 8px rgba(10,102,194,0.06)" }}>
                <Zap size={13} color={C.primary} fill={C.primary} />
                <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 800, fontSize: "15px", color: C.heading }}>{s.val}</span>
                <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: "12px", color: C.muted }}>{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right illustration ── */}
        <div ref={imgRef} className="flex-1 min-w-0 relative">
          <motion.div variants={fadeRight} initial="hidden" animate="visible" className="relative">
            <motion.div style={{ y, boxShadow: "0 24px 64px rgba(10,102,194,0.15)", borderRadius: "20px" }} className="relative rounded-[20px] overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1695067231719-a700763a2541?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwbGVhcm5pbmclMjBsYXB0b3AlMjBjeWJlcnNlY3VyaXR5JTIwZWR1Y2F0aW9ufGVufDF8fHx8MTc3Nzc0MjIwOHww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Students learning cybersecurity"
                className="w-full h-auto object-cover"
                style={{ maxHeight: "500px" }}
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(8,58,117,0.35) 0%, transparent 50%)" }} />
            </motion.div>

            {/* Floating UI card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="absolute -bottom-4 -left-6 rounded-[14px] p-4 flex items-center gap-3"
              style={{ background: "#fff", border: `1px solid ${C.border}`, boxShadow: "0 8px 32px rgba(10,102,194,0.12)", minWidth: "200px" }}>
              <div className="rounded-[10px] p-2.5" style={{ background: C.accentMid }}>
                <Award size={20} color={C.primary} />
              </div>
              <div>
                <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 800, fontSize: "18px", color: C.heading, margin: 0 }}>50+</p>
                <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: "12px", color: C.muted, margin: 0 }}>Certifications Issued</p>
              </div>
            </motion.div>

            {/* Rating card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute -top-4 -right-4 rounded-[14px] p-3 flex items-center gap-2"
              style={{ background: "#fff", border: `1px solid ${C.border}`, boxShadow: "0 8px 32px rgba(10,102,194,0.12)" }}>
              {[1,2,3,4,5].map(i => <Star key={i} size={13} fill="#F59E0B" color="#F59E0B" />)}
              <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: "13px", color: C.heading }}>4.9/5</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═════════════════════════════════════════════════════════════════════
   2. EDTECH SERVICES  —  6 cards
══════════════════════════════════════════════════════════════════════ */
const edtechServices = [
  { icon: Shield,      color: "#0A66C2", bg: "#EFF6FF", title: "Cybersecurity Training",    desc: "Structured programs covering ethical hacking, network defense, and real-world cyber ops." },
  { icon: FlaskConical,color: "#7C3AED", bg: "#F5F3FF", title: "Hands-on Labs",             desc: "Virtual labs and sandbox environments to practice skills without any real-world risk." },
  { icon: Award,       color: "#D97706", bg: "#FFFBEB", title: "Certifications",            desc: "Industry-recognised certifications to validate your skills and boost career prospects." },
  { icon: Code2,       color: "#059669", bg: "#ECFDF5", title: "Project-Based Learning",   desc: "Learn by building real products — from secure web apps to full-stack platforms." },
  { icon: ShoppingBag, color: "#DC2626", bg: "#FEF2F2", title: "Software Marketplace",     desc: "Publish and monetise your student projects on NST's growing software marketplace." },
  { icon: TrendingUp,  color: "#0A66C2", bg: "#EFF6FF", title: "Career Development",       desc: "Resume workshops, mock interviews, and industry placement support for every graduate." },
];

function EdTechServicesSection() {
  return (
    <section id="programs" className="w-full py-20 px-8" style={{ background: "#FFFFFF" }}>
      <div className="max-w-[1320px] mx-auto">
        {/* Header */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="flex flex-col items-center text-center gap-4 mb-14">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2"
            style={{ background: C.accentMid, border: `1px solid ${C.border}` }}>
            <Lightbulb size={14} color={C.primary} />
            <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: "11px", letterSpacing: "1px", color: C.primary, textTransform: "uppercase" }}>
              What We Offer
            </span>
          </div>
          <h2 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 800, fontSize: "clamp(28px,3.5vw,48px)", color: C.heading, letterSpacing: "-0.8px", lineHeight: 1.1, margin: 0 }}>
            Everything You Need to Succeed
          </h2>
          <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: "17px", color: C.body, maxWidth: "520px", lineHeight: 1.7, margin: 0 }}>
            A complete ecosystem combining training, practice, and career launch — built by cybersecurity professionals.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {edtechServices.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i % 3}
                className="group rounded-[16px] p-6 flex flex-col gap-4 cursor-pointer transition-all duration-300"
                style={{ background: C.card, border: `1px solid ${C.border}` }}
                whileHover={{ y: -6, boxShadow: `0 20px 48px rgba(10,102,194,0.12)`, borderColor: C.primary }}>
                {/* Icon */}
                <div className="rounded-[12px] p-3 w-fit transition-transform duration-300 group-hover:scale-110"
                  style={{ background: svc.bg }}>
                  <Icon size={24} color={svc.color} strokeWidth={2} />
                </div>
                {/* Text */}
                <div>
                  <h3 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: "17px", color: C.heading, margin: "0 0 8px 0" }}>
                    {svc.title}
                  </h3>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: "14px", color: C.body, lineHeight: 1.65, margin: 0 }}>
                    {svc.desc}
                  </p>
                </div>
                {/* Learn more link */}
                <div className="flex items-center gap-1 mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ color: C.primary, fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: "13px" }}>
                  Learn more <ChevronRight size={14} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   3. FEATURED PROJECTS  —  4 cards
══════════════════════════════════════════════════════════════════════ */
type Difficulty = "Beginner" | "Intermediate" | "Advanced";
const difficultyColor: Record<Difficulty, { bg: string; text: string }> = {
  Beginner:     { bg: "#ECFDF5", text: "#059669" },
  Intermediate: { bg: "#FFFBEB", text: "#D97706" },
  Advanced:     { bg: "#FEF2F2", text: "#DC2626" },
};

const featuredProjects = [
  {
    img: "https://images.unsplash.com/photo-1763718528755-4bca23f82ac3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBkYXNoYm9hcmQlMjBtb2Rlcm4lMjB3ZWIlMjBhcHBsaWNhdGlvbiUyMFVJfGVufDF8fHx8MTc3Nzc0MjIwOXww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "E-Commerce Web Application",
    desc: "A production-ready full-stack e-commerce platform with authentication, payment gateway, and admin dashboard.",
    tags: ["React", "Node.js", "Stripe"],
    difficulty: "Advanced" as Difficulty,
    highlight: true,
  },
  {
    img: "https://images.unsplash.com/photo-1768839721176-2fa91fdce725?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwbmV0d29yayUyMHNlY3VyaXR5JTIwZGF0YSUyMHByb3RlY3Rpb258ZW58MXx8fHwxNzc3NzQyMjEyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Cybersecurity Dashboard",
    desc: "Real-time threat monitoring and incident response dashboard with live data visualisation.",
    tags: ["Python", "React", "WebSockets"],
    difficulty: "Advanced" as Difficulty,
    highlight: false,
  },
  {
    img: "https://images.unsplash.com/photo-1760009229725-7ef1990e585f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBsZWFybmluZyUyMHBsYXRmb3JtJTIwZGlnaXRhbCUyMGVkdWNhdGlvbiUyMGFic3RyYWN0fGVufDF8fHx8MTc3Nzc0MjIxMnww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Learning Management System",
    desc: "A scalable LMS with video hosting, quizzes, progress tracking, and certificate generation.",
    tags: ["Next.js", "MongoDB", "AWS"],
    difficulty: "Intermediate" as Difficulty,
    highlight: false,
  },
  {
    img: "https://images.unsplash.com/photo-1631624215749-b10b3dd7bca7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjBwcm9ncmFtbWluZyUyMGhhbmRzJTIwb24lMjBrZXlib2FyZCUyMGRhcmslMjBzY3JlZW58ZW58MXx8fHwxNzc3NzQyMjA5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Penetration Testing Toolkit",
    desc: "A beginner-friendly web app that guides learners through common vulnerability discovery and exploitation labs.",
    tags: ["Python", "Kali Linux", "OWASP"],
    difficulty: "Beginner" as Difficulty,
    highlight: false,
  },
];

function ProjectCard({ project, index }: { project: typeof featuredProjects[0]; index: number }) {
  const diff = difficultyColor[project.difficulty];
  return (
    <motion.div
      variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={index % 4}
      className="group rounded-[16px] bg-white overflow-hidden flex flex-col cursor-pointer"
      style={{ border: project.highlight ? `2px solid ${C.primary}` : `1px solid ${C.border}` }}
      whileHover={{ y: -7, boxShadow: "0 24px 48px rgba(10,102,194,0.14)" }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: "200px" }}>
        <ImageWithFallback
          src={project.img}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Highlight badge */}
        {project.highlight && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full px-3 py-1"
            style={{ background: C.primary, boxShadow: "0 4px 12px rgba(10,102,194,0.4)" }}>
            <Star size={11} fill="white" color="white" />
            <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 800, fontSize: "10px", letterSpacing: "0.5px", color: "#fff" }}>FEATURED</span>
          </div>
        )}
        {/* Difficulty */}
        <div className="absolute top-3 right-3 rounded-full px-3 py-1"
          style={{ background: diff.bg }}>
          <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: "10px", letterSpacing: "0.5px", color: diff.text }}>
            {project.difficulty}
          </span>
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: "rgba(10,102,194,0.8)" }}>
          <span className="flex items-center gap-2" style={{ color: "#fff", fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: "15px" }}>
            View Project <ExternalLink size={15} />
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <h3 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: "17px", color: C.heading, margin: 0, lineHeight: 1.3 }}>
          {project.title}
        </h3>
        <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: "13px", color: C.body, lineHeight: 1.6, margin: 0, flexGrow: 1 }}>
          {project.desc}
        </p>
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-full px-3 py-1"
              style={{ background: C.accentMid, fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: "11px", color: C.primary }}>
              {tag}
            </span>
          ))}
        </div>
        {/* CTA */}
        <motion.button
          className="flex items-center justify-center gap-2 rounded-[10px] py-2.5 mt-1 border-none cursor-pointer"
          style={{ background: project.highlight ? C.primary : "transparent", border: project.highlight ? "none" : `1px solid ${C.border}`, color: project.highlight ? "#fff" : C.primary, fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: "13px" }}
          whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          View Project <ArrowRight size={14} />
        </motion.button>
      </div>
    </motion.div>
  );
}

function FeaturedProjectsSection() {
  return (
    <section id="projects" className="w-full py-20 px-8" style={{ background: C.bg }}>
      <div className="max-w-[1320px] mx-auto">
        {/* Header */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-12">
          <div className="flex flex-col gap-3">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 w-fit"
              style={{ background: C.accentMid, border: `1px solid ${C.border}` }}>
              <Code2 size={14} color={C.primary} />
              <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: "11px", letterSpacing: "1px", color: C.primary, textTransform: "uppercase" }}>
                Student Projects
              </span>
            </div>
            <h2 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 800, fontSize: "clamp(26px,3.2vw,44px)", color: C.heading, letterSpacing: "-0.8px", lineHeight: 1.1, margin: 0 }}>
              Featured Projects
            </h2>
            <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: "16px", color: C.body, lineHeight: 1.7, maxWidth: "480px", margin: 0 }}>
              Real software built by NST learners — from concept to deployment.
            </p>
          </div>
          <motion.a href="#ecommerce"
            className="flex items-center gap-2 no-underline"
            style={{ background: "#fff", color: C.primary, border: `2px solid ${C.border}`, borderRadius: "12px", padding: "14px 28px", fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: "15px" }}
            whileHover={{ scale: 1.04, borderColor: C.primary, background: C.accent }} whileTap={{ scale: 0.96 }}>
            <Play size={15} fill={C.primary} /> View Projects
          </motion.a>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProjects.map((p, i) => <ProjectCard key={i} project={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   4. E-COMMERCE SHOUTOUT  —  Gateway section
══════════════════════════════════════════════════════════════════════ */
function ECommerceShoutout() {
  const imgRef = useRef<HTMLDivElement>(null);
  const y = useParallax(imgRef, 30);

  return (
    <section id="ecommerce" className="relative w-full py-4 px-8">
      <div className="max-w-[1320px] mx-auto">
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="relative rounded-[24px] overflow-hidden flex flex-col lg:flex-row items-stretch"
          style={{ background: `linear-gradient(135deg, ${C.secondary} 0%, ${C.primary} 60%, #1D78D0 100%)`, minHeight: "480px" }}
        >
          {/* Decorative circles */}
          <div className="absolute top-[-60px] right-[-60px] w-[300px] h-[300px] rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }} />
          <div className="absolute bottom-[-40px] left-[30%] w-[200px] h-[200px] rounded-full opacity-5"
            style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }} />

          {/* Left content */}
          <div className="flex-1 flex flex-col justify-center px-10 py-14 lg:px-14 relative z-10">
            {/* Badge */}
            <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 w-fit"
              style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.25)" }}>
              <ShoppingBag size={14} color="white" />
              <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: "11px", letterSpacing: "1px", color: "rgba(255,255,255,0.9)", textTransform: "uppercase" }}>
                Flagship Project
              </span>
            </motion.div>

            <motion.h2 variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}
              style={{ fontFamily: "'Inter',sans-serif", fontWeight: 900, fontSize: "clamp(28px,3.5vw,52px)", color: "#FFFFFF", letterSpacing: "-1px", lineHeight: 1.1, marginBottom: "20px", margin: "0 0 20px 0" }}>
              Build a Real<br />E-Commerce Platform
            </motion.h2>

            <motion.p variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}
              style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: "17px", color: "rgba(255,255,255,0.8)", lineHeight: 1.7, maxWidth: "420px", marginBottom: "32px", margin: "0 0 32px 0" }}>
              Dive into a production-grade e-commerce build — from user auth and product catalogs to Stripe payments and an admin panel. This is what real-world development looks like.
            </motion.p>

            {/* Bullet points */}
            <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="flex flex-col gap-3 mb-8">
              {[
                "Full-stack React + Node.js architecture",
                "Stripe payment gateway integration",
                "Admin dashboard & inventory management",
                "Deployed to live production environment",
              ].map((point, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="rounded-full p-1 flex-shrink-0" style={{ background: "rgba(255,255,255,0.2)" }}>
                    <CheckCircle size={13} color="white" />
                  </div>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: "14px", color: "rgba(255,255,255,0.85)" }}>
                    {point}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.a
              href="https://ecommerce.nebulasafetech.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 no-underline w-fit rounded-[14px] py-4 px-8"
              style={{ background: "#FFFFFF", boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}
              whileHover={{ scale: 1.05, boxShadow: "0 12px 40px rgba(0,0,0,0.3)" }}
              whileTap={{ scale: 0.96 }}>
              <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 800, fontSize: "16px", color: C.primary }}>
                Open Project Website
              </span>
              <ExternalLink size={16} color={C.primary} />
            </motion.a>

            {/* Small note */}
            <p className="mt-4" style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>
              Opens in a new tab → Hosted on NST EdTech platform
            </p>
          </div>

          {/* Right: Dashboard mockup */}
          <div ref={imgRef} className="flex-1 relative flex items-center justify-end p-6 lg:p-10">
            <motion.div style={{ y }} className="relative w-full max-w-[500px]">
              <div className="rounded-[16px] overflow-hidden relative"
                style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1763718528755-4bca23f82ac3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBkYXNoYm9hcmQlMjBtb2Rlcm4lMjB3ZWIlMjBhcHBsaWNhdGlvbiUyMFVJfGVufDF8fHx8MTc3Nzc0MjIwOXww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="E-Commerce Platform Dashboard"
                  className="w-full h-auto object-cover"
                  style={{ maxHeight: "340px" }}
                />
              </div>

              {/* Floating metric */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-4 -left-4 rounded-[12px] p-3 flex items-center gap-3"
                style={{ background: "#fff", boxShadow: "0 8px 24px rgba(0,0,0,0.15)", minWidth: "160px" }}>
                <div className="rounded-[8px] p-2" style={{ background: "#ECFDF5" }}>
                  <BarChart3 size={18} color="#059669" />
                </div>
                <div>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 800, fontSize: "16px", color: "#059669", margin: 0 }}>+124%</p>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: "11px", color: C.muted, margin: 0 }}>Placement Rate</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   5. LEARNING PATH  —  4-step horizontal journey
══════════════════════════════════════════════════════════════════════ */
const journeySteps = [
  { step: "01", icon: BookOpen,  color: "#0A66C2", bg: "#EFF6FF", title: "Learn",    desc: "Access structured courses designed by cybersecurity & tech industry experts." },
  { step: "02", icon: FlaskConical,color:"#7C3AED",bg:"#F5F3FF", title: "Practice", desc: "Work through hands-on labs, CTF challenges, and sandbox environments." },
  { step: "03", icon: Wrench,    color: "#D97706", bg: "#FFFBEB", title: "Build",    desc: "Create real software products as part of your certified learning path." },
  { step: "04", icon: Rocket,    color: "#059669", bg: "#ECFDF5", title: "Launch",   desc: "Publish on the NST marketplace, get certified, and land your dream job." },
];

function LearningPathSection() {
  return (
    <section className="w-full py-20 px-8" style={{ background: "#FFFFFF" }}>
      <div className="max-w-[1320px] mx-auto">
        {/* Header */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="flex flex-col items-center text-center gap-4 mb-14">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2"
            style={{ background: C.accentMid, border: `1px solid ${C.border}` }}>
            <Target size={14} color={C.primary} />
            <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: "11px", letterSpacing: "1px", color: C.primary, textTransform: "uppercase" }}>
              The Journey
            </span>
          </div>
          <h2 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 800, fontSize: "clamp(26px,3.5vw,46px)", color: C.heading, letterSpacing: "-0.8px", lineHeight: 1.1, margin: 0 }}>
            Your Learning Path
          </h2>
          <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: "17px", color: C.body, maxWidth: "480px", lineHeight: 1.7, margin: 0 }}>
            A clear, structured path from beginner to industry-ready professional.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="flex flex-col lg:flex-row items-start gap-0 lg:gap-0 relative">
          {journeySteps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="flex-1 flex flex-col lg:flex-row items-center">
                {/* Step card */}
                <motion.div
                  variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
                  className="group flex flex-col items-center text-center gap-4 p-8 rounded-[16px] w-full lg:w-auto flex-1 transition-all duration-300 cursor-default"
                  style={{ background: C.card, border: `1px solid ${C.border}` }}
                  whileHover={{ y: -6, boxShadow: `0 20px 48px rgba(10,102,194,0.1)`, borderColor: step.color }}>

                  {/* Step number */}
                  <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 800, fontSize: "12px", letterSpacing: "2px", color: step.color }}>
                    STEP {step.step}
                  </span>

                  {/* Icon */}
                  <div className="rounded-[16px] p-4 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: step.bg }}>
                    <Icon size={30} color={step.color} strokeWidth={2} />
                  </div>

                  {/* Text */}
                  <h3 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 800, fontSize: "22px", color: C.heading, margin: 0 }}>
                    {step.title}
                  </h3>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: "14px", color: C.body, lineHeight: 1.65, margin: 0, maxWidth: "220px" }}>
                    {step.desc}
                  </p>
                </motion.div>

                {/* Connector arrow (not after last) */}
                {i < journeySteps.length - 1 && (
                  <div className="hidden lg:flex items-center justify-center px-3 flex-shrink-0">
                    <motion.div
                      initial={{ opacity: 0, scaleX: 0 }}
                      whileInView={{ opacity: 1, scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.15 + 0.3 }}
                      style={{ transformOrigin: "left" }}>
                      <ChevronRight size={24} color={C.muted} />
                    </motion.div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   6. PLATFORM FEATURES  —  icon + text grid
══════════════════════════════════════════════════════════════════════ */
const platformFeatures = [
  { icon: GraduationCap, title: "Industry-Relevant Curriculum",   desc: "Curated by working professionals and updated quarterly to match market demands." },
  { icon: Laptop,         title: "Real-World Projects",           desc: "Every course ends with a deployable project that belongs in your portfolio." },
  { icon: Award,          title: "Certification",                 desc: "Earn NST-issued certificates recognised by partner companies and institutions." },
  { icon: DollarSign,     title: "Monetisation Opportunities",    desc: "Sell your completed projects on the NST software marketplace." },
  { icon: UserCheck,      title: "Expert Mentors",                desc: "1-on-1 guidance from certified ethical hackers and senior developers." },
  { icon: Globe,          title: "Global Community",              desc: "Join 1,000+ learners, share projects, and grow your professional network." },
  { icon: Building2,      title: "Institutional Partnerships",    desc: "MoU programs with colleges for campus certifications and collaborative projects." },
  { icon: CheckCircle,    title: "Job Placement Support",         desc: "Resume reviews, mock interviews, and direct referrals to hiring partners." },
];

function PlatformFeaturesSection() {
  return (
    <section className="w-full py-20 px-8" style={{ background: C.bg }}>
      <div className="max-w-[1320px] mx-auto">
        {/* Header */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="flex flex-col items-center text-center gap-4 mb-14">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2"
            style={{ background: C.accentMid, border: `1px solid ${C.border}` }}>
            <Zap size={14} color={C.primary} fill={C.primary} />
            <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: "11px", letterSpacing: "1px", color: C.primary, textTransform: "uppercase" }}>
              Platform Advantages
            </span>
          </div>
          <h2 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 800, fontSize: "clamp(26px,3.5vw,46px)", color: C.heading, letterSpacing: "-0.8px", lineHeight: 1.1, margin: 0 }}>
            Why Learn with NST EdTech?
          </h2>
          <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: "17px", color: C.body, maxWidth: "500px", lineHeight: 1.7, margin: 0 }}>
            Everything built around real outcomes — not just content consumption.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {platformFeatures.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i % 4}
                className="group rounded-[14px] p-5 flex flex-col gap-4 transition-all duration-300"
                style={{ background: C.card, border: `1px solid ${C.border}` }}
                whileHover={{ y: -5, borderColor: C.primary, boxShadow: "0 16px 40px rgba(10,102,194,0.1)" }}>
                <div className="rounded-[10px] p-2.5 w-fit transition-transform duration-200 group-hover:scale-110"
                  style={{ background: C.accentMid }}>
                  <Icon size={20} color={C.primary} strokeWidth={2} />
                </div>
                <h4 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: "15px", color: C.heading, margin: 0, lineHeight: 1.3 }}>
                  {feat.title}
                </h4>
                <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: "13px", color: C.body, lineHeight: 1.6, margin: 0 }}>
                  {feat.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   7. STATS STRIP
══════════════════════════════════════════════════════════════════════ */
function StatsStrip() {
  const stats = [
    { val: "1,000+", label: "Students Trained",        icon: Users },
    { val: "6+",     label: "Partner Institutions",     icon: Building2 },
    { val: "20+",    label: "Projects Deployed",         icon: Rocket },
    { val: "4.9★",  label: "Average Rating",            icon: Star },
  ];
  return (
    <motion.section
      className="w-full py-12 px-8"
      style={{ background: "#FFFFFF", borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}
      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
      <div className="max-w-[1320px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div key={i} className="flex flex-col items-center gap-2"
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}>
              <div className="rounded-[10px] p-2.5" style={{ background: C.accentMid }}>
                <Icon size={18} color={C.primary} />
              </div>
              <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 900, fontSize: "32px", color: C.heading, letterSpacing: "-1px" }}>
                {s.val}
              </span>
              <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: "13px", color: C.muted, textAlign: "center" }}>
                {s.label}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   8. CTA  —  "Start Your Learning Journey Today"
═════════════════════════════════════════════════════════════════════ */
function CTASection() {
  return (
    <section className="w-full py-20 px-8" style={{ background: C.bg }}>
      <div className="max-w-[1320px] mx-auto">
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="relative rounded-[24px] overflow-hidden flex flex-col items-center text-center px-10 py-16 gap-8"
          style={{ background: `linear-gradient(135deg, ${C.bg} 0%, ${C.accentMid} 100%)`, border: `2px solid ${C.border}` }}>

          {/* Glow blob */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] blur-3xl pointer-events-none"
            style={{ background: `radial-gradient(ellipse, rgba(10,102,194,0.15) 0%, transparent 70%)` }} />

          {/* Icon */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="rounded-[20px] p-5 relative z-10"
            style={{ background: `linear-gradient(135deg, ${C.primary} 0%, ${C.secondary} 100%)`, boxShadow: `0 16px 40px rgba(10,102,194,0.3)` }}>
            <GraduationCap size={36} color="white" />
          </motion.div>

          <div className="flex flex-col gap-4 items-center relative z-10">
            <h2 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 900, fontSize: "clamp(28px,4vw,54px)", color: C.heading, letterSpacing: "-1.2px", lineHeight: 1.08, margin: 0 }}>
              Start Your Learning<br />Journey Today
            </h2>
            <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: "18px", color: C.body, lineHeight: 1.7, maxWidth: "500px", margin: 0 }}>
              Join 1,000+ learners already building the future of cybersecurity. No experience required — just a drive to grow.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 items-center justify-center relative z-10">
            <motion.a href="/edtech#programs"
              className="flex items-center gap-2 no-underline rounded-[14px] px-8 py-4"
              style={{ background: C.primary, color: "#fff", fontFamily: "'Inter',sans-serif", fontWeight: 800, fontSize: "16px", boxShadow: `0 8px 32px rgba(10,102,194,0.35)` }}
              whileHover={{ scale: 1.05, background: C.secondary }} whileTap={{ scale: 0.96 }}>
              Join EdTech Platform <ArrowRight size={16} />
            </motion.a>
            <motion.a href="/clients"
              className="flex items-center gap-2 no-underline rounded-[14px] px-8 py-4"
              style={{ background: "#fff", color: C.primary, border: `2px solid ${C.border}`, fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: "15px" }}
              whileHover={{ scale: 1.04, borderColor: C.primary, background: C.accent }} whileTap={{ scale: 0.96 }}>
              View Our Clients <ChevronRight size={16} />
            </motion.a>
          </div>

          {/* Trust logos / chips */}
          <div className="flex flex-wrap items-center justify-center gap-3 relative z-10 pt-2">
            {["St. Joseph College", "CPPM College, Hosur", "Tamil Nadu Police", "Dhanalakshmi Srinivasan College"].map((name) => (
              <span key={name} className="rounded-full px-4 py-2"
                style={{ background: "#fff", border: `1px solid ${C.border}`, fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: "11px", color: C.body }}>
                ✓ {name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   PAGE ROOT
══════════════════════════════════════════════════════════════════════ */
export default function EdTechPage() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    window.scrollTo(0, 0);
    return () => { document.documentElement.style.scrollBehavior = ""; };
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden" style={{ background: C.bg }}>
      <TopNav />
      <BottomNav />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <EdTechHero />
        <StatsStrip />
        <EdTechServicesSection />
        <ECommerceShoutout />
        <LearningPathSection />
        <PlatformFeaturesSection />
        <CTASection />
        <FooterSection />
      </motion.div>
    </div>
  );
}