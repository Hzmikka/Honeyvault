"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { featuredProofReviews } from "@/data/proof";
import { useLanguage } from "@/components/LanguageProvider";

export function HoneyvaultHighlights() {
  const { language } = useLanguage();
  const es = language === "es";

  return (
    <section className="section proof-section" id="proof" aria-labelledby="proof-title">
      <div className="container">
        <header className="proof-header">
          <p className="proof-eyebrow">{es ? "LO QUE DICEN LOS CLIENTES" : "REAL GUEST LOVE"}</p>
          <h2 id="proof-title">{es ? "Por qué la gente vuelve." : "Why people come back."}</h2>
          <p className="proof-intro">
            {es ? "Un buen pastel llama la atención. La experiencia hace que vuelvan." : "Good pastry gets attention. The experience brings people back."}
          </p>
          <span className="proof-demo-label">{es ? "Demo de portafolio · reseñas de muestra" : "Portfolio demo · sample guest notes"}</span>
        </header>

        <figure className="proof-experience-media">
          <Image
            src="/images/proof/honeyvault-counter-handoff.webp"
            alt={es ? "Personal de Honeyvault entregando una caja rosa a una clienta" : "Honeyvault bakery staff handing a pink pastry box to a customer at the bakery counter"}
            fill
            sizes="(max-width: 680px) calc(100vw - 2rem), 1056px"
          />
        </figure>

        <div className="proof-review-grid">
          {featuredProofReviews.map((review) => (
            <article className="proof-review" key={review.id}>
              <div className="proof-stars" aria-label={es ? `${review.rating} de 5 estrellas` : `${review.rating} out of 5 stars`}>
                {Array.from({ length: review.rating }).map((_, index) => (
                  <Star key={index} size={14} fill="currentColor" strokeWidth={1.5} aria-hidden="true" />
                ))}
              </div>
              <h3>{es ? review.titleEs : review.title}</h3>
              <p>{es ? review.bodyEs : review.body}</p>
              <footer><strong>{review.name}</strong><span>{review.location}</span></footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
