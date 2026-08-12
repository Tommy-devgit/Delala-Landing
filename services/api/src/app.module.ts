import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { PropertiesModule } from "./properties/properties.module";
import { UsersModule } from "./users/users.module";
import { AdminModule } from "./admin/admin.module";
import { CitiesModule } from "./cities/cities.module";
import { VisitsModule } from "./visits/visits.module";
import { FavoritesModule } from "./favorites/favorites.module";
import { NotificationsModule } from "./notifications/notifications.module";
import { AuthModule } from "./auth/auth.module";
import { ReviewsModule } from "./reviews/reviews.module";
import { ReportsModule } from "./reports/reports.module";

@Module({
  imports: [
    PrismaModule,
    PropertiesModule,
    UsersModule,
    AdminModule,
    CitiesModule,
    VisitsModule,
    FavoritesModule,
    NotificationsModule,
    AuthModule,
    ReviewsModule,
    ReportsModule,
  ],
})
export class AppModule {}
