export declare class CreatePropertyDto {
    title: string;
    description: string;
    propertyType: string;
    listingType?: string;
    rentETB?: number;
    price?: number;
    city?: string;
    subCity?: string;
    neighborhood?: string;
    cityId?: string;
    neighborhoodId?: string;
    location_id?: string;
    address?: string;
    latitude?: number;
    longitude?: number;
    bedrooms?: number;
    bathrooms?: number;
    areaSqm?: number;
    generator?: boolean;
    waterTank?: boolean;
    parking?: boolean;
    furnished?: boolean;
    securityGuard?: boolean;
    balcony?: boolean;
    internet?: boolean;
    brokerId?: string;
    phone?: string;
    imageUrls?: string[];
}
export declare class ModeratePropertyDto {
    status: "APPROVED" | "REJECTED";
    rejectionReason?: string;
    fieldAgentNotes?: string;
}
