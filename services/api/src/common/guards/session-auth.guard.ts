import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { verifySessionToken } from "../session-token";

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
 *
 * The token's signature is checked before the database is touched. Until that
 * check existed the guard trusted any well-formed string, so a session could be
 * assembled from a user id alone — and ids are public, returned as `brokerId`
 * on every property.
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

    // One message for malformed, unsigned, wrongly-signed and expired alike.
    // Every session issued before tokens were signed falls in here, so the first
    // request after this deploy is a sign-in for everybody.
    const claims = verifySessionToken(token);
    if (!claims) {
      throw new UnauthorizedException("That session is no longer valid. Please sign in again.");
    }

    const user = await this.prisma.user.findUnique({
      where: { id: claims.userId },
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
