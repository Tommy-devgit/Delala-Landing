import { Injectable, Logger } from "@nestjs/common";
import * as nodemailer from "nodemailer";

/**
 * Outbound email.
 *
 * Delala had no mailer at all, which is why password reset could not work: the
 * endpoints did not exist, the client faked success, and Supabase Auth is not
 * in use so GoTrue's recovery mail never fired either.
 *
 * This is configured entirely by environment variables and **disables itself
 * cleanly when they are absent**. That matters: a half-configured mailer that
 * throws would take password reset down harder than not having one, and the
 * reset flow already reports `delivered: false` honestly when nothing can be
 * sent.
 *
 * Required to switch it on:
 *
 *   SMTP_HOST      smtp.your-provider.com
 *   SMTP_PORT      587
 *   SMTP_USER      the account username
 *   SMTP_PASSWORD  the account password or API key
 *   MAIL_FROM      "Delala <no-reply@yourdomain.et>"
 *   APP_URL        https://your-marketplace-domain  (used to build reset links)
 *
 * Any SMTP provider works — Resend, Postmark, SES, Gmail with an app password.
 */
@Injectable()
export class MailerService {
  private readonly logger = new Logger(MailerService.name);
  private transport: nodemailer.Transporter | null = null;

  constructor() {
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = process.env;

    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD) {
      this.logger.warn(
        "No SMTP configuration found. Password reset emails will not be sent; the reset endpoint reports this honestly."
      );
      return;
    }

    const port = Number(SMTP_PORT) || 587;
    this.transport = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      // 465 is implicit TLS; 587 upgrades with STARTTLS.
      secure: port === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
    });
  }

  get enabled(): boolean {
    return this.transport !== null;
  }

  /**
   * Sends the reset link. Returns whether it actually went out, which is what
   * the API reports to the caller — never a cheerful "check your email" for a
   * message that was never sent.
   */
  async sendPasswordReset(email: string, token: string): Promise<boolean> {
    if (!this.transport) return false;

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
    } catch (err: any) {
      // A provider outage must not become a 500 on the reset endpoint; the
      // caller is told delivery failed and can try again.
      this.logger.error(`Password reset email failed for ${email}: ${err.message}`);
      return false;
    }
  }
}
