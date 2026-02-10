import { Injectable } from '@nestjs/common';
import { CreateProductRecipeDto } from './dto/create-product-recipe.dto';
import { UpdateProductRecipeDto } from './dto/update-product-recipe.dto';

@Injectable()
export class ProductRecipesService {
    create(createProductRecipeDto: CreateProductRecipeDto) {
      return 'This action adds a new productRecipe';
    }

    findAll() {
      return `This action returns all productRecipes`;
    }

    findOne(id: number) {
      return `This action returns a #${id} productRecipe`;
    }

    update(id: number, updateProductRecipeDto: UpdateProductRecipeDto) {
      return `This action updates a #${id} productRecipe`;
    }

    remove(id: number) {
      return `This action removes a #${id} productRecipe`;
    }
}
