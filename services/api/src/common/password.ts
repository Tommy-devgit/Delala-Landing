import { createHash, randomBytes, scrypt, timingSafeEqual } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt) as (
  password: string,
  salt: Buffer,
  keylen: number,
  options: { N: number; r: number; p: number }
) => Promise<Buffer>;

/**
 * scrypt, from Node's own crypto, rather than bcrypt.
 *
 * bcrypt needs a native build, and this API deploys to Vercel from a committed
 * `dist/` — a native module is one more thing that can resolve differently in
 * the build environment than it did locally, for no benefit. scrypt is a
 * memory-hard KDF in the standard library and needs no dependency at all.
 *
 * 2^14 rounds at r=8 costs about 16 MB and ~50ms per hash, which is under
 * Node's 32 MB default `maxmem` and cheap enough for a serverless request.
 */
const N = 16384;
const R = 8;
const P = 1;
const KEY_LENGTH = 64;
const SALT_LENGTH = 16;

/**
 * `scrypt$N$r$p$salt$key`, all base64.
 *
 * The parameters travel with the digest so the cost can be raised later without
 * invalidating passwords hashed under the old settings — verification reads the
 * cost out of the stored string rather than assuming today's constants.
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(SALT_LENGTH);
  const key = await scryptAsync(password, salt, KEY_LENGTH, { N, r: R, p: P });
  return ["scrypt", N, R, P, salt.toString("base64"), key.toString("base64")].join("$");
}

/**
 * Constant-time comparison against a stored digest.
 *
 * Returns false for a NULL or unparseable digest rather than throwing: accounts
 * created before passwords existed have no digest at all, and that has to read
 * as "wrong password", never as "no password required".
 */
export async function verifyPassword(password: string, digest: string | null | undefined): Promise<boolean> {
  if (!digest) return false;

  const parts = digest.split("$");
  if (parts.length !== 6 || parts[0] !== "scrypt") return false;

  const [, nRaw, rRaw, pRaw, saltRaw, keyRaw] = parts;
  const n = Number(nRaw);
  const r = Number(rRaw);
  const p = Number(pRaw);
  if (!Number.isInteger(n) || !Number.isInteger(r) || !Number.isInteger(p)) return false;

  try {
    const salt = Buffer.from(saltRaw, "base64");
    const expected = Buffer.from(keyRaw, "base64");
    if (salt.length === 0 || expected.length === 0) return false;

    const actual = await scryptAsync(password, salt, expected.length, { N: n, r, p });
    return timingSafeEqual(actual, expected);
  } catch {
    // A corrupt digest is a failed sign-in, not a 500.
    return false;
  }
}

/**
 * A single-use password reset token.
 *
 * Returned in the clear once — that value is the whole credential — while only
 * its digest is stored, exactly as for a password. Anyone holding the token can
 * take over the account, so a database dump must not contain usable ones.
 */
export function generateResetToken(): string {
  return randomBytes(32).toString("base64url");
}

/** Cheap digest for reset tokens: they are already 256 bits of entropy, so
 *  there is nothing to brute-force and scrypt's cost buys nothing here. */
export function hashResetToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

/** Constant-time comparison of a supplied token against a stored digest. */
export function resetTokenMatches(token: string, digest: string | null | undefined): boolean {
  if (!digest) return false;
  const actual = Buffer.from(hashResetToken(token), "utf8");
  const expected = Buffer.from(digest, "utf8");
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}
