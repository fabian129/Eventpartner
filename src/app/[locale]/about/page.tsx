import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DarkZone } from "@/components/ui/DarkZone";
import { AboutPageContent } from "./AboutPageContent";
import type { Metadata } from "next";
import { sanityFetch } from "@/../sanity/lib/live";
import { ABOUT_PAGE_QUERY, HOMEPAGE_QUERY } from "@/../sanity/lib/queries";
import { localize, type Locale } from "@/../sanity/lib/locale";


export const metadata: Metadata = {
  title: "About Us — EventPartner",
  description:
    "Meet the team behind the world's largest event booking platform. Learn about our mission, values, and the people making corporate events seamless across 175 countries.",
};

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { data } = await sanityFetch({ query: ABOUT_PAGE_QUERY });
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
      <AboutPageContent cms={data ? {
        heroLabel: t(data.heroLabel),
        heroLabelRight: t(data.heroLabelRight),
        heroHeadline: t(data.heroHeadline),
        heroHeadlineAccent: t(data.heroHeadlineAccent),
        heroHeadlineLine3: t(data.heroHeadlineLine3),
        heroSubtitle: t(data.heroSubtitle),
        stats: data.stats?.map((s: any) => ({
          value: s.value,
          label: t(s.label),
        })),
        storyLabel: t(data.storyLabel),
        storyHeadline: t(data.storyHeadline),
        storyHeadlineAccent: t(data.storyHeadlineAccent),
        storyQuote: t(data.storyQuote),
        storyBody1: t(data.storyBody1),
        storyBody2: t(data.storyBody2),
        valuesLabel: t(data.valuesLabel),
        valuesHeadline: t(data.valuesHeadline),
        valuesHeadlineAccent: t(data.valuesHeadlineAccent),
        valueCards: data.valueCards?.map((v: any) => ({
          title: t(v.title),
          description: t(v.description),
          icon: v.icon,
        })),
        teamLabel: t(data.teamLabel),
        teamIntro: t(data.teamIntro),
        ctaHeadline: t(data.ctaHeadline),
        ctaDescription: t(data.ctaDescription),
        teamRoles: data.teamMembers?.map((m: any) => ({
          name: m.name,
          role: t(m.role),
        })),
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
