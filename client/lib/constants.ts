export interface NavItem {
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#hero" },
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "About", href: "#why-delala" },
  { label: "FAQ", href: "#faq" },
];

export const STATS_DATA = [
  { value: "2,000+", label: "Verified Homes", subtext: "Physically inspected by our team" },
  { value: "500+", label: "Certified Brokers", subtext: "Government ID verified agents" },
  { value: "15+", label: "Regional Hubs", subtext: "Covering major Ethiopian cities" },
  { value: "98%", label: "Trust Score", subtext: "Zero hidden middleman markups" },
];

export const FEATURES_DATA = [
  {
    id: "outcome-trust",
    title: "Connect with people you can trust",
    description: "Every broker and property owner undergoes strict identity and document verification. You always know exactly who you're dealing with.",
    icon: "ShieldCheck",
    outcomeTag: "100% Verified Identities",
  },
  {
    id: "outcome-location",
    title: "Find homes exactly where you want to live",
    description: "Filter by exact sub-city (Bole, Kazanchis, Old Airport, CMC) and proximity to light rail stations, supermarkets, and international schools.",
    icon: "MapPin",
    outcomeTag: "Neighborhood Precision",
  },
  {
    id: "outcome-transparency",
    title: "Know the real price before stepping outside",
    description: "Clear monthly rent in Ethiopian Birr with zero hidden broker markups or unexpected price spikes at the doorstep.",
    icon: "SlidersHorizontal",
    outcomeTag: "Transparent Birr Pricing",
  },
  {
    id: "outcome-speed",
    title: "Book walkthroughs in a single click",
    description: "No endless phone calls or waiting days for a response. Schedule physical viewings directly with owners or assigned brokers.",
    icon: "Clock",
    outcomeTag: "Fast 1-Click Tours",
  },
  {
    id: "outcome-communication",
    title: "Chat directly with verified owners",
    description: "Message or call property managers inside the app or over WhatsApp without paying cash upfront just to get a phone number.",
    icon: "MessageSquare",
    outcomeTag: "Direct Contact",
  },
  {
    id: "outcome-legal",
    title: "Lease contracts backed by legal standards",
    description: "Protect your security deposit with standardized Ethiopian lease templates reviewed by legal advisors for complete peace of mind.",
    icon: "FileText",
    outcomeTag: "Legal Protection",
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    number: "01",
    title: "Discover Verified Homes",
    subtitle: "Filter by budget, location & amenities",
    description: "Browse high-res photos and details of homes physically inspected by Delala agents across Addis Ababa and regional cities.",
    icon: "Search",
  },
  {
    number: "02",
    title: "Connect Directly",
    subtitle: "Talk to verified owners or brokers",
    description: "Schedule a physical walkthrough or chat directly in-app with identity-verified property owners without middleman markups.",
    icon: "Users",
  },
  {
    number: "03",
    title: "Move In Securely",
    subtitle: "Sign transparent lease contracts",
    description: "Finalize your rent agreement using standardized legal protection templates. Move into your new home with total confidence.",
    icon: "KeyRound",
  },
];

export const POPULAR_CITIES = [
  {
    name: "Addis Ababa",
    propertiesCount: "1,240+ verified homes",
    startingPrice: "From 18,000 ETB/mo",
    image: "/images/city_addis_ababa.png",
    popularAreas: ["Bole", "Kazanchis", "Old Airport", "CMC", "Sarbet"],
  },
  {
    name: "Hawassa",
    propertiesCount: "380+ verified homes",
    startingPrice: "From 12,000 ETB/mo",
    image: "/images/city_hawassa.png",
    popularAreas: ["Lakeside", "Tabor", "Haile Resort Area"],
  },
  {
    name: "Adama",
    propertiesCount: "290+ verified homes",
    startingPrice: "From 10,000 ETB/mo",
    image: "/images/city_adama.png",
    popularAreas: ["Expressway Zone", "Posta Bet", "Bole Adama"],
  },
  {
    name: "Bahir Dar",
    propertiesCount: "220+ verified homes",
    startingPrice: "From 11,500 ETB/mo",
    image: "/images/city_bahir_dar.png",
    popularAreas: ["Lake Tana View", "Belay Zeleke", "Kebele 14"],
  },
  {
    name: "Dire Dawa",
    propertiesCount: "180+ verified homes",
    startingPrice: "From 9,000 ETB/mo",
    image: "/images/city_addis_ababa.png",
    popularAreas: ["Kazira", "Megala", "Taiwan Market Area"],
  },
  {
    name: "Mekelle",
    propertiesCount: "150+ verified homes",
    startingPrice: "From 9,500 ETB/mo",
    image: "/images/hero_property.png",
    popularAreas: ["Kedamay Weyane", "Adi Haki", "Ayder"],
  },
];

export const COMPARISON_DATA = {
  traditional: {
    title: "Traditional House Hunting",
    subtitle: "Telegram channels & unverified street brokers",
    points: [
      "Chaotic Telegram groups flooded with outdated, fake listings",
      "Unverified brokers demanding upfront cash before showing homes",
      "Photos copied from internet with unexpected price increases at the door",
      "Endless phone calls, wasted weekends, and unreturned messages",
      "Zero legal contracts or security deposit guarantees",
    ],
  },
  delala: {
    title: "The Delala Standard",
    subtitle: "Ethiopia's verified digital housing platform",
    points: [
      "100% physically inspected & verified property listings",
      "Government ID-checked brokers with transparent ratings",
      "Upfront Birr pricing with zero hidden middleman fees",
      "1-click walkthrough scheduling & direct owner messaging",
      "Standardized legal lease agreements protecting your deposit",
    ],
  },
};

export const TESTIMONIALS_DATA = [
  {
    name: "Selamawit Tadesse",
    role: "Software Engineer",
    location: "Addis Ababa (Bole)",
    avatar: "/images/avatar_selam.png",
    rating: 5,
    quote: "Finding an apartment in Bole used to mean scrolling dozens of Telegram groups and getting scammed with fake photos. With Delala, I booked a tour and signed my lease in two days.",
  },
  {
    name: "Abebe Tefera",
    role: "Certified Broker",
    location: "Addis Ababa (Kazanchis)",
    avatar: "/images/avatar_abebe.png",
    rating: 5,
    quote: "Delala brought serious buyers directly to me. Clients trust me more because every property I list is physically verified on the platform.",
  },
  {
    name: "Michael Henderson",
    role: "NGO Representative",
    location: "Hawassa",
    avatar: "/images/avatar_selam.png",
    rating: 5,
    quote: "Relocating to Hawassa was seamless. Delala's verified maps and Birr pricing made it simple to secure a family home before I even landed.",
  },
];

export const FAQ_DATA = [
  {
    question: "Is Delala free for house hunters?",
    answer: "Yes! Searching, viewing verified photos, filtering by neighborhood, and contacting verified owners or brokers on Delala is 100% free for renters and buyers.",
  },
  {
    question: "How does Delala verify properties and brokers?",
    answer: "Our local field team physically visits listed properties to inspect the condition, verify ownership paperwork, take photos, and log exact GPS coordinates. Brokers complete government ID and phone verification.",
  },
  {
    question: "Which Ethiopian cities are covered?",
    answer: "Delala is active in Addis Ababa, Hawassa, Adama, Bahir Dar, Dire Dawa, and Mekelle, with expanding coverage across all major regional hubs.",
  },
  {
    question: "How do I list my home as an owner or broker?",
    answer: "Property owners and certified brokers can download the Delala app or click 'List Your Property' on our site. Our team conducts a fast physical inspection before publishing your listing live.",
  },
  {
    question: "How are security deposits and lease contracts protected?",
    answer: "We provide standardized Ethiopian legal lease templates created with real estate legal advisors to ensure clear terms, deposit return conditions, and zero middleman fraud.",
  },
];
