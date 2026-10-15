"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { demoBoxes, boxFlavors } from "@/data/demoCommerce";
import { signaturePastries } from "@/data/pastries";
import { useLanguage } from "@/components/LanguageProvider";
import { useOrder } from "@/components/OrderProvider";
import { money } from "@/lib/demoCommerce";
import { SectionLink } from "@/components/SectionLink";

export function BoxesSection() {
  const { language } = useLanguage();
  const { updateOrder } = useOrder();
  const es = language === "es";
  return <section className="section boxes-section" id="boxes" aria-labelledby="boxes-title"><div className="container">
    <header className="demo-section-heading"><p className="demo-eyebrow">{es ? "COSAS BUENAS PARA COMPARTIR" : "GOOD THINGS, SHARED"}</p><h2 id="boxes-title">{es ? "Una caja. Muchas sonrisas." : "One box. Many happy moments."}</h2><p>{es ? "Elige 6 o 12 piezas de surtido fijo, con 24 h de anticipación." : "Choose 6 or 12 pastries in a fixed assortment, with 24 hours notice."}</p></header>
    <div className="demo-box-grid">{demoBoxes.map(box => <article className="demo-box-card" id={`box-${box.id}`} key={box.id}>
      <div className="demo-box-heading"><h3>{es ? box.nameEs : box.name}</h3><strong>{money(box.priceCents)}</strong></div>
      <p>{es ? `${box.pieces} piezas · para ${box.serves} personas` : `${box.pieces} pieces · serves ${box.serves}`}</p>
      <div className={`demo-box-tray${box.pieces === 12 ? " demo-box-tray--twelve" : ""}`} aria-label={es ? `${box.pieces} piezas: ${box.perFlavor} de cada sabor` : `${box.pieces} pieces: ${box.perFlavor} of each flavor`}>{Array.from({ length: box.perFlavor }).flatMap((_, row) => boxFlavors.map(id => { const pastry = signaturePastries.find(item => item.id === id)!; return <div key={`${row}-${id}`}><Image src={pastry.wholeImage} width={160} height={160} sizes="(max-width: 680px) 25vw, 135px" alt="" /></div>; }))}</div>
      <ul>{boxFlavors.map(id => { const pastry = signaturePastries.find(item => item.id === id)!; return <li key={id}>{box.perFlavor} × {es ? pastry.nameEs : pastry.name}</li>; })}</ul>
      <p className="demo-fineprint">{es ? "Sin sustituciones · piezas de 12–15 cm aprox. · trigo, leche, huevo y frutos secos." : "No substitutions · approx. 12–15 cm pastries · wheat, milk, egg & nuts."}</p>
      <SectionLink className="demo-button" href="#large-order-inquiry" onClick={() => updateOrder({ intent: "box", boxId: box.id })}>{es ? "Elegir esta caja" : "Choose this box"}<ArrowUpRight size={16} aria-hidden="true" /></SectionLink>
    </article>)}</div>
    <p className="demo-catalog-note">{es ? "Precios en USD, impuestos incluidos. Recogida sin cargo; entrega desde $8 según ZIP y mínimo. Imágenes y alérgenos ilustrativos." : "USD prices include tax. Free pickup; delivery from $8 subject to ZIP and minimum. Images and allergens are illustrative."}</p>
  </div></section>;
}
