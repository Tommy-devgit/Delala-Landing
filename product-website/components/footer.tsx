"use client";

import Link from "next/link";
import { ShieldCheck, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#FAF8F4] border-t border-[#ECE7DA] pt-12 pb-8 text-[#2D2D2D]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        
        {/* Marketplace Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="font-mono-label text-[10px] text-[#4C061D] mb-4 font-bold">
              EXPLORE CITIES
            </h4>
            <ul className="space-y-2.5 text-xs text-[#736F4E]">
              <li><Link href="/cities/addis-ababa" className="hover:text-[#4C061D]">Addis Ababa Apartments</Link></li>
              <li><Link href="/cities/hawassa" className="hover:text-[#4C061D]">Hawassa Lakeside Homes</Link></li>
              <li><Link href="/cities/adama" className="hover:text-[#4C061D]">Adama Expressway Rentals</Link></li>
              <li><Link href="/cities/bahir-dar" className="hover:text-[#4C061D]">Bahir Dar Tana Residences</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono-label text-[10px] text-[#4C061D] mb-4 font-bold">
              POPULAR SUB-CITIES
            </h4>
            <ul className="space-y-2.5 text-xs text-[#736F4E]">
              <li><Link href="/search?subCity=Bole" className="hover:text-[#4C061D]">Bole Medhanialem</Link></li>
              <li><Link href="/search?subCity=Kazanchis" className="hover:text-[#4C061D]">Kazanchis Central</Link></li>
              <li><Link href="/search?subCity=Old+Airport" className="hover:text-[#4C061D]">Old Airport Diplomatic</Link></li>
              <li><Link href="/search?subCity=CMC" className="hover:text-[#4C061D]">CMC Residential</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono-label text-[10px] text-[#4C061D] mb-4 font-bold">
              PROPERTY TYPES
            </h4>
            <ul className="space-y-2.5 text-xs text-[#736F4E]">
              <li><Link href="/search?propertyType=Apartment" className="hover:text-[#4C061D]">Modern Apartments</Link></li>
              <li><Link href="/search?propertyType=Villa" className="hover:text-[#4C061D]">G+1 Diplomatic Villas</Link></li>
              <li><Link href="/search?propertyType=Studio" className="hover:text-[#4C061D]">Executive Serviced Studios</Link></li>
              <li><Link href="/search?propertyType=Penthouse" className="hover:text-[#4C061D]">Luxury Penthouses</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono-label text-[10px] text-[#4C061D] mb-4 font-bold">
              VERIFICATION & TRUST
            </h4>
            <ul className="space-y-2.5 text-xs text-[#736F4E]">
              <li><Link href="/search" className="hover:text-[#4C061D]">Verified Real Estate Marketplace</Link></li>
              <li><Link href="/search?verifiedOnly=true" className="hover:text-[#4C061D]">100% Field Audited Homes</Link></li>
              <li><Link href="/settings" className="hover:text-[#4C061D]">Account Settings</Link></li>
              <li><Link href="/favorites" className="hover:text-[#4C061D]">Saved Wishlist</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Locale Controls */}
        <div className="pt-6 border-t border-[#ECE7DA] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#736F4E]">
          <div className="flex items-center gap-2">
            <span className="font-serif-display font-light text-lg text-[#4C061D]">DELALA</span>
            <span>© 2026 Delala Technologies Inc. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4 font-mono-label text-[10px]">
            <span className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-[#4C061D]" /> English (US)
            </span>
            <span className="font-bold text-[#4C061D]">ETB (Birr)</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
