export type ProofReview = {
  id: string;
  name: string;
  location: string;
  rating: number;
  title: string;
  titleEs: string;
  body: string;
  bodyEs: string;
  demo?: boolean;
};

export const featuredProofReviews: ProofReview[] = [
  {
    id: "sofia-pistachio",
    name: "Sofia R.",
    location: "Wynwood",
    rating: 5,
    title: "The pistachio croissant was unreal",
    titleEs: "El croissant de pistacho fue increíble",
    body: "The pastry layers were crisp, buttery, and filled with the smoothest pistachio cream. It felt like a tiny luxury before work.",
    bodyEs: "Las capas estaban crujientes, mantecosas y llenas de una crema de pistacho muy suave. Se sintió como un pequeño lujo antes del trabajo.",
    demo: true,
  },
  {
    id: "ari-brunch-box",
    name: "Ari M.",
    location: "Miami Beach",
    rating: 5,
    title: "Best pastry box for brunch",
    titleEs: "La mejor caja de pasteles para brunch",
    body: "The mix of croissants, rolls, and fruit pastries made the table look expensive with zero effort.",
    bodyEs: "La mezcla de croissants, rolls y pasteles de fruta hizo que la mesa se viera increíble sin esfuerzo.",
    demo: true,
  },
];
