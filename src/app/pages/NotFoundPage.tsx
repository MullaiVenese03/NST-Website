import { useEffect } from "react";
import { Link } from "react-router";
import { Helmet } from "react-helmet-async";
import { motion, type Variants } from "motion/react";
import {
  ArrowLeft,
  Shield,
  FileText,
  GraduationCap,
  Mail,
  Radio,
  CornerDownRight,
} from "lucide-react";
import TopNav from "../components/TopNav";
import FooterSection from "../components/FooterSection";
import { useMotionEnabled } from "../utils/performance";
import { scrollToTopInstant } from "../utils/scroll";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.08, ease: "easeOut" },
  }),
};

export default function NotFoundPage() {
  const motionEnabled = useMotionEnabled();

  useEffect(() => {
    scrollToTopInstant();
  }, []);

  return (
    <div className="w-full min-h-screen bg-white flex flex-col justify-between overflow-x-hidden selection:bg-[#0056A7]/10 selection:text-[#0056A7]">
      <Helmet prioritizeSeoTags>
        <title>404 - Page Not Found | NebulaSafeTech</title>
        <meta name="robots" content="noindex, follow" />
        <meta
          name="description"
          content="The requested page could not be found or may have moved. Return to the NebulaSafeTech homepage or explore our cybersecurity, web development, and educational technology services."
        />
      </Helmet>

      <TopNav />

      <main
        id="main-content"
        className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 md:pt-40 pb-16 sm:pb-24 flex flex-col items-center justify-center text-center relative z-10"
      >
        {/* Subtle background radar/signal grid */}
        <div
          className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center overflow-hidden"
          aria-hidden="true"
        >
          <div className="w-[320px] sm:w-[540px] md:w-[720px] h-[320px] sm:h-[540px] md:h-[720px] rounded-full border border-slate-100/80 absolute" />
          <div className="w-[480px] sm:w-[760px] md:w-[960px] h-[480px] sm:h-[760px] md:h-[960px] rounded-full border border-dashed border-slate-100/60 absolute" />
          <div
            className="w-full h-full max-w-4xl max-h-[600px] opacity-40 blur-3xl absolute"
            style={{
              background:
                "radial-gradient(ellipse at 50% 40%, rgba(0, 86, 167, 0.08) 0%, rgba(255, 255, 255, 0) 70%)",
            }}
          />
        </div>

        {/* Status Eyebrow Badge */}
        <motion.div
          custom={0}
          initial={motionEnabled ? "hidden" : "visible"}
          animate="visible"
          variants={fadeUp}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold tracking-wider uppercase bg-slate-50 text-slate-700 border border-slate-200 shadow-xs mb-6"
        >
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
          </span>
          <span>404 · ROUTE NOT FOUND</span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-400 font-normal">SIGNAL LOST</span>
        </motion.div>

        {/* 404 Typographic Focal Point + Signal Disruption Illustration */}
        <motion.div
          custom={1}
          initial={motionEnabled ? "hidden" : "visible"}
          animate="visible"
          variants={fadeUp}
          className="w-full max-w-2xl mx-auto mb-6 flex flex-col items-center"
        >
          {/* Large Stylized 404 Display */}
          <div className="flex items-center justify-center gap-3 sm:gap-6 select-none leading-none mb-3">
            <span className="font-heading font-black text-6xl sm:text-8xl md:text-9xl text-slate-900 tracking-tighter">
              4
            </span>

            {/* Central Signal Disruption Icon / Gateway */}
            <div
              className="relative w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-2xl sm:rounded-3xl bg-slate-50 border border-slate-200/90 flex items-center justify-center shadow-xs overflow-hidden group"
              title="Disrupted Signal Gateway"
            >
              <div
                className="absolute inset-0 bg-gradient-to-b from-[#0056A7]/5 to-transparent"
                aria-hidden="true"
              />
              <Radio
                className="w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 text-[#0056A7] transition-transform duration-300 group-hover:scale-105"
                strokeWidth={1.75}
                aria-hidden="true"
              />
              {/* Broken connection slash indicator */}
              <div
                className="absolute inset-x-2 top-1/2 h-0.5 bg-rose-500/80 -rotate-45 transform origin-center shadow-xs"
                aria-hidden="true"
              />
            </div>

            <span className="font-heading font-black text-6xl sm:text-8xl md:text-9xl text-slate-900 tracking-tighter">
              4
            </span>
          </div>

          {/* Inline SVG: Cyber Disrupted Signal Path Diagram */}
          <div className="w-full max-w-lg px-2 sm:px-4 py-2" aria-hidden="true">
            <svg
              viewBox="0 0 520 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto text-slate-300"
            >
              {/* Background telemetry ruler */}
              <line
                x1="20"
                y1="40"
                x2="500"
                y2="40"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="2 4"
                strokeOpacity="0.6"
              />

              {/* Node 1: Origin Terminal */}
              <circle cx="40" cy="40" r="10" fill="#FFFFFF" stroke="#0056A7" strokeWidth="2.5" />
              <circle cx="40" cy="40" r="4" fill="#0056A7" />
              <text
                x="40"
                y="64"
                textAnchor="middle"
                fill="#64748B"
                fontSize="9"
                fontFamily="monospace"
                fontWeight="600"
              >
                ORIGIN:CLIENT
              </text>

              {/* Transmitting Signal Trace */}
              <path
                d="M 52 40 H 160 L 180 24 H 220 L 235 40 H 250"
                stroke="#0056A7"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Disruption Breach Gap with Warning Markers */}
              <circle cx="262" cy="40" r="4" fill="#F43F5E" />
              <path
                d="M 268 34 L 276 46 M 276 34 L 268 46"
                stroke="#F43F5E"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <text
                x="272"
                y="64"
                textAnchor="middle"
                fill="#E11D48"
                fontSize="8.5"
                fontFamily="monospace"
                fontWeight="700"
              >
                GAP // 0x404
              </text>

              {/* Broken / Disconnected Downstream Path */}
              <path
                d="M 292 40 H 340 L 355 54 H 400 L 415 40 H 468"
                stroke="#94A3B8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="4 5"
                strokeOpacity="0.8"
              />

              {/* Node 2: Unreachable Terminal */}
              <circle
                cx="480"
                cy="40"
                r="10"
                fill="#F8FAFC"
                stroke="#94A3B8"
                strokeWidth="2"
                strokeDasharray="3 3"
              />
              <line x1="475" y1="35" x2="485" y2="45" stroke="#94A3B8" strokeWidth="1.75" />
              <line x1="485" y1="35" x2="475" y2="45" stroke="#94A3B8" strokeWidth="1.75" />
              <text
                x="480"
                y="64"
                textAnchor="middle"
                fill="#94A3B8"
                fontSize="9"
                fontFamily="monospace"
                fontWeight="600"
              >
                DEST:UNREACHABLE
              </text>
            </svg>
          </div>
        </motion.div>

        {/* Headline & Supporting Copy */}
        <motion.div
          custom={2}
          initial={motionEnabled ? "hidden" : "visible"}
          animate="visible"
          variants={fadeUp}
          className="max-w-xl mx-auto"
        >
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-slate-900 tracking-tight mb-3">
            This signal has{" "}
            <span className="text-[#0056A7]">no destination.</span>
          </h1>
          <p className="font-body text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
            The requested route could not be resolved or may have been permanently relocated.
            Verify the web address or re-route your session using the verified pathways below.
          </p>
        </motion.div>

        {/* Primary & Secondary Call To Actions */}
        <motion.div
          custom={3}
          initial={motionEnabled ? "hidden" : "visible"}
          animate="visible"
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full max-w-md mx-auto mb-10"
        >
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#0056A7] text-white font-semibold text-sm hover:bg-[#004282] active:bg-[#00366b] transition-all duration-200 shadow-sm hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0056A7] group"
          >
            <ArrowLeft
              className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1"
              aria-hidden="true"
            />
            <span>Return Home</span>
          </Link>

          <Link
            to="/services"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-800 font-semibold text-sm hover:bg-slate-50 hover:border-slate-300 active:bg-slate-100 transition-all duration-200 shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400 group"
          >
            <Shield className="w-4 h-4 text-[#0056A7]" aria-hidden="true" />
            <span>Explore Services</span>
          </Link>
        </motion.div>

        {/* Contextual Quick Links: Popular Pathways */}
        <motion.div
          custom={4}
          initial={motionEnabled ? "hidden" : "visible"}
          animate="visible"
          variants={fadeUp}
          className="w-full max-w-2xl pt-6 border-t border-slate-100"
        >
          <p className="text-xs font-mono uppercase tracking-wider text-slate-600 mb-3.5 flex items-center justify-center gap-1.5 font-semibold">
            <CornerDownRight className="w-3.5 h-3.5 text-[#0056A7]" aria-hidden="true" />
            <span>Re-route to trusted destinations</span>
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 text-left">
            <Link
              to="/services/cybersecurity"
              className="group p-2.5 sm:p-3 rounded-lg border border-slate-150 bg-slate-50/50 hover:bg-slate-50 hover:border-[#0056A7]/30 transition-all duration-150 focus-visible:outline-2 focus-visible:outline-[#0056A7]"
            >
              <div className="flex items-center gap-2 text-slate-900 font-semibold text-xs mb-0.5 group-hover:text-[#0056A7] transition-colors">
                <Shield className="w-3.5 h-3.5 text-[#0056A7] shrink-0" aria-hidden="true" />
                <span className="truncate">Cybersecurity</span>
              </div>
              <p className="text-[11px] text-slate-600 line-clamp-1">VAPT & Assessments</p>
            </Link>

            <Link
              to="/blogs"
              className="group p-2.5 sm:p-3 rounded-lg border border-slate-150 bg-slate-50/50 hover:bg-slate-50 hover:border-[#0056A7]/30 transition-all duration-150 focus-visible:outline-2 focus-visible:outline-[#0056A7]"
            >
              <div className="flex items-center gap-2 text-slate-900 font-semibold text-xs mb-0.5 group-hover:text-[#0056A7] transition-colors">
                <FileText className="w-3.5 h-3.5 text-[#0056A7] shrink-0" aria-hidden="true" />
                <span className="truncate">Tech Blog</span>
              </div>
              <p className="text-[11px] text-slate-600 line-clamp-1">Research & Insights</p>
            </Link>

            <Link
              to="/edtech"
              className="group p-2.5 sm:p-3 rounded-lg border border-slate-150 bg-slate-50/50 hover:bg-slate-50 hover:border-[#0056A7]/30 transition-all duration-150 focus-visible:outline-2 focus-visible:outline-[#0056A7]"
            >
              <div className="flex items-center gap-2 text-slate-900 font-semibold text-xs mb-0.5 group-hover:text-[#0056A7] transition-colors">
                <GraduationCap className="w-3.5 h-3.5 text-[#0056A7] shrink-0" aria-hidden="true" />
                <span className="truncate">EdTech</span>
              </div>
              <p className="text-[11px] text-slate-600 line-clamp-1">Training & Labs</p>
            </Link>

            <Link
              to="/#contact"
              className="group p-2.5 sm:p-3 rounded-lg border border-slate-150 bg-slate-50/50 hover:bg-slate-50 hover:border-[#0056A7]/30 transition-all duration-150 focus-visible:outline-2 focus-visible:outline-[#0056A7]"
            >
              <div className="flex items-center gap-2 text-slate-900 font-semibold text-xs mb-0.5 group-hover:text-[#0056A7] transition-colors">
                <Mail className="w-3.5 h-3.5 text-[#0056A7] shrink-0" aria-hidden="true" />
                <span className="truncate">Contact</span>
              </div>
              <p className="text-[11px] text-slate-600 line-clamp-1">Get in Touch</p>
            </Link>
          </div>
        </motion.div>
      </main>

      <FooterSection />
    </div>
  );
}
