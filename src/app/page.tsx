import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/layout/Hero";
import { GlobeSection } from "@/components/layout/GlobeSection";
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
import { WebshopTeaser } from "@/components/layout/WebshopTeaser";
import { DarkZone } from "@/components/ui/DarkZone";
import { HeroLightUpZone } from "@/components/ui/HeroLightUp";
import { ExitIntentPopup } from "@/components/ui/ExitIntentPopup";
import { client } from "@/../sanity/lib/client";
import { HOMEPAGE_QUERY } from "@/../sanity/lib/queries";
import { localize } from "@/../sanity/lib/locale";
import { sanityFetch, SanityLive } from "@/../sanity/lib/live";

export default async function Home() {
  const { data } = await sanityFetch({ query: HOMEPAGE_QUERY });

  // Helper: localize a field (defaults to English)
  const t = (field: { en?: string; sv?: string } | undefined | null) =>
    localize(field);

  return (
    <div id="page-root" style={{ backgroundColor: "#111" }}>
      <Navbar cms={data ? {
        links: data.navLinks?.map((l: any) => ({
          label: t(l.label),
          href: l.href,
        })),
        cta: t(data.navCta),
      } : undefined} />

      {/* 1. Hero — hook + CTA (110vh high) */}
      <Hero cms={data ? {
        badge: t(data.heroBadge),
        headline: t(data.heroHeadline),
        headlineAccent: t(data.heroHeadlineAccent),
        subheadline: t(data.heroSubheadline),
        cta1: t(data.heroCta1),
        cta2: t(data.heroCta2),
      } : undefined} />

      {/* The rest of the light page content wrapped in the LightUp zone */}
      <HeroLightUpZone>
        {/* 2. Harmon Brothers Style Video Overlap (Straddles the seam between Hero and light section) */}
        <ScrollSection>
          <VideoSection cms={data ? {
            label: t(data.videoLabel),
            headline: t(data.videoHeadline),
            headlineAccent: t(data.videoHeadlineAccent),
            description: t(data.videoDescription),
            bottomLabel: t(data.videoBottomLabel),
            bottomText: t(data.videoBottomText),
          } : undefined} />
        </ScrollSection>

        {/* 3. Logo Banner — social proof */}
        <ScrollSection fadeOut={false}>
          <LogoTicker />
        </ScrollSection>

        {/* 3b. Global Scale */}
        <GlobeSection cms={data ? {
          badge: t(data.globeBadge),
          headline: t(data.globeHeadline),
          headlineAccent: t(data.globeHeadlineAccent),
          description: t(data.globeDescription),
        } : undefined} />

      {/* 4. Country Flags */}
      <ScrollSection>
        <CountryFlagsSection cms={data ? {
          label: t(data.flagsLabel),
          labelRight: t(data.flagsLabelRight),
          headline: t(data.flagsHeadline),
          description: t(data.flagsDescription),
          metrics: data.flagsMetrics?.map((m: any) => ({
            value: m.value,
            stringValue: m.stringValue,
            suffix: m.suffix,
            label: t(m.label)
          }))
        } : undefined} />
      </ScrollSection>

      {/* 5. Request Form */}
      <ScrollSection>
        <RequestFormSection cms={data ? {
          badge: t(data.formBadge),
          headline: t(data.formHeadline),
          headlineAccent: t(data.formHeadlineAccent),
          description: t(data.formDescription),
          button: t(data.formButton),
          disclaimer: t(data.formDisclaimer),
        } : undefined} />
      </ScrollSection>

      {/* 6. Services */}
      <ScrollSection fadeOut={false}>
        <ServiceCardsPersonal cms={data ? {
          label: t(data.servicesLabel),
          labelRight: t(data.servicesLabelRight),
          headline: t(data.servicesHeadline),
          description: t(data.servicesDescription),
          stats: data.servicesStats?.map((s: any) => ({
            value: s.value,
            label: t(s.label),
          })),
          cards: data.serviceCards?.map((c: any) => ({
            title: t(c.title),
            desc: t(c.desc),
            icon: c.icon,
          })),
          fullserviceTitle: t(data.servicesFullserviceTitle),
          fullserviceDesc: t(data.servicesFullserviceDesc),
        } : undefined} />
      </ScrollSection>
      </HeroLightUpZone>

      {/* 7-8. Dark Zone 1: Cases + Newsletter */}
      <DarkZone>
        <CaseStoriesSection cms={data ? {
          label: t(data.casesLabel),
          labelRight: t(data.casesLabelRight),
          headline: t(data.casesHeadline),
          description: t(data.casesDescription),
          cards: data.caseCards?.map((c: any) => ({
            client: c.client,
            event: t(c.event),
            description: t(c.description),
            guests: c.guests,
            location: t(c.location),
            duration: t(c.duration),
          })),
          cta: t(data.casesCta),
        } : undefined} />
        <NewsletterInline cms={data ? {
          headline: t(data.newsletterHeadline),
          description: t(data.newsletterDescription),
          placeholder: t(data.newsletterPlaceholder),
          button: t(data.newsletterButton),
        } : undefined} />
      </DarkZone>

      {/* 9. About */}
      <ScrollSection>
        <AboutSection cms={data ? {
          label: t(data.aboutLabel),
          headline: t(data.aboutHeadline),
          headlineAccent: t(data.aboutHeadlineAccent),
          quote: t(data.aboutQuote),
          body: t(data.aboutBody),
          body2: t(data.aboutBody2),
          motto: t(data.aboutMotto),
          stats: data.aboutStats?.map((s: any) => ({
            value: s.value,
            label: t(s.label),
          })),
          teamLabel: t(data.aboutTeamLabel),
          teamIntro: t(data.aboutTeamIntro),
          team: data.aboutTeam?.map((m: any) => ({
            name: m.name,
            role: t(m.role),
            bio: t(m.bio),
            linkedin: m.linkedin,
            image: m.image,
            initials: m.initials,
          })),
        } : undefined} />
      </ScrollSection>

      {/* 10. Webshop Teaser */}
      <ScrollSection>
        <WebshopTeaser cms={data ? {
          label: t(data.webshopLabel),
          labelRight: t(data.webshopLabelRight),
          headline: t(data.webshopHeadline),
          headlineAccent: t(data.webshopHeadlineAccent),
          description: t(data.webshopDescription),
          comingSoonTitle: t(data.webshopComingSoonTitle),
          comingSoonDesc: t(data.webshopComingSoonDesc),
          ctaText: t(data.webshopCtaText),
        } : undefined} />
      </ScrollSection>

      {/* 11. FAQ */}
      <ScrollSection fadeOut={false}>
        <FAQSection cms={data ? {
          headline: t(data.faqHeadline),
          description: t(data.faqDescription),
          items: data.faqItems?.map((item: any) => ({
            question: t(item.question),
            answer: t(item.answer),
          })),
          ctaText: t(data.faqCtaText),
          ctaLink: t(data.faqCtaLink),
        } : undefined} />
      </ScrollSection>

      {/* 11-12. Dark Zone 2: CTA + Footer */}
      <DarkZone exitToLight={false}>
        <CinematicQuoteBreak cms={data ? {
          label: t(data.ctaLabel),
          labelRight: t(data.ctaLabelRight),
          headline: t(data.ctaHeadline),
          subheadline: t(data.ctaSubheadline),
          card1Title: t(data.ctaCard1Title),
          card1Desc: t(data.ctaCard1Desc),
          card2Title: t(data.ctaCard2Title),
          card2Headline: t(data.ctaCard2Headline),
          card2Sub: t(data.ctaCard2Sub),
        } : undefined} />
        <Footer cms={data ? {
          brandDesc: t(data.footerBrandDesc),
          socialLabel: t(data.footerSocialLabel),
          newsletterDesc: t(data.footerNewsletterDesc),
          ctaTitle: t(data.footerCtaTitle),
          ctaDesc: t(data.footerCtaDesc),
          columns: data.footerColumns?.map((col: any) => ({
            title: t(col.title),
            links: col.links?.map((l: any) => ({
              label: t(l.label),
              href: l.href,
            })),
          })),
        } : undefined} />
      </DarkZone>

      <ExitIntentPopup cms={data ? {
        label: t(data.exitLabel),
        headline: t(data.exitHeadline),
        headlineAccent: t(data.exitHeadlineAccent),
        description: t(data.exitDescription),
        button: t(data.exitButton),
        privacy: t(data.exitPrivacy),
      } : undefined} />
      <SanityLive />
    </div>
  );
}
