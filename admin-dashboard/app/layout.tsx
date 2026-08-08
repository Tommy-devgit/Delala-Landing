import type { Metadata } from "next";
import { Manrope, Inter, DM_Serif_Display, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import { Topbar } from "@/components/topbar";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
});

export const metadata: Metadata = {
  title: "Delala Admin Platform | Enterprise Infrastructure",
  description: "Administrative moderation, verification, and analytics platform for Delala Ethiopia.",
  icons: {
    icon: "/app_icon.png",
    shortcut: "/app_icon.png",
    apple: "/app_icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${inter.variable} ${dmSerif.variable} ${robotoMono.variable}`}
    >
      <body className="flex min-h-screen bg-[#FAF8F4] text-[#1C1B12] font-sans antialiased">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Topbar />
          <main className="p-6 md:p-8 flex-1 max-w-7xl w-full mx-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
