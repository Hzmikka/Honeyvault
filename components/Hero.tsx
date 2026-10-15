"use client";

import Image from "next/image";
import { useLanguage } from "@/components/LanguageProvider";

export function Hero() {
  const { language } = useLanguage();
  const es = language === "es";
  return <section className="hero" id="top">
    <div className="hero-shortcuts"><p>{es ? "Un pequeño antojo o una gran ocasión." : "A little craving or a big occasion."}</p><nav aria-label={es ? "Explorar la demo" : "Explore the demo"}><a href="#textures">{es ? "Pasteles" : "Pastries"}</a><a href="#boxes">{es ? "Cajas" : "Boxes"}</a><a href="#large-orders">{es ? "Eventos" : "Events"}</a></nav></div>
    <div className="hero-grid"><div className="hero-image-wrap"><picture><source media="(max-width: 680px)" srcSet="/images/hero/honeyvault-bakery-movil.webp" /><Image src="/images/hero/honeyvault-bakery.webp" alt={es ? "Honeyvault Bakery: pasteles dorados y cajas rosas" : "Honeyvault Bakery: golden pastries and pink boxes"} fill priority sizes="(max-width: 680px) 100vw, 1120px" /></picture></div></div>
  </section>;
}
