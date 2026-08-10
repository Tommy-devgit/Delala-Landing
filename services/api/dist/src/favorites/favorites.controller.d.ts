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
                id: string;
                createdAt: Date | null;
                name: string;
                type: string;
                parentId: string | null;
                latitude: import("@prisma/client/runtime/library").Decimal | null;
                longitude: import("@prisma/client/runtime/library").Decimal | null;
            };
            images: {
                id: string;
                createdAt: Date | null;
                propertyId: string | null;
                imageUrl: string;
            }[];
        } & {
            id: string;
            createdAt: Date | null;
            status: string | null;
            updatedAt: Date | null;
            latitude: import("@prisma/client/runtime/library").Decimal | null;
            longitude: import("@prisma/client/runtime/library").Decimal | null;
            description: string | null;
            price: import("@prisma/client/runtime/library").Decimal | null;
            bedrooms: number | null;
            bathrooms: number | null;
            area: import("@prisma/client/runtime/library").Decimal | null;
            ownerId: string;
            locationId: string;
            title: string;
            propertyType: string | null;
            listingType: string | null;
            address: string | null;
            contactPhone: string | null;
        };
    } & {
        id: string;
        createdAt: Date | null;
        userId: string | null;
        propertyId: string | null;
    })[]>;
}
