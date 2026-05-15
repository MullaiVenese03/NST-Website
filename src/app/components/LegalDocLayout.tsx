import { useEffect, type ReactNode } from "react";
import TopNav from "./TopNav";
import FooterSection from "./FooterSection";
import ScrollToTop from "./ScrollToTop";
import { Breadcrumbs, type BreadcrumbItem } from "./Breadcrumbs";
import { enableSmoothScroll, resetScrollBehavior, scrollToTopInstant } from "../utils/scroll";

type LegalDocLayoutProps = {
  documentTitle: string;
  badge: string;
  lastUpdated: string;
  breadcrumbItems: BreadcrumbItem[];
  children: ReactNode;
};

export default function LegalDocLayout({
  documentTitle,
  badge,
  lastUpdated,
  breadcrumbItems,
  children,
}: LegalDocLayoutProps) {
  useEffect(() => {
    scrollToTopInstant();
    document.title = documentTitle;
    enableSmoothScroll();
    return () => {
      resetScrollBehavior();
      document.title = "NebulaSafeTech | NST";
    };
  }, [documentTitle]);

  return (
    <div className="w-full min-h-screen bg-white overflow-x-hidden">
      <TopNav />
      <main className="pt-28 pb-12 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Breadcrumbs className="mb-5" items={breadcrumbItems} />
          <header className="mb-10 border-b border-slate-100 pb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">{badge}</h1>
            <p className="mt-4 text-slate-600">
              <span className="font-semibold text-slate-800">Last Updated:</span> {lastUpdated}
            </p>
          </header>
          <article className="space-y-4 text-slate-600 leading-relaxed text-[15px] md:text-base [&_strong]:text-slate-800 [&_strong]:font-semibold [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:pt-2 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-slate-800 [&_h3]:mt-6 [&_h3]:mb-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:my-4 [&_a]:text-[#015AAA] [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-[#014080] [&_address]:not-italic">
            {children}
          </article>
        </div>
      </main>
      <FooterSection />
      <ScrollToTop />
    </div>
  );
}
