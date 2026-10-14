import { signaturePastries } from "../data/pastries";
import { orderItems } from "../data/orderItems";
import { honeyvaultLocations } from "../data/locations";
import { fulfillmentOptions, occasionOptions } from "../data/inquiry";

export type OrderIntent = "pastry" | "box" | "celebration" | "large-order" | null;
export type OrderDraft = {
  intent: OrderIntent;
  pastryId: string | null;
  specialItemIds: string[];
  locationId: string | null;
  occasion: string;
  fulfillment: string;
};

export const emptyOrderDraft: OrderDraft = {
  intent: null, pastryId: null, specialItemIds: [], locationId: null,
  occasion: "", fulfillment: "",
};

// Only product and fulfillment choices are stored. Contact information stays in the form.
export function restoreOrderDraft(value: unknown): OrderDraft {
  if (!value || typeof value !== "object" || Array.isArray(value)) return { ...emptyOrderDraft };
  const input = value as Record<string, unknown>;
  return {
    intent: ["pastry", "box", "celebration", "large-order"].includes(String(input.intent)) ? input.intent as OrderIntent : null,
    pastryId: signaturePastries.some(item => item.id === input.pastryId) ? String(input.pastryId) : null,
    specialItemIds: Array.isArray(input.specialItemIds)
      ? orderItems.filter(item => (input.specialItemIds as unknown[]).includes(item.id)).map(item => item.id) : [],
    locationId: honeyvaultLocations.some(shop => shop.id === input.locationId) ? String(input.locationId) : null,
    occasion: occasionOptions.some(option => option.en === input.occasion) ? String(input.occasion) : "",
    fulfillment: fulfillmentOptions.some(option => option.en === input.fulfillment) ? String(input.fulfillment) : "",
  };
}
