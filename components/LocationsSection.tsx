"use client";

import Image from "next/image";
import { ArrowUpRight, MapPin, Navigation, ShoppingBag, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import { honeyvaultLocations } from "@/data/locations";
import { getLocationOpenStatus } from "@/lib/locationStatus";
import { useLanguage } from "@/components/LanguageProvider";

export function LocationsSection() {
  const { language } = useLanguage();
  const es = language === "es";
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const updateClock = () => setNow(new Date());
    updateClock();
    const interval = window.setInterval(updateClock, 60_000);
    return () => window.clearInterval(interval);
  }, []);

  const selectedLocation = honeyvaultLocations[selectedIndex];

  return (
    <section className="locations-section section" id="locations" aria-labelledby="locations-title">
      <div className="container">
        <header className="locations-header">
          <p className="locations-kicker">{es ? "CONSÍGUELO HOY" : "GET IT TODAY"}</p>
          <h2 id="locations-title">{es ? "Elige tu tienda" : "Choose your shop"}</h2>
          <p className="locations-subtitle">
            {es ? "Recogida o entrega local desde tres tiendas en Miami." : "Pickup or local delivery from three Miami locations."}
          </p>
        </header>

        <div className="location-quick-grid">
          {honeyvaultLocations.map((location, index) => {
            const isActive = selectedIndex === index;
            const status = getLocationOpenStatus(location, now, language);
            return (
              <article className={`location-quick-card${isActive ? " active" : ""}`} key={location.id}>
                <div className="location-quick-media">
                  <Image
                    src={location.image}
                    alt={es ? `Interior de ${location.name}` : `${location.name} bakery interior`}
                    fill
                    sizes="(max-width: 680px) 110px, (max-width: 1024px) 32vw, 340px"
                  />
                  <span className="location-label">{es ? location.labelEs : location.label}</span>
                </div>

                <div className="location-quick-body">
                  <div className="location-status-row">
                    <span className="location-status" data-tone={status.tone}>
                      <span className="location-status-dot" aria-hidden="true" />
                      {status.label}
                    </span>
                  </div>

                  <h3>{location.name}</h3>
                  <p className="location-address">
                    {location.address}<br />{location.cityState}
                  </p>

                  <div className="location-fulfillment" aria-label={es ? `Opciones de ${location.name}` : `${location.name} fulfillment options`}>
                    {location.fulfillment.pickup ? (
                      <span><ShoppingBag size={13} strokeWidth={2} aria-hidden="true" />{es ? "Recogida" : "Pickup"}</span>
                    ) : null}
                    {location.fulfillment.localDelivery ? (
                      <span><Truck size={13} strokeWidth={2} aria-hidden="true" />{es ? "Entrega local" : "Local delivery"}</span>
                    ) : null}
                  </div>

                  <div className="location-primary-actions">
                    <a className="location-order-button" href={location.orderUrl}>
                      <span>{es ? `Pedir en ${location.shortName}` : `Order from ${location.shortName}`}</span>
                      <ArrowUpRight size={15} strokeWidth={2} aria-hidden="true" />
                    </a>
                    <a className="location-directions-link" href={location.directionsUrl} target="_blank" rel="noreferrer">
                      <Navigation size={14} strokeWidth={2} aria-hidden="true" />
                      {es ? "Cómo llegar" : "Directions"}
                    </a>
                  </div>

                  <button className="location-map-trigger" type="button" aria-pressed={isActive} onClick={() => setSelectedIndex(index)}>
                    <MapPin size={13} strokeWidth={2} aria-hidden="true" />
                    {isActive ? (es ? "Mostrado en mapa" : "Shown on map") : (es ? "Ver en mapa" : "Show on map")}
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        <div className="location-map-support">
          <div className="location-map-preview">
            <Image
              src={selectedLocation.mapImage}
              alt={es ? `Mapa de ${selectedLocation.name}` : `Map showing ${selectedLocation.name}`}
              fill
              sizes="(max-width: 680px) 100vw, 720px"
            />
          </div>

          <div className="location-map-summary">
            <p>{es ? "EN EL MAPA" : "ON THE MAP"}</p>
            <h3>{selectedLocation.name}</h3>
            <span>{selectedLocation.address}<br />{selectedLocation.cityState}</span>
            <a href={selectedLocation.directionsUrl} target="_blank" rel="noreferrer">
              {es ? "Abrir en Maps" : "Open in Maps"}
              <ArrowUpRight size={14} strokeWidth={2} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
