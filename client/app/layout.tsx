import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Delala (ደላላ) | The Modern Way Ethiopians Find Homes",
  description:
    "Browse verified homes, trusted brokers, and luxury apartments across Addis Ababa, Hawassa, Adama, Bahir Dar, and Ethiopia—all in one place.",
  keywords: [
    "Delala",
    "Ethiopia Real Estate",
    "Addis Ababa Apartments",
    "Ethiopian Homes",
    "Verified Brokers Ethiopia",
    "House Hunting Ethiopia",
    "ደላላ",
  ],
  authors: [{ name: "Delala Technologies" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${inter.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-[#FAF8F4] text-[#2D2D2D] font-sans selection:bg-[#B4C292]/30 selection:text-[#4C061D]">
        {children}
      </body>
    </html>
  );
}

