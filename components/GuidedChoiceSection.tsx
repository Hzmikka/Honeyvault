"use client";

import Image from "next/image";
import { ArrowRight, Boxes, CakeSlice, Croissant, PackageOpen } from "lucide-react";
import { guidedChoices } from "@/data/content";
import { useLanguage } from "@/components/LanguageProvider";

const choiceIcons = [Croissant, PackageOpen, CakeSlice, Boxes] as const;

export function GuidedChoiceSection() {
  const { language } = useLanguage();
  const es = language === "es";

  return (
    <section className="guided-choice-section" aria-labelledby="guided-choice-title">
      <div className="container">
        <div className="guided-choice-shell">
          <header className="guided-choice-header">
            <p className="guided-choice-eyebrow">{es ? "Ruta rápida" : "Quick path"}</p>
            <h2 className="guided-choice-heading" id="guided-choice-title">
              {es ? "¿Qué vienes a buscar?" : "What are you here for?"}
            </h2>
            <p className="guided-choice-intro">
              {es ? "Ve directo a lo que encaja contigo." : "Jump straight to what fits."}
            </p>
          </header>

          <nav className="guided-choice-grid" aria-label={es ? "Comprar por ocasión" : "Shop Honeyvault by occasion"}>
            {guidedChoices.map((choice, index) => {
              const ChoiceIcon = choiceIcons[index];
              return (
                <a className="guided-choice-item" href={choice.href} key={choice.number}>
                  <span className="guided-choice-media" aria-hidden="true">
                    <Image
                      src={choice.image}
                      alt=""
                      fill
                      sizes="(max-width: 680px) calc(100vw - 2rem), (max-width: 1024px) 46vw, 520px"
                    />
                  </span>
                  <span className="guided-choice-scrim" aria-hidden="true" />

                  <div className="guided-choice-meta" aria-hidden="true">
                    <span className="guided-choice-number">{choice.number}</span>
                    <span className="guided-choice-icon">
                      <ChoiceIcon size={17} strokeWidth={1.9} />
                    </span>
                  </div>

                  <div className="guided-choice-copy">
                    <h3>{es ? choice.titleEs : choice.title}</h3>
                    <p>{es ? choice.descriptionEs : choice.description}</p>
                  </div>

                  <ArrowRight className="guided-choice-arrow" size={24} strokeWidth={1.8} aria-hidden="true" />
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </section>
  );
}
