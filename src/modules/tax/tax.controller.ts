import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { TaxService } from './tax.service';
import { CreateTaxDto } from './dto/create-tax.req.dto';
import { UpdateTaxDto } from './dto/update-tax.req.dto';
import { ListTaxReqDto } from './dto/list-tax.req.dto';
import { TaxResDto } from './dto/tax.res.dto';
import { Public } from '@/decorators/public.decorators';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';

@Controller('tax')
export class TaxController {
    constructor(private readonly taxService: TaxService) {}

    @Post()
    async create(@Body() createTaxDto: CreateTaxDto) :Promise<TaxResDto>{
        return await this.taxService.create(createTaxDto);
    }

    @Get()
    @Public()
    async findAll(@Query() reqDto: ListTaxReqDto) :Promise<OffsetPaginatedDto<TaxResDto>> {
        return await this.taxService.findAll(reqDto);
    }

    @Get(':id')
    findOne(@Param('id') id: number):Promise<TaxResDto> {
        return this.taxService.findOne(+id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updateTaxDto: UpdateTaxDto) {
        return this.taxService.update(+id, updateTaxDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.taxService.remove(+id);
    }
}
