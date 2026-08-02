import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";
import { PropertiesService } from "./properties.service";
import { CreatePropertyDto, ModeratePropertyDto } from "./dto/create-property.dto";
import { Roles } from "../common/decorators/roles.decorator";
import { RolesGuard } from "../common/guards/roles.guard";

@ApiTags("properties")
@Controller("properties")
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

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

  @Post()
  @ApiOperation({ summary: "Submit a new property listing for approval" })
  create(@Body() createDto: CreatePropertyDto) {
    return this.propertiesService.create(createDto);
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
