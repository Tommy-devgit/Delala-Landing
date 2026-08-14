/**
 * The site's navigation tree.
 *
 * One definition, consumed by the desktop header, the mobile drawer and the
 * footer, so those three cannot drift apart — which they had, each carrying its
 * own hand-written list of links.
 *
 * Every href here resolves to a route that exists and has content behind it.
 * Nothing is listed "coming soon": a menu entry is a promise that something is
 * there.
 */

export interface NavLink {
  label: string;
  href: string;
  /** Shown under the label in the mega menu. */
  description?: string;
}

export interface NavSection {
  label: string;
  /** Where the top-level label itself goes. */
  href: string;
  children?: NavLink[];
}

/**
 * Property types are the five `properties_property_type_check` permits.
 * Studio, Penthouse and Office are not among them — offering them would link to
 * a filter the database can never satisfy.
 */
export const PRIMARY_NAV: NavSection[] = [
  { label: "Home", href: "/" },
  {
    label: "Explore",
    href: "/search",
    children: [
      { label: "All properties", href: "/search", description: "Everything on the marketplace" },
      { label: "Rent", href: "/search?listingType=rent", description: "Monthly rentals" },
      { label: "Buy", href: "/search?listingType=sale", description: "Properties for sale" },
      { label: "Apartments", href: "/search?propertyType=apartment" },
      { label: "Houses", href: "/search?propertyType=house" },
      { label: "Villas", href: "/search?propertyType=villa" },
      { label: "Commercial", href: "/search?propertyType=commercial" },
      { label: "Land", href: "/search?propertyType=land" },
    ],
  },
  {
    label: "Locations",
    href: "/cities",
    children: [
      { label: "All cities", href: "/cities", description: "Every place Delala covers" },
      { label: "Addis Ababa", href: "/cities/addis-ababa", description: "The deepest market" },
      { label: "Living in Addis", href: "/living-in-addis", description: "Areas, commutes and daily life" },
    ],
  },
  {
    label: "Guides",
    href: "/guides",
    children: [
      { label: "All guides", href: "/guides" },
      { label: "Renting", href: "/guides#renting", description: "Finding a place and signing for it" },
      { label: "Buying", href: "/guides#buying", description: "What to establish before you commit" },
      { label: "Money", href: "/guides#money", description: "Working out what a property should cost" },
      { label: "Safety", href: "/guides#safety", description: "Spotting a listing that is not real" },
    ],
  },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "About Delala", href: "/about", description: "Why this exists" },
      { label: "How Delala works", href: "/how-it-works", description: "Search to viewing, step by step" },
      { label: "Safety & trust", href: "/safety", description: "What the badges mean" },
      { label: "Contact", href: "/contact", description: "Reach a person" },
    ],
  },
];

/** Signed-in destinations, shown in the account menu and the mobile drawer. */
export const ACCOUNT_NAV: NavLink[] = [
  { label: "My profile", href: "/profile" },
  { label: "My listings", href: "/my-listings" },
  { label: "Viewings", href: "/viewings" },
  { label: "Saved searches", href: "/saved-searches" },
  { label: "Recently viewed", href: "/recently-viewed" },
  { label: "Settings", href: "/settings" },
  { label: "Support", href: "/help" },
];

/** The tools that act on a set of properties rather than one. */
export const TOOL_NAV: NavLink[] = [
  { label: "Favourites", href: "/favorites" },
  { label: "Compare", href: "/compare" },
  { label: "Recently viewed", href: "/recently-viewed" },
  { label: "Saved searches", href: "/saved-searches" },
];

/**
 * Routes whose first element is a dark, full-bleed header.
 *
 * The navbar renders transparent over these and solid everywhere else. It has
 * to be a list rather than a guess, because getting it wrong is invisible in
 * one direction and unusable in the other: a transparent bar on a light page
 * puts white text on `--color-canvas`, where it simply cannot be read.
 *
 * Adding a route here is only half the job — the page's header must also carry
 * `-mt-[var(--header-h)]` so it actually sits underneath the bar, with top
 * padding so its content clears it. See `components/home-hero.tsx`.
 */
const DARK_HEADER_ROUTES = [
  "/",
  "/cities",
  "/about",
  "/how-it-works",
  "/living-in-addis",
];

export const hasDarkHeader = (pathname: string): boolean =>
  DARK_HEADER_ROUTES.includes(pathname) || pathname.startsWith("/cities/");
