import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  Headers,
  Req,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  UploadedFile,
} from "@nestjs/common";
import { FilesInterceptor, FileInterceptor } from "@nestjs/platform-express";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiConsumes } from "@nestjs/swagger";
import { PropertiesService } from "./properties.service";
import { CreatePropertyDto, ModeratePropertyDto } from "./dto/create-property.dto";
import { R2StorageService } from "../storage/r2-storage.service";
import { Roles } from "../common/decorators/roles.decorator";
import { RolesGuard } from "../common/guards/roles.guard";
import { SessionAuthGuard, bearerToken } from "../common/guards/session-auth.guard";
import { verifySessionToken } from "../common/session-token";
import { AdminService } from "../admin/admin.service";
import { NotificationsService } from "../notifications/notifications.service";

/**
 * The owning user is read back out of the Authorization header rather than taken
 * from a client-supplied body field.
 *
 * This parsed the token with its own regex and no signature check, which made
 * "who owns this listing" assertable by anyone who could type a uuid. It shares
 * the verifier with the guard now, so an unsigned or tampered token yields no
 * owner at all.
 */
const userIdFromAuthHeader = (authorization?: string): string | undefined => {
  if (!authorization) return undefined;
  const token = bearerToken(authorization);
  return token ? verifySessionToken(token)?.userId : undefined;
};

@ApiTags("properties")
@Controller("properties")
export class PropertiesController {
  constructor(
    private readonly propertiesService: PropertiesService,
    private readonly r2StorageService: R2StorageService,
    private readonly adminService: AdminService,
    private readonly notifications: NotificationsService
  ) {}

  @Get()
  @ApiOperation({ summary: "Get all verified approved marketplace property listings" })
  @ApiResponse({ status: 200, description: "Returns list of approved properties" })
  findAll(
    @Query() query: { city?: string; subCity?: string; propertyType?: string; ownerId?: string; status?: string }
  ) {
    return this.propertiesService.findAll(query);
  }

  @Get(":slug")
  @ApiOperation({ summary: "Get property details by slug" })
  findOne(@Param("slug") slug: string) {
    return this.propertiesService.findOneBySlug(slug);
  }

  @Post("upload")
  @UseInterceptors(FileInterceptor("file"))
  @ApiConsumes("multipart/form-data")
  @ApiOperation({ summary: "Upload single image to Cloudflare R2 bucket" })
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) return { url: "/images/hero_property.png" };
    const url = await this.r2StorageService.uploadImage(file);
    return { url };
  }

  @Post()
  @UseInterceptors(FilesInterceptor("images"))
  @ApiOperation({ summary: "Submit a new property listing with optional Cloudflare R2 images" })
  async create(
    @Body() createDto: CreatePropertyDto,
    @UploadedFiles() files?: Express.Multer.File[],
    @Headers("authorization") authorization?: string
  ) {
    const uploadedUrls: string[] = [];

    if (files && files.length > 0) {
      for (const file of files) {
        const url = await this.r2StorageService.uploadImage(file);
        uploadedUrls.push(url);
      }
    }

    return this.propertiesService.create(
      createDto,
      uploadedUrls,
      userIdFromAuthHeader(authorization)
    );
  }

  @Patch(":id/moderate")
  @UseGuards(SessionAuthGuard, RolesGuard)
  @Roles("ADMIN", "MODERATOR")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Moderate property submission (Approve / Reject)" })
  async moderate(
    @Param("id") id: string,
    @Body() moderateDto: ModeratePropertyDto,
    @Req() req?: any
  ) {
    const result = await this.propertiesService.moderate(id, moderateDto);

    // Tell the owner what happened to their submission.
    const approved = moderateDto.status === "APPROVED";
    await this.notifications.create({
      userId: result.brokerId,
      type: approved ? "LISTING_APPROVED" : "LISTING_REJECTED",
      title: approved ? "Your listing is live" : "Your listing needs changes",
      body: approved
        ? `"${result.title}" passed review and is now visible on the marketplace.`
        : `"${result.title}" was not approved. ${moderateDto.rejectionReason || "Please review the details and resubmit."}`,
      propertyId: id,
    });

    await this.adminService.recordAudit(
      req?.user?.id,
      `property.${moderateDto.status.toLowerCase()}`,
      "properties",
      id
    );
    return result;
  }
}
