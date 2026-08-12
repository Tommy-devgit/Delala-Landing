import { IsIn, IsISO8601, IsString, IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { VISIT_STATUSES, VisitStatus } from "../visits.service";

export class CreateVisitDto {
  @ApiProperty({ example: "9f1c2b3a-4d5e-4f60-8a71-2b3c4d5e6f70" })
  @IsUUID()
  propertyId: string;

  /**
   * A real timestamp, not a display string.
   *
   * This used to be `scheduledDate: string` alongside a separate `timeSlot`,
   * and the form sent things like "Tomorrow (10:00 AM)" — neither field was
   * ever written to the database, so no visit had a date at all. The requester
   * is taken from the session, which is why `seekerId` and `brokerId` are gone:
   * accepting them meant anyone could book a viewing in someone else's name.
   */
  @ApiProperty({ example: "2026-09-14T10:00:00.000Z" })
  @IsISO8601()
  visitDate: string;
}

export class UpdateVisitStatusDto {
  @ApiProperty({ example: "accepted", enum: VISIT_STATUSES })
  @IsString()
  @IsIn(VISIT_STATUSES as unknown as string[])
  status: VisitStatus;
}
