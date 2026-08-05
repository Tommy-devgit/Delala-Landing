import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { PropertiesModule } from "./properties/properties.module";
import { BrokersModule } from "./brokers/brokers.module";
import { UsersModule } from "./users/users.module";
import { AdminModule } from "./admin/admin.module";
import { CitiesModule } from "./cities/cities.module";
import { VisitsModule } from "./visits/visits.module";
import { FavoritesModule } from "./favorites/favorites.module";
import { NotificationsModule } from "./notifications/notifications.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    PrismaModule,
    PropertiesModule,
    BrokersModule,
    UsersModule,
    AdminModule,
    CitiesModule,
    VisitsModule,
    FavoritesModule,
    NotificationsModule,
    AuthModule,
  ],
})
export class AppModule {}
