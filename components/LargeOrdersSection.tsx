"use client";

import Image from "next/image";
import { useLanguage } from "@/components/LanguageProvider";
import { useOrder } from "@/components/OrderProvider";
import { orderItems } from "@/data/orderItems";


export function LargeOrdersSection() {
  const { language } = useLanguage();
  const { draft, toggleSpecialItem } = useOrder();
  const es = language === "es";

  return (
    <section className="section large-orders" id="large-orders" aria-labelledby="large-orders-title">
      <div className="container">
        <div className="large-orders-heading">
          <div>
            <p className="large-orders-eyebrow">Honeyvault Bakery</p>
            <h2 id="large-orders-title">{es ? "Pedidos grandes, horneados con belleza" : "Big orders, baked beautifully"}</h2>
            <p>
              {es
                ? "Desde una caja hasta mesas completas de postres: lotes personalizados para cumpleaños, brunches, oficina, regalos y celebraciones."
                : "From one box to full dessert tables — custom batches for birthdays, brunches, office treats, gifting, and celebrations."}
            </p>
          </div>
          <span className="large-orders-note">{es ? "Preórdenes desde 1 caja" : "Pre-orders start at 1 box"}</span>
        </div>

        <div className="large-orders-gallery" aria-label={es ? "Opciones para pedidos grandes" : "Large order dessert options"}>
          {orderItems.map((item) => {
            const name = es ? item.nameEs : item.name;
            return (
              <button id={`order-item-${item.id}`} className="large-order-card" type="button" key={item.id} aria-label={name} aria-pressed={draft.specialItemIds.includes(item.id)} onClick={() => toggleSpecialItem(item.id)}>
                <Image src={item.image} alt={name} fill sizes="(max-width: 768px) 72vw, 260px" />
                <span>{draft.specialItemIds.includes(item.id) ? (es ? "Seleccionado · " : "Selected · ") : ""}{name}</span>
              </button>
            );
          })}
        </div>

        <aside className="large-orders-cta" aria-labelledby="large-orders-cta-title">
          <div className="large-orders-cta-main">
            <h3 id="large-orders-cta-title">{es ? "¿Planeas algo más grande?" : "Planning something bigger?"}</h3>
            <p className="large-orders-cta-intro">
              {es
                ? "De cumpleaños y brunches a oficina y reuniones grandes: cuéntanos qué planeas y te ayudaremos con cantidades, disponibilidad, recogida o entrega local."
                : "From birthdays and brunches to office treats and larger gatherings, tell us what you're planning and we'll help with quantities, availability, pickup or local delivery."}
            </p>

            <div className="large-orders-paths">
              <div className="large-orders-path">
                <span className="large-orders-path-label">{es ? "Celebración o reunión" : "Celebration or gathering"}</span>
                <p>{es ? "Cumpleaños, brunches, mesas de postres, regalos y momentos que requieren más que una compra normal." : "Birthdays, brunches, dessert tables, gifting and other moments that need more than a standard pastry run."}</p>
              </div>
              <div className="large-orders-path">
                <span className="large-orders-path-label">{es ? "¿Para un negocio o equipo?" : "Ordering for a business or team?"}</span>
                <p>{es ? "Desayunos de oficina, regalos para clientes, días de producción y pedidos para grupos grandes." : "Office breakfasts, client gifting, production days and larger group orders."}</p>
              </div>
            </div>
          </div>

          <div className="large-orders-actions">
            <ul className="large-orders-details" aria-label={es ? "Detalles del pedido" : "Large order details"}>
              <li>{es ? "Hecho por encargo" : "Made to order"}</li>
              <li>{es ? "Recogida o entrega local" : "Pickup or local delivery"}</li>
              <li>{es ? "Se recomienda pedir con antelación" : "Advance order recommended"}</li>
            </ul>
            <a className="large-orders-button" href="#large-order-inquiry">{es ? "Solicitar pedido grande" : "Request a large order"}</a>
            <p>{es ? "Dinos la fecha, cantidad aproximada y qué estás planeando." : "Tell us the date, approximate quantity and what you're planning."}</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
