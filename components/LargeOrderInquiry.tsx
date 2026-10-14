"use client";

import { FormEvent, ReactNode, useEffect, useState } from "react";
import { contactLinks } from "@/data/contact";
import { fulfillmentOptions, occasionOptions, quantityOptions } from "@/data/inquiry";
import { honeyvaultLocations } from "@/data/locations";
import { signaturePastries } from "@/data/pastries";
import { orderItems } from "@/data/orderItems";
import { useLanguage } from "@/components/LanguageProvider";
import { useOrder } from "@/components/OrderProvider";
import { getMiamiDate, inquiryErrorText, InquiryErrorCode, InquiryErrors, validateInquiry } from "@/lib/inquiryValidation";

type SubmitState = "idle" | "submitting" | "success" | "error";
type Receipt = ReturnType<typeof validateInquiry>["payload"];
const initialFields = { name: "", contact: "", date: "", time: "", quantity: "", quantityKind: "people", deliveryZip: "", message: "" };

function Field({ name, label, required, error, es, wide, children }: {
  name: string; label: string; required?: boolean; error?: InquiryErrorCode;
  es: boolean; wide?: boolean; children: ReactNode;
}) {
  return <div className={`booking-field${wide ? " booking-field-wide" : ""}`}>
    <label htmlFor={`order-${name}`}>{label}{required ? " *" : <span> {es ? "Opcional" : "Optional"}</span>}</label>
    {children}
    {error ? <span className="booking-field-error" id={`order-${name}-error`} role="alert">{inquiryErrorText(error, es ? "es" : "en")}</span> : null}
  </div>;
}

export function LargeOrderInquiry() {
  const { language } = useLanguage();
  const { draft, updateOrder } = useOrder();
  const es = language === "es";
  const [fields, setFields] = useState(initialFields);
  const [dateFlexible, setDateFlexible] = useState(false);
  const [today, setToday] = useState(getMiamiDate);
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [demoSubmission, setDemoSubmission] = useState(false);
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const shop = honeyvaultLocations.find(location => location.id === draft.locationId);
  const deliveryAvailable = !shop || shop.fulfillment.localDelivery;

  useEffect(() => {
    const timer = window.setInterval(() => setToday(getMiamiDate()), 60_000);
    return () => window.clearInterval(timer);
  }, []);
  useEffect(() => {
    const pieces = draft.intent === "pastry";
    setFields(current => ({ ...current, quantityKind: pieces ? "pieces" : "people", quantity: pieces ? "1" : "" }));
  }, [draft.intent]);
  useEffect(() => { setSubmitState("idle"); }, [draft]);

  function edited(name?: string) {
    setSubmitState("idle");
    if (name) setErrors(current => { const next = { ...current }; delete next[name]; return next; });
  }
  function setField(name: keyof typeof initialFields, value: string) {
    setFields(current => ({ ...current, [name]: value }));
    edited(name);
  }
  function attrs(name: string) {
    return { id: `order-${name}`, name, "aria-invalid": Boolean(errors[name]), "aria-describedby": errors[name] ? `order-${name}-error` : undefined };
  }
  function products(pastryId: string, specialItemIds: string[]) {
    const pastry = signaturePastries.find(item => item.id === pastryId);
    return [pastry ? (es ? pastry.nameEs : pastry.name) : "", ...orderItems.filter(item => specialItemIds.includes(item.id)).map(item => es ? item.nameEs : item.name)].filter(Boolean).join(", ");
  }
  function focusError(form: HTMLFormElement, nextErrors: InquiryErrors) {
    window.requestAnimationFrame(() => {
      const first = Object.keys(nextErrors)[0];
      (form.querySelector<HTMLElement>(`[name="${first}"]`) ?? form.querySelector<HTMLElement>('[aria-invalid="true"]'))?.focus();
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitState === "submitting" || submitState === "success") return;
    const form = event.currentTarget;
    const body = {
      ...fields, dateFlexible, language,
      occasion: draft.occasion, fulfillment: draft.fulfillment, pickupLocation: draft.locationId ?? "",
      pastryId: draft.pastryId ?? "", specialItemIds: draft.specialItemIds, intent: draft.intent ?? "",
      website: String(new FormData(form).get("website") ?? ""),
    };
    const validation = validateInquiry(body);
    setErrors(validation.errors);
    if (!validation.valid) { setSubmitState("error"); focusError(form, validation.errors); return; }
    setSubmitState("submitting");
    try {
      const response = await fetch("/api/large-order", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
        signal: AbortSignal.timeout(15_000),
      });
      const result = await response.json();
      if (!response.ok || !result.ok) {
        if (result.code === "validation" && result.errors) {
          setErrors(result.errors);
          focusError(form, result.errors);
        }
        setSubmitState("error");
        return;
      }
      setDemoSubmission(Boolean(result.demo));
      setReceipt(result.summary ?? validation.payload);
      setSubmitState("success");
      window.requestAnimationFrame(() => document.getElementById("order-confirmation")?.focus());
    } catch { setSubmitState("error"); }
  }

  const selectedProducts = products(draft.pastryId ?? "", draft.specialItemIds);
  return (
    <section className="newsletter booking-section" id="large-order-inquiry" aria-labelledby="large-order-title">
      <div className="container newsletter-inner booking-inner">
        <div className="booking-intro">
          <p>Honeyvault Bakery</p>
          <h2 id="large-order-title">{es ? "Planea tu próximo pedido dulce" : "Plan your next sweet order"}</h2>
          <span>{es ? "Cuéntanos qué quieres pedir. Conservamos tus elecciones para consultar cantidades, disponibilidad, recogida o entrega." : "Tell us what you would like to order. Your choices stay with the request so we can discuss quantities, availability, pickup or delivery."}</span>
          {selectedProducts ? <span aria-live="polite"><strong>{es ? "Tu selección: " : "Your selection: "}</strong>{selectedProducts}</span> : null}
          {shop ? <span>{es ? "Tienda elegida: " : "Selected shop: "}{shop.name}</span> : null}
        </div>
        <p className="privacy booking-microcopy">{es ? "Los campos con * son obligatorios. Esta demo no confirma compras, disponibilidad ni pagos." : "Fields marked * are required. This demo does not confirm purchases, availability or payments."}</p>

        <form className="newsletter-form booking-form" onSubmit={handleSubmit} noValidate aria-busy={submitState === "submitting"}>
          <div className="booking-honeypot" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" /></div>
          <Field name="name" label={es ? "Nombre" : "Name"} required es={es} error={errors.name}>
            <input {...attrs("name")} type="text" autoComplete="name" maxLength={100} required value={fields.name} onChange={event => setField("name", event.target.value)} placeholder={es ? "Tu nombre" : "Your name"} />
          </Field>
          <Field name="contact" label={es ? "Email o teléfono" : "Email or phone"} required es={es} error={errors.contact}>
            <input {...attrs("contact")} type="text" maxLength={160} required value={fields.contact} onChange={event => setField("contact", event.target.value)} placeholder={es ? "Email o teléfono con código de área" : "Email or phone with area code"} />
          </Field>
          <Field name="pastryId" label={es ? "Pastel del menú diario" : "Daily pastry"} es={es} error={errors.pastryId} wide>
            <select {...attrs("pastryId")} value={draft.pastryId ?? ""} onChange={event => { updateOrder({ pastryId: event.target.value || null }); edited("pastryId"); }}>
              <option value="">{es ? "Necesito ayuda para elegir / pedido personalizado" : "Help me choose / custom order"}</option>
              {signaturePastries.map(item => <option key={item.id} value={item.id}>{es ? item.nameEs : item.name} · {item.price}</option>)}
            </select>
            {errors.specialItemIds ? <span className="booking-field-error" role="alert">{inquiryErrorText(errors.specialItemIds, language)}</span> : null}
          </Field>
          <Field name="occasion" label={es ? "Ocasión" : "Occasion"} required es={es} error={errors.occasion}>
            <select {...attrs("occasion")} required value={draft.occasion} onChange={event => { updateOrder({ occasion: event.target.value }); edited("occasion"); }}>
              <option value="" disabled>{es ? "¿Qué estás planeando?" : "What are you planning?"}</option>
              {occasionOptions.map(option => <option value={option.en} key={option.en}>{es ? option.es : option.en}</option>)}
            </select>
          </Field>
          <Field name="date" label={es ? "Fecha preferida" : "Preferred date"} required={!dateFlexible} es={es} error={errors.date}>
            <input {...attrs("date")} type="date" min={today} disabled={dateFlexible} required={!dateFlexible} value={fields.date} onChange={event => setField("date", event.target.value)} />
            <label htmlFor="order-dateFlexible"><input id="order-dateFlexible" name="dateFlexible" type="checkbox" checked={dateFlexible} onChange={event => { setDateFlexible(event.target.checked); edited("date"); }} /> {es ? "Aún no sé la fecha" : "I don't know the date yet"}</label>
          </Field>
          <Field name="quantityKind" label={es ? "La cantidad se refiere a" : "Quantity refers to"} required es={es} error={errors.quantityKind}>
            <select {...attrs("quantityKind")} value={fields.quantityKind} onChange={event => { setField("quantityKind", event.target.value); setField("quantity", ""); }}>
              <option value="people">{es ? "Personas que comerán" : "People to serve"}</option><option value="pieces">{es ? "Piezas de postre" : "Pastry pieces"}</option>
            </select>
          </Field>
          <Field name="quantity" label={fields.quantityKind === "pieces" ? (es ? "Número de piezas" : "Number of pieces") : (es ? "Personas aproximadas" : "Approximate people")} required es={es} error={errors.quantity}>
            {fields.quantityKind === "pieces" ? <input {...attrs("quantity")} type="number" inputMode="numeric" min="1" step="1" required value={fields.quantity} onChange={event => setField("quantity", event.target.value)} /> :
              <select {...attrs("quantity")} required value={fields.quantity} onChange={event => setField("quantity", event.target.value)}>
                <option value="" disabled>{es ? "Elige un rango" : "Choose a range"}</option>
                {quantityOptions.map(option => <option value={option.en} key={option.en}>{es ? option.es : option.en}</option>)}
              </select>}
          </Field>
          <Field name="fulfillment" label={es ? "Recogida o entrega" : "Pickup or delivery"} required es={es} error={errors.fulfillment}>
            <select {...attrs("fulfillment")} required value={draft.fulfillment} onChange={event => { updateOrder({ fulfillment: event.target.value }); edited("fulfillment"); }}>
              <option value="" disabled>{es ? "Elige una opción" : "Choose one"}</option>
              {fulfillmentOptions.map(option => <option value={option.en} key={option.en} disabled={option.en === "Local delivery" && !deliveryAvailable}>{es ? option.es : option.en}</option>)}
            </select>
          </Field>
          <Field name="time" label={es ? "Hora preferida" : "Preferred time"} es={es} error={errors.time}>
            <input {...attrs("time")} type="time" value={fields.time} onChange={event => setField("time", event.target.value)} />
          </Field>
          {draft.fulfillment === "Pickup" ? <Field name="pickupLocation" label={es ? "Tienda para recoger" : "Pickup shop"} required es={es} error={errors.pickupLocation} wide>
            <select {...attrs("pickupLocation")} required value={draft.locationId ?? ""} onChange={event => { updateOrder({ locationId: event.target.value || null }); edited("pickupLocation"); }}>
              <option value="" disabled>{es ? "Elige una tienda" : "Choose a shop"}</option>
              {honeyvaultLocations.filter(location => location.fulfillment.pickup).map(location => <option key={location.id} value={location.id}>{location.name}</option>)}
            </select>
          </Field> : null}
          {draft.fulfillment === "Local delivery" ? <Field name="deliveryZip" label={es ? "ZIP de entrega" : "Delivery ZIP code"} required es={es} error={errors.deliveryZip} wide>
            <input {...attrs("deliveryZip")} type="text" inputMode="numeric" autoComplete="postal-code" maxLength={10} required value={fields.deliveryZip} onChange={event => setField("deliveryZip", event.target.value)} placeholder="33127" />
          </Field> : null}
          <Field name="message" label={es ? "¿Algo más?" : "Anything else?"} es={es} error={errors.message} wide>
            <textarea {...attrs("message")} rows={4} maxLength={1500} value={fields.message} onChange={event => setField("message", event.target.value)} placeholder={es ? "Sabores, restricciones, presentación o cualquier detalle útil." : "Flavors, dietary notes, presentation or anything else we should know."} />
          </Field>
          <div className="booking-actions">
            <button type="submit" disabled={submitState === "submitting" || submitState === "success"}>{submitState === "submitting" ? (es ? "Enviando..." : "Sending...") : submitState === "success" ? (es ? "Solicitud completada" : "Request complete") : (es ? "Solicitar este pedido" : "Request this order")}</button>
            {contactLinks.whatsapp ? <a className="whatsapp-button" href={contactLinks.whatsapp} target="_blank" rel="noreferrer">{es ? "Escribir por WhatsApp" : "Message us on WhatsApp"}</a> : null}
          </div>
        </form>

        <p className="privacy booking-microcopy" role={submitState === "error" ? "alert" : "status"}>
          {submitState === "success" ? demoSubmission ? (es ? "Solo demo — no se envió una solicitud real ni se confirmó un pedido." : "Demo only — no real request was sent and no order was confirmed.") : (es ? "Tu solicitud fue enviada. El pedido queda pendiente de confirmación." : "Your request was sent. The order is still awaiting confirmation.") : submitState === "error" ? Object.keys(errors).length ? (es ? "Revisa los campos indicados. Conservamos tu información." : "Check the highlighted fields. Your information has been kept.") : (es ? "No se confirmó el envío. Conservamos tu información; vuelve a intentarlo." : "Sending was not confirmed. Your information has been kept; please try again.") : (es ? "Confirmaremos disponibilidad, cantidades, recogida o entrega y los próximos pasos." : "We’ll confirm availability, quantities, pickup or delivery, and next steps.")}
        </p>
        {receipt && submitState === "success" ? <div className="booking-intro" id="order-confirmation" tabIndex={-1}>
          <h3>{es ? "Resumen de tu solicitud" : "Your request summary"}</h3>
          <span><strong>{es ? "Productos: " : "Products: "}</strong>{products(receipt.pastryId, receipt.specialItemIds) || (es ? "Por definir con la tienda" : "To discuss with the shop")}</span>
          <span><strong>{es ? "Cantidad: " : "Quantity: "}</strong>{receipt.quantityKind === "people" ? quantityOptions.find(option => option.en === receipt.quantity)?.[language] : receipt.quantity}{receipt.quantity !== "Not sure yet" ? (receipt.quantityKind === "pieces" ? (es ? " piezas" : " pieces") : (es ? " personas" : " people")) : ""}</span>
          <span><strong>{es ? "Ocasión: " : "Occasion: "}</strong>{occasionOptions.find(option => option.en === receipt.occasion)?.[language]}</span>
          <span><strong>{es ? "Fecha: " : "Date: "}</strong>{receipt.dateFlexible ? (es ? "Por definir" : "Not set yet") : receipt.date}{receipt.time ? ` · ${receipt.time}` : ""}</span>
          <span><strong>{es ? "Modalidad: " : "Fulfillment: "}</strong>{fulfillmentOptions.find(option => option.en === receipt.fulfillment)?.[language]}</span>
          {receipt.pickupLocation ? <span>{honeyvaultLocations.find(location => location.id === receipt.pickupLocation)?.name}</span> : null}
          {receipt.deliveryZip ? <span>ZIP: {receipt.deliveryZip}</span> : null}
          <span><strong>{es ? "Contacto: " : "Contact: "}</strong>{receipt.contact}</span>
        </div> : null}
      </div>
    </section>
  );
}
