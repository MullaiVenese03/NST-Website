import { useState } from "react";
import { motion } from "motion/react";
import { Linkedin, Instagram, Twitter } from "lucide-react";
import svgPaths from "../../imports/ContactSection/svg-yjak0m19hy";

/* ─── Contact icon components ─────────────────────────────────────────── */
function PhoneIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 16.9886 16.9886" fill="none">
      <clipPath id="ph-clip"><rect width="16.9886" height="16.9886" fill="white" /></clipPath>
      <g clipPath="url(#ph-clip)">
        <path d={svgPaths.p38cff680} stroke="#015AAA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.23875" />
      </g>
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 16.9886 16.9886" fill="none">
      <clipPath id="em-clip"><rect width="16.9886" height="16.9886" fill="white" /></clipPath>
      <g clipPath="url(#em-clip)">
        <path d={svgPaths.p2778cf70} stroke="#015AAA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.23875" />
        {/* Envelope V-fold */}
        <path d="M1.41797 4.24775L8.49665 9.49491L15.5751 4.24775" stroke="#015AAA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.23875" />
      </g>
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 16.9886 16.9886" fill="none">
      <clipPath id="mp-clip"><rect width="16.9886" height="16.9886" fill="white" /></clipPath>
      <g clipPath="url(#mp-clip)">
        <path d={svgPaths.p1044a680} stroke="#015AAA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.23875" />
        <path d={svgPaths.p6493c80} stroke="#015AAA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.23875" />
      </g>
    </svg>
  );
}

/* ─── Send arrow ───────────────────────────────────────────────────────── */
function SendArrow() {
  return (
    <svg width="11" height="14" viewBox="0 0 11 18" fill="none">
      <path d={svgPaths.p37eb0d80} stroke="white" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─── Icon badge ───────────────────────────────────────────────────────── */
function IconBadge({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex-shrink-0 flex items-center justify-center rounded-[14px]"
      style={{
        width: 44,
        height: 44,
        background: "rgba(1,90,170,0.12)",
        border: "0.9px solid rgba(1,90,170,0.18)",
      }}
    >
      {children}
    </div>
  );
}

/* ─── Contact link row ─────────────────────────────────────────────────── */
function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <motion.a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="flex items-center gap-4 group no-underline"
      whileHover={{ x: 4 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <motion.div
        className="flex-shrink-0"
        whileHover={{ scale: 1.08 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        <IconBadge>{icon}</IconBadge>
      </motion.div>
      <div className="flex flex-col gap-[2px]">
        <p
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 700,
            fontSize: "10.4px",
            letterSpacing: "1.664px",
            color: "#6b6b8a",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          {label}
        </p>
        <p
          className="transition-colors duration-200 group-hover:text-[#015AAA]"
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 500,
            fontSize: "13.92px",
            color: "#0d0c22",
            margin: 0,
            lineHeight: "20.88px",
          }}
        >
          {value}
        </p>
      </div>
    </motion.a>
  );
}

/* ─── Nav link ─────────────────────────────────────────────────────────── */
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const id = href.slice(1);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        // Element not on current page — navigate home then jump to anchor
        window.location.href = `/${href}`;
      }
    }
  };

  return (
    <motion.a
      href={href}
      onClick={handleClick}
      className="block no-underline group relative w-fit cursor-pointer"
      whileHover={{ x: 3 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      style={{
        fontFamily: "'Geist', sans-serif",
        fontWeight: 400,
        fontSize: "18px",
        letterSpacing: "0.36px",
        color: "#000",
        textDecoration: "none",
      }}
    >
      <span className="transition-colors duration-200 group-hover:text-[#015AAA]">
        {children}
      </span>
      <span
        className="absolute -bottom-0.5 left-0 h-[1.5px] w-0 group-hover:w-full transition-all duration-300"
        style={{ background: "#015AAA" }}
      />
    </motion.a>
  );
}

/* ─── Social button ────────────────────────────────────────────────────── */
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
      className="flex items-center justify-center rounded-[14px] transition-colors duration-200"
      style={{
        width: 36,
        height: 36,
        background: "rgba(1,90,170,0.12)",
        border: "0.9px solid rgba(1,90,170,0.18)",
      }}
      whileHover={{ scale: 1.12, background: "rgba(1,90,170,0.25)" }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
    >
      {children}
    </motion.a>
  );
}

/* ─── Main component ───────────────────────────────────────────────────── */
export default function FooterSection() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <footer
      className="relative w-full overflow-hidden"
      style={{ background: "#f8fafe" }}
    >
      {/* ── Main content ─────────────────────────────────── */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-8 md:px-12 lg:px-16 pt-14">

        {/* Top grid — 5 balanced cols on xl, 2 on md, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[1fr_1px_auto_auto_auto_1fr] gap-y-10 md:gap-x-10 xl:gap-y-0 xl:gap-x-8 xl:items-start">

          {/* Col 1: GET IN TOUCH */}
          <div className="flex flex-col gap-6">
            <div>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: "20px",
                  letterSpacing: "1.2px",
                  color: "#015AAA",
                  textTransform: "uppercase",
                  marginBottom: "10px",
                }}
              >
                Get In Touch
              </p>
              <h3
                style={{
                  fontFamily: "'Geist', sans-serif",
                  fontWeight: 700,
                  fontSize: "32px",
                  letterSpacing: "0.64px",
                  color: "#000",
                  margin: 0,
                  lineHeight: 1.2,
                }}
              >
                Let's secure your world.
              </h3>
            </div>

            <div className="flex flex-col gap-6">
              <ContactRow
                icon={<PhoneIcon />}
                label="Phone"
                value="+91 63810 13086"
                href="tel:+916381013086"
              />
              <ContactRow
                icon={<EmailIcon />}
                label="Email"
                value="info@nebulasafetech.com"
                href="mailto:info@nebulasafetech.com"
              />
              <ContactRow
                icon={<MapPinIcon />}
                label="Address"
                value="Hosur, Tamil Nadu, India."
                href="https://maps.google.com/?q=Hosur,Tamil+Nadu,India"
              />
            </div>
          </div>

          {/* Vertical divider — only xl */}
          <div
            className="hidden xl:block self-stretch"
            style={{ width: "1px", background: "#C6C6C6", margin: "0 8px" }}
          />
          {/* Mobile divider */}
          <div className="block xl:hidden h-[1px] w-full md:col-span-2" style={{ background: "#C6C6C6" }} />

          {/* Col 3: Company */}
          <div className="flex flex-col gap-5">
            <h4
              style={{
                fontFamily: "'Geist', sans-serif",
                fontWeight: 700,
                fontSize: "20px",
                letterSpacing: "0.4px",
                color: "#000",
                margin: 0,
              }}
            >
              Company
            </h4>
            <div className="flex flex-col gap-3">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/about">About</NavLink>
              <NavLink href="/services">Services</NavLink>
              <NavLink href="/clients">Clients</NavLink>
              <NavLink href="/edtech">EdTech</NavLink>
              <NavLink href="/#nex">NEX</NavLink>
            </div>
          </div>

          {/* Col 4: Services */}
          <div className="flex flex-col gap-5">
            <h4
              style={{
                fontFamily: "'Geist', sans-serif",
                fontWeight: 700,
                fontSize: "20px",
                letterSpacing: "0.4px",
                color: "#000",
                margin: 0,
              }}
            >
              Services
            </h4>
            <div className="flex flex-col gap-3">
              <NavLink href="/services">Web Services</NavLink>
              <NavLink href="/services">Security Services</NavLink>
              <NavLink href="/services">Vulnerability Assessment</NavLink>
              <NavLink href="/edtech">EdTech Platform</NavLink>
            </div>
          </div>

          {/* Col 5: Support */}
          <div className="flex flex-col gap-5">
            <h4
              style={{
                fontFamily: "'Geist', sans-serif",
                fontWeight: 700,
                fontSize: "20px",
                letterSpacing: "0.4px",
                color: "#000",
                margin: 0,
              }}
            >
              Support
            </h4>
            <div className="flex flex-col gap-3">
              <NavLink href="#privacy">Privacy Policy</NavLink>
              <NavLink href="#terms">Terms &amp; Conditions</NavLink>
            </div>
          </div>

          {/* Col 6: Contact form */}
          <div className="md:col-span-2 xl:col-span-1 w-full xl:max-w-[300px] xl:justify-self-end">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center gap-3 h-full py-10"
              >
                <div
                  className="flex items-center justify-center rounded-full"
                  style={{ width: 56, height: 56, background: "rgba(1,90,170,0.12)" }}
                >
                  <svg width="26" height="20" viewBox="0 0 26 20" fill="none">
                    <path d="M2 10L9 17L24 2" stroke="#015AAA" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p
                  style={{
                    fontFamily: "'Geist', sans-serif",
                    fontWeight: 700,
                    fontSize: "18px",
                    color: "#015AAA",
                    textAlign: "center",
                  }}
                >
                  Message Sent!
                </p>
                <p
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: "13px",
                    color: "#6d6d6d",
                    textAlign: "center",
                  }}
                >
                  We'll get back to you shortly.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {[
                  { name: "name", placeholder: "Name", type: "text" },
                  { name: "email", placeholder: "Email Address", type: "email" },
                  { name: "phone", placeholder: "Phone Number", type: "tel" },
                ].map((field) => (
                  <motion.input
                    key={field.name}
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={form[field.name as keyof typeof form]}
                    onChange={handleChange}
                    required={field.name !== "phone"}
                    whileFocus={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="w-full outline-none transition-all duration-200"
                    style={{
                      height: 50,
                      borderRadius: 8,
                      border: "1px solid #C6C6C6",
                      padding: "0 20px",
                      fontFamily: "'Manrope', sans-serif",
                      fontWeight: 700,
                      fontSize: 12,
                      letterSpacing: "0.24px",
                      color: "#6d6d6d",
                      background: "#fff",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#015AAA")}
                    onBlur={(e) => (e.target.style.borderColor = "#C6C6C6")}
                  />
                ))}

                <motion.textarea
                  name="message"
                  placeholder="How can we help ?"
                  value={form.message}
                  onChange={handleChange}
                  required
                  whileFocus={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="w-full outline-none resize-none transition-all duration-200"
                  style={{
                    height: 100,
                    borderRadius: 8,
                    border: "1px solid #C6C6C6",
                    padding: "10px 20px",
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 700,
                    fontSize: 12,
                    letterSpacing: "0.72px",
                    color: "#6d6d6d",
                    background: "#fff",
                    lineHeight: 1.6,
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#015AAA")}
                  onBlur={(e) => (e.target.style.borderColor = "#C6C6C6")}
                />

                <motion.button
                  type="submit"
                  className="flex items-center justify-center gap-4 rounded-[8px] w-full"
                  style={{
                    background: "#015AAA",
                    height: 42,
                    fontFamily: "'Satoshi', sans-serif",
                    fontWeight: 700,
                    fontSize: 12,
                    letterSpacing: "0.24px",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                  }}
                  whileHover={{ scale: 1.02, background: "#0168C4" }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  Send Message
                  <SendArrow />
                </motion.button>
              </form>
            )}
          </div>
        </div>

        {/* ── Bottom bar ──────────────────────────────────── */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10 pt-5 pb-6"
          style={{ borderTop: "1px solid #e5e7eb" }}
        >
          <p
            style={{
              fontFamily: "'Geist', sans-serif",
              fontWeight: 300,
              fontSize: 16,
              letterSpacing: "0.32px",
              color: "#6d6d6d",
              margin: 0,
            }}
          >
            Copyright &copy; 2026 <span style={{ fontFamily: "'Overcame Demo', sans-serif" }}>NebulaSafeTech</span>. All Rights Reserved.
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            <SocialBtn href="https://linkedin.com/company/nebulasafetech-nst/" label="LinkedIn">
              <Linkedin size={14} color="#015AAA" strokeWidth={2} style={{ opacity: 0.65 }} />
            </SocialBtn>
            <SocialBtn href="https://instagram.com/nebulasafetech" label="Instagram">
              <Instagram size={14} color="#015AAA" strokeWidth={2} style={{ opacity: 0.65 }} />
            </SocialBtn>
            <SocialBtn href="https://twitter.com/nebulasafetech" label="Twitter / X">
              <Twitter size={14} color="#015AAA" strokeWidth={2} style={{ opacity: 0.65 }} />
            </SocialBtn>
          </div>
        </div>
      </div>

      {/* ── NST giant background text ─────────────────────── */}
      <div
        className="relative w-full overflow-hidden pointer-events-none select-none"
        style={{ height: "clamp(120px, 22vw, 260px)" }}
        aria-hidden="true"
      >
        <p
          style={{
            fontFamily: "'Overcame Demo', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(280px, 38vw, 480px)",
            lineHeight: 0.5,
            background:
              "linear-gradient(to bottom, #015aaa 0%, #030108 45%, white 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "clamp(8px, 3vw, 48px)",
            margin: 0,
            padding: "0 5vw",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            textAlign: "center",
          }}
        >
          NST
        </p>
      </div>
    </footer>
  );
}