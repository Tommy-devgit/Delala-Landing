import { createHmac, timingSafeEqual } from "crypto";

/** `betterauth-session-<uuid>-<issuedAtMs>-<signature>` */
const SESSION_TOKEN = /^betterauth-session-([0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})-(\d+)-([0-9a-f]{32})$/i;

/** Sessions stop being accepted after 30 days. */
export const MAX_SESSION_AGE_MS = 30 * 24 * 60 * 60 * 1000;

/** 128 bits of HMAC-SHA256 is plenty to authenticate a short string. */
const SIGNATURE_LENGTH = 32;

export interface SessionClaims {
  userId: string;
  issuedAt: number;
}

/**
 * The signing key.
 *
 * There is deliberately no fallback. A default secret is a published secret,
 * and a published secret means the token is forgeable again — which is the
 * whole problem this module exists to close. An unset variable is a
 * misconfigured server, so it throws rather than quietly authenticating
 * anybody, and it surfaces as a 500 rather than a 401 because it is a fault on
 * this side, not a bad credential.
 */
function sessionSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error(
      "SESSION_SECRET is not set, or is shorter than 32 characters. Session tokens cannot be issued or verified without it. Generate one with: node -e \"console.log(require('crypto').randomBytes(32).toString('hex'))\""
    );
  }
  return secret;
}

const sign = (payload: string): string =>
  createHmac("sha256", sessionSecret()).update(payload).digest("hex").slice(0, SIGNATURE_LENGTH);

/**
 * Mints a session token for a user.
 *
 * The previous format was `betterauth-session-<uuid>-<ms>` with nothing
 * authenticating it, so anyone holding a user's id could assemble a valid
 * session for that user — and ids are handed out publicly as `brokerId` on
 * every property. The signature is what makes the id safe to expose.
 */
export function issueSessionToken(userId: string): string {
  const issuedAt = Date.now();
  return `betterauth-session-${userId}-${issuedAt}-${sign(`${userId}-${issuedAt}`)}`;
}

/**
 * Returns the claims carried by a token, or null if it is malformed, unsigned,
 * signed with a different key, or older than {@link MAX_SESSION_AGE_MS}.
 *
 * Unsigned tokens in the old format do not verify, by design. Every session
 * issued before this change is invalid and users have to sign in again — those
 * tokens were forgeable, so honouring them would preserve the hole for another
 * thirty days.
 */
export function verifySessionToken(token: string): SessionClaims | null {
  const match = token.match(SESSION_TOKEN);
  if (!match) return null;

  const [, userId, issuedAtRaw, signature] = match;

  const expected = Buffer.from(sign(`${userId}-${issuedAtRaw}`), "utf8");
  const actual = Buffer.from(signature.toLowerCase(), "utf8");
  if (expected.length !== actual.length || !timingSafeEqual(actual, expected)) return null;

  const issuedAt = Number(issuedAtRaw);
  if (!Number.isFinite(issuedAt) || Date.now() - issuedAt > MAX_SESSION_AGE_MS) return null;

  return { userId, issuedAt };
}
