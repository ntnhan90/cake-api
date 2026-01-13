import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryResDto } from './dto/category.res.dto';
import { ListCategoryReqDto } from './dto/list-cate.req.dto';
import { Public } from '@/decorators/public.decorators';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { CategoryWithCount } from 'src/types/category.type';


@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Post()
    async create(@Body() dto: CreateCategoryDto) :Promise<CategoryResDto> {
        return await this.categoriesService.create(dto);
    }

    @Get()
    async findAll(@Query() reqDto: ListCategoryReqDto) :Promise<OffsetPaginatedDto<CategoryResDto>> {
        return await this.categoriesService.findAll(reqDto);
    }

    @Public()
    @Get("/tree")
    async getTree(): Promise<CategoryWithCount[]>  {
        return this.categoriesService.getCategoryWithPostCount();
    }
    
    @Public()
    @Get(':id')
    async findOne(@Param('id') id: number):Promise<CategoryResDto> {
        return await this.categoriesService.findOne(+id);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() dto: UpdateCategoryDto) {
        return await this.categoriesService.update(+id, dto);
    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        return await this.categoriesService.remove(+id);
    }

    
}
