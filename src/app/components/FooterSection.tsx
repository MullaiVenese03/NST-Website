import { Link } from "react-router";
import { motion } from "motion/react";
import { Phone, Mail, MapPin, Linkedin, Instagram, Twitter, Youtube, type LucideIcon } from "lucide-react";
import { BUSINESS_IDENTITY, BUSINESS_NAP } from "../../seo/seoConfig";

const FOOTER_SERVICES = [
  { label: "All Services", path: "/services" },
  { label: "Cybersecurity Services", path: "/services/cybersecurity" },
  { label: "Full-Stack Web Development", path: "/services/web-development" },
  { label: "UI/UX Design Services", path: "/services/ui-ux-design" },
  { label: "EdTech & Cybersecurity Training", path: "/services/edtech-training" },
] as const;

const FOOTER_RESOURCES = [
  { label: "Privacy Policy", path: "/privacy-policy" },
  { label: "Terms & Conditions", path: "/terms-and-conditions" },
  { label: "Blogs", path: "/blogs" },
] as const;

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
    "block no-underline nst-small text-slate-700 hover:text-[#015AAA] transition-colors duration-200";

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
        <p className="nst-meta font-bold uppercase text-slate-600 mb-1 transition-colors duration-250 group-hover:text-[#015AAA]">
          {label}
        </p>
        <span className="nst-small font-semibold text-slate-800 transition-colors duration-250 group-hover:text-[#015AAA] break-words">
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

type FooterSectionProps = {
  /** Omit on home page - the lazy-load wrapper already provides `#contact`. */
  anchorId?: string | null;
};

export default function FooterSection({ anchorId = "contact" }: FooterSectionProps) {
  return (
    <footer
      id={anchorId ?? undefined}
      className="w-full bg-white pt-12 sm:pt-16 lg:pt-20 pb-28 sm:pb-24 lg:pb-16 overflow-x-clip scroll-mt-24"
    >
      <motion.div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-12 items-start">
          <motion.div className="lg:col-span-5 space-y-4 sm:space-y-5">
            <div className="space-y-3 sm:space-y-4">
              <p className="nst-eyebrow font-bold text-[#015AAA] m-0">Get In Touch</p>
              <h2 className="nst-h2 text-slate-900 m-0">Let&apos;s secure your world.</h2>
              <p className="nst-small text-slate-600 m-0 max-w-sm">{BUSINESS_IDENTITY}</p>
            </div>

            <motion.div className="space-y-3 sm:space-y-4">
              <ContactRow
                icon={Phone}
                label="Phone"
                value={BUSINESS_NAP.telephone}
                href={`tel:${BUSINESS_NAP.telephoneE164}`}
              />
              <ContactRow icon={Mail} label="Email" value={BUSINESS_NAP.email} href={`mailto:${BUSINESS_NAP.email}`} />
              <ContactRow
                icon={MapPin}
                label="Address"
                value={BUSINESS_NAP.formattedAddress}
                href={`https://maps.google.com/?q=${BUSINESS_NAP.mapsQuery}`}
              />
            </motion.div>
          </motion.div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-x-8 sm:gap-x-10 lg:gap-x-12 gap-y-8 py-2 pb-10 sm:pb-12 lg:pb-14 min-w-0 w-full justify-items-start text-start">
            <motion.div className="flex flex-col gap-5 sm:gap-6 min-w-0 items-start">
              <p className="nst-h4 font-bold text-slate-900 m-0">Company</p>
              <nav className="flex flex-col gap-3.5 sm:gap-4 items-start" aria-label="Company">
                <FooterNavLink to="/">Home</FooterNavLink>
                <FooterNavLink to="/about">About Us</FooterNavLink>
                <FooterNavLink to="/services">Services</FooterNavLink>
                <FooterNavLink to="/clients">Clients</FooterNavLink>
                <FooterNavLink to="/edtech">EdTech</FooterNavLink>
              </nav>
            </motion.div>

            <div className="flex flex-col gap-5 sm:gap-6 min-w-0 items-start">
              <p className="nst-h4 font-bold text-slate-900 m-0">Services</p>
              <nav className="flex flex-col gap-3.5 sm:gap-4 items-start" aria-label="Services">
                {FOOTER_SERVICES.map((service) => (
                  <FooterNavLink key={service.path} to={service.path}>
                    {service.label}
                  </FooterNavLink>
                ))}
              </nav>
            </div>

            <div className="flex flex-col gap-5 sm:gap-6 min-w-0 items-start col-span-2 sm:col-span-1">
              <p className="nst-h4 font-bold text-slate-900 m-0">Resources</p>
              <nav className="flex flex-col gap-3.5 sm:gap-4 items-start" aria-label="Resources">
                {FOOTER_RESOURCES.map((item) => (
                  <FooterNavLink key={item.path} to={item.path}>
                    {item.label}
                  </FooterNavLink>
                ))}
              </nav>
            </div>
          </div>
        </motion.div>

        <div className="pt-6 sm:pt-8 pb-8 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 border-t border-slate-100">
          <p className="text-slate-500 text-sm m-0 text-center sm:text-left">
            Copyright &copy; 2026{" "}
            <span className="text-[#015AAA]" style={{ fontFamily: "var(--font-company)" }}>
              NebulaSafeTech
            </span>
            . All Rights Reserved.
          </p>

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
            <SocialBtn href="https://www.youtube.com/@NebulaSafeTech" label="NebulaSafeTech on YouTube">
              <Youtube size={20} strokeWidth={2} aria-hidden />
            </SocialBtn>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
