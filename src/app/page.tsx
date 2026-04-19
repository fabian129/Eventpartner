import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/layout/Hero";
import { VideoSection } from "@/components/layout/VideoSection";
import { CountryFlagsSection } from "@/components/layout/CountryFlagsSection";
import { HowItWorksSection } from "@/components/layout/HowItWorksSection";
import { ServiceShowcase } from "@/components/layout/ServiceShowcase";
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

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <LogoTicker />
      <VideoSection />
      <SectionTransition variant="line" />
      <CountryFlagsSection />
      <ImageBreaker />
      <HowItWorksSection />
      <SectionTransition variant="diamond" />
      <ServiceShowcase />
      <CinematicQuoteBreak />
      <RequestFormSection />
      <SectionTransition variant="dots" />
      <TestimonialsSection />
      <EnterpriseSection />
      <AboutSection />
      <FAQSection />
      <WebshopTeaser />
      <NewsletterSection />
      <Footer />
    </>
  );
}
