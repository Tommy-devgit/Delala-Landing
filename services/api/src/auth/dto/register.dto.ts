import { IsEmail, IsString, MinLength } from "class-validator";
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

  @ApiProperty({ example: "USER", required: false })
  role?: string;
}
