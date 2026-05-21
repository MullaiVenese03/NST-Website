import { Helmet } from "react-helmet-async";
import { companyIconLinks } from "./brandAssets";

/** Ensures company favicon/logo links are present on every route. */
export function CompanyIconLinks() {
  return (
    <Helmet prioritizeSeoTags>
      {companyIconLinks().map((link) => (
        <link key={`${link.rel}-${link.href}`} rel={link.rel} href={link.href} {...("type" in link ? { type: link.type } : {})} {...("sizes" in link ? { sizes: link.sizes } : {})} />
      ))}
    </Helmet>
  );
}
