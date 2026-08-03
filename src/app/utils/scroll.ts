export function enableSmoothScroll() {
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
    root.style.scrollBehavior = previousBehavior || "smooth";
  });
}


export function scrollToSection(
  id: string,
  options?: { behavior?: ScrollBehavior; block?: ScrollLogicalPosition; maxAttempts?: number },
) {
  const behavior = options?.behavior ?? "smooth";
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
  navigate: (to: { pathname: string; hash?: string }) => void,
  isHome: boolean,
) {
  const scrollToFooter = () =>
    scrollToSection("contact", { behavior: "smooth", block: "end", maxAttempts: 120 });

  if (isHome) {
    navigate({ pathname: "/", hash: "contact" });
    // Give the lazy-loaded footer time to mount before scrolling
    setTimeout(scrollToFooter, 350);
    return;
  }

  if (document.getElementById("contact")) {
    window.history.replaceState(null, "", `${window.location.pathname}#contact`);
    scrollToFooter();
    return;
  }

  navigate({ pathname: "/", hash: "contact" });
  setTimeout(scrollToFooter, 350);
}