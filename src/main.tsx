import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./app/App.tsx";
import "./styles/index.css";
import { brandMarkUrl } from "./brandMark.ts";

const fav = document.getElementById("nst-favicon") as HTMLLinkElement | null;
if (fav) fav.href = brandMarkUrl;

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
