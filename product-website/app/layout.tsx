import type { Metadata, Viewport } from "next";
import { Manrope, Inter, DM_Serif_Display, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-[#inter]",
  display: "swap",
});

const serifDisplay = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif-display",
  display: "swap",
});

const monoLabel = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-mono-label",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Delala Product Website | Verified Homes & Real Estate Marketplace",
  description:
    "Discover physically verified apartments, villas, serviced studios, and diplomatic residences across Ethiopia. Instant search, owner chat, and legal protection.",
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
      <body className="bg-[#FAF8F4] text-[#2D2D2D] antialiased flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
