require("./ts-loader.cjs");
const { test } = require("node:test");
const assert = require("node:assert/strict");
const { POST } = require("../app/api/large-order/route.ts");
const body = { name: "Demo customer", contact: "demo@example.com", occasion: "Brunch", date: "2099-10-15", quantity: "3", quantityKind: "pieces", fulfillment: "Pickup", pickupLocation: "coral-gables", pastryId: "pistachio-croissant", specialItemIds: ["strawberry-tartlets"], language: "es" };
const request = data => new Request("http://localhost/api/large-order", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
test("demo success returns an accurate summary without calling a webhook", async () => {
  const saved = process.env.LEAD_WEBHOOK_URL;
  delete process.env.LEAD_WEBHOOK_URL;
  try {
    const response = await POST(request(body));
    const data = await response.json();
    assert.equal(response.status, 200);
    assert.equal(data.demo, true);
    assert.equal(data.summary.shop, "Honeyvault Coral Gables");
    assert.deepEqual(data.summary.products, ["Pistachio Croissant", "Strawberry Cream Tartlets"]);
  } finally { if (saved !== undefined) process.env.LEAD_WEBHOOK_URL = saved; }
});
test("API rejects client-bypassed invalid contact and past date", async () => {
  const response = await POST(request({ ...body, contact: "abc", date: "2000-01-01" }));
  const data = await response.json();
  assert.equal(response.status, 400);
  assert.equal(data.errors.contact, "contact");
  assert.equal(data.errors.date, "past-date");
});
test("API rejects malformed JSON shape", async () => {
  for (const data of [null, [], "invalid"]) assert.equal((await POST(request(data))).status, 400);
});
test("demo never calls a configured webhook", async () => {
  const savedWebhook = process.env.LEAD_WEBHOOK_URL;
  const savedFetch = global.fetch;
  process.env.LEAD_WEBHOOK_URL = "https://example.invalid/test-only";
  let calls = 0;
  global.fetch = async () => { calls++; throw new Error("Demo must not send anything"); };
  try {
    const response = await POST(request(body));
    assert.equal(response.status, 200);
    assert.equal((await response.json()).demo, true);
    assert.equal(calls, 0);
  } finally {
    global.fetch = savedFetch;
    if (savedWebhook === undefined) delete process.env.LEAD_WEBHOOK_URL;
    else process.env.LEAD_WEBHOOK_URL = savedWebhook;
  }
});
