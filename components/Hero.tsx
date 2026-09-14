import Image from "next/image";

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-grid">
        <div className="hero-image-wrap">
          <picture>
            <source
              media="(max-width: 680px)"
              srcSet="/images/hero/honeyvault-bakery-movil.webp"
            />
            <Image
              src="/images/hero/honeyvault-bakery.webp"
              alt="Honeyvault Bakery"
              fill
              priority
              sizes="(max-width: 680px) 100vw, 1120px"
            />
          </picture>
        </div>
      </div>
    </section>
  );
}
