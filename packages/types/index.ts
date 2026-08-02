export enum UserRole {
  GUEST = "GUEST",
  USER = "USER",
  OWNER = "OWNER",
  BROKER = "BROKER",
  MODERATOR = "MODERATOR",
  ADMIN = "ADMIN",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  SUSPENDED = "SUSPENDED",
}

export enum PropertyStatus {
  PENDING_APPROVAL = "PENDING_APPROVAL",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  ARCHIVED = "ARCHIVED",
}

export enum PropertyType {
  APARTMENT = "Apartment",
  VILLA = "Villa",
  STUDIO = "Studio",
  G1_RESIDENCE = "G+1 Residence",
  PENTHOUSE = "Penthouse",
  COMMERCIAL = "Commercial Space",
}

export enum VisitStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export enum ReportStatus {
  PENDING = "PENDING",
  RESOLVED = "RESOLVED",
  DISMISSED = "DISMISSED",
}

export interface UserEntity {
  id: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  supabaseUid: string;
  createdAt: string;
  updatedAt: string;
  profile?: ProfileEntity;
}

export interface ProfileEntity {
  id: string;
  userId: string;
  fullName: string;
  avatarUrl?: string;
  phone?: string;
  bio?: string;
  languages: string[];
  verified: boolean;
}

export interface PropertyEntity {
  id: string;
  slug: string;
  title: string;
  description: string;
  propertyType: PropertyType;
  rentETB: number;
  cityId: string;
  neighborhoodId: string;
  bedrooms: number;
  bathrooms: number;
  areaSqm: number;
  generator: boolean;
  waterTank: boolean;
  parking: boolean;
  furnished: boolean;
  securityGuard: boolean;
  balcony: boolean;
  status: PropertyStatus;
  rejectionReason?: string;
  fieldAgentNotes?: string;
  brokerId: string;
  ownerId?: string;
  createdAt: string;
  updatedAt: string;
  images?: PropertyImageEntity[];
}

export interface PropertyImageEntity {
  id: string;
  propertyId: string;
  url: string;
  displayOrder: number;
  isHero: boolean;
}

export interface CityEntity {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  startingRentETB: number;
  propertiesCount: number;
}

export interface NeighborhoodEntity {
  id: string;
  slug: string;
  name: string;
  subCity: string;
  cityId: string;
  securityScore: number;
  generatorPenetration: string;
  waterReliability: string;
  averageRentETB: number;
}

export interface BrokerEntity {
  id: string;
  slug: string;
  userId: string;
  agencyName: string;
  licenseNumber: string;
  verified: boolean;
  rating: number;
  reviewsCount: number;
  responseTime: string;
  specializedAreas: string[];
}

export interface AuditLogEntity {
  id: string;
  userId: string;
  action: string;
  targetEntity: string;
  entityId: string;
  details: string;
  createdAt: string;
}
