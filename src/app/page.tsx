import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/layout/Hero";
import { VideoSection } from "@/components/layout/VideoSection";
import { CountryFlagsSection } from "@/components/layout/CountryFlagsSection";
import { ServiceCardsPersonal } from "@/components/layout/ServiceCardsPersonal";
import { CinematicQuoteBreak } from "@/components/layout/CinematicQuoteBreak";
import { RequestFormSection } from "@/components/layout/RequestFormSection";
import { CaseStoriesSection } from "@/components/layout/CaseStoriesSection";
import { NewsletterInline } from "@/components/layout/NewsletterInline";
import { AboutSection } from "@/components/layout/AboutSection";
import { FAQSection } from "@/components/layout/FAQSection";
import { LogoTicker } from "@/components/layout/LogoTicker";
import { Footer } from "@/components/layout/Footer";
import { ScrollSection } from "@/components/ui/ScrollSection";
import { ExitIntentPopup } from "@/components/ui/ExitIntentPopup";

export default function Home() {
  return (
    <>
      <Navbar />

      {/* 1. Hero — hook + CTA */}
      <Hero />

      {/* 2. Logo Banner — social proof */}
      <ScrollSection fadeOut={false}>
        <LogoTicker />
      </ScrollSection>

      {/* 3. Video — visa stämning, process kan ingå här */}
      <ScrollSection>
        <VideoSection />
      </ScrollSection>

      {/* 4. Country Flags — visa bredden (36 länder) */}
      <ScrollSection>
        <CountryFlagsSection />
      </ScrollSection>

      {/* 5. Formulär — KONVERTERA (tidigt = för de som är redo att boka) */}
      <ScrollSection>
        <RequestFormSection />
      </ScrollSection>

      {/* 6. Tjänster — bildkort (för de som vill läsa mer) */}
      <ScrollSection>
        <ServiceCardsPersonal />
      </ScrollSection>

      {/* 7. CTA — "Skräddarsy ditt event" fullbleed break */}
      <ScrollSection fadeOut={false}>
        <CinematicQuoteBreak />
      </ScrollSection>

      {/* 8. Case Stories — dark section, horisontell scroll */}
      <ScrollSection>
        <CaseStoriesSection />
      </ScrollSection>

      {/* 9. Newsletter CTA — fånga leads */}
      <NewsletterInline />

      {/* 10. Om oss (mini) — förtroende, länkar till /om-oss */}
      <ScrollSection>
        <AboutSection />
      </ScrollSection>

      {/* 11. FAQ — övervinna invändningar */}
      <ScrollSection fadeOut={false}>
        <FAQSection />
      </ScrollSection>

      <Footer />
      <ExitIntentPopup />
    </>
  );
}
