import { Controller, Get, Post, Body, Put, Param, Delete , Query} from '@nestjs/common';
import { ProductCategoriesService } from './product-categories.service';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { ListProductCateReqDto } from './dto/list-product-cate.req.dto';
import { ProductCateResDto } from './dto/product-cate.res.dto';
import { Public } from '@/decorators/public.decorators';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { CategoryWithCount } from 'src/types/category.type';

@Controller('product-categories')
export class ProductCategoriesController {
    constructor(private readonly productCategoriesService: ProductCategoriesService) {}

    @Post()
    async create(@Body() dto: CreateProductCategoryDto) :Promise<ProductCateResDto>{
        return await this.productCategoriesService.create(dto);
    }

    @Public()
    @Get()
    async findAll(@Query() reqDto: ListProductCateReqDto) :Promise<OffsetPaginatedDto<ProductCateResDto>>{
        return await this.productCategoriesService.findAll(reqDto);
    }

    @Public()
    @Get("/tree")
    async getTree(): Promise<CategoryWithCount[]>  {
        return this.productCategoriesService.getCategoryWithPostCount();
    }

    @Get(':id')
    findOne(@Param('id') id: number) :Promise<ProductCateResDto> {
        return this.productCategoriesService.findOne(+id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() dto: UpdateProductCategoryDto) {
        return this.productCategoriesService.update(+id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.productCategoriesService.remove(+id);
    }
}
