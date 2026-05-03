import { createBrowserRouter, Outlet } from "react-router";
import HomePage    from "./pages/HomePage";
import AboutPage   from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import ClientsPage from "./pages/ClientsPage";
import EdTechPage  from "./pages/EdTechPage";
import BottomNav from "./components/BottomNav";

function RootLayout() {
  return (
    <>
      <Outlet />
      <BottomNav />
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
    ]
  }
]);