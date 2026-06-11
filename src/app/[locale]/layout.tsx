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

export const metadata: Metadata = {
  title: "EventPartner — The World's Largest Selection of Event & Conference Venues",
  description:
    "Your complete partner for enterprise event booking across 175 countries globally. 340,000+ venues, one platform, zero friction.",
  keywords: ["event venues", "conference booking", "B2B events", "Global", "venue sourcing"],
};

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
