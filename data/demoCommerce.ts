// Fictional, deterministic portfolio fixtures. These are not a bakery's live terms.
export const demoBoxes = [
  { id: "brunch-six", name: "The little brunch box", nameEs: "La pequeña caja de brunch", pieces: 6, serves: "3–6", priceCents: 4200, perFlavor: 2 },
  { id: "gathering-twelve", name: "The gathering box", nameEs: "La caja para reunirnos", pieces: 12, serves: "6–12", priceCents: 8000, perFlavor: 4 },
] as const;

export const boxFlavors = ["almond-cream-croissant", "pistachio-croissant", "chocolate-roll"] as const;
export const deliveryZones = [
  { zip: "33127", locationId: "wynwood", feeCents: 800, minimumCents: 2000, delivery: true },
  { zip: "33134", locationId: "coral-gables", feeCents: 1000, minimumCents: 2500, delivery: true },
  { zip: "33139", locationId: "south-beach", feeCents: 0, minimumCents: 0, delivery: false },
] as const;

export const eventTerms = { unitCents: 450, piecesPerGuest: 2, minGuests: 6, maxGuests: 200, stylingCents: 7500 };
export const leadMinutes = { pastry: 30, box: 24 * 60, event: 48 * 60 };
