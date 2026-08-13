import Link from "next/link";
import { Globe } from "lucide-react";

/**
 * Site footer.
 *
 * Two things were wrong with the previous version beyond styling. It offered
 * "Executive Serviced Studios" and "Luxury Penthouses" — `properties.property_type`
 * is constrained to apartment, house, villa, commercial and land, so those
 * links could only ever land on an empty result. And it advertised "100% Field
 * Audited Homes", which is the same invented claim as the "physically verified
 * by Delala field inspector" note that used to sit on every listing: nobody
 * audits these properties.
 *
 * Every link below goes somewhere with real content behind it.
 */

const COLUMNS = [
  {
    heading: "Explore",
    links: [
      { label: "All listings", href: "/search" },
      { label: "Homes to rent", href: "/search?listingType=rent" },
      { label: "Homes for sale", href: "/search?listingType=sale" },
      { label: "Reviewed listings", href: "/search?verifiedOnly=true" },
    ],
  },
  {
    heading: "Places",
    links: [
      { label: "All cities", href: "/cities" },
      { label: "Addis Ababa", href: "/cities/addis-ababa" },
      { label: "Adama", href: "/cities/adama" },
      { label: "Hawassa", href: "/cities/hawassa" },
    ],
  },
  {
    heading: "Property types",
    links: [
      { label: "Apartments", href: "/search?propertyType=apartment" },
      { label: "Houses", href: "/search?propertyType=house" },
      { label: "Villas", href: "/search?propertyType=villa" },
      { label: "Land", href: "/search?propertyType=land" },
      { label: "Commercial", href: "/search?propertyType=commercial" },
    ],
  },
  {
    heading: "Help & trust",
    links: [
      { label: "Guides", href: "/guides" },
      { label: "Safety & trust", href: "/safety" },
      { label: "How to avoid scams", href: "/guides/avoiding-property-scams" },
      { label: "Support", href: "/help" },
      { label: "List a property", href: "/publish" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-canvas border-t border-line pt-12 pb-8 text-body">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {COLUMNS.map((column) => (
            <div key={column.heading}>
              <h2 className="text-micro text-ink mb-3 font-medium">{column.heading}</h2>
              <ul className="space-y-2 text-micro text-muted">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4 text-micro text-muted">
          <div className="flex items-center gap-2">
            <span className="font-serif-display font-light text-lg text-primary">ደላላ</span>
            <span>© 2026 Delala. Property listings across Ethiopia.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-primary" aria-hidden="true" /> English
            </span>
            <span className="text-primary">ETB (Birr)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
