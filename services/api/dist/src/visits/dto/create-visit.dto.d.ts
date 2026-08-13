import { VisitStatus } from "../visits.service";
export declare class CreateVisitDto {
    propertyId: string;
    visitDate: string;
}
export declare class UpdateVisitStatusDto {
    status: VisitStatus;
}
