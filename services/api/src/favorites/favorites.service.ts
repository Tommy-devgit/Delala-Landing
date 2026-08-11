import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { PropertiesService } from "../properties/properties.service";

@Injectable()
export class FavoritesService {
  constructor(
    private prisma: PrismaService,
    private properties: PropertiesService
  ) {}

  async toggle(userId: string, propertyId: string) {
    const existing = await this.prisma.favorite.findFirst({ where: { userId, propertyId } });

    if (existing) {
      await this.prisma.favorite.delete({ where: { id: existing.id } });
      return { saved: false, propertyId };
    }

    await this.prisma.favorite.create({ data: { userId, propertyId } });
    return { saved: true, propertyId };
  }

  async remove(userId: string, propertyId: string) {
    await this.prisma.favorite.deleteMany({ where: { userId, propertyId } });
    return { saved: false, propertyId };
  }

  /**
   * Just the ids. The marketplace needs to mark hearts across a whole grid, and
   * pulling every saved property with its images to do that would be wasteful.
   */
  async idsForUser(userId: string): Promise<string[]> {
    const rows = await this.prisma.favorite.findMany({
      where: { userId },
      select: { propertyId: true },
    });
    return rows.map((r) => r.propertyId).filter((id): id is string => Boolean(id));
  }

  async findByUser(userId: string, requestedUserId?: string) {
    // "me" is the conventional self alias; anything else that names a different
    // real account is refused, since a wishlist is private.
    const asksForSomeoneElse =
      requestedUserId && requestedUserId !== "me" && requestedUserId !== userId;

    if (asksForSomeoneElse) {
      throw new ForbiddenException("You can only view your own saved properties.");
    }

    const favorites = await this.prisma.favorite.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: {
        property: {
          include: {
            location: { include: { parent: { include: { parent: true } } } },
            images: true,
            owner: { include: { profile: true } },
          },
        },
      },
    });

    // Skip favourites whose property has since been deleted, and return the
    // same shape the marketplace already renders.
    return favorites
      .filter((f) => f.property)
      .map((f) => this.properties.mapPropertyResponse(f.property));
  }
}
