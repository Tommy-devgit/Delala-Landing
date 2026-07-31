"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Hero } from "@/components/hero";
import { SocialProof } from "@/components/social-proof";
import { AppShowcase } from "@/components/app-showcase";
import { FinalCTA } from "@/components/final-cta";
import {
  STORY_SECTIONS,
  TWO_SIDED_BENEFITS,
  POPULAR_CITIES,
} from "@/lib/constants";
import {
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  Building2,
  Users,
  CheckCircle2,
  MapPin,
  Building,
} from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-0">
      {/* 1. Editorial Hero Section using Home Away From Home image */}
      <Hero />

      {/* 2. Trust Statistics Counter */}
      <SocialProof />

      {/* 3. Deep Problem vs Solution Storytelling Section */}
      <section className="py-20 lg:py-28 bg-[#FAF8F4] border-t border-[#ECE7DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Problem Framing Box */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
            <div className="lg:col-span-6">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 text-rose-700 text-xs font-extrabold mb-4 border border-rose-200">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>{STORY_SECTIONS.problem.tag}</span>
              </span>

              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1c1b12] tracking-tight mb-6 leading-tight">
                {STORY_SECTIONS.problem.title}
              </h2>

              <div className="space-y-4 text-base text-[#2D2D2D]/85 leading-relaxed font-normal">
                {STORY_SECTIONS.problem.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-white p-8 rounded-xl border border-[#ECE7DA] shadow-xs">
                <h3 className="font-heading text-xl font-bold text-[#1c1b12] mb-6 border-b border-[#ECE7DA] pb-4">
                  The Old Way vs The Delala Way
                </h3>

                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-rose-50/60 border border-rose-100 flex items-start gap-3">
                    <span className="text-rose-600 font-bold text-xs shrink-0 mt-0.5">OLD</span>
                    <p className="text-xs sm:text-sm text-rose-900 font-medium">
                      Unverified Telegram posts, fake property photos, and upfront cash requested just to talk.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-[#FAF8F4] border border-[#B4C292]/50 flex items-start gap-3">
                    <span className="text-[#4C061D] font-extrabold text-xs shrink-0 mt-0.5">DELALA</span>
                    <p className="text-xs sm:text-sm text-[#4C061D] font-bold">
                      100% physically inspected properties, clear Birr prices, and direct owner contacts.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Solution Framing Box */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-[#4C061D] text-white p-8 sm:p-12 lg:p-16 rounded-xl shadow-xl">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#B4C292] text-xs font-extrabold mb-4 border border-white/15">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{STORY_SECTIONS.solution.tag}</span>
              </span>

              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight">
                {STORY_SECTIONS.solution.title}
              </h2>

              <div className="space-y-4 text-base text-white/85 leading-relaxed font-normal mb-8">
                {STORY_SECTIONS.solution.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#B4C292] text-[#4C061D] font-extrabold text-sm hover:bg-white transition-colors"
              >
                <span>Read Company Story</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="rounded-lg overflow-hidden border border-white/20 shadow-2xl">
                <img
                  src="/images/city_addis_ababa.png"
                  alt="Addis Ababa Real Estate"
                  className="w-full h-72 object-cover"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Two-Sided Marketplace Value Proposition */}
      <section className="py-20 lg:py-28 bg-[#FAF8F4] border-t border-[#ECE7DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="px-3.5 py-1.5 rounded-full bg-[#B4C292]/30 text-[#4C061D] text-xs font-extrabold border border-[#B4C292]/50 inline-block mb-4">
              Two-Sided Marketplace
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1c1b12] tracking-tight mb-4">
              Built for house hunters and property sharers alike.
            </h2>
            <p className="text-base sm:text-lg text-[#2D2D2D]/80 font-normal">
              Delala succeeds because both sides benefit from complete trust, physical verification, and digital efficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Seekers Card */}
            <div className="bg-white p-8 sm:p-10 rounded-xl border border-[#ECE7DA] shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-lg bg-[#FAF8F4] border border-[#ECE7DA] flex items-center justify-center text-[#4C061D]">
                    <Users className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-[#4C061D] bg-[#B4C292]/30 px-3 py-1 rounded-full border border-[#B4C292]/40">
                    {TWO_SIDED_BENEFITS.seekers.badge}
                  </span>
                </div>

                <h3 className="font-heading text-2xl font-bold text-[#1c1b12] mb-6">
                  {TWO_SIDED_BENEFITS.seekers.title}
                </h3>

                <div className="space-y-4 mb-8">
                  {TWO_SIDED_BENEFITS.seekers.benefits.map((b) => (
                    <div key={b.title} className="p-4 rounded-lg bg-[#FAF8F4] border border-[#ECE7DA]">
                      <div className="flex items-center gap-2 font-bold text-sm text-[#4C061D] mb-1">
                        <CheckCircle2 className="w-4 h-4 text-[#4C061D]" />
                        <span>{b.title}</span>
                      </div>
                      <p className="text-xs text-[#2D2D2D]/80 font-normal pl-6">
                        {b.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/download"
                className="inline-flex items-center justify-center w-full py-3 rounded-full bg-[#4C061D] text-white font-bold text-xs sm:text-sm hover:bg-[#3B3923] transition-colors"
              >
                <span>Find Your Next Home</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </div>

            {/* Sharers Card */}
            <div className="bg-white p-8 sm:p-10 rounded-xl border border-[#ECE7DA] shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-lg bg-[#FAF8F4] border border-[#ECE7DA] flex items-center justify-center text-[#4C061D]">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-[#3B3923] bg-[#FAF8F4] px-3 py-1 rounded-full border border-[#ECE7DA]">
                    {TWO_SIDED_BENEFITS.sharers.badge}
                  </span>
                </div>

                <h3 className="font-heading text-2xl font-bold text-[#1c1b12] mb-6">
                  {TWO_SIDED_BENEFITS.sharers.title}
                </h3>

                <div className="space-y-4 mb-8">
                  {TWO_SIDED_BENEFITS.sharers.benefits.map((b) => (
                    <div key={b.title} className="p-4 rounded-lg bg-[#FAF8F4] border border-[#ECE7DA]">
                      <div className="flex items-center gap-2 font-bold text-sm text-[#3B3923] mb-1">
                        <CheckCircle2 className="w-4 h-4 text-[#4C061D]" />
                        <span>{b.title}</span>
                      </div>
                      <p className="text-xs text-[#2D2D2D]/80 font-normal pl-6">
                        {b.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/download"
                className="inline-flex items-center justify-center w-full py-3 rounded-full bg-[#3B3923] text-white font-bold text-xs sm:text-sm hover:bg-[#4C061D] transition-colors"
              >
                <span>List Your Property</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Mobile App Showcase */}
      <AppShowcase />

      {/* 6. Popular Cities Regional Grid */}
      <section id="cities" className="py-20 lg:py-28 bg-[#FAF8F4] relative border-t border-[#ECE7DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B4C292]/30 text-[#4C061D] text-xs font-extrabold mb-4 border border-[#B4C292]/50">
                <MapPin className="w-3.5 h-3.5" />
                <span>Regional Coverage</span>
              </span>

              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#4C061D] tracking-tight mb-4 leading-tight">
                Explore verified homes across Ethiopia.
              </h2>

              <p className="text-base sm:text-lg text-[#2D2D2D]/80 font-normal leading-relaxed">
                From diplomatic neighborhoods in Addis Ababa to lakeside residences in Hawassa and tech corridors in Adama.
              </p>
            </div>

            <Link
              href="/features"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#4C061D] text-white font-bold text-sm hover:bg-[#3B3923] transition-colors shrink-0 group"
            >
              <span>Explore All Hubs</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {POPULAR_CITIES.map((city) => (
              <div
                key={city.name}
                className="group relative bg-white rounded-lg overflow-hidden border border-[#ECE7DA] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <img
                    src={city.image}
                    alt={`Delala verified homes in ${city.name}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1c1b12]/90 via-[#1c1b12]/20 to-transparent" />

                  <div className="absolute bottom-4 left-5 right-5 z-10 text-white">
                    <h3 className="font-heading text-2xl font-extrabold tracking-tight mb-1">
                      {city.name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-[#B4C292] font-semibold">
                      <Building className="w-3.5 h-3.5" />
                      <span>{city.propertiesCount}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 flex flex-col justify-between flex-1 bg-white">
                  <div>
                    <div className="text-[11px] font-extrabold text-[#736F4E] mb-2.5 uppercase tracking-wider">
                      Popular Neighborhoods
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {city.popularAreas.map((area) => (
                        <span
                          key={area}
                          className="px-2.5 py-1 rounded-md bg-[#FAF8F4] text-[#2D2D2D] text-xs font-semibold border border-[#ECE7DA]"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#ECE7DA] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#736F4E] block">Starting Rent</span>
                      <span className="text-sm font-black text-[#4C061D]">
                        {city.startingPrice}
                      </span>
                    </div>
                    <Link
                      href="/download"
                      className="p-3 rounded-full bg-[#FAF8F4] text-[#4C061D] border border-[#ECE7DA] group-hover:bg-[#4C061D] group-hover:text-white group-hover:border-[#4C061D] transition-colors"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Final Conversion CTA */}
      <FinalCTA />
    </div>
  );
}
