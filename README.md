# Honeyvault Bakery — interactive portfolio demo

A bilingual EN/ES bakery concept by Celeste Web Studio. Pink and cocoa visuals, texture photography, whole-product views, and three complete simulated journeys:

- Daily pastry → pieces → pickup or delivery → priced summary.
- Fixed 6/12-piece box → number of boxes → date and fulfillment → priced summary.
- Event → guests and minis → date or flexible date → sample quote, with an optional filled-in example.

**This is a fictional demo. No purchases, reservations, payments or messages are sent.** The configurator calculates in the browser; no name or contact details are required. The legacy `/api/large-order` endpoint always returns `demo: true` and never calls a webhook, even if `LEAD_WEBHOOK_URL` is set.

## Local development and validation

Use Node 22 (see `.nvmrc`), then:

```bash
npm ci
npm run dev
npm test
npm run lint
npm run build
```

Run `npm run start` after building. `npm run audit:images` reports assets.

## Fictional commerce rules

`data/demoCommerce.ts` owns the sample boxes, delivery areas and event pricing. `lib/demoCommerce.ts` calculates exact USD cents and validates quantities, stock, delivery minima, dates and shop slots in Miami time.

- Pastries: 30 minutes preparation; 1–24 pieces.
- Boxes: 24 hours notice; 1–10 boxes. Six pieces cost $42; twelve cost $80. Equal quantities of almond, pistachio and chocolate.
- Events: 48 hours notice or flexible date; 6–200 guests, 2 minis per guest at $4.50 each. Selected flavors receive a balanced allocation. Setup adds $75 with delivery.
- Delivery: ZIP 33127 → Wynwood, $8 fee / $20 product minimum; 33134 → Coral Gables, $10 / $25; 33139 → South Beach pickup only. Other ZIPs are outside sample delivery coverage. Pickup is free.
- Sample prices include tax; there is no additional tax calculation.
- Pistachio is unavailable today at Wynwood; vanilla is unavailable today at South Beach. Future preorders are available. These fixtures do not represent live inventory.
- Slots follow each shop's hours, including Coral Gables' Sunday closure, and daylight saving time. Availability is revalidated at simulation time.

Language is stored in localStorage. Only sanitized product/shop/fulfillment choices are kept in sessionStorage. Date, ZIP and optional event name stay in component memory.

## Deployment

The existing Vercel project is linked to `Hzmikka/Honeyvault`; GitHub `main` is the production source. Next.js preset, `npm run build`, default output. No environment variables are required for the demo. Do not enable real lead delivery on this portfolio.

## Content and assets

- `data/pastries.ts`, `data/orderItems.ts`: daily pastries and event minis.
- `data/locations.ts`: sample shops, hours and fulfillment.
- `data/demoCommerce.ts`: shared fictional commerce fixtures.
- `docs/friction-triage.md`: disposition of all 42 friction findings.
- `docs/friction-review-02.md`: second review, navigation/gallery corrections, order-state fixes and design decisions awaiting discussion.
- `docs/generated-assets.md`: generated whole-product imagery and exact prompts.

Allergen and size information, images, addresses, reviews, stock, fees and operational terms are illustrative. Replace them with verified business information before a commercial launch.
