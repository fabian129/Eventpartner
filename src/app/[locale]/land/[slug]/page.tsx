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
    title: `Event Venues in ${country.name} — EventPartner`,
    description: `Find the best event and conference venues in ${country.name}. ${country.venues} venues available. Submit your inquiry today — free of charge.`,
  };
}

export default async function CountryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const country = getCountryBySlug(slug);
  if (!country) notFound();

  return <CountryPageClient country={country} />;
}
