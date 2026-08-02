export interface AdminMetrics {
  totalUsers: number;
  activeListings: number;
  pendingApprovals: number;
  verifiedBrokers: number;
  pendingReports: number;
  totalVisitsThisMonth: number;
}

export interface AdminProperty {
  id: string;
  slug: string;
  title: string;
  propertyType: string;
  rentETB: number;
  city: string;
  subCity: string;
  bedrooms: number;
  bathrooms: number;
  status: "APPROVED" | "PENDING_APPROVAL" | "REJECTED";
  rejectionReason?: string;
  fieldAgentNotes?: string;
  brokerName: string;
  submittedAt: string;
}

export interface AdminUser {
  id: string;
  email: string;
  fullName: string;
  role: "GUEST" | "USER" | "OWNER" | "BROKER" | "MODERATOR" | "ADMIN";
  status: "ACTIVE" | "SUSPENDED";
  phone: string;
  joinedAt: string;
}

export interface AdminBroker {
  id: string;
  name: string;
  agencyName: string;
  licenseNumber: string;
  verified: boolean;
  activeListings: number;
  rating: number;
  specializedAreas: string[];
}

export interface AdminReport {
  id: string;
  reporterName: string;
  targetTitle: string;
  reason: string;
  status: "PENDING" | "RESOLVED" | "DISMISSED";
  reportedAt: string;
}

export const ADMIN_METRICS: AdminMetrics = {
  totalUsers: 1420,
  activeListings: 544,
  pendingApprovals: 12,
  verifiedBrokers: 48,
  pendingReports: 3,
  totalVisitsThisMonth: 184,
};

export const ADMIN_PROPERTIES: AdminProperty[] = [
  {
    id: "p1",
    slug: "bole-medhanialem-luxury-residence",
    title: "Bole Medhanialem Modern G+1 Villa",
    propertyType: "Villa",
    rentETB: 65000,
    city: "Addis Ababa",
    subCity: "Bole",
    bedrooms: 4,
    bathrooms: 3.5,
    status: "APPROVED",
    fieldAgentNotes: "45kVA standby generator and 12,000L water reserve verified clean by agent Abebe.",
    brokerName: "Abebe Tesfaye",
    submittedAt: "2026-07-28",
  },
  {
    id: "p2",
    slug: "kazanchis-serviced-studio-apartment",
    title: "Kazanchis Executive Serviced Studio",
    propertyType: "Studio",
    rentETB: 28000,
    city: "Addis Ababa",
    subCity: "Kirkos",
    bedrooms: 1,
    bathrooms: 1,
    status: "PENDING_APPROVAL",
    fieldAgentNotes: "Awaiting physical generator transfer test report.",
    brokerName: "Selamawit Alemu",
    submittedAt: "2026-08-01",
  },
  {
    id: "p3",
    slug: "old-airport-diplomatic-compound-villa",
    title: "Old Airport Diplomatic Family Compound",
    propertyType: "Villa",
    rentETB: 95000,
    city: "Addis Ababa",
    subCity: "Nifas Silk-Lafto",
    bedrooms: 5,
    bathrooms: 4.5,
    status: "APPROVED",
    fieldAgentNotes: "Perimeter electric fence and 20,000L dual tank pump operational.",
    brokerName: "Tigist Haile",
    submittedAt: "2026-07-25",
  },
  {
    id: "p4",
    slug: "cmc-modern-3br-apartment",
    title: "CMC Sun-Drenched 3 Bedroom Apartment",
    propertyType: "Apartment",
    rentETB: 38000,
    city: "Addis Ababa",
    subCity: "Yeka",
    bedrooms: 3,
    bathrooms: 2,
    status: "PENDING_APPROVAL",
    brokerName: "Selamawit Alemu",
    submittedAt: "2026-08-02",
  },
  {
    id: "p5",
    slug: "hawassa-lake-view-resort-villa",
    title: "Hawassa Waterfront Lake View Residence",
    propertyType: "Villa",
    rentETB: 48000,
    city: "Hawassa",
    subCity: "Lake View",
    bedrooms: 3,
    bathrooms: 3,
    status: "APPROVED",
    fieldAgentNotes: "Lakeside villa verified by Agent Dawit Tadesse.",
    brokerName: "Dawit Tadesse",
    submittedAt: "2026-07-29",
  },
];

export const ADMIN_USERS: AdminUser[] = [
  {
    id: "u1",
    email: "abebe@bolepremier.et",
    fullName: "Abebe Tesfaye",
    role: "BROKER",
    status: "ACTIVE",
    phone: "+251 911 234 567",
    joinedAt: "2026-01-15",
  },
  {
    id: "u2",
    email: "selam@capitalhomes.et",
    fullName: "Selamawit Alemu",
    role: "BROKER",
    status: "ACTIVE",
    phone: "+251 912 345 678",
    joinedAt: "2026-02-10",
  },
  {
    id: "u3",
    email: "admin@delala.et",
    fullName: "System SuperAdmin",
    role: "ADMIN",
    status: "ACTIVE",
    phone: "+251 900 000 000",
    joinedAt: "2025-11-01",
  },
  {
    id: "u4",
    email: "dawit.kebede@example.et",
    fullName: "Dawit Kebede",
    role: "USER",
    status: "ACTIVE",
    phone: "+251 911 889 900",
    joinedAt: "2026-05-20",
  },
];

export const ADMIN_BROKERS: AdminBroker[] = [
  {
    id: "b1",
    name: "Abebe Tesfaye",
    agencyName: "Bole Premier Real Estate",
    licenseNumber: "ETH-RE-2024-0091",
    verified: true,
    activeListings: 14,
    rating: 4.9,
    specializedAreas: ["Bole Medhanialem", "Kazanchis", "Old Airport"],
  },
  {
    id: "b2",
    name: "Selamawit Alemu",
    agencyName: "Capital Verified Homes",
    licenseNumber: "ETH-RE-2025-0142",
    verified: true,
    activeListings: 19,
    rating: 4.95,
    specializedAreas: ["CMC", "Kazanchis", "Adama"],
  },
  {
    id: "b3",
    name: "Dawit Tadesse",
    agencyName: "Hawassa Lakeside Living",
    licenseNumber: "ETH-RE-2025-0203",
    verified: true,
    activeListings: 8,
    rating: 4.88,
    specializedAreas: ["Hawassa Lake View", "Tabor Sub-City"],
  },
];

export const ADMIN_REPORTS: AdminReport[] = [
  {
    id: "r1",
    reporterName: "Kassahun Tsegaye",
    targetTitle: "Old Airport Villa Listing #8812",
    reason: "Incorrect monthly rent listed (listed as 50k, broker demanded 70k)",
    status: "PENDING",
    reportedAt: "2026-08-01",
  },
  {
    id: "r2",
    reporterName: "Meron Hailu",
    targetTitle: "Kazanchis Studio #204",
    reason: "Water tank capacity discrepancy",
    status: "RESOLVED",
    reportedAt: "2026-07-28",
  },
];
