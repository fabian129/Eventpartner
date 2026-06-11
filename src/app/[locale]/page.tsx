import { Navbar } from "@/components/layout/Navbar";
import { GlobeHero } from "@/components/layout/GlobeHero";
import { VideoSection } from "@/components/layout/VideoSection";
import { ServiceCardsPersonal } from "@/components/layout/ServiceCardsPersonal";
import { CinematicQuoteBreak } from "@/components/layout/CinematicQuoteBreak";
import { RequestFormSection } from "@/components/layout/RequestFormSection";
import { CaseStoriesSection } from "@/components/layout/CaseStoriesSection";
import { VIPTeaser } from "@/components/layout/VIPTeaser";
import { NewsletterInline } from "@/components/layout/NewsletterInline";
import { AboutSection } from "@/components/layout/AboutSection";
import { FAQSection } from "@/components/layout/FAQSection";
import { LogoTicker } from "@/components/layout/LogoTicker";
import { Footer } from "@/components/layout/Footer";
import { ScrollSection } from "@/components/ui/ScrollSection";
import { WebshopTeaser } from "@/components/layout/WebshopTeaser";
import { VPPShowcase } from "@/components/shop/VPPShowcase";
import { DarkZone } from "@/components/ui/DarkZone";
import { HeroLightUpZone } from "@/components/ui/HeroLightUp";
import { ExitIntentPopup } from "@/components/ui/ExitIntentPopup";
import { client } from "@/../sanity/lib/client";
import { HOMEPAGE_QUERY } from "@/../sanity/lib/queries";
import { localize, type Locale } from "@/../sanity/lib/locale";
import { sanityFetch, SanityLive } from "@/../sanity/lib/live";
import { urlFor } from "@/../sanity/lib/image";


export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { data } = await sanityFetch({ query: HOMEPAGE_QUERY });

  // Helper: localize a field using the current URL locale
  const t = (field: { en?: string; sv?: string } | undefined | null) =>
    localize(field, locale as Locale);

  return (
    <div id="page-root" style={{ backgroundColor: "#111" }} suppressHydrationWarning>
      <Navbar cms={data ? {
        links: data.navLinks?.map((l: any) => ({
          label: t(l.label),
          href: l.href,
        })),
        cta: t(data.navCta),
      } : undefined} />

      {/* 1. Globe Hero — fullscreen globe + headline + region strip */}
      <GlobeHero cms={data ? {
        badge: t(data.heroBadge),
        headline: t(data.heroHeadline),
        headlineAccent: t(data.heroHeadlineAccent),
        subheadline: t(data.heroSubheadline),
        cta1: t(data.heroCta1),
        cta2: t(data.heroCta2),
      } : undefined} />

      {/* The rest of the light page content wrapped in the LightUp zone */}
      <HeroLightUpZone>
        {/* 2. Video + Partner banner — TEMPORARILY HIDDEN (video not ready yet)
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
        */}




      {/* 5. Request Form */}
      <ScrollSection>
        <RequestFormSection cms={data ? {
          badge: t(data.formBadge),
          headline: t(data.formHeadline),
          headlineAccent: t(data.formHeadlineAccent),
          description: t(data.formDescription),
          button: t(data.formButton),
          disclaimer: t(data.formDisclaimer),
          inquiryLabel: t(data.formInquiryLabel),
          extendedTitle: t(data.formExtendedTitle),
          extendedDesc: t(data.formExtendedDesc),
          extendedLink: t(data.formExtendedLink),
          meetingLabel: t(data.formMeetingLabel),
          meetingTitle: t(data.formMeetingTitle),
          meetingDesc: t(data.formMeetingDesc),
          meetingButton: t(data.formMeetingButton),
          successMessage: t(data.formSuccessMessage),
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

      {/* 7. Dark Zone: VIP */}
      <DarkZone>
        <VIPTeaser cms={data ? {
          label: t(data.vipLabel),
          headline: t(data.vipHeadline),
          headlineMuted: t(data.vipHeadlineMuted),
          body1: t(data.vipBody1),
          body2: t(data.vipBody2),
          inclusions: data.vipInclusions?.map((item: any) => ({
            text: t(item.text),
            icon: item.icon,
          })),
          ctaText: t(data.vipCtaText),
          ctaSub: t(data.vipCtaSub),
        } : undefined} />
      </DarkZone>

      {/* 8. About */}
      <ScrollSection>
        <AboutSection showTeam={false} cms={data ? {
          label: t(data.aboutLabel),
          labelRight: t(data.aboutLabelRight),
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
          teamRoles: data.aboutTeam?.map((m: any) => ({
            name: m.name,
            role: t(m.role),
          })),
        } : undefined} />
      </ScrollSection>

      {/* 9. Newsletter */}
      <NewsletterInline cms={data ? {
        headline: t(data.newsletterHeadline),
        description: t(data.newsletterDescription),
        placeholder: t(data.newsletterPlaceholder),
        button: t(data.newsletterButton),
      } : undefined} />
      {/* ── EventPartner Shop ── */}
      <section className="w-full px-6 md:px-10 pt-24 md:pt-32 pb-8" style={{ background: "#EAEAED" }}>
        <div className="max-w-[1100px] mx-auto text-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/30 block mb-4">EventPartner — Shop</span>
          <h2 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-medium tracking-tight text-[#111] leading-[1.05]">
            EventPartner Shop
          </h2>
          <p className="mt-4 text-[clamp(1rem,2vw,1.2rem)] text-black/40 max-w-lg mx-auto">
            Video products, branded merchandise & everything for your next event.
          </p>
        </div>
      </section>

      {/* Logo Banner — social proof */}
      <LogoTicker cms={data ? {
        label: t(data.logoTickerLabel),
      } : undefined} />

      {/* 10. EventPartner Shop — VPP first, then Merch */}
      <ScrollSection>
        <VPPShowcase />
      </ScrollSection>

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
          label: t(data.faqLabel),
          labelRight: t(data.faqLabelRight),
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
