import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
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

@ApiTags("properties")
@Controller("properties")
export class PropertiesController {
  constructor(
    private readonly propertiesService: PropertiesService,
    private readonly r2StorageService: R2StorageService
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
    @UploadedFiles() files?: Express.Multer.File[]
  ) {
    const uploadedUrls: string[] = [];

    if (files && files.length > 0) {
      for (const file of files) {
        const url = await this.r2StorageService.uploadImage(file);
        uploadedUrls.push(url);
      }
    }

    return this.propertiesService.create(createDto, uploadedUrls);
  }

  @Patch(":id/moderate")
  @UseGuards(RolesGuard)
  @Roles("ADMIN", "MODERATOR")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Moderate property submission (Approve / Reject)" })
  moderate(@Param("id") id: string, @Body() moderateDto: ModeratePropertyDto) {
    return this.propertiesService.moderate(id, moderateDto);
  }
}
