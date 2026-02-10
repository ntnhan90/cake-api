import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { ProductMaterialsService } from './product-materials.service';
import { CreateProductMaterialDto } from './dto/create-product-material.dto';
import { UpdateProductMaterialDto } from './dto/update-product-material.dto';
import { ListMaterialReqDto } from './dto/list-material.req.dto';
import { MaterialResDto } from './dto/material.res.dto';
import { Public } from '@/decorators/public.decorators';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';

@Controller('product-materials')
export class ProductMaterialsController {
    constructor(private readonly productMaterialsService: ProductMaterialsService) {}

    @Post()
    create(@Body() dto: CreateProductMaterialDto)  :Promise<MaterialResDto>{
        return this.productMaterialsService.create(dto);
    }

    @Get()
    findAll(@Query() reqDto: ListMaterialReqDto) :Promise<OffsetPaginatedDto<MaterialResDto>>{
        return this.productMaterialsService.findAll(reqDto);
    }

    @Get(':id')
    findOne(@Param('id') id: number) :Promise<MaterialResDto>{
        return this.productMaterialsService.findOne(+id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() dto: UpdateProductMaterialDto) {
        return this.productMaterialsService.update(+id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.productMaterialsService.remove(+id);
    }
}
