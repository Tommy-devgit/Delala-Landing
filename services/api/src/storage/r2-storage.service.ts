import { Injectable, Logger, ServiceUnavailableException } from "@nestjs/common";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

@Injectable()
export class R2StorageService {
  private readonly logger = new Logger(R2StorageService.name);
  private s3Client: S3Client | null = null;
  private bucketName: string;
  private publicUrl: string;

  constructor() {
    const accountId = process.env.R2_ACCOUNT_ID;
    const accessKeyId = process.env.R2_ACCESS_KEY_ID;
    const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
    this.bucketName = process.env.R2_BUCKET_NAME || "delala-properties";
    this.publicUrl = process.env.R2_PUBLIC_URL || "";

    if (accountId && accessKeyId && secretAccessKey) {
      this.s3Client = new S3Client({
        region: "auto",
        endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
        credentials: {
          accessKeyId,
          secretAccessKey,
        },
      });
      this.logger.log(`Cloudflare R2 Storage initialized for bucket: ${this.bucketName}`);
    } else {
      this.logger.warn(
        "Cloudflare R2 environment variables missing. Falling back to local placeholder images for development."
      );
    }
  }

  /** Largest file the development data-URL fallback will inline (256 KB). */
  private static readonly MAX_INLINE_BYTES = 256 * 1024;

  /** True when Cloudflare R2 credentials are present and uploads are real. */
  get isConfigured(): boolean {
    return this.s3Client !== null;
  }

  async uploadImage(file: Express.Multer.File): Promise<string> {
    if (!this.s3Client) {
      // Base64 data URLs are a development convenience only. Inlining a full
      // photo puts megabytes into a database column and into every API response
      // that returns it, so anything but a small file is refused outright.
      if (file.buffer.length > R2StorageService.MAX_INLINE_BYTES) {
        this.logger.error(
          `R2 is not configured and ${file.originalname} is ${Math.round(file.buffer.length / 1024)}KB, ` +
            `above the ${R2StorageService.MAX_INLINE_BYTES / 1024}KB inline limit. ` +
            `Set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY and R2_PUBLIC_URL.`
        );
        throw new ServiceUnavailableException(
          "Image storage is not configured on the server, so this photo could not be saved."
        );
      }

      this.logger.warn(
        `R2 disabled: inlining ${file.originalname} as a Base64 data URL. This is a development fallback.`
      );
      const mime = file.mimetype || "image/jpeg";
      return `data:${mime};base64,${file.buffer.toString("base64")}`;
    }

    const fileExt = file.originalname.split(".").pop() || "jpg";
    const uniqueId = Date.now().toString(36) + Math.random().toString(36).substring(2, 7);
    const key = `properties/${uniqueId}.${fileExt}`;

    try {
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: this.bucketName,
          Key: key,
          Body: file.buffer,
          ContentType: file.mimetype,
        })
      );

      const finalUrl = this.publicUrl
        ? `${this.publicUrl.replace(/\/$/, "")}/${key}`
        : `https://${this.bucketName}.${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${key}`;

      this.logger.log(`Uploaded ${file.originalname} to Cloudflare R2: ${finalUrl}`);
      return finalUrl;
    } catch (error) {
      this.logger.error(`Failed to upload to Cloudflare R2: ${error.message}`, error.stack);
      throw error;
    }
  }
}
