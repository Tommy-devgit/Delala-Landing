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
import { SessionAuthGuard } from "../common/guards/session-auth.guard";
import { AdminService } from "../admin/admin.service";

/**
 * Session tokens are issued as `betterauth-session-<uuid>-<timestamp>`, so the
 * owning user can be read back out of the Authorization header instead of being
 * taken from a client-supplied body field.
 */
const userIdFromAuthHeader = (authorization?: string): string | undefined => {
  if (!authorization) return undefined;
  const token = authorization.replace(/^Bearer\s+/i, "");
  const match = token.match(
    /^betterauth-session-([0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})-\d+$/i
  );
  return match?.[1];
};

@ApiTags("properties")
@Controller("properties")
export class PropertiesController {
  constructor(
    private readonly propertiesService: PropertiesService,
    private readonly r2StorageService: R2StorageService,
    private readonly adminService: AdminService
  ) {}

  @Get()
  @ApiOperation({ summary: "Get all verified approved marketplace property listings" })
  @ApiResponse({ status: 200, description: "Returns list of approved properties" })
  findAll(@Query() query: { city?: string; subCity?: string; propertyType?: string }) {
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
    await this.adminService.recordAudit(
      req?.user?.id,
      `property.${moderateDto.status.toLowerCase()}`,
      "properties",
      id
    );
    return result;
  }
}
