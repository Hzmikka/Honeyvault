# Honeyvault Bakery — Portfolio Final

Decision-led bilingual Starter website for a fictional Miami bakery portfolio concept. The final build keeps Honeyvault's sensory identity while organizing the customer journey around desire, fast orientation, product choice, fulfillment, proof, larger-order conversion, and a compact branded close.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production build

```bash
npm run build
npm run start
```

## Deploy to Vercel

1. Push this project folder to GitHub.
2. Import the repository in Vercel.
3. Framework preset: **Next.js**.
4. Build command: `npm run build`.
5. Output directory: leave the Next.js default.
6. Node.js: **22.x** (the repository includes `.nvmrc` / `.node-version`).
7. Optional: add `LEAD_WEBHOOK_URL` if you want the large-order form to deliver real leads.

Without `LEAD_WEBHOOK_URL`, the inquiry form stays in explicit portfolio-demo mode and tells the visitor that no real request was sent.

## Final customer journey

1. `Hero` — sensory identity.
2. `BakeryFinderSection` — rotating intent line, Order now, Plan a box, compact location cue.
3. `GuidedChoiceSection` — visual situation-based navigation that keeps desire active.
4. `BakeryTextureGallery` — five signature pastries with hover preview + persistent selection.
5. `LocationsSection` — shop choice, live weekly-hour status, pickup/delivery, directions and map support.
6. `HoneyvaultHighlights` — proof section with counter-handoff image and two clearly labeled demo guest notes.
7. `LargeOrdersSection` — preserved product gallery + qualified celebration/business routes.
8. `BrandOperationalInterlude` — branded statement plus freshness and fulfillment information.
9. `LargeOrderInquiry` — qualified large-order inquiry form.
10. `Footer` — compact recovery navigation, contact, and demo disclosure.

## Final interaction details

- Header includes both **Order** and **Plan order** CTAs.
- EN/ES language toggle updates the full visible interface and persists in local storage.
- Search recognizes common English and Spanish intents and scrolls to the relevant section.
- Demo location order buttons stay inside the portfolio instead of opening placeholder `example.com` links.
- All internal anchors were checked for matching section IDs.
- Reduced-motion behavior is respected.
- Mobile and desktop layouts have separate spacing caps so large monitors do not create unnecessary empty vertical space.

## Image optimization

The final public image set has been reduced to only referenced assets. The previously oversized mobile hero was recompressed from ~2.1 MB to ~0.12 MB while retaining its dimensions. Run:

```bash
npm run audit:images
```

for the current image report.

## Main data files

- `data/content.ts`
- `data/pastries.ts`
- `data/locations.ts`
- `data/proof.ts`
- `data/brandInterlude.ts`
- `data/contact.ts`
- `data/inquiry.ts`
- `data/footer.ts`

## Brand palette

- Cherry Blossom: `#F5CBD9`
- Midnight Cocoa: `#2E1B1B`

## Portfolio disclaimer

Honeyvault Bakery is a fictional portfolio concept. Demo pricing, reviews, location details, allergen language and operational availability must be replaced with verified client information before any real commercial launch.
