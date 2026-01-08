import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { FaqCateService } from './faq-cate.service';
import { CreateFaqCateDto } from './dto/create-faq-cate.dto';
import { UpdateFaqCateDto } from './dto/update-faq-cate.dto';
import { faqCateResDto } from './dto/faqCate.res.dto';
import { ListFaqCateReqDto } from './dto/list-faqCate.req.dto';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { Public } from '@/decorators/public.decorators';
@Controller('faq-cate')
export class FaqCateController {
    constructor(private readonly faqCateService: FaqCateService) {}

    @Post()
    create(@Body() dto: CreateFaqCateDto) : Promise<faqCateResDto>{
        return this.faqCateService.create(dto);
    }
    
    @Public()
    @Get()
    findAll(@Query() reqDto:ListFaqCateReqDto): Promise<OffsetPaginatedDto<faqCateResDto>>  {
        return this.faqCateService.findAll(reqDto);
    }

    @Get(':id')
    findOne(@Param('id') id: string) : Promise<faqCateResDto> {
        return this.faqCateService.findOne(+id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() dto: UpdateFaqCateDto) {
        return this.faqCateService.update(+id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.faqCateService.remove(+id);
    }
}
