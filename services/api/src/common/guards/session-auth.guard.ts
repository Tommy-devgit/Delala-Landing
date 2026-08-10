import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

/** `betterauth-session-<uuid>-<issuedAtMs>` — the shape issued by AuthService. */
const SESSION_TOKEN = /^betterauth-session-([0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})-(\d+)$/i;

/** Sessions stop being accepted after 30 days. */
const MAX_SESSION_AGE_MS = 30 * 24 * 60 * 60 * 1000;

export interface AuthenticatedUser {
  id: string;
  email: string | null;
  role: string;
  status: string;
}

/** Pulls the bearer token off a request, if there is one. */
export const bearerToken = (authorization?: string): string | undefined => {
  if (!authorization) return undefined;
  return authorization.replace(/^Bearer\s+/i, "").trim() || undefined;
};

/**
 * Populates `request.user` from the session token.
 *
 * Nothing did this before: no Passport strategy and no global guard were ever
 * registered, so `request.user` was always undefined and RolesGuard — which
 * reads `user.role` — could never pass. Every guarded route answered 403
 * regardless of credentials.
 */
@Injectable()
export class SessionAuthGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = bearerToken(request.headers?.authorization);

    if (!token) {
      throw new UnauthorizedException("Sign in to continue.");
    }

    const match = token.match(SESSION_TOKEN);
    if (!match) {
      throw new UnauthorizedException("That session is not valid.");
    }

    const [, userId, issuedAt] = match;
    if (Date.now() - Number(issuedAt) > MAX_SESSION_AGE_MS) {
      throw new UnauthorizedException("That session has expired. Please sign in again.");
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true },
    });

    if (!user) {
      throw new UnauthorizedException("That account no longer exists.");
    }

    const profile: any = user.profile;
    if (profile?.status && String(profile.status).toLowerCase() === "suspended") {
      throw new UnauthorizedException("This account has been suspended.");
    }

    // Roles are stored lower case in the database but declared upper case on the
    // route decorators, so normalize once here.
    const authenticated: AuthenticatedUser = {
      id: user.id,
      email: user.email,
      role: (profile?.role || "user").toUpperCase(),
      status: (profile?.status || "active").toUpperCase(),
    };

    request.user = authenticated;
    return true;
  }
}
