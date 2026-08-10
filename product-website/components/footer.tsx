"use client";

import Link from "next/link";
import { ShieldCheck, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-canvas border-t border-line pt-12 pb-8 text-body">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        
        {/* Marketplace Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          <div>
            <h4 className="font-mono-label text-label text-primary mb-4 font-bold">
              EXPLORE CITIES
            </h4>
            <ul className="space-y-2.5 text-xs text-muted">
              <li><Link href="/cities/addis-ababa" className="hover:text-primary">Addis Ababa Apartments</Link></li>
              <li><Link href="/cities/hawassa" className="hover:text-primary">Hawassa Lakeside Homes</Link></li>
              <li><Link href="/cities/adama" className="hover:text-primary">Adama Expressway Rentals</Link></li>
              <li><Link href="/cities/bahir-dar" className="hover:text-primary">Bahir Dar Tana Residences</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono-label text-label text-primary mb-4 font-bold">
              POPULAR SUB-CITIES
            </h4>
            <ul className="space-y-2.5 text-xs text-muted">
              <li><Link href="/search?subCity=Bole" className="hover:text-primary">Bole Medhanialem</Link></li>
              <li><Link href="/search?subCity=Kazanchis" className="hover:text-primary">Kazanchis Central</Link></li>
              <li><Link href="/search?subCity=Old+Airport" className="hover:text-primary">Old Airport Diplomatic</Link></li>
              <li><Link href="/search?subCity=CMC" className="hover:text-primary">CMC Residential</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono-label text-label text-primary mb-4 font-bold">
              PROPERTY TYPES
            </h4>
            <ul className="space-y-2.5 text-xs text-muted">
              <li><Link href="/search?propertyType=Apartment" className="hover:text-primary">Modern Apartments</Link></li>
              <li><Link href="/search?propertyType=Villa" className="hover:text-primary">G+1 Diplomatic Villas</Link></li>
              <li><Link href="/search?propertyType=Studio" className="hover:text-primary">Executive Serviced Studios</Link></li>
              <li><Link href="/search?propertyType=Penthouse" className="hover:text-primary">Luxury Penthouses</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono-label text-label text-primary mb-4 font-bold">
              VERIFICATION & TRUST
            </h4>
            <ul className="space-y-2.5 text-xs text-muted">
              <li><Link href="/search" className="hover:text-primary">Verified Real Estate Marketplace</Link></li>
              <li><Link href="/search?verifiedOnly=true" className="hover:text-primary">100% Field Audited Homes</Link></li>
              <li><Link href="/settings" className="hover:text-primary">Account Settings</Link></li>
              <li><Link href="/favorites" className="hover:text-primary">Saved Wishlist</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Locale Controls */}
        <div className="pt-6 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <div className="flex items-center gap-2">
            <span className="font-serif-display font-light text-lg text-primary">DELALA</span>
            <span>© 2026 Delala Technologies Inc. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4 font-mono-label text-label">
            <span className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-primary" /> English (US)
            </span>
            <span className="font-bold text-primary">ETB (Birr)</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
