import type { Metadata } from "next";

/**
 * SEO helper — single source of truth for canonical/hreflang/OG metadata.
 * Per wb-seo method: canonical on every indexable page, hreflang for en/sv,
 * OG 1200x630 (auto-generated via [locale]/opengraph-image.tsx), twitter card.
 */

export const SITE_URL = "https://eventpartner.io";
export const SITE_NAME = "EventPartner";
export const LOCALES = ["en", "sv"] as const;

export function pageMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: string;
  /** Path WITHOUT locale prefix, e.g. "/shop" or "" for the homepage. */
  path: string;
  title: string;
  description: string;
}): Metadata {
  const url = `/${locale}${path}`;
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: `/en${path}`,
        sv: `/sv${path}`,
        "x-default": `/en${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: locale === "sv" ? "sv_SE" : "en_US",
      alternateLocale: locale === "sv" ? "en_US" : "sv_SE",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
