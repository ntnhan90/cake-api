import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  ArrayNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePostDto {

  @IsString()
  name: string;

  @IsString()
  slug: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsInt()
  @Type(() => Number)
  user_id: number;

  @IsInt()
  @Type(() => Number)
  is_featured: number;

  @IsString()
  status: string;

  /* ================= CATEGORIES (QUAN TRỌNG) ================= */
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  @Type(() => Number)
  categories?: number[];

  /* ================= TAGS ================= */
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}