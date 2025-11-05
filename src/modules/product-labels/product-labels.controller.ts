import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductLabelsService } from './product-labels.service';
import { CreateProductLabelDto } from './dto/create-product-label.dto';
import { UpdateProductLabelDto } from './dto/update-product-label.dto';

@Controller('product-labels')
export class ProductLabelsController {
  constructor(private readonly productLabelsService: ProductLabelsService) {}

  @Post()
  create(@Body() createProductLabelDto: CreateProductLabelDto) {
    return this.productLabelsService.create(createProductLabelDto);
  }

  @Get()
  findAll() {
    return this.productLabelsService.findAll();
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
