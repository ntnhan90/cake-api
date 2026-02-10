import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductRecipesService } from './product-recipes.service';
import { CreateProductRecipeDto } from './dto/create-product-recipe.dto';
import { UpdateProductRecipeDto } from './dto/update-product-recipe.dto';

@Controller('product-recipes')
export class ProductRecipesController {
    constructor(private readonly productRecipesService: ProductRecipesService) {}

    @Post()
    create(@Body() dto: CreateProductRecipeDto) {
        return this.productRecipesService.create(dto);
    }

    @Get()
    findAll() {
        return this.productRecipesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.productRecipesService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() dto: UpdateProductRecipeDto) {
        return this.productRecipesService.update(+id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.productRecipesService.remove(+id);
    }
}
