import { useState, useEffect, useRef } from "react";

import { motion, AnimatePresence, Variants } from "motion/react";
import svgPaths from "../../imports/NstWebsiteV2Clients/svg-k9jt45kpig";
import FooterSection from "../components/FooterSection";
import AnimatedNumber from "../components/AnimatedNumber";

import TopNav from "../components/TopNav";
import ScrollToTop from "../components/ScrollToTop";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { SeoHead } from "../../seo/SeoHead";
import { CLIENTS_SEO } from "../../seo/pageMeta";
import { enableSmoothScroll, resetScrollBehavior, scrollToTopInstant } from "../utils/scroll";
import { PAGE_BREADCRUMBS, pageBreadcrumbJsonLd } from "../utils/pageBreadcrumbs";

import { ResponsivePicture } from "../components/ResponsivePicture";
import type { MediaSlug } from "../utils/media";
import {
  CLIENT_IMPACT_STATS,
  CLIENT_PROGRAMS,
  type ClientCategory,
} from "../data/clientsData";

type Category = ClientCategory;

const allClients = CLIENT_PROGRAMS;

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.52, delay: i * 0.1, ease: "easeOut" },
  }),
};

function ClientsHero({ activeFilter, setActiveFilter }: {
  activeFilter: Category;
  setActiveFilter: (f: Category) => void;
}) {
  const filters: Category[] = ["All Clients", "Academic", "Enterprises"];

  return (
    <section className="w-full bg-white pt-32 pb-16 px-8 md:px-14 overflow-hidden">
      <motion.div className="max-w-[1440px] mx-auto text-center">
        <Breadcrumbs className="mb-6 text-left" items={[...PAGE_BREADCRUMBS.testimonials]} />

        <motion.p
          variants={fadeUp} initial="hidden" animate="visible" custom={0}
          style={{ fontFamily: 'var(--font-family)', fontWeight: 700, fontSize: "18px", letterSpacing: "1.2px", color: "#015AAA", textTransform: "uppercase", marginBottom: "16px" }}
        >
          Our Client Programs
        </motion.p>

        <motion.h1
          variants={fadeUp} initial="hidden" animate="visible" custom={1}
          style={{ fontFamily: 'var(--font-family)', fontWeight: 700, fontSize: "clamp(28px,4vw,56px)", letterSpacing: "1.12px", color: "#000", lineHeight: 1.1, marginBottom: "20px" }}
        >
          Empowering People. Strengthening Security.
        </motion.h1>

        <motion.p
          variants={fadeUp} initial="hidden" animate="visible" custom={2}
          style={{ fontFamily: 'var(--font-family)', fontWeight: 500, fontSize: "18px", letterSpacing: "0.4px", color: "#6D6D6D", lineHeight: 1.65, marginBottom: "36px", maxWidth: "700px", margin: "0 auto 36px" }}
        >
          We conduct cybersecurity awareness programs and training sessions that educate, engage, and empower individuals to stay safe in the digital world.
        </motion.p>

        <motion.div
          variants={fadeUp} initial="hidden" animate="visible" custom={3}
          className="inline-flex items-center justify-center gap-2 flex-wrap rounded-full p-1.5"
          style={{ background: "#f1f5f9", border: "1px solid #dbe5f1" }}
        >
          {filters.map((f) => (
            <motion.button
              key={f}
              type="button"
              aria-pressed={activeFilter === f}
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
      </motion.div>
    </section>
  );
}

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

      <div className="relative overflow-hidden rounded-t-[8px] bg-slate-100 aspect-[16/10] max-h-[260px]">
        <ResponsivePicture
          slug={client.mediaSlug}
          alt={`${client.institution} - ${client.label}`}
          className="absolute inset-0 w-full h-full object-cover object-[center_25%]"
          profile="testimonial"
          sizes="(max-width: 768px) 100vw, 400px"
        />

        <div
          className="absolute bottom-0 left-0 right-0 flex items-end justify-center pb-3"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)", height: "80px" }}
        >
          <span style={{ fontFamily: 'var(--font-family)', fontWeight: 900, fontSize: "13px", letterSpacing: "0.78px", color: "#fff", textAlign: "center" }}>
            {client.label}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3 p-5 sm:p-6 flex-1">

        <div className="flex items-center gap-2 flex-wrap min-w-0">
          <span style={{ fontFamily: 'var(--font-family)', fontWeight: 700, fontSize: "16px", letterSpacing: "0.32px", color: "#000", lineHeight: 1.2 }}>
            {client.institution}
          </span>
          <WavyCheckIcon />
        </div>

        <p style={{ fontFamily: 'var(--font-family)', fontWeight: 500, fontSize: "13px", letterSpacing: "0.26px", color: "#6D6D6D", lineHeight: 1.65, margin: 0, flexGrow: 1 }}>
          {client.desc}
        </p>

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

function PartnersSection() {
  const partners: { mediaSlug: MediaSlug; alt: string }[] = [
    { mediaSlug: "logo-thirukkural-transport", alt: "Thirukkural Transport" },
    { mediaSlug: "logo-st-joseph-college", alt: "St. Joseph College" },
    { mediaSlug: "logo-solamalai-college", alt: "Solamalai College" },
    { mediaSlug: "logo-dhanalakshmi-srinivasan", alt: "Dhanalakshmi Srinivasan College" },
    { mediaSlug: "logo-akshaya-college", alt: "Akshaya College" },
    { mediaSlug: "logo-nsr", alt: "NSR" },
    { mediaSlug: "logo-sgnl", alt: "SGNL" },
    { mediaSlug: "logo-twomile-heavy-industries", alt: "Twomile Heavy Industries" },
    { mediaSlug: "logo-rapido", alt: "Rapido" },
    { mediaSlug: "logo-p2task", alt: "P2Task" },
  ];

  return (
    <section className="w-full bg-white py-20 px-8 md:px-14 lg:px-20 overflow-hidden">
      <div className="max-w-[1440px] mx-auto">

        <motion.p
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}
          className="text-[#015AAA] font-bold text-[14px] tracking-[0.05em] uppercase mb-4"
          style={{ fontFamily: 'var(--font-family)' }}
        >
          Trusted by Industry & Academia
        </motion.p>

        <motion.h2
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
          className="text-gray-900 font-bold text-4xl md:text-5xl mb-6"
          style={{ fontFamily: 'var(--font-family)', letterSpacing: "-0.02em" }}
        >
          Partnering with Leaders Worldwide
        </motion.h2>

        <motion.p
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}
          className="text-gray-500 font-medium text-lg max-w-3xl mb-16 leading-relaxed"
          style={{ fontFamily: 'var(--font-family)' }}
        >
          We are proud to work with innovative companies and academic institutions that trust us to secure their digital future.
        </motion.p>

        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={index % 6}
              className="w-[180px] h-[120px] md:w-[200px] md:h-[140px] bg-white rounded-2xl flex items-center justify-center p-6 transition-all duration-300 border border-gray-100/50"
              style={{ boxShadow: "0 10px 30px -10px rgba(0,0,0,0.08)" }}
              whileHover={{ y: -5, boxShadow: "0 20px 40px -12px rgba(1,90,170,0.12)" }}
            >
              <ResponsivePicture
                slug={partner.mediaSlug}
                alt={partner.alt}
                className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all duration-500 opacity-80 hover:opacity-100"
                profile="logo"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsBanner() {
  const stats = CLIENT_IMPACT_STATS.map((s) => ({
    value: s.value,
    label: s.label,
  }));

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

export default function ClientsPage() {
  const [activeFilter, setActiveFilter] = useState<Category>("All Clients");

  useEffect(() => {
    scrollToTopInstant();
    enableSmoothScroll();
    return () => { resetScrollBehavior(); };
  }, []);

  return (
    <div className="w-full min-h-screen bg-white overflow-x-hidden">
      <SeoHead meta={CLIENTS_SEO} structuredData={pageBreadcrumbJsonLd(PAGE_BREADCRUMBS.testimonials)} />
      <TopNav />

      <main id="main-content">
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
      </main>
    </div>
  );
}
