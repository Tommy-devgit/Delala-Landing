import { Body, Controller, NotFoundException, Post, Req, UseGuards } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";
import { PrismaService } from "../prisma/prisma.service";
import { SessionAuthGuard } from "../common/guards/session-auth.guard";

/**
 * The reasons the report form offers. Kept as a fixed list so the admin queue
 * can group and count them, with the free-text detail carried separately.
 */
export const REPORT_REASONS = [
  "scam",
  "incorrect_information",
  "duplicate_listing",
  "inappropriate_content",
  "fake_property",
  "suspicious_behaviour",
  "other",
] as const;

export class CreateReportDto {
  @IsUUID()
  propertyId: string;

  @IsEnum(REPORT_REASONS)
  reason: (typeof REPORT_REASONS)[number];

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  details?: string;
}

/**
 * Reporting a listing.
 *
 * The `reports` table and the admin queue that reads it both already existed;
 * there was simply no way for anyone to put a row in it, so "Report listing"
 * could not be built and the moderation queue could only ever be empty.
 *
 * `reason` is a single string column, so the structured reason and the
 * reporter's free text are joined into it rather than adding a column the admin
 * dashboard does not read yet.
 */
@ApiTags("reports")
@Controller("reports")
export class ReportsController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @UseGuards(SessionAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Report a property listing" })
  async create(@Body() dto: CreateReportDto, @Req() req: any) {
    const property = await this.prisma.property.findUnique({
      where: { id: dto.propertyId },
      select: { id: true },
    });
    if (!property) throw new NotFoundException("That property does not exist.");

    const reason = dto.details ? `${dto.reason}: ${dto.details}` : dto.reason;

    const report = await this.prisma.report.create({
      data: {
        propertyId: dto.propertyId,
        userId: req.user.id,
        reason,
        status: "open",
      },
    });

    // Only an acknowledgement. What happens to a report is deliberately not
    // disclosed to the reporter.
    return { id: report.id, status: report.status, createdAt: report.createdAt };
  }
}
