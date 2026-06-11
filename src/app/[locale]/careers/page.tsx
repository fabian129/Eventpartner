import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DarkZone } from "@/components/ui/DarkZone";
import { CareersContent } from "./CareersContent";
import type { Metadata } from "next";
import { sanityFetch } from "@/../sanity/lib/live";
import { CAREERS_PAGE_QUERY, HOMEPAGE_QUERY } from "@/../sanity/lib/queries";
import { localize, type Locale } from "@/../sanity/lib/locale";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const sv = locale === "sv";
  return pageMetadata({ locale, path: "/careers",
    title: sv ? "Karriär" : "Careers",
    description: sv ? "Bygg framtidens event med oss. Se lediga roller eller skicka en spontanansökan — vi är alltid intresserade av exceptionell talang." : "Build the future of events with us. See open roles or send an open application — we are always interested in exceptional talent." });
}

export default async function CareersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { data } = await sanityFetch({ query: CAREERS_PAGE_QUERY });
  const { data: homeData } = await sanityFetch({ query: HOMEPAGE_QUERY });
  const t = (field: { en?: string; sv?: string } | undefined | null) => localize(field, locale as Locale);

  return (
    <div id="page-root" style={{ backgroundColor: "#F4F4F4" }}>
      <Navbar cms={homeData ? {
        links: homeData.navLinks?.map((l: any) => ({ label: t(l.label), href: l.href })),
        cta: t(homeData.navCta),
      } : undefined} />
      <CareersContent cms={data ? {
        heroLabel: t(data.heroLabel),
        heroLabelRight: t(data.heroLabelRight),
        headline: t(data.headline),
        description: t(data.description),
        perks: data.perks?.map((p: any) => ({ title: t(p.title), desc: t(p.desc), icon: p.icon })),
        openApplicationTitle: t(data.openApplicationTitle),
        openApplicationDesc: t(data.openApplicationDesc),
        formHeadline: t(data.formHeadline),
        successTitle: t(data.successTitle),
        successDesc: t(data.successDesc),
        ctaHeadline: t(data.ctaHeadline),
        ctaDescription: t(data.ctaDescription),
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
