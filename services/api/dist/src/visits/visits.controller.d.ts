import { VisitsService } from "./visits.service";
import { CreateVisitDto, UpdateVisitStatusDto } from "./dto/create-visit.dto";
export declare class VisitsController {
    private readonly visitsService;
    constructor(visitsService: VisitsService);
    create(dto: CreateVisitDto, req: any): Promise<{
        id: string;
        userId: string | null;
        propertyId: string | null;
        visitDate: Date | null;
        status: string | null;
        createdAt: Date | null;
    }>;
    findMine(req: any): Promise<{
        id: any;
        status: any;
        visitDate: any;
        createdAt: any;
        property: any;
        role: string;
        requester: {
            id: any;
            name: string;
            phone: any;
        };
    }[]>;
    updateStatus(id: string, dto: UpdateVisitStatusDto, req: any): Promise<{
        id: string;
        userId: string | null;
        propertyId: string | null;
        visitDate: Date | null;
        status: string | null;
        createdAt: Date | null;
    }>;
}
