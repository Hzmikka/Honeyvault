"use client";

import Image from "next/image";
import { useLanguage } from "@/components/LanguageProvider";

const orderItems = [
  { name: "Glazed Croissant Cubes", nameEs: "Cubos de croissant glaseados", image: "/images/order_section_images/01_glazed_croissant_cubes.webp" },
  { name: "Strawberry Cream Tartlets", nameEs: "Tartaletas de fresa y crema", image: "/images/order_section_images/02_strawberry_cream_tartlets.webp" },
  { name: "Raspberry Cream Cupcakes", nameEs: "Cupcakes de frambuesa y crema", image: "/images/order_section_images/03_raspberry_cream_cupcakes.webp" },
  { name: "Black Forest Mini Cakes", nameEs: "Mini cakes Selva Negra", image: "/images/order_section_images/04_black_forest_mini_cakes.webp" },
  { name: "Citrus Cream Cups", nameEs: "Copas de crema cítrica", image: "/images/order_section_images/05_citrus_cream_cups.webp" },
  { name: "Strawberry Danish Rounds", nameEs: "Danesas redondas de fresa", image: "/images/order_section_images/06_strawberry_danish_rounds.webp" },
  { name: "Cherry Blossom Mini Cakes", nameEs: "Mini cakes flor de cerezo", image: "/images/order_section_images/07_cherry_blossom_mini_cakes.webp" },
  { name: "Pastel Cake Pops", nameEs: "Cake pops pastel", image: "/images/order_section_images/08_pastel_cake_pops.webp" },
  { name: "Chocolate Covered Strawberries", nameEs: "Fresas cubiertas de chocolate", image: "/images/order_section_images/09_chocolate_covered_strawberries.webp" },
];

export function LargeOrdersSection() {
  const { language } = useLanguage();
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
              <article className="large-order-card" tabIndex={0} key={item.name}>
                <Image src={item.image} alt={name} fill sizes="(max-width: 768px) 72vw, 260px" />
                <span>{name}</span>
              </article>
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
