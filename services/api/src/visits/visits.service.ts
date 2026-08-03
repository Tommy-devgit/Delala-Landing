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
        seekerId: dto.seekerId,
        brokerId: dto.brokerId,
        scheduledDate: dto.scheduledDate,
        timeSlot: dto.timeSlot,
        status: "PENDING",
      },
    });
  }

  async findAll() {
    return this.prisma.visit.findMany({
      include: {
        property: true,
        seeker: { include: { profile: true } },
        broker: { include: { user: { include: { profile: true } } } },
      },
      orderBy: { createdAt: "desc" },
    });
  }
}
