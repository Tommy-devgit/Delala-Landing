"use client";

import Link from "next/link";
import { NAV_ITEMS } from "@/lib/constants";
import { MapPin, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#3B3923] text-[#FAF8F4] pt-16 pb-12 border-t border-[#ECE7DA]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 mb-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="font-heading font-black text-2xl tracking-tight text-white">
              Delala
            </Link>

            <p className="text-sm text-[#FAF8F4]/75 leading-relaxed max-w-sm">
              The modern, trustworthy platform digitizing home searches across Ethiopia. Verified properties, certified brokers, and transparent Birr pricing.
            </p>

            <div className="pt-2 text-xs text-[#B4C292] font-medium flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#B4C292]" />
              <span>Headquartered in Addis Ababa, Ethiopia</span>
            </div>
          </div>

          {/* Navigation */}
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

          {/* Featured Cities */}
          <div>
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider mb-4">
              Featured Cities
            </h4>
            <ul className="space-y-2.5 text-sm text-[#FAF8F4]/70 font-medium">
              <li>
                <a href="#cities" className="hover:text-[#B4C292] transition-colors">
                  Addis Ababa
                </a>
              </li>
              <li>
                <a href="#cities" className="hover:text-[#B4C292] transition-colors">
                  Hawassa
                </a>
              </li>
              <li>
                <a href="#cities" className="hover:text-[#B4C292] transition-colors">
                  Adama
                </a>
              </li>
              <li>
                <a href="#cities" className="hover:text-[#B4C292] transition-colors">
                  Bahir Dar
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider mb-4">
              Contact
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
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#ECE7DA]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF8F4]/60">
          <div>
            © {new Date().getFullYear()} Delala Technologies Inc. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
