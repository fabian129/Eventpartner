import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/utils/ThemeProvider";
import { VisualEditing } from "next-sanity/visual-editing";
import { draftMode } from "next/headers";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { SmoothScroll } from "@/components/utils/SmoothScroll";
import { SidebarNav } from "@/components/layout/SidebarNav";
import { ShopProvider } from "@/components/shop/ShopProvider";
import { Analytics } from "@vercel/analytics/react";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const sv = locale === "sv";
  const title = sv
    ? "EventPartner — Allt ditt event behöver. En partner."
    : "EventPartner — Everything Your Event Needs. One Partner.";
  const description = sv
    ? "Er kompletta partner för företagsevent i 175 länder. 340 000+ venues, en plattform — lokaler, leverantörer och förhandling, hanterat från start till mål."
    : "Your complete partner for corporate events across 175 countries. 340,000+ venues, one platform — sourcing, suppliers and negotiation handled end to end.";
  return {
    metadataBase: new URL("https://eventpartner.io"),
    title: { default: title, template: "%s — EventPartner" },
    description,
    keywords: sv
      ? ["eventlokaler", "konferensbokning", "företagsevent", "venue sourcing", "eventpartner"]
      : ["event venues", "conference booking", "corporate events", "venue sourcing", "event partner"],
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    },
    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", sv: "/sv", "x-default": "/en" },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}`,
      siteName: "EventPartner",
      type: "website",
      locale: sv ? "sv_SE" : "en_US",
    },
    twitter: { card: "summary_large_image", title, description },
    icons: {
      icon: [{ url: "/icon.png", type: "image/png", sizes: "512x512" }],
      apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();
  const isDraftMode = (await draftMode()).isEnabled;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} ${playfair.variable} font-sans antialiased overflow-x-hidden`}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <ShopProvider>
              <SidebarNav />
              <SmoothScroll>
                {children}
              </SmoothScroll>
            </ShopProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
        {isDraftMode && <VisualEditing />}
        <Analytics />
      </body>
    </html>
  );
}
