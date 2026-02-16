import {IsArray,IsInt,IsOptional,IsString,IsEnum, IsNumber,} from 'class-validator';
import { Type } from 'class-transformer';
export enum STATUS {
    ACTIVE ="active",
    PENDING = "pending",
    CLOSE = "close"
}

export class CreateShopDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    address?: string;

    @IsString()
    city: string;

    @IsOptional()
    @IsString()
    postal_code?: string;

    @Type(() => Number)
    @IsNumber()
    is_active?: number;

    @IsEnum(STATUS)
    status?: STATUS;

    @Type(() => Number)
    @IsNumber()
    franchise_id
}
