import type { Metadata } from "next";
import { Inter, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import { AdminShell } from "@/components/admin-shell";

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

export const metadata: Metadata = {
  title: "Delala Admin",
  description: "Moderation, accounts and analytics for the Delala marketplace.",
  icons: {
    icon: "/app_icon.png",
    shortcut: "/app_icon.png",
    apple: "/app_icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${serifDisplay.variable}`}>
      <body className="bg-canvas text-body antialiased">
        <AdminShell>{children}</AdminShell>
      </body>
    </html>
  );
}
