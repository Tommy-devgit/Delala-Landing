"use client";

import Link from "next/link";
import { NAV_ITEMS } from "@/lib/constants";
import { MapPin, Mail, Phone, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#3B3923] text-[#FAF8F4] pt-16 pb-12 border-t border-[#ECE7DA]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 mb-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#4C061D] flex items-center justify-center text-[#B4C292] font-semibold text-xl border border-[#B4C292]/30">
                D
              </div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-extrabold text-2xl tracking-tight text-white">
                  Delala
                </span>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-[#B4C292]/20 text-[#B4C292] border border-[#B4C292]/30">
                  ደላላ
                </span>
              </div>
            </Link>

            <p className="text-sm text-[#FAF8F4]/75 leading-relaxed max-w-sm">
              The modern, trustworthy platform digitizing home searches across Ethiopia. Verified properties, certified brokers, and transparent Birr pricing.
            </p>

            <div className="pt-2 text-xs text-[#B4C292] font-medium flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#B4C292]" />
              <span>Headquartered in Addis Ababa, Ethiopia</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-[#FAF8F4]/70 font-medium">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="hover:text-[#B4C292] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Cities */}
          <div>
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider mb-4">
              Featured Cities
            </h4>
            <ul className="space-y-2.5 text-sm text-[#FAF8F4]/70 font-medium">
              <li>
                <a href="#cities" className="hover:text-[#B4C292] transition-colors">
                  Addis Ababa (አዲስ አበባ)
                </a>
              </li>
              <li>
                <a href="#cities" className="hover:text-[#B4C292] transition-colors">
                  Hawassa (ሀዋሳ)
                </a>
              </li>
              <li>
                <a href="#cities" className="hover:text-[#B4C292] transition-colors">
                  Adama (አዳማ)
                </a>
              </li>
              <li>
                <a href="#cities" className="hover:text-[#B4C292] transition-colors">
                  Bahir Dar (ባሕር ዳር)
                </a>
              </li>
              <li>
                <a href="#cities" className="hover:text-[#B4C292] transition-colors">
                  Dire Dawa (ድሬዳዋ)
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider mb-4">
              Contact & Support
            </h4>
            <ul className="space-y-3 text-sm text-[#FAF8F4]/70">
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#B4C292]" />
                <a href="mailto:support@delala.et" className="hover:text-white transition-colors">
                  support@delala.et
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#B4C292]" />
                <a href="tel:+251911002233" className="hover:text-white transition-colors">
                  +251 911 002 233
                </a>
              </li>
              <li className="text-xs text-[#FAF8F4]/50 pt-2">
                Mon - Sat: 8:30 AM - 6:00 PM EAT
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Legal */}
        <div className="pt-8 border-t border-[#ECE7DA]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF8F4]/60">
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} Delala Technologies Inc. Made with</span>
            <Heart className="w-3.5 h-3.5 fill-[#B4C292] text-[#B4C292] inline mx-0.5" />
            <span>for Ethiopia.</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Broker Charter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
