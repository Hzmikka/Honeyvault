"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight, ShoppingBag } from "lucide-react";
import { signaturePastries } from "@/data/pastries";
import { commerceLinks } from "@/data/content";
import { useLanguage } from "@/components/LanguageProvider";

export function BakeryTextureGallery() {
  const { language } = useLanguage();
  const es = language === "es";
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const displayIndex = previewIndex ?? selectedIndex;
  const activePastry = signaturePastries[displayIndex];

  const selectPastry = (index: number) => {
    setSelectedIndex(index);
    setPreviewIndex(null);
  };

  return (
    <section className="texture-gallery section" id="textures" aria-labelledby="texture-gallery-title">
      <div className="container texture-gallery-inner">
        <div className="texture-gallery-heading">
          <div>
            <p>Honeyvault Bakery</p>
            <h2 id="texture-gallery-title">{es ? "Texturas distintivas" : "Signature textures"}</h2>
          </div>
          <span>{es ? "Pasa el cursor y prueba con los ojos." : "Hover to taste with your eyes."}</span>
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
              </button>
            );
          })}
        </div>

        <div className="texture-info-panel">
          <div className="texture-info-bubble">
            <div className="texture-info-copy">
              <div className="texture-info-title-row">
                <h3>{es ? activePastry.nameEs : activePastry.name}</h3>
                <strong>{activePastry.price}</strong>
              </div>
              <p>{es ? activePastry.detailEs : activePastry.detail}</p>
              <span className="texture-sensory">{es ? activePastry.sensoryEs : activePastry.sensory}</span>
              <span className="texture-allergens">{es ? activePastry.allergensEs : activePastry.allergens}</span>
            </div>

            <a className="texture-info-button" href={activePastry.orderHref ?? commerceLinks.getPastry}>
              <ShoppingBag size={15} strokeWidth={2} aria-hidden="true" />
              <span>{es ? "Conseguir este pastel" : "Get this pastry"}</span>
              <ArrowUpRight size={14} strokeWidth={2} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
