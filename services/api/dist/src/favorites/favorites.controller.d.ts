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
            };
            images: {
                id: string;
                createdAt: Date | null;
                propertyId: string | null;
                imageUrl: string;
            }[];
        } & {
            id: string;
            ownerId: string;
            locationId: string;
            title: string;
            description: string | null;
            propertyType: string | null;
            listingType: string | null;
            price: import("@prisma/client/runtime/library").Decimal | null;
            bedrooms: number | null;
            bathrooms: number | null;
            area: import("@prisma/client/runtime/library").Decimal | null;
            address: string | null;
            contactPhone: string | null;
            status: string | null;
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
