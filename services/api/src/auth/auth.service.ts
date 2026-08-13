import { Injectable, UnauthorizedException, BadRequestException, Logger } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { randomUUID } from "crypto";
import {
  generateResetToken,
  hashPassword,
  hashResetToken,
  resetTokenMatches,
  verifyPassword,
} from "../common/password";
import { issueSessionToken, verifySessionToken } from "../common/session-token";

/**
 * The same answer for "no such account" and "wrong password", so the endpoint
 * cannot be used to enumerate which emails are registered.
 */
const BAD_CREDENTIALS = "Email or password is incorrect.";

/**
 * Hashed against when the email does not exist, so that a missing account costs
 * the same ~50ms as a wrong password. Without it the endpoint answers much
 * faster for unknown emails, which reinstates the enumeration that the shared
 * error message above is there to prevent. The password behind this digest is
 * random and was discarded.
 */
const DECOY_DIGEST =
  "scrypt$16384$8$1$y2i8H8N2hkbXiwy6QJH8/Q==$RB663gFQFvRph5lMr4VqEEYGM5A8BlVnTEXOSAc0p2f6zeFmSLHqlJVJZ6U8nR74t27LGvSJCdkEdZ32yk4X2A==";

/** The fields login needs. `passwordHash` is selected explicitly because
 *  PrismaService omits it globally. */
const LOGIN_PROFILE_FIELDS = {
  firstName: true,
  lastName: true,
  role: true,
  status: true,
  avatarUrl: true,
  phone: true,
  passwordHash: true,
} as const;

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private prisma: PrismaService) {}

  async register(dto: RegisterDto) {
    try {
      const existing = await this.prisma.user.findFirst({
        where: { email: dto.email },
      });

      if (existing) {
        throw new BadRequestException("User email already exists");
      }

      const userId = randomUUID();
      const names = (dto.fullName || "User").trim().split(" ");
      const firstName = names[0] || "User";
      const lastName = names.slice(1).join(" ") || "";
      const passwordHash = await hashPassword(dto.password);

      const user = await this.prisma.user.create({
        data: {
          id: userId,
          email: dto.email,
          profile: {
            create: {
              firstName,
              lastName,
              passwordHash,
              role: (dto.role || "user").toLowerCase(),
            },
          },
        },
        include: { profile: true },
      });

      const fullName = [user.profile?.firstName, user.profile?.lastName].filter(Boolean).join(" ") || dto.email;

      return {
        token: issueSessionToken(user.id),
        user: {
          id: user.id,
          email: user.email,
          role: user.profile?.role || "user",
          fullName,
          // Returned at sign-in so the navbar can show the real picture
          // immediately, rather than initials until the profile is fetched.
          avatarUrl: user.profile?.avatarUrl || null,
          phone: user.profile?.phone || null,
        },
      };
    } catch (err: any) {
      this.logger.error(`Register failed for ${dto.email}: ${err.message}`, err.stack);
      if (err instanceof BadRequestException) throw err;
      throw new BadRequestException(err.message || "Failed to complete account registration.");
    }
  }

  /**
   * Verifies a password and issues a signed session token.
   *
   * This method previously looked the user up by email, issued a token without
   * consulting the password at all, and registered the email if it did not
   * exist — so any password worked for any account, and an unknown email
   * created one. Neither behaviour is preserved. An unknown email is now a
   * failed sign-in, and registration happens only through `register()`.
   */
  async login(dto: LoginDto) {
    try {
      const user = await this.prisma.user.findFirst({
        where: { email: dto.email },
        include: { profile: { select: LOGIN_PROFILE_FIELDS } },
      });

      // Hash-less accounts predate passwords existing at all. They are refused
      // rather than admitted, and `prisma/set-password.ts` is how they are given
      // one — see §3 of HANDOUT.md.
      const matches = await verifyPassword(dto.password, user?.profile?.passwordHash || DECOY_DIGEST);
      if (!user || !matches) {
        throw new UnauthorizedException(BAD_CREDENTIALS);
      }

      if (String(user.profile?.status || "active").toLowerCase() === "suspended") {
        throw new UnauthorizedException("This account has been suspended.");
      }

      const fullName = [user.profile?.firstName, user.profile?.lastName].filter(Boolean).join(" ") || user.email;

      return {
        token: issueSessionToken(user.id),
        user: {
          id: user.id,
          email: user.email,
          role: user.profile?.role || "user",
          fullName,
          avatarUrl: user.profile?.avatarUrl || null,
          phone: user.profile?.phone || null,
        },
      };
    } catch (err: any) {
      if (err instanceof UnauthorizedException) throw err;
      this.logger.error(`Login failed for ${dto.email}: ${err.message}`, err.stack);
      throw new BadRequestException(err.message || "Invalid credentials.");
    }
  }

  /**
   * Starts a password reset.
   *
   * **Delala cannot send email.** There is no mailer configured anywhere in the
   * service, and it does not use Supabase Auth either — rows are written into
   * `auth.users` but `encrypted_password` and GoTrue's whole recovery machinery
   * go unused, which is why no recovery mail appears in the Supabase dashboard
   * and why the reset page never delivered anything.
   *
   * So this issues a token and says plainly that it cannot deliver it. An
   * administrator can hand the link over out of band from the dashboard, which
   * is how a reset actually completes today. When a mail provider is wired up,
   * the only change needed is to send `token` from here.
   *
   * The response never reveals whether the email exists — that would turn this
   * endpoint into an account-enumeration oracle.
   */
  async requestPasswordReset(email: string): Promise<{ delivered: boolean; message: string }> {
    const user = await this.prisma.user.findFirst({ where: { email }, include: { profile: true } });

    if (user?.profile) {
      const token = generateResetToken();
      await this.prisma.profile.update({
        where: { id: user.id },
        data: {
          passwordResetHash: hashResetToken(token),
          // An hour is long enough to act on and short enough to limit a leak.
          passwordResetExpires: new Date(Date.now() + 60 * 60 * 1000),
        },
      });
    }

    return {
      delivered: false,
      message:
        "Delala cannot send password reset emails yet. Ask an administrator to reset your password for you.",
    };
  }

  /** Completes a reset. Single use: the token is cleared once spent. */
  async resetPassword(email: string, token: string, newPassword: string) {
    if (!newPassword || newPassword.length < 6) {
      throw new BadRequestException("Choose a password of at least 6 characters.");
    }

    const user = await this.prisma.user.findFirst({
      where: { email },
      include: { profile: { select: { passwordResetHash: true, passwordResetExpires: true } } },
    });

    const profile: any = user?.profile;
    const expired = !profile?.passwordResetExpires || profile.passwordResetExpires.getTime() < Date.now();

    if (!user || !profile || expired || !resetTokenMatches(token, profile.passwordResetHash)) {
      throw new UnauthorizedException("That reset link is invalid or has expired.");
    }

    await this.prisma.profile.update({
      where: { id: user.id },
      data: {
        passwordHash: await hashPassword(newPassword),
        passwordResetHash: null,
        passwordResetExpires: null,
      },
    });

    return { ok: true };
  }

  async validateSession(token: string) {
    // This used to read the user id as `token.split("-")[2]`, which is the first
    // eight characters of the uuid rather than the uuid — so the lookup could
    // never match and /auth/me never worked.
    const claims = verifySessionToken(token);
    if (!claims) throw new UnauthorizedException("Invalid auth token");

    const user = await this.prisma.user.findFirst({
      where: { id: claims.userId },
      include: { profile: true },
    });

    if (!user) throw new UnauthorizedException("User not found");
    const fullName = [user.profile?.firstName, user.profile?.lastName].filter(Boolean).join(" ") || user.email;

    return {
      id: user.id,
      email: user.email,
      role: user.profile?.role || "user",
      fullName,
    };
  }
}
