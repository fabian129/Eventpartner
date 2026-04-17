import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/layout/Hero";
import { VideoSection } from "@/components/layout/VideoSection";
import { CountryFlagsSection } from "@/components/layout/CountryFlagsSection";
import { RequestFormSection } from "@/components/layout/RequestFormSection";
import { ServiceShowcase } from "@/components/layout/ServiceShowcase";
import { WebshopTeaser } from "@/components/layout/WebshopTeaser";
import { NewsletterSection } from "@/components/layout/NewsletterSection";
import { SectionTransition } from "@/components/layout/SectionTransition";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <VideoSection />
      <SectionTransition variant="line" />
      <CountryFlagsSection />
      <RequestFormSection />
      <SectionTransition variant="line" />
      <ServiceShowcase />
      <WebshopTeaser />
      <NewsletterSection />
      <Footer />
    </>
  );
}
