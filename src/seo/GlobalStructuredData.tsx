import { Helmet } from "react-helmet-async";
import { localBusinessSchema } from "./schemas/localBusinessSchema";
import { organizationSchema } from "./schemas/organizationSchema";
import { websiteSchema } from "./schemas/websiteSchema";
import { toJsonLdScript } from "./structuredData";

export function GlobalStructuredData() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [organizationSchema(), localBusinessSchema(), websiteSchema()],
  };
  return (
    <Helmet>
      <script type="application/ld+json">{toJsonLdScript(graph)}</script>
    </Helmet>
  );
}

