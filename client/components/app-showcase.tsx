"use client";

import { motion } from "framer-motion";
import { Smartphone, ShieldCheck, MapPin, Heart, BellRing, MessageSquare } from "lucide-react";

export function AppShowcase() {
  return (
    <section className="py-20 lg:py-28 bg-[#FAF8F4] relative overflow-hidden border-t border-[#ECE7DA]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#4C061D] rounded-[40px] sm:rounded-[56px] p-8 sm:p-14 lg:p-20 text-[#FAF8F4] relative overflow-hidden shadow-2xl">
          {/* Subtle Background Lighting */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-radial from-[#B4C292]/20 via-transparent to-transparent blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            {/* Left Copy Column */}
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B4C292]/20 text-[#B4C292] text-xs font-semibold mb-6 border border-[#B4C292]/30">
                <Smartphone className="w-3.5 h-3.5 text-[#B4C292]" />
                <span>Available on iOS & Android</span>
              </div>

              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight">
                Ethiopian house hunting in the palm of your hand.
              </h2>

              <p className="text-base sm:text-lg text-[#FAF8F4]/80 leading-relaxed font-normal mb-8 max-w-lg">
                Download the Delala mobile app to browse verified properties, save favorites, chat with certified brokers, and receive instant push notifications for new listings in your price range.
              </p>

              {/* Feature Pills Grid */}
              <div className="grid grid-cols-2 gap-4 mb-10">
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/15">
                  <ShieldCheck className="w-5 h-5 text-[#B4C292]" />
                  <span className="text-xs font-semibold text-white">
                    Verified Listings Only
                  </span>
                </div>

                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/15">
                  <BellRing className="w-5 h-5 text-[#B4C292]" />
                  <span className="text-xs font-semibold text-white">
                    Instant Rent Alerts
                  </span>
                </div>

                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/15">
                  <MapPin className="w-5 h-5 text-[#B4C292]" />
                  <span className="text-xs font-semibold text-white">
                    Interactive Map Filter
                  </span>
                </div>

                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/15">
                  <MessageSquare className="w-5 h-5 text-[#B4C292]" />
                  <span className="text-xs font-semibold text-white">
                    Direct Owner Messaging
                  </span>
                </div>
              </div>

              {/* App Store Download Badges */}
              <div id="download" className="flex flex-wrap items-center gap-4">
                <a
                  href="#download"
                  className="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-white text-[#4C061D] font-bold text-sm shadow-md hover:bg-[#FAF8F4] hover:scale-102 transition-all"
                >
                  <Smartphone className="w-5 h-5 text-[#4C061D]" />
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] uppercase font-semibold text-[#736F4E]">Download on</span>
                    <span className="text-xs font-extrabold text-[#4C061D]">App Store</span>
                  </div>
                </a>

                <a
                  href="#download"
                  className="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-[#3B3923] text-white font-bold text-sm shadow-md border border-[#B4C292]/30 hover:bg-[#2D2D2D] hover:scale-102 transition-all"
                >
                  <Smartphone className="w-5 h-5 text-[#B4C292]" />
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] uppercase font-semibold text-[#B4C292]">Get it on</span>
                    <span className="text-xs font-extrabold text-white">Google Play</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Right Overlapping Devices Showcase */}
            <div className="lg:col-span-6 relative flex items-center justify-center">
              <div className="relative w-full max-w-md aspect-[4/4.5] flex items-center justify-center">
                {/* Device 1 (Back Device) */}
                <motion.div
                  initial={{ opacity: 0, rotate: -8, y: 20 }}
                  whileInView={{ opacity: 1, rotate: -8, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="absolute w-56 sm:w-64 h-96 sm:h-[420px] bg-[#3B3923] rounded-[36px] p-2.5 border-4 border-[#2D2D2D] shadow-2xl overflow-hidden -left-2 sm:left-4 z-10"
                >
                  <div className="w-full h-full bg-[#FAF8F4] rounded-[28px] p-3 text-[#2D2D2D] flex flex-col pt-6">
                    <div className="w-20 h-3 bg-[#2D2D2D] rounded-full mx-auto mb-4" />
                    <div className="text-xs font-bold text-[#4C061D] mb-2">Map View • Addis Ababa</div>
                    <div className="w-full h-full bg-[#ECE7DA]/50 rounded-xl relative overflow-hidden flex items-center justify-center">
                      <img src="/images/hero_property.png" alt="Map snippet" className="w-full h-full object-cover opacity-70" />
                      <div className="absolute top-8 left-10 bg-[#4C061D] text-white text-[9px] font-bold px-2 py-1 rounded-full shadow-md">
                        35k ETB
                      </div>
                      <div className="absolute bottom-10 right-8 bg-[#4C061D] text-white text-[9px] font-bold px-2 py-1 rounded-full shadow-md">
                        45k ETB
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Device 2 (Front Main Device) */}
                <motion.div
                  initial={{ opacity: 0, rotate: 6, y: 30 }}
                  whileInView={{ opacity: 1, rotate: 6, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="relative w-60 sm:w-72 h-[440px] sm:h-[480px] bg-[#2D2D2D] rounded-[42px] p-3 border-4 border-white/20 shadow-2xl overflow-hidden z-20"
                >
                  <div className="w-full h-full bg-white rounded-[32px] p-3.5 flex flex-col pt-7">
                    <div className="w-24 h-3.5 bg-[#2D2D2D] rounded-full mx-auto mb-4" />

                    <div className="flex items-center justify-between mb-3">
                      <span className="font-heading font-extrabold text-sm text-[#4C061D]">
                        Delala App
                      </span>
                      <span className="text-[10px] font-bold bg-[#B4C292]/30 px-2 py-0.5 rounded-full text-[#4C061D]">
                        Verified Feed
                      </span>
                    </div>

                    <div className="relative rounded-2xl overflow-hidden mb-3 border border-[#ECE7DA]">
                      <img src="/images/city_hawassa.png" alt="Hawassa Villa" className="w-full h-28 object-cover" />
                      <span className="absolute top-2 left-2 bg-[#4C061D] text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                        Hawassa Lakeside Villa
                      </span>
                    </div>

                    <div className="bg-[#FAF8F4] p-2.5 rounded-xl border border-[#ECE7DA] mb-2">
                      <div className="text-xs font-bold text-[#4C061D]">28,000 ETB / month</div>
                      <div className="text-[10px] text-[#736F4E]">3 Bed • Furnished • Lake View</div>
                    </div>

                    <button className="w-full py-2 bg-[#4C061D] text-white rounded-xl text-xs font-bold mt-auto shadow-xs">
                      Schedule Walkthrough
                    </button>
                  </div>
                </motion.div>

                {/* Floating Push Notification Pill */}
                <motion.div
                  initial={{ opacity: 0, y: -15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="absolute -top-4 right-0 z-30 bg-white text-[#2D2D2D] p-3 rounded-2xl border border-[#ECE7DA] shadow-xl max-w-[200px]"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#B4C292] text-[#4C061D] flex items-center justify-center shrink-0">
                      <BellRing className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-[#4C061D]">New Home Match!</div>
                      <div className="text-[9px] text-[#736F4E]">Bole Kazanchis • 30k ETB</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
