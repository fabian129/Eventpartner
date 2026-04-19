import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/layout/Hero";
import { VideoSection } from "@/components/layout/VideoSection";
import { CountryFlagsSection } from "@/components/layout/CountryFlagsSection";
import { HowItWorksSection } from "@/components/layout/HowItWorksSection";
import { ServiceShowcase } from "@/components/layout/ServiceShowcase";
import { ServiceListClean } from "@/components/layout/ServiceListClean";
import { ServiceCardsPersonal } from "@/components/layout/ServiceCardsPersonal";
import { CinematicQuoteBreak } from "@/components/layout/CinematicQuoteBreak";
import { RequestFormSection } from "@/components/layout/RequestFormSection";
import { TestimonialsSection } from "@/components/layout/TestimonialsSection";
import { ImageBreaker } from "@/components/layout/ImageBreaker";
import { LogoTicker } from "@/components/layout/LogoTicker";
import { EnterpriseSection } from "@/components/layout/EnterpriseSection";
import { AboutSection } from "@/components/layout/AboutSection";
import { FAQSection } from "@/components/layout/FAQSection";
import { WebshopTeaser } from "@/components/layout/WebshopTeaser";
import { NewsletterSection } from "@/components/layout/NewsletterSection";
import { SectionTransition } from "@/components/layout/SectionTransition";
import { Footer } from "@/components/layout/Footer";
import { ScrollSection } from "@/components/ui/ScrollSection";

export default function Home() {
  return (
    <>
      <Navbar />
      {/* Hero — above fold, no entrance animation needed */}
      <Hero />

      <ScrollSection fadeOut={false}>
        <LogoTicker />
      </ScrollSection>

      <ScrollSection>
        <VideoSection />
      </ScrollSection>

      <SectionTransition variant="line" />

      <ScrollSection>
        <CountryFlagsSection />
      </ScrollSection>

      <ScrollSection>
        <ImageBreaker />
      </ScrollSection>

      <ScrollSection>
        <HowItWorksSection />
      </ScrollSection>

      <SectionTransition variant="diamond" />

      <ScrollSection>
        <ServiceShowcase />
      </ScrollSection>

      <ScrollSection>
        <ServiceListClean />
      </ScrollSection>

      <ScrollSection>
        <ServiceCardsPersonal />
      </ScrollSection>

      <ScrollSection fadeOut={false}>
        <CinematicQuoteBreak />
      </ScrollSection>

      <ScrollSection>
        <RequestFormSection />
      </ScrollSection>

      <SectionTransition variant="dots" />

      <ScrollSection>
        <TestimonialsSection />
      </ScrollSection>

      <ScrollSection>
        <EnterpriseSection />
      </ScrollSection>

      <ScrollSection>
        <AboutSection />
      </ScrollSection>

      <ScrollSection>
        <FAQSection />
      </ScrollSection>

      <ScrollSection>
        <WebshopTeaser />
      </ScrollSection>

      <ScrollSection fadeOut={false}>
        <NewsletterSection />
      </ScrollSection>

      <Footer />
    </>
  );
}
