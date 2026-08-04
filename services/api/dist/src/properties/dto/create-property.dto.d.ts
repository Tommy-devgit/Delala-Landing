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
    bedrooms?: number;
    bathrooms?: number;
    areaSqm?: number;
    generator?: boolean;
    waterTank?: boolean;
    parking?: boolean;
    furnished?: boolean;
    securityGuard?: boolean;
    balcony?: boolean;
    brokerId?: string;
    imageUrls?: string[];
}
export declare class ModeratePropertyDto {
    status: "APPROVED" | "REJECTED";
    rejectionReason?: string;
    fieldAgentNotes?: string;
}
