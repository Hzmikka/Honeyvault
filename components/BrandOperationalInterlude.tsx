"use client";

import Image from "next/image";
import { Check, Clock3, MapPin, Truck } from "lucide-react";
import { honeyvaultLocations } from "@/data/locations";
import { freshBakedFacts, fulfillmentFacts } from "@/data/brandInterlude";
import { useLanguage } from "@/components/LanguageProvider";

const artwork = { src: "/images/brand/brand-operational-template.webp", width: 1672, height: 941 };

function PosterCopy({ compact = false, es = false }: { compact?: boolean; es?: boolean }) {
  return (
    <>
      <p className="brand-art-wordmark" aria-hidden={compact ? "true" : undefined}>Honeyvault<br />Bakery</p>
      <div className="brand-art-pills" aria-hidden="true">
        <span className="brand-art-pill brand-art-pill--fresh">{es ? "Fresco a diario" : "Fresh daily"}</span>
        <span className="brand-art-pill brand-art-pill--coffee">{es ? "Café" : "Coffee"}</span>
        <span className="brand-art-pill brand-art-pill--viennoiserie">Viennoiserie</span>
        <span className="brand-art-pill brand-art-pill--pastries">{es ? "Pasteles" : "Pastries"}</span>
      </div>
      <h2 className="brand-art-headline" id={compact ? undefined : "brand-interlude-title"}>
        <span>{es ? "Algunas cosas pueden esperar," : "Some things can wait,"}</span>
        <span>{es ? "los pasteles frescos no deberían." : "fresh pastries shouldn't."}</span>
      </h2>
    </>
  );
}

function FreshCopy({ mobile = false, es = false }: { mobile?: boolean; es?: boolean }) {
  return (
    <article className={mobile ? "brand-art-copy brand-art-copy--mobile brand-art-copy--fresh" : "brand-art-copy brand-art-copy--fresh"}>
      <h3><span>{es ? "Fresco" : "Fresh"}</span><span>{es ? "Cada Día" : "Baked Daily"}</span></h3>
      <p>{es ? "Cada mañana, nuestros panaderos empiezan antes del amanecer para traer lo mejor de Honeyvault." : "Every morning, our bakers start before sunrise to bring you the best of Honeyvault."}</p>
      <ul>
        {freshBakedFacts.map((fact) => (
          <li key={fact.en}><Check aria-hidden="true" /><span>{es ? fact.es : fact.en}</span></li>
        ))}
      </ul>
      <span className="brand-art-card-pill brand-art-card-pill--daily" aria-hidden="true">{es ? "Ritual diario" : "Daily ritual"}</span>
    </article>
  );
}

function DeliveryCopy({ mobile = false, es = false }: { mobile?: boolean; es?: boolean }) {
  const locationCount = honeyvaultLocations.length;
  return (
    <article className={mobile ? "brand-art-copy brand-art-copy--mobile brand-art-copy--delivery" : "brand-art-copy brand-art-copy--delivery"}>
      <span className="brand-art-card-pill brand-art-card-pill--order" aria-hidden="true">{es ? "Pide antes" : "Order ahead"}</span>
      <h3><span>Miami</span><span>{es ? "Recogida y" : "Pickup &"}</span><span>{es ? "Entrega" : "Delivery"}</span></h3>
      <p>{es ? "Disfruta tus pasteles favoritos donde estés en Miami. Recogida o entrega local." : "Enjoy your favorite pastries wherever you are in Miami. Pickup or local delivery."}</p>
      <ul>
        <li><MapPin aria-hidden="true" /><span>{es ? `Recogida en ${locationCount} tiendas de Miami` : `Pickup at ${locationCount} Miami shops`}</span></li>
        <li><Truck aria-hidden="true" /><span>{es ? fulfillmentFacts[0].es : fulfillmentFacts[0].en}</span></li>
        <li><Clock3 aria-hidden="true" /><span>{es ? fulfillmentFacts[1].es : fulfillmentFacts[1].en}</span></li>
      </ul>
      <span className="brand-art-card-pill brand-art-card-pill--local" aria-hidden="true">{es ? "Local y fresco" : "Local & fresh"}</span>
    </article>
  );
}

function ArtworkImage({ className }: { className: string }) {
  return <Image src={artwork.src} alt="" width={artwork.width} height={artwork.height} className={className} sizes="(max-width: 680px) 100vw, 1240px" aria-hidden="true" />;
}

export function BrandOperationalInterlude() {
  const { language } = useLanguage();
  const es = language === "es";
  return (
    <section className="brand-operational-interlude" aria-labelledby="brand-interlude-title">
      <div className="brand-art-desktop">
        <ArtworkImage className="brand-art-image" />
        <div className="brand-art-overlay"><PosterCopy es={es} /><FreshCopy es={es} /><DeliveryCopy es={es} /></div>
      </div>

      <div className="brand-art-mobile" aria-label={es ? "Información de frescura y entrega de Honeyvault" : "Honeyvault bakery freshness and fulfillment information"}>
        <div className="brand-art-mobile-panel brand-art-mobile-poster">
          <ArtworkImage className="brand-art-mobile-source brand-art-mobile-source--poster" />
          <div className="brand-art-mobile-overlay brand-art-mobile-overlay--poster"><PosterCopy compact es={es} /></div>
        </div>
        <div className="brand-art-mobile-panel brand-art-mobile-card">
          <ArtworkImage className="brand-art-mobile-source brand-art-mobile-source--left" />
          <div className="brand-art-mobile-overlay"><FreshCopy mobile es={es} /></div>
        </div>
        <div className="brand-art-mobile-panel brand-art-mobile-card">
          <ArtworkImage className="brand-art-mobile-source brand-art-mobile-source--right" />
          <div className="brand-art-mobile-overlay"><DeliveryCopy mobile es={es} /></div>
        </div>
      </div>
    </section>
  );
}
