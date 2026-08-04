export declare class CreatePropertyDto {
    title: string;
    description: string;
    propertyType: string;
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
    securityGuard?: boolean;
    balcony?: boolean;
    brokerId: string;
}
export declare class ModeratePropertyDto {
    status: "APPROVED" | "REJECTED";
    rejectionReason?: string;
    fieldAgentNotes?: string;
}
