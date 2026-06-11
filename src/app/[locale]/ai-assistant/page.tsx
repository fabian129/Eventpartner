import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DarkZone } from "@/components/ui/DarkZone";
import { AiAssistantContent } from "./AiAssistantContent";
import type { Metadata } from "next";
import { sanityFetch } from "@/../sanity/lib/live";
import { AI_ASSISTANT_PAGE_QUERY, HOMEPAGE_QUERY } from "@/../sanity/lib/queries";
import { localize, type Locale } from "@/../sanity/lib/locale";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const sv = locale === "sv";
  return pageMetadata({ locale, path: "/ai-assistant",
    title: sv ? "AI-assistent" : "AI Assistant",
    description: sv ? "EventPartner AI identifierar, bjuder in och följer upp rätt deltagare — automatiskt. Högre närvaro och starkare ROI från varje event." : "EventPartner AI identifies, invites and follows up with the right attendees — automatically. Higher attendance and stronger ROI from every event." });
}

export default async function AiAssistantPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { data } = await sanityFetch({ query: AI_ASSISTANT_PAGE_QUERY });
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
      <AiAssistantContent />
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
