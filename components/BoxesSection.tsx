"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { demoBoxes, boxFlavors } from "@/data/demoCommerce";
import { signaturePastries } from "@/data/pastries";
import { useLanguage } from "@/components/LanguageProvider";
import { useOrder } from "@/components/OrderProvider";
import { money } from "@/lib/demoCommerce";

export function BoxesSection() {
  const { language } = useLanguage();
  const { draft, updateOrder } = useOrder();
  const es = language === "es";
  return <section className="section boxes-section" id="boxes" aria-labelledby="boxes-title"><div className="container">
    <header className="demo-section-heading"><p className="demo-eyebrow">{es ? "COSAS BUENAS PARA COMPARTIR" : "GOOD THINGS, SHARED"}</p><h2 id="boxes-title">{es ? "Una caja. Muchas sonrisas." : "One box. Many happy moments."}</h2><p>{es ? "Dos tamaños, un surtido claro y el precio desde el principio. Prepara tu brunch con 24 h de anticipación." : "Two sizes, a clear assortment and the price up front. Plan your brunch with 24 hours notice."}</p></header>
    <div className="demo-box-grid">{demoBoxes.map(box => <article className="demo-box-card" id={`box-${box.id}`} key={box.id}>
      <div className="demo-box-tray" aria-label={es ? `${box.pieces} piezas: ${box.perFlavor} de cada sabor` : `${box.pieces} pieces: ${box.perFlavor} of each flavor`}>{Array.from({ length: box.perFlavor }).flatMap((_, row) => boxFlavors.map(id => { const pastry = signaturePastries.find(item => item.id === id)!; return <div key={`${row}-${id}`}><Image src={pastry.wholeImage} width={160} height={160} sizes="(max-width: 680px) 25vw, 135px" alt="" /></div>; }))}</div>
      <div className="demo-box-heading"><h3>{es ? box.nameEs : box.name}</h3><strong>{money(box.priceCents)}</strong></div>
      <p>{es ? `${box.pieces} piezas · para ${box.serves} personas` : `${box.pieces} pieces · serves ${box.serves}`}</p>
      <ul>{boxFlavors.map(id => { const pastry = signaturePastries.find(item => item.id === id)!; return <li key={id}>{box.perFlavor} × {es ? pastry.nameEs : pastry.name}</li>; })}</ul>
      <p className="demo-fineprint">{es ? "Surtido fijo · piezas de tamaño normal (12–15 cm aprox.) · trigo, leche, huevo y frutos secos. Datos de muestra." : "Fixed assortment · full-size pastries (approx. 12–15 cm) · wheat, milk, egg & nuts. Sample details."}</p>
      <a className="demo-button" href="#large-order-inquiry" onClick={() => updateOrder({ intent: "box", boxId: box.id })}>{draft.intent === "box" && draft.boxId === box.id ? (es ? "Continuar con esta caja" : "Continue with this box") : (es ? "Elegir esta caja" : "Choose this box")}<ArrowUpRight size={16} aria-hidden="true" /></a>
    </article>)}</div>
    <p className="demo-catalog-note">{es ? "Precios de muestra en USD, impuestos incluidos. Recogida sin cargo; entrega desde $8 según ZIP y mínimo. Las imágenes muestran el surtido, sin personalización en esta demo." : "Sample USD prices include tax. Pickup is free; delivery from $8 subject to ZIP and minimum. Images show the fixed assortment; customization is not part of this demo."}</p>
  </div></section>;
}
