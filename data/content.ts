export const commerceLinks = {
  browsePastries: "#textures",
  orderNow: "#locations",
  getPastry: "#locations",
  planBox: "#large-orders",
  locations: "#locations",
  inquiry: "#large-order-inquiry",
};

export const navLinks = [
  { label: "SHOP", labelEs: "PASTELES", href: "#textures" },
  { label: "LOCATIONS", labelEs: "TIENDAS", href: "#locations" },
  { label: "LARGE ORDERS", labelEs: "PEDIDOS GRANDES", href: "#large-orders" },
] as const;

export const guidedChoices = [
  {
    number: "01",
    title: "Something for now",
    titleEs: "Algo para ahora",
    description: "Fresh pastries & daily favorites",
    descriptionEs: "Pasteles frescos y favoritos del día",
    href: "#textures",
    image: "/images/guide/something-for-now.webp",
  },
  {
    number: "02",
    title: "A box to share",
    titleEs: "Una caja para compartir",
    description: "Brunch, gifting & small groups",
    descriptionEs: "Brunch, regalos y grupos pequeños",
    href: "#large-orders",
    image: "/images/guide/box-to-share.webp",
  },
  {
    number: "03",
    title: "A special occasion",
    titleEs: "Una ocasión especial",
    description: "Birthdays, celebrations & dessert tables",
    descriptionEs: "Cumpleaños, celebraciones y mesas de postres",
    href: "#large-orders",
    image: "/images/guide/special-occasion.webp",
  },
  {
    number: "04",
    title: "A large order",
    titleEs: "Un pedido grande",
    description: "Office, events & bigger batches",
    descriptionEs: "Oficina, eventos y lotes grandes",
    href: "#large-orders",
    image: "/images/guide/large-order.webp",
  },
] as const;
