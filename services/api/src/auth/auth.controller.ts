import { Controller, Post, Get, Body, Headers } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  @ApiOperation({ summary: "Register new user via Better Auth integration" })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post("login")
  @ApiOperation({ summary: "Authenticate user and issue session token" })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Get("me")
  @ApiOperation({ summary: "Validate session and fetch user profile" })
  getProfile(@Headers("authorization") authHeader?: string) {
    const token = authHeader?.replace("Bearer ", "") || "";
    return this.authService.validateSession(token);
  }
}
