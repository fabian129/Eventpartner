import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DarkZone } from "@/components/ui/DarkZone";
import type { Metadata } from "next";
import { sanityFetch } from "@/../sanity/lib/live";
import { LEADERSHIP_PAGE_QUERY, HOMEPAGE_QUERY } from "@/../sanity/lib/queries";
import { localize, type Locale } from "@/../sanity/lib/locale";
import { TEAM_MEMBERS } from "@/lib/teamMembers";
import { LeadershipContent } from "./LeadershipContent";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const sv = locale === "sv";
  return pageMetadata({ locale, path: "/leadership",
    title: sv ? "Ledning & team" : "Leadership & Team",
    description: sv ? "Möt teamet bakom EventPartner — decenniers samlad erfarenhet inom event, möten, försäljning, AI och teknik." : "Meet the team behind EventPartner — decades of combined experience in events, meetings, sales, AI and technology." });
}

export default async function LeadershipPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { data } = await sanityFetch({ query: LEADERSHIP_PAGE_QUERY });
  const { data: homeData } = await sanityFetch({ query: HOMEPAGE_QUERY });
  const t = (field: { en?: string; sv?: string } | undefined | null) => localize(field, locale as Locale);

  const headline = t(data?.headline) || "Leadership";
  const description = t(data?.description) || "Meet the team driving the future of event experiences.";
  const teamMembers = TEAM_MEMBERS.map((m) => ({
    name: m.name,
    role: m.role,
    linkedin: m.linkedin,
    image: m.image,
  }));

  return (
    <div id="page-root" style={{ backgroundColor: "#F4F4F4" }}>
      <Navbar cms={homeData ? {
        links: homeData.navLinks?.map((l: any) => ({ label: t(l.label), href: l.href })),
        cta: t(homeData.navCta),
      } : undefined} />
      <LeadershipContent
        headline={headline}
        description={description}
        teamMembers={teamMembers}
        sectionLabel={t(data?.sectionLabel) || undefined}
        sectionLabelRight={t(data?.sectionLabelRight) || undefined}
        ctaHeadline={t(data?.ctaHeadline) || undefined}
        ctaDescription={t(data?.ctaDescription) || undefined}
      />
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
