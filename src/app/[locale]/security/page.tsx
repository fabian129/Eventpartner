import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DarkZone } from "@/components/ui/DarkZone";
import { SecurityPageContent } from "./SecurityPageContent";
import type { Metadata } from "next";
import { sanityFetch } from "@/../sanity/lib/live";
import { SECURITY_PAGE_QUERY, HOMEPAGE_QUERY } from "@/../sanity/lib/queries";
import { localize, type Locale } from "@/../sanity/lib/locale";

export const metadata: Metadata = {
  title: "Security & Compliance — EventPartner",
  description:
    "Learn about EventPartner's security practices, GDPR compliance, data protection policies, and commitment to keeping your event data safe across all 36 European markets.",
};

export default async function SecurityPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { data } = await sanityFetch({ query: SECURITY_PAGE_QUERY });
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
      <SecurityPageContent cms={data ? {
        heroLabel: t(data.heroLabel),
        heroLabelRight: t(data.heroLabelRight),
        heroBadge: t(data.heroBadge),
        heroHeadline: t(data.heroHeadline),
        heroHeadlineAccent: t(data.heroHeadlineAccent),
        heroSubtitle: t(data.heroSubtitle),
        pillarsLabel: t(data.pillarsLabel),
        pillarsHeadline: t(data.pillarsHeadline),
        pillarsHeadlineAccent: t(data.pillarsHeadlineAccent),
        pillarCards: data.pillarCards?.map((p: any) => ({
          title: t(p.title),
          description: t(p.description),
          icon: p.icon,
        })),
        complianceLabel: t(data.complianceLabel),
        complianceHeadline: t(data.complianceHeadline),
        complianceHeadlineAccent: t(data.complianceHeadlineAccent),
        complianceSections: data.complianceSections?.map((s: any) => ({
          category: t(s.category),
          items: s.items?.map((item: any) => t(item)),
        })),
        rightsLabel: t(data.rightsLabel),
        rightsHeadline: t(data.rightsHeadline),
        rightsHeadlineAccent: t(data.rightsHeadlineAccent),
        rightsIntro: t(data.rightsIntro),
        rightsList: data.rightsList?.map((r: any) => ({
          right: t(r.right),
          desc: t(r.description),
        })),
        dpoTitle: t(data.dpoTitle),
        dpoSubtitle: t(data.dpoSubtitle),
        dpoDescription: t(data.dpoDescription),
        dpoEmail: data.dpoEmail,
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
