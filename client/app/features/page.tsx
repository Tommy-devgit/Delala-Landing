import { Features } from "@/components/features";
import { PopularCities } from "@/components/popular-cities";
import { FinalCTA } from "@/components/final-cta";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Features & Locations | Delala",
  description:
    "Explore Delala's verified housing features: 100% inspected homes, transparent Birr pricing, sub-city map search, and direct owner messaging.",
};

export default function FeaturesPage() {
  return (
    <div className="py-8">
      {/* Full Bento Grid Features */}
      <Features />

      {/* Regional Hubs & Popular Cities */}
      <PopularCities />

      {/* Final Download CTA */}
      <FinalCTA />
    </div>
  );
}
