"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { useOrder } from "@/components/OrderProvider";
import { orderItems } from "@/data/orderItems";
import { SectionLink } from "@/components/SectionLink";

export function LargeOrdersSection() {
  const { language } = useLanguage();
  const { draft, updateOrder, toggleSpecialItem } = useOrder();
  const es = language === "es";
  const galleryRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ first: 1, last: 1, atStart: true, atEnd: false });
  const syncPosition = useCallback(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;
    const viewport = gallery.getBoundingClientRect();
    const cards = Array.from(gallery.querySelectorAll<HTMLElement>(".large-order-card"));
    const bounds = cards.map((card, index) => ({ rect: card.getBoundingClientRect(), index }));
    const visible = bounds.filter(({ rect }) => rect.right > viewport.left + 2 && rect.left < viewport.right - 2);
    setPosition({
      first: (visible[0]?.index ?? 0) + 1,
      last: (visible[visible.length - 1]?.index ?? 0) + 1,
      atStart: !bounds.length || bounds[0].rect.left >= viewport.left - 2,
      atEnd: !bounds.length || bounds[bounds.length - 1].rect.right <= viewport.right + 2,
    });
  }, []);
  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;
    const observer = new ResizeObserver(syncPosition);
    observer.observe(gallery);
    syncPosition();
    return () => observer.disconnect();
  }, [syncPosition]);
  function move(direction: number) {
    const gallery = galleryRef.current;
    if (!gallery) return;
    const card = gallery.querySelector<HTMLElement>(".large-order-card");
    gallery.scrollBy({ left: direction * ((card?.offsetWidth ?? 260) + 16), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }
  return <section className="section large-orders" id="large-orders" aria-labelledby="large-orders-title"><div className="container">
    <div className="large-orders-heading"><div><p className="large-orders-eyebrow">{es ? "PARA REUNIR A TODOS" : "FOR THE WHOLE GATHERING"}</p><h2 id="large-orders-title">{es ? "Pequeños postres, grandes momentos." : "Small desserts. Big occasions."}</h2><p>{es ? "2 mini postres por persona · $4.50 cada uno · 48 h de anticipación." : "2 mini desserts per guest · $4.50 each · 48 hours notice."}</p></div><span className="large-orders-note">{es ? "Desde 6 personas · 12 minis" : "From 6 guests · 12 minis"}</span></div>
    <div className="gallery-controls"><span aria-live="polite">{position.first}{position.last !== position.first ? `–${position.last}` : ""} / {orderItems.length} · {draft.specialItemIds.length} {es ? "seleccionados" : "selected"}</span><div><button type="button" aria-label={es ? "Ver postres anteriores" : "Previous desserts"} disabled={position.atStart} onClick={() => move(-1)}><ArrowLeft size={18} aria-hidden="true" /></button><button type="button" aria-label={es ? "Ver siguientes postres" : "Next desserts"} disabled={position.atEnd} onClick={() => move(1)}><ArrowRight size={18} aria-hidden="true" /></button></div></div>
    <div className="large-orders-gallery" ref={galleryRef} aria-label={es ? "Selecciona mini postres para un evento" : "Select mini desserts for an event"} onScroll={syncPosition}>
      {orderItems.map(item => <button id={`order-item-${item.id}`} className="large-order-card" type="button" key={item.id} aria-label={es ? item.nameEs : item.name} aria-pressed={draft.specialItemIds.includes(item.id)} onClick={() => toggleSpecialItem(item.id)}><span className="large-order-photo"><Image src={item.image} alt="" fill sizes="(max-width: 768px) 72vw, 260px" /></span><span className="large-order-name">{draft.specialItemIds.includes(item.id) ? "✓ · " : ""}{es ? item.nameEs : item.name}</span></button>)}
    </div>
    <aside className="large-orders-cta" aria-labelledby="large-orders-cta-title"><div className="large-orders-cta-main"><h3 id="large-orders-cta-title">{es ? "Tu mesa, con todos los detalles claros." : "Your dessert table, clearly planned."}</h3><p className="large-orders-cta-intro">{es ? "Lleva tus sabores al formulario y ajusta invitados, entrega y presentación." : "Take your flavors to the form and choose guests, delivery and presentation."}</p></div><div className="large-orders-actions"><SectionLink className="large-orders-button" href="#large-order-inquiry" onClick={() => updateOrder({ intent: "large-order" })}>{es ? "Planear mi evento" : "Plan my event"}</SectionLink></div></aside>
  </div></section>;
}
