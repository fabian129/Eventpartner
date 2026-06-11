import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DarkZone } from "@/components/ui/DarkZone";
import { FaqPageContent } from "./FaqPageContent";
import type { Metadata } from "next";
import { sanityFetch } from "@/../sanity/lib/live";
import { FAQ_PAGE_QUERY, HOMEPAGE_QUERY } from "@/../sanity/lib/queries";
import { localize, type Locale } from "@/../sanity/lib/locale";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const sv = locale === "sv";
  return pageMetadata({ locale, path: "/faq",
    title: sv ? "Vanliga frågor" : "FAQ",
    description: sv ? "Svar på vanliga frågor om EventPartner — kostnad, svarstid, 340 000+ venues i 175 länder och hur bokningsprocessen fungerar." : "Answers to common questions about EventPartner — pricing, response times, 340,000+ venues across 175 countries and how booking works." });
}

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { data } = await sanityFetch({ query: FAQ_PAGE_QUERY });
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
      <FaqPageContent cms={data ? {
        heroLabel: t(data.headline),
        heroLabelRight: t(data.heroLabelRight),
        heroHeadline: t(data.heroHeadline),
        heroHeadlineAccent: t(data.heroHeadlineAccent),
        heroSubtitle: t(data.description),
        faqs: data.faqs?.map((faq: any) => ({
          question: t(faq.question),
          answer: t(faq.answer),
        })),
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
