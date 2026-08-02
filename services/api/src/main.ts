import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global prefix & validation pipe
  app.setGlobalPrefix("api/v1");
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Enable CORS
  app.enableCors();

  // Swagger OpenAPI Setup
  const config = new DocumentBuilder()
    .setTitle("Delala Platform REST API")
    .setDescription(
      "Single source of truth API powering Delala Marketplace, Mobile App, and Admin Dashboard.",
    )
    .setVersion("1.0")
    .addBearerAuth()
    .addTag("properties", "Property discovery & approval moderation endpoints")
    .addTag("brokers", "Certified real estate broker management")
    .addTag("users", "User account & role administration")
    .addTag("cities", "Regional Ethiopian real estate markets")
    .addTag("admin", "Platform health, metrics & audit logs")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document);

  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.log(`🚀 Delala API Service running on http://localhost:${port}/api/v1`);
  console.log(`📚 Swagger Documentation available at http://localhost:${port}/api/docs`);
}

bootstrap();
