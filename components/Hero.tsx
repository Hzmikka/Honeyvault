"use client";

import Image from "next/image";
import { useLanguage } from "@/components/LanguageProvider";

export function Hero() {
  const { language } = useLanguage();
  const es = language === "es";
  return <section className="hero" id="top">

    <div className="hero-grid"><div className="hero-image-wrap"><picture><source media="(max-width: 680px)" srcSet="/images/hero/honeyvault-bakery-movil.webp" /><Image src="/images/hero/honeyvault-bakery.webp" alt={es ? "Honeyvault Bakery: pasteles dorados y cajas rosas" : "Honeyvault Bakery: golden pastries and pink boxes"} fill priority sizes="(max-width: 680px) 100vw, 1120px" /></picture></div></div>
  </section>;
}
