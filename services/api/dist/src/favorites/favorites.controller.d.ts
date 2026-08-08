import { FavoritesService } from "./favorites.service";
export declare class FavoritesController {
    private readonly favoritesService;
    constructor(favoritesService: FavoritesService);
    toggle(body: {
        userId: string;
        propertyId: string;
    }): Promise<{
        saved: boolean;
    }>;
    findByUser(userId: string): Promise<({
        property: {
            location: {
                type: string;
                latitude: import("@prisma/client/runtime/library").Decimal | null;
                longitude: import("@prisma/client/runtime/library").Decimal | null;
                id: string;
                createdAt: Date | null;
                name: string;
                parentId: string | null;
            };
            images: {
                id: string;
                createdAt: Date | null;
                propertyId: string | null;
                imageUrl: string;
            }[];
        } & {
            description: string | null;
            title: string;
            propertyType: string | null;
            listingType: string | null;
            price: import("@prisma/client/runtime/library").Decimal | null;
            address: string | null;
            latitude: import("@prisma/client/runtime/library").Decimal | null;
            longitude: import("@prisma/client/runtime/library").Decimal | null;
            bedrooms: number | null;
            bathrooms: number | null;
            status: string | null;
            id: string;
            ownerId: string;
            locationId: string;
            area: import("@prisma/client/runtime/library").Decimal | null;
            contactPhone: string | null;
            createdAt: Date | null;
            updatedAt: Date | null;
        };
    } & {
        id: string;
        createdAt: Date | null;
        propertyId: string | null;
        userId: string | null;
    })[]>;
}
