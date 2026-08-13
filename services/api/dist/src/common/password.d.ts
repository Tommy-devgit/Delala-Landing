export declare function hashPassword(password: string): Promise<string>;
export declare function verifyPassword(password: string, digest: string | null | undefined): Promise<boolean>;
export declare function generateResetToken(): string;
export declare function hashResetToken(token: string): string;
export declare function resetTokenMatches(token: string, digest: string | null | undefined): boolean;
