"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, ShoppingBag } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { useOrder } from "@/components/OrderProvider";
import { signaturePastries } from "@/data/pastries";
import { honeyvaultLocations } from "@/data/locations";
import { orderItems } from "@/data/orderItems";
import { demoBoxes, deliveryZones, eventTerms } from "@/data/demoCommerce";
import { availableSlots, DemoOrder, DemoQuote, earliestSlot, Journey, miamiParts, money, OrderError, quoteDemoOrder, validateDemoOrder } from "@/lib/demoCommerce";

export function LargeOrderInquiry() {
  const { language } = useLanguage();
  const es = language === "es";
  const { draft, updateOrder, toggleSpecialItem } = useOrder();
  const journey: Journey = draft.intent === "box" ? "box" : draft.intent === "celebration" || draft.intent === "large-order" ? "event" : "pastry";
  const [quantity, setQuantity] = useState(1);
  const [boxQuantity, setBoxQuantity] = useState(1);
  const [guests, setGuests] = useState(24);
  const [zip, setZip] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [flexibleDate, setFlexibleDate] = useState(false);
  const [styling, setStyling] = useState(false);
  const [eventName, setEventName] = useState("");
  const [errors, setErrors] = useState<Partial<Record<OrderError, true>>>({});
  const [submitted, setSubmitted] = useState<{ input: DemoOrder; quote: DemoQuote; eventName: string } | null>(null);
  const [now, setNow] = useState(() => new Date());
  const receiptRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const fulfillment = draft.fulfillment === "Local delivery" ? "Local delivery" : "Pickup";
  const selectedZone = deliveryZones.find(zone => zone.zip === zip);
  const effectiveShop = fulfillment === "Local delivery" && selectedZone?.delivery ? selectedZone.locationId : draft.locationId || "wynwood";

  useEffect(() => { const timer = window.setInterval(() => setNow(new Date()), 60000); return () => window.clearInterval(timer); }, []);
  useEffect(() => {
    const first = earliestSlot(journey, effectiveShop);
    setDate(first.date); setTime(first.time); setErrors({}); setSubmitted(null);
  }, [journey, effectiveShop]);
  useEffect(() => { setSubmitted(null); setErrors({}); }, [draft.pastryId, draft.boxId, draft.specialItemIds, fulfillment]);
  useEffect(() => { if (fulfillment === "Pickup") setStyling(false); }, [fulfillment]);
  useEffect(() => { if (submitted) receiptRef.current?.focus(); }, [submitted]);

  const input: DemoOrder = {
    journey, pastryId: draft.pastryId || signaturePastries[0].id, boxId: draft.boxId,
    quantity: journey === "box" ? boxQuantity : quantity, guests, specialItemIds: draft.specialItemIds,
    locationId: draft.locationId || "wynwood", fulfillment, zip, date, time,
    flexibleDate: journey === "event" && flexibleDate, styling: journey === "event" && styling,
  };
  const quote = quoteDemoOrder(input);
  const slots = availableSlots(journey, effectiveShop, date, now);
  const currentChecks = validateDemoOrder(input, now);
  const shop = honeyvaultLocations.find(item => item.id === effectiveShop)!;
  const box = demoBoxes.find(item => item.id === draft.boxId) || demoBoxes[0];
  const texts: Record<OrderError, string> = {
    product: es ? "Selecciona un producto del menú." : "Choose a product from the menu.",
    quantity: es ? `Indica entre 1 y ${journey === "box" ? 10 : 24} ${journey === "box" ? "cajas" : "piezas"}, sin decimales.` : `Enter 1–${journey === "box" ? 10 : 24} whole ${journey === "box" ? "boxes" : "pieces"}.`,
    guests: es ? "Indica entre 6 y 200 personas, sin decimales." : "Enter 6–200 guests, in whole numbers.",
    specials: es ? "Elige al menos un mini postre para el evento." : "Choose at least one mini dessert for your event.",
    location: es ? "Elige una tienda y modalidad válidas." : "Choose a valid shop and fulfillment option.",
    coverage: es ? "ZIP fuera de la cobertura de muestra. Prueba 33127, 33134 o elige recogida." : "ZIP outside sample coverage. Try 33127, 33134 or choose pickup.",
    "pickup-only": es ? "33139 es solo recogida en South Beach. Cambia a recogida o prueba 33127." : "33139 is pickup only at South Beach. Choose pickup or try 33127.",
    minimum: es ? `La entrega a ${zip} requiere ${money(selectedZone?.minimumCents ?? 0)} en productos. Añade piezas o elige recogida.` : `Delivery to ${zip} needs ${money(selectedZone?.minimumCents ?? 0)} in products. Add pieces or choose pickup.`,
    date: es ? "Elige una fecha válida desde hoy, según la hora de Miami." : "Choose a valid date from today, in Miami time.",
    slot: es ? "No hay una franja válida seleccionada. Respeta la anticipación y el horario de la tienda." : "Choose an available time, allowing for preparation and shop hours.",
    stock: es ? "Esta pieza está agotada hoy en esta tienda. Prueba Coral Gables o una fecha posterior." : "This pastry is sold out today at this shop. Try Coral Gables or a later date.",
    styling: es ? "El montaje de mesa requiere entrega local." : "Table setup requires local delivery.",
  };

  function switchJourney(next: Journey) {
    updateOrder({ intent: next === "event" ? "large-order" : next });
    setErrors({}); setSubmitted(null);
  }
  function useSample() {
    updateOrder({ intent: "large-order", specialItemIds: ["strawberry-tartlets", "citrus-cream-cups", "pastel-cake-pops"], locationId: "wynwood", fulfillment: "Local delivery" });
    setGuests(24); setZip("33127"); setStyling(true); setFlexibleDate(false);
    const first = earliestSlot("event", "wynwood"); setDate(first.date); setTime(first.time);
    setEventName(es ? "Brunch del equipo · ejemplo" : "Team brunch · sample"); setErrors({});
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const checked = validateDemoOrder(input, new Date());
    setErrors(checked.errors);
    if (!checked.valid) { window.requestAnimationFrame(() => errorRef.current?.focus()); return; }
    setSubmitted({ input: { ...input, specialItemIds: [...input.specialItemIds] }, quote: checked.quote, eventName });
  }
  function priceRows(value: DemoQuote, order: DemoOrder = input) {
    const deliveryKnown = order.fulfillment === "Pickup" || deliveryZones.some(zone => zone.zip === order.zip && zone.delivery);
    return <>
      {value.lines.map(line => <div className="quote-line" key={line.id}><span>{line.count} × {es ? line.nameEs : line.name}</span><strong>{money(line.cents)}</strong></div>)}
      <div className="quote-line"><span>{es ? "Entrega" : "Delivery"}</span><strong>{!deliveryKnown ? (es ? "Por definir" : "To be determined") : value.deliveryCents ? money(value.deliveryCents) : (es ? "Sin cargo" : "No charge")}</strong></div>
      {value.stylingCents > 0 && <div className="quote-line"><span>{es ? "Presentación y montaje" : "Presentation & setup"}</span><strong>{money(value.stylingCents)}</strong></div>}
      <div className="quote-line quote-total"><span>{es ? "Total simulado" : "Simulated total"}</span><strong>{deliveryKnown ? money(value.totalCents) : "—"}</strong></div>
      <p className="demo-fineprint">{es ? "USD · precios de muestra con impuestos incluidos. No se realiza ningún cobro." : "USD · sample prices include tax. No payment is taken."}</p>
    </>;
  }

  return <section className="section demo-checkout" id="large-order-inquiry" aria-labelledby="demo-order-title">
    <div className="container">
      <header className="demo-section-heading">
        <p className="demo-eyebrow">{es ? "DE LA ELECCIÓN AL RESUMEN" : "FROM PICK TO PREVIEW"}</p>
        <h2 id="demo-order-title">{es ? "Tu próximo momento dulce." : "Your next sweet moment."}</h2>
        <p>{es ? "Prueba un recorrido completo con datos de ejemplo. No necesitas registrarte ni compartir tu contacto." : "Try a complete journey with sample details. No account or contact information needed."}</p>
      </header>
      <div className="journey-switch" role="group" aria-label={es ? "Tipo de pedido" : "Order type"}>
        {(["pastry", "box", "event"] as Journey[]).map((kind, index) => <button type="button" key={kind} aria-pressed={journey === kind} onClick={() => switchJourney(kind)}><span>0{index + 1}</span>{kind === "pastry" ? (es ? "Una pieza" : "Daily pastries") : kind === "box" ? (es ? "Una caja" : "A box to share") : (es ? "Un evento" : "An event")}</button>)}
      </div>
      {submitted ? <div className="demo-receipt" id="demo-receipt" ref={receiptRef} tabIndex={-1}>
        <span className="receipt-icon"><Check aria-hidden="true" /></span>
        <p className="demo-eyebrow">{es ? "SIMULACIÓN COMPLETADA" : "SIMULATION COMPLETE"}</p>
        <h3>{es ? "Así de claro llegaría tu resumen." : "A sweet plan, clearly laid out."}</h3>
        <p>{es ? "No se ha comprado, reservado ni enviado nada. Este es el resultado de tu prueba." : "Nothing was purchased, reserved or sent. This is the result of your test."}</p>
        {submitted.input.journey === "event" && submitted.eventName && <p>{submitted.eventName}</p>}
        <dl className="receipt-details">
          <div><dt>{es ? "Tienda" : "Shop"}</dt><dd>{honeyvaultLocations.find(item => item.id === submitted.quote.locationId)?.name}</dd></div>
          <div><dt>{es ? "Modalidad" : "Fulfillment"}</dt><dd>{submitted.input.fulfillment === "Pickup" ? (es ? "Recogida" : "Pickup") : `${es ? "Entrega" : "Delivery"} · ZIP ${submitted.input.zip}`}</dd></div>
          <div><dt>{es ? "Fecha y hora · Miami" : "Date & time · Miami"}</dt><dd>{submitted.input.flexibleDate ? (es ? "Fecha por definir" : "Date to be arranged") : `${submitted.input.date} · ${submitted.input.time}`}</dd></div>
          <div><dt>{es ? "Cantidad" : "Quantity"}</dt><dd>{submitted.input.journey === "event" ? `${submitted.input.guests} ${es ? "personas · " : "guests · "}` : ""}{submitted.quote.pieces} {es ? "piezas" : "pieces"}</dd></div>
        </dl>
        <div className="receipt-prices">{priceRows(submitted.quote, submitted.input)}</div>
        <div className="demo-next-step"><strong>{es ? "En una pastelería real" : "At a real bakery"}</strong><p>{submitted.input.journey === "event" ? (es ? "El equipo revisaría la disponibilidad y enviaría una cotización en un día laborable. Solo tu aprobación y el depósito confirmarían el evento." : "The team would review availability and send a quote within one business day. Your approval and deposit would confirm the event.") : (es ? "El siguiente paso sería comprobar stock y pagar de forma segura. El pago y la confirmación de la tienda cerrarían el pedido." : "Next would come a stock check and secure payment. Payment and shop confirmation would complete the order.")}</p></div>
        <div className="demo-button-row"><button className="demo-button" type="button" onClick={() => setSubmitted(null)}>{es ? "Editar mi prueba" : "Edit my test"}</button><a className="demo-text-link" href="mailto:celestewebstudio@gmail.com?subject=Quiero%20una%20web%20como%20Honeyvault">{es ? "Quiero una web así" : "I want a website like this"}<ArrowUpRight size={16} aria-hidden="true" /></a></div>
        <p className="demo-fineprint">{es ? "Diseño y desarrollo por Celeste Web Studio." : "Designed & built by Celeste Web Studio."}</p>
      </div> : <div className="demo-order-layout">
        <form className="demo-order-form" noValidate onSubmit={submit}>
          <div className="demo-form-step"><span>01</span><h3>{journey === "event" ? (es ? "Tu reunión" : "Your gathering") : (es ? "Tu selección" : "Your selection")}</h3></div>
          {journey === "pastry" && <div className="demo-field-grid"><label>{es ? "Pastel" : "Pastry"}<select value={input.pastryId} onChange={event => updateOrder({ pastryId: event.target.value, intent: "pastry" })}>{signaturePastries.map(item => <option value={item.id} key={item.id}>{es ? item.nameEs : item.name} · {item.price}</option>)}</select></label><label>{es ? "Número de piezas · 1–24" : "Number of pieces · 1–24"}<input type="number" min="1" max="24" step="1" value={quantity || ""} onChange={event => setQuantity(Number(event.target.value))} /></label></div>}
          {journey === "box" && <><div className="demo-field-grid"><label>{es ? "Caja" : "Box"}<select value={draft.boxId} onChange={event => updateOrder({ boxId: event.target.value })}>{demoBoxes.map(item => <option value={item.id} key={item.id}>{es ? item.nameEs : item.name} · {item.pieces} · {money(item.priceCents)}</option>)}</select></label><label>{es ? "Número de cajas · 1–10" : "Number of boxes · 1–10"}<input type="number" min="1" max="10" step="1" value={boxQuantity || ""} onChange={event => setBoxQuantity(Number(event.target.value))} /></label></div><p className="demo-hint">{es ? `Cada caja: ${box.perFlavor} de almendra + ${box.perFlavor} de pistacho + ${box.perFlavor} de chocolate. Surtido fijo, sin sustituciones en esta demo.` : `Each box: ${box.perFlavor} almond + ${box.perFlavor} pistachio + ${box.perFlavor} chocolate. Fixed assortment, no substitutions in this demo.`}</p></>}
          {journey === "event" && <>
            <button className="sample-data-button" type="button" onClick={useSample}>{es ? "Rellenar con un evento de ejemplo" : "Fill with a sample event"}</button>
            <div className="demo-field-grid"><label>{es ? "Personas · 6–200" : "Guests · 6–200"}<input type="number" min="6" max="200" step="1" value={guests || ""} onChange={event => setGuests(Number(event.target.value))} /></label><label>{es ? "Nombre del evento · opcional" : "Event name · optional"}<input maxLength={80} value={eventName} onChange={event => setEventName(event.target.value)} placeholder={es ? "Ej.: brunch del equipo" : "E.g. team brunch"} /></label></div>
            <p className="demo-hint">{es ? `2 mini postres por persona a ${money(eventTerms.unitCents)} cada uno. Repartimos las piezas de forma equilibrada entre tus sabores.` : `2 mini desserts per guest at ${money(eventTerms.unitCents)} each. Pieces are split evenly between your flavors.`}</p>
            <fieldset className="demo-specials"><legend>{es ? "Elige los mini postres · al menos uno" : "Choose mini desserts · at least one"}</legend>{orderItems.map(item => <label key={item.id}><input type="checkbox" checked={draft.specialItemIds.includes(item.id)} onChange={() => toggleSpecialItem(item.id)} /><span>{es ? item.nameEs : item.name}</span></label>)}</fieldset>
            <p className="demo-fineprint">{es ? "Muestra: mini piezas de 4–6 cm; cake pops y fresas de una porción. Recetas de ejemplo con trigo, leche, huevo y posibles frutos secos. No apto para decidir sobre alergias." : "Sample: 4–6 cm minis; cake pops and strawberries are single bites. Example recipes contain wheat, milk, egg and possible nuts. Not an allergy guide."}</p>
          </>}
          <div className="demo-form-step"><span>02</span><h3>{es ? "Dónde y cuándo" : "Where & when"}</h3></div>
          <fieldset className="demo-fulfillment"><legend>{es ? "Modalidad" : "Fulfillment"}</legend>{(["Pickup", "Local delivery"] as const).map(value => <label key={value}><input type="radio" name="fulfillment" value={value} checked={fulfillment === value} onChange={() => updateOrder({ fulfillment: value })} />{value === "Pickup" ? (es ? "Recogida" : "Pickup") : (es ? "Entrega local" : "Local delivery")}</label>)}</fieldset>
          {fulfillment === "Pickup" ? <label>{es ? "Tienda de recogida" : "Pickup shop"}<select value={input.locationId} onChange={event => updateOrder({ locationId: event.target.value })}>{honeyvaultLocations.map(item => <option key={item.id} value={item.id}>{item.shortName} · {es ? item.scheduleSummaryEs : item.scheduleSummary}</option>)}</select></label> : <div className="demo-delivery"><label>{es ? "ZIP de entrega · cobertura de muestra" : "Delivery ZIP · sample coverage"}<input inputMode="numeric" maxLength={5} pattern="[0-9]{5}" value={zip} onChange={event => setZip(event.target.value.replace(/\D/g, ""))} placeholder="33127" /></label><div className="demo-zip-examples">{deliveryZones.map(zone => <button type="button" key={zone.zip} onClick={() => setZip(zone.zip)}>{zone.zip}{zone.delivery ? ` · ${money(zone.feeCents)}` : ` · ${es ? "recogida" : "pickup"}`}</button>)}</div><p className="demo-hint" role="status">{selectedZone?.delivery ? `${shop.shortName} · ${money(selectedZone.feeCents)} ${es ? "de entrega · mínimo de productos" : "delivery · product minimum"} ${money(selectedZone.minimumCents)}` : selectedZone ? texts["pickup-only"] : zip.length === 5 ? texts.coverage : (es ? "Usa uno de los ZIP de ejemplo para probar la cobertura." : "Use a sample ZIP to try the coverage.")}</p>{selectedZone && !selectedZone.delivery && <button type="button" className="demo-inline-button" onClick={() => updateOrder({ fulfillment: "Pickup", locationId: "south-beach" })}>{es ? "Recoger en South Beach" : "Pick up at South Beach"}</button>}</div>}
          {journey === "event" && <label className="demo-check"><input type="checkbox" checked={flexibleDate} onChange={event => setFlexibleDate(event.target.checked)} />{es ? "Todavía no tengo fecha" : "My date is still flexible"}</label>}
          {!input.flexibleDate && <div className="demo-field-grid"><label>{es ? "Fecha · Miami" : "Date · Miami"}<input type="date" min={miamiParts(now).date} value={date} onChange={event => { setDate(event.target.value); setTime(availableSlots(journey, effectiveShop, event.target.value)[0] || ""); }} /></label><label>{es ? "Hora · Miami" : "Time · Miami"}<select value={time} onChange={event => setTime(event.target.value)}><option value="">{es ? "Elige una franja" : "Choose a time"}</option>{slots.map(slot => <option key={slot} value={slot}>{slot}</option>)}</select></label></div>}
          <p className="demo-hint">{journey === "pastry" ? (es ? "30 min de preparación. Stock de ejemplo por tienda y fecha." : "30 min preparation. Sample stock varies by shop and date.") : journey === "box" ? (es ? "Reserva de muestra con al menos 24 horas de anticipación." : "Sample preorder with at least 24 hours notice.") : (es ? "Al menos 48 horas de anticipación para una fecha concreta." : "At least 48 hours notice for a fixed date.")} {es ? "Solo mostramos franjas dentro del horario de la tienda." : "Times follow the shop's opening hours."}</p>
          {!input.flexibleDate && !slots.length && <p className="demo-notice">{es ? "La tienda está cerrada o no queda tiempo de preparación ese día." : "The shop is closed or there is no preparation time left that day."} <button type="button" className="demo-inline-button" onClick={() => { const next = earliestSlot(journey, effectiveShop); setDate(next.date); setTime(next.time); }}>{es ? "Elegir próxima franja" : "Use next available time"}</button></p>}
          {currentChecks.errors.stock && <p className="demo-notice">{texts.stock} <button className="demo-inline-button" type="button" onClick={() => { updateOrder({ locationId: "coral-gables", fulfillment: "Pickup" }); }}>{es ? "Ver Coral Gables" : "Try Coral Gables"}</button></p>}
          {journey === "event" && <div className="demo-service"><h4>{es ? "Qué incluye" : "What's included"}</h4><p>{es ? "Mini postres seleccionados, reparto por sabor y cajas para transportar. Recogida sin cargo; entrega según ZIP." : "Selected minis, quantities per flavor and transport boxes. Pickup is free; delivery follows your ZIP."}</p><label className="demo-check"><input type="checkbox" checked={styling} disabled={fulfillment !== "Local delivery"} onChange={event => setStyling(event.target.checked)} />{es ? "Añadir presentación y montaje · $75" : "Add presentation & setup · $75"}</label><p className="demo-fineprint">{es ? "Con entrega local: bases de exhibición de muestra y 30 min de montaje. Mesa, decoración floral, servicio durante el evento y desmontaje no incluidos." : "With local delivery: sample display stands and 30 min setup. Table, flowers, event staffing and teardown are not included."}</p></div>}
          {Object.keys(errors).length > 0 && <div className="demo-errors" ref={errorRef} tabIndex={-1} role="alert"><strong>{es ? "Revisa estos detalles" : "Check these details"}</strong><ul>{(Object.keys(errors) as OrderError[]).map(key => <li key={key}>{texts[key]}</li>)}</ul></div>}
          <button className="demo-button demo-submit" type="submit"><ShoppingBag size={17} aria-hidden="true" />{journey === "event" ? (es ? "Simular solicitud de cotización" : "Simulate a quote request") : (es ? "Ver resumen simulado" : "See simulated summary")}<ArrowUpRight size={17} aria-hidden="true" /></button>
          <p className="demo-fineprint">{es ? "Todo se calcula en tu navegador. No se envían datos ni se procesan pagos." : "Everything is calculated in your browser. No details are sent and no payments are processed."}</p>
        </form>
        <aside className="demo-live-quote" aria-labelledby="demo-quote-title"><p className="demo-eyebrow">{es ? "TU SELECCIÓN, SIN SORPRESAS" : "YOUR PICKS, NO SURPRISES"}</p><h3 id="demo-quote-title">{journey === "event" ? (es ? "Presupuesto orientativo" : "Sample event estimate") : (es ? "Un pequeño adelanto" : "A little preview")}</h3><p>{quote.pieces} {es ? "piezas en total" : "pieces in total"}{journey === "event" ? ` · ${guests || 0} ${es ? "personas" : "guests"}` : ""}</p><div aria-live="polite" aria-atomic="true">{priceRows(quote)}</div><p className="demo-quote-shop">{shop.shortName}<br />{es ? shop.scheduleSummaryEs : shop.scheduleSummary}</p><span className="demo-badge">{es ? "Demo de portafolio" : "Portfolio demo"}</span></aside>
      </div>}
    </div>
  </section>;
}
