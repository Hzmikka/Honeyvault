export type WeekdayKey = "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";

export type DailyHours = {
  open: string;
  close: string;
} | null;

export type BakeryLocation = {
  id: string;
  shortName: string;
  label: string;
  labelEs: string;
  name: string;
  address: string;
  cityState: string;
  image: string;
  mapImage: string;
  orderUrl: string;
  directionsUrl: string;
  fulfillment: {
    pickup: boolean;
    localDelivery: boolean;
  };
  hours: Record<WeekdayKey, DailyHours>;
  scheduleSummary: string;
};

const daily = (open: string, close: string): Record<WeekdayKey, DailyHours> => ({
  sun: { open, close },
  mon: { open, close },
  tue: { open, close },
  wed: { open, close },
  thu: { open, close },
  fri: { open, close },
  sat: { open, close },
});

export const honeyvaultLocations: BakeryLocation[] = [
  {
    id: "wynwood",
    shortName: "Wynwood",
    label: "Flagship",
    labelEs: "Tienda principal",
    name: "Honeyvault Wynwood",
    address: "255 NW 24th St",
    cityState: "Miami, FL",
    image: "/images/Ubication/Flagship.webp",
    mapImage: "/images/location/Honeyvault-Wynwood.webp",
    orderUrl: "#textures",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=255+NW+24th+St+Miami+FL",
    fulfillment: { pickup: true, localDelivery: true },
    hours: daily("07:00", "18:00"),
    scheduleSummary: "Daily · 7 AM–6 PM",
  },
  {
    id: "coral-gables",
    shortName: "Coral Gables",
    label: "Neighborhood shop",
    labelEs: "Tienda de barrio",
    name: "Honeyvault Coral Gables",
    address: "151 Miracle Mile",
    cityState: "Coral Gables, FL",
    image: "/images/Ubication/Neighborhood-stop.webp",
    mapImage: "/images/location/Honeyvault-Coral-Gables.webp",
    orderUrl: "#textures",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=151+Miracle+Mile+Coral+Gables+FL",
    fulfillment: { pickup: true, localDelivery: true },
    hours: {
      sun: null,
      mon: { open: "07:30", close: "17:30" },
      tue: { open: "07:30", close: "17:30" },
      wed: { open: "07:30", close: "17:30" },
      thu: { open: "07:30", close: "17:30" },
      fri: { open: "07:30", close: "17:30" },
      sat: { open: "07:30", close: "17:30" },
    },
    scheduleSummary: "Mon–Sat · 7:30 AM–5:30 PM",
  },
  {
    id: "south-beach",
    shortName: "South Beach",
    label: "Beach stop",
    labelEs: "Parada de playa",
    name: "Honeyvault South Beach",
    address: "845 Collins Ave",
    cityState: "Miami Beach, FL",
    image: "/images/Ubication/Beach-stop.webp",
    mapImage: "/images/location/Honeyvault-South-Beach.webp",
    orderUrl: "#textures",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=845+Collins+Ave+Miami+Beach+FL",
    fulfillment: { pickup: true, localDelivery: false },
    hours: daily("08:00", "19:00"),
    scheduleSummary: "Daily · 8 AM–7 PM",
  },
];
