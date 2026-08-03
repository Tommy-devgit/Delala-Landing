import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateVisitDto {
  @ApiProperty({ example: "p1" })
  @IsString()
  propertyId: string;

  @ApiProperty({ example: "u1" })
  @IsString()
  seekerId: string;

  @ApiProperty({ example: "b1" })
  @IsString()
  brokerId: string;

  @ApiProperty({ example: "2026-08-10" })
  @IsString()
  scheduledDate: string;

  @ApiProperty({ example: "10:00 AM" })
  @IsString()
  timeSlot: string;
}
