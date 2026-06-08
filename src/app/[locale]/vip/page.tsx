import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DarkZone } from "@/components/ui/DarkZone";
import { VIPPageContent } from "./VIPPageContent";
import type { Metadata } from "next";
import { sanityFetch } from "@/../sanity/lib/live";
import { VIP_PAGE_QUERY, HOMEPAGE_QUERY } from "@/../sanity/lib/queries";
import { localize, type Locale } from "@/../sanity/lib/locale";

export const metadata: Metadata = {
  title: "Become a VIP — EventPartner",
  description:
    "Join EventPartner's VIP programme for priority access, exclusive pricing, dedicated account management, and premium venue options across 175 countries.",
};

export default async function VIPPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { data } = await sanityFetch({ query: VIP_PAGE_QUERY });
  const { data: homeData } = await sanityFetch({ query: HOMEPAGE_QUERY });

  const t = (field: { en?: string; sv?: string } | undefined | null) =>
    localize(field, locale as Locale);

  return (
    <div id="page-root" style={{ backgroundColor: "#F4F4F4" }}>
      <Navbar cms={homeData ? {
        links: homeData.navLinks?.map((l: any) => ({
          label: t(l.label),
          href: l.href,
        })),
        cta: t(homeData.navCta),
      } : undefined} />
      <VIPPageContent cms={data ? {
        heroLabel: t(data.heroLabel),
        heroLabelRight: t(data.heroLabelRight),
        heroHeadline: t(data.heroHeadline),
        heroHeadlineAccent: t(data.heroHeadlineAccent),
        heroStats: data.heroStats?.map((s: any) => ({
          value: s.value,
          label: t(s.label),
        })),
        heroAnchorText: t(data.heroAnchorText),
        heroIntroText: t(data.heroIntroText),
        videoLabel: t(data.videoLabel),
        videoText: t(data.videoText),
        manifestoLabel: t(data.manifestoLabel),
        manifestoHeadline: t(data.manifestoHeadline),
        manifestoHeadlineAccent: t(data.manifestoHeadlineAccent),
        manifestoQuote: t(data.manifestoQuote),
        manifestoBody1: t(data.manifestoBody1),
        manifestoBody2: t(data.manifestoBody2),
        manifestoMotto: t(data.manifestoMotto),
        manifestoStats: data.manifestoStats?.map((s: any) => ({
          value: s.value,
          label: t(s.label),
        })),
        tiersLabel: t(data.tiersLabel),
        tiersLabelRight: t(data.tiersLabelRight),
        tiersHeadline: t(data.tiersHeadline),
        tiersDescription: t(data.tiersDescription),
        tierCards: data.tierCards?.map((tier: any) => ({
          name: t(tier.name),
          badge: t(tier.badge),
          price: t(tier.price),
          priceSub: t(tier.priceSub),
          features: tier.features?.map((f: any) => t(f)),
          cta: t(tier.cta),
          highlight: tier.highlight,
        })),
        stepsLabel: t(data.stepsLabel),
        stepsLabelRight: t(data.stepsLabelRight),
        stepsHeadline: t(data.stepsHeadline),
        steps: data.steps?.map((s: any) => ({
          step: s.step,
          title: t(s.title),
          desc: t(s.description),
        })),
        ctaCard1Title: t(data.ctaCard1Title),
        ctaCard1Desc: t(data.ctaCard1Desc),
        ctaCard2Title: t(data.ctaCard2Title),
        ctaCard2Headline: t(data.ctaCard2Headline),
        ctaCard2Sub: t(data.ctaCard2Sub),
      } : undefined} />
      <DarkZone exitToLight={false}>
        <Footer cms={homeData ? {
          brandDesc: t(homeData.footerBrandDesc),
          socialLabel: t(homeData.footerSocialLabel),
          newsletterDesc: t(homeData.footerNewsletterDesc),
          ctaTitle: t(homeData.footerCtaTitle),
          ctaDesc: t(homeData.footerCtaDesc),
          columns: homeData.footerColumns?.map((col: any) => ({
            title: t(col.title),
            links: col.links?.map((l: any) => ({
              label: t(l.label),
              href: l.href,
            })),
          })),
        } : undefined} />
      </DarkZone>
    </div>
  );
}
