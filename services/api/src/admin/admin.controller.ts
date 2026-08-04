import { Controller, Get } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { PrismaService } from "../prisma/prisma.service";

@ApiTags("admin")
@Controller("admin")
export class AdminController {
  constructor(private prisma: PrismaService) {}

  @Get("overview")
  @ApiOperation({ summary: "Get platform administrative overview metrics" })
  async getOverview() {
    const [totalUsers, totalProperties, pendingApprovals, totalBrokers, pendingReports] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.property.count({ where: { status: "approved" } }),
      this.prisma.property.count({ where: { status: "pending" } }),
      this.prisma.profile.count({ where: { role: "broker" } }),
      this.prisma.report.count({ where: { status: "open" } }),
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
