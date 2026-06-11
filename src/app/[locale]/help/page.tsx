import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DarkZone } from "@/components/ui/DarkZone";
import { HelpCenterContent } from "./HelpCenterContent";
import type { Metadata } from "next";
import { sanityFetch } from "@/../sanity/lib/live";
import { HELP_CENTER_PAGE_QUERY, HOMEPAGE_QUERY } from "@/../sanity/lib/queries";
import { localize, type Locale } from "@/../sanity/lib/locale";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const sv = locale === "sv";
  return pageMetadata({ locale, path: "/help",
    title: sv ? "Hjälpcenter" : "Help Center",
    description: sv ? "Behöver du hjälp? Kontakta EventPartners support — svar inom en arbetsdag på allt om bokningar, offerter och tjänster." : "Need help? Contact EventPartner support — replies within one business day on bookings, quotes and services." });
}

export default async function HelpCenterPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { data } = await sanityFetch({ query: HELP_CENTER_PAGE_QUERY });
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
      <HelpCenterContent cms={data ? {
        heroLabel: t(data.heroLabel),
        heroLabelRight: t(data.heroLabelRight),
        heroHeadline: t(data.heroHeadline),
        heroHeadlineAccent: t(data.heroHeadlineAccent),
        heroSubtitle: t(data.heroSubtitle),
        stats: data.stats?.map((s: any) => ({ value: s.value, label: t(s.label), icon: s.icon })),
        channelsLabel: t(data.channelsLabel),
        channelsHeadline: t(data.channelsHeadline),
        channels: data.channels?.map((c: any) => ({ title: t(c.title), desc: t(c.desc), action: c.action, href: c.href, icon: c.icon })),
        formLabel: t(data.formLabel),
        formHeadline: t(data.formHeadline),
        formDescription: t(data.formDescription),
        contactEmail: data.contactEmail,
        contactPhone: data.contactPhone,
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
