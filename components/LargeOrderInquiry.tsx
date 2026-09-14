"use client";

import { FormEvent, useState } from "react";
import { contactLinks } from "@/data/contact";
import { fulfillmentOptions, occasionOptions, quantityOptions } from "@/data/inquiry";
import { useLanguage } from "@/components/LanguageProvider";

type SubmitState = "idle" | "submitting" | "success" | "error";

export function LargeOrderInquiry() {
  const { language } = useLanguage();
  const es = language === "es";
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [demoSubmission, setDemoSubmission] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setSubmitState("submitting");
    setDemoSubmission(false);

    try {
      const response = await fetch("/api/large-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.error ?? "Submission failed.");
      setDemoSubmission(Boolean(result.demo));
      setSubmitState("success");
      form.reset();
    } catch {
      setSubmitState("error");
    }
  }

  return (
    <section className="newsletter booking-section" id="large-order-inquiry" aria-labelledby="large-order-title">
      <div className="container newsletter-inner booking-inner">
        <div className="booking-intro">
          <p>Honeyvault Bakery</p>
          <h2 id="large-order-title">{es ? "Planea tu próximo pedido dulce" : "Plan your next sweet order"}</h2>
          <span>
            {es
              ? "Celebraciones, mesas de postres, oficina y lotes personalizados: cuéntanos qué planeas y te ayudaremos con cantidades, disponibilidad y entrega."
              : "Celebrations, dessert tables, office treats and larger custom batches — tell us what you're planning and we'll help with quantities, availability and fulfillment."}
          </span>
        </div>

        <form className="newsletter-form booking-form" onSubmit={handleSubmit}>
          <div className="booking-honeypot" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="booking-field">
            <label htmlFor="order-name">{es ? "Nombre" : "Name"}</label>
            <input id="order-name" name="name" type="text" placeholder={es ? "Tu nombre" : "Your name"} autoComplete="name" required />
          </div>

          <div className="booking-field">
            <label htmlFor="order-contact">{es ? "Email o teléfono" : "Email or phone"}</label>
            <input id="order-contact" name="contact" type="text" placeholder={es ? "Email o teléfono" : "Email or phone"} required />
          </div>

          <div className="booking-field">
            <label htmlFor="order-occasion">{es ? "Ocasión" : "Occasion"}</label>
            <select id="order-occasion" name="occasion" defaultValue="" required>
              <option value="" disabled>{es ? "¿Qué estás planeando?" : "What are you planning?"}</option>
              {occasionOptions.map((option) => <option value={option.en} key={option.en}>{es ? option.es : option.en}</option>)}
            </select>
          </div>

          <div className="booking-field">
            <label htmlFor="order-date">{es ? "Fecha preferida" : "Preferred date"}</label>
            <input id="order-date" name="date" type="date" required />
          </div>

          <div className="booking-field">
            <label htmlFor="order-quantity">{es ? "Personas / cantidad aprox." : "Approx. people / quantity"}</label>
            <select id="order-quantity" name="quantity" defaultValue="" required>
              <option value="" disabled>{es ? "Elige un rango" : "Choose a range"}</option>
              {quantityOptions.map((option) => <option value={option.en} key={option.en}>{es ? option.es : option.en}</option>)}
            </select>
          </div>

          <div className="booking-field">
            <label htmlFor="order-fulfillment">{es ? "Recogida o entrega" : "Pickup or delivery"}</label>
            <select id="order-fulfillment" name="fulfillment" defaultValue="" required>
              <option value="" disabled>{es ? "Elige una opción" : "Choose one"}</option>
              {fulfillmentOptions.map((option) => <option value={option.en} key={option.en}>{es ? option.es : option.en}</option>)}
            </select>
          </div>

          <div className="booking-field booking-field-wide">
            <label htmlFor="order-message">{es ? "¿Algo más?" : "Anything else?"}<span> {es ? "Opcional" : "Optional"}</span></label>
            <textarea
              id="order-message"
              name="message"
              rows={4}
              placeholder={es ? "Sabores, restricciones, horario, presentación o cualquier detalle útil." : "Flavors, dietary notes, timing, presentation, or anything else we should know."}
            />
          </div>

          <div className="booking-actions">
            <button type="submit" disabled={submitState === "submitting"}>
              {submitState === "submitting" ? (es ? "Enviando..." : "Sending...") : (es ? "Solicitar pedido grande" : "Request a large order")}
            </button>
            {contactLinks.whatsapp ? (
              <a className="whatsapp-button" href={contactLinks.whatsapp} target="_blank" rel="noreferrer">{es ? "Escribir por WhatsApp" : "Message us on WhatsApp"}</a>
            ) : null}
          </div>
        </form>

        <p className="privacy booking-microcopy" role="status">
          {submitState === "success"
            ? demoSubmission
              ? (es ? "Solo demo — no se envió una solicitud real." : "Demo only — no real request was sent.")
              : (es ? "Gracias — tu solicitud fue enviada." : "Thanks — your large-order request was sent.")
            : submitState === "error"
              ? (es ? "No pudimos enviar la solicitud. Inténtalo de nuevo." : "We couldn’t send the request. Please try again.")
              : (es ? "Confirmaremos disponibilidad, cantidades, recogida o entrega y los próximos pasos." : "We’ll confirm availability, quantities, pickup or delivery, and next steps.")}
        </p>
      </div>
    </section>
  );
}
