import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/utils/ThemeProvider";

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
    "Your complete partner for enterprise event booking across 36 European countries. 10,000+ venues, one platform, zero friction.",
  keywords: ["event venues", "conference booking", "B2B events", "Europe", "venue sourcing"],
};

import { SmoothScroll } from "@/components/utils/SmoothScroll";
import { SidebarNav } from "@/components/layout/SidebarNav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} ${playfair.variable} font-sans antialiased overflow-x-hidden`}
      >
        <ThemeProvider>
          <SidebarNav />
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
