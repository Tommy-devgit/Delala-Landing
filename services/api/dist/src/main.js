"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix("api/v1");
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
    }));
    app.enableCors({
        origin: true,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
        credentials: true,
        allowedHeaders: "Content-Type, Accept, Authorization, X-Requested-With",
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle("Delala Platform REST API")
        .setDescription("Single source of truth API powering Delala Marketplace, Mobile App, and Admin Dashboard.")
        .setVersion("1.0")
        .addBearerAuth()
        .addTag("properties", "Property discovery & approval moderation endpoints")
        .addTag("brokers", "Certified real estate broker management")
        .addTag("users", "User account & role administration")
        .addTag("cities", "Regional Ethiopian real estate markets")
        .addTag("admin", "Platform health, metrics & audit logs")
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup("api/docs", app, document);
    const port = process.env.PORT || 4000;
    await app.listen(port);
    console.log(`🚀 Delala API Service running on http://localhost:${port}/api/v1`);
    console.log(`📚 Swagger Documentation available at http://localhost:${port}/api/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map