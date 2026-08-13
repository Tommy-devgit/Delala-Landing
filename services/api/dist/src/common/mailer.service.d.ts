export declare class MailerService {
    private readonly logger;
    private transport;
    constructor();
    get enabled(): boolean;
    sendPasswordReset(email: string, token: string): Promise<boolean>;
}
