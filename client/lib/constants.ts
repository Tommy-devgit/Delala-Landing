export interface NavItem {
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Listings", href: "#features" },
  { label: "Cities", href: "#cities" },
  { label: "How it Works", href: "#how-it-works" },
];

export const STATS_DATA = [
  { value: "2,000+", label: "Verified Properties", subtext: "Inspected in person" },
  { value: "500+", label: "Trusted Brokers", subtext: "ID-checked experts" },
  { value: "15+", label: "Cities Covered", subtext: "Across regional hubs" },
  { value: "98%", label: "Satisfaction Rate", subtext: "Happy home hunters" },
];

export const FEATURES_DATA = [
  {
    id: "verified-listings",
    title: "100% Verified Listings",
    description: "Every single home and apartment is physically visited, photographed, and legal paperwork confirmed by our local team.",
    icon: "ShieldCheck",
  },
  {
    id: "advanced-search",
    title: "Precision Ethiopian Filters",
    description: "Filter by monthly rent in ETB, exact neighborhood (Bole, Kazanchis, Old Airport), house type (G+1, Condo, Villa), and amenities.",
    icon: "SlidersHorizontal",
  },
  {
    id: "trusted-brokers",
    title: "Certified Local Brokers",
    description: "Connect with official, identity-verified brokers with public rating histories and transparent standard commission rates.",
    icon: "UserCheck",
  },
  {
    id: "favorites-alerts",
    title: "Instant SMS & Push Alerts",
    description: "Save favorite searches and get instant alerts via SMS or app notification as soon as a matching home is available.",
    icon: "BellRing",
  },
  {
    id: "realtime-availability",
    title: "Live Property Status",
    description: "No more calling about homes rented months ago. Real-time availability updates keep listings fresh and accurate.",
    icon: "Clock",
  },
  {
    id: "map-search",
    title: "Neighborhood Map Search",
    description: "Explore nearby schools, light rail stations, supermarkets, and taxi stands directly on our interactive map layer.",
    icon: "MapPin",
  },
  {
    id: "fast-contact",
    title: "Direct Owner & Agent Chat",
    description: "Message or call verified owners directly through WhatsApp or in-app calling with zero middleman markups.",
    icon: "MessageSquare",
  },
  {
    id: "secure-platform",
    title: "Legal & Lease Guarantee",
    description: "Access standardized Ethiopian lease agreement templates and legal advisory support to protect your security deposit.",
    icon: "FileText",
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    number: "01",
    title: "Search & Filter",
    subtitle: "Explore verified homes near you",
    description: "Use custom filters tailored to Ethiopia: monthly budget in Birr, specific sub-city, furnished options, and generator availability.",
    icon: "Search",
  },
  {
    number: "02",
    title: "Connect Directly",
    subtitle: "Talk to verified owners or brokers",
    description: "Schedule a physical walkthrough in one click. Chat directly with identity-checked owners or trusted local brokers.",
    icon: "Users",
  },
  {
    number: "03",
    title: "Move In Securely",
    subtitle: "Sign transparent lease contracts",
    description: "Finalize your agreement using standardized, legal lease protection templates. Move into your new home with total confidence.",
    icon: "KeyRound",
  },
];

export const POPULAR_CITIES = [
  {
    name: "Addis Ababa",
    propertiesCount: "1,240+ properties",
    startingPrice: "From 18,000 ETB/mo",
    image: "/images/city_addis_ababa.png",
    popularAreas: ["Bole", "Kazanchis", "Old Airport", "CMC", "Sarbet"],
  },
  {
    name: "Hawassa",
    propertiesCount: "380+ properties",
    startingPrice: "From 12,000 ETB/mo",
    image: "/images/city_hawassa.png",
    popularAreas: ["Lakeside", "Tabor", "Haile Resort Area"],
  },
  {
    name: "Adama",
    propertiesCount: "290+ properties",
    startingPrice: "From 10,000 ETB/mo",
    image: "/images/city_adama.png",
    popularAreas: ["Expressway Zone", "Posta Bet", "Bole Adama"],
  },
  {
    name: "Bahir Dar",
    propertiesCount: "220+ properties",
    startingPrice: "From 11,500 ETB/mo",
    image: "/images/city_bahir_dar.png",
    popularAreas: ["Lake Tana View", "Belay Zeleke", "Kebele 14"],
  },
  {
    name: "Dire Dawa",
    propertiesCount: "180+ properties",
    startingPrice: "From 9,000 ETB/mo",
    image: "/images/city_addis_ababa.png",
    popularAreas: ["Kazira", "Megala", "Taiwan Market Area"],
  },
  {
    name: "Mekelle",
    propertiesCount: "150+ properties",
    startingPrice: "From 9,500 ETB/mo",
    image: "/images/hero_property.png",
    popularAreas: ["Kedamay Weyane", "Adi Haki", "Ayder"],
  },
];

export const COMPARISON_DATA = {
  traditional: {
    title: "Traditional House Hunting",
    subtitle: "Telegram channels & unverified brokers",
    points: [
      "Chaotic Telegram groups flooded with outdated listings",
      "Unverified brokers demanding upfront cash before viewing",
      "Fake photos and prices changed at the door",
      "Endless phone calls and wasted weekend trips",
      "Zero legal contracts or security deposit guarantees",
    ],
  },
  delala: {
    title: "Delala",
    subtitle: "The modern digital platform",
    points: [
      "100% physically inspected & verified property listings",
      "Government ID-checked brokers with verified ratings",
      "Transparent ETB pricing with zero hidden fees",
      "1-click walkthrough scheduling & direct owner chat",
      "Standardized lease agreements & legal deposit protection",
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
    quote: "Finding an apartment in Bole used to mean scrolling dozens of Telegram groups. With Delala, I booked a tour and signed my lease in two days.",
  },
  {
    name: "Abebe Tefera",
    role: "Verified Broker",
    location: "Addis Ababa (Kazanchis)",
    avatar: "/images/avatar_abebe.png",
    rating: 5,
    quote: "Delala brought serious buyers directly to me. My clients trust me more because every property is verified on the platform.",
  },
  {
    name: "Michael Henderson",
    role: "NGO Representative",
    location: "Hawassa",
    avatar: "/images/avatar_selam.png",
    rating: 5,
    quote: "Relocating to Hawassa was easy. Delala's verified maps and Birr pricing made it simple to find a house before I arrived.",
  },
];

export const FAQ_DATA = [
  {
    question: "Is Delala free for house hunters?",
    answer: "Yes. Searching, viewing verified photos, exploring map layers, and contacting verified owners or brokers on Delala is 100% free for renters and buyers.",
  },
  {
    question: "How are properties and brokers verified?",
    answer: "Our team physically visits listed properties to confirm ownership documents, take photos, and record GPS coordinates. Brokers complete government ID verification.",
  },
  {
    question: "Which cities are supported?",
    answer: "Delala is live in Addis Ababa, Hawassa, Adama, Bahir Dar, Dire Dawa, and Mekelle, with expanding coverage across regional hubs.",
  },
  {
    question: "Can I list my own property?",
    answer: "Yes. Property owners can submit listings through the app or website. Our team conducts a quick physical verification check before publishing.",
  },
  {
    question: "How are lease deposits protected?",
    answer: "We provide standardized legal lease templates approved by legal advisors and recommend verified digital payments to prevent middleman fraud.",
  },
];
