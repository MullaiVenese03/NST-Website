import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router";
import { motion } from "motion/react";
import { Phone, Mail, MapPin, ArrowRight, Linkedin, Instagram, Twitter, type LucideIcon } from "lucide-react";
import { BUSINESS_IDENTITY } from "../../seo/seoConfig";

const FOOTER_SERVICES = [
  { label: "All Services", path: "/services" },
  { label: "Cybersecurity Services", path: "/services/cybersecurity" },
  { label: "Full-Stack Web Development", path: "/services/web-development" },
  { label: "UI/UX Design Services", path: "/services/ui-ux-design" },
  { label: "EdTech & Cybersecurity Training", path: "/services/edtech-training" },
] as const;

const FOOTER_SERVICE_SELECT_OPTIONS = FOOTER_SERVICES.filter((s) => s.path !== "/services");

function footerServiceForPath(pathname: string): string {
  const match = FOOTER_SERVICES.find((s) => s.path === pathname);
  if (!match || match.path === "/services") return "";
  return match.label;
}

function FooterNavLink({ to, children }: { to: string; children: React.ReactNode }) {
  const handleHashClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!to.startsWith("#")) return;
    e.preventDefault();
    const id = to.slice(1);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.location.href = `/${to}`;
    }
  };

  const className =
    "block no-underline text-[15px] font-medium text-slate-700 hover:text-[#015AAA] transition-colors duration-200";

  if (to.startsWith("#")) {
    return (
      <motion.a
        href={to}
        onClick={handleHashClick}
        className={className}
        whileHover={{ x: 2 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.div whileHover={{ x: 2 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}>
      <Link to={to} className={className}>
        {children}
      </Link>
    </motion.div>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  href: string;
}) {
  const isExternal = href.startsWith("http");

  return (
    <motion.a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="group flex items-center gap-4 rounded-xl px-3 py-2.5 -mx-3 no-underline border border-transparent hover:border-[#015AAA]/15 hover:bg-[#015AAA]/5 transition-all duration-250"
      whileHover={{ x: 2 }}
      transition={{ type: "spring", stiffness: 420, damping: 26 }}
      aria-label={`${label}: ${value}`}
    >
      <motion.div className="w-10 h-10 rounded-lg bg-[#015AAA]/10 flex items-center justify-center text-[#015AAA] shrink-0 transition-colors duration-250 group-hover:bg-[#015AAA] group-hover:text-white">
        <Icon size={20} />
      </motion.div>
      <motion.div className="min-w-0">
        <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1 transition-colors duration-250 group-hover:text-[#015AAA]">
          {label}
        </p>
        <span className="text-[14px] font-semibold text-slate-800 transition-colors duration-250 group-hover:text-[#015AAA] break-words">
          {value}
        </span>
      </motion.div>
    </motion.a>
  );
}

function SocialBtn({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex items-center justify-center rounded-full bg-[#015AAA]/10 w-11 h-11 min-w-[44px] min-h-[44px] text-[#015AAA] hover:bg-[#015AAA] hover:text-white transition-colors duration-200"
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.a>
  );
}

export default function FooterSection() {
  const { pathname } = useLocation();
  const serviceFromRoute = useMemo(() => footerServiceForPath(pathname), [pathname]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (serviceFromRoute) {
      setForm((prev) => ({ ...prev, service: serviceFromRoute }));
    }
  }, [serviceFromRoute]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: "", email: "", phone: "", service: serviceFromRoute, message: "" });
  };

  return (
    <footer id="contact" className="w-full bg-white pt-12 sm:pt-16 lg:pt-20 overflow-x-clip scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 sm:gap-12 lg:gap-16 items-start">
          <motion.div className="space-y-4 sm:space-y-5">
            <div className="space-y-3 sm:space-y-4">
              <p className="text-[#015AAA] text-sm sm:text-base font-bold uppercase tracking-wider m-0">Get In Touch</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight m-0">Let&apos;s secure your world.</h2>
              <p className="text-slate-600 text-sm leading-relaxed m-0 max-w-sm">{BUSINESS_IDENTITY}</p>
            </div>

            <motion.div className="space-y-3 sm:space-y-4">
              <ContactRow icon={Phone} label="Phone" value="+91 63810 13086" href="tel:+916381013086" />
              <ContactRow icon={Mail} label="Email" value="info@nebulasafetech.com" href="mailto:info@nebulasafetech.com" />
              <ContactRow icon={MapPin} label="Address" value="Hosur, Tamil Nadu, India." href="https://maps.google.com/?q=Hosur,Tamil+Nadu,India" />
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-2 py-2 pb-10 sm:pb-12 lg:pb-14 min-w-0">
            <motion.div className="flex flex-col gap-5 sm:gap-6 min-w-0">
              <p className="text-base sm:text-lg font-bold text-slate-900 m-0">Company</p>
              <nav className="flex flex-col gap-3.5 sm:gap-4" aria-label="Company">
                <FooterNavLink to="/">Home</FooterNavLink>
                <FooterNavLink to="/about">About Us</FooterNavLink>
                <FooterNavLink to="/services">Services</FooterNavLink>
                <FooterNavLink to="/clients">Clients</FooterNavLink>
                <FooterNavLink to="/edtech">EdTech</FooterNavLink>
                {/* TEMPORARILY DISABLED - NEX footer link will be re-enabled after project completion */}
                {/* <FooterNavLink to="/#nex">NEX</FooterNavLink> */}
              </nav>
            </motion.div>

            <div className="flex flex-col gap-5 sm:gap-6 min-w-0">
              <p className="text-base sm:text-lg font-bold text-slate-900 m-0">Services</p>
              <nav className="flex flex-col gap-3.5 sm:gap-4" aria-label="Services">
                {FOOTER_SERVICES.map((service) => (
                  <FooterNavLink key={service.path} to={service.path}>
                    {service.label}
                  </FooterNavLink>
                ))}
              </nav>
            </div>
          </div>

          <motion.div className="min-w-0">
            <div className="bg-white rounded-2xl border border-slate-100 p-2 sm:p-3">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-12 h-12 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-4">
                    <ArrowRight size={20} />
                  </div>
                  <p className="text-slate-900 font-bold">Message Sent!</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    name="name"
                    type="text"
                    placeholder="Name"
                    required
                    autoComplete="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#015AAA] transition-all placeholder:text-slate-400"
                  />
                  <input
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#015AAA] transition-all placeholder:text-slate-400"
                  />
                  <input
                    name="phone"
                    type="tel"
                    placeholder="Phone Number"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#015AAA] transition-all placeholder:text-slate-400"
                  />
                  <label htmlFor="footer-service" className="sr-only">
                    Service
                  </label>
                  <select
                    id="footer-service"
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#015AAA] transition-all text-slate-900 appearance-none"
                  >
                    <option value="">Select a service</option>
                    {FOOTER_SERVICE_SELECT_OPTIONS.map((option) => (
                      <option key={option.path} value={option.label}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <textarea
                    name="message"
                    placeholder="How can we help ?"
                    required
                    rows={4}
                    autoComplete="off"
                    value={form.message}
                    onChange={handleChange}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#015AAA] transition-all resize-none placeholder:text-slate-400"
                  />
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-[#015AAA] text-white font-semibold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-100/50 min-h-[44px]"
                  >
                    Send Message
                    <ArrowRight size={16} />
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>

        {/* NST brand watermark — Overcame Demo via --font-company, scales with viewport */}
        <div
          className="relative min-h-50 max-h-100 w-full overflow-hidden pointer-events-none select-none flex items-end justify-center"
          aria-hidden  
        >
          <p
            className="font-black text-center m-0 w-full max-w-[100vw] px-1"
            style={{
              fontSize: "clamp(10rem, 36vw, 32rem)",
              fontFamily: "var(--font-company)",
              fontWeight: 900,
              fontSynthesis: "none",
              background: "linear-gradient(to top, #030108 0%, #015AAA 50%, #FFF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "0.33em",
            }}
            role="img"
            aria-label="NST"
          >
            NST
          </p>
        </div>

        <div className="pt-3 sm:pt-4 pb-8 md:pb-32 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6 border-b-2 border-b-blue-500">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-center sm:text-left">
            <p className="text-slate-500 text-sm m-0">
              Copyright &copy; 2026{" "}
              <span className="text-blue-500" style={{ fontFamily: "var(--font-company)" }}>
                NebulaSafeTech
              </span>
              . All Rights Reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-sm">
              <Link to="/privacy-policy" className="text-slate-600 hover:text-[#015AAA] no-underline font-medium transition-colors">
                Privacy Policy
              </Link>
              <span className="text-slate-300 hidden sm:inline" aria-hidden>
                |
              </span>
              <Link to="/terms-and-conditions" className="text-slate-600 hover:text-[#015AAA] no-underline font-medium transition-colors">
                Terms & Conditions
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4">
            <SocialBtn href="https://linkedin.com/company/nebulasafetech-nst/" label="LinkedIn">
              <Linkedin size={20} strokeWidth={2} aria-hidden />
            </SocialBtn>
            <SocialBtn href="https://instagram.com/nebulasafetech" label="Instagram">
              <Instagram size={20} strokeWidth={2} aria-hidden />
            </SocialBtn>
            <SocialBtn href="https://twitter.com/nebulasafetech" label="Twitter">
              <Twitter size={20} strokeWidth={2} aria-hidden />
            </SocialBtn>
          </div>
        </div>
      </div>


    </footer>
  );
}
