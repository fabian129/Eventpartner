import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DarkZone } from "@/components/ui/DarkZone";
import type { Metadata } from "next";
import { sanityFetch } from "@/../sanity/lib/live";
import { LEADERSHIP_PAGE_QUERY, HOMEPAGE_QUERY } from "@/../sanity/lib/queries";
import { localize } from "@/../sanity/lib/locale";
import { urlFor } from "@/../sanity/lib/image";
import { LeadershipContent } from "./LeadershipContent";

export const metadata: Metadata = {
  title: "Leadership — EventPartner",
  description:
    "Meet the leadership team behind EventPartner — Europe's largest event booking platform connecting enterprises with 2,400+ venues across 36 countries.",
};

const FALLBACK_TEAM = [
  { name: "Pontus Bredal-Hansen", role: "CEO & Co-founder", linkedin: "https://linkedin.com/in/pontus", image: "/Images/team/pontus.jpg" },
  { name: "Joakim", role: "Co-founder", linkedin: "https://linkedin.com/in/joakim", image: "/Images/team/joakim.jpg" },
  { name: "Malin", role: "Head of Marketing", linkedin: "https://linkedin.com/in/malin", image: "/Images/team/malin-farg.jpeg" },
];

export default async function LeadershipPage() {
  const { data } = await sanityFetch({ query: LEADERSHIP_PAGE_QUERY });
  const { data: homeData } = await sanityFetch({ query: HOMEPAGE_QUERY });
  const t = (field: { en?: string; sv?: string } | undefined | null) => localize(field);

  const headline = t(data?.headline) || "Leadership";
  const description = t(data?.description) || "Meet the team driving the future of event experiences.";
  const teamMembers = data?.teamMembers?.map((m: any) => ({
    name: m.name,
    role: t(m.role),
    linkedin: m.linkedin,
    image: m.image ? urlFor(m.image).url() : null,
  })) || FALLBACK_TEAM;

  return (
    <div id="page-root" style={{ backgroundColor: "#F4F4F4" }}>
      <Navbar cms={homeData ? {
        links: homeData.navLinks?.map((l: any) => ({ label: t(l.label), href: l.href })),
        cta: t(homeData.navCta),
      } : undefined} />
      <LeadershipContent headline={headline} description={description} teamMembers={teamMembers} />
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
