import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { VisitsService } from "./visits.service";
import { CreateVisitDto, UpdateVisitStatusDto } from "./dto/create-visit.dto";
import { SessionAuthGuard } from "../common/guards/session-auth.guard";

/**
 * Viewing requests.
 *
 * Every route is behind the session guard. Both were open before: anyone could
 * book a viewing as anybody by putting their id in the body, and `GET /visits`
 * returned every viewing in the system — property, requester name and phone —
 * to an unauthenticated caller.
 */
@ApiTags("visits")
@ApiBearerAuth()
@UseGuards(SessionAuthGuard)
@Controller("visits")
export class VisitsController {
  constructor(private readonly visitsService: VisitsService) {}

  @Post()
  @ApiOperation({ summary: "Request a viewing of a property" })
  create(@Body() dto: CreateVisitDto, @Req() req: any) {
    return this.visitsService.create(req.user.id, dto);
  }

  @Get()
  @ApiOperation({ summary: "Viewings the caller requested, plus those on properties they own" })
  findMine(@Req() req: any) {
    return this.visitsService.findForUser(req.user.id);
  }

  @Patch(":id/status")
  @ApiOperation({ summary: "Accept, decline, complete or cancel a viewing request" })
  updateStatus(@Param("id") id: string, @Body() dto: UpdateVisitStatusDto, @Req() req: any) {
    return this.visitsService.updateStatus(req.user.id, id, dto);
  }
}
