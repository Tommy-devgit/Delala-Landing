import { IsString, IsNumber, IsBoolean, IsOptional, IsEnum, IsArray } from "class-validator";
import { Type, Transform } from "class-transformer";
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

  @ApiProperty({ example: "Rent", required: false })
  @IsOptional()
  @IsString()
  listingType?: string;

  @ApiProperty({ example: 65000, required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  rentETB?: number;

  @ApiProperty({ example: 65000, required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  price?: number;

  @ApiProperty({ example: "Addis Ababa", required: false })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({ example: "Bole", required: false })
  @IsOptional()
  @IsString()
  subCity?: string;

  @ApiProperty({ example: "Bole Medhanialem", required: false })
  @IsOptional()
  @IsString()
  neighborhood?: string;

  @ApiProperty({ example: "c1", required: false })
  @IsOptional()
  @IsString()
  cityId?: string;

  @ApiProperty({ example: "n1", required: false })
  @IsOptional()
  @IsString()
  neighborhoodId?: string;

  @ApiProperty({ example: "loc_123", required: false })
  @IsOptional()
  @IsString()
  location_id?: string;

  @ApiProperty({ example: "Atlas Hotel area, Bole Ring Road", required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ example: 4, required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  bedrooms?: number;

  @ApiProperty({ example: 3.5, required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  bathrooms?: number;

  @ApiProperty({ example: 320, required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  areaSqm?: number;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @Transform(({ value }) => value === "true" || value === true)
  @IsBoolean()
  generator?: boolean;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @Transform(({ value }) => value === "true" || value === true)
  @IsBoolean()
  waterTank?: boolean;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @Transform(({ value }) => value === "true" || value === true)
  @IsBoolean()
  parking?: boolean;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @Transform(({ value }) => value === "true" || value === true)
  @IsBoolean()
  furnished?: boolean;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @Transform(({ value }) => value === "true" || value === true)
  @IsBoolean()
  securityGuard?: boolean;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @Transform(({ value }) => value === "true" || value === true)
  @IsBoolean()
  balcony?: boolean;

  @ApiProperty({ example: "b1", required: false })
  @IsOptional()
  @IsString()
  brokerId?: string;

  @ApiProperty({ example: "+251 911 234 567", required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ example: ["https://r2.delala.et/properties/1.jpg"], required: false })
  @IsOptional()
  @IsArray()
  imageUrls?: string[];
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
