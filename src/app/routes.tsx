import { lazy, Suspense, useEffect } from "react";
import { createBrowserRouter, Outlet, useLocation } from "react-router";
import { GlobalStructuredData } from "../seo/GlobalStructuredData";
import { SkipToContent } from "./components/SkipToContent";
import { DeferredCompanyFont } from "./components/DeferredCompanyFont";
import ScrollToTopOnNavigate from "./components/ScrollToTopOnNavigate";
import { AnalyticsScripts } from "../analytics/AnalyticsScripts";
import { RouteAnalytics } from "../analytics/RouteAnalytics";

const BottomNav = lazy(() => import("./components/BottomNav"));

const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const ServiceDetailPage = lazy(() => import("./pages/ServiceDetailPage"));
const ClientsPage = lazy(() => import("./pages/ClientsPage"));
const EdTechPage = lazy(() => import("./pages/EdTechPage"));
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage"));
const TermsAndConditionsPage = lazy(() => import("./pages/TermsAndConditionsPage"));

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
      {!hideBottomNav ? (
        <Suspense fallback={null}>
          <BottomNav />
        </Suspense>
      ) : null}
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
      { path: "services/:slug", Component: ServiceDetailPage },
      { path: "clients", Component: ClientsPage },
      { path: "edtech", Component: EdTechPage },
      { path: "privacy-policy", Component: PrivacyPolicyPage },
      { path: "terms-and-conditions", Component: TermsAndConditionsPage },
    ],
  },
]);
