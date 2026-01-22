import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { DiscountService } from './discount.service';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { ListDiscountReqDto } from './dto/list-discount.req.dto';
import { DiscountResDto } from './dto/discount.res.dto';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { Public } from '@/decorators/public.decorators';

@Controller('discount')
export class DiscountController {
    constructor(private readonly discountService: DiscountService) {}

    @Post()
    async create(@Body() dto: CreateDiscountDto) : Promise<DiscountResDto>{
        return await this.discountService.create(dto);
    }

    @Get()
    async findAll(@Query() reqDto:ListDiscountReqDto):Promise<OffsetPaginatedDto<DiscountResDto>> {
        return this.discountService.findAll(reqDto);
    }

    @Get(':id')
    findOne(@Param('id') id: number):Promise<DiscountResDto>  {
        return this.discountService.findOne(+id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() dto: UpdateDiscountDto) {
        return this.discountService.update(+id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.discountService.remove(+id);
    }
}
