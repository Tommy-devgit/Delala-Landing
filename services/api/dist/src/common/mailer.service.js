"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var MailerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailerService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
let MailerService = MailerService_1 = class MailerService {
    constructor() {
        this.logger = new common_1.Logger(MailerService_1.name);
        this.transport = null;
        const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = process.env;
        if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD) {
            this.logger.warn("No SMTP configuration found. Password reset emails will not be sent; the reset endpoint reports this honestly.");
            return;
        }
        const port = Number(SMTP_PORT) || 587;
        this.transport = nodemailer.createTransport({
            host: SMTP_HOST,
            port,
            secure: port === 465,
            auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
        });
    }
    get enabled() {
        return this.transport !== null;
    }
    async sendPasswordReset(email, token) {
        if (!this.transport)
            return false;
        const appUrl = (process.env.APP_URL || "").replace(/\/+$/, "");
        const link = `${appUrl}/auth/reset-password?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`;
        try {
            await this.transport.sendMail({
                from: process.env.MAIL_FROM || "Delala <no-reply@delala.et>",
                to: email,
                subject: "Reset your Delala password",
                text: [
                    "Somebody asked to reset the password on your Delala account.",
                    "",
                    `Open this link to choose a new one: ${link}`,
                    "",
                    "The link stops working after one hour, and can only be used once.",
                    "If this was not you, ignore this message — nothing has changed.",
                ].join("\n"),
            });
            return true;
        }
        catch (err) {
            this.logger.error(`Password reset email failed for ${email}: ${err.message}`);
            return false;
        }
    }
};
exports.MailerService = MailerService;
exports.MailerService = MailerService = MailerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], MailerService);
//# sourceMappingURL=mailer.service.js.map