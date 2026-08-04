import { IsEmail, IsString, MinLength, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
  @ApiProperty({ example: "selam@delala.et" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "SecurePass123!" })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: "Selam Tesfaye" })
  @IsString()
  fullName: string;

  @ApiProperty({ example: "BROKER", required: false })
  @IsOptional()
  @IsString()
  role?: string;
}
