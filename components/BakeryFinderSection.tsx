"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  Croissant,
  PackageOpen,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { commerceLinks } from "@/data/content";
import { useLanguage } from "@/components/LanguageProvider";

const rotatingItems = {
  en: ["fresh pastries", "a brunch box", "a sweet gift", "large-order desserts"],
  es: ["pasteles frescos", "una caja de brunch", "un regalo dulce", "postres para eventos"],
} as const;

export function BakeryFinderSection() {
  const { language } = useLanguage();
  const es = language === "es";
  const items = useMemo(() => rotatingItems[language], [language]);
  const [itemIndex, setItemIndex] = useState(0);
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
    if (prefersReducedMotion) return;
    const interval = window.setInterval(() => {
      setItemIndex((current) => (current + 1) % items.length);
    }, 2500);
    return () => window.clearInterval(interval);
  }, [prefersReducedMotion, items]);

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

        <div className="bakery-finder-content">
          <h2 className="bakery-finder-title" id="bakery-finder-title">
            <span>{es ? "Encuentra" : "Find"}</span>
            <span className="rotating-word-frame" aria-live="off">
              <span className="rotating-word" key={`${language}-${items[itemIndex]}`}>
                {items[itemIndex]}
              </span>
            </span>
            <span>{es ? "en Miami" : "in Miami"}</span>
          </h2>

          <div className="bakery-finder-actions" aria-label={es ? "Comprar en Honeyvault" : "Order Honeyvault pastries"}>
            <a className="bakery-order-button" href={commerceLinks.orderNow}>
              <span className="bakery-action-label">
                <span className="bakery-action-icon" aria-hidden="true">
                  <ShoppingBag size={15} strokeWidth={2} />
                </span>
                <span>{es ? "Pedir ahora" : "Order now"}</span>
              </span>
              <ArrowUpRight className="bakery-action-arrow" size={17} strokeWidth={2} aria-hidden="true" />
            </a>

            <a className="bakery-plan-button" href={commerceLinks.planBox}>
              <span className="bakery-action-label">
                <span className="bakery-action-icon" aria-hidden="true">
                  <PackageOpen size={15} strokeWidth={2} />
                </span>
                <span>{es ? "Planear una caja" : "Plan a box"}</span>
              </span>
              <ArrowUpRight className="bakery-action-arrow" size={17} strokeWidth={2} aria-hidden="true" />
            </a>
          </div>

          <div className="bakery-finder-logistics">
            <span>
              {es ? "3 tiendas en Miami" : "3 Miami locations"}
              <span aria-hidden="true"> · </span>
              {es ? "Recogida y entrega local" : "Pickup & local delivery"}
            </span>

            <a href={commerceLinks.locations}>
              {es ? "Encontrar tienda" : "Find a shop"}
              <ArrowUpRight size={13} strokeWidth={2} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
