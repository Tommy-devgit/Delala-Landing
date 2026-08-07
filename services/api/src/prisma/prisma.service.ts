import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    try {
      await this.$connect();
    } catch (err: any) {
      console.warn("Prisma connection warning during module init (will retry on query execution):", err.message);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
