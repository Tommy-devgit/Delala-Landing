import { PrismaService } from "../prisma/prisma.service";
export declare const REPORT_REASONS: readonly ["scam", "incorrect_information", "duplicate_listing", "inappropriate_content", "fake_property", "suspicious_behaviour", "other"];
export declare class CreateReportDto {
    propertyId: string;
    reason: (typeof REPORT_REASONS)[number];
    details?: string;
}
export declare class ReportsController {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateReportDto, req: any): Promise<{
        id: string;
        status: string;
        createdAt: Date;
    }>;
}
