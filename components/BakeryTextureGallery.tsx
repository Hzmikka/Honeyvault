"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowUpRight, ShoppingBag } from "lucide-react";
import { signaturePastries } from "@/data/pastries";
import { commerceLinks } from "@/data/content";
import { useLanguage } from "@/components/LanguageProvider";
import { useOrder } from "@/components/OrderProvider";
import { SectionLink } from "@/components/SectionLink";

export function BakeryTextureGallery() {
  const { draft, updateOrder } = useOrder();
  const { language } = useLanguage();
  const es = language === "es";
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const displayIndex = previewIndex ?? selectedIndex;
  const activePastry = signaturePastries[selectedIndex];

  useEffect(() => {
    const index = signaturePastries.findIndex(item => item.id === draft.pastryId);
    if (index >= 0) {
      setSelectedIndex(index);
      setPreviewIndex(null);
    }
  }, [draft.pastryId]);

  const selectPastry = (index: number) => {
    setSelectedIndex(index);
    setPreviewIndex(null);
    updateOrder({ pastryId: signaturePastries[index].id, intent: "pastry", occasion: draft.occasion || "Other" });
  };

  return (
    <section className="texture-gallery section" id="textures" aria-labelledby="texture-gallery-title">
      <div className="container texture-gallery-inner">
        <div className="texture-gallery-heading">
          <div>
            <p>Honeyvault Bakery</p>
            <h2 id="texture-gallery-title">{es ? "Texturas distintivas" : "Signature textures"}</h2>
          </div>
          <span>{es ? "Un sabor por pedido · 1–24 piezas · 30 min de preparación." : "One flavor per order · 1–24 pieces · 30 min preparation."}</span>
        </div>

        <div
          className="texture-card-row"
          aria-label={es ? "Menú de texturas" : "Signature pastry texture menu"}
          onMouseLeave={() => setPreviewIndex(null)}
        >
          {signaturePastries.map((pastry, index) => {
            const isDisplayed = displayIndex === index;
            const isSelected = selectedIndex === index;
            const name = es ? pastry.nameEs : pastry.name;

            return (
              <button
                id={`pastry-${pastry.id}`}
                className={`texture-card${isDisplayed ? " active" : ""}`}
                type="button"
                aria-label={`${name}, ${pastry.price}`}
                aria-pressed={isSelected}
                key={pastry.id}
                onMouseEnter={() => setPreviewIndex(index)}
                onFocus={() => setPreviewIndex(index)}
                onBlur={() => setPreviewIndex(null)}
                onClick={() => selectPastry(index)}
              >
                <Image src={pastry.image} alt="" fill sizes="(max-width: 768px) 62vw, 330px" />
                <span className="texture-card-sheen" aria-hidden="true" />
                <span className="texture-card-label"><span>{name}</span><strong>{pastry.price}</strong></span>
              </button>
            );
          })}
        </div>

        <div className="texture-info-panel">
          <div className="texture-info-bubble">
            <Image className="whole-pastry-photo" src={activePastry.wholeImage} alt={es ? `Pieza completa: ${activePastry.nameEs}` : `Whole pastry: ${activePastry.name}`} width={240} height={240} sizes="(max-width: 680px) 120px, 180px" />
            <div className="texture-info-copy">
              <div className="texture-info-title-row">
                <h3 id="texture-info-title" aria-live="polite">{es ? activePastry.nameEs : activePastry.name}</h3>
                <strong>{activePastry.price}</strong>
              </div>
              <p>{es ? activePastry.detailEs : activePastry.detail}</p>
              <span className="texture-sensory">{es ? activePastry.sensoryEs : activePastry.sensory}</span>
              <span className="texture-allergens">{es ? activePastry.allergensEs : activePastry.allergens}</span>
              <span className="texture-allergens">{es ? "Pieza individual · 12–15 cm aprox." : "Single pastry · approx. 12–15 cm."}</span>
            </div>

            <SectionLink className="texture-info-button" href={commerceLinks.inquiry} onClick={() => selectPastry(selectedIndex)}>
              <ShoppingBag size={15} strokeWidth={2} aria-hidden="true" />
              <span>{es ? "Elegir este pastel" : "Choose this pastry"}</span>
              <ArrowUpRight size={14} strokeWidth={2} aria-hidden="true" />
            </SectionLink>
          </div>
        </div>
      </div>
    </section>
  );
}
