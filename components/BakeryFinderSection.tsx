"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  Croissant,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { SectionLink } from "@/components/SectionLink";

const rotatingItems = {
  en: ["fresh pastries", "a brunch box", "a sweet gift", "large-order desserts"],
  es: ["pasteles frescos", "una caja de brunch", "un regalo dulce", "postres para eventos"],
} as const;

export function BakeryFinderSection() {
  const { language } = useLanguage();
  const es = language === "es";
  const items = useMemo(() => rotatingItems[language], [language]);
  const [itemIndex, setItemIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setItemIndex(0);
  }, [language]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);
    return () => mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || paused || interacting) return;
    const interval = window.setInterval(() => {
      setItemIndex((current) => (current + 1) % items.length);
    }, 4500);
    return () => window.clearInterval(interval);
  }, [prefersReducedMotion, paused, interacting, items]);

  return (
    <section className="bakery-finder" aria-labelledby="bakery-finder-title">
      <div className="bakery-finder-shell">
        <div className="bakery-finder-badges" aria-label={es ? "Puntos destacados" : "Bakery highlights"}>
          <span className="bakery-finder-badge">
            <Croissant size={15} strokeWidth={2} aria-hidden="true" />
            {es ? "Horneado fresco cada día" : "Fresh baked daily"}
          </span>
          <span className="bakery-finder-badge">
            <Sparkles size={15} strokeWidth={2} aria-hidden="true" />
            {es ? "Recogida y entrega en Miami" : "Miami pickup & delivery"}
          </span>
        </div>

        <div className="bakery-finder-content" onMouseEnter={() => setInteracting(true)} onMouseLeave={() => setInteracting(false)} onFocus={() => setInteracting(true)} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setInteracting(false); }}>
          <h1 className="bakery-finder-title" id="bakery-finder-title">
            <span>{es ? "Encuentra" : "Find"}</span>
            <span className="rotating-word-frame" aria-live="off">
              <span className="rotating-word" key={`${language}-${items[itemIndex]}`}>
                {items[itemIndex]}
              </span>
            </span>
            <span>{es ? "en Miami" : "in Miami"}</span>
          </h1>
          <button className="rotation-control" type="button" aria-pressed={paused} disabled={prefersReducedMotion} onClick={() => setPaused(current => !current)}>{prefersReducedMotion ? (es ? "Movimiento reducido" : "Reduced motion") : paused ? (es ? "Reanudar titular" : "Resume title") : (es ? "Pausar titular" : "Pause title")}</button>

          <div className="bakery-finder-actions" aria-label={es ? "Comprar en Honeyvault" : "Order Honeyvault pastries"}>
            <SectionLink className="bakery-order-button" href="#guided-choice">
              <span className="bakery-action-label">
                <span className="bakery-action-icon" aria-hidden="true"><ShoppingBag size={15} strokeWidth={2} /></span>
                <span>{es ? "Elegir mi pedido" : "Choose my order"}</span>
              </span>
              <ArrowUpRight className="bakery-action-arrow" size={17} strokeWidth={2} aria-hidden="true" />
            </SectionLink>
          </div>

          <div className="bakery-finder-logistics">
            <span>
              {es ? "3 tiendas en Miami" : "3 Miami locations"}
              <span aria-hidden="true"> · </span>
              {es ? "Recogida y entrega local" : "Pickup & local delivery"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
