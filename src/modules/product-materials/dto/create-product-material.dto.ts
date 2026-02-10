import {IsArray,IsInt,IsOptional,IsString,ArrayNotEmpty,} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductMaterialDto {
    @IsString()
    name: string;

    @IsString()
    sku: string;

    @IsString()
    unit: string;

    @IsString()
    category: string;

    @IsString()
    cost_price: string;

    @IsString()
    status: string;
}
