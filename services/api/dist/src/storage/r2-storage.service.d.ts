export declare class R2StorageService {
    private readonly logger;
    private s3Client;
    private bucketName;
    private publicUrl;
    constructor();
    private static readonly MAX_INLINE_BYTES;
    get isConfigured(): boolean;
    uploadImage(file: Express.Multer.File): Promise<string>;
}
