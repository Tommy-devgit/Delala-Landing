import { Module } from "@nestjs/common";
import { PropertiesController } from "./properties.controller";
import { PropertiesService } from "./properties.service";
import { R2StorageService } from "../storage/r2-storage.service";

@Module({
  controllers: [PropertiesController],
  providers: [PropertiesService, R2StorageService],
  exports: [PropertiesService, R2StorageService],
})
export class PropertiesModule {}
