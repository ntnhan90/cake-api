import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRecipesService } from './product-recipes.service';
import { ProductRecipesController } from './product-recipes.controller';
import { ProductRecipeEntity } from './entities/product-recipe.entity';
import { ProductMaterialEntity } from '../product-materials/entities/product-material.entity';
@Module({
  imports : [TypeOrmModule.forFeature([ProductRecipeEntity,ProductMaterialEntity])],
  controllers: [ProductRecipesController],
  providers: [ProductRecipesService],
})
export class ProductRecipesModule {}
