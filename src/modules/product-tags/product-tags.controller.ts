import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
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
    async create(@Body() createProductTagDto: CreateProductTagDto): Promise<TagsResDto> {
        return await this.productTagsService.create(createProductTagDto);
    }

    @Get()
    async findAll(@Query() reqDto:ListTagsReqDto):Promise<OffsetPaginatedDto<TagsResDto>> {
        return await this.productTagsService.findAll(reqDto);
    }

    @Get(':id')
    findOne(@Param('id') id: number):Promise<TagsResDto> {
        return this.productTagsService.findOne(+id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updateProductTagDto: UpdateProductTagDto) {
        return this.productTagsService.update(+id, updateProductTagDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.productTagsService.remove(+id);
    }

    @Get('check-slug')
    async checkSlug(@Query('slug') slug: string) {
        if (!slug) {
        return { exists: false }
        }

        const exists = await this.productTagsService.isSlugExists(slug)
        return { exists }
    }

    @Get('resolve-slug')
    async resolveSlug(@Query('name') name: string) {
        if (!name) return { slug: '' }

        const slug = await this.productTagsService.generateUniqueSlug(name)
        return { slug }
    }
}
