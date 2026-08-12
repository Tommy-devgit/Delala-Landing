"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAX_SESSION_AGE_MS = void 0;
exports.issueSessionToken = issueSessionToken;
exports.verifySessionToken = verifySessionToken;
const crypto_1 = require("crypto");
const SESSION_TOKEN = /^betterauth-session-([0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})-(\d+)-([0-9a-f]{32})$/i;
exports.MAX_SESSION_AGE_MS = 30 * 24 * 60 * 60 * 1000;
const SIGNATURE_LENGTH = 32;
function sessionSecret() {
    const secret = process.env.SESSION_SECRET;
    if (!secret || secret.length < 32) {
        throw new Error("SESSION_SECRET is not set, or is shorter than 32 characters. Session tokens cannot be issued or verified without it. Generate one with: node -e \"console.log(require('crypto').randomBytes(32).toString('hex'))\"");
    }
    return secret;
}
const sign = (payload) => (0, crypto_1.createHmac)("sha256", sessionSecret()).update(payload).digest("hex").slice(0, SIGNATURE_LENGTH);
function issueSessionToken(userId) {
    const issuedAt = Date.now();
    return `betterauth-session-${userId}-${issuedAt}-${sign(`${userId}-${issuedAt}`)}`;
}
function verifySessionToken(token) {
    const match = token.match(SESSION_TOKEN);
    if (!match)
        return null;
    const [, userId, issuedAtRaw, signature] = match;
    const expected = Buffer.from(sign(`${userId}-${issuedAtRaw}`), "utf8");
    const actual = Buffer.from(signature.toLowerCase(), "utf8");
    if (expected.length !== actual.length || !(0, crypto_1.timingSafeEqual)(actual, expected))
        return null;
    const issuedAt = Number(issuedAtRaw);
    if (!Number.isFinite(issuedAt) || Date.now() - issuedAt > exports.MAX_SESSION_AGE_MS)
        return null;
    return { userId, issuedAt };
}
//# sourceMappingURL=session-token.js.map