import { Body, Controller, Get, Param, Patch, Query, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AdminService } from "./admin.service";
import { Roles } from "../common/decorators/roles.decorator";
import { RolesGuard } from "../common/guards/roles.guard";
import { SessionAuthGuard } from "../common/guards/session-auth.guard";

/**
 * Every route here is staff-only.
 *
 * These endpoints previously had no guard at all, so platform metrics and the
 * security audit log were readable by anyone who knew the URL.
 */
@ApiTags("admin")
@ApiBearerAuth()
@UseGuards(SessionAuthGuard, RolesGuard)
@Roles("ADMIN", "MODERATOR")
@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  private actorId(req: any): string | undefined {
    return req?.user?.id;
  }

  @Get("overview")
  @ApiOperation({ summary: "Headline platform metrics with week-on-week trends" })
  getOverview() {
    return this.adminService.getOverview();
  }

  @Get("analytics")
  @ApiOperation({ summary: "Time series and breakdowns derived from live data" })
  getAnalytics(@Query("days") days?: string) {
    const parsed = Number(days);
    const range = Number.isFinite(parsed) && parsed > 0 && parsed <= 365 ? Math.floor(parsed) : 30;
    return this.adminService.getAnalytics(range);
  }

  @Get("properties")
  @ApiOperation({ summary: "Listings, optionally filtered by moderation status" })
  listProperties(@Query("status") status?: string, @Query("search") search?: string) {
    return this.adminService.listProperties(status, search);
  }

  @Get("users")
  @ApiOperation({ summary: "Platform accounts with role, status and listing counts" })
  listUsers(@Query("search") search?: string) {
    return this.adminService.listUsers(search);
  }

  @Patch("users/:id")
  @Roles("ADMIN")
  @ApiOperation({ summary: "Change a user's role, status, poster type or verification" })
  updateUser(
    @Param("id") id: string,
    @Body()
    body: {
      role?: string;
      status?: string;
      posterType?: string;
      // The only way any verification badge is ever granted. Nothing else in
      // the system writes these, deliberately: a badge that software can award
      // itself is not evidence of anything.
      phoneVerified?: boolean;
      identityVerified?: boolean;
      businessVerified?: boolean;
    },
    @Req() req: any
  ) {
    return this.adminService.updateUser(id, body, this.actorId(req));
  }

  @Get("reports")
  @ApiOperation({ summary: "Listing reports raised by users" })
  listReports() {
    return this.adminService.listReports();
  }

  @Patch("reports/:id")
  @ApiOperation({ summary: "Resolve or dismiss a report" })
  resolveReport(@Param("id") id: string, @Body() body: { status: string }, @Req() req: any) {
    return this.adminService.resolveReport(id, body.status, this.actorId(req));
  }

  @Get("visits")
  @ApiOperation({ summary: "Walkthrough requests" })
  listVisits() {
    return this.adminService.listVisits();
  }

  @Get("locations")
  @ApiOperation({ summary: "Cities, sub-cities or neighborhoods with live listing counts" })
  listLocations(@Query("type") type?: string) {
    const allowed = ["city", "sub_city", "neighborhood"] as const;
    const requested = (type || "city") as (typeof allowed)[number];
    return this.adminService.listLocations(allowed.includes(requested) ? requested : "city");
  }

  @Get("audit-logs")
  @ApiOperation({ summary: "Recent administrative actions" })
  getAuditLogs() {
    return this.adminService.getAuditLogs();
  }
}
