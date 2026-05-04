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