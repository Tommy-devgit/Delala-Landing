import { Module } from "@nestjs/common";
import { BrokersController } from "./brokers.controller";

@Module({
  controllers: [BrokersController],
})
export class BrokersModule {}
