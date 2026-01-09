import { Controller, Get, Post, Body, Put, Param, Delete ,Query} from '@nestjs/common';
import { FaqsService } from './faqs.service';
import { CreateFaqsDto } from './dto/create-faq.dto';
import { UpdateFaqsDto } from './dto/update-faq.dto';
import { FaqsResDto } from './dto/faq.res.dto';
import { ListFaqsReqDto } from './dto/list-faqs.req.dto';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { Public } from '@/decorators/public.decorators';
@Controller('faqs')
export class FaqsController {
    constructor(private readonly faqsService: FaqsService) {}

    @Post()
    create(@Body() dto: CreateFaqsDto) :Promise<FaqsResDto> {
        return this.faqsService.create(dto);
    }

    @Public()
    @Get()
    findAll(@Query() reqDto:ListFaqsReqDto): Promise<OffsetPaginatedDto<FaqsResDto>> {
        return this.faqsService.findAll(reqDto);
    }

    @Get(':id')
    findOne(@Param('id') id: number):Promise<FaqsResDto> {
        return this.faqsService.findOne(+id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() dto: UpdateFaqsDto) {
        return this.faqsService.update(+id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.faqsService.remove(+id);
    }
}
