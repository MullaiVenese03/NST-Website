import { useState } from "react";
import { motion } from "motion/react";
import { Linkedin, Instagram, Twitter, Phone, Mail, MapPin, ArrowRight } from "lucide-react";

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
        window.location.href = `/${href}`;
      }
    }
  };

  return (
    <motion.a
      href={href}
      onClick={handleClick}
      className="block no-underline text-[15px] font-medium text-slate-700 hover:text-[#015AAA] transition-colors duration-200"
      whileHover={{ x: 2 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {children}
    </motion.a>
  );
}

/* ─── Contact Row ──────────────────────────────────────────────────────── */
function ContactRow({ icon: Icon, label, value, href }: { icon: any, label: string, value: string, href: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-lg bg-[#015AAA]/10 flex items-center justify-center text-[#015AAA] shrink-0">
        <Icon size={20} />
      </div>
      <div>
        <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">{label}</p>
        <a href={href} className="text-[14px] font-semibold text-slate-800 hover:text-[#015AAA] transition-colors">
          {value}
        </a>
      </div>
    </div>
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
      className="flex items-center justify-center rounded-full bg-[#015AAA]/10 w-9 h-9 text-[#015AAA] hover:bg-[#015AAA]/20 transition-colors duration-200"
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
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
    <footer className="w-full bg-white pt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-start">
          
          {/* Left: Get In Touch */}
          <div className="lg:col-span-3 space-y-8">
            <div className="space-y-4">
              <h4 className="text-[#015AAA] text-base font-bold uppercase tracking-wider">Get In Touch</h4>
              <h3 className="text-3xl font-bold text-slate-900 leading-tight">
                Let's secure your world.
              </h3>
            </div>

            <div className="space-y-6">
              <ContactRow icon={Phone} label="Phone" value="+91 63810 13086" href="tel:+916381013086" />
              <ContactRow icon={Mail} label="Email" value="info@nebulasafetech.com" href="mailto:info@nebulasafetech.com" />
              <ContactRow icon={MapPin} label="Address" value="Hosur, Tamil Nadu, India." href="https://maps.google.com/?q=Hosur,Tamil+Nadu,India" />
            </div>
          </div>

          {/* Vertical Divider (Desktop Only) */}
          <div className="hidden lg:block lg:col-span-1 flex justify-center h-full min-h-[300px]">
            <div className="w-[1px] h-full bg-slate-200" />
          </div>

          {/* Middle: Links */}
          <div className="lg:col-span-4 grid grid-cols-3 gap-4 lg:pt-10">
            <div className="space-y-6">
              <h4 className="text-lg font-bold text-slate-900">Company</h4>
              <nav className="flex flex-col gap-4">
                <NavLink href="/">Home</NavLink>
                <NavLink href="/about">About Us</NavLink>
                <NavLink href="/services">Services</NavLink>
                <NavLink href="/edtech">EdTech</NavLink>
                <NavLink href="/#nex">NEX</NavLink>
              </nav>
            </div>

            <div className="space-y-6">
              <h4 className="text-lg font-bold text-slate-900">Services</h4>
              <nav className="flex flex-col gap-4">
                <NavLink href="/services">Web Services</NavLink>
                <NavLink href="/services">Security Services</NavLink>
                <NavLink href="/services">Vulnerability Assessment</NavLink>
                <NavLink href="/edtech">EdTech</NavLink>
              </nav>
            </div>

            <div className="space-y-6">
              <h4 className="text-lg font-bold text-slate-900">Support</h4>
              <nav className="flex flex-col gap-4">
                <NavLink href="#privacy">Privacy Policy</NavLink>
                <NavLink href="#terms">Terms & Conditions</NavLink>
              </nav>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-4 lg:pl-8">
            <div className="bg-white rounded-2xl border border-slate-100 p-2">
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
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
                    name="name" type="text" placeholder="Name" required
                    value={form.name} onChange={handleChange}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#015AAA] transition-all placeholder:text-slate-400"
                  />
                  <input
                    name="email" type="email" placeholder="Email Address" required
                    value={form.email} onChange={handleChange}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#015AAA] transition-all placeholder:text-slate-400"
                  />
                  <input
                    name="phone" type="tel" placeholder="Phone Number"
                    value={form.phone} onChange={handleChange}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#015AAA] transition-all placeholder:text-slate-400"
                  />
                  <textarea
                    name="message" placeholder="How can we help ?" required rows={4}
                    value={form.message} onChange={handleChange}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#015AAA] transition-all resize-none placeholder:text-slate-400"
                  />
                  <motion.button
                    whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-[#015AAA] text-white font-semibold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-100/50"
                  >
                    Send Message
                    <ArrowRight size={16} />
                  </motion.button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 py-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-slate-500 text-sm">
            Copyright &copy; 2026 <span className="text-blue-500">NebulaSafeTech</span>. All Rights Reserved.
          </p>

          <div className="flex items-center gap-4">
            <SocialBtn href="https://linkedin.com/company/nebulasafetech-nst/" label="LinkedIn">
              <Linkedin size={18} />
            </SocialBtn>
            <SocialBtn href="https://instagram.com/nebulasafetech" label="Instagram">
              <Instagram size={18} />
            </SocialBtn>
            <SocialBtn href="https://twitter.com/nebulasafetech" label="Twitter">
              <Twitter size={18} />
            </SocialBtn>
          </div>
        </div>
      </div>

      {/* Giant NST Branding */}
      <div className="relative w-full overflow-hidden pointer-events-none select-none h-[250px] md:h-[450px]">
        <h2 
          className="font-black leading-none absolute bottom-0 left-0 w-full text-center"
          style={{ 
            fontSize: 'min(90vw, 800px)',
            fontFamily: "'Overcame Demo', sans-serif",
            background: 'linear-gradient(to top, #030108 0%, #015AAA 50%, #FFF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.02em',
            transform: 'translateY(0%)'
          }}
        >
          NST
        </h2>
      </div>
    </footer>
  );
}
