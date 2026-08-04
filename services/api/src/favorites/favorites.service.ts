import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async toggle(userId: string, propertyId: string) {
    const existing = await this.prisma.favorite.findFirst({
      where: { userId, propertyId },
    });

    if (existing) {
      await this.prisma.favorite.delete({ where: { id: existing.id } });
      return { saved: false };
    } else {
      await this.prisma.favorite.create({
        data: { userId, propertyId },
      });
      return { saved: true };
    }
  }

  async findByUser(userId: string) {
    return this.prisma.favorite.findMany({
      where: { userId },
      include: {
        property: {
          include: { location: true, images: true },
        },
      },
    });
  }
}
