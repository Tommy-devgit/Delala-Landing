import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    // The password digest is omitted globally rather than filtered at each call
    // site. Profiles are pulled with `include: { profile: true }` in a dozen
    // services that hand the result straight to the client, so an opt-out list
    // would only need to be forgotten once. Queries that genuinely need the
    // digest — login, set-password — ask for it with an explicit `select`,
    // which overrides this.
    super({ omit: { profile: { passwordHash: true } } });
  }

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
