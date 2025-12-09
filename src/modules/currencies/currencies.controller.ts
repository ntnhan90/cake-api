import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { Public } from '@/decorators/public.decorators';
import { CurrencyResDto } from './dto/currency.res.dto';
import { ListCurrencyReqDto } from './dto/list-currency.req.dto';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
@Controller('currencies')
export class CurrenciesController {
    constructor(private readonly currenciesService: CurrenciesService) {}

    @Post()
    async create(@Body() createCurrencyDto: CreateCurrencyDto):Promise<CurrencyResDto> {
        return await this.currenciesService.create(createCurrencyDto);
    }

    @Get()
   // @Public()
    async findAll(@Query() reqDto:ListCurrencyReqDto) : Promise<OffsetPaginatedDto<CurrencyResDto>> {
        return await this.currenciesService.findAll(reqDto);
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<CurrencyResDto> {
        return this.currenciesService.findOne(+id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updateCurrencyDto: UpdateCurrencyDto) {
        return this.currenciesService.update(+id, updateCurrencyDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.currenciesService.remove(+id);
    }
}
