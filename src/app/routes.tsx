import { lazy, Suspense, useEffect } from "react";
import { createBrowserRouter, Navigate, Outlet, useLocation } from "react-router";
import { GlobalStructuredData } from "../seo/GlobalStructuredData";
import { SkipToContent } from "./components/SkipToContent";
import { DeferredCompanyFont } from "./components/DeferredCompanyFont";
import ScrollToTopOnNavigate from "./components/ScrollToTopOnNavigate";
import { AnalyticsScripts } from "../analytics/AnalyticsScripts";
import { RouteAnalytics } from "../analytics/RouteAnalytics";

import BottomNav from "./components/BottomNav";
import HomePage from "./pages/HomePage";
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const ServiceDetailPage = lazy(() => import("./pages/ServiceDetailPage"));
const CyberServicePage = lazy(() => import("./pages/CyberServicePage"));
const ClientsPage = lazy(() => import("./pages/ClientsPage"));
const EdTechPage = lazy(() => import("./pages/EdTechPage"));
const BlogsPage = lazy(() => import("./pages/BlogsPage"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage"));
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage"));
const TermsAndConditionsPage = lazy(() => import("./pages/TermsAndConditionsPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const LegacyBlogSlugRedirect = lazy(() => import("./components/LegacyBlogSlugRedirect"));

function PageFallback() {
  return (
    <div className="min-h-[40vh] flex items-center justify-center bg-white text-slate-500 text-sm font-medium" role="status" aria-live="polite">
      Loading…
    </div>
  );
}

function RootLayout() {
  const { pathname } = useLocation();
  const hideBottomNav = pathname === "/privacy-policy" || pathname === "/terms-and-conditions";

  useEffect(() => {
    const onPageShow = (event: PageTransitionEvent) => {
      if (!event.persisted) return;
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  return (
    <div className="overflow-x-clip w-full max-w-[100vw] min-h-screen">
      <ScrollToTopOnNavigate />
      <RouteAnalytics />
      <AnalyticsScripts />
      <SkipToContent />
      <DeferredCompanyFont />
      <GlobalStructuredData />
      <Suspense fallback={<PageFallback />}>
        <Outlet />
      </Suspense>
      {!hideBottomNav ? <BottomNav /> : null}
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "about", Component: AboutPage },
      { path: "services", Component: ServicesPage },
      { path: "services/web-security", Component: CyberServicePage },
      { path: "services/cloud-security", Component: CyberServicePage },
      { path: "services/application-security", Component: CyberServicePage },
      { path: "services/network-security", Component: CyberServicePage },
      { path: "services/encryption-data-protection", element: <Navigate to="/services/cybersecurity" replace /> },
      { path: "services/encryption", element: <Navigate to="/services/cybersecurity" replace /> },
      { path: "services/data-protection", element: <Navigate to="/services/cybersecurity" replace /> },
      { path: "services/edtech-training", element: <Navigate to="/edtech" replace /> },
      { path: "services/academic-training", element: <Navigate to="/edtech" replace /> },
      { path: "services/:slug", Component: ServiceDetailPage },
      { path: "testimonials", Component: ClientsPage },
      { path: "clients", element: <Navigate to="/testimonials" replace /> },
      { path: "edtech", Component: EdTechPage },
      { path: "blogs", Component: BlogsPage },
      { path: "blogs/:slug", Component: BlogPostPage },
      { path: "blog", element: <Navigate to="/blogs" replace /> },
      { path: "blog/:slug", Component: LegacyBlogSlugRedirect },
      { path: "privacy-policy", Component: PrivacyPolicyPage },
      { path: "terms-and-conditions", Component: TermsAndConditionsPage },
      { path: "contact", Component: ContactPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);
