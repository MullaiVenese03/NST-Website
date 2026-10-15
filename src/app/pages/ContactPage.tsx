import { useEffect } from "react";
import { Phone, Mail, MapPin, MessageCircle, ArrowRight, ShieldCheck, Clock, FileCheck } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "../components/Reveal";
import TopNav from "../components/TopNav";
import FooterSection from "../components/FooterSection";
import ScrollToTop from "../components/ScrollToTop";
import ContactForm from "../components/ContactForm";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { SeoHead } from "../../seo/SeoHead";
import { CONTACT_SEO } from "../../seo/pageMeta";
import { BUSINESS_IDENTITY, BUSINESS_NAP } from "../../seo/seoConfig";
import { PAGE_BREADCRUMBS, pageBreadcrumbJsonLd } from "../utils/pageBreadcrumbs";
import { localBusinessSchema } from "../../seo/schemas/localBusinessSchema";
import { enableSmoothScroll, resetScrollBehavior, scrollToTopInstant } from "../utils/scroll";
import { trackWhatsAppClick } from "../../analytics/gtm";

const WHATSAPP_NUMBER = "916381013086";
const WHATSAPP_PREFILLED = "Hello NebulaSafeTech, I would like to discuss your services.";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_PREFILLED)}`;

const SERVICE_OPTIONS = [
  "Cybersecurity Assessment & VAPT",
  "Full-Stack Web Development",
  "UI/UX Product Design",
  "EdTech & Academic Training",
  "General Inquiry",
];

const CONTACT_HIGHLIGHTS = [
  {
    icon: ShieldCheck,
    title: "Confidential & NDA-ready",
    description: "Every discussion and technical detail is treated with strict confidentiality.",
  },
  {
    icon: Clock,
    title: "Prompt response",
    description: "Our engineering and solutions team typically responds within one business day.",
  },
  {
    icon: FileCheck,
    title: "Actionable scoping",
    description: "We provide clear assessments, realistic timelines, and transparent proposals.",
  },
];

export default function ContactPage() {
  useEffect(() => {
    scrollToTopInstant();
    enableSmoothScroll();
    return () => {
      resetScrollBehavior();
    };
  }, []);

  const handleWhatsAppClick = () => {
    trackWhatsAppClick("contact_page");
  };

  return (
    <div className="w-full min-h-screen bg-white overflow-x-hidden">
      <SeoHead
        meta={CONTACT_SEO}
        structuredData={[localBusinessSchema(), pageBreadcrumbJsonLd(PAGE_BREADCRUMBS.contact)]}
      />
      <TopNav />

      <main id="main-content" className="pt-24 sm:pt-28 pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[...PAGE_BREADCRUMBS.contact]} className="mb-4 sm:mb-5" />

          {/* Page Intro Header */}
          <Reveal variant="fadeUp" className="max-w-2xl mb-8 sm:mb-10">
            <p className="nst-eyebrow font-bold text-[#015AAA] m-0 mb-2">Get In Touch</p>
            <h1 className="nst-h1 text-slate-900 m-0 mb-3">Let&apos;s build and secure your digital future.</h1>
            <p className="nst-body-sm text-slate-600 m-0 leading-relaxed max-w-xl">
              Have an upcoming cybersecurity assessment, web application project, UI/UX design initiative, or training
              requirement? Reach out to discuss your goals with our engineering team.
            </p>
          </Reveal>

          {/* Main Content Grid: Contact Details & Inquiry Form */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Left Column: Direct Communication Channels & Context */}
            <RevealGroup stagger={0.08} className="lg:col-span-5 space-y-4 sm:space-y-4.5">
              {/* WhatsApp Quick Action (Supportive) */}
              <RevealItem>
                <div className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4 sm:p-5 shadow-xs">
                  <div className="flex items-center justify-between gap-3 sm:gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                        <MessageCircle size={18} aria-hidden />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-900 m-0 truncate">Direct WhatsApp Chat</p>
                        <p className="text-xs text-slate-500 m-0 truncate">Prompt project consultations</p>
                      </div>
                    </div>
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleWhatsAppClick}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-3.5 py-2 transition-colors no-underline shadow-xs shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                      aria-label="Chat with NebulaSafeTech on WhatsApp"
                    >
                      <span>Chat Now</span>
                      <ArrowRight size={13} aria-hidden />
                    </a>
                  </div>
                </div>
              </RevealItem>

              {/* Direct Channels Card */}
              <RevealItem>
                <div className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs">
                  <h2 className="nst-h4 font-bold text-slate-900 m-0 mb-4 sm:mb-5">Contact Information</h2>

                  <div className="space-y-4 sm:space-y-4.5">
                    <a
                      href={`tel:${BUSINESS_NAP.telephoneE164}`}
                      className="flex items-start gap-3.5 text-slate-700 hover:text-[#015AAA] no-underline transition-colors group"
                      aria-label={`Call NebulaSafeTech at ${BUSINESS_NAP.telephone}`}
                    >
                      <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-[#015AAA] shrink-0 mt-0.5 group-hover:border-[#015AAA]/40 transition-colors">
                        <Phone size={15} aria-hidden />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1 leading-none">
                          Telephone
                        </span>
                        <span className="block text-sm font-semibold text-slate-800 group-hover:text-[#015AAA] transition-colors leading-snug">
                          {BUSINESS_NAP.telephone}
                        </span>
                      </div>
                    </a>

                    <a
                      href={`mailto:${BUSINESS_NAP.email}`}
                      className="flex items-start gap-3.5 text-slate-700 hover:text-[#015AAA] no-underline transition-colors group"
                      aria-label={`Email NebulaSafeTech at ${BUSINESS_NAP.email}`}
                    >
                      <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-[#015AAA] shrink-0 mt-0.5 group-hover:border-[#015AAA]/40 transition-colors">
                        <Mail size={15} aria-hidden />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1 leading-none">
                          Email
                        </span>
                        <span className="block text-sm font-semibold text-slate-800 group-hover:text-[#015AAA] transition-colors leading-snug break-all sm:break-normal">
                          {BUSINESS_NAP.email}
                        </span>
                      </div>
                    </a>

                    <a
                      href={BUSINESS_NAP.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3.5 text-slate-700 hover:text-[#015AAA] no-underline transition-colors group"
                      aria-label={`Office address: ${BUSINESS_NAP.formattedAddress}`}
                    >
                      <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-[#015AAA] shrink-0 mt-0.5 group-hover:border-[#015AAA]/40 transition-colors">
                        <MapPin size={15} aria-hidden />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1 leading-none">
                          Location
                        </span>
                        <span className="block text-sm font-semibold text-slate-800 group-hover:text-[#015AAA] transition-colors leading-snug">
                          {BUSINESS_NAP.formattedAddress}
                        </span>
                      </div>
                    </a>
                  </div>

                  <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-slate-100">
                    <p className="text-xs text-slate-500 m-0 leading-relaxed font-normal tracking-normal">{BUSINESS_IDENTITY}</p>
                  </div>
                </div>
              </RevealItem>

              {/* What to Expect Card */}
              <RevealItem>
                <div className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs">
                  <h2 className="nst-h4 font-bold text-slate-900 m-0 mb-4 sm:mb-5">What To Expect</h2>
                  <div className="space-y-4 sm:space-y-4.5">
                    {CONTACT_HIGHLIGHTS.map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <div key={idx} className="flex items-start gap-3.5">
                          <div className="w-7 h-7 rounded-lg bg-[#015AAA]/10 text-[#015AAA] flex items-center justify-center shrink-0 mt-0.5">
                            <Icon size={14} aria-hidden />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-bold text-slate-900 m-0 mb-1 text-sm leading-snug">{item.title}</p>
                            <p className="text-xs sm:text-[13px] text-slate-500 m-0 leading-relaxed font-normal tracking-normal">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </RevealItem>
            </RevealGroup>

            {/* Right Column: Inquiry Form */}
            <div className="lg:col-span-7">
              <ContactForm
                id="contact-page-form"
                title="Send an inquiry"
                subtitle="Provide details about your project, timeline, or security needs. We review every submission carefully."
                serviceOptions={SERVICE_OPTIONS}
                showEyebrow={false}
                cardClassName="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-7 md:p-8 shadow-xs w-full"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </main>

      <FooterSection />
      <ScrollToTop />
    </div>
  );
}
