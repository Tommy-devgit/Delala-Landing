"use client";

import Link from "next/link";
import { NAV_ITEMS } from "@/lib/constants";
import { MapPin, Mail, Phone, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#3B3923] text-[#FAF8F4] pt-16 pb-12 border-t border-[#ECE7DA]/20 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="font-heading font-black text-2xl tracking-tight text-white">
                Delala
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#B4C292]/20 text-[#B4C292] font-bold text-xs border border-[#B4C292]/30">
                ደላላ
              </span>
            </Link>

            <p className="text-sm text-[#FAF8F4]/80 leading-relaxed max-w-sm">
              The modern, trustworthy platform digitizing home searches across Ethiopia. 100% physically inspected homes, ID-checked brokers, and transparent Birr pricing.
            </p>

            <div className="pt-2 text-xs text-[#B4C292] font-semibold flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#B4C292]" />
              <span>Headquartered in Addis Ababa, Ethiopia</span>
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="font-heading font-extrabold text-xs text-white uppercase tracking-wider mb-4">
              Platform Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-[#FAF8F4]/75 font-medium">
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
              <li>
                <Link href="/download" className="hover:text-[#B4C292] transition-colors">
                  Download App
                </Link>
              </li>
            </ul>
          </div>

          {/* Featured Regional Hubs */}
          <div>
            <h4 className="font-heading font-extrabold text-xs text-white uppercase tracking-wider mb-4">
              Featured Regional Hubs
            </h4>
            <ul className="space-y-2.5 text-sm text-[#FAF8F4]/75 font-medium">
              <li>
                <Link href="/features" className="hover:text-[#B4C292] transition-colors">
                  Addis Ababa (Bole, Kazanchis)
                </Link>
              </li>
              <li>
                <Link href="/features" className="hover:text-[#B4C292] transition-colors">
                  Hawassa Lakeside
                </Link>
              </li>
              <li>
                <Link href="/features" className="hover:text-[#B4C292] transition-colors">
                  Adama Tech Zone
                </Link>
              </li>
              <li>
                <Link href="/features" className="hover:text-[#B4C292] transition-colors">
                  Bahir Dar Tana
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="font-heading font-extrabold text-xs text-white uppercase tracking-wider mb-4">
              Contact & Support
            </h4>
            <ul className="space-y-3 text-sm text-[#FAF8F4]/75">
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
              <li className="pt-2 text-xs text-[#B4C292] font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#B4C292]" />
                <span>Verified Legal Protection</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Copyright Row */}
        <div className="pt-8 border-t border-[#ECE7DA]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF8F4]/60">
          <div>
            © {new Date().getFullYear()} Delala Technologies Inc. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/about" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/about" className="hover:text-white transition-colors">
              Broker Code of Conduct
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
