import {
  StringField,
  NumberField,
  DateField
} from '@/decorators/field.decorators';
import { IsArray, IsEnum, IsOptional, IsString, IsNumber } from "class-validator"
import { Type } from 'class-transformer';
export class CreateProductDto {
  @StringField()
  name: string

  @StringField()
  slug: string

  @StringField()
  description: string

  @StringField()
  content: string

  @StringField()
  status: string

  @IsOptional()
  @IsString()
  image?: string | null

  @IsOptional()
  @IsString()
  sku?: string | null

  @IsOptional()
  @IsNumber()
  order?: number

  @IsNumber()
  is_featured: number	

  @IsNumber()
  price: number

  @IsOptional()
  @IsNumber()
  views: number

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  categories?: number[]

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[]
}

