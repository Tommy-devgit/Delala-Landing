import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString, IsUUID, Max, MaxLength, Min } from "class-validator";
import { PrismaService } from "../prisma/prisma.service";
import { SessionAuthGuard } from "../common/guards/session-auth.guard";

export class CreateReviewDto {
  @IsUUID()
  propertyId: string;

  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  comment?: string;
}

/**
 * Reviews were modelled from the beginning and never exposed. The marketplace
 * displayed a 4.9 rating and a review count on every poster regardless, so the
 * numbers existed without any of the writing that would produce them. This is
 * the missing half.
 */
@ApiTags("reviews")
@Controller("reviews")
export class ReviewsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @ApiOperation({ summary: "Reviews for a property, or for everything a poster has listed" })
  async findAll(@Query("propertyId") propertyId?: string, @Query("posterId") posterId?: string) {
    if (!propertyId && !posterId) {
      throw new BadRequestException("Pass either propertyId or posterId.");
    }

    const reviews = await this.prisma.review.findMany({
      where: propertyId
        ? { propertyId }
        : { property: { ownerId: posterId } },
      include: {
        user: { include: { profile: true } },
        property: { select: { id: true, title: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    const rated = reviews.filter((r) => typeof r.rating === "number");
    const average = rated.length
      ? Number((rated.reduce((sum, r) => sum + (r.rating || 0), 0) / rated.length).toFixed(1))
      : null;

    return {
      // null, never 0 — "nobody has reviewed this" is not "rated zero".
      average,
      count: reviews.length,
      data: reviews.map((r) => ({
        id: r.id,
        rating: r.rating,
        comment: r.comment || "",
        createdAt: r.createdAt,
        property: r.property,
        author: {
          id: r.userId,
          name:
            [r.user?.profile?.firstName, r.user?.profile?.lastName].filter(Boolean).join(" ") ||
            "Delala member",
          avatarUrl: r.user?.profile?.avatarUrl || null,
        },
      })),
    };
  }

  @Post()
  @UseGuards(SessionAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Leave a review on a property" })
  async create(@Body() dto: CreateReviewDto, @Req() req: any) {
    const property = await this.prisma.property.findUnique({
      where: { id: dto.propertyId },
      select: { id: true, ownerId: true },
    });

    if (!property) throw new NotFoundException("That property does not exist.");

    // Otherwise a poster can rate their own listings up, which is precisely the
    // behaviour a rating is supposed to be evidence against.
    if (property.ownerId === req.user.id) {
      throw new ForbiddenException("You cannot review your own listing.");
    }

    const existing = await this.prisma.review.findFirst({
      where: { propertyId: dto.propertyId, userId: req.user.id },
    });
    if (existing) {
      throw new BadRequestException("You have already reviewed this property.");
    }

    const review = await this.prisma.review.create({
      data: {
        propertyId: dto.propertyId,
        userId: req.user.id,
        rating: dto.rating,
        comment: dto.comment || null,
      },
      include: { user: { include: { profile: true } } },
    });

    return {
      id: review.id,
      rating: review.rating,
      comment: review.comment || "",
      createdAt: review.createdAt,
      author: {
        id: review.userId,
        name:
          [review.user?.profile?.firstName, review.user?.profile?.lastName].filter(Boolean).join(" ") ||
          "Delala member",
        avatarUrl: review.user?.profile?.avatarUrl || null,
      },
    };
  }
}
