import { Injectable, Logger } from "@nestjs/common";
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

  async uploadImage(file: Express.Multer.File): Promise<string> {
    if (!this.s3Client) {
      this.logger.log(`R2 disabled: Converting uploaded file ${file.originalname} to Base64 Data URL`);
      const mime = file.mimetype || "image/jpeg";
      const base64 = file.buffer.toString("base64");
      return `data:${mime};base64,${base64}`;
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
