export function isReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function enableSmoothScroll() {
  if (isReducedMotion()) return;
  document.documentElement.style.scrollBehavior = "smooth";
}

export function resetScrollBehavior() {
  document.documentElement.style.scrollBehavior = "";
}

export function scrollToTopInstant() {
  const root = document.documentElement;
  const previousBehavior = root.style.scrollBehavior;

  root.style.scrollBehavior = "auto";
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });

  requestAnimationFrame(() => {
    root.style.scrollBehavior = previousBehavior;
  });
}


export function scrollToSection(
  id: string,
  options?: { behavior?: ScrollBehavior; block?: ScrollLogicalPosition; maxAttempts?: number },
) {
  const behavior = options?.behavior ?? (isReducedMotion() ? "auto" : "smooth");
  const block = options?.block ?? "start";
  const maxAttempts = options?.maxAttempts ?? 48;

  const attempt = (remaining: number) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior, block });
      window.dispatchEvent(new CustomEvent("sectionChange", { detail: id }));
      return;
    }
    if (remaining > 0) {
      requestAnimationFrame(() => attempt(remaining - 1));
    }
  };

  attempt(maxAttempts);
}

export function navigateToContact(
  navigate: (to: string) => void,
  _isHome?: boolean,
) {
  scrollToTopInstant();
  navigate("/contact");
}