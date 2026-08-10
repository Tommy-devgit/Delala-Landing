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
var R2StorageService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.R2StorageService = void 0;
const common_1 = require("@nestjs/common");
const client_s3_1 = require("@aws-sdk/client-s3");
let R2StorageService = R2StorageService_1 = class R2StorageService {
    constructor() {
        this.logger = new common_1.Logger(R2StorageService_1.name);
        this.s3Client = null;
        const accountId = process.env.R2_ACCOUNT_ID;
        const accessKeyId = process.env.R2_ACCESS_KEY_ID;
        const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
        this.bucketName = process.env.R2_BUCKET_NAME || "delala-properties";
        this.publicUrl = process.env.R2_PUBLIC_URL || "";
        if (accountId && accessKeyId && secretAccessKey) {
            this.s3Client = new client_s3_1.S3Client({
                region: "auto",
                endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
                credentials: {
                    accessKeyId,
                    secretAccessKey,
                },
            });
            this.logger.log(`Cloudflare R2 Storage initialized for bucket: ${this.bucketName}`);
        }
        else {
            this.logger.warn("Cloudflare R2 environment variables missing. Falling back to local placeholder images for development.");
        }
    }
    get isConfigured() {
        return this.s3Client !== null;
    }
    async uploadImage(file) {
        if (!this.s3Client) {
            if (file.buffer.length > R2StorageService_1.MAX_INLINE_BYTES) {
                this.logger.error(`R2 is not configured and ${file.originalname} is ${Math.round(file.buffer.length / 1024)}KB, ` +
                    `above the ${R2StorageService_1.MAX_INLINE_BYTES / 1024}KB inline limit. ` +
                    `Set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY and R2_PUBLIC_URL.`);
                throw new common_1.ServiceUnavailableException("Image storage is not configured on the server, so this photo could not be saved.");
            }
            this.logger.warn(`R2 disabled: inlining ${file.originalname} as a Base64 data URL. This is a development fallback.`);
            const mime = file.mimetype || "image/jpeg";
            return `data:${mime};base64,${file.buffer.toString("base64")}`;
        }
        const fileExt = file.originalname.split(".").pop() || "jpg";
        const uniqueId = Date.now().toString(36) + Math.random().toString(36).substring(2, 7);
        const key = `properties/${uniqueId}.${fileExt}`;
        try {
            await this.s3Client.send(new client_s3_1.PutObjectCommand({
                Bucket: this.bucketName,
                Key: key,
                Body: file.buffer,
                ContentType: file.mimetype,
            }));
            const finalUrl = this.publicUrl
                ? `${this.publicUrl.replace(/\/$/, "")}/${key}`
                : `https://${this.bucketName}.${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${key}`;
            this.logger.log(`Uploaded ${file.originalname} to Cloudflare R2: ${finalUrl}`);
            return finalUrl;
        }
        catch (error) {
            this.logger.error(`Failed to upload to Cloudflare R2: ${error.message}`, error.stack);
            throw error;
        }
    }
};
exports.R2StorageService = R2StorageService;
R2StorageService.MAX_INLINE_BYTES = 256 * 1024;
exports.R2StorageService = R2StorageService = R2StorageService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], R2StorageService);
//# sourceMappingURL=r2-storage.service.js.map