import { Module } from "@nestjs/common";
import { AdminModule } from "../admin/admin.module";
import { PropertiesController } from "./properties.controller";
import { PropertiesService } from "./properties.service";
import { R2StorageService } from "../storage/r2-storage.service";

@Module({
  imports: [AdminModule],
  controllers: [PropertiesController],
  providers: [PropertiesService, R2StorageService],
  exports: [PropertiesService, R2StorageService],
})
export class PropertiesModule {}
