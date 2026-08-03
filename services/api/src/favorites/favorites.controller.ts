import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { FavoritesService } from "./favorites.service";

@ApiTags("favorites")
@Controller("favorites")
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  @ApiOperation({ summary: "Toggle saving a property to user favorites wishlist" })
  toggle(@Body() body: { userId: string; propertyId: string }) {
    return this.favoritesService.toggle(body.userId, body.propertyId);
  }

  @Get("user/:userId")
  @ApiOperation({ summary: "Get saved wishlist properties for user" })
  findByUser(@Param("userId") userId: string) {
    return this.favoritesService.findByUser(userId);
  }
}
