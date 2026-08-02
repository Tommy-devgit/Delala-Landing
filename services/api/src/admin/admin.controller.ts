import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { PrismaService } from "../prisma/prisma.service";
import { Roles } from "../common/decorators/roles.decorator";
import { RolesGuard } from "../common/guards/roles.guard";

@ApiTags("admin")
@Controller("admin")
@UseGuards(RolesGuard)
@Roles("ADMIN", "MODERATOR")
export class AdminController {
  constructor(private prisma: PrismaService) {}

  @Get("overview")
  @ApiOperation({ summary: "Get platform administrative overview metrics" })
  async getOverview() {
    const [totalUsers, totalProperties, pendingApprovals, totalBrokers, pendingReports] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.property.count({ where: { status: "APPROVED" } }),
      this.prisma.property.count({ where: { status: "PENDING_APPROVAL" } }),
      this.prisma.broker.count({ where: { verified: true } }),
      this.prisma.report.count({ where: { status: "PENDING" } }),
    ]);

    return {
      metrics: {
        totalUsers,
        totalProperties,
        pendingApprovals,
        totalBrokers,
        pendingReports,
        systemHealth: "100% Operational",
      },
      timestamp: new Date().toISOString(),
    };
  }

  @Get("audit-logs")
  @ApiOperation({ summary: "Get system security audit logs" })
  getAuditLogs() {
    return this.prisma.auditLog.findMany({
      take: 50,
      orderBy: { createdAt: "desc" },
    });
  }
}
