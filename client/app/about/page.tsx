import { WhyDelala } from "@/components/why-delala";
import { Testimonials } from "@/components/testimonials";
import { FinalCTA } from "@/components/final-cta";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Delala (ደላላ) | Building Trust in Ethiopian Real Estate",
  description:
    "Delala (ደላላ) is digitizing house hunting across Ethiopia by replacing Telegram chaos and middleman fraud with physically verified homes and transparent Birr pricing.",
};

export default function AboutPage() {
  return (
    <div className="py-8">
      {/* Brand Mission & Story Banner */}
      <section className="py-16 bg-[#FAF8F4] relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="px-3.5 py-1.5 rounded-full bg-[#B4C292]/30 text-[#4C061D] font-extrabold text-xs border border-[#B4C292]/50 inline-block mb-6">
            About Delala (ደላላ)
          </span>

          <h1 className="font-heading text-4xl sm:text-5xl font-black text-[#1c1b12] tracking-tight mb-6">
            Digitizing the Ethiopian home search experience.
          </h1>

          <p className="text-base sm:text-lg text-[#2D2D2D]/80 leading-relaxed max-w-2xl mx-auto font-normal">
            Finding a home to rent or buy in Ethiopia has historically been frustrating, chaotic, and risky. Delala was built to establish physical trust, transparent pricing, and seamless digital connections between home seekers and verified owners.
          </p>
        </div>
      </section>

      {/* Traditional vs Delala Standard */}
      <WhyDelala />

      {/* Community Voices & Testimonials */}
      <Testimonials />

      {/* Download CTA */}
      <FinalCTA />
    </div>
  );
}
