import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";

const editorialFont = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-editorial",
});

export const metadata: Metadata = {
  title: "Honeyvault Bakery | Miami Pastry Portfolio Demo",
  description:
    "Bilingual portfolio demo for a premium Miami bakery: fresh pastries, local pickup and delivery, and large-order inquiries.",
  icons: {
    icon: "/images/logo/Logo-Mark.png",
    shortcut: "/images/logo/Logo-Mark.png",
    apple: "/images/logo/Logo-Mark.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={editorialFont.variable}>
        <LanguageProvider>
          <div className="page-frame">{children}</div>
        </LanguageProvider>
      </body>
    </html>
  );
}
