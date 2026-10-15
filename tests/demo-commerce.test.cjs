require("./ts-loader.cjs");
const { test } = require("node:test");
const assert = require("node:assert/strict");
const { quoteDemoOrder, validateDemoOrder, availableSlots, earliestSlot, miamiParts, miamiInstant } = require("../lib/demoCommerce.ts");
const { demoBoxes } = require("../data/demoCommerce.ts");
const now = new Date("2026-10-15T14:10:00Z"); // Thursday, 10:10 AM Miami.
const daily = { journey: "pastry", pastryId: "almond-cream-croissant", boxId: "brunch-six", quantity: 3, guests: 24, specialItemIds: [], locationId: "wynwood", fulfillment: "Pickup", zip: "", date: "2026-10-15", time: "11:00", flexibleDate: false, styling: false };
const event = { ...daily, journey: "event", specialItemIds: ["strawberry-tartlets", "citrus-cream-cups", "pastel-cake-pops"], date: "2026-10-17", fulfillment: "Local delivery", zip: "33127", styling: true };

test("daily purchase has exact cents and no event minimum or contact requirement", () => {
  const result = validateDemoOrder(daily, now);
  assert.equal(result.valid, true);
  assert.equal(result.quote.totalCents, 2385);
  assert.equal(result.quote.pieces, 3);
  assert.equal(result.quote.lines[0].count, 3);
});
test("box prices and quantities match the fixed catalog", () => {
  for (const box of demoBoxes) {
    const input = { ...daily, journey: "box", boxId: box.id, quantity: 2, date: "2026-10-16" };
    const { quote, valid } = validateDemoOrder(input, now);
    assert.equal(valid, true);
    assert.equal(quote.subtotalCents, box.priceCents * 2);
    assert.equal(quote.pieces, box.pieces * 2);
  }
});
test("event example totals $299 and allocates every mini exactly once", () => {
  const { quote, valid } = validateDemoOrder(event, now);
  assert.equal(valid, true);
  assert.equal(quote.pieces, 48);
  assert.deepEqual(quote.lines.map(line => line.count), [16, 16, 16]);
  assert.equal(quote.subtotalCents, 21600);
  assert.equal(quote.totalCents, 29900);
});
test("uneven event quantities remain balanced and never lose pieces", () => {
  const quote = quoteDemoOrder({ ...event, guests: 7 });
  assert.deepEqual(quote.lines.map(line => line.count), [5, 5, 4]);
  assert.equal(quote.lines.reduce((sum, line) => sum + line.count, 0), 14);
});
test("delivery ZIP sets serving shop, fee and product minimum", () => {
  const checked = validateDemoOrder({ ...daily, locationId: "south-beach", fulfillment: "Local delivery", zip: "33134", quantity: 4 }, now);
  assert.equal(checked.valid, true);
  assert.equal(checked.quote.locationId, "coral-gables");
  assert.equal(checked.quote.deliveryCents, 1000);
  assert.equal(validateDemoOrder({ ...daily, quantity: 1, fulfillment: "Local delivery", zip: "33127" }, now).errors.minimum, true);
});
test("pickup-only and unknown ZIPs have explicit recovery states", () => {
  assert.equal(validateDemoOrder({ ...daily, fulfillment: "Local delivery", zip: "33139" }, now).errors["pickup-only"], true);
  assert.equal(validateDemoOrder({ ...daily, fulfillment: "Local delivery", zip: "00000" }, now).errors.coverage, true);
  assert.equal(validateDemoOrder({ ...daily, zip: "00000" }, now).valid, true);
});
test("same-day sold-out pastry works at an alternative shop or on a future date", () => {
  const sold = { ...daily, pastryId: "pistachio-croissant" };
  assert.equal(validateDemoOrder(sold, now).errors.stock, true);
  assert.equal(validateDemoOrder({ ...sold, locationId: "coral-gables" }, now).valid, true);
  assert.equal(validateDemoOrder({ ...sold, date: "2026-10-16" }, now).valid, true);
  assert.equal(validateDemoOrder({ ...daily, pastryId: "vanilla-glazed-roll", locationId: "south-beach" }, now).errors.stock, true);
});
test("preparation, closing time and Sunday closure filter time slots", () => {
  const slots = availableSlots("pastry", "wynwood", "2026-10-15", now);
  assert.equal(slots[0], "11:00");
  assert.equal(slots.at(-1), "17:30");
  assert.deepEqual(availableSlots("box", "wynwood", "2026-10-15", now), []);
  assert.deepEqual(availableSlots("event", "wynwood", "2026-10-16", now), []);
  assert.deepEqual(availableSlots("pastry", "coral-gables", "2026-10-18", now), []);
  assert.equal(validateDemoOrder({ ...daily, time: "18:00" }, now).errors.slot, true);
});
test("next available slot crosses closing hours and respects 24/48h lead time", () => {
  const late = new Date("2026-10-15T21:45:00Z");
  assert.deepEqual(earliestSlot("pastry", "wynwood", late), { date: "2026-10-16", time: "07:00" });
  assert.deepEqual(earliestSlot("box", "wynwood", now), { date: "2026-10-16", time: "10:30" });
  assert.deepEqual(earliestSlot("event", "wynwood", now), { date: "2026-10-17", time: "10:30" });
});
test("Miami conversion follows winter/summer offset and midnight", () => {
  assert.equal(new Date(miamiInstant("2026-01-15", "10:00")).toISOString(), "2026-01-15T15:00:00.000Z");
  assert.equal(new Date(miamiInstant("2026-07-15", "10:00")).toISOString(), "2026-07-15T14:00:00.000Z");
  assert.equal(miamiParts(new Date("2026-10-15T02:00:00Z")).date, "2026-10-14");
});
test("flexible dates apply to events only; invalid calendar dates never pass", () => {
  assert.equal(validateDemoOrder({ ...event, flexibleDate: true, date: "", time: "" }, now).valid, true);
  assert.equal(validateDemoOrder({ ...daily, flexibleDate: true, date: "", time: "" }, now).errors.date, true);
  for (const date of ["2026-02-30", "2026-13-01", "2000-01-01", "no-date"]) assert.equal(validateDemoOrder({ ...daily, date }, now).errors.date, true);
});
test("quantities, unknown items and setup fulfillment cannot bypass validation", () => {
  for (const quantity of [0, -1, 1.5, NaN, 25]) assert.equal(validateDemoOrder({ ...daily, quantity }, now).errors.quantity, true);
  assert.equal(validateDemoOrder({ ...daily, pastryId: "fake" }, now).errors.product, true);
  assert.equal(validateDemoOrder({ ...event, specialItemIds: [] }, now).errors.specials, true);
  assert.equal(validateDemoOrder({ ...event, specialItemIds: ["fake"] }, now).errors.specials, true);
  assert.equal(validateDemoOrder({ ...event, fulfillment: "Pickup" }, now).errors.styling, true);
  assert.equal(validateDemoOrder({ ...event, guests: 2 }, now).errors.guests, true);
});
