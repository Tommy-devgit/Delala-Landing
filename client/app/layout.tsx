import type { Metadata, Viewport } from "next";
import { Manrope, Inter, DM_Serif_Display, Roboto_Mono } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const dmSerifDisplay = DM_Serif_Display({
  weight: "400",
  variable: "--font-serif-display",
  subsets: ["latin"],
  display: "swap",
});

const robotoMono = Roboto_Mono({
  variable: "--font-mono-label",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#4C061D",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Delala | The Modern Way Ethiopians Find Homes",
  description:
    "Delala is Ethiopia's digital housing platform. Browse 100% physically verified homes, connect with ID-checked brokers, and find your next apartment in Addis Ababa, Hawassa, Adama & beyond.",
  keywords: [
    "Delala",
    "Ethiopia Real Estate",
    "Addis Ababa Apartments for Rent",
    "Ethiopian House Hunting",
    "Verified Brokers Ethiopia",
    "Rent House Addis Ababa",
    "Bole Apartments",
    "Ethiopian Tech Startup",
  ],
  authors: [{ name: "Delala Technologies Inc." }],
  openGraph: {
    title: "Delala | The Modern Way Ethiopians Find Homes",
    description:
      "Find verified homes across Ethiopia without middleman fraud. Clean Birr pricing, ID-checked brokers, and direct owner contacts.",
    url: "https://delala.et",
    siteName: "Delala",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/hero_property.png",
        width: 1200,
        height: 630,
        alt: "Delala Property in Addis Ababa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Delala | Verified Ethiopian Housing Platform",
    description:
      "Browse physically inspected homes across Addis Ababa and regional hubs.",
    images: ["/images/hero_property.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Delala",
    operatingSystem: "iOS, Android",
    applicationCategory: "RealEstateApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "ETB",
    },
    description:
      "Ethiopia's digital housing platform connecting home seekers with verified property owners and certified brokers.",
    author: {
      "@type": "Organization",
      name: "Delala Technologies Inc.",
      url: "https://delala.et",
    },
  };

  return (
    <html
      lang="en"
      className={`${manrope.variable} ${inter.variable} ${dmSerifDisplay.variable} ${robotoMono.variable} scroll-smooth antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#FAF8F4] text-[#2D2D2D] font-sans selection:bg-[#B4C292]/30 selection:text-[#4C061D]">
        {/* Accessibility Skip Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#4C061D] focus:text-white focus:rounded-xl focus:shadow-xl focus:outline-none"
        >
          Skip to main content
        </a>

        {/* Shared Top Navbar */}
        <Navbar />

        {/* Dynamic Route Content */}
        <main id="main-content" className="flex-grow pt-24 sm:pt-28">
          {children}
        </main>

        {/* Shared Footer */}
        <Footer />
      </body>
    </html>
  );
}
