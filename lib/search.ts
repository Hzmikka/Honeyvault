import { demoBoxes } from "../data/demoCommerce";
import { signaturePastries } from "../data/pastries";
import { orderItems } from "../data/orderItems";
import { honeyvaultLocations } from "../data/locations";

export type SearchMatch = {
  kind: "pastry" | "box" | "special-item" | "location" | "section";
  id: string;
  section: string;
  name: string;
  nameEs: string;
};

export function normalizeSearch(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

const sections = [
  { id: "textures", name: "Signature pastries", nameEs: "Pasteles distintivos", terms: "pastry pastries menu texture textures pastel pasteles textura texturas dulce dulces" },
  { id: "boxes", name: "Boxes to share", nameEs: "Cajas para compartir", terms: "box boxes brunch gifting caja cajas regalo compartir" },
  { id: "large-orders", name: "Events and dessert tables", nameEs: "Eventos y mesas de postres", terms: "custom cake cakes birthday brunch event tray trays office dessert large order team gifting caja cajas personalizado cumpleanos evento bandeja oficina postre pedido pedidos grande grandes equipo regalo celebracion" },
  { id: "locations", name: "Shops and fulfillment", nameEs: "Tiendas, recogida y entrega", terms: "location locations shop shops map miami pickup delivery ubicacion ubicaciones tienda tiendas mapa recogida entrega" },
  { id: "proof", name: "Guest notes", nameEs: "Reseñas de clientes", terms: "review reviews testimonial testimonials rating ratings guest guests resena resenas testimonio testimonios opiniones clientes" },
  { id: "large-order-inquiry", name: "Order inquiry", nameEs: "Solicitud de pedido", terms: "request date contact production formulario solicitud fecha contacto produccion" },
];

export function findSearchMatches(query: string): SearchMatch[] {
  const normalized = normalizeSearch(query);
  if (!normalized) return [];
  const words = normalized.split(/\s+/);
  const catalog: SearchMatch[] = [
    ...signaturePastries.map(item => ({ kind: "pastry" as const, id: item.id, section: "textures", name: item.name, nameEs: item.nameEs })),
    ...demoBoxes.map(item => ({ kind: "box" as const, id: item.id, section: "boxes", name: item.name, nameEs: item.nameEs })),
    ...orderItems.map(item => ({ kind: "special-item" as const, id: item.id, section: "large-orders", name: item.name, nameEs: item.nameEs })),
    ...honeyvaultLocations.map(shop => ({ kind: "location" as const, id: shop.id, section: "locations", name: shop.name, nameEs: shop.name })),
  ];
  const matches = catalog.filter(item => words.every(word => normalizeSearch(`${item.name} ${item.nameEs}`).includes(word)));
  if (matches.length) return matches;
  return sections.filter(section => {
    const terms = section.terms.split(" ");
    return words.every(word => terms.includes(word));
  }).map(section => ({ kind: "section", id: section.id, section: section.id, name: section.name, nameEs: section.nameEs }));
}
