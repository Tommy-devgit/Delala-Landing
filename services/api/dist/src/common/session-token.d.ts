export declare const MAX_SESSION_AGE_MS: number;
export interface SessionClaims {
    userId: string;
    issuedAt: number;
}
export declare function issueSessionToken(userId: string): string;
export declare function verifySessionToken(token: string): SessionClaims | null;
