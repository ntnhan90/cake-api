import { PartialType } from '@nestjs/swagger';
import { CreateProductRecipeDto } from './create-product-recipe.dto';

export class UpdateProductRecipeDto extends PartialType(CreateProductRecipeDto) {}
