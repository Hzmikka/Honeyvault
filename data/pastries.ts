export type SignaturePastry = {
  id: string;
  name: string;
  nameEs: string;
  price: string;
  detail: string;
  detailEs: string;
  sensory: string;
  sensoryEs: string;
  allergens: string;
  allergensEs: string;
  image: string;
  wholeImage: string;
  orderHref?: string;
};

export const signaturePastries: SignaturePastry[] = [
  {
    id: "almond-cream-croissant",
    wholeImage: "/images/products/almond-cream-croissant.webp",
    name: "Almond Cream Croissant",
    nameEs: "Croissant de crema de almendra",
    price: "$7.95",
    detail: "Almond cream, toasted almonds, powdered sugar.",
    detailEs: "Crema de almendra, almendras tostadas y azúcar glas.",
    sensory: "Flaky · nutty · buttery",
    sensoryEs: "Hojaldrado · almendrado · mantecoso",
    allergens: "Sample: wheat (gluten), milk, egg, nuts",
    allergensEs: "Muestra: trigo (gluten), leche, huevo, frutos secos",
    image: "/images/close-up/croissant-almendras.webp",
  },
  {
    id: "pistachio-croissant",
    wholeImage: "/images/products/pistachio-croissant.webp",
    name: "Pistachio Croissant",
    nameEs: "Croissant de pistacho",
    price: "$7.50",
    detail: "Pistachio cream, laminated crust, crushed pistachios.",
    detailEs: "Crema de pistacho, hojaldre laminado y pistacho triturado.",
    sensory: "Crisp · pistachio-rich · creamy",
    sensoryEs: "Crujiente · intenso a pistacho · cremoso",
    allergens: "Sample: wheat (gluten), milk, egg, nuts",
    allergensEs: "Muestra: trigo (gluten), leche, huevo, frutos secos",
    image: "/images/close-up/croissant-pistacho.webp",
  },
  {
    id: "vanilla-glazed-roll",
    wholeImage: "/images/products/vanilla-glazed-roll.webp",
    name: "Vanilla Glazed Roll",
    nameEs: "Roll glaseado de vainilla",
    price: "$6.25",
    detail: "Soft laminated swirl, vanilla glaze, golden crust.",
    detailEs: "Espiral laminada suave, glaseado de vainilla y corteza dorada.",
    sensory: "Soft · vanilla · glazed",
    sensoryEs: "Suave · vainilla · glaseado",
    allergens: "Sample: wheat (gluten), milk, egg",
    allergensEs: "Muestra: trigo (gluten), leche, huevo",
    image: "/images/close-up/roll-glaseado-blanco.webp",
  },
  {
    id: "chocolate-roll",
    wholeImage: "/images/products/chocolate-roll.webp",
    name: "Chocolate Roll",
    nameEs: "Roll de chocolate",
    price: "$6.95",
    detail: "Cocoa swirl, glossy chocolate, caramelized layers.",
    detailEs: "Espiral de cacao, chocolate brillante y capas caramelizadas.",
    sensory: "Chocolatey · glossy · caramelized",
    sensoryEs: "Chocolate · brillante · caramelizado",
    allergens: "Sample: wheat (gluten), milk, egg",
    allergensEs: "Muestra: trigo (gluten), leche, huevo",
    image: "/images/close-up/roll-chocolate.webp",
  },
  {
    id: "strawberry-cream-croissant",
    wholeImage: "/images/products/strawberry-cream-croissant.webp",
    name: "Strawberry Cream Croissant",
    nameEs: "Croissant de fresa y crema",
    price: "$7.75",
    detail: "Fresh strawberry, vanilla cream, flaky laminated shell.",
    detailEs: "Fresa fresca, crema de vainilla y hojaldre laminado crujiente.",
    sensory: "Fruity · creamy · flaky",
    sensoryEs: "Frutal · cremoso · hojaldrado",
    allergens: "Sample: wheat (gluten), milk, egg",
    allergensEs: "Muestra: trigo (gluten), leche, huevo",
    image: "/images/close-up/croissant-fresa-crema.webp",
  },
];
