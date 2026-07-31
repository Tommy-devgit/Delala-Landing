import { HowItWorks } from "@/components/how-it-works";
import { FinalCTA } from "@/components/final-cta";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How Delala Works | Delala",
  description:
    "Learn how house hunting works on Delala in 3 simple steps: Discover verified homes, connect directly with identity-checked owners, and sign legal lease agreements.",
};

export default function HowItWorksPage() {
  return (
    <div className="py-8">
      {/* 3-Step Process Breakdown */}
      <HowItWorks />

      {/* Download Action Banner */}
      <FinalCTA />
    </div>
  );
}
