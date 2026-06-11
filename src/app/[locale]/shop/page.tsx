import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DarkZone } from "@/components/ui/DarkZone";
import { ShopPageContent } from "./ShopPageContent";
import type { Metadata } from "next";
import { sanityFetch } from "@/../sanity/lib/live";
import { HOMEPAGE_QUERY, WEBSHOP_PAGE_QUERY } from "@/../sanity/lib/queries";
import { localize, type Locale } from "@/../sanity/lib/locale";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const sv = locale === "sv";
  return pageMetadata({ locale, path: "/shop",
    title: sv ? "Shop & profilprodukter" : "Shop & Branded Merchandise",
    description: sv ? "Designa egna profilprodukter till ert event — tröjor, hoodies och mer med er logga. Begär offert, vi sköter tryck och leverans." : "Design custom branded merchandise for your event — tees, hoodies and more with your logo. Request a quote; we handle print and delivery." });
}

export default async function ShopPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const [{ data: homeData }, { data: shopData }] = await Promise.all([
    sanityFetch({ query: HOMEPAGE_QUERY }),
    sanityFetch({ query: WEBSHOP_PAGE_QUERY }),
  ]);
  const t = (field: { en?: string; sv?: string } | undefined | null) => localize(field, locale as Locale);

  return (
    <div id="page-root" style={{ backgroundColor: "#F4F4F4" }}>
      <Navbar cms={homeData ? {
        links: homeData.navLinks?.map((l: any) => ({ label: t(l.label), href: l.href })),
        cta: t(homeData.navCta),
      } : undefined} />
      <ShopPageContent cms={shopData ? {
        heroLabel: t(shopData.heroLabel),
        heroLabelRight: t(shopData.heroLabelRight),
        headline: t(shopData.headline),
        headlineAccent: t(shopData.headlineAccent),
        description: t(shopData.description),
        merchLabel: t(shopData.merchLabel),
        comingSoonTitle: t(shopData.comingSoonTitle),
        comingSoonDesc: t(shopData.comingSoonDesc),
        quoteTitle: t(shopData.quoteTitle),
        quoteButton: t(shopData.quoteButton),
        vppHeadline: t(shopData.vppHeadline),
        vppHeadlineAccent: t(shopData.vppHeadlineAccent),
        vppDescription: t(shopData.vppDescription),
        successTitle: t(shopData.successTitle),
        successDescription: t(shopData.successDescription),
        ctaHeadline: t(shopData.ctaHeadline),
        ctaDescription: t(shopData.ctaDescription),
        infoCard1Title: t(shopData.infoCard1Title),
        infoCard1Label: t(shopData.infoCard1Label),
        infoCard2Title: t(shopData.infoCard2Title),
        infoCard2Label: t(shopData.infoCard2Label),
        infoCard3Title: t(shopData.infoCard3Title),
        infoCard3Label: t(shopData.infoCard3Label),
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
            links: col.links?.map((l: any) => ({ label: t(l.label), href: l.href })),
          })),
        } : undefined} />
      </DarkZone>
    </div>
  );
}
