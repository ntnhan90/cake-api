import {StringField,NumberField,} from '@/decorators/field.decorators';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsOptional,
  IsString,
  ValidateNested,
  IsNotEmpty
} from 'class-validator';

export class CreateAttributeDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsString()
  image?: string;
}

export class CreateAttributeSetDto {
    @StringField()
    name: string;

    @StringField()
    status: string;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateAttributeDto) // 🚨 DÒNG QUAN TRỌNG NHẤT
    attributes: CreateAttributeDto[];
}