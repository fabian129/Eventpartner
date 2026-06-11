import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DarkZone } from "@/components/ui/DarkZone";
import { CustomizeFormContent } from "./CustomizeFormContent";
import type { Metadata } from "next";
import { sanityFetch } from "@/../sanity/lib/live";
import { CUSTOMIZE_PAGE_QUERY, HOMEPAGE_QUERY } from "@/../sanity/lib/queries";
import { localize, type Locale } from "@/../sanity/lib/locale";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const sv = locale === "sv";
  return pageMetadata({ locale, path: "/customize",
    title: sv ? "Skräddarsy ert event" : "Customize Your Event",
    description: sv ? "Berätta allt om ert event — lokalkrav, catering, aktiviteter och boende — så återkommer vi med skräddarsydda förslag inom 24 timmar." : "Tell us everything about your event — venue needs, catering, activities and accommodation — and get tailored proposals within 24 hours." });
}

export default async function CustomizePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { data } = await sanityFetch({ query: CUSTOMIZE_PAGE_QUERY });
  const { data: homeData } = await sanityFetch({ query: HOMEPAGE_QUERY });
  const t = (field: { en?: string; sv?: string } | undefined | null) => localize(field, locale as Locale);

  return (
    <div id="page-root" style={{ backgroundColor: "#EAEAED" }}>
      <Navbar cms={homeData ? {
        links: homeData.navLinks?.map((l: any) => ({ label: t(l.label), href: l.href })),
        cta: t(homeData.navCta),
      } : undefined} />
      <CustomizeFormContent cms={data ? {
        heroLabel: t(data.heroLabel),
        heroLabelRight: t(data.heroLabelRight),
        heroHeadline: t(data.heroHeadline),
        heroHeadlineAccent: t(data.heroHeadlineAccent),
        heroDescription: t(data.heroDescription),
        submitButton: t(data.submitButton),
        successMessage: t(data.successMessage),
        disclaimer: t(data.disclaimer),
        backLink: t(data.backLink),
        contactTitle: t(data.contactTitle),
        contactSubtitle: t(data.contactSubtitle),
        eventTitle: t(data.eventTitle),
        eventSubtitle: t(data.eventSubtitle),
        venueTitle: t(data.venueTitle),
        venueSubtitle: t(data.venueSubtitle),
        cateringTitle: t(data.cateringTitle),
        cateringSubtitle: t(data.cateringSubtitle),
        activitiesTitle: t(data.activitiesTitle),
        activitiesSubtitle: t(data.activitiesSubtitle),
        anythingElseTitle: t(data.anythingElseTitle),
        anythingElseSubtitle: t(data.anythingElseSubtitle),
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
