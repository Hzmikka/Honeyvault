export const commerceLinks = {
  browsePastries: "#textures",
  orderNow: "#textures",
  getPastry: "#large-order-inquiry",
  planBox: "#boxes",
  locations: "#locations",
  inquiry: "#large-order-inquiry",
};

export const navLinks = [
  { label: "Pastries", labelEs: "Pasteles", href: "#textures" },
  { label: "Boxes", labelEs: "Cajas", href: "#boxes" },
  { label: "Shops", labelEs: "Tiendas", href: "#locations" },
  { label: "Events", labelEs: "Eventos", href: "#large-orders" },
] as const;

export const guidedChoices = [
  {
    number: "01",
    title: "Pastries",
    titleEs: "Pasteles",
    description: "One flavor · 1–24 pieces",
    descriptionEs: "Un sabor · 1–24 piezas",
    href: "#textures",
    image: "/images/guide/something-for-now.webp",
  },
  {
    number: "02",
    title: "Boxes",
    titleEs: "Cajas",
    description: "Fixed assortment · 6 or 12 pieces",
    descriptionEs: "Surtido fijo · 6 o 12 piezas",
    href: "#boxes",
    image: "/images/guide/box-to-share.webp",
  },
  {
    number: "03",
    title: "Events",
    titleEs: "Eventos",
    description: "Mini desserts for 6–200 guests",
    descriptionEs: "Mini postres para 6–200 personas",
    href: "#large-orders",
    image: "/images/guide/special-occasion.webp",
  },
] as const;
