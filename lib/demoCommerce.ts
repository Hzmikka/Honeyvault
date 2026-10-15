import { demoBoxes, deliveryZones, eventTerms, leadMinutes } from "../data/demoCommerce";
import { honeyvaultLocations, WeekdayKey } from "../data/locations";
import { signaturePastries } from "../data/pastries";
import { orderItems } from "../data/orderItems";

export type Journey = "pastry" | "box" | "event";
export type DemoOrder = {
  journey: Journey;
  pastryId: string;
  boxId: string;
  quantity: number;
  guests: number;
  specialItemIds: string[];
  locationId: string;
  fulfillment: "Pickup" | "Local delivery";
  zip: string;
  date: string;
  time: string;
  flexibleDate: boolean;
  styling: boolean;
};
export type QuoteLine = { id: string; name: string; nameEs: string; count: number; cents: number };
export type DemoQuote = {
  lines: QuoteLine[]; pieces: number; subtotalCents: number; deliveryCents: number;
  stylingCents: number; totalCents: number; locationId: string;
};
export type OrderError = "product" | "quantity" | "guests" | "specials" | "location" | "coverage" | "pickup-only" | "minimum" | "date" | "slot" | "stock" | "styling";

export function money(cents: number) { return `$${(cents / 100).toFixed(2)}`; }
export function miamiParts(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: "America/New_York", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(now);
  const get = (key: string) => parts.find(part => part.type === key)?.value ?? "";
  return { date: `${get("year")}-${get("month")}-${get("day")}`, time: `${get("hour")}:${get("minute")}` };
}
export function addDays(date: string, days: number) {
  return new Date(Date.parse(`${date}T12:00:00Z`) + days * 86400000).toISOString().slice(0, 10);
}
function validDate(date: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(date) && !Number.isNaN(Date.parse(`${date}T12:00:00Z`)) && new Date(`${date}T12:00:00Z`).toISOString().slice(0, 10) === date;
}
// Convert Miami wall time using Intl's timezone data, including daylight saving time.
export function miamiInstant(date: string, time: string) {
  const wall = Date.parse(`${date}T${time}:00Z`);
  let candidate = wall;
  for (let i = 0; i < 3; i++) {
    const local = miamiParts(new Date(candidate));
    candidate += wall - Date.parse(`${local.date}T${local.time}:00Z`);
  }
  return candidate;
}
const minutes = (time: string) => Number(time.slice(0, 2)) * 60 + Number(time.slice(3, 5));
export function availableSlots(journey: Journey, locationId: string, date: string, now = new Date()) {
  const shop = honeyvaultLocations.find(item => item.id === locationId);
  if (!shop || !validDate(date) || date < miamiParts(now).date || !Object.prototype.hasOwnProperty.call(leadMinutes, journey)) return [];
  const day = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"][new Date(`${date}T12:00:00Z`).getUTCDay()] as WeekdayKey;
  const hours = shop.hours[day];
  if (!hours) return [];
  const slots: string[] = [];
  for (let value = Math.ceil(minutes(hours.open) / 30) * 30; value < minutes(hours.close); value += 30) {
    const time = `${String(Math.floor(value / 60)).padStart(2, "0")}:${String(value % 60).padStart(2, "0")}`;
    if (miamiInstant(date, time) >= now.getTime() + leadMinutes[journey] * 60000) slots.push(time);
  }
  return slots;
}
export function earliestSlot(journey: Journey, locationId: string, now = new Date()) {
  for (let offset = 0; offset < 9; offset++) {
    const date = addDays(miamiParts(now).date, offset);
    const slots = availableSlots(journey, locationId, date, now);
    if (slots.length) return { date, time: slots[0] };
  }
  return { date: "", time: "" };
}
// Keep the visitor's chosen date when browsing shops or changing fulfillment.
// An incompatible time is cleared; only an empty/stale date gets a new default.
export function reconcileSchedule(journey: Journey, locationId: string, selected: { date: string; time: string }, now = new Date()) {
  if (!validDate(selected.date) || selected.date < miamiParts(now).date) return earliestSlot(journey, locationId, now);
  const slots = availableSlots(journey, locationId, selected.date, now);
  return { date: selected.date, time: slots.includes(selected.time) ? selected.time : "" };
}
export function demoStock(pastryId: string, locationId: string, date: string, now = new Date()) {
  if (date !== miamiParts(now).date) return true;
  return !(pastryId === "pistachio-croissant" && locationId === "wynwood") && !(pastryId === "vanilla-glazed-roll" && locationId === "south-beach");
}
export function quoteDemoOrder(input: DemoOrder): DemoQuote {
  const lines: QuoteLine[] = [];
  let pieces = 0;
  if (input.journey === "pastry") {
    const pastry = signaturePastries.find(item => item.id === input.pastryId);
    if (pastry && Number.isInteger(input.quantity) && input.quantity > 0 && input.quantity <= 24) {
      pieces = input.quantity;
      lines.push({ id: pastry.id, name: pastry.name, nameEs: pastry.nameEs, count: pieces, cents: Math.round(Number(pastry.price.slice(1)) * 100) * pieces });
    }
  } else if (input.journey === "box") {
    const box = demoBoxes.find(item => item.id === input.boxId);
    if (box && Number.isInteger(input.quantity) && input.quantity > 0 && input.quantity <= 10) {
      pieces = box.pieces * input.quantity;
      lines.push({ id: box.id, name: `${box.name} · ${box.pieces} pieces`, nameEs: `${box.nameEs} · ${box.pieces} piezas`, count: input.quantity, cents: box.priceCents * input.quantity });
    }
  } else if (input.journey === "event" && Number.isInteger(input.guests) && input.guests >= eventTerms.minGuests && input.guests <= eventTerms.maxGuests) {
    const selected = orderItems.filter(item => input.specialItemIds.includes(item.id));
    pieces = input.guests * eventTerms.piecesPerGuest;
    selected.forEach((item, index) => {
      const count = Math.floor(pieces / selected.length) + (index < pieces % selected.length ? 1 : 0);
      lines.push({ id: item.id, name: item.name, nameEs: item.nameEs, count, cents: count * eventTerms.unitCents });
    });
  }
  const zone = deliveryZones.find(item => item.zip === input.zip);
  const subtotalCents = lines.reduce((total, line) => total + line.cents, 0);
  const deliveryCents = input.fulfillment === "Local delivery" && zone?.delivery ? zone.feeCents : 0;
  const stylingCents = input.journey === "event" && input.styling ? eventTerms.stylingCents : 0;
  return { lines, pieces, subtotalCents, deliveryCents, stylingCents, totalCents: subtotalCents + deliveryCents + stylingCents, locationId: input.fulfillment === "Local delivery" && zone?.delivery ? zone.locationId : input.locationId };
}
export function validateDemoOrder(input: DemoOrder, now = new Date()): { errors: Partial<Record<OrderError, true>>; quote: DemoQuote; valid: boolean } {
  const errors: Partial<Record<OrderError, true>> = {};
  const quote = quoteDemoOrder(input);
  if (input.journey !== "event") {
    if (!Number.isInteger(input.quantity) || input.quantity < 1 || input.quantity > (input.journey === "box" ? 10 : 24)) errors.quantity = true;
    if (input.journey === "pastry" ? !signaturePastries.some(item => item.id === input.pastryId) : input.journey === "box" ? !demoBoxes.some(item => item.id === input.boxId) : true) errors.product = true;
  } else {
    if (!Number.isInteger(input.guests) || input.guests < eventTerms.minGuests || input.guests > eventTerms.maxGuests) errors.guests = true;
    if (!input.specialItemIds.length || input.specialItemIds.some(id => !orderItems.some(item => item.id === id))) errors.specials = true;
    if (input.styling && input.fulfillment !== "Local delivery") errors.styling = true;
  }
  if (!["Pickup", "Local delivery"].includes(input.fulfillment) || !honeyvaultLocations.some(shop => shop.id === quote.locationId)) errors.location = true;
  if (input.fulfillment === "Local delivery") {
    const zone = deliveryZones.find(item => item.zip === input.zip);
    if (!zone) errors.coverage = true;
    else if (!zone.delivery) errors["pickup-only"] = true;
    else if (quote.subtotalCents < zone.minimumCents) errors.minimum = true;
  }
  if (!(input.journey === "event" && input.flexibleDate)) {
    if (!validDate(input.date) || input.date < miamiParts(now).date) errors.date = true;
    else if (!availableSlots(input.journey, quote.locationId, input.date, now).includes(input.time)) errors.slot = true;
    if (input.journey === "pastry" && !demoStock(input.pastryId, quote.locationId, input.date, now)) errors.stock = true;
  }
  return { errors, quote, valid: Object.keys(errors).length === 0 };
}
