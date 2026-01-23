import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ProductAttributesService } from './product-attributes.service';
import { CreateAttributeSetDto} from './dto/create-product-attribute.dto';
import { UpdateProductAttributeDto } from './dto/update-product-attribute.dto';

@Controller('product-attributes')
export class ProductAttributesController {
    constructor(private readonly productAttributesService: ProductAttributesService) {}

    @Post()
    create(@Body() dto: CreateAttributeSetDto) {
        return this.productAttributesService.create(dto);
    }

    @Get()
    findAll() {
        return this.productAttributesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.productAttributesService.findOne(+id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() dto: CreateAttributeSetDto) {
        return this.productAttributesService.update(+id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.productAttributesService.remove(+id);
    }
}
