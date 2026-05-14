import { useState, useEffect, useRef } from "react";

import { motion, AnimatePresence, Variants } from "motion/react";
import svgPaths from "../../imports/NstWebsiteV2Clients/svg-k9jt45kpig";
import FooterSection from "../components/FooterSection";
import AnimatedNumber from "../components/AnimatedNumber";

import TopNav from "../components/TopNav";
import ScrollToTop from "../components/ScrollToTop";
import { enableSmoothScroll, resetScrollBehavior, scrollToTopInstant } from "../utils/scroll";

/* â”€â”€ Image assets â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
import imgImage1    from "../../assets/testimonial-st-joseph-1.png";
import imgCard1     from "../../assets/testimonial-cppm-college.png";
import imgCard2     from "../../assets/testimonial-st-joseph-2.png";
import img49        from "../../assets/testimonial-st-joseph-mou.png";
import img51        from "../../assets/testimonial-tn-police.png";
import img64432110  from "../../assets/testimonial-dhanalakshmi-mou.png";

/* -- Partner Logos -- */
import logoThirukkural from "../../assets/logo-thirukkural-transport.png";
import logoStJoseph    from "../../assets/logo-st-joseph-college.png";
import logoSolamalai   from "../../assets/logo-solamalai-college.png";
import logoDhanalakshmi from "../../assets/logo-dhanalakshmi-srinivasan.png";
import logoAkshaya     from "../../assets/logo-akshaya-college.png";
import logoNsr         from "../../assets/logo-nsr.png";
import logoSgnl        from "../../assets/logo-sgnl.png";
import logoTwomile     from "../../assets/logo-twomile-heavy-industries.png";
import logoRapido      from "../../assets/logo-rapido.png";
import logoP2Task      from "../../assets/logo-p2task.png";

/* â”€â”€ Client data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
type Category = "All Clients" | "Academic" | "Enterprises";

const allClients = [
  {
    id: 1,
    img: imgImage1,
    institution: "St. Joseph College for Women",
    category: "Academic" as Category,
    label: "Cybersecurity Awareness Program",
    desc: "Happy to conduct a cybersecurity awareness session for students, where we discussed common cyber threats, online safety habits, and simple steps everyone can follow to stay secure in their daily digital life.",
    participants: "250+ Students",
  },
  {
    id: 2,
    img: imgCard1,
    institution: "CPPM College, Hosur",
    category: "Academic" as Category,
    label: "Cybersecurity Awareness Program",
    desc: "Delivered an awareness program focused on digital safety, cyber hygiene, and common mistakes people make online. The session helped students understand how small actions can prevent bigger cyber problems.",
    participants: "250+ Students",
  },
  {
    id: 3,
    img: imgCard2,
    institution: "St. Joseph College for Women",
    category: "Academic" as Category,
    label: "Cybersecurity Awareness Program",
    desc: "Presented a seminar covering the basics of cybersecurity, real-world cyber attack examples, and career paths in the field. The goal was to make cybersecurity easy to understand and relatable for students.",
    participants: "250+ Students",
  },
  {
    id: 4,
    img: img49,
    institution: "St. Joseph College for Women",
    category: "Academic" as Category,
    label: "Cybersecurity Awareness Program",
    desc: "Proud to sign a Memorandum of Understanding to support cybersecurity training, hands-on learning, and collaboration between industry and students for future skill development.",
    participants: "250+ Students",
  },
  {
    id: 5,
    img: img51,
    institution: "Tamil Nadu Police, Hosur",
    category: "Enterprises" as Category,
    label: "Cybersecurity Awareness Program",
    desc: "Conducted a cybersecurity training session for law enforcement personnel, focusing on cybercrime awareness, basic digital investigation concepts, and understanding online threats more effectively.",
    participants: "250+ Students",
  },
  {
    id: 6,
    img: img64432110,
    institution: "Dhanalakshmi Srinivasan College",
    category: "Academic" as Category,
    label: "Cybersecurity Awareness Program",
    desc: "Happy to sign an MoU with Dhanalakshmi Srinivasan College, Perambalur, to promote cybersecurity awareness, practical learning, and industry-focused skill development for students.",
    participants: "250+ Students",
  },
];

/* â”€â”€ Animation variants â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.52, delay: i * 0.1, ease: "easeOut" },
  }),
};

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   HERO â€” "Trusted by Leaders Worldwide"
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function ClientsHero({ activeFilter, setActiveFilter }: {
  activeFilter: Category;
  setActiveFilter: (f: Category) => void;
}) {
  const filters: Category[] = ["All Clients", "Academic", "Enterprises"];

  return (
    <section className="w-full bg-white pt-32 pb-16 px-8 md:px-14 overflow-hidden">
      <div className="max-w-[1440px] mx-auto text-center">
        {/* Label */}
        <motion.p
          variants={fadeUp} initial="hidden" animate="visible" custom={0}
          style={{ fontFamily: 'var(--font-family)', fontWeight: 700, fontSize: "18px", letterSpacing: "1.2px", color: "#015AAA", textTransform: "uppercase", marginBottom: "16px" }}
        >
          Our Client Programs
        </motion.p>

        {/* Heading */}
        <motion.h1
          variants={fadeUp} initial="hidden" animate="visible" custom={1}
          style={{ fontFamily: 'var(--font-family)', fontWeight: 700, fontSize: "clamp(28px,4vw,56px)", letterSpacing: "1.12px", color: "#000", lineHeight: 1.1, marginBottom: "20px" }}
        >
          Empowering People. Strengthening Security.
        </motion.h1>

        {/* Sub-description */}
        <motion.p
          variants={fadeUp} initial="hidden" animate="visible" custom={2}
          style={{ fontFamily: 'var(--font-family)', fontWeight: 500, fontSize: "18px", letterSpacing: "0.4px", color: "#6D6D6D", lineHeight: 1.65, marginBottom: "36px", maxWidth: "700px", margin: "0 auto 36px" }}
        >
          We conduct cybersecurity awareness programs and training sessions that educate, engage, and empower individuals to stay safe in the digital world.
        </motion.p>

        {/* Filter buttons */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="visible" custom={3}
          className="inline-flex items-center justify-center gap-2 flex-wrap rounded-full p-1.5"
          style={{ background: "#f1f5f9", border: "1px solid #dbe5f1" }}
        >
          {filters.map((f) => (
            <motion.button
              key={f}
              onClick={() => setActiveFilter(f)}
              className="px-5 py-2.5 rounded-full cursor-pointer border-none outline-none transition-all duration-250"
              style={{
                fontFamily: 'var(--font-family)',
                fontWeight: 900,
                fontSize: "12px",
                letterSpacing: "0.84px",
                background: activeFilter === f ? "#015AAA" : "transparent",
                color: activeFilter === f ? "#fff" : "#25507f",
                boxShadow:
                  activeFilter === f
                    ? "0 8px 20px rgba(1,90,170,0.28)"
                    : "none",
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
            >
              {f}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   SINGLE CLIENT CARD
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function WavyCheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 15.4998 15.4997" fill="none" className="flex-shrink-0">
      <path d={svgPaths.p37b30500} stroke="#015AAA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function UsersGroupIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24.5 20.75" fill="none">
      <path d={svgPaths.p2510b600} stroke="#015AAA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function ClientCard({ client, index }: { client: typeof allClients[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      layout
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      custom={index % 3}
      className="relative bg-white rounded-[8px] flex flex-col overflow-hidden group"
      style={{ boxShadow: "inset 0px 2px 10px 0px rgba(23,107,240,0.25)" }}
      whileHover={{ y: -6, boxShadow: "inset 0px 2px 10px 0px rgba(23,107,240,0.4), 0 12px 32px rgba(1,90,170,0.13)" }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
    >
      {/* Image area */}
      <div className="relative overflow-hidden rounded-t-[8px]" style={{ height: "220px" }}>
        <motion.img
          src={client.img}
          alt={client.label}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Program label at bottom of image */}
        <div
          className="absolute bottom-0 left-0 right-0 flex items-end justify-center pb-3"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)", height: "80px" }}
        >
          <span style={{ fontFamily: 'var(--font-family)', fontWeight: 900, fontSize: "13px", letterSpacing: "0.78px", color: "#fff", textAlign: "center" }}>
            {client.label}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-col gap-3 p-5 flex-1">
        {/* Institution + verified */}
        <div className="flex items-center gap-2">
          <span style={{ fontFamily: 'var(--font-family)', fontWeight: 700, fontSize: "16px", letterSpacing: "0.32px", color: "#000", lineHeight: 1 }}>
            {client.institution}
          </span>
          <WavyCheckIcon />
        </div>

        {/* Description */}
        <p style={{ fontFamily: 'var(--font-family)', fontWeight: 500, fontSize: "13px", letterSpacing: "0.26px", color: "#6D6D6D", lineHeight: 1.65, margin: 0, flexGrow: 1 }}>
          {client.desc}
        </p>

        {/* Participants badge */}
        <div
          className="self-start flex items-center gap-2 rounded-[8px] px-3 py-2"
          style={{ background: "#fff", boxShadow: "1px 1px 4px 0px rgba(1,90,170,0.25)" }}
        >
          <UsersGroupIcon />
          <div className="flex flex-col gap-0.5">
            <span style={{ fontFamily: 'var(--font-family)', fontWeight: 700, fontSize: "8px", letterSpacing: "0.16px", color: "#015AAA" }}>Participants</span>
            <AnimatedNumber
              value={client.participants}
              style={{ fontFamily: 'var(--font-family)', fontWeight: 700, fontSize: "9px", letterSpacing: "0.36px", color: "#000" }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   CLIENTS GRID
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function ClientsGrid({ activeFilter }: { activeFilter: Category }) {
  const filtered = activeFilter === "All Clients"
    ? allClients
    : allClients.filter((c) => c.category === activeFilter);

  return (
    <section className="w-full px-8 md:px-14 lg:px-20 py-10 overflow-hidden" style={{ background: "#F8FAFE" }}>
      <div className="max-w-[1440px] mx-auto">
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((client, i) => (
                <ClientCard key={client.id} client={client} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center py-24 gap-4"
            >
              <div
                className="flex items-center justify-center rounded-full mb-2"
                style={{ width: 72, height: 72, background: "rgba(1,90,170,0.08)" }}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="#015AAA" strokeWidth="1.5" />
                  <path d="M8 12h8M12 8v8" stroke="#015AAA" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <p style={{ fontFamily: 'var(--font-family)', fontWeight: 700, fontSize: "22px", color: "#000", margin: 0 }}>
                Coming Soon
              </p>
              <p style={{ fontFamily: 'var(--font-family)', fontWeight: 500, fontSize: "16px", color: "#6D6D6D", margin: 0, textAlign: "center", maxWidth: "400px" }}>
                Enterprise client programs are being curated. Check back soon!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   PARTNERS SECTION â€” "Partnering with Leaders Worldwide"
â•â•â•â•â••â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function PartnersSection() {
  const partners = [
    { logo: logoThirukkural, alt: "Thirukkural Transport" },
    { logo: logoStJoseph,    alt: "St. Joseph College" },
    { logo: logoSolamalai,   alt: "Solamalai College" },
    { logo: logoDhanalakshmi, alt: "Dhanalakshmi Srinivasan College" },
    { logo: logoAkshaya,     alt: "Akshaya College" },
    { logo: logoNsr,         alt: "NSR" },
    { logo: logoSgnl,        alt: "SGNL" },
    { logo: logoTwomile,     alt: "Twomile Heavy Industries" },
    { logo: logoRapido,      alt: "Rapido" },
    { logo: logoP2Task,      alt: "P2Task" },
  ];

  return (
    <section className="w-full bg-white py-20 px-8 md:px-14 lg:px-20 overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        {/* Label */}
        <motion.p
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}
          className="text-[#015AAA] font-bold text-[14px] tracking-[0.05em] uppercase mb-4"
          style={{ fontFamily: 'var(--font-family)' }}
        >
          Trusted by Industry & Academia
        </motion.p>

        {/* Heading */}
        <motion.h2
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
          className="text-gray-900 font-bold text-4xl md:text-5xl mb-6"
          style={{ fontFamily: 'var(--font-family)', letterSpacing: "-0.02em" }}
        >
          Partnering with Leaders Worldwide
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}
          className="text-gray-500 font-medium text-lg max-w-3xl mb-16 leading-relaxed"
          style={{ fontFamily: 'var(--font-family)' }}
        >
          We are proud to work with innovative companies and academic institutions that trust us to secure their digital future.
        </motion.p>

        {/* Logo Grid */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={index % 6}
              className="w-[180px] h-[120px] md:w-[200px] md:h-[140px] bg-white rounded-2xl flex items-center justify-center p-6 transition-all duration-300 border border-gray-100/50"
              style={{ boxShadow: "0 10px 30px -10px rgba(0,0,0,0.08)" }}
              whileHover={{ y: -5, boxShadow: "0 20px 40px -12px rgba(1,90,170,0.12)" }}
            >
              <img
                src={partner.logo}
                alt={partner.alt}
                className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all duration-500 opacity-80 hover:opacity-100"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   FLOATING STATS BAR (parallax accent)
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function StatsBanner() {
  const stats = [
    { value: "6+",   label: "Partner Institutions" },
    { value: "1000+", label: "Students Trained" },
    { value: "10+",  label: "Programs Delivered" },
    { value: "3",    label: "Sectors Served" },
  ];

  return (
    <motion.section
      className="w-full py-10 px-8 md:px-14 bg-white overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-[1440px] mx-auto">
        <div
          className="rounded-[16px] flex flex-col sm:flex-row items-center justify-around gap-6 py-8 px-10"
          style={{ background: "linear-gradient(105deg, #015AAA 0%, #0e6fca 100%)", boxShadow: "0 8px 40px rgba(1,90,170,0.3)" }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center gap-1"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <AnimatedNumber
                value={s.value}
                style={{ fontFamily: 'var(--font-family)', fontWeight: 700, fontSize: "clamp(28px,3vw,42px)", color: "#fff", letterSpacing: "0.96px" }}
              />
              <span style={{ fontFamily: 'var(--font-family)', fontWeight: 500, fontSize: "15px", color: "rgba(255,255,255,0.75)", letterSpacing: "0.3px" }}>
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   MAIN PAGE
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
export default function ClientsPage() {
  const [activeFilter, setActiveFilter] = useState<Category>("All Clients");

  useEffect(() => {
    scrollToTopInstant();
    enableSmoothScroll();
    return () => { resetScrollBehavior(); };
  }, []);

  return (
    <div className="w-full min-h-screen bg-white overflow-x-hidden">
      <TopNav />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <ClientsHero activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
        <ClientsGrid activeFilter={activeFilter} />
        <PartnersSection />
        <StatsBanner />
        <FooterSection />
        <ScrollToTop />
      </motion.div>
    </div>
  );
}

