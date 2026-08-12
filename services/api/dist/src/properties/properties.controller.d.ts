import { PropertiesService, PropertyQuery } from "./properties.service";
import { CreatePropertyDto, ModeratePropertyDto } from "./dto/create-property.dto";
import { R2StorageService } from "../storage/r2-storage.service";
import { AdminService } from "../admin/admin.service";
import { NotificationsService } from "../notifications/notifications.service";
export declare class PropertiesController {
    private readonly propertiesService;
    private readonly r2StorageService;
    private readonly adminService;
    private readonly notifications;
    constructor(propertiesService: PropertiesService, r2StorageService: R2StorageService, adminService: AdminService, notifications: NotificationsService);
    findAll(query: PropertyQuery): Promise<{
        data: {
            id: any;
            slug: string;
            title: any;
            description: any;
            propertyType: any;
            listingType: any;
            rentETB: number;
            bedrooms: any;
            bathrooms: number;
            areaSqm: number;
            generator: any;
            waterTank: any;
            parking: any;
            furnished: any;
            securityGuard: any;
            balcony: any;
            internet: any;
            status: string;
            subCity: string;
            city: string;
            neighborhood: string;
            address: any;
            latitude: number;
            longitude: number;
            cityId: any;
            neighborhoodId: any;
            brokerId: any;
            phone: any;
            createdAt: any;
            updatedAt: any;
            cityEntity: {
                id: any;
                name: string;
                slug: string;
            };
            neighborhoodEntity: {
                id: any;
                name: string;
                subCity: string;
            };
            broker: {
                id: any;
                agencyName: string;
                name: string;
                phone: any;
                posterType: any;
                verification: {
                    phone: boolean;
                    identity: boolean;
                    business: boolean;
                };
                user: {
                    profile: {
                        fullName: string;
                        avatarUrl: any;
                    };
                };
            };
            images: any;
        }[];
        total: number;
        page: number;
        pageSize: number;
        totalPages: number;
    }>;
    facets(): Promise<{
        total: number;
        propertyTypes: {
            value: string;
            label: string;
            count: number;
        }[];
        listingTypes: {
            value: string;
            count: number;
        }[];
        cities: {
            id: string;
            name: string;
            count: number;
        }[];
    }>;
    findOne(slug: string): Promise<{
        id: any;
        slug: string;
        title: any;
        description: any;
        propertyType: any;
        listingType: any;
        rentETB: number;
        bedrooms: any;
        bathrooms: number;
        areaSqm: number;
        generator: any;
        waterTank: any;
        parking: any;
        furnished: any;
        securityGuard: any;
        balcony: any;
        internet: any;
        status: string;
        subCity: string;
        city: string;
        neighborhood: string;
        address: any;
        latitude: number;
        longitude: number;
        cityId: any;
        neighborhoodId: any;
        brokerId: any;
        phone: any;
        createdAt: any;
        updatedAt: any;
        cityEntity: {
            id: any;
            name: string;
            slug: string;
        };
        neighborhoodEntity: {
            id: any;
            name: string;
            subCity: string;
        };
        broker: {
            id: any;
            agencyName: string;
            name: string;
            phone: any;
            posterType: any;
            verification: {
                phone: boolean;
                identity: boolean;
                business: boolean;
            };
            user: {
                profile: {
                    fullName: string;
                    avatarUrl: any;
                };
            };
        };
        images: any;
    }>;
    uploadImage(file: Express.Multer.File): Promise<{
        url: string;
    }>;
    create(createDto: CreatePropertyDto, files?: Express.Multer.File[], authorization?: string): Promise<{
        id: any;
        slug: string;
        title: any;
        description: any;
        propertyType: any;
        listingType: any;
        rentETB: number;
        bedrooms: any;
        bathrooms: number;
        areaSqm: number;
        generator: any;
        waterTank: any;
        parking: any;
        furnished: any;
        securityGuard: any;
        balcony: any;
        internet: any;
        status: string;
        subCity: string;
        city: string;
        neighborhood: string;
        address: any;
        latitude: number;
        longitude: number;
        cityId: any;
        neighborhoodId: any;
        brokerId: any;
        phone: any;
        createdAt: any;
        updatedAt: any;
        cityEntity: {
            id: any;
            name: string;
            slug: string;
        };
        neighborhoodEntity: {
            id: any;
            name: string;
            subCity: string;
        };
        broker: {
            id: any;
            agencyName: string;
            name: string;
            phone: any;
            posterType: any;
            verification: {
                phone: boolean;
                identity: boolean;
                business: boolean;
            };
            user: {
                profile: {
                    fullName: string;
                    avatarUrl: any;
                };
            };
        };
        images: any;
    }>;
    moderate(id: string, moderateDto: ModeratePropertyDto, req?: any): Promise<{
        id: any;
        slug: string;
        title: any;
        description: any;
        propertyType: any;
        listingType: any;
        rentETB: number;
        bedrooms: any;
        bathrooms: number;
        areaSqm: number;
        generator: any;
        waterTank: any;
        parking: any;
        furnished: any;
        securityGuard: any;
        balcony: any;
        internet: any;
        status: string;
        subCity: string;
        city: string;
        neighborhood: string;
        address: any;
        latitude: number;
        longitude: number;
        cityId: any;
        neighborhoodId: any;
        brokerId: any;
        phone: any;
        createdAt: any;
        updatedAt: any;
        cityEntity: {
            id: any;
            name: string;
            slug: string;
        };
        neighborhoodEntity: {
            id: any;
            name: string;
            subCity: string;
        };
        broker: {
            id: any;
            agencyName: string;
            name: string;
            phone: any;
            posterType: any;
            verification: {
                phone: boolean;
                identity: boolean;
                business: boolean;
            };
            user: {
                profile: {
                    fullName: string;
                    avatarUrl: any;
                };
            };
        };
        images: any;
    }>;
}
