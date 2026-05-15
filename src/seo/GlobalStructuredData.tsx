import { Helmet } from "react-helmet-async";
import { organizationSchema } from "./schemas/organizationSchema";
import { websiteSchema } from "./schemas/websiteSchema";
import { toJsonLdScript } from "./structuredData";

/** Organization + WebSite JSON-LD rendered once for the whole app shell. */
export function GlobalStructuredData() {
  const graph = [organizationSchema(), websiteSchema()];
  return (
    <Helmet>
      <script type="application/ld+json">{toJsonLdScript(graph)}</script>
    </Helmet>
  );
}
