import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { FormspreeProvider } from "@formspree/react";
import App from "./app/App.tsx";
import { FORMSPREE_PROJECT_ID } from "./app/config/formspree";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <FormspreeProvider project={FORMSPREE_PROJECT_ID}>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </FormspreeProvider>,
);
