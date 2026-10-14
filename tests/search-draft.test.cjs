require("./ts-loader.cjs");
const { test } = require("node:test");
const assert = require("node:assert/strict");
const { findSearchMatches } = require("../lib/search.ts");
const { restoreOrderDraft } = require("../lib/orderDraft.ts");
test("search resolves actual pastries instead of a generic anchor", () => {
  assert.equal(findSearchMatches("pistachio")[0].id, "pistachio-croissant");
  assert.equal(findSearchMatches("chocolate")[0].id, "chocolate-roll");
  assert.equal(findSearchMatches("VAINILLA")[0].id, "vanilla-glazed-roll");
});
test("Spanish accents and multiword products are supported", () => {
  assert.equal(findSearchMatches("crema cítrica")[0].id, "citrus-cream-cups");
  assert.equal(findSearchMatches("fresas chocolate")[0].id, "chocolate-strawberries");
});
test("location queries resolve the exact shop", () => {
  assert.equal(findSearchMatches("Coral Gables")[0].id, "coral-gables");
  assert.equal(findSearchMatches("South Beach")[0].kind, "location");
});
test("unknown and empty queries have no fabricated fallback", () => {
  assert.deepEqual(findSearchMatches("vegan"), []);
  assert.deepEqual(findSearchMatches(""), []);
  assert.deepEqual(findSearchMatches("clover"), []);
});
test("section queries use complete terms", () => {
  assert.equal(findSearchMatches("pedido grande")[0].section, "large-orders");
  assert.equal(findSearchMatches("contacto")[0].section, "large-order-inquiry");
});
test("restoration keeps only known choices and never contact data", () => {
  const saved = { intent: "box", pastryId: "pistachio-croissant", locationId: "coral-gables", occasion: "Brunch", fulfillment: "Pickup", specialItemIds: ["strawberry-tartlets", "fake"], contact: "private@example.com" };
  const restored = restoreOrderDraft(saved);
  assert.equal(restored.pastryId, saved.pastryId);
  assert.deepEqual(restored.specialItemIds, ["strawberry-tartlets"]);
  assert.equal("contact" in restored, false);
  assert.equal(restoreOrderDraft({ pastryId: "fake" }).pastryId, null);
  assert.equal(restoreOrderDraft(null).intent, null);
});
