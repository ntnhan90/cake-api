import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductResDto } from './dto/product.res.dto';
import { ListProductReqDto } from './dto/list-product.req.dto';
import { Public } from '@/decorators/public.decorators';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post()
    create(@Body() dto: CreateProductDto) :Promise<ProductResDto> {
        return this.productsService.create(dto);
    }

    @Public()
    @Get()
    findAll(@Query() reqDto: ListProductReqDto):Promise<OffsetPaginatedDto<ProductResDto>>  {
        return this.productsService.findAll(reqDto);
    }

    @Public()
    @Get(':id')
    findOne(@Param('id') id: number) :Promise<ProductResDto> {
        return this.productsService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() dto: UpdateProductDto) {
        return this.productsService.update(+id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.productsService.remove(+id);
    }
}
