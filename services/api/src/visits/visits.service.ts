import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateVisitDto } from "./dto/create-visit.dto";

@Injectable()
export class VisitsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateVisitDto) {
    return this.prisma.visit.create({
      data: {
        propertyId: dto.propertyId,
        userId: dto.seekerId,
        status: "requested",
      },
    });
  }

  async findAll() {
    return this.prisma.visit.findMany({
      include: {
        property: true,
        user: { include: { profile: true } },
      },
      orderBy: { createdAt: "desc" },
    });
  }
}
