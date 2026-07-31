"use client";

import { motion } from "framer-motion";
import { Smartphone, ShieldCheck, MapPin, BellRing, MessageSquare } from "lucide-react";

export function AppShowcase() {
  return (
    <section className="py-20 lg:py-28 bg-[#FAF8F4] relative border-t border-[#ECE7DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#4C061D] rounded-[36px] sm:rounded-[48px] p-8 sm:p-14 lg:p-16 text-white relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            {/* Left Copy Column */}
            <div className="lg:col-span-6">
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight">
                Ethiopian house hunting in the palm of your hand.
              </h2>

              <p className="text-base sm:text-lg text-white/80 leading-relaxed font-normal mb-8 max-w-lg">
                Download the Delala mobile app to browse verified properties, save favorites, chat with certified brokers, and receive instant push notifications.
              </p>

              {/* Feature Items */}
              <div className="grid grid-cols-2 gap-4 mb-10">
                <div className="flex items-center gap-3 bg-white/10 p-3.5 rounded-2xl border border-white/15">
                  <ShieldCheck className="w-5 h-5 text-[#B4C292]" />
                  <span className="text-xs font-semibold text-white">
                    Verified Listings
                  </span>
                </div>

                <div className="flex items-center gap-3 bg-white/10 p-3.5 rounded-2xl border border-white/15">
                  <BellRing className="w-5 h-5 text-[#B4C292]" />
                  <span className="text-xs font-semibold text-white">
                    Instant Rent Alerts
                  </span>
                </div>

                <div className="flex items-center gap-3 bg-white/10 p-3.5 rounded-2xl border border-white/15">
                  <MapPin className="w-5 h-5 text-[#B4C292]" />
                  <span className="text-xs font-semibold text-white">
                    Interactive Map Filter
                  </span>
                </div>

                <div className="flex items-center gap-3 bg-white/10 p-3.5 rounded-2xl border border-white/15">
                  <MessageSquare className="w-5 h-5 text-[#B4C292]" />
                  <span className="text-xs font-semibold text-white">
                    Direct Owner Messaging
                  </span>
                </div>
              </div>

              {/* App Store Download Buttons */}
              <div id="download" className="flex flex-wrap items-center gap-4">
                <a
                  href="#download"
                  className="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-white text-[#4C061D] font-bold text-sm shadow-md hover:bg-[#FAF8F4] transition-all"
                >
                  <Smartphone className="w-5 h-5 text-[#4C061D]" />
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] uppercase font-semibold text-[#736F4E]">Download on</span>
                    <span className="text-xs font-extrabold text-[#4C061D]">App Store</span>
                  </div>
                </a>

                <a
                  href="#download"
                  className="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-[#3B3923] text-white font-bold text-sm shadow-md border border-[#B4C292]/30 hover:bg-[#2D2D2D] transition-all"
                >
                  <Smartphone className="w-5 h-5 text-[#B4C292]" />
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] uppercase font-semibold text-[#B4C292]">Get it on</span>
                    <span className="text-xs font-extrabold text-white">Google Play</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Right Mobile Showcase */}
            <div className="lg:col-span-6 relative flex items-center justify-center">
              <div className="relative w-full max-w-md aspect-[4/4] flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="w-64 sm:w-72 h-[420px] bg-[#2D2D2D] rounded-[40px] p-3 border-4 border-white/20 shadow-2xl overflow-hidden"
                >
                  <div className="w-full h-full bg-white rounded-[30px] p-4 text-[#2D2D2D] flex flex-col pt-6">
                    <div className="w-20 h-3 bg-[#2D2D2D] rounded-full mx-auto mb-4" />
                    <span className="font-heading font-black text-sm text-[#4C061D] mb-3">
                      Delala App
                    </span>
                    <div className="rounded-2xl overflow-hidden mb-3 border border-[#ECE7DA]">
                      <img src="/images/city_hawassa.png" alt="Hawassa Villa" className="w-full h-28 object-cover" />
                    </div>
                    <div className="bg-[#FAF8F4] p-3 rounded-xl border border-[#ECE7DA] mb-3">
                      <div className="text-xs font-bold text-[#4C061D]">28,000 ETB / month</div>
                      <div className="text-[10px] text-[#736F4E]">3 Bed Villa • Hawassa</div>
                    </div>
                    <button className="w-full py-2.5 bg-[#4C061D] text-white rounded-xl text-xs font-bold mt-auto">
                      Schedule Walkthrough
                    </button>
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
