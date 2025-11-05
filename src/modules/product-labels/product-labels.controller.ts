import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
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
  create(@Body() createProductLabelDto: CreateProductLabelDto) {
      return this.productLabelsService.create(createProductLabelDto);
  }

  @Get()
  findAll(
    @Query() reqDto: ListLabelsReqDto
  ):Promise<OffsetPaginatedDto<LabelsResDto>> {
      return this.productLabelsService.findAll(reqDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productLabelsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductLabelDto: UpdateProductLabelDto) {
    return this.productLabelsService.update(+id, updateProductLabelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productLabelsService.remove(+id);
  }
}
