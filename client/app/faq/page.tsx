import { FAQ } from "@/components/faq";
import { FinalCTA } from "@/components/final-cta";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Delala",
  description:
    "Find answers to common questions about searching for homes, listing properties, physical verification, and lease protection on Delala.",
};

export default function FAQPage() {
  return (
    <div className="py-8">
      {/* FAQ Accordion Component */}
      <FAQ />

      {/* Download Action Banner */}
      <FinalCTA />
    </div>
  );
}
