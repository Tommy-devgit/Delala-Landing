export interface NavItem {
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
];

export const STATS_DATA = [
  { value: "2,000+", label: "Verified Homes", subtext: "Physically inspected on the ground" },
  { value: "500+", label: "Certified Brokers", subtext: "Government ID & license checked" },
  { value: "15+", label: "Regional Hubs", subtext: "Active across major Ethiopian cities" },
  { value: "98%", label: "Trust Rating", subtext: "Zero middleman price markups" },
];

export const HERO_EDITORIAL_CONTENT = {
  headline: "Find a place you can call home.",
  subheadline: "Delala connects people searching for homes with trusted owners and verified brokers across Ethiopia.",
  description: "By replacing chaotic social media groups and unverified street brokers with physical in-person inspections, transparent Birr pricing, and legal lease protections, we're building Ethiopia's most trusted housing marketplace.",
  trustBadges: ["100% In-Person Inspected", "ID-Verified Owners & Brokers", "Transparent Birr Pricing"],
};

export const STORY_SECTIONS = {
  problem: {
    tag: "The Challenge",
    title: "House hunting in Ethiopia was fundamentally broken.",
    paragraphs: [
      "For decades, finding an apartment or house in Addis Ababa, Hawassa, or Adama meant navigating chaotic, unverified Telegram channels and unorganized Facebook posts.",
      "Renters routinely faced fake property photos, unexpected price increases at the door, and unverified middlemen demanding upfront cash just to reveal a phone number. With no standardized lease contracts or deposit guarantees, trust was nonexistent.",
    ],
  },
  solution: {
    tag: "The Delala Solution",
    title: "Physical verification meets digital simplicity.",
    paragraphs: [
      "Delala changes everything. Every property listed on our platform is physically visited by a local Delala agent. We inspect the home's condition, verify ownership land documents, record exact GPS coordinates, and capture high-resolution photography.",
      "No hidden broker markups. No outdated listings. Just clear Birr prices, identity-checked owners, and legal lease templates that protect both sides.",
    ],
  },
};

export const TWO_SIDED_BENEFITS = {
  seekers: {
    title: "For Home Seekers",
    badge: "Renters & Buyers",
    benefits: [
      {
        title: "100% Physically Visited Listings",
        desc: "Every photo and detail is confirmed in person by our field inspectors before going live.",
      },
      {
        title: "Transparent Monthly Birr Rent",
        desc: "See exact rental prices in ETB upfront. Zero surprise fee hikes when you meet.",
      },
      {
        title: "Direct Owner & Agent Walkthroughs",
        desc: "Book physical viewings in one click without paying cash to get contact details.",
      },
      {
        title: "Standardized Legal Protection",
        desc: "Lease contracts created with legal advisors to safeguard your security deposit.",
      },
    ],
  },
  sharers: {
    title: "For Property Owners & Brokers",
    badge: "Landlords & Certified Brokers",
    benefits: [
      {
        title: "Verified Tenant Leads",
        desc: "Connect directly with identity-checked renters looking for quality homes.",
      },
      {
        title: "Free In-Person Inspection",
        desc: "Our field team photographs and verifies your property at zero upfront cost.",
      },
      {
        title: "Professional Listing Tools",
        desc: "Manage inquiries, schedule tour slots, and finalize agreements digitally.",
      },
      {
        title: "Elevated Reputation",
        desc: "Certified Delala broker badges build instant trust with prospective tenants.",
      },
    ],
  },
};

export const DETAILED_FEATURES = [
  {
    id: "physical-verification",
    tag: "Verification First",
    title: "100% Physically Inspected Properties",
    description: "Our local field agents physically walk through every home, inspect the structural condition, confirm generator & water backup functionality, and verify legal ownership paperwork.",
    icon: "ShieldCheck",
    image: "/images/hero_home_away.jpg",
    highlights: ["In-person document check", "GPS coordinate logging", "High-res realistic photo audit"],
  },
  {
    id: "neighborhood-search",
    tag: "Location Precision",
    title: "Neighborhood & Sub-City Map Layers",
    description: "Search homes by exact sub-cities—Bole, Kazanchis, Old Airport, CMC, Sarbet—and view distance layers to light rail stations, supermarkets, international schools, and hospitals.",
    icon: "MapPin",
    image: "/images/city_addis_ababa.png",
    highlights: ["Sub-city boundary filter", "Light rail & transport proximity", "School & market overlays"],
  },
  {
    id: "transparent-pricing",
    tag: "Financial Clarity",
    title: "Upfront Birr Pricing with Zero Markups",
    description: "Clear monthly rental prices in Ethiopian Birr. No hidden middleman commissions added to the rent price, and zero fees for house hunters to schedule walkthroughs.",
    icon: "SlidersHorizontal",
    image: "/images/city_hawassa.png",
    highlights: ["Clear monthly Birr prices", "Zero listing markups", "Deposit requirement breakdown"],
  },
  {
    id: "direct-communication",
    tag: "Direct Access",
    title: "Direct Chat with Verified Owners",
    description: "Communicate directly with identity-verified property managers and certified brokers through in-app messaging or WhatsApp without cash barriers.",
    icon: "MessageSquare",
    image: "/images/city_adama.png",
    highlights: ["Verified owner profiles", "Instant tour scheduling", "WhatsApp & phone integration"],
  },
  {
    id: "legal-protection",
    tag: "Legal Security",
    title: "Standardized Ethiopian Lease Guarantees",
    description: "Access standardized lease templates drafted by Ethiopian real estate legal specialists to protect security deposit return terms and tenancy rights.",
    icon: "FileText",
    image: "/images/city_bahir_dar.png",
    highlights: ["Specialist legal templates", "Deposit protection terms", "Digital contract signing"],
  },
];

export const SEEKER_JOURNEY = [
  {
    step: "01",
    title: "Discover Verified Homes",
    subtitle: "Filter by budget, location & amenities",
    description: "Browse physically inspected apartments and homes across Addis Ababa, Hawassa, Adama, Bahir Dar, and regional hubs. Filter by price in Birr, generator availability, water tank size, and sub-city.",
  },
  {
    step: "02",
    title: "Schedule a Physical Walkthrough",
    subtitle: "Book viewings in one click",
    description: "Select an available viewing slot or chat directly with the verified owner or certified broker to confirm a convenient walkthrough time.",
  },
  {
    step: "03",
    title: "Sign & Move In Securely",
    subtitle: "Transparent legal lease protection",
    description: "Finalize your agreement using standardized legal contract templates. Move into your new home with complete peace of mind and deposit safety.",
  },
];

export const OWNER_JOURNEY = [
  {
    step: "01",
    title: "Submit Property Details",
    subtitle: "Quick 2-minute mobile listing",
    description: "Enter your property details, location, and monthly rent price in Birr through the Delala app or owner web portal.",
  },
  {
    step: "02",
    title: "Free In-Person Verification",
    subtitle: "Delala agent field inspection",
    description: "Our local field team visits your property to take high-resolution photos, verify ownership documents, and issue your Verified Property Badge.",
  },
  {
    step: "03",
    title: "Receive Qualified Inquiries",
    subtitle: "Connect directly with serious tenants",
    description: "Manage viewing requests, chat directly with ID-checked house hunters, and execute transparent lease contracts effortlessly.",
  },
];

export const COMPANY_STORY = {
  whyExists: "Delala was founded to solve a real human problem: finding a home in Ethiopia should be inspiring, transparent, and safe—not chaotic, fraudulent, and stressful.",
  mission: "To digitize the Ethiopian housing market by establishing physical verification standards, upfront Birr pricing, and legal lease protections for every renter, owner, and broker.",
  vision: "To become the undisputed, trusted housing infrastructure across all 15+ regional hubs in Ethiopia.",
  values: [
    {
      title: "Physical Trust First",
      desc: "We physically visit every property on the ground before it ever reaches our app.",
    },
    {
      title: "Radical Transparency",
      desc: "Upfront Birr prices with zero hidden middleman fees or surprise price hikes at the door.",
    },
    {
      title: "Legal Protection",
      desc: "Standardized lease agreements created with legal advisors to safeguard deposits.",
    },
    {
      title: "Community Honor",
      desc: "Empowering honest local brokers and owners with digital tools that elevate their reputation.",
    },
  ],
};

export const CATEGORIZED_FAQ = [
  {
    category: "For Home Seekers & Renters",
    questions: [
      {
        q: "Is searching and booking walkthroughs on Delala free?",
        a: "Yes, 100% free! Searching properties, filtering by neighborhood, viewing verified photos, and contacting verified owners or brokers costs nothing for renters.",
      },
      {
        q: "How do I know the photos and prices are accurate?",
        a: "Our field agents physically visit every property to take photos, inspect amenities (generators, water tanks, parking), and verify the monthly rent price in Ethiopian Birr.",
      },
      {
        q: "What happens if a broker asks for upfront cash before a tour?",
        a: "Report them immediately. Certified Delala brokers never demand upfront viewing fees. Viewings are arranged transparently through our platform.",
      },
    ],
  },
  {
    category: "For Property Owners & Brokers",
    questions: [
      {
        q: "How do I list my property on Delala?",
        a: "Property owners and certified brokers can submit property details through the Delala mobile app or website. Our field team will schedule a free physical inspection before publishing.",
      },
      {
        q: "What are the requirements for broker certification?",
        a: "Brokers must provide official government ID, phone verification, and agree to Delala's Transparent Commission Code of Conduct.",
      },
      {
        q: "Are there upfront fees to list a home?",
        a: "No! Listing your property and receiving physical inspection visits is free.",
      },
    ],
  },
  {
    category: "Verification & Legal Guarantees",
    questions: [
      {
        q: "How does Delala protect security deposits?",
        a: "We provide standardized legal lease agreement templates that explicitly define deposit return conditions, notice periods, and maintenance obligations.",
      },
      {
        q: "What documents are required for physical verification?",
        a: "Property owners provide title deeds or official lease certificates, and field agents confirm matching national ID credentials.",
      },
    ],
  },
  {
    category: "Cities & Regional Coverage",
    questions: [
      {
        q: "Which Ethiopian cities does Delala support?",
        a: "Delala is active in Addis Ababa (all sub-cities: Bole, Kazanchis, Old Airport, CMC, Sarbet, etc.), Hawassa, Adama, Bahir Dar, Dire Dawa, and Mekelle.",
      },
      {
        q: "Are you expanding to other regional hubs?",
        a: "Yes, we are actively expanding physical verification operations to Jimma, Gondar, Dessie, and Arba Minch.",
      },
    ],
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
    image: "/images/hero_home_away.jpg",
    popularAreas: ["Kedamay Weyane", "Adi Haki", "Ayder"],
  },
];

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
