import { Controller, Get, Post, Body } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { VisitsService } from "./visits.service";
import { CreateVisitDto } from "./dto/create-visit.dto";

@ApiTags("visits")
@Controller("visits")
export class VisitsController {
  constructor(private readonly visitsService: VisitsService) {}

  @Post()
  @ApiOperation({ summary: "Schedule a property walkthrough visit" })
  create(@Body() dto: CreateVisitDto) {
    return this.visitsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Get all scheduled walkthrough visits" })
  findAll() {
    return this.visitsService.findAll();
  }
}
