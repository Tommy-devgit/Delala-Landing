import { COMPANY_STORY } from "@/lib/constants";
import { Testimonials } from "@/components/testimonials";
import { FinalCTA } from "@/components/final-cta";
import type { Metadata } from "next";
import { ShieldCheck, Target, Eye, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "About Delala | Company Story & Values",
  description:
    "Learn why Delala exists, our mission to digitize Ethiopian real estate with physical verification, and our founding values.",
};

export default function AboutPage() {
  return (
    <div className="py-6">
      {/* 1. Brand Mission & Story Header */}
      <section className="py-16 sm:py-20 bg-[#FAF8F4] relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="font-mono-label text-[11px] text-[#4C061D] bg-white px-4 py-1.5 rounded-full border border-[#ECE7DA] inline-block mb-6">
            COMPANY STORY & VISION
          </span>

          <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-light text-[#4C061D] tracking-tight mb-6 leading-[0.95]">
            Building <span className="italic font-normal text-[#1c1b12]">trust</span> in Ethiopian real estate.
          </h1>

          <p className="text-base sm:text-lg text-[#736F4E] leading-relaxed max-w-2xl mx-auto font-normal">
            {COMPANY_STORY.whyExists}
          </p>
        </div>
      </section>

      {/* 2. Mission & Vision Grid (30px radius feature cards) */}
      <section className="py-16 bg-[#FAF8F4] border-t border-[#ECE7DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission Box */}
            <div className="bg-white p-8 sm:p-10 feature-card-radius border border-[#ECE7DA] shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#FAF8F4] border border-[#ECE7DA] flex items-center justify-center text-[#4C061D] mb-6">
                  <Target className="w-6 h-6" />
                </div>

                <span className="font-mono-label text-[10px] text-[#736F4E] block mb-2">
                  OUR MISSION
                </span>

                <h2 className="font-serif-display text-3xl font-light text-[#1c1b12] mb-4">
                  Digitize housing with physical verification.
                </h2>

                <p className="text-base text-[#736F4E] leading-relaxed font-normal">
                  {COMPANY_STORY.mission}
                </p>
              </div>
            </div>

            {/* Vision Box */}
            <div className="bg-[#4C061D] text-white p-8 sm:p-10 feature-card-radius border border-[#B4C292]/40 shadow-xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-[#B4C292] mb-6">
                  <Eye className="w-6 h-6" />
                </div>

                <span className="font-mono-label text-[10px] text-[#B4C292] block mb-2">
                  OUR VISION
                </span>

                <h2 className="font-serif-display text-3xl font-light text-white mb-4">
                  The trusted housing infrastructure for Ethiopia.
                </h2>

                <p className="text-base text-white/85 leading-relaxed font-normal">
                  {COMPANY_STORY.vision}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Company Core Values */}
      <section className="py-20 bg-[#FAF8F4] border-t border-[#ECE7DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="font-mono-label text-[11px] text-[#4C061D] bg-white px-3.5 py-1.5 rounded-full border border-[#ECE7DA] inline-block mb-4">
              CORE PRINCIPLES
            </span>
            <h2 className="font-serif-display text-4xl sm:text-5xl font-light text-[#1c1b12] tracking-tight">
              The values that guide every decision at Delala.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {COMPANY_STORY.values.map((v) => (
              <div
                key={v.title}
                className="bg-white p-6 sm:p-8 rounded-xl border border-[#ECE7DA] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#FAF8F4] border border-[#ECE7DA] flex items-center justify-center text-[#4C061D] mb-6">
                    <CheckCircle2 className="w-5 h-5 text-[#4C061D]" />
                  </div>

                  <h3 className="font-serif-display text-xl font-light text-[#1c1b12] mb-3">
                    {v.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#736F4E] leading-relaxed font-normal">
                    {v.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Testimonials */}
      <Testimonials />

      {/* Final CTA */}
      <FinalCTA />
    </div>
  );
}

