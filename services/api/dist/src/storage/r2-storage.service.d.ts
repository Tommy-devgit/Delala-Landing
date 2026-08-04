export declare class R2StorageService {
    private readonly logger;
    private s3Client;
    private bucketName;
    private publicUrl;
    constructor();
    uploadImage(file: Express.Multer.File): Promise<string>;
}
