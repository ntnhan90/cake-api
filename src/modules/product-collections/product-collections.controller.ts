import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { ProductCollectionsService } from './product-collections.service';
import { CreateProductCollectionDto } from './dto/create-product-collection.dto';
import { UpdateProductCollectionDto } from './dto/update-product-collection.dto';
import { ListCollectionReqDto } from './dto/list-collection.req.dto';
import { CollectionResDto } from './dto/collection.res.dto';
import { Public } from '@/decorators/public.decorators';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { Collection } from 'typeorm';

@Controller('product-collections')
export class ProductCollectionsController {
    constructor(private readonly productCollectionsService: ProductCollectionsService) {}

    @Post()
    async create(@Body() dto: CreateProductCollectionDto) :Promise<CollectionResDto> {
        return await this.productCollectionsService.create(dto);
    }

    @Get()
    findAll(@Query() reqDto: ListCollectionReqDto) :Promise<OffsetPaginatedDto<CollectionResDto>> {
        return this.productCollectionsService.findAll(reqDto);
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<CollectionResDto> {
        return this.productCollectionsService.findOne(+id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() dto: UpdateProductCollectionDto) {
        return this.productCollectionsService.update(+id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.productCollectionsService.remove(+id);
    }
}
