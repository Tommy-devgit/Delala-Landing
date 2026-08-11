import { Controller, Get, Param, Patch, Req, UseGuards } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { NotificationsService } from "./notifications.service";
import { SessionAuthGuard } from "../common/guards/session-auth.guard";

/**
 * Notifications belong to one account, so every route reads the user from the
 * session rather than a path parameter.
 */
@ApiTags("notifications")
@ApiBearerAuth()
@UseGuards(SessionAuthGuard)
@Controller("notifications")
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  @ApiOperation({ summary: "Notifications for the signed-in user" })
  findMine(@Req() req: any) {
    return this.notificationsService.findByUser(req.user.id);
  }

  @Get("unread-count")
  @ApiOperation({ summary: "Number of unread notifications, for the navbar badge" })
  unreadCount(@Req() req: any) {
    return this.notificationsService.unreadCount(req.user.id);
  }

  @Patch("read-all")
  @ApiOperation({ summary: "Mark every notification as read" })
  markAllRead(@Req() req: any) {
    return this.notificationsService.markAllRead(req.user.id);
  }

  @Patch(":id/read")
  @ApiOperation({ summary: "Mark one notification as read" })
  markRead(@Param("id") id: string, @Req() req: any) {
    return this.notificationsService.markRead(req.user.id, id);
  }

  @Get("user/:userId")
  @ApiOperation({ summary: "Deprecated. Kept for existing callers; returns the caller's own list." })
  findByUser(@Req() req: any) {
    return this.notificationsService.findByUser(req.user.id);
  }
}
