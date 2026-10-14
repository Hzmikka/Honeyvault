import { fulfillmentOptions, occasionOptions, quantityOptions } from "../data/inquiry";
import { honeyvaultLocations } from "../data/locations";
import { orderItems } from "../data/orderItems";
import { signaturePastries } from "../data/pastries";

export type InquiryErrorCode = "required" | "contact" | "date" | "past-date" | "option" | "quantity" | "zip" | "delivery" | "time" | "length";
export type InquiryErrors = Record<string, InquiryErrorCode>;

export function getMiamiDate(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/New_York", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(now);
  return ["year", "month", "day"].map(part => parts.find(item => item.type === part)?.value).join("-");
}

export function isValidContact(value: string) {
  if (value.includes("@")) return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  return /^\+?[\d\s().-]+$/.test(value) && value.replace(/\D/g, "").length >= 10 && value.replace(/\D/g, "").length <= 15;
}

export function inquiryErrorText(code: InquiryErrorCode, language: "en" | "es") {
  const messages: Record<InquiryErrorCode, [string, string]> = {
    required: ["Please complete this field.", "Completa este campo."],
    contact: ["Enter a valid email or phone number, including the area code.", "Escribe un email válido o un teléfono con código de área."],
    date: ["Choose a valid date.", "Elige una fecha válida."],
    "past-date": ["Choose today or a future date.", "Elige hoy o una fecha futura."],
    option: ["Choose one of the available options.", "Elige una de las opciones disponibles."],
    quantity: ["Enter a whole number of pieces greater than zero.", "Introduce un número entero de piezas mayor que cero."],
    zip: ["Enter a US ZIP code, such as 33127.", "Introduce un ZIP de Estados Unidos, como 33127."],
    delivery: ["This shop offers pickup only. Choose another shop for delivery.", "Esta tienda solo ofrece recogida. Elige otra tienda para entrega."],
    time: ["Choose a valid time.", "Elige una hora válida."],
    length: ["This value is too long. Please shorten it.", "Este texto es demasiado largo. Acórtalo."],
  };
  return messages[code][language === "es" ? 1 : 0];
}

export function validateInquiry(input: Record<string, unknown>, now = new Date()) {
  const errors: InquiryErrors = {};
  const text = (field: string, limit: number) => {
    const value = typeof input[field] === "string" ? (input[field] as string).trim() : "";
    if (value.length > limit) errors[field] = "length";
    return value.slice(0, limit);
  };
  const payload = {
    name: text("name", 100), contact: text("contact", 160), occasion: text("occasion", 100),
    date: text("date", 32), time: text("time", 8), quantity: text("quantity", 80),
    quantityKind: text("quantityKind", 16) || "people", fulfillment: text("fulfillment", 80),
    pickupLocation: text("pickupLocation", 80), deliveryZip: text("deliveryZip", 12),
    message: text("message", 1500), pastryId: text("pastryId", 80),
    intent: text("intent", 32), language: input.language === "es" ? "es" as const : "en" as const,
    dateFlexible: input.dateFlexible === true || input.dateFlexible === "on",
    specialItemIds: Array.isArray(input.specialItemIds) ? input.specialItemIds.filter((item): item is string => typeof item === "string") : [],
  };
  for (const field of ["name", "contact", "occasion", "quantity", "fulfillment"] as const) {
    if (!payload[field]) errors[field] = "required";
  }
  if (payload.contact && !isValidContact(payload.contact)) errors.contact = "contact";
  if (payload.occasion && !occasionOptions.some(option => option.en === payload.occasion)) errors.occasion = "option";
  if (payload.fulfillment && !fulfillmentOptions.some(option => option.en === payload.fulfillment)) errors.fulfillment = "option";

  if (payload.dateFlexible) payload.date = "";
  else if (!payload.date) errors.date = "required";
  else if (!/^\d{4}-\d{2}-\d{2}$/.test(payload.date) || Number.isNaN(Date.parse(`${payload.date}T00:00:00Z`)) || new Date(`${payload.date}T00:00:00Z`).toISOString().slice(0, 10) !== payload.date) errors.date = "date";
  else if (payload.date < getMiamiDate(now)) errors.date = "past-date";

  if (payload.time && !/^([01]\d|2[0-3]):[0-5]\d$/.test(payload.time)) errors.time = "time";
  if (payload.quantityKind === "pieces") {
    if (!/^\d+$/.test(payload.quantity) || !Number.isSafeInteger(Number(payload.quantity)) || Number(payload.quantity) < 1) errors.quantity = "quantity";
  } else if (payload.quantityKind === "people") {
    if (payload.quantity && !quantityOptions.some(option => option.en === payload.quantity)) errors.quantity = "option";
  } else errors.quantityKind = "option";

  const shop = honeyvaultLocations.find(location => location.id === payload.pickupLocation);
  if (payload.pickupLocation && !shop) errors.pickupLocation = "option";
  if (payload.fulfillment === "Pickup" && !payload.pickupLocation) errors.pickupLocation = "required";
  if (payload.fulfillment === "Local delivery") {
    if (!payload.deliveryZip) errors.deliveryZip = "required";
    else if (!/^\d{5}(-\d{4})?$/.test(payload.deliveryZip)) errors.deliveryZip = "zip";
    if (shop && !shop.fulfillment.localDelivery) errors.fulfillment = "delivery";
  }
  if (payload.pastryId && !signaturePastries.some(item => item.id === payload.pastryId)) errors.pastryId = "option";
  if (input.specialItemIds !== undefined && (!Array.isArray(input.specialItemIds) || input.specialItemIds.some(item => !orderItems.some(known => known.id === item)))) errors.specialItemIds = "option";
  if (payload.intent && !["pastry", "box", "celebration", "large-order"].includes(payload.intent)) errors.intent = "option";
  if (payload.fulfillment !== "Local delivery") payload.deliveryZip = "";
  payload.specialItemIds = Array.from(new Set(payload.specialItemIds));
  return { payload, errors, valid: Object.keys(errors).length === 0 };
}
