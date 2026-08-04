import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreatePropertyDto, ModeratePropertyDto } from "./dto/create-property.dto";

@Injectable()
export class PropertiesService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: { city?: string; subCity?: string; propertyType?: string; verifiedOnly?: boolean }) {
    return this.prisma.property.findMany({
      where: {
        status: "APPROVED",
        ...(query.propertyType ? { propertyType: query.propertyType } : {}),
      },
      include: {
        city: true,
        neighborhood: true,
        broker: {
          include: { user: { include: { profile: true } } },
        },
        images: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async findOneBySlug(slug: string) {
    const property = await this.prisma.property.findUnique({
      where: { slug },
      include: {
        city: true,
        neighborhood: true,
        broker: {
          include: { user: { include: { profile: true } } },
        },
        images: true,
      },
    });

    if (!property) {
      throw new NotFoundException(`Property with slug ${slug} not found`);
    }
    return property;
  }

  async create(createDto: CreatePropertyDto) {
    const slug = createDto.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now().toString().slice(-4);

    // Resolve or fallback default City & Neighborhood if needed
    let cityId = createDto.cityId;
    let neighborhoodId = createDto.neighborhoodId;
    let brokerId = createDto.brokerId;

    const firstCity = await this.prisma.city.findFirst();
    const firstNeighborhood = await this.prisma.neighborhood.findFirst();
    const firstBroker = await this.prisma.broker.findFirst();

    if (firstCity && (!cityId || cityId === "c1" || cityId.length < 10)) cityId = firstCity.id;
    if (firstNeighborhood && (!neighborhoodId || neighborhoodId === "n1" || neighborhoodId.length < 10)) neighborhoodId = firstNeighborhood.id;
    if (firstBroker && (!brokerId || brokerId === "b1" || brokerId.length < 10)) brokerId = firstBroker.id;

    return this.prisma.property.create({
      data: {
        title: createDto.title,
        description: createDto.description || "Newly published verified property submission.",
        propertyType: createDto.propertyType || "Villa",
        rentETB: Number(createDto.rentETB),
        cityId,
        neighborhoodId,
        bedrooms: Number(createDto.bedrooms || 3),
        bathrooms: Number(createDto.bathrooms || 2),
        areaSqm: Number(createDto.areaSqm || 250),
        generator: Boolean(createDto.generator),
        waterTank: Boolean(createDto.waterTank),
        parking: Boolean(createDto.parking ?? true),
        furnished: Boolean(createDto.furnished ?? true),
        securityGuard: Boolean(createDto.securityGuard ?? true),
        brokerId,
        slug,
        status: "PENDING_APPROVAL",
        images: {
          create: [
            { url: "/images/hero_property.png", displayOrder: 1, isHero: true },
            { url: "/images/hero_home_away.jpg", displayOrder: 2, isHero: false },
          ],
        },
      },
      include: {
        city: true,
        neighborhood: true,
        broker: true,
        images: true,
      },
    });
  }

  async moderate(id: string, moderateDto: ModeratePropertyDto) {
    const property = await this.prisma.property.findUnique({ where: { id } });
    if (!property) {
      throw new NotFoundException(`Property with ID ${id} not found`);
    }

    return this.prisma.property.update({
      where: { id },
      data: {
        status: moderateDto.status === "APPROVED" ? "APPROVED" : "REJECTED",
        rejectionReason: moderateDto.rejectionReason || null,
        fieldAgentNotes: moderateDto.fieldAgentNotes || property.fieldAgentNotes,
      },
    });
  }
}
