import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductTagsService } from './product-tags.service';
import { CreateProductTagDto } from './dto/create-product-tag.req.dto';
import { UpdateProductTagDto } from './dto/update-product-tag.req.dto';
import { ListTagsReqDto } from './dto/list-tag.req.dto';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { TagsResDto } from './dto/tag.res.dto';

@Controller('product-tags')
export class ProductTagsController {
    constructor(private readonly productTagsService: ProductTagsService) {}

    @Post()
    create(@Body() createProductTagDto: CreateProductTagDto) {
        return this.productTagsService.create(createProductTagDto);
    }

    @Get()
    async findAll(@Query() reqDto:ListTagsReqDto):Promise<OffsetPaginatedDto<TagsResDto>> {
        return await this.productTagsService.findAll(reqDto);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.productTagsService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateProductTagDto: UpdateProductTagDto) {
        return this.productTagsService.update(+id, updateProductTagDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.productTagsService.remove(+id);
    }
}
