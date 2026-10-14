require("./ts-loader.cjs");
const { test } = require("node:test");
const assert = require("node:assert/strict");
const { validateInquiry, getMiamiDate, isValidContact } = require("../lib/inquiryValidation.ts");
const now = new Date("2026-10-14T18:00:00Z");
const valid = {
  name: "Demo customer", contact: "demo@example.com", occasion: "Brunch",
  date: "2026-10-15", quantity: "13–24", quantityKind: "people",
  fulfillment: "Pickup", pickupLocation: "coral-gables", pastryId: "pistachio-croissant",
  specialItemIds: ["strawberry-tartlets"], language: "es", intent: "box",
};
test("valid inquiry retains products, shop, quantity unit and language", () => {
  const result = validateInquiry(valid, now);
  assert.equal(result.valid, true);
  assert.equal(result.payload.pickupLocation, "coral-gables");
  assert.equal(result.payload.pastryId, "pistachio-croissant");
  assert.deepEqual(result.payload.specialItemIds, ["strawberry-tartlets"]);
  assert.equal(result.payload.language, "es");
});
test("dates use Miami's day, including UTC midnight and DST", () => {
  assert.equal(getMiamiDate(new Date("2026-10-15T02:00:00Z")), "2026-10-14");
  assert.equal(getMiamiDate(new Date("2026-01-15T04:00:00Z")), "2026-01-14");
  assert.equal(validateInquiry({ ...valid, date: "2026-10-14" }, now).valid, true);
});
test("past dates and impossible calendar dates are rejected", () => {
  assert.equal(validateInquiry({ ...valid, date: "2000-01-01" }, now).errors.date, "past-date");
  assert.equal(validateInquiry({ ...valid, date: "2027-02-31" }, now).errors.date, "date");
  assert.equal(validateInquiry({ ...valid, date: "bad-date" }, now).errors.date, "date");
});
test("flexible date does not require or forward a stale exact date", () => {
  const result = validateInquiry({ ...valid, date: "2000-01-01", dateFlexible: true }, now);
  assert.equal(result.valid, true);
  assert.equal(result.payload.date, "");
});
test("contact validates email and international telephone format", () => {
  for (const contact of ["abc", "abc@", "123", "abc1234567890"]) assert.equal(isValidContact(contact), false);
  for (const contact of ["demo@example.com", "+1 (305) 555-0123", "+506 8888 8888"]) assert.equal(isValidContact(contact), true);
});
test("pickup requires an existing shop", () => {
  assert.equal(validateInquiry({ ...valid, pickupLocation: "" }, now).errors.pickupLocation, "required");
  assert.equal(validateInquiry({ ...valid, pickupLocation: "made-up-shop" }, now).errors.pickupLocation, "option");
});
test("delivery requires a ZIP and honors shop fulfillment support", () => {
  const delivery = { ...valid, fulfillment: "Local delivery" };
  assert.equal(validateInquiry(delivery, now).errors.deliveryZip, "required");
  assert.equal(validateInquiry({ ...delivery, deliveryZip: "abc" }, now).errors.deliveryZip, "zip");
  assert.equal(validateInquiry({ ...delivery, deliveryZip: "33127-1234" }, now).valid, true);
  assert.equal(validateInquiry({ ...delivery, deliveryZip: "33139", pickupLocation: "south-beach" }, now).errors.fulfillment, "delivery");
});
test("pieces and people are validated as different quantities", () => {
  const pieces = { ...valid, quantityKind: "pieces" };
  assert.equal(validateInquiry({ ...pieces, quantity: "3" }, now).valid, true);
  for (const quantity of ["0", "-1", "2.5", "13–24"]) assert.equal(validateInquiry({ ...pieces, quantity }, now).errors.quantity, "quantity");
  assert.equal(validateInquiry({ ...valid, quantity: "3" }, now).errors.quantity, "option");
  assert.equal(validateInquiry({ ...valid, quantityKind: "boxes" }, now).errors.quantityKind, "option");
});
test("unknown products and options cannot be forwarded to the webhook", () => {
  assert.equal(validateInquiry({ ...valid, pastryId: "fake" }, now).errors.pastryId, "option");
  assert.equal(validateInquiry({ ...valid, specialItemIds: ["fake"] }, now).errors.specialItemIds, "option");
  assert.equal(validateInquiry({ ...valid, specialItemIds: "fake" }, now).errors.specialItemIds, "option");
  assert.equal(validateInquiry({ ...valid, fulfillment: "fake" }, now).errors.fulfillment, "option");
});
test("time and length errors are explicit; irrelevant delivery ZIP is omitted", () => {
  assert.equal(validateInquiry({ ...valid, time: "25:00" }, now).errors.time, "time");
  assert.equal(validateInquiry({ ...valid, message: "x".repeat(1501) }, now).errors.message, "length");
  assert.equal(validateInquiry({ ...valid, deliveryZip: "33127" }, now).payload.deliveryZip, "");
});
