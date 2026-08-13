"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
exports.verifyPassword = verifyPassword;
exports.generateResetToken = generateResetToken;
exports.hashResetToken = hashResetToken;
exports.resetTokenMatches = resetTokenMatches;
const crypto_1 = require("crypto");
const util_1 = require("util");
const scryptAsync = (0, util_1.promisify)(crypto_1.scrypt);
const N = 16384;
const R = 8;
const P = 1;
const KEY_LENGTH = 64;
const SALT_LENGTH = 16;
async function hashPassword(password) {
    const salt = (0, crypto_1.randomBytes)(SALT_LENGTH);
    const key = await scryptAsync(password, salt, KEY_LENGTH, { N, r: R, p: P });
    return ["scrypt", N, R, P, salt.toString("base64"), key.toString("base64")].join("$");
}
async function verifyPassword(password, digest) {
    if (!digest)
        return false;
    const parts = digest.split("$");
    if (parts.length !== 6 || parts[0] !== "scrypt")
        return false;
    const [, nRaw, rRaw, pRaw, saltRaw, keyRaw] = parts;
    const n = Number(nRaw);
    const r = Number(rRaw);
    const p = Number(pRaw);
    if (!Number.isInteger(n) || !Number.isInteger(r) || !Number.isInteger(p))
        return false;
    try {
        const salt = Buffer.from(saltRaw, "base64");
        const expected = Buffer.from(keyRaw, "base64");
        if (salt.length === 0 || expected.length === 0)
            return false;
        const actual = await scryptAsync(password, salt, expected.length, { N: n, r, p });
        return (0, crypto_1.timingSafeEqual)(actual, expected);
    }
    catch {
        return false;
    }
}
function generateResetToken() {
    return (0, crypto_1.randomBytes)(32).toString("base64url");
}
function hashResetToken(token) {
    return (0, crypto_1.createHash)("sha256").update(token).digest("hex");
}
function resetTokenMatches(token, digest) {
    if (!digest)
        return false;
    const actual = Buffer.from(hashResetToken(token), "utf8");
    const expected = Buffer.from(digest, "utf8");
    return actual.length === expected.length && (0, crypto_1.timingSafeEqual)(actual, expected);
}
//# sourceMappingURL=password.js.map