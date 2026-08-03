import { SITE_ORIGIN } from "./seoConfig";


function canonicalPathFromPathname(pathname: string): string {
  if (!pathname || pathname === "/") return "/";
  return pathname.replace(/\/+$/, "") || "/";
}

export function canonicalUrlFromPathname(pathname: string): string {
  const path = canonicalPathFromPathname(pathname);
  return `${SITE_ORIGIN}${path === "/" ? "/" : path}`;
}
