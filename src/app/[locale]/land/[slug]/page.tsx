import { COUNTRIES, getCountryBySlug } from "@/data/countries";
import { CountryPageClient } from "./CountryPageClient";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";

// Generate static pages for all countries with data
export function generateStaticParams() {
  return COUNTRIES.map((country) => ({
    slug: country.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const country = getCountryBySlug(slug);
  if (!country) return {};
  const sv = locale === "sv";
  const name = sv ? country.nameSv || country.name : country.name;

  return pageMetadata({
    locale,
    path: `/land/${slug}`,
    title: sv ? `Eventlokaler i ${name}` : `Event Venues in ${name}`,
    description: sv
      ? `Hitta de bästa event- och konferenslokalerna i ${name}. ${country.venues} venues tillgängliga. Skicka din förfrågan idag — helt kostnadsfritt.`
      : `Find the best event and conference venues in ${name}. ${country.venues} venues available. Submit your inquiry today — free of charge.`,
  });
}

export default async function CountryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const country = getCountryBySlug(slug);
  if (!country) notFound();

  return <CountryPageClient country={country} />;
}
