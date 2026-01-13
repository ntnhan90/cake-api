import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { ProductTagsService } from './product-tags.service';
import { CreateProductTagDto } from './dto/create-product-tag.req.dto';
import { UpdateProductTagDto } from './dto/update-product-tag.req.dto';
import { ListProductTagsReqDto } from './dto/list-product-tags.req.dto';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { ProductTagsResDto } from './dto/product-tags.res.dto';
import { Public } from '@/decorators/public.decorators';

@Controller('product-tags')
export class ProductTagsController {
    constructor(private readonly productTagsService: ProductTagsService) {}

    @Post()
    async create(@Body() dto: CreateProductTagDto): Promise<ProductTagsResDto> {
        return await this.productTagsService.create(dto);
    }

    @Public()
    @Get()
    async findAll(@Query() reqDto:ListProductTagsReqDto):Promise<OffsetPaginatedDto<ProductTagsResDto>> {
        return await this.productTagsService.findAll(reqDto);
    }

    @Get(':id')
    findOne(@Param('id') id: number):Promise<ProductTagsResDto> {
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


    @Get('check-name')
        async checkName(@Query('name') name: string) {
        if (!name) return { exists: false }

        const exists = await this.productTagsService.isNameExists(name)
        return { exists }
    }
}
