import { IsString, IsNumber, IsBoolean, IsOptional, IsEnum } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePropertyDto {
  @ApiProperty({ example: "Bole Medhanialem Modern Villa" })
  @IsString()
  title: string;

  @ApiProperty({ example: "Luxury 4-bedroom villa with generator and water tank" })
  @IsString()
  description: string;

  @ApiProperty({ example: "Villa" })
  @IsString()
  propertyType: string;

  @ApiProperty({ example: 65000 })
  @IsNumber()
  rentETB: number;

  @ApiProperty({ example: "c1" })
  @IsString()
  cityId: string;

  @ApiProperty({ example: "n1" })
  @IsString()
  neighborhoodId: string;

  @ApiProperty({ example: 4 })
  @IsNumber()
  bedrooms: number;

  @ApiProperty({ example: 3.5 })
  @IsNumber()
  bathrooms: number;

  @ApiProperty({ example: 320 })
  @IsNumber()
  areaSqm: number;

  @ApiProperty({ example: true })
  @IsBoolean()
  generator: boolean;

  @ApiProperty({ example: true })
  @IsBoolean()
  waterTank: boolean;

  @ApiProperty({ example: true })
  @IsBoolean()
  parking: boolean;

  @ApiProperty({ example: true })
  @IsBoolean()
  furnished: boolean;

  @ApiProperty({ example: "b1" })
  @IsString()
  brokerId: string;
}

export class ModeratePropertyDto {
  @ApiProperty({ example: "APPROVED", enum: ["APPROVED", "REJECTED"] })
  @IsEnum(["APPROVED", "REJECTED"])
  status: "APPROVED" | "REJECTED";

  @ApiProperty({ example: "Title deed verified", required: false })
  @IsOptional()
  @IsString()
  rejectionReason?: string;

  @ApiProperty({ example: "Inspected by agent Abebe. Generator auto-switch functional.", required: false })
  @IsOptional()
  @IsString()
  fieldAgentNotes?: string;
}
