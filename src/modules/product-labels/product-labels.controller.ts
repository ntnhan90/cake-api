import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { ProductLabelsService } from './product-labels.service';
import { CreateProductLabelDto } from './dto/create-product-label.dto';
import { UpdateProductLabelDto } from './dto/update-product-label.dto';
import { ListLabelsReqDto } from './dto/list-labels.req.dto';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { LabelsResDto } from './dto/label.res.dto';

@Controller('product-labels')
export class ProductLabelsController {
    constructor(private readonly productLabelsService: ProductLabelsService) {}

    @Post()
    async create(@Body() dto: CreateProductLabelDto):Promise<LabelsResDto> {
        return await this.productLabelsService.create(dto);
    }

    @Get()
    async findAll(@Query() reqDto: ListLabelsReqDto):Promise<OffsetPaginatedDto<LabelsResDto>> {
        return await this.productLabelsService.findAll(reqDto);
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
      return await this.productLabelsService.findOne(+id);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() dto: UpdateProductLabelDto) {
      return await this.productLabelsService.update(+id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
      return this.productLabelsService.remove(+id);
    }
}
