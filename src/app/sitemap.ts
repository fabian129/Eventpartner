import type { MetadataRoute } from "next";
import { COUNTRIES } from "@/data/countries";

const BASE = "https://eventpartner.io";
const LOCALES = ["en", "sv"] as const;

const STATIC_PATHS = [
  "",
  "/shop",
  "/vip",
  "/customize",
  "/faq",
  "/about",
  "/leadership",
  "/careers",
  "/help",
  "/security",
  "/ai-assistant",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const entry = (path: string): MetadataRoute.Sitemap[number][] =>
    LOCALES.map((locale) => ({
      url: `${BASE}/${locale}${path}`,
      lastModified: now,
      alternates: {
        languages: {
          en: `${BASE}/en${path}`,
          sv: `${BASE}/sv${path}`,
        },
      },
    }));

  const staticEntries = STATIC_PATHS.flatMap(entry);
  const countryEntries = COUNTRIES.flatMap((c) => entry(`/land/${c.slug}`));

  return [...staticEntries, ...countryEntries];
}
