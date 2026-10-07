import type { Metadata } from "next";
import HoneyvaultHome from "../page";

const title = "Celeste Web Studio · Webs para elegir y encargar";
const description =
  "Conoce Honeyvault: un proyecto de diseño web que ayuda a elegir postres, definir cantidades y consultar un encargo para una celebración.";

export const metadata: Metadata = {
  metadataBase: new URL("https://honeyvault.vercel.app"),
  title: { absolute: title },
  description,
  alternates: { canonical: "/" },
  robots: { index: false, follow: true },
  openGraph: {
    type: "website",
    siteName: "Celeste Web Studio",
    url: "/celeste",
    title,
    description,
    images: [
      {
        url: "/celeste/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Una web que ayuda a elegir y encargar. Honeyvault, un proyecto de Celeste Web Studio.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/celeste/opengraph-image"],
  },
};

export default function CelesteProjectPage() {
  return <HoneyvaultHome />;
}

