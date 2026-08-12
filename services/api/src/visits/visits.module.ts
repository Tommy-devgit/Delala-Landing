import { Module } from "@nestjs/common";
import { VisitsController } from "./visits.controller";
import { VisitsService } from "./visits.service";
import { NotificationsModule } from "../notifications/notifications.module";

@Module({
  // Requesting a viewing notifies the owner, and a decision notifies the
  // requester, so the notifications service is needed here.
  imports: [NotificationsModule],
  controllers: [VisitsController],
  providers: [VisitsService],
  exports: [VisitsService],
})
export class VisitsModule {}
