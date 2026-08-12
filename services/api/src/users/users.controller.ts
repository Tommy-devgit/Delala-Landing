import { Controller, Get, Patch, Param, Body, NotFoundException } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { PrismaService } from "../prisma/prisma.service";

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @ApiOperation({ summary: "Get all platform users" })
  findAll() {
    return this.prisma.user.findMany({
      include: { profile: true },
      orderBy: { createdAt: "desc" },
    });
  }

  @Get("profile/:id")
  @ApiOperation({ summary: "Get user profile by ID" })
  async getProfile(@Param("id") id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { profile: true },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const profile: any = user.profile || {};
    const fullName = [profile.firstName, profile.lastName].filter(Boolean).join(" ") || user.email || "User";

    let bio = "";
    let avatarUrl = profile.avatarUrl || "/images/hero_home_away.jpg";

    try {
      const rows: any[] = await this.prisma.$queryRawUnsafe(
        `SELECT bio, avatar_url FROM public.profiles WHERE id = $1::uuid`,
        id
      );
      if (rows[0]) {
        if (rows[0].bio) bio = rows[0].bio;
        if (rows[0].avatar_url) avatarUrl = rows[0].avatar_url;
      }
    } catch {
      // Fallback
    }

    return {
      id: user.id,
      email: user.email,
      firstName: profile.firstName || "",
      lastName: profile.lastName || "",
      fullName,
      phone: profile.phone || "",
      avatarUrl,
      bio,
      role: profile.role || "user",
      createdAt: user.createdAt,
    };
  }

  @Get("verified-posters")
  @ApiOperation({ summary: "Posters who have passed at least one verification check" })
  async verifiedPosters() {
    // Deliberately returns nothing until somebody is genuinely verified. The
    // homepage section that reads this hides itself on an empty list rather
    // than filling the space with unverified accounts — which is what the old
    // `verified: true` on every poster amounted to.
    const profiles = await this.prisma.profile.findMany({
      where: {
        OR: [{ phoneVerified: true }, { identityVerified: true }, { businessVerified: true }],
      },
      include: {
        user: {
          include: { properties: { select: { id: true, status: true } } },
        },
      },
      take: 12,
    });

    return profiles
      .map((profile: any) => ({
        id: profile.id,
        fullName: [profile.firstName, profile.lastName].filter(Boolean).join(" ") || "Delala poster",
        posterType: profile.posterType || null,
        avatarUrl: profile.avatarUrl || null,
        bio: profile.bio || "",
        verification: {
          phone: Boolean(profile.phoneVerified),
          identity: Boolean(profile.identityVerified),
          business: Boolean(profile.businessVerified),
        },
        activeListingCount: (profile.user?.properties || []).filter((p: any) => p.status === "approved").length,
      }))
      .sort((a, b) => b.activeListingCount - a.activeListingCount);
  }

  @Get(":id/public")
  @ApiOperation({ summary: "Publicly visible profile for a property poster" })
  async getPublicProfile(@Param("id") id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { profile: true, properties: { select: { id: true, status: true } } },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const profile: any = user.profile || {};
    const listings = user.properties || [];

    // Reviews are written against properties, so a poster's rating is the
    // aggregate across everything they have listed. Computed here rather than
    // on each property payload, where it would be an N+1 — and where it used to
    // be the literal 4.9 / 12 reviews attached to every poster on the site.
    const propertyIds = listings.map((p: any) => p.id);
    const reviewStats = propertyIds.length
      ? await this.prisma.review.aggregate({
          where: { propertyId: { in: propertyIds }, rating: { not: null } },
          _avg: { rating: true },
          _count: { rating: true },
        })
      : null;

    const reviewCount = reviewStats?._count.rating ?? 0;
    const average = reviewStats?._avg.rating;

    // Deliberately omits email and anything else the marketplace does not need
    // to show. The phone is included because it is already published on every
    // listing this person posts.
    return {
      id: user.id,
      fullName: [profile.firstName, profile.lastName].filter(Boolean).join(" ") || "Delala poster",
      role: (profile.role || "user").toLowerCase(),
      // owner | broker | agency — what this person is on the marketplace, as
      // opposed to `role`, which is what they may do in the admin dashboard.
      posterType: profile.posterType || null,
      avatarUrl: profile.avatarUrl || null,
      bio: profile.bio || "",
      phone: profile.phone || null,
      // Every one of these was `true` for every poster before there were
      // columns to hold them. False now means genuinely unverified.
      verification: {
        phone: Boolean(profile.phoneVerified),
        identity: Boolean(profile.identityVerified),
        business: Boolean(profile.businessVerified),
      },
      listingCount: listings.length,
      activeListingCount: listings.filter((p: any) => p.status === "approved").length,
      // null, not 0 and not 4.9 — "no reviews yet" is a different statement
      // from "rated zero", and the UI renders them differently.
      rating: reviewCount > 0 && average !== null && average !== undefined ? Number(average.toFixed(1)) : null,
      reviewCount,
      memberSince: user.createdAt,
    };
  }

  @Patch("profile/:id")
  @ApiOperation({ summary: "Update user profile details" })
  async updateProfile(
    @Param("id") id: string,
    @Body() body: {
      firstName?: string;
      lastName?: string;
      fullName?: string;
      phone?: string;
      avatarUrl?: string;
      bio?: string;
      role?: string;
    }
  ) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { profile: true },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    let firstName = body.firstName;
    let lastName = body.lastName;

    if (!firstName && body.fullName) {
      const parts = body.fullName.trim().split(" ");
      firstName = parts[0];
      lastName = parts.slice(1).join(" ");
    }

    const profileData: any = {};
    if (firstName !== undefined) profileData.firstName = firstName;
    if (lastName !== undefined) profileData.lastName = lastName;
    if (body.phone !== undefined) profileData.phone = body.phone;
    if (body.role !== undefined) profileData.role = body.role.toLowerCase();

    const updatedProfile = await this.prisma.profile.upsert({
      where: { id },
      create: {
        id,
        firstName: firstName || "User",
        lastName: lastName || "",
        phone: body.phone || null,
        role: body.role ? body.role.toLowerCase() : "user",
      },
      update: profileData,
    });

    if (body.bio !== undefined) {
      try {
        await this.prisma.$executeRawUnsafe(
          `UPDATE public.profiles SET bio = $1 WHERE id = $2::uuid`,
          body.bio,
          id
        );
      } catch (err) {
        console.warn("Failed to update bio in profiles table:", err);
      }
    }

    if (body.avatarUrl !== undefined) {
      try {
        await this.prisma.$executeRawUnsafe(
          `UPDATE public.profiles SET avatar_url = $1 WHERE id = $2::uuid`,
          body.avatarUrl,
          id
        );
      } catch (err) {
        console.warn("Failed to update avatar_url in profiles table:", err);
      }
    }

    const fullName = [updatedProfile.firstName, updatedProfile.lastName].filter(Boolean).join(" ") || user.email || "User";

    return {
      id: user.id,
      email: user.email,
      firstName: updatedProfile.firstName || "",
      lastName: updatedProfile.lastName || "",
      fullName,
      phone: updatedProfile.phone || "",
      avatarUrl: body.avatarUrl !== undefined ? body.avatarUrl : (updatedProfile.avatarUrl || "/images/hero_home_away.jpg"),
      bio: body.bio !== undefined ? body.bio : "",
      role: updatedProfile.role || "user",
      createdAt: user.createdAt,
    };
  }

  @Patch(":id/role")
  @ApiOperation({ summary: "Assign platform role to user" })
  async updateRole(@Param("id") id: string, @Body() body: { role: string }) {
    return this.prisma.profile.update({
      where: { id },
      data: { role: body.role.toLowerCase() },
    });
  }
}
