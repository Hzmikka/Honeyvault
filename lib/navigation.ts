export function navigateToSection(id: string) {
  window.requestAnimationFrame(() => {
    const target = document.getElementById(id);
    if (!target) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
    if (!target.matches("a[href],button,input,select,textarea,[tabindex]")) target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
    window.history.pushState(null, "", `#${id}`);
  });
}
