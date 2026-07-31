export interface NavItem {
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Features", href: "#features" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "Cities", href: "#cities" },
  { label: "Why Delala", href: "#why-delala" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

export const STATS_DATA = [
  { value: "2,000+", label: "Verified Properties", subtext: "Inspected & approved in person" },
  { value: "500+", label: "Trusted Brokers", subtext: "ID-checked local experts" },
  { value: "15+", label: "Cities Covered", subtext: "Across major Ethiopian regions" },
  { value: "98%", label: "Satisfaction Rate", subtext: "Happy home hunters & owners" },
];

export const FEATURES_DATA = [
  {
    id: "verified-listings",
    title: "100% Verified Listings",
    description: "Every single home and apartment is physically visited, photographed, and legal paperwork confirmed by our local team before listing.",
    icon: "ShieldCheck",
    badge: "Anti-Scam Protection",
  },
  {
    id: "advanced-search",
    title: "Precision Ethiopian Filters",
    description: "Filter by monthly rent in ETB, exact neighborhood (Bole, Kazanchis, Old Airport), house type (G+1, Condo, Villa), and amenities.",
    icon: "SlidersHorizontal",
    badge: "Smart Filters",
  },
  {
    id: "trusted-brokers",
    title: "Certified Local Brokers",
    description: "Connect with official, identity-verified brokers with public rating histories and transparent standard commission rates.",
    icon: "UserCheck",
    badge: "Verified Professionals",
  },
  {
    id: "favorites-alerts",
    title: "Instant SMS & Push Alerts",
    description: "Save favorite searches and get instant alerts via SMS or app notification as soon as a matching home is available.",
    icon: "BellRing",
    badge: "Real-time Alerts",
  },
  {
    id: "realtime-availability",
    title: "Live Property Status",
    description: "No more calling about homes rented 3 months ago. Real-time availability updates keep listings fresh and accurate.",
    icon: "Clock",
    badge: "Live Updates",
  },
  {
    id: "map-search",
    title: "Neighborhood Map Search",
    description: "Explore nearby schools, light rail stations, supermarkets, and taxi stands directly on our interactive map layer.",
    icon: "MapPin",
    badge: "Location Intelligence",
  },
  {
    id: "fast-contact",
    title: "Direct Owner & Agent Chat",
    description: "Message or call verified owners directly through WhatsApp or in-app calling with zero middleman markups.",
    icon: "MessageSquare",
    badge: "Direct Contact",
  },
  {
    id: "secure-platform",
    title: "Legal & Lease Guarantee",
    description: "Access standardized Ethiopian lease agreement templates and legal advisory support to protect your security deposit.",
    icon: "FileText",
    badge: "Legal Protection",
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    number: "01",
    title: "Search & Filter",
    subtitle: "Explore verified homes near you",
    description: "Use custom filters tailored to Ethiopia: monthly budget in Birr, specific sub-city, furnished options, and water/generator availability.",
    icon: "Search",
    highlight: "Filter by Birr budget, sub-city, and generator availability",
  },
  {
    number: "02",
    title: "Connect Directly",
    subtitle: "Talk to verified owners or brokers",
    description: "Schedule a physical walkthrough in one click. Chat directly with identity-checked owners or trusted local brokers without guesswork.",
    icon: "Users",
    highlight: "Direct phone, WhatsApp, and in-app walkthrough scheduling",
  },
  {
    number: "03",
    title: "Move In Securely",
    subtitle: "Sign transparent lease contracts",
    description: "Finalize your agreement using standardized, legal lease protection templates. Move into your new home with total confidence.",
    icon: "KeyRound",
    highlight: "Standardized Amharic & English lease agreements included",
  },
];

export const POPULAR_CITIES = [
  {
    name: "Addis Ababa",
    amharicName: "አዲስ አበባ",
    propertiesCount: "1,240+ properties",
    startingPrice: "From 18,000 ETB/mo",
    image: "/images/city_addis_ababa.png",
    popularAreas: ["Bole", "Kazanchis", "Old Airport", "CMC", "Sarbet"],
    tag: "Capital & Tech Hub",
  },
  {
    name: "Hawassa",
    amharicName: "ሀዋሳ",
    propertiesCount: "380+ properties",
    startingPrice: "From 12,000 ETB/mo",
    image: "/images/city_hawassa.png",
    popularAreas: ["Lakeside", "Tabor", "Haile Resort Area"],
    tag: "Lakeside Living",
  },
  {
    name: "Adama",
    amharicName: "አዳማ",
    propertiesCount: "290+ properties",
    startingPrice: "From 10,000 ETB/mo",
    image: "/images/city_adama.png",
    popularAreas: ["Expressway Zone", "Posta Bet", "Bole Adama"],
    tag: "Economic Hub",
  },
  {
    name: "Bahir Dar",
    amharicName: "ባሕር ዳር",
    propertiesCount: "220+ properties",
    startingPrice: "From 11,500 ETB/mo",
    image: "/images/city_bahir_dar.png",
    popularAreas: ["Lake Tana View", "Belay Zeleke", "Kebele 14"],
    tag: "Scenic Riverfront",
  },
  {
    name: "Dire Dawa",
    amharicName: "ድሬዳዋ",
    propertiesCount: "180+ properties",
    startingPrice: "From 9,000 ETB/mo",
    image: "/images/city_addis_ababa.png", // fallback photo with nice urban architecture
    popularAreas: ["Kazira", "Megala", "Taiwan Market Area"],
    tag: "Historic Commercial City",
  },
  {
    name: "Mekelle",
    amharicName: "መቀሌ",
    propertiesCount: "150+ properties",
    startingPrice: "From 9,500 ETB/mo",
    image: "/images/hero_property.png", // fallback photo
    popularAreas: ["Kedamay Weyane", "Adi Haki", "Ayder"],
    tag: "Educational Center",
  },
];

export const COMPARISON_DATA = {
  traditional: {
    title: "Traditional House Hunting",
    subtitle: "Telegram channels & random street brokers",
    points: [
      { text: "Chaotic Telegram groups flooded with outdated listings", bad: true },
      { text: "Unverified brokers demanding upfront cash before viewing", bad: true },
      { text: "Fake photos and hidden prices changed at the door", bad: true },
      { text: "Endless phone calls and wasted weekend trips", bad: true },
      { text: "Zero legal contracts or security deposit guarantees", bad: true },
    ],
  },
  delala: {
    title: "The Delala Experience",
    subtitle: "The modern, transparent digital standard",
    points: [
      { text: "100% physically inspected & verified property listings", good: true },
      { text: "Government ID-checked brokers with verified ratings", good: true },
      { text: "Transparent ETB pricing with zero hidden fees", good: true },
      { text: "1-click walkthrough scheduling & direct owner chat", good: true },
      { text: "Standardized lease agreements & legal deposit protection", good: true },
    ],
  },
};

export const TESTIMONIALS_DATA = [
  {
    name: "Selamawit Tadesse",
    role: "Senior Software Engineer",
    location: "Addis Ababa (Bole)",
    avatar: "/images/avatar_selam.png",
    rating: 5,
    quote: "Finding a 2-bedroom apartment in Bole used to mean scrolling 15 different Telegram groups for weeks. With Delala, I booked a tour on Tuesday and signed my lease on Thursday. Completely stress-free!",
  },
  {
    name: "Abebe Tefera",
    role: "Verified Broker (8+ Years Exp)",
    location: "Addis Ababa (Kazanchis)",
    avatar: "/images/avatar_abebe.png",
    rating: 5,
    quote: "As an honest broker, Delala gave me a verified badge and brought serious buyers straight to me. My clients trust me more because every property I list is verified by Delala.",
  },
  {
    name: "Michael Henderson",
    role: "NGO Representative & Expat",
    location: "Hawassa",
    avatar: "/images/avatar_selam.png",
    rating: 5,
    quote: "Relocating to Hawassa from abroad felt daunting. Delala's verified neighborhood maps and transparent Birr pricing made it easy to find a gorgeous lakeside house before I even landed.",
  },
];

export const FAQ_DATA = [
  {
    question: "Is Delala free for people searching for a home?",
    answer: "Yes! Searching, filtering, viewing photos, exploring interactive map layers, and contacting verified owners or brokers on Delala is 100% free for renters and home buyers.",
  },
  {
    question: "How does Delala verify properties and brokers?",
    answer: "Our local inspection agents physically visit every listed home to verify ownership documents, take original high-res photos, and confirm exact GPS coordinates. Brokers undergo government ID verification and background checks before receiving a Verified badge.",
  },
  {
    question: "Which Ethiopian cities does Delala currently support?",
    answer: "We are actively live in Addis Ababa (all sub-cities), Hawassa, Adama, Bahir Dar, Dire Dawa, and Mekelle, with continuous expansion across all regional hubs.",
  },
  {
    question: "Can I list my own house or apartment directly on Delala?",
    answer: "Absolutely. Property owners can download the Delala App or visit our website to submit a property listing. Our team will contact you within 24 hours for a quick physical verification check.",
  },
  {
    question: "How does Delala prevent lease deposit scams?",
    answer: "We provide standardized legal lease templates approved by Ethiopian legal advisors and recommend verified digital payments or escrow options so you never pay unverified middleman fees.",
  },
];
