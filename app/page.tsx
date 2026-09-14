import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { BakeryFinderSection } from "@/components/BakeryFinderSection";
import { GuidedChoiceSection } from "@/components/GuidedChoiceSection";
import { BakeryTextureGallery } from "@/components/BakeryTextureGallery";
import { LocationsSection } from "@/components/LocationsSection";
import { HoneyvaultHighlights } from "@/components/HoneyvaultHighlights";
import { LargeOrdersSection } from "@/components/LargeOrdersSection";
import { BrandOperationalInterlude } from "@/components/BrandOperationalInterlude";
import { LargeOrderInquiry } from "@/components/LargeOrderInquiry";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <BakeryFinderSection />

        <Reveal>
          <GuidedChoiceSection />
        </Reveal>

        <Reveal>
          <BakeryTextureGallery />
        </Reveal>

        <Reveal>
          <LocationsSection />
        </Reveal>

        <Reveal>
          <HoneyvaultHighlights />
        </Reveal>

        <Reveal>
          <LargeOrdersSection />
        </Reveal>

        <Reveal>
          <BrandOperationalInterlude />
        </Reveal>

        <Reveal>
          <LargeOrderInquiry />
        </Reveal>
      </main>

      <Footer />
    </>
  );
}
