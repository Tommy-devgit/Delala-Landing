import { AppShowcase } from "@/components/app-showcase";
import { FinalCTA } from "@/components/final-cta";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Download Delala App | Mobile Housing Marketplace",
  description:
    "Download the free Delala mobile app for iOS and Android. Search verified homes across Addis Ababa and Ethiopia, chat with owners, and receive instant rent alerts.",
};

export default function DownloadPage() {
  return (
    <div className="py-8">
      {/* Mobile App Showcase */}
      <AppShowcase />

      {/* Grand Download CTA Banner */}
      <FinalCTA />
    </div>
  );
}
