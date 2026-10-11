import { Link } from "react-router";
import { Helmet } from "react-helmet-async";
import TopNav from "../components/TopNav";
import FooterSection from "../components/FooterSection";

export default function NotFoundPage() {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col justify-between">
      <Helmet>
        <title>404 - Page Not Found | NebulaSafeTech</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <TopNav />
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-32">
        <span className="text-[#015AAA] font-bold text-sm tracking-widest uppercase mb-2">404 Error</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
          Page Not Found
        </h1>
        <p className="text-slate-600 max-w-md mb-8 text-base leading-relaxed">
          The page you are looking for doesn’t exist or has been moved. Check the URL or return to our homepage.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#015AAA] text-white font-semibold text-sm hover:bg-[#014380] transition-colors shadow-sm"
        >
          Return to Homepage
        </Link>
      </main>
      <FooterSection />
    </div>
  );
}
