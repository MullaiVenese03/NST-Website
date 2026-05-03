import { createBrowserRouter } from "react-router";
import HomePage    from "./pages/HomePage";
import AboutPage   from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import ClientsPage from "./pages/ClientsPage";
import EdTechPage  from "./pages/EdTechPage";

export const router = createBrowserRouter([
  { path: "/",         Component: HomePage },
  { path: "/about",    Component: AboutPage },
  { path: "/services", Component: ServicesPage },
  { path: "/clients",  Component: ClientsPage },
  { path: "/edtech",   Component: EdTechPage },
]);