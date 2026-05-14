import { createBrowserRouter, Outlet, useLocation } from "react-router";
import HomePage    from "./pages/HomePage";
import AboutPage   from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import ClientsPage from "./pages/ClientsPage";
import EdTechPage  from "./pages/EdTechPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage";
import BottomNav from "./components/BottomNav";

function RootLayout() {
  const { pathname } = useLocation();
  const hideBottomNav =
    pathname === "/privacy-policy" || pathname === "/terms-and-conditions";

  return (
    <>
      <Outlet />
      {!hideBottomNav ? <BottomNav /> : null}
    </>
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
      { path: "clients", Component: ClientsPage },
      { path: "edtech", Component: EdTechPage },
      { path: "privacy-policy", Component: PrivacyPolicyPage },
      { path: "terms-and-conditions", Component: TermsAndConditionsPage },
    ]
  }
]);