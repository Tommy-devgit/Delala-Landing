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
    return this.prisma.property.create({
      data: {
        ...createDto,
        slug,
        status: "PENDING_APPROVAL",
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
