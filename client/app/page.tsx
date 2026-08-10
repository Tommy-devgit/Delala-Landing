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
  Check,
  Compass,
  FileCheck,
  Banknote,
  Search,
} from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-0">
      {/* 1. Hero Section with AI Search Bar & Display Headline */}
      <Hero />

      {/* 2. Trust Counter Statistics */}
      <SocialProof />

      {/* 3. CHROMATIC FEATURE CATEGORY TILES (3-COLUMN GRID, 30PX RADIUS - FROM DESIGN.MD) */}
      <section className="py-20 lg:py-28 bg-[#FAF8F4] relative border-t border-[#ECE7DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Eyebrow & Display Headline */}
          <div className="max-w-3xl mb-16">
            <h2 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-light text-[#4C061D] tracking-tight mb-4 leading-[0.95]">
              Everything you need for <span className="italic font-normal text-[#1c1b12]">verified</span> house hunting.
            </h2>
            <p className="text-base sm:text-lg text-[#736F4E] font-normal leading-relaxed">
              Full-bleed capability modules designed to solve middleman fraud and deliver instant transparency across Ethiopia.
            </p>
          </div>

          {/* 3-Column Feature Category Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Card 1: Physical Inspection Standard (Burgundy Full-Bleed Tile) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-[#4C061D] text-white p-8 feature-card-radius shadow-xl flex flex-col justify-between group hover:-translate-y-1 transition-transform"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center mb-8">
                  <ShieldCheck className="w-6 h-6 text-[#B4C292]" />
                </div>
                <div className="font-mono-label text-[10px] text-[#B4C292] mb-2 font-medium">
                  MODULE 01 • FIELD VERIFIED
                </div>
                <h3 className="font-serif-display text-3xl font-light text-white mb-4 leading-none">
                  Physical Property Audits
                </h3>
                <p className="text-sm text-white/85 leading-relaxed font-normal mb-6">
                  Every apartment photo, structural detail, and utility check is conducted in-person by our field agents before going live.
                </p>
              </div>

              <div className="pt-6 border-t border-white/15 flex items-center justify-between">
                <span className="font-mono-label text-[10px] text-[#B4C292]">100% CHECKED</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>

            {/* Card 2: Transparent Rent Pricing (Sage Full-Bleed Tile) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-[#B4C292] text-[#4C061D] p-8 feature-card-radius shadow-md flex flex-col justify-between group hover:-translate-y-1 transition-transform"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#4C061D] text-white flex items-center justify-center mb-8">
                  <Banknote className="w-6 h-6" />
                </div>
                <div className="font-mono-label text-[10px] text-[#4C061D] mb-2 font-bold">
                  MODULE 02 • TRANSPARENT RENT
                </div>
                <h3 className="font-serif-display text-3xl font-light text-[#4C061D] mb-4 leading-none">
                  Zero Hidden Middleman Fees
                </h3>
                <p className="text-sm text-[#3B3923] leading-relaxed font-normal mb-6">
                  Exact Birr rent costs displayed upfront. No surprise upfront consultation charges or arbitrary broker commissions.
                </p>
              </div>

              <div className="pt-6 border-t border-[#4C061D]/20 flex items-center justify-between">
                <span className="font-mono-label text-[10px] text-[#4C061D] font-bold">CLEAR ETB PRICING</span>
                <ArrowRight className="w-4 h-4 text-[#4C061D] group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>

            {/* Card 3: ID-Checked Brokers & Owners (Earthy Olive Tile) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-[#736F4E] text-white p-8 feature-card-radius shadow-md flex flex-col justify-between group hover:-translate-y-1 transition-transform"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center mb-8">
                  <FileCheck className="w-6 h-6 text-white" />
                </div>
                <div className="font-mono-label text-[10px] text-[#B4C292] mb-2 font-medium">
                  MODULE 03 • IDENTITY VERIFIED
                </div>
                <h3 className="font-serif-display text-3xl font-light text-white mb-4 leading-none">
                  National ID Checked
                </h3>
                <p className="text-sm text-white/90 leading-relaxed font-normal mb-6">
                  Connect with identity-verified home owners and certified brokers. Safe communication with zero anonymity.
                </p>
              </div>

              <div className="pt-6 border-t border-white/15 flex items-center justify-between">
                <span className="font-mono-label text-[10px] text-[#B4C292]">CERTIFIED USERS</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 4. Deep Problem vs Solution Section (Flat Elevation Step) */}
      <section className="py-20 lg:py-28 bg-[#FAF8F4] border-t border-[#ECE7DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
            <div className="lg:col-span-6">
              <h2 className="font-serif-display text-4xl sm:text-5xl font-light text-[#1c1b12] tracking-tight mb-6 leading-tight">
                Why middleman fraud is <span className="italic font-normal text-[#4C061D]">ending</span>.
              </h2>

              <div className="space-y-4 text-base text-[#736F4E] leading-relaxed font-normal">
                {STORY_SECTIONS.problem.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-white p-8 rounded-2xl border border-[#ECE7DA] shadow-xs">
                <h3 className="font-serif-display text-2xl font-light text-[#1c1b12] mb-6 border-b border-[#ECE7DA] pb-4">
                  Traditional Market vs Delala Standard
                </h3>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-rose-50/60 border border-rose-100 flex items-start gap-3">
                    <span className="font-mono-label text-[10px] text-rose-600 font-bold shrink-0 mt-0.5">OLD</span>
                    <p className="text-xs sm:text-sm text-rose-900 font-medium">
                      Unverified Telegram posts, fake property photos, and upfront cash requested just to view homes.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#FAF8F4] border border-[#B4C292]/60 flex items-start gap-3">
                    <span className="font-mono-label text-[10px] text-[#4C061D] font-bold shrink-0 mt-0.5">DELALA</span>
                    <p className="text-xs sm:text-sm text-[#4C061D] font-bold">
                      100% physically inspected properties, clear Birr prices, and direct owner contacts.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Solution Framing Block */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-[#4C061D] text-white p-8 sm:p-12 lg:p-16 rounded-2xl shadow-xl">
            <div className="lg:col-span-7">

              <h2 className="font-serif-display text-4xl sm:text-5xl font-light text-white tracking-tight mb-6 leading-tight">
                {STORY_SECTIONS.solution.title}
              </h2>

              <div className="space-y-4 text-base text-white/85 leading-relaxed font-normal mb-8">
                {STORY_SECTIONS.solution.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#B4C292] text-[#4C061D] font-bold text-sm hover:bg-white transition-colors"
              >
                <span>Read Company Story</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="rounded-xl overflow-hidden border border-white/20 shadow-2xl">
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

      {/* 5. Mobile App Showcase with 90px Internal Padding */}
      <AppShowcase />

      {/* 6. Popular Regional Hubs Grid */}
      <section id="cities" className="py-20 lg:py-28 bg-[#FAF8F4] relative border-t border-[#ECE7DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="font-serif-display text-4xl sm:text-5xl font-light text-[#4C061D] tracking-tight mb-4 leading-tight">
                Explore verified homes across Ethiopia.
              </h2>

              <p className="text-base sm:text-lg text-[#736F4E] font-normal leading-relaxed">
                From diplomatic neighborhoods in Addis Ababa to lakeside residences in Hawassa and tech corridors in Adama.
              </p>
            </div>

            <Link
              href="/features"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#4C061D] text-white font-medium text-sm hover:bg-[#3B3923] transition-colors shrink-0 group"
            >
              <span>Explore All Hubs</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {POPULAR_CITIES.map((city) => (
              <div
                key={city.name}
                className="group relative bg-white rounded-xl overflow-hidden border border-[#ECE7DA] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <img
                    src={city.image}
                    alt={`Delala verified homes in ${city.name}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1c1b12]/90 via-[#1c1b12]/20 to-transparent" />

                  <div className="absolute bottom-4 left-5 right-5 z-10 text-white">
                    <h3 className="font-serif-display text-2xl font-light tracking-tight mb-1">
                      {city.name}
                    </h3>
                    <div className="font-mono-label text-[10px] text-[#B4C292]">
                      {city.propertiesCount} VERIFIED HOMES
                    </div>
                  </div>
                </div>

                <div className="p-6 flex flex-col justify-between flex-1 bg-white">
                  <div>
                    <div className="font-mono-label text-[10px] text-[#736F4E] mb-2.5">
                      POPULAR NEIGHBORHOODS
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
                      <span className="font-mono-label text-[9px] text-[#736F4E] block">STARTING RENT</span>
                      <span className="text-sm font-bold text-[#4C061D]">
                        {city.startingPrice}
                      </span>
                    </div>
                    <Link
                      href="/download"
                      className="p-2.5 rounded-lg bg-[#FAF8F4] text-[#4C061D] border border-[#ECE7DA] group-hover:bg-[#4C061D] group-hover:text-white group-hover:border-[#4C061D] transition-colors"
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

