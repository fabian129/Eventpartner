import { COUNTRIES, getCountryBySlug } from "@/data/countries";
import { CountryPageClient } from "./CountryPageClient";
import { notFound } from "next/navigation";

// Generate static pages for all countries with data
export function generateStaticParams() {
  return COUNTRIES.map((country) => ({
    slug: country.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const country = getCountryBySlug(slug);
  if (!country) return {};
  
  return {
    title: `Event Venues i ${country.nameSv} — EventPartner`,
    description: `Hitta de bästa event- och konferenslokalerna i ${country.nameSv}. ${country.venues} venues tillgängliga. Skicka in din förfrågan idag — kostnadsfritt.`,
  };
}

export default async function CountryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const country = getCountryBySlug(slug);
  if (!country) notFound();

  return <CountryPageClient country={country} />;
}
