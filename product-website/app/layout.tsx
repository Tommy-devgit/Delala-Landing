import type { Metadata, Viewport } from "next";
import { Manrope, Inter, DM_Serif_Display, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MobileNav } from "@/components/mobile-nav";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const serifDisplay = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif-display",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

const monoLabel = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-mono-label",
  display: "swap",
  fallback: ["monospace"],
});

export const metadata: Metadata = {
  title: "Delala Product Website | Verified Homes & Real Estate Marketplace",
  description:
    "Discover physically verified apartments, villas, serviced studios, and diplomatic residences across Ethiopia. Instant search, owner chat, and legal protection.",
  icons: {
    icon: "/app_icon.png",
    shortcut: "/app_icon.png",
    apple: "/app_icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#4C061D",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${inter.variable} ${serifDisplay.variable} ${monoLabel.variable} scroll-smooth`}
    >
      {/*
       * `pb-[4.5rem]` below `md` reserves the height of `MobileNav`, which is
       * `fixed bottom-0`. Without it the bar floats over the end of the page —
       * covering the footer on every route, and the last row of any list.
       * Removed at `md`, where the bar is hidden.
       */}
      <body className="bg-canvas text-body antialiased flex flex-col min-h-screen pb-[4.5rem] md:pb-0">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileNav />
      </body>
    </html>
  );
}
