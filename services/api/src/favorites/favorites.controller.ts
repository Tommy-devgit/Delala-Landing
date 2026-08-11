import { Controller, Get, Post, Delete, Body, Param, Req, UseGuards } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { FavoritesService } from "./favorites.service";
import { SessionAuthGuard } from "../common/guards/session-auth.guard";

/**
 * Wishlist endpoints.
 *
 * The owning user is taken from the session rather than the request body. The
 * previous version accepted `userId` as a body field, so any caller could add to
 * or read from anyone else's wishlist.
 */
@ApiTags("favorites")
@ApiBearerAuth()
@UseGuards(SessionAuthGuard)
@Controller("favorites")
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  @ApiOperation({ summary: "Toggle a property in the signed-in user's wishlist" })
  toggle(@Body() body: { propertyId: string }, @Req() req: any) {
    return this.favoritesService.toggle(req.user.id, body.propertyId);
  }

  @Delete(":propertyId")
  @ApiOperation({ summary: "Remove a property from the wishlist" })
  remove(@Param("propertyId") propertyId: string, @Req() req: any) {
    return this.favoritesService.remove(req.user.id, propertyId);
  }

  @Get("ids")
  @ApiOperation({ summary: "Property ids the signed-in user has saved" })
  ids(@Req() req: any) {
    return this.favoritesService.idsForUser(req.user.id);
  }

  @Get("user/:userId")
  @ApiOperation({ summary: "Saved properties. Only the owner of the wishlist may read it." })
  findByUser(@Param("userId") userId: string, @Req() req: any) {
    // A wishlist is private, so the path parameter is ignored in favour of the
    // authenticated user; the route shape is kept for existing callers.
    return this.favoritesService.findByUser(req.user.id, userId);
  }
}
