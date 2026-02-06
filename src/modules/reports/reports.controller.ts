import { Controller, Get,  Param } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { Public } from '@/decorators/public.decorators';
@Controller('reports')
export class ReportsController {
    constructor(private readonly reportsService: ReportsService) {}

    @Public()
    @Get('overviews')
    findOne() {
        return this.reportsService.getOverview();
    }
}
